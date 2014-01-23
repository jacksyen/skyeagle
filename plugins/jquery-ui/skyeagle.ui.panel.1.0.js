/**
 * @auth 		 jacksyen
 * @created 	 2012.06.13 
 * @description  基于jquery UI扩展的panel组件
 */
(function ($){
	
	var innerToolId  = ['collapse','min','max','close'];
		innerToolCls = ['sy-panel-tool-collapse','sy-panel-tool-expand','sy-panel-tool-min',
						'sy-panel-tool-max','sy-panel-tool-close'];
	
	$.widget( "ui.panel", {
		version: "@VERSION",
		delay: 300,
		options: {
			// custom
			// 是否显示头信息
			header  : true,
			// 面板样式
			cls : null,
			// 标题栏图标样式
			iconCls : null,
			// 是否可折叠，默认为false
			collapsible : false,
			// 是否显示关闭按钮
			closable : false,
			// 标题
			title : null,
			// 初始是否折叠窗口状态
			collapsed : false,
			// 是否关闭
			closed : false,
			// 是否自适应大小
			fit : false,
			// 宽度
			width : 'auto',
			// 高度
			height : 'auto',
			// 远程加载url
			href : null,
			// 等待信息
			loadingMsg : '正在加载中...',
			// 是否有边框
			border : true,
			// 靠左边距离
			left : null,
			// 靠上边距离
			top  : null,
			// 定制工具,每个工具可以包含两个性质： iconCls 、 handler	[]
			tools : [],
			
	
			// callbacks
			onLoad : null,
			onBeforeOpen : null,
			onOpen : null,
			onBeforeClose : null,
			onClose : null,
			onBeforeCollpase : null,
			onCollapse : null,
			onBeforeExpand : null,
			onExpand : null,
			onResize : null
			
		},
		_create : function (){
			this.element.addClass("sy-panel-body sy-widget-content")
		    	.wrap("<div class='sy-widget sy-panel'></div>");
		},
		_init : function (){
			var panel,
				that    = this,
				options = this.options,
				body    = this.element,
				parent  = body.parent(),
				active  = options.active;
			
			this._initHeader();
			var header = body.prev();
			if(header === false){
				body.addClass("sy-panel-noheader");
			}
			if(options.border === false){
				header.addClass('sy-panel-header-noborder');
				body.addClass('sy-panel-body-noborder');
			}
			this._bindEvent();
			this._resize();
			
			var headerHeight = options.header !== false? header.outerHeight() : 0;
			if(options.collapsed !== false){
				//"auto"!==options.height && parent.height(headerHeight);// 类型如if语句
				body.hide();
				if(options.header !== false){
					header.find('>div.sy-panel-tool >div.sy-panel-tool-collapse').removeClass(
						'sy-panel-tool-collapse').addClass('sy-panel-tool-expand');
				}
			}
			/*else{
				"auto"!==options.height && parent.height(headerHeight + body.outerHeight());
		 		if(options.header !== false){
		 			header.find('>div.sy-panel-tool >div.sy-panel-tool-expand').removeClass(
						'sy-panel-tool-expand').addClass('sy-panel-tool-collapse');
				}
			}
			*/
			if(options.closed !== false){
				parent.hide();
			}
			body.data('panel',parent);
			
			this.reload();
		},
		/**
		 * 初始化头部样式信息 
		 */
		_initHeader : function (){
			if(this.options.header === false){
				return;
			}
			var that    = this,
				options = this.options,
				tools   = options.tools;
			var header  = $("<div class='sy-panel-header'></div>").insertBefore(this.element);
			if(options.iconCls){
				$("<div class='sy-icon sy-panel-icon'></div>").addClass(options.iconCls).appendTo(header);
			}
			$("<div class='sy-panel-title'></div>").html(options.title).appendTo(header);
			var tool = $("<div class='sy-panel-tool'></div>");
			
			if(options.collapsible !== false){
				$("<div class='sy-icon sy-panel-tool-collapse'></div>").appendTo(tool);	
			}
			// 添加自定义按钮
			if($.isArray(tools)){
				for(var i=0,len=tools.length; i<len; i++){
					var t = tools[i],
						iconCls;
					var ic;
					if(iconCls = this._getInnerToolCls(t.id)){
						ic = $("<div class='sy-icon'></div>").addClass(iconCls).appendTo(tool);
						ic.bind('click',eval(t.handler));
					}else if(typeof t.iconCls === 'string'){
						ic = $("<div class='sy-icon'></div>").addClass(t.iconCls).appendTo(tool);
						ic.bind('click',eval(t.handler));
					}else if($.isArray(t.iconCls)){
						//这里必须要用内部匿名函数，因为hover中用到了tool，否则tool的值很可能已经被改掉了
						(function(tmp){
							var tc = $("<div class='sy-icon'></div>").addClass(tmp.iconCls[0]).hover(function() {
								if(tmp.iconCls[1]){
									$(this).toggleClass(tmp.iconCls[1]);
								}
							});
							tc.bind('click',eval(tmp.handler));
						})(t);
					}
				}
			}
			
			// 添加关闭按钮样式
			if(options.closable !== false){
				$("<div class='sy-icon sy-panel-tool-close'></div>").appendTo(tool);
			}
			tool.appendTo(header);
		},
		_getInnerToolCls: function(id){
	 		return $.inArray(id , innerToolId)!=-1? 'sy-panel-tool-'+id : null;
	 	},
		/*
		 * 绑定事件
		 */
		_bindEvent  : function (){
			var self	= this,
				body    = this.element,
				tools	= body.prev().find('>div.sy-panel-tool'),
				options = this.options;
			if(options.collapsible){
				tools.find(">div.sy-panel-tool-collapse , >div.sy-panel-tool-expand")
					.click(function(){
						if(options.collapsed !== false){
							self.expand();
						}else{
							self.collapse();
						}
					});
			}
			if(options.closable !== false){
				tools.find(">div.sy-panel-tool-close")
					.click(function (){
					 	self.close();
					 });
			}
		},
		/**
		 * 重置大小 
		 */
		_resize : function (panel){
			var body    = this.element,
	 			header  = body.prev(),
	 			panel   = body.parent(),
	 			options = this.options;
	 		if(options.fit == true){
	 			var p = panel.parent()
	 			options.width = p.width();
	 			panel.width(options.width);
	 			header.width('');
	 			body.width('');
	 			// options.height = '100%';
	 			// panel.height(options.height);
	 			//panel.height('100px');
	 			body.outerHeight(panel.height()- (options.header!==false?header.outerHeight():0) );	
	 			return;
	 		}
	 		panel.css({
				left : options.left,
				top  : options.top
			});
	 		// 添加自定义样式信息
	 		if(options.cls)	panel.addClass(options.cls);
	 		
	 		if(!isNaN(options.width)) {
	 			panel.width(options.width);
				header.outerWidth(panel.width());
				body.outerWidth(panel.width());
	 		}else{
	 			panel.width('auto');
	 			body.width('auto');
	 		}
	 		if(!isNaN(options.height)){
	 			panel.height(options.height);
				body.outerHeight(panel.height()- (options.header!==false?header.outerHeight():0) );	 
	 		}else{
	 			body.height('auto');
	 		}
	 		panel.css('height','');
	 		
		},
		/**
		 * 获取options信息 
		 */
		opts : function (){
			return this.options;
		},
		/**
		 * 获取panel对象 
		 */
		panel : function (){
			var body 	= this.element;
			return body.parent();
		},
		/**
		 * 打开面板 
		 */
		open : function (){
			var body 	= this.element,
				options = this.options;
			if(options.closed){
				
				body.parent().show();
				options.closed = false;
				this._trigger("onOpen");
			}
		},
		/**
		 * 关闭窗口 
		 */
		close : function (){
			var body 	= this.element,
				options = this.options;
			if(!options.closed){
				this._trigger("onBeforeClose");
				body.parent().hide();
				options.closed = true;
				this._trigger("onClose");
			}
		},
		/**
		 *  折叠窗口
		 */
		collapse : function (){
			var self = this,
				body = this.element,
				header = body.prev(),
				options = this.options;
			this._trigger("onBeforeCollapse");
			if(header.length !== 0){
				var tool = header.find('>div.sy-panel-tool >div.sy-panel-tool-collapse');
				if(tool.length !== 0){
					tool.removeClass("sy-panel-tool-collapse").addClass("sy-panel-tool-expand");
					if(tool.hasClass("sy-panel-tool-collapse-hover")){
						tool.toggleClass("sy-panel-tool-collapse-hover sy-panel-tool-expand-hover");
					}
				}
				body.slideUp("normal", function() {
					options.collapsed = true;
					self._trigger("onCollapse");
				});		
			}
		},
		/**
		 * 展开窗口 
		 */
		expand  : function (){
			var self = this,
				body = this.element,
				header = body.prev(),
				options = this.options;
			this._trigger("onBeforeExpand");
			if(header.length !== 0){
				var tool = header.find('>div.sy-panel-tool >div.sy-panel-tool-expand');
				if(tool.length !== 0){
					tool.removeClass("sy-panel-tool-expand").addClass("sy-panel-tool-collapse");
					if(tool.hasClass("sy-panel-tool-expand-hover")){
						tool.toggleClass("sy-panel-tool-expand-hover sy-panel-tool-collapse-hover");
					}
				}
				body.slideDown("normal", function() {
					options.collapsed = false;
					self._trigger("onExpand");
				});
			}
		},
		/**
		 * 重新加载数据，指定url，则请求远程数据 
		 */
		reload : function (href){
			var self 	= this,
				body 	= this.element,
				options = this.options;
			if(body.data('load')){
				return;
			}else{
				body.data('load',true);
			}
			href = href || options.href;
			if(!href){
				body.data('load',false);
				return;
			}
			options.href = href;
			body.html($('<div class="sy-panel-loading"></div>').html(options.loadingMsg));
			body.load(options.href, null, function() {
				self._trigger( "onLoad");
			});
		},
		/**
		 * 销毁面板 
		 */
		destroy : function (){
			var body = this.element;
			//body.parent().after(body).remove();
			
			body.parent().after(body).remove();
		
			
			//body.after(body.prev()).remove();
			//$('div[class="' + parent.attr('class') + '"]').remove();
		},
		/**
		 * 重置大小
 		 * @param {Object} param {} or width,height,left,top
 		 * @param eg1. $('#panel').panel('resize',{ width : 100, height: 100, left : 10, top : 10});
 		 * @param eg2. $('#panel').panel('resize', width, height, left, top);
		 */
		resize : function (param){
			var options = this.options,
				width,
		 		height,
		 		left,
		 		top;
		 	if($.isPlainObject(param)){
		 		width = param.width || null;
		 		height= param.height || null;
		 		left  = param.left || null;
		 		top   = param.top  || null;
		 	}else{
		 		width = arguments[0];
		 		height= arguments[1];
		 		left  = arguments[2];
		 		top   = arguments[3];
		 	}
			options.width = width || options.width;
		 	options.height= height || options.height;
		 	options.left  = left || options.left;
		 	options.top   = top || options.top;
		 	this._resize(this.element.parent());
		 	this._trigger( "onResize");
		}
	});
})(jQuery);
