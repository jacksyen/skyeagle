/**
 * @created 	 2012.09.06 
 * @description  基于jquery UI、easyUI扩展的panel组件
 */
(function($) {
	$.widget("ui.panel" , {
        options: {
        	// 文件上传元素
        	fileInput : null,
        	// 多附件上传的数量限制个数
        	limitMultiFileUploads : 0,
        	// 参数名称
        	paramName: null,
        	// 每个文件都使用一个单独的XHR类型上传（？）
        	singleFileUploads: true,
        	
        	
        	
        	// 定义是否自动上传功能
            autoUpload: false,
            // 文件数量限制
            maxNumberOfFiles: undefined,
            // 最大文件大小
            maxFileSize: undefined,
            // 最小文件大小
            minFileSize: undefined,
            // 正则匹配文件类型
            acceptFileTypes:  /.+$/i,
            // 正则定义文件图像显示类型
            previewSourceFileTypes: /^image\/(gif|jpeg|png)$/,
            // 预览图最大大小
            previewSourceMaxFileSize: 5000000, // 5MB
            // 预览图最大宽度
            previewMaxWidth: 80,
            // 预览图最大高度
            previewMaxHeight: 80,
            // 设置为true，则使用HTML5中的canvas显示图像元件，设置为false则为img标签
            previewAsCanvas: true,
            // 上传模板ID
            uploadTemplateId: 'template-upload',
            // 下载模板ID
            downloadTemplateId: 'template-download',
            // 文件容器
            filesContainer: undefined,
            // TODO 设置为falsh会将文件添加至文件容器，咱不实现
            //prependFiles: false,
            // 上传文件类型
            dataType: 'json',
        },
        _refreshOptionsList: [
            'namespace',
            'dropZone',
            'fileInput',
            'multipart',
            'forceIframeTransport'
        ],
        // 初始化options
       	_initSpecialOptions : function (){
       		var options = this.options;
       		if (options.fileInput === undefined) {
                options.fileInput = this.element.is('input[type="file"]') ?
                        this.element : this.element.find('input[type="file"]');
            }else if (!(options.fileInput instanceof $)) {
                options.fileInput = $(options.fileInput);
            }
       	},
       	/**
       	 *  deferred对象
       	 */
       	_enhancePromise: function (promise) {
            promise.success = promise.done;
            promise.error = promise.fail;
            promise.complete = promise.always;
            return promise;
        },
       	/**
       	 *  延迟加载对象
 		 * @param {Object} resolveOrReject  已完成、已失败
       	 */
        _getXHRPromise : function (resolveOrReject, context, args) {
        	var dfd = $.Deferred(),
                promise = dfd.promise();
            context = context || this.options.context || promise;
            if (resolveOrReject === true) {
                dfd.resolveWith(context, args);
            } else if (resolveOrReject === false) {
                dfd.rejectWith(context, args);
            }
            promise.abort = dfd.promise;
            return this._enhancePromise(promise);
        },
        /**
         *  初始化事件
         */
        _initEventHandlers : function (){
        	this.options.fileInput
                .bind('change.fileupload', {fileupload: this}, this._onChange);
        },
        /**
         *  绑定多个文件的事件
         */
        _handleFileTreeEntries : function (entry, path){
        	var that = this;
            return $.when.apply(
                $,
                $.map(entries, function (entry) {
                    return that._handleFileTreeEntry(entry, path);
                })
            ).pipe(function () {
                return Array.prototype.concat.apply(
                    [],
                    arguments
                );
            });
        },
        /**
         *  获取上传文件
         */
        _getFileInputFiles : function (fileInput){
        	fileInput = $(fileInput);
            var entries = fileInput.prop('webkitEntries') || fileInput.prop('entries'),
                files,
                value;
            if (entries && entries.length) {
                return this._handleFileTreeEntries(entries);
            }
            files = $.makeArray(fileInput.prop('files'));
            if (!files.length) {
                value = fileInput.prop('value');
                if (!value) {
                    return $.Deferred().reject([]).promise();
                }
                // If the files property is not available, the browser does not
                // support the File API and we add a pseudo File object with
                // the input value as name with path information removed:
                files = [{name: value.replace(/^.*\\/, '')}];
            }
            return $.Deferred().resolve(files).promise();
        },
        _replaceFileInput : function (input){
        	var inputClone = input.clone(true);
            $('<form></form>').append(inputClone)[0].reset();
            // Detaching allows to insert the fileInput on another form
            // without loosing the file input value:
            input.after(inputClone).detach();
            // Avoid memory leaks with the detached file input:
            $.cleanData(input.unbind('remove'));
            // Replace the original file input element in the fileInput
            // collection with the clone, which has been copied including
            // event handlers:
            this.options.fileInput = this.options.fileInput.map(function (i, el) {
                if (el === input[0]) {
                    return inputClone[0];
                }
                return el;
            });
            // If the widget has been initialized on the file input itself,
            // override this.element with the file input clone:
            if (input[0] === this.element[0]) {
                this.element = inputClone;
            }
        },
        /**
         *  获取参数名称
         */
        _getParamName: function (options) {
            var fileInput = $(options.fileInput),
                paramName = options.paramName;
            if (!paramName) {
                paramName = [];
                fileInput.each(function () {
                    var input = $(this),
                        name = input.prop('name') || 'files[]',
                        i = (input.prop('files') || [1]).length;
                    while (i) {
                        paramName.push(name);
                        i -= 1;
                    }
                });
                if (!paramName.length) {
                    paramName = [fileInput.prop('name') || 'files[]'];
                }
            } else if (!$.isArray(paramName)) {
                paramName = [paramName];
            }
            return paramName;
        },
        /**
         *  初始化form配置
         */
        _initFormSettings : function (options){
        	if (!options.form || !options.form.length) {
                options.form = $(options.fileInput.prop('form'));
            }
            options.paramName = this._getParamName(options);
            if (!options.url) {
                options.url = options.form.prop('action') || location.href;
            }
            // The HTTP request method must be "POST" or "PUT":
            options.type = (options.type || options.form.prop('method') || '')
                .toUpperCase();
            if (options.type !== 'POST' && options.type !== 'PUT') {
                options.type = 'POST';
            }
            if (!options.formAcceptCharset) {
                options.formAcceptCharset = options.form.attr('accept-charset');
            }
        },
        /**
         *  初始化数据配置
         */
        _initDataSettings : function (options){
        	if (this._isXHRUpload(options)) {
                if (!this._chunkedUpload(options, true)) {
                    if (!options.data) {
                        this._initXHRData(options);
                    }
                    this._initProgressListener(options);
                }
                if (options.postMessage) {
                    // Setting the dataType to postmessage enables the
                    // postMessage transport:
                    options.dataType = 'postmessage ' + (options.dataType || '');
                }
            } else {
                this._initIframeSettings(options, 'iframe');
            }
        },
        /**
         *  获取ajax配置信息
         */
        _getAJAXSettings: function (data) {
            var options = $.extend({}, this.options, data);
            this._initFormSettings(options);
            this._initDataSettings(options);
            return options;
        },
        /**
         *  上传文件
         */
        _onSend : function (e, data) {
        	var that = this,
                jqXHR,
                slot,
                pipe,
                options = that._getAJAXSettings(data),
                send = function (resolve, args) {
                    that._sending += 1;
                    // Set timer for bitrate progress calculation:
                    options._bitrateTimer = new that._BitrateTimer();
                    jqXHR = jqXHR || (
                        (resolve !== false &&
                        that._trigger('send', e, options) !== false &&
                        (that._chunkedUpload(options) || $.ajax(options))) ||
                        that._getXHRPromise(false, options.context, args)
                    ).done(function (result, textStatus, jqXHR) {
                        that._onDone(result, textStatus, jqXHR, options);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        that._onFail(jqXHR, textStatus, errorThrown, options);
                    }).always(function (jqXHRorResult, textStatus, jqXHRorError) {
                        that._sending -= 1;
                        that._onAlways(
                            jqXHRorResult,
                            textStatus,
                            jqXHRorError,
                            options
                        );
                        if (options.limitConcurrentUploads &&
                                options.limitConcurrentUploads > that._sending) {
                            // Start the next queued upload,
                            // that has not been aborted:
                            var nextSlot = that._slots.shift(),
                                isPending;
                            while (nextSlot) {
                                // jQuery 1.6 doesn't provide .state(),
                                // while jQuery 1.8+ removed .isRejected():
                                isPending = nextSlot.state ?
                                        nextSlot.state() === 'pending' :
                                        !nextSlot.isRejected();
                                if (isPending) {
                                    nextSlot.resolve();
                                    break;
                                }
                                nextSlot = that._slots.shift();
                            }
                        }
                    });
                    return jqXHR;
                };
            this._beforeSend(e, options);
            if (this.options.sequentialUploads ||
                    (this.options.limitConcurrentUploads &&
                    this.options.limitConcurrentUploads <= this._sending)) {
                if (this.options.limitConcurrentUploads > 1) {
                    slot = $.Deferred();
                    this._slots.push(slot);
                    pipe = slot.pipe(send);
                } else {
                    pipe = (this._sequence = this._sequence.pipe(send, send));
                }
                // Return the piped Promise object, enhanced with an abort method,
                // which is delegated to the jqXHR object of the current upload,
                // and jqXHR callbacks mapped to the equivalent Promise methods:
                pipe.abort = function () {
                    var args = [undefined, 'abort', 'abort'];
                    if (!jqXHR) {
                        if (slot) {
                            slot.rejectWith(pipe, args);
                        }
                        return send(false, args);
                    }
                    return jqXHR.abort();
                };
                return this._enhancePromise(pipe);
            }
            return send();
        },
        /**
         *  添加文件
         */
        _onAdd: function (e, data) {
            var that = this,
                result = true,
                options = $.extend({}, this.options, data),
                limit = options.limitMultiFileUploads,
                paramName = this._getParamName(options),
                paramNameSet,
                paramNameSlice,
                fileSet,
                i;
           
            fileSet = [data.files];
            paramNameSet = [paramName];
            data.originalFiles = data.files;
            $.each(fileSet || data.files, function (index, element) {
                var newData = $.extend({}, data);
                newData.files = fileSet ? element : [element];
                newData.paramName = paramNameSet[index];
                newData.submit = function () {
                	alert('xxx');
                    newData.jqXHR = this.jqXHR =
                        (that._trigger('submit', e, this) !== false) &&
                        that._onSend(e, this);
                    return this.jqXHR;
                };
                return (result = that._trigger('add', e, newData));
            });
            return result;
        },
        /**
         *  fileinput change事件
         */
        _onChange : function (e){
        	var that = e.data.fileupload,
        		data = {
                    fileInput: $(e.target),
                    form: $(e.target.form)
                };
            that._getFileInputFiles(data.fileInput).always(function (files) {
                data.files = files;
                if (that.options.replaceFileInput) {
                    that._replaceFileInput(data.fileInput);
                }
                if (that._trigger('change', e, data) !== false) {
                    that._onAdd(e, data);
                }
            });
        },
        
        _create: function () {
        	this._initSpecialOptions();
        	// 插槽
        	this._slots = [];
        	// 上传队列
        	this._sequence = this._getXHRPromise(true);
        	
        	this._sending = this._active = this._loaded = this._total = 0;
        	
        	this._initEventHandlers();
        	
        	
            this._refreshOptionsList.push(
                'filesContainer',
                'uploadTemplateId',
                'downloadTemplateId'
            );
            if (!$.blueimpFP) {
                this._processingQueue = $.Deferred().resolveWith(this).promise();
                this.process = function () {
                    return this._processingQueue;
                };
            }
        },
    });

});
