/**
 * @auth 		 jacksyen
 * @created 	 2012.07.06 
 * @description  基于jquery UI、easyUI扩展的panel组件
 */
(function($) {
	
	$.widget("ui.panel" , {
		options : {
			// 标题
			title: null,
			// 图标样式
			iconCls: null,
			// 宽度
			width: 'auto',
			// 高度
			height: 'auto',
			// 靠左距离
			left: null,
			// 靠顶部距离
			top: null,
			// panel样式
			cls: null,
			// 头部样式
			headerCls: null,
			// body样式
			bodyCls: null,
			// 给面板自定义样式
			style: {},
			// 远程URL获取
			href: null,
			// 获取URL时缓存数据
			cache: true,
			// 当设置为true，面板尺寸将适合它的父容器
			fit: false,
			// 定义面板的边框
			border: true,
			// 当设置为true，面板载创建的时候将被调整和重新布局
			doSize: true,
			// 不添加头部
			noheader: false,
			// 具体内容
			content: null,
			// 定义是否显示可折叠定义按钮
			collapsible: true,
			// 定义是否显示最小化按钮
			minimizable: false,
			// 定义是否显示最大化按钮
			maximizable: false,
			// 定义是否显示关闭按钮
			closable: false,
			// 定义在初始化的时候折叠面板
			collapsed: false,
			// 定义在初始化的时候最小化面板
			minimized: false,
			// 定义在初始化的时候最大化面板
			maximized: false,
			// 定义在初始化的时候关闭面板
			closed: false,
			// 
			tools: [],	
			
			// 加载信息
			loadingMsg : '正在加载中...',
			
			// 事件
			onLoad: function(){},
			onBeforeOpen: function(){},
			onOpen: function(){},
			onBeforeClose: function(){},
			onClose: function(){},
			onBeforeDestroy: function(){},
			onDestroy: function(){},
			onResize: function(width,height){},
			onMove: function(left,top){},
			onMaximize: function(){},
			onRestore: function(){},
			onMinimize: function(){},
			onBeforeCollapse: function(){},
			onBeforeExpand: function(){},
			onCollapse: function(){},
			onExpand: function(){}
			
		},
		option : function (){
			return this.options;
		},
		panel : function (){
			return $.data(this.element,'panel').panel;
		},
		header: function (){
			return $.data(this.element,'panel').panel.find('>div.panel-header');
		},
		body : function (){
			return $.data(this.element,'panel').panel.find('>div.panel-body');
		},
		setTitle : function (param){
			var self = this;
			return self.element.each(function(){
				self._setTitle(this, param);
			});
		},
		open : function (param){
			var self = this;
			return self.element.each(function(){
				self._openPanel(param);
			});
		},
		close : function (){
			var self = this;
			return self.element.each(function(){
				self._closePanel(param);
			});
		},
		destroy : function (param){
			var self = this;
			return self.element.each(function(){
				self._destroyPanel(param);
			});
		},
		refresh : function (){
			var self = this;
			return self.element.each(function(){
				$.data(self.element,'panel').isLoaded = false;
				self._loadData(this);
			});
		},
		resize : function (param){
			var self = this;
			return self.element.each(function(){
				self._setSize(param);
			});
		},
		move : function (param){
			var self = this;
			return self.element.each(function(){
				self._movePanel(param);
			});
		},
		maximize : function (){
			var self = this;
			return self.element.each(function(){
				self._maximizePanel();
			});
		},
		minimize : function (){
			var self = this;
			return self.element.each(function(){
				self._minimizePanel();
			});
		},
		restore : function (){
			var self = this;
			return self.element.each(function(){
				self._restorePanel();
			});
		},
		collapse : function (param){
			var self = this;
			return self.element.each(function(){
				self._collapsePanel(param);	// param: boolean,indicate animate or not
			});
		},
		expand : function (param){
			var self = this;
			return self.element.each(function(){
				self._expandPanel(param);	// param: boolean,indicate animate or not
			});
		},
		_movePanel : function (param){
			var self  = this,
			    opts  = self.options,
				panel = $.data(self.element,'panel').panel;
			if (param){
				if (param.left != null) opts.left = param.left;
				if (param.top != null) opts.top = param.top;
			}
			panel.css({
				left: opts.left,
				top: opts.top
			});
			self._trigger("onMove", null, opts.left, opts.top);
		},
		_destroyPanel : function (forceDestroy){
			var self  = this,
			    opts  = self.options,
				panel = $.data(self.element,'panel').panel;
			
			if (forceDestroy != true){
				if (self._trigger("onBeforeDestroy") == false) return;
			}
			self._removeNode(panel);
			self._trigger("onDestroy");
		},
		_setTitle : function (target, title){
			this.options.title = title;
			$(target).panel('header').find('div.panel-title').html(title);
		},
		_create : function (){
			
			var self = this,
				ele  = self.element,
				opts = self.options,
				state= $.data(ele,'panel',{
					panel : self._wrapPanel(),
					isLoaded : false
				});
			self._addHeader();
			self._setBorder();
			if (opts.doSize == true){
				state.panel.css('display','block');
				self._setSize();
			}
			if (opts.closed == true){
				state.panel.hide();
			} else {
				self._openPanel();
			}
		},
		_wrapPanel : function (){
			var self  = this;
			var panel = this.element.addClass('panel-body').wrap('<div class="panel"></div>').parent();
			panel.bind('_resize', function(){
				var opts = self.options;
				if (opts.fit == true){
					self._setSize();
				}
				return false;
			});
			return panel;
		},
		_openPanel : function (forceOpen){
			var self = this,
				opts = self.options,
				panel= $.data(self.element,'panel').panel;
			
			if (forceOpen != true){
				if (self._trigger("onBeforeOpen") == false) return;
			}
			panel.show();
			opts.closed = false;
			self._trigger("onOpen");
			
			// TODO
			if (opts.maximized == true) self._maximizePanel();
			if (opts.minimized == true) self._minimizePanel();
			if (opts.collapsed == true) self._collapsePanel();
			
			if (!opts.collapsed){
				self._loadData();
			}
		},
		_setSize : function (param){
			var opts = this.options,
				panel= $.data(this.element,'panel').panel;
			var pheader = panel.find('>div.panel-header');
			var pbody = panel.find('>div.panel-body');
			
			if (param){
				if (param.width) opts.width = param.width;
				if (param.height) opts.height = param.height;
				if (param.left != null) opts.left = param.left;
				if (param.top != null) opts.top = param.top;
			}
			if (opts.fit == true){
				var p = panel.parent();
				opts.width = p.width();
				opts.height = p.height();
			}
			panel.css({
				left: opts.left,
				top: opts.top
			});
			panel.css(opts.style);
			panel.addClass(opts.cls);
			pheader.addClass(opts.headerCls);
			pbody.addClass(opts.bodyCls);
			if (!isNaN(opts.width)){
				if ($.boxModel == true){
					panel.width(opts.width - (panel.outerWidth() - panel.width()));
					pheader.width(panel.width() - (pheader.outerWidth() - pheader.width()));
					pbody.width(panel.width() - (pbody.outerWidth() - pbody.width()));
				} else {
					panel.width(opts.width);
					pheader.width(panel.width());
					pbody.width(panel.width());
				}
			} else {
				panel.width('auto');
				pbody.width('auto');
			}
			if (!isNaN(opts.height)){
	//			var height = opts.height - (panel.outerHeight()-panel.height()) - pheader.outerHeight();
	//			if ($.boxModel == true){
	//				height -= pbody.outerHeight() - pbody.height();
	//			}
	//			pbody.height(height);
				
				if ($.boxModel == true){
					panel.height(opts.height - (panel.outerHeight() - panel.height()));
					pbody.height(panel.height() - pheader.outerHeight() - (pbody.outerHeight() - pbody.height()));
				} else {
					panel.height(opts.height);
					pbody.height(panel.height() - pheader.outerHeight());
				}
			} else {
				pbody.height('auto');
			}
			panel.css('height', null);
			
			this._trigger("onResize", null, opts.width, opts.height);
			
			//panel.find('>div.panel-body>div').triggerHandler('_resize');
		},
		_setBorder : function (){
			var opts = this.options,
				panel= $.data(this.element,'panel').panel;
				
			if (opts.border == true){
				panel.find('>div.panel-header').removeClass('panel-header-noborder');
				panel.find('>div.panel-body').removeClass('panel-body-noborder');
			} else {
				panel.find('>div.panel-header').addClass('panel-header-noborder');
				panel.find('>div.panel-body').addClass('panel-body-noborder');
			}
		},
		_addHeader : function (){
			var self = this,
				ele  = self.element,
				opts = self.options,
				panel= $.data(ele,'panel').panel;
			
			self._removeNode(panel.find('>div.panel-header'));
			if (opts.title && !opts.noheader){
				var header = $('<div class="panel-header"><div class="panel-title">'+opts.title+'</div></div>').prependTo(panel);
				if (opts.iconCls){
					header.find('.panel-title').addClass('panel-with-icon');
					$('<div class="panel-icon"></div>').addClass(opts.iconCls).appendTo(header);
				}
				var tool = $('<div class="panel-tool"></div>').appendTo(header);
				if (opts.collapsible){
					$('<a class="panel-tool-collapse"></a>').appendTo(tool).bind('click', onToggle);
				}
				if (opts.minimizable){
					$('<a class="panel-tool-min"></a>').appendTo(tool).bind('click', onMin);
				}
				if (opts.maximizable){
					$('<a class="panel-tool-max"></a>').appendTo(tool).bind('click', onMax);
				}
				if (opts.closable){
					$('<a class="panel-tool-close"></a>').appendTo(tool).bind('click', onClose);
				}
				if (opts.tools){
					for(var i=opts.tools.length-1; i>=0; i--){
						var t = $('<div></div>').addClass(opts.tools[i].iconCls).appendTo(tool);
						if (opts.tools[i].handler){
							t.bind('click', eval(opts.tools[i].handler));
						}
					}
				}
				tool.find('div').hover(
					function(){$(this).addClass('panel-tool-over');},
					function(){$(this).removeClass('panel-tool-over');}
				);
				panel.find('>div.panel-body').removeClass('panel-body-noheader');
			} else {
				panel.find('>div.panel-body').addClass('panel-body-noheader');
			}
			function onToggle(){
				if($(this).hasClass('panel-tool-expand')){
					self._expandPanel(true);
				} else {
					self._collapsePanel(true);
				}
				return false;
			}
			function onClose(){
				self._closePanel();
				return false;
			}
			function onMin(){
				self._minimizePanel();
				return false;
			}
			function onMax(){
				if ($(this).hasClass('panel-tool-restore')){
					self._restorePanel();
				} else {
					self._maximizePanel();
				}
				return false;
			}
		},
		_restorePanel  : function (){
			var self  = this,
			  	opts  = self.options,
				panel = $.data(self.element,'panel').panel;
			var tool = panel.find('>div.panel-header .panel-tool-max');
			
			if (!tool.hasClass('panel-tool-restore')) return;
			
			panel.show();
			tool.removeClass('panel-tool-restore');
			var original = $.data(this.element, 'panel').original;
			opts.width = original.width;
			opts.height = original.height;
			opts.left = original.left;
			opts.top = original.top;
			opts.fit = original.fit;
			self._setSize();
			opts.minimized = false;
			opts.maximized = false;
			self._trigger("onRestore");
		},
		_maximizePanel : function (){
			var self  = this,
				opts  = self.options,
				panel = $.data(self.element,'panel').panel;
			var tool = panel.find('>div.panel-header .panel-tool-max');
			
			if (tool.hasClass('panel-tool-restore')) return;
			
			tool.addClass('panel-tool-restore');
			
			$.data(self.element, 'panel').original = {
				width: opts.width,
				height: opts.height,
				left: opts.left,
				top: opts.top,
				fit: opts.fit
			};
			opts.left = 0;
			opts.top = 0;
			opts.fit = true;
			self._setSize();
			opts.minimized = false;
			opts.maximized = true;
			self._trigger("onMaximize");
		},
		_minimizePanel : function (){
			var opts  = this.options,
				panel = $.data(this.element,'panel').panel;
			panel.hide();
			opts.minimized = true;
			opts.maximized = false;
			this._trigger("onMinimize");
		},
		_removeNode : function (node){
			node.each(function(){
				$(this).remove();
				if ($.browser.msie){
					this.outerHTML = '';
				}
			});
		},
		_closePanel : function (forceClose){
			var self = this,
				ele  = self.element,
				opts = self.options,
				panel= $.data(ele,'panel').panel;
			
			if (forceClose != true){
				if (self._trigger("onBeforeClose") == false) return;
			}
			panel.hide();
			opts.closed = true;
			self._trigger("onClose");
		},
		/**
		 * 展开面板
 	 	 * @param {Object} animate
		 */
		_expandPanel : function (animate){
			var self = this,
				ele  = self.element,
				opts = self.options,
				panel= $.data(ele,'panel').panel;
			var body = panel.find('>div.panel-body');
			var tool = panel.find('>div.panel-header .panel-tool-collapse');
			if (!tool.hasClass('panel-tool-expand')) return;
			body.stop(true, true);	// stop animation
			if (self._trigger("onBeforeExpand") == false) return;
			tool.removeClass('panel-tool-expand');
			if (animate == true){
				body.slideDown('normal', function(){
					opts.collapsed = false;
					self._trigger("onExpand");
					self._loadData();
				});
			} else {
				body.show();
				opts.collapsed = false;
				self._trigger("onExpand");
				self._loadData();
			}
		},
		_loadData : function (){
			var self = this,
				ele  = self.element,
				opts = self.options,
				state= $.data(ele,'panel');
		
			if (opts.href && (!state.isLoaded || !opts.cache)){
				state.isLoaded = false;
				var pbody = state.panel.find('>div.panel-body');
				pbody.html($('<div class="panel-loading"></div>').html(opts.loadingMsg));
				pbody.load(opts.href, null, function(){
					self._trigger("onLoad");
					state.isLoaded = true;
				});
			}
		},
		/**
		 * 收缩面板
 	 	 * @param {Object} animate
		 */
		_collapsePanel : function (animate){
			var self = this,
				ele  = self.element,
				opts = self.options,
				panel= $.data(ele,'panel').panel;
			
			var body = panel.find('>div.panel-body');
			var tool = panel.find('>div.panel-header .panel-tool-collapse');
			
			if (tool.hasClass('panel-tool-expand')) return;
			
			body.stop(true, true);	// stop animation
			if (self._trigger("onBeforeCollapse") == false) return;
			
			tool.addClass('panel-tool-expand');
			if (animate == true){
				body.slideUp('normal', function(){
					opts.collapsed = true;
					self._trigger("onCollapse");
				});
			} else {
				body.hide();
				opts.collapsed = true;
				self._trigger("onCollapse");
			}
		}
	});
})(jQuery);