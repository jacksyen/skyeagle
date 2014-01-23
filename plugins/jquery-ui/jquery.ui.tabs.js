/**
 * @auth 		 jacksyen
 * @created 	 2012.07.10 
 * @description  基于jquery UI、easyUI扩展的tabs组件
 * @extends		 panel
 * @since		 2012.12.26  在480行添加'width  : options.width,'
 */
(function(){
    var tabIdPrefix = 'ui-tabs-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + '-',
        id = 0;
    /**
     * class panel， 在target指定的地方根据config生成一个Panel， 该类是$.fn.panel包装器。
     * param target dom元素，一般指向一个div。
     * param config 生成Panel所需要的配置项，如果设置了content属性，则使用其为内容将会被传递给 $.fn.panel。
     * return 原先的target
     */
    function panel (target, config) {
        if ( config.content ) {
            $(target).html(config.content);
        }
        return $(target).panel(config);
    }
    $.widget('ui.tabs', {
        options : /** @lends uitabs#*/ {
            /**
             * 页签布局的宽度，可取值为'auto'(默认情况，不做处理)，可以取值为'fit'，表示适应父容器的大小(width:100%)，也可以直接设置width大小（单位：像素）。
             * @default 'auto'
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({width: 500});
             */
            width : 'auto',
            /**
             * 页签布局的高度，可取值为'auto'(默认情况，不做处理)，可以取值为'fit'，表示适应父容器的大小(height:100%)，也可以直接设置height大小（单位：像素）。
             * @default 'auto'
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({height: 200});
             */
            height : 'auto',
            /**
             * 是否显示页签正文区的边框。
             * @default true
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({border: false});//不显示页签正文区的边框
             */
            border : true,
            /**
             * 单个页签头部的宽度。
             * @default auto
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({tabWidth: 'auto'});
             */
            tabWidth : 'auto',
            /**
             * 单个页签头部的高度，可取值为'auto'。默认为18像素。
             * @default 18
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({tabHeight: 'auto'});
             */
            tabHeight : 18,
            // TODO: 暂时不启用
            /*
             * 是否禁用组件。 
             * @name uitabs#disabled
             * @default false
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({disabled : true});//初始化时禁用组件
             */
            disabled : false,
            /**
             * 当页签超过组件宽度时是否出现左右滚动箭头。
             * @default true
             * @type Boolean
             * @example
             * //当页签数目较多时不显示滚动箭头，将访问不到未显示的页签
             * $('#make-tab').uitabs({scrollable: false});
             */
            scrollable : true,
            /**
             * 页签是否可关闭，当本属性为true时，所有页签都可以关闭。当属性值为数组时，只有数组中指定的index的页签可以关闭，index从0开始。
             * @default false
             * @type Boolean,Array
             * @example
             * //页签可关闭
             * $('#make-tab').uitabs({closable : true});
             * 
             * //只有第一个和第三个页签可以关闭
             * $('#make-tab').uitabs({closable : [0,2]);
             */
            closable : false,
            
            //  暂时不公布
            //  页签头部的位置，可为top和left //TODO 'left'
            // @default 'top'
            // @type String
            // @example
            // $('#make-tab').uitabs({position : 'left'});//页签头部在组件的左边
            //
            position : 'top',
            /**
             * 页签切换的模式。可为click(鼠标点击切换)，mouseover(鼠标滑过切换)。<b>注意：当设置了autoPlay属性时，虽然组件在自动切换，此时仍可以使用鼠标点击（鼠标划过）切换页签</b>
             * @default 'click'
             * @type String
             * @example
             * $('#make-tab').uitabs({switchMode : 'mouseover'});//鼠标划过切换页签
             */
            switchMode : 'click',
            /**
             * 是否自动循环切换页签。
             * @default false
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({autoPlay:true});//自动切换页签
             */
            autoPlay : false,
            /**
             * 自动切换页签的时间间隔，单位为毫秒。 该属性在 switchMode 为auto时才生效。
             * @default 1000
             * @type Number
             * @example
             * $('#make-tab').uitabs({autoPlay:true, interval : 2000});//自动切换页签时，时间间隔为2s
             */
            interval : 1000,
            /**
             * 初始化时被激活页签的索引（从0开始计数）或者tabId。
             * @default 0
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({active : 1});//初始化时激活第二个页签
             * $('#make-tab').uitabs({active : 'tab-1'});//初始化时激活Id为'tab-1'的页签
             */
            active : 0,
            /**
             * 是否懒加载，当该属性为true时，只有在页签被单击选中时才尝试加载页签正文区。
             * @default false
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({lazyLoad : true});
             */
            lazyLoad : false,
            /**
             * 当页签被选中之前执行的方法。
             * @event
             * @param n 选中页签的索引，从0开始计数.
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeActivate : function(event,n) {
             *          alert('tab ' + n + ' will be activated!');
             *      }
             *  });
             */
            onBeforeActivate : function(event, n) {
            },
            /**
             * 当页签被选中后执行的方法。
             * @event
             * @param n 选中页签的索引，从0开始计数.
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onActivate : function(n,event) {
             *          alert('tab ' + n + ' has been activated!');
             *      }
             *  });
             */
            onActivate : function(event, n) {
            },
            /**
             * 当页签被关闭之前执行的方法。
             * @event
             * @param n 被关闭页签的索引，从0开始计数。
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeClose : function(n,event) {
             *          alert('tab ' + n + ' will be closed!');
             *      }
             *  });
             */
            onBeforeClose : function(event, n) {
            },
            /**
             * 当页签被关闭之后执行的方法。
             * @event
             * @param n 被关闭页签的索引，从0开始计数。
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onClose : function(n,event) {
             *          alert('tab ' + n + ' has been closed!');
             *      }
             *  });
             */
            onClose : function(event, n) {
            },
            /**
             * 当关闭所有页签之前执行的方法。
             * @event
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeCloseAll : function(event) {
             *          alert('all tabs will be closed !');
             *      }
             *  });
             */
            onBeforeCloseAll : function(event) {
            },
            /**
             * 当关闭所有页签之后执行的方法。
             * @event
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onCloseAll : function(event) {
             *          alert('tabs are all closed now !');
             *      }
             *  });
             */
            onCloseAll : function() {
            },
            /**
             * 当新页签被添加之后执行的方法。
             * @event
             * @default emptyFn 
             * @param config 经过处理的配置项。在调用add新增页签时，传入的配置项参数可能不完整(使用默认值)，此处的config就是完整的配置项
             * @param event jQuery.Event对象
             * @example
             *  $('#make-tab').uitabs({
             *      onAdd : function(config,event) {
             *          console.dir(config);
             *          alert('you have added a tab at position:' + config.index );
             *      }
             *  });
             * title, content, url, closable , index
             */
            onAdd : function(event, config) {
            },
            /**
             * 当新页签被添加之前执行的方法。
             * @event
             * @default emptyFn 
             * @param config 经过处理的配置项。在调用add新增页签时，传入的配置项参数可能不完整(使用默认值)，此处的config就是完整的配置项
             * @param event jQuery.Event对象
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeAdd : function(config,event) {
             *          console.dir(config);
             *          alert('you will add a tab at position:' + index );
             *      }
             *  });
             */
            onBeforeAdd : function(event, config) {
            },
            /**
             * 当页签使用ajax方式加载内容，加载完成后执行的方法。
             * @event
             * @default emptyFn
             * @param tabId 刚加载完成的页签的tabId
             * @param event jQuery.Event对象
             * @example
             *  $('#make-tab').uitabs({
             *      onLoadComplete : function(tabId,event) {
             *          alert(tabId + 'has just been loaded!' );
             *      }
             *  });
             */
            onLoadComplete : function(event, tabId) {
            }
        },
        
        /**
         * 在index处增加一个tab页签。参数为json格式的配置项。 调用该方法会触发 add事件。
         * 配置项参数：
         * <ol>
         * <li>index：新增页签的位置（从0开始计数,默认在末尾增加页签），可设置为'last'</li>
         * <li>title：新增页签的标题，默认值为 'New Title' + 全局唯一字符串</li>
         * <li>content：新增页签的内容，默认值为 'New Content' + 全局唯一字符串</li>
         * <li>url：新增页签的数据源为url。如果同时设置了content和url，则优先使用url</li>
         * <li>tabId：设置tabId，作为唯一标识，可以通过此标识唯一确定一个tab页签，tabId不能重复</li>
         * <li>closable：该新增的页签是否可关闭。</li>
         * </ol>
         * @name uitabs#add
         * @function
         * @param Object {index,title,content,url,colsable,tabId}
         * @example
         * //在第一个页签的位置新增一个页签,该页签的内容是远程数据
         * $('#make-tab').uitabs('add', {
         *     index : 0,
         *     title : 'New Tab1',
         *     content : 'New Content1',
         *     closable : false
         * });
         */
        // TODO: index param should support 'first'
        add : function(config /*title, content, url, closable , index,tabId*/) {
            this._add(config /*title, content, url, closable , index,tabId*/);
        },
        
        /**
         * 关闭特定的页签，如果n指向当前页签，则会选中下一页签；如果当前页签是最末尾的页签，则会选中第一个页签。可以看到每关闭一个页签就会分别触发一次close事件和activate事件。
         * @name uitabs#close
         * @function
         * @param n 要关闭的页签的位置（从0开始计数），或者该页签的tabId(一个全局唯一的字符串)。 如果未指定该参数，则默认关闭当前页签。
         * @example
         * //关闭第一个页签
         * $('#make-tab').uitabs('close', 0);
         */
        close : function(n) {
            this._close(n);
        },
        /**
         * 关闭所有页签，由于该操作只关注于删除所有页签，因此只会触发 onCloseAll事件，而不会逐个触发每个页签的onClose事件。
         * @name uitabs#closeAll
         * @function
         * @example
         * //关闭所有页签
         * $('#make-tab').uitabs('closeAll');
         */
        closeAll : function() {
            this._closeAll();
        },
    
        /**
         * 选中特定的页签，触发activate事件。
         * @name uitabs#activate
         * @function
         * @param n 可为页签的索引（从0开始计数），或者页签的tabId
         * @example
         * //激活第一个页签
         * $('#make-tab').uitabs('activate', 0);
         */
        activate : function(n) {
            this._activate(n);
        },
        /**
         * 页签索引和tabId的转换器。传入其中的一个值，获取另一个值。
         * @name uitabs#getAlter
         * @function
         * @param id 标识符
         * @returns 如果id为数字，则表示页签的索引，函数返回页签的tabId；如果id为字符串，则表示该页签的tabId，函数返回页签的索引。
         *          如果索引不合法或者id作为tabId时找不到，则统一返回null。
         * @example
         * //获取第一个页签的tabId
         * var tabId = $('#make-tab').uitabs('getAlter', 0);
         */
        getAlter : function(id) {
            return this._getAlter(id);
        },
        /**
         * 返回当前选中的页签的tabId。
         * @name uitabs#getActivated
         * @function
         * @returns 当前选中页签的tabId
         * @example
         * //获取当前选中页签的tabId
         * var activatedTabId = $('#make-tab').uitabs('getActivated');
         */
        getActivated : function() {
            return this._getActivated();
        },
        /**
         * 获得所有页签的数目。
         * @name uitabs#getLength
         * @function
         * @returns 页签的数目
         * @example
         * //获取页签的总数
         * var total = $('#make-tab').uitabs('getLength');
         */
        getLength : function() {
            return this._getLength();
        },
        /**(deprecated，建议用reload方法)
         * 设置第n个页签的数据源，可为普通文本或者url。注意该方法只是会重置一个当前页签是否已被加载的标记，而不负责实际加载数据，
         * 在非懒加载的情况下，需要手动加载数据。在懒加载的情况下，当页签被点击选中时会检查是否已经加载的标记，从而尝试重新加载内容。
         * @deprecated
         * @name uitabs#setDataSource
         * @function
         * @param index 被操作页签的索引(从0开始计数)
         * @param content 设置了该属性则表示数据源为普通文本。
         * @param url 设置了该属性表示数据源是远程url，如果同时设置了content和url，则优先使用url。
         * @example
         * //设置第一个页签的数据源为远程数据
         *  $('#make-tab').uitabs('setDataSource', {
         *      index : 0,
         *      url : './ajax/content1.html'
         *  });
         */
        setDataSource : function(config /*content, url, index*/) {
            if (config.index === undefined || (  !config.url && !config.content )) {
                return;
            }
            this._setDataSource(config /*content, url, index*/);
        },
        /**
         * 根据新的数据源重新加载某个页签的内容。
         * @name uitabs#reload
         * @function
         * @param index 页签的索引
         * @param url 页签为远程取数时的url，此属性优先级高于content
         * @param content 页签的文本内容
         * @example
         * //重新加载第一个页签的内容
         * $('#make-tab').uitabs('reload', 0 , "./getData.html");
         */
        reload : function(index , url , content) {
            this._reload(index , url , content);
        },
        /**
         * 对组件重新布局，主要操作是刷新页签滚动箭头。
         * 如果有必要使用页签滚动箭头，则刷新滚动箭头的状态。如果没必要使用页签滚动箭头，则将存在的删除。
         * @name uitabs#doLayout
         * @function
         * @example
         * //对组件重新布局，如果有必要使用页签滚动箭头，则刷新滚动箭头的状态。
         */
        doLayout : function() {
            this._doLayout();
        },
        
        _create : function() {
            var $self = this.element;
            $.data($self, 'uitabs', {});
            $.data($self, 'uitabs').uitabs = this._makeSketch();
            $.data($self, 'uitabs').items = this._collectItems();
            $.data($self, 'uitabs').history = [];//页签访问的历史记录
        }, 
        
        _init : function() {
            this._render();
            this._afterRender();
            this._buildEvent();
        },
        
        _makeSketch : function() {
	        var $self = this.element,
	        	$tabs = $self.find('>ul').wrap('<div class="ui-tabs-headers ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"></div>').parent().parent()
	        			.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all').append('<div class="ui-tabs-panels ui-widget-content ui-corner-bottom"></div>');
	        //now we have a sketch, which contains the headers and panels
	        return $tabs;
    	},
    	
    	_collectItems : function() {
	        var _self = this,
	        	$self = this.element,
	        	options = this.options,
	        	items = [],
	        	loadInfo = [];
	        $self.find('>div.ui-tabs-headers a').each(function(){
	            var href  = this.getAttribute('href', 2);
	            var hrefBase = href.split( "#" )[ 0 ],
	                baseEl;
	            if ( hrefBase && ( hrefBase === location.toString().split( "#" )[ 0 ] ||
	                    ( baseEl = $( "base" )[ 0 ]) && hrefBase === baseEl.href ) ) {
	                href = this.hash;
	                this.href = href;
	            }
	            var anchor = $(this);
	            var tabId = anchor.attr('tabId') || anchor.attr('id') || tabIdPrefix + id++ ;
	            anchor.attr('tabId', tabId);
	            var cfg = {
	                    tabId : tabId,
	                    title : anchor.text(),
	                    _closeMode : "visibility",
	                    noheader : true,
	                    closed : true,//先全部隐藏.
	                    width  : options.width,
	                    onSuccess : function(data, textStatus, xmlHttpRequest){
	        				_self._trigger("onLoadComplete",null,cfg.tabId);
	        				
			        	},
			        	onError : function(xmlHttpRequest, textStatus, errorThrown){
			        		_self._trigger("onLoadComplete",null,cfg.tabId);
			        	}
	            };

	            var target = $('>' + href, $self)[0];
	            
	            // 考虑到tab DOM结构不完整的情况。
	            // 例如，当anchor的href='#tab-3'，而用户忘记在tabs里面写id=tab-3的DOM，此时不应该把#tab-3作为url进行load
	            // http://jira.apusic.net/browse/AOM-204
	            if (!target && href.indexOf('#') != 0) {
	                //如果是url，并且是非懒加载，则直接交由panel去加载
	                if(options.lazyLoad === false){
	                	cfg.url = href;
	                }else{
	                	loadInfo.push({
	                		tabId: tabId,
	                		url: href,
	                		loaded: false  
	                	});
	                }
	            }
	            var item = new panel(target || $('<div></div>')[0], cfg);
	            items.push(item);
	        });
	        
	        if(loadInfo.length > 0){
            	//一旦存储在loadInfo中，表示该tab还没有进行加载(设置了懒加载)，一旦tab加载完了，相应的要删掉其loadInfo信息
            	$.data($self , "uitabs").loadInfo = loadInfo;
            }
	        // tems 是panel的集合.每一个item通过 $(item).panel('panel')之后能获取到对应的panel对象
	        return items;
    	},
    	
    	_render : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items;
	        // 对不合法的值处理
	        if(typeof options.active == 'number'){
	        	if (options.active < 0) {
	        		options.active = 0;
	        	}
	        	if (options.active > items.length - 1) {
	        		options.active = items.length - 1;
	        	}
	        }
	        if (options.width == 'fit') {
	        	$uitabs.outerWidth($uitabs.parent().innerWidth());
	        } else if (options.width != 'auto') {
	            $uitabs.css('width', options.width);
	            // 解决IE7下，tabs在table>tr>td中ul把table的宽度撑宽的问题
	//            uitabs.children(':first').css('width',options.width);
	            var isPercent = isNaN(options.width) && options.width.indexOf('%') != -1;
	            $uitabs.children(':first').css('width',isPercent?'100%':options.width);
	        }
	        if (options.height == 'fit') {
	        	$uitabs.outerHeight($uitabs.parent().innerHeight());
	        } else if (options.height != 'auto') {
	            $uitabs.css('height', options.height);
	        }
	        this._renderHeader();
	        this._renderBody();
    	},
    	
		_renderHeader : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs;
	        var $headers = $uitabs.find('>div.ui-tabs-headers');
	        var $lis = $headers.find('ul li');
	        $lis.addClass('ui-state-default ui-corner-top');
	        $lis.each(function(n){
	            //$('a.om-icon-close', $(this)).remove(); 暂时去掉
	            
	            var $innera = $(this).find('a:first');
	            if ($.browser.msie && parseInt($.browser.version) == 7 ) {
	                $innera.attr('hideFocus', 'true');
	            }
	            if (!$innera.hasClass('ui-tabs-inner')) {
	                $innera.addClass('ui-tabs-inner');
	            }
	            if (n === options.active || options.active === $innera.attr('tabId')) {
	                $(this).addClass('ui-tabs-activated ui-state-active');
	                options.activeTabId = $innera.attr('tabId');
	                options.active = n;
	                var i=0,
	                	his;
	                while(his=data.history[i]){
	                	if(options.activeTabId != his){ //防止多次条用init时加入重复的历史记录导致active不正确
	                		data.history.push(options.activeTabId);
	                		break;
	                	}
	                }
	            } else {
	            	$(this).removeClass('ui-tabs-activated ui-state-active');
	            }
	            //tab width and height. by default, tabWidth=auto tabHeight=25, accept 'auto'
	            $innera.css({
	                'width' : options.tabWidth,
	                'height' : options.tabHeight
	            });
	            if (options.closable===true || ($.isArray(options.closable) && -1 !== $.inArray(n,options.closable))) {
	            	if($innera.next('.ui-icon-close').length <= 0){
	            		$('<a class="ui-icon ui-icon-close"></a>').insertAfter($innera);
	            	}
	            }else{
	            	$innera.next().remove();
	            }
	        });
	        var aHeight = $lis.find('a.ui-tabs-inner').height();
	         $lis.parent().css({
	            // 'height' : ++ aHeight ,
	             'line-height' : aHeight + 'px'
	         });
	        $headers.height(aHeight + 7);
	        this._checkScroller() && this._enableScroller();
    	},
    	
		_renderBody : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	        	$panels = $uitabs.find('>div.ui-tabs-panels');
	        //detach all sub divs
	        $panels.children().detach();
	        if (options.height !== 'auto') {
	            var uitabsHeight = $uitabs.innerHeight(),
	                headersHeight = $uitabs.find('>div.ui-tabs-headers').outerHeight();
	            $panels.css('height', uitabsHeight - headersHeight);
	        }
	        options.border ? $uitabs.removeClass('ui-tabs-noborder') : $uitabs.addClass('ui-tabs-noborder');
	        var i = items.length;
	        while( i-- ) {
				items[i].addClass("ui-state-nobd").parent().prependTo($panels);
	        }
    	},
    	
    	_afterRender : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            items = data.items,
	            $uitabs = data.uitabs;
	        var i = items.length;
	        $self.children().each(function(){
	            if (!$(this).hasClass('ui-tabs-headers') &&
	                    !$(this).hasClass('ui-tabs-panels') ) {
	                $(this).remove();
	            }
	        });
	        if (!options.lazyLoad) {
	            //$(items).panel('reload');
	        }
	        while( i -- ) {
	            var $target = $(items[i]);
	            if (i == options.active) {
	                $target.panel('open');
	            } else {
	                $target.panel('close');
	            }
	        }
	        $uitabs.css('height',$uitabs.height());
	    	$uitabs.css('height',options.height);
    	},
    	
		_buildEvent : function() {
	        var that = this,
	        	$self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            $closeIcon = $uitabs.find('>div.ui-tabs-headers a.ui-icon-close');
	        //close icon
	        $closeIcon.unbind('click.uitabs');
	        $closeIcon.bind('click.uitabs', function(e){
	            var tabid = $(e.target).prev().attr('tabId');
	            that._close(tabid);
	            return false;
	        });
	        // tab click
	        var $tabInner = $uitabs.find('>div.ui-tabs-headers a.ui-tabs-inner'); 
	        if (options.switchMode.indexOf('mouseover') != -1) {
	        	$tabInner.bind('mouseover.uitabs', function() {
	                 var tabId = $(this).attr('tabId'), timer = $.data($self, 'activateTimer');
	                (typeof timer !=='undefined') && clearTimeout(timer);
	                timer = setTimeout(function(){
	                    that._activate(tabId);
	                    return false;
	                },500);
	                $.data($self, 'activateTimer', timer);
	            });
	        } else if (options.switchMode.indexOf('click') != -1 ) {
	        	$tabInner.bind('click.uitabs', function(){
	                that._activate($(this).attr('tabId'));
	            });
	        }
	        $tabInner.bind('click.uitabs',function(){
	        	return false;
	        });
	        if (options.autoPlay != false ) {
	            options.autoInterId = setInterval(function(){
	                $self.uitabs('activate', 'next');
	            }, options.interval);
	        } else {
	            clearInterval(options.autoInterId);
	        }
	        //tab hover
	        if ( options.switchMode.indexOf("mouseover") == -1 ) {
	            var $lis = $uitabs.find('>div.ui-tabs-headers li');
	            var addState = function( state, $el ) {
	                if ( $el.is( ":not(.ui-state-disabled)" ) ) {
	                    $el.addClass( "ui-state-" + state );
	                }
	            };
	            var removeState = function( state, $el ) {
	                $el.removeClass( "ui-state-" + state );
	            };
	            $lis.bind( "mouseover.uitabs" , function() {
	                addState( "hover", $( this ) );
	            });
	            $lis.bind( "mouseout.uitabs", function() {
	                removeState( "hover", $( this ) );
	            });
	        }
	        //scroller click
	        $uitabs.find('>div.ui-tabs-headers >span').bind('click.uitabs', function(e) {
	            if ($(this).hasClass('ui-tabs-scroll-disabled')) {
	                return false;
	            }
	            var dist = $(this).parent().find('ul').children(':last').outerWidth(true);
	            if ($(this).hasClass('ui-tabs-scroll-left')) {
	                that._scroll(dist, that._scrollCbFn());
	            }
	            if ($(this).hasClass('ui-tabs-scroll-right')) {
	                that._scroll(- dist, that._scrollCbFn());
	            }
	            return false;
	        });
		},
		
    	//remove every events.
		_purgeEvent : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs;
	        var $headers = $uitabs.find('>div.ui-tabs-headers');
	
	        $headers.children().unbind('.uitabs');
	        $headers.find('>ul >li >a').unbind('.uitabs');
	        if (options.autoInterId) {
	            clearInterval(options.autoInterId);
	        }
    	},
    	
	    /**
	     * 选中特定的页签
	     * n 可为页签的索引（从0开始计数），或者页签的tabId TODO n 需要支持first  和 last 表示选中第一个和最后一个
	     */
     	_activate : function(n) {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	            url;
	        var $ul = $uitabs.find('>div.ui-tabs-headers ul');
	        if ( options.activeTabId == n || options.active == n ) {
	            return false;
	        }
	        n = n || 0;
	        var $anchor , tid = n;
	        if ( n == 'next' ) {
	            n = (options.active + 1) % items.length ;
	        } else if ( n == 'prev' ) {
	            n = (options.active - 1) % items.length ;
	        } 
	        if (typeof n == 'number') {
	            tid = this._getAlter(n);
	        } else if (typeof n == 'string') {
	            n = this._getAlter(n);
	        }
	        if (options.onBeforeActivate && this._trigger("onBeforeActivate",null,n) == false) {
	            return false;
	        }
	        $anchor = $ul.find('li a[tabId=' + tid + ']');
	        $anchor.parent().siblings().removeClass('ui-tabs-activated ui-state-active');
	        $anchor.parent().addClass('ui-tabs-activated ui-state-active');
	        options.activeTabId = tid;
	        options.active = n;
	        var i = items.length;
	        // 保证切换面板时先显示后隐藏，防止页面抖动的现象
	        for(i=items.length;i--;i>=0){
	        	var $target = items[i];
	        	if ($target.panel('option' , 'tabId')== tid) {
	        		$target.panel('open');
	        		if(url=this._getUnloadedUrl(tid)){
	        			$target.panel("reload" , url);
	        			this._removeLoadInfo(tid);
	        		}
	        	}
	        }
	        for(i=items.length;i--;i>=0){
	        	var $target = items[i];
	        	if ($target.panel('option' , 'tabId') != tid) {
	        		$target.panel('close');
	        	}
	        }
	        //当选中了一个并未完全显示的页签,需要滚动让他完全显示出来
	        if (this._checkScroller()) {
	            //stop every animation.
	            $ul.stop(true, true);
	            $self.clearQueue();
	            var $lScroller = $ul.prev();
	            var $rScroller = $ul.next();
	            var lBorder = $anchor.parent().offset().left;
	            var rBorder = lBorder + $anchor.parent().outerWidth(true);
	            var lDiff = $lScroller.offset().left + $lScroller.outerWidth(true) + 4 - lBorder ;
	            var rDiff = $rScroller.offset().left - rBorder ;
	            if (lDiff >= 0) {
	                this._scroll(lDiff, this._scrollCbFn());
	            } else if (rDiff <= 0) {
	                this._scroll(rDiff, this._scrollCbFn());
	            } else {
	                this._scrollCbFn()();
	            }
	        }
	        var his = data.history,
	        	index = data.history.length;
	        while(his[--index] && tid !== his[index]){};
	        index==-1 ? his.push(tid) : his.push(his.splice(index , 1)[0]);
	        options.onActivate && this._trigger("onActivate",null,n);
    	},
    
		/**
    	 * 如果对应的tab已经加载过了，返回null,否则返回指定tab的url
    	 */
		_getUnloadedUrl : function(tid){
    		var loadInfo = $.data(this.element, 'uitabs').loadInfo, 
    			len,
    			info;
    		if(loadInfo){
    			len = loadInfo.length;
    			while(info=loadInfo[--len]){
    				if(info.tabId === tid && info.loaded === false){
    					return info.url;
    				}
    			}
    		}
    	 	return null;
		},
		
		/**
		 * 把对应的tab的loadInfo信息删除掉
		 */
		_removeLoadInfo : function(tid){
			var loadInfo = $.data(this.element, 'uitabs').loadInfo, 
    			len,
    			info;
    		if(loadInfo){
    			len = loadInfo.length;
    			while(info=loadInfo[--len]){
    				if(info.tabId === tid){
    					loadInfo.splice(len , 1);
    					break;
    				}
    			}
    		}
		},
		
		/**
		 * 添加对应的tab的loadInfo信息
		 */
		_addLoadInfo : function(tabId , url){
			$.data(this.element, 'uitabs').loadInfo.push({
				tabId : tabId , 
				loaded: false , 
				url : url
			});
		},
    
	    /**
	     * 页签索引和tabId的转换器。
	     * 如果传入的id为数字，则表示页签的索引，函数返回页签的tabId；如果id为字符串，则表示该页签的tabId，函数返回页签的索引。
	     */
		_getAlter : function(id) {
	        var $self = this.element,
	        	$uitabs = $.data($self, 'uitabs').uitabs,
	            rt;
	        if (typeof id == 'number'){
	            rt = $uitabs.find('>div.ui-tabs-headers li:nth-child(' + ++id + ') a.ui-tabs-inner').attr('tabId');
	        } else if (typeof id == 'string') {
	            $uitabs.find('>div.ui-tabs-headers li a.ui-tabs-inner').each(function(i){
	                if ($(this).attr('tabId') == id ) {
	                    rt = i;
	                    return false;
	                }
	            });
	        }
	        return rt===undefined? null : rt;//如果找不到要返回null,而不是undefined,这源于om-core.js中对于返回undefined，最终会返回组件实例
    	},
    	
	    /**
	     * 返回当前选中的页签的tabId
	     */
    	_getActivated : function() {
			return this.options.activeTabId;
    	},
    	
	    /**
	     * 增加一个tab到页签布局中.最后一个参数isAjax指示了ds是否为一个URL
	     */
    	_add : function(config/*title, content, url, closable , index,tabId*/) {
	        var _self = this,
	        	$self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items;
	        var $ul = $uitabs.find('>div.ui-tabs-headers ul');
	        var tabId = config.tabId?config.tabId:tabIdPrefix + id++;
	        //调整参数
	        config.index = config.index || 'last';
	        if (config.index == 'last' || config.index > items.length - 1) {
	            config.index = items.length;
	        }
	        config.title = config.title || 'New Title ' + tabId;
	        config.url = $.trim(config.url);
	        config.content = $.trim(config.content);
	        if (config.url) {
	            config.content = undefined;
	        } else {
	            config.url = undefined;
	            config.content = config.content || 'New Content ' + tabId;
	        }
	        if (options.onBeforeAdd && _self._trigger("onBeforeAdd",null,config/*title, content, url, closable , index*/) == false) {
	            return false;
	        }
	        var $nHeader=$('<li class="ui-state-default ui-corner-top"> </li>');
	        var $anchor = $('<a class="ui-tabs-inner"></a>').html(config.title).attr({
	                href : '#' + tabId,
	                tabId : tabId
	            }).css({
	                width : options.tabWidth,
	                height : options.tabHeight
	            }).appendTo($nHeader);
	        if ($.browser.msie && parseInt($.browser.version) == 7) {
	            $anchor.attr('hideFocus','true');
	        }
	        if ((config.closable === true) || 
	                (config.closable == undefined && options.closable)) {
	            $anchor.after('<a class="ui-icon ui-icon-close"></a>');
	        }
			var cfg = {
	            tabId : tabId,
	            title : $anchor.text(),
	            _closeMode : "visibility",
	            noheader : true,
	            closed : true,
	            width  : $uitabs.width(),
                onSuccess : function(data, textStatus, xmlHttpRequest){
    				_self._trigger("onLoadComplete",null,tabId);
	        	},
	        	onError : function(xmlHttpRequest, textStatus, errorThrown){
	        		_self._trigger("onLoadComplete",null,tabId);
	        	}
	        };
	        if(config.url){
	        	cfg.url = config.url;
	        	// 添加url请求content
	        	$.ajax({
	        		url : cfg.url,
	        		async : false,
	        		success : function (data){
	        			cfg.content = data;
	        		}
	        	})
	        }
	        $.extend(cfg, config);
	        
	        // 添加panel id
	        var $nPanel = new panel($('<div></div>').attr('id',tabId)[0],cfg);
	        if (config.index == items.length) {
	            items[config.index] = $nPanel;
	            $nHeader.appendTo($ul);
	        } else {
	            //insert at index
	            items.splice(config.index, 0, $nPanel);
	            $ul.children().eq(config.index).before($nHeader);
	        }
	        //om-tabs在添加很多个页签后，当页签头的宽度超过5000px的时候出现换行。所以这里进行宽度自动扩充
            if($ul.innerWidth()-$nHeader.position().left<500){
                $ul.width($ul.width()+500);
            }
	        //every time we add or close an tab, check if scroller is needed.
	        this._checkScroller() && this._enableScroller();
	        this._renderBody();
	        $nPanel.panel('body').html(cfg.content);
	        this._purgeEvent();
	        this._buildEvent();
	        this._trigger("onAdd",null,cfg);
	        this._activate(config.index);
    	},
    	
	    /**
	     * 将index处的页签关闭，如果index指向当前页签，则激活下一页签；如果当前页签是最后一个页签，则激活第一个页签
	     * index :页签的位置，可为数字，tabId等。 TODO index将要支持prev，  next， first， last
	     */
    	_close : function(index) {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	        	$headers = $uitabs.find('>div.ui-tabs-headers'),
	        	$panels = $uitabs.find('>div.ui-tabs-panels'),
	        	uitabsHeight = $uitabs.height(),
	        	tabId = index,//待关闭的tab的id
	        	his = data.history;//页签打开历史记录
	        index = (index === undefined ? options.active:index);
	        if (typeof index == 'string') {
	            //index is a tabid
	            index = this._getAlter(index);
	        }else{
	        	tabId = this._getAlter(index);
	        }
	        if (options.onBeforeClose && this._trigger("onBeforeClose",null,index) == false) {
	            return false;
	        }
	        //这里删除loadInfo是有必要的，因为也许该tab从来就没有激活过，但却是懒加载的
	        this._removeLoadInfo(this._getAlter(index));
	        var liR = $headers.find('li').eq(index);
	        var panelId = liR.find('a[tabid="' + tabId + '"]').attr('href');
	        //$headers.find('li').eq(index).remove();
	        liR.remove();
	        
	        $(panelId).panel('destroy');//_remove();
	        //$panels.children().find(">.panel-body").eq(index).panel('close');
	        //alert($panels.children().find(">.panel-body").eq(index).html());
	        //$panels.children().find(">.panel-body").eq(index).remove();
	        items.splice(index, 1);
	        //in case of all tabs are closed, set body height
	        if ($panels.children().length == 0) {
	            $panels.css({height : uitabsHeight - $headers.outerHeight()});
	        }
	        var len = his.length;
	        while(his[--len] && tabId === his[len]){
	        	his.splice(len , 1);
	        	break;
	        }
	        options.onClose && this._trigger("onClose",null,index);
	        if (items.length == 0) {
	            options.active = -1;
	            options.activeTabId = null;
	            return ;
	        } else if (index == options.active) {
	            options.active = -1;
	            this._activate(his.length>0? his.pop() : 0);
	        } else {
	            index < options.active && options.active --;
	            this._checkScroller() && this._enableScroller();
	        }
    	},
    	
	    /**
	     * 关闭所有页签，该操作会触发 closeAll事件
	     */
     	_closeAll : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	        	$headers = $uitabs.find('>div.ui-tabs-headers'),
	        	$panels = $uitabs.find('>div.ui-tabs-panels'),
	        	uitabsHeight = $uitabs.height();
	        
	        if (options.onBeforeCloseAll && this._trigger("onBeforeCloseAll") == false) {
	            return false;
	        }
	        for(var i=0,len=items.length; i<len; i++){
	        	this._removeLoadInfo(items[i].panel("option" , "tabId"));
	        }
	        $headers.find('li').remove();
	        $panels.children().remove();
	        items.splice(0,items.length);
	        $panels.css({height : uitabsHeight - $headers.outerHeight()});
	        options.active = -1;
	        options.activeTabId = null;
	        data.history = [];
	        options.onCloseAll && this._trigger("onCloseAll");
    	},
    	
	    /**
	     * 如果tab页签总宽度较大，则显示scroll并返回true；否则删除scroll并返回false。
	     */
     	_checkScroller : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs;
	        if (!options.scrollable) {
	            return false;
	        }
	        var $ul = $uitabs.find('>div.ui-tabs-headers ul');
	        var totalWidth = 0, flag = false;
	        if ($ul.hasClass('ui-tabs-scrollable')) {
	            //先假定没有左右滚动器 ,来计算宽度是否超过.
	            flag = true;
	            $ul.removeClass('ui-tabs-scrollable');
	        }
	        totalWidth += parseInt($ul.css('paddingLeft')) + parseInt($ul.css('paddingRight'));
	        if (flag == true) {
	            //重新加上滚动器 .
	            flag = false;
	            $ul.addClass('ui-tabs-scrollable');
	        }
	        $ul.children().each(function() {
	            //计算一个li占用的总宽度
	            totalWidth += $(this).outerWidth(true);//sub element's width
	        });
	        if (totalWidth > $ul.parent().innerWidth()) {
	            if (!$ul.hasClass('ui-tabs-scrollable')) {
	                var $leftScr = $('<span></span>').insertBefore($ul).addClass('ui-tabs-scroll-left');
	                var $rightScr = $('<span></span>').insertAfter($ul).addClass('ui-tabs-scroll-right');
	                var mgn = ($ul.height() - $leftScr.height())/2;
	                // $leftScr.add($rightScr).css({ // scroller in vertical center.
	                    // 'marginTop' : mgn,
	                    // 'marginBottom' : mgn
	                // });
	                $ul.addClass('ui-tabs-scrollable');
	            }
	            return true;
	        } else {
	            $ul.siblings().remove();
	            $ul.removeClass('ui-tabs-scrollable');
	            return false;
	        }
    	},
    	
	    /**
	     * 一般滚动之后都需要执行回调_enableScroller设置滚动条的状态，现包装成方法。
	     */
    	_scrollCbFn : function() {
    		var that = this;
	        return function(){
	            that._enableScroller();
	        };
    	},
    	
	    /**
	     * 根据页签的位置，设置scroller的状态。
	     * 当最右边的页签顶住组件右边沿，则右边的scroller应该禁用，表示不能再往右滚动了。
	     * 当最左边的页签顶住组件左边沿，则左边的scroller应该禁用，表示不能再往左滚动了。
	     */
     	_enableScroller : function() {
	        var $self = this.element,
	        	$uitabs = $.data($self, 'uitabs').uitabs,
	       		$headers = $uitabs.find('>div.ui-tabs-headers'),
	        	$ul = $headers.children('ul'),
	        	$lScroller = $ul.prev(),
	        	$rScroller = $ul.next(),
	        	$li = $ul.children(':last'),
	        	lBorder = $headers.offset().left,
	            rBorder = $rScroller.offset().left,
	            ulLeft = $ul.offset().left,
	            ulRight = $li.offset().left + $li.outerWidth(true);
	        if (ulLeft < lBorder) {
	            $lScroller.removeClass('ui-tabs-scroll-disabled');
	        } else {
	            $lScroller.addClass('ui-tabs-scroll-disabled');
	            //_scroll(self, lBorder - ulLeft);
	        }
	        if (ulRight > rBorder) {
	            $rScroller.removeClass('ui-tabs-scroll-disabled');
	        } else {
	            $rScroller.addClass('ui-tabs-scroll-disabled');
	            //_scroll(self, rBorder - ulRight);
	        }
    	},
    	
	    /**
	     * 将页签头部往右边滑动distance的距离。当distance为负数时，表示往左边滑动；fn为回调函数
	     */
     	_scroll : function(distance, fn) {
	        var $self = this.element,
	        	$uitabs = $.data($self, 'uitabs').uitabs,
	        	$ul = $uitabs.find('>div.ui-tabs-headers ul'),
	        	$li = $ul.children(':last');
	        if (distance == 0) {
	            return;
	        }
	        var scrOffset = distance > 0 ? $ul.prev().offset() : $ul.next().offset();
	        var queuedFn = function(next) {
	            if (distance > 0 && $ul.prev().hasClass('.ui-tabs-scroll-disabled') ||
	                    distance < 0 && $ul.next().hasClass('.ui-tabs-scroll-disabled')){
	                $ul.stop(true, true);
	                $self.clearQueue();
	                return;
	            }
	            var flag = false;
	            //fix distance.
	            distance = (distance > 0) ? '+=' + Math.min(scrOffset.left - $ul.offset().left, distance) : 
	                '-=' + Math.min($li.offset().left + $li.outerWidth(true) - scrOffset.left, Math.abs(distance));
	            $.data($self, 'uitabs').isScrolling = true;
	            $ul.animate({
	                left : distance + 'px'
	            },'normal', 'swing', function() {
	                !!fn && fn();
	                $.data($self, 'uitabs').isScrolling = false;
	                next();
	            });
	        };
	        $self.queue(queuedFn);
	        if( $self.queue().length == 1 && 
	                !$.data($self, 'uitabs').isScrolling){
	            $self.dequeue(); //start queue
	        }
    	},
    	
	    /**
	     * 获得当前所有页签的数目
	     */
	    _getLength : function() {
	        return $.data(this.element, 'uitabs').items.length;
	    },
	    
	    /**
	     * 重新计算uitabs布局
	     */
	    _doLayout : function() {
	        this._checkScroller() && this._enableScroller();
	    },
	    
	    /**
	     * 设置第config.index个页签的数据源，如果设置了cofnig.url，则数据源为远程数据，如果设置了config.content数据源为普通文本。
	     */
	    _setDataSource : function(config /*content, url, index*/) {
	        var $self = this.element,
	        	items = $.data($self, 'uitabs').items,
	        	options = this.options,
	        	tabId = this._getAlter(config.index);
	        config.url = $.trim(config.url);
	        config.content = $.trim(config.content);
	        if(config.url){
	        	if(options.lazyLoad !== false){
	        		this._addLoadInfo(tabId , config.url);
	        		items[config.index].panel("option" , "url" , config.url);	       
	        	}else{
	        		this._removeLoadInfo(tabId);
					items[config.index].panel("reload" , config.url);					 		
	        	}
	        }else{
	        	items[config.index].html(config.content);
	        }
	    },
	    
	    /**
	     * 重新加载第n个页签的内容
	     */
	    _reload : function(index , url , content) {
	    	var $self = this.element,
	        	items = $.data($self, 'uitabs').items,
	        	tabId = this._getAlter(index);
	        if(url){
	        	this._removeLoadInfo(tabId);
	        	items[index].panel("reload" , url);	
	        }else if(content){
	        	items[index].html(content);
	        }else{//只传了索引
	        	//case1:如果一个页签还未加载过，则panel中并不会保存其url,所以这里必须再传一个url给panel。
	        	//case2:页签如果已经加载过了，那么传给panel的url将会是null,这将会正常重新加载。
	        	items[index].panel("reload" , this._getUnloadedUrl(tabId));
	        	this._removeLoadInfo(tabId);
	        }
	    }
    });
})(jQuery);