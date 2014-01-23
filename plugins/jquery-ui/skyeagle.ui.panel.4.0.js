/**
 * @auth 		 jacksyen
 * @created 	 2012.07.06 
 * @description  基于jquery UI、easyUI扩展的panel组件
 */
(function($) {
	
	$.fn._outerWidth = function(width) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(width);
			} else {
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(height) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).height(height);
			} else {
				$(this).height(height - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	
	$.widget("ui.panel" , {
		version: "@VERSION",
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
			// 自定义工具栏，每一个工具都可以包含2个属性：图标类 和句柄。
			tools: [],	
			// 是否可拖动
			draggabled : false,
			
			// 加载信息
			loadingMsg : '正在加载中...',
			
			/**
			 * 在远程数据被载入时触发
			 */
			onLoad: function(){},
			/**
			 * 在控制面板被打开之前触发，返回false将停止打开 
			 */
			onBeforeOpen: function(){},
			/**
			 * 在控制面板被打开之后触发 
			 */
			onOpen: function(){},
			/**
			 * 在控制面板被关闭之前触发，返回false将取消关闭 
			 */
			onBeforeClose: function(){},
			/**
			 * 在控制面板被关闭后触发 
			 */
			onClose: function(){},
			/**
			 * 在控制面板被注销前触发，返回false将取消注销 
			 */
			onBeforeDestroy: function(){},
			/**
			 * 在控制面板被注销后触发 
			 */
			onDestroy: function(){},
			/**
			 * 在控制面板被缩放后触发  
			 * ui.width：   新的控制面板宽度
			 * ui.height: 新的控制面板高度
			 */
			onResize: function(event, ui){},
			/**
			 * 在控制面板被移动后触发
			 * ui.left：新的控制面板左边距
			 * ui.top：新的控制面板顶边距 
			 */
			onMove: function(event, ui){},
			/**
			 * 在控制面板被最大化后触发 
			 */
			onMaximize: function(){},
			/**
			 * 在控制面板被重置为初始大小后触发 
			 */
			onRestore: function(){},
			/**
			 * 在控制面板被最小化后触发 
			 */
			onMinimize: function(){},
			/**
			 * 在控制面板被折叠之前触发，返回false将停止折叠 
			 */
			onBeforeCollapse: function(){},
			/**
			 * 在控制面板被扩展之前触发，返回false将停止扩展（这里应该是指扩展区域，宽、高等） 
			 */
			onBeforeExpand: function(){},
			/**
			 * 在控制面板被折叠之后触发 
			 */
			onCollapse: function(){},
			/**
			 * 在控制面板被扩展之后触发 
			 */
			onExpand: function(){},
			/**
			 * 
			 */
			onDraggleBegin : function (){
				
			},
			/**
			 * 
			 */
			onDraggleDrag : function (){},
			/**
			 * 
			 */
			onDraggleEnd : function (){}
		},
		/**
		 * 返回选项属性 
		 */
		getOptions : function (){
			return $.data(this.element,'panel').options;
		},
		/**
		 * 返回控制面板对象 
		 */
		panel : function (){
			return $.data(this.element,'panel').panel;
		},
		/**
		 * 返回控制面板头对象 
		 */
		header: function (){
			return $.data(this.element,'panel').panel.find('>div.panel-header');
		},
		/**
		 * 返回控制面板主体对象 
		 */
		body : function (){
			return $.data(this.element,'panel').panel.find('>div.panel-body');
		},
		/**
		 * 设置控制面板头部的标题文本
		 * @param {Object} param 标题文本
		 */
		setTitle : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._setTitle(ele, param);
			});
		},
		/**
		 * 打开控制面板
		 * @param {Object} param 设置为true时，控制面板将被打开，不受onBeforeOpen回调函数的约束
		 */
		open : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._openPanel(ele, param);
			});
		},
		/**
		 * 关闭控制面板
		 * @param {Object} param 设置为true时，控制面板将被关闭，不受onBeforeClose回调函数的约束
		 */
		close : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._closePanel(ele, param);
			});
		},
		/**
		 * 销毁控制面板
		 * @param {Object} param 设置为true时，控制面板将被销毁，不受onBeforeDestroy回调函数的约束
		 */
		destroy : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._destroyPanel(ele, param);
			});
		},
		/**
		 * 当param属性被设置时，刷新控制面板以载入远程数据 
		 */
		refresh : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				$.data(ele, "panel").isLoaded = false;
				if(param) {
					$.data(ele, "panel").options.href = param;
				}
				self._loadData(ele);
			});
		},
		/**
		 * 重置控制面板的尺寸
		 * @param {Object} param {}
		 * 		width：   新的控制面板宽度
		 * 		height： 新的控制面板高度
		 * 		left：     新的控制面板左边距
		 * 		top： 	新的控制面板顶边距
		 */
		resize : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._setSize(ele, param);
			});
		},
		/**
		 * 移动控制面板到一个新的位置
		 * @param {Object} param {}
		 * 		left： 新的控制面板左边距
		 *		top： 新的控制面板顶边距
		 */
		move : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._movePanel(ele, param);
			});
		},
		/**
		 * 使控制面板铺满整个容器 
		 */
		maximize : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._maximizePanel(ele);
			});
		},
		/**
		 * 最小化控制面板 
		 */
		minimize : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._minimizePanel(ele);
			});
		},
		/**
		 * 使最大化的控制面板重置为其初始化时的大小和位置 
		 */
		restore : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._restorePanel(ele);
			});
		},
		/**
		 * 折叠控制面板主体 
		 * @param {Object} param  是否显示动画
		 */
		collapse : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._collapsePanel(ele, param);	// param: boolean,indicate animate or not
			});
		},
		/**
		 * 扩展控制面板主体
		 * @param {Object} param  是否显示动画
		 */
		expand : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._expandPanel(ele, param);	// param: boolean,indicate animate or not
			});
		},
		/**
		 * 移动panel 
		 */
		_movePanel : function (target, param){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(param) {
				if(param.left != null) {
					opts.left = param.left;
				}
				if(param.top != null) {
					opts.top = param.top;
				}
			}
			panel.css({
				left : opts.left,
				top : opts.top
			});
			this._trigger("onMove", null, {
				left : opts.left,
				top  : opts.top
			});
		},
		/**
		 * 销毁panel 
		 */
		_destroyPanel : function (target, forceDestroy){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceDestroy != true) {
				if (this._trigger("onBeforeDestroy") == false) return;
				// if(opts.onBeforeDestroy.call(target) == false) {
					// return;
				// }
			}
			//_1d(target);
			this._removeNode(panel);
			this._trigger("onDestroy");
		},
		/**
		 * 设置标题 
		 */
		_setTitle : function (target, title){
			$.data(target, "panel").options.title = title;
			$(target).panel('header').find('div.panel-title').html(title);
		},
		_create : function (){
			//alert('_create');
		},
		/**
		 * 创建panel初始化 
		 */
		_init : function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
				
			if(!opts.id) {
				opts.id = ele.attr('id') || undefined;
			}
			
			var state = $.data(ele, "panel");
			
			if(state) {
				opts = $.extend(state.options, opts);
			} else {
				ele.attr("title", "");
				state = $.data(ele, "panel", {
					options : opts,
					panel : self._wrapPanel(ele),
					isLoaded : false
				});
			}
			if(opts.content) {
				ele.html(opts.content);
			}
			
			self._addHeader(ele);
			self._setBorder(ele);
			if(opts.doSize == true) {
				state.panel.css("display", "block");
				self._setSize(ele);
			}
			if(opts.closed == true || opts.minimized == true) {
				state.panel.hide();
			} else {
				self._openPanel(ele);
			}
			
			// 配置可拖动
			if(opts.draggabled == true){
				self._setDraggabled(ele);
			}
		},
		/**
		 * 生成panel样式 
		 */
		_wrapPanel : function (target){
			var self = this;
			var panel = $(target).addClass("panel-body").wrap("<div class=\"panel\"></div>").parent();
			panel.bind("_resize", function() {
				var opts = $.data(target, "panel").options;
				if(opts.fit == true) {
					self._setSize(target);
				}
				return false;
			});
			return panel;
		},
		/**
		 * 打开panel 
		 */
		_openPanel : function (target, forceOpen){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceOpen != true) {
				if (this._trigger("onBeforeOpen") == false) return;
				// if(opts.onBeforeOpen.call(target) == false) {
					// return;
				// }
			}
			panel.show();
			opts.closed = false;
			opts.minimized = false;
			this._trigger("onOpen");
			if(opts.maximized == true) {
				opts.maximized = false;
				this._maximizePanel(target);
			}
			if(opts.collapsed == true) {
				opts.collapsed = false;
				this._collapsePanel(target);
			}
			if(!opts.collapsed) {
				this._loadData(target);
				this._panelResize(target);
			}
			
		},
		/**
		 *  添加拖动
		 */
		_setDraggabled : function (target){
			var self = this;
			var panel = $.data(target, "panel").panel;
			var header = panel.children("div.panel-header");
			var pBody = panel.children("div.panel-body");
			panel.draggable({
				handle : header,
				start : function (event, ui){
					self._trigger('onDraggleBegin');
				},
				drag : function (event, ui){
					self._trigger('onDraggleDrag');
				},
				end : function (event, ui){
					self._trigger('onDraggleEnd');
				}
			});
			
		},
		/**
		 * 设置panel大小 
		 */
		_setSize : function (target, param){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var header = panel.children("div.panel-header");
			var pBody = panel.children("div.panel-body");
			if(param) {
				if(param.width) {
					opts.width = param.width;
				}
				if(param.height) {
					opts.height = param.height;
				}
				if(param.left != null) {
					opts.left = param.left;
				}
				if(param.top != null) {
					opts.top = param.top;
				}
			}
			if(opts.fit == true) {
				var p = panel.parent();
				p.addClass("panel-noscroll");
				opts.width = p.width();
				opts.height = p.height();
			}
			panel.css({
				left : opts.left,
				top : opts.top
			});
			if(!isNaN(opts.width)) {
				panel._outerWidth(opts.width);
			} else {
				panel.width("auto");
			}
			header.add(pBody)._outerWidth(panel.width());
			if(!isNaN(opts.height)) {
				panel._outerHeight(opts.height);
				pBody._outerHeight(panel.height() - header.outerHeight());
			} else {
				pBody.height("auto");
			}
			panel.css("height", "");
			this._trigger("onResize", null, {
				width : opts.width, 
				height: opts.height
			});
			// opts.onResize.apply(target, [opts.width, opts.height]);
			panel.find(">div.panel-body>div").triggerHandler("_resize");
			
		},
		/**
		 * 设置边框样式 
		 */
		_setBorder : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var header = $(target).panel("header");
			var pBody = $(target).panel("body");
			
			panel.css(opts.style);
			panel.addClass(opts.cls);
			if(opts.border) {
				header.removeClass("panel-header-noborder");
				pBody.removeClass("panel-body-noborder");
			} else {
				header.addClass("panel-header-noborder");
				pBody.addClass("panel-body-noborder");
			}
			header.addClass(opts.headerCls);
			pBody.addClass(opts.bodyCls);
			
			if(opts.id) {
				$(target).attr("id", opts.id);
			} else {
				$(target).removeAttr('id');
			}
		},
		/**
		 * 添加panel头信息 
		 */
		_addHeader : function (target){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(opts.tools && typeof opts.tools == "string") {
				panel.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
			}
			self._removeNode(panel.children("div.panel-header"));
			if(opts.title && !opts.noheader) {
				var header = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(panel);
				if(opts.iconCls) {
					header.find(".panel-title").addClass("panel-with-icon");
					$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(header);
				}
				var tool = $("<div class=\"panel-tool\"></div>").appendTo(header);
				if(opts.tools) {
					if( typeof opts.tools == "string") {
						$(opts.tools).children().each(function() {
							$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
						});
					} else {
						for(var i = 0; i < opts.tools.length; i++) {
							var tl = opts.tools[i];
							var t = $("<a href=\"javascript:void(0)\" class='ui-icon'></a>").addClass(tl.iconCls).appendTo(tool);
							if(tl.handler) {
								t.click(function(event){
									tl.handler.call(this, self, event);
								});
								//t.bind("click", eval(opts.tools[i].handler));
							}
						}
					}
				}
				if(opts.collapsible) {
					$("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						
						if(opts.collapsed == true) {
							self._expandPanel(target, true);
						} else {
							self._collapsePanel(target, true);
						}
						return false;
					});
				}
				if(opts.minimizable) {
					$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						self._minimizePanel(target);
						return false;
					});
				}
				if(opts.maximizable) {
					$("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						if(opts.maximized == true) {
							self._restorePanel(target);
						} else {
							self._maximizePanel(target);
						}
						return false;
					});
				}
				if(opts.closable) {
					$("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						self._closePanel(target);
						return false;
					});
				}
				panel.children("div.panel-body").removeClass("panel-body-noheader");
			} else {
				panel.children("div.panel-body").addClass("panel-body-noheader");
			}
		},
		/**
		 * 还原panel 
		 */
		_restorePanel  : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var tool = panel.children("div.panel-header").find("a.panel-tool-max");
			if(opts.maximized == false) {
				return;
			}
			panel.show();
			tool.removeClass("panel-tool-restore");
			var original = $.data(target, "panel").original;
			opts.width = original.width;
			opts.height = original.height;
			opts.left = original.left;
			opts.top = original.top;
			opts.fit = original.fit;
			this._setSize(target);
			opts.minimized = false;
			opts.maximized = false;
			$.data(target, "panel").original = null;
			this._trigger("onRestore");
		},
		/*
		 * 最大化panel
		 */
		_maximizePanel : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var tool = panel.children("div.panel-header").find("a.panel-tool-max");
			if(opts.maximized == true) {
				return;
			}
			tool.addClass("panel-tool-restore");
			if(!$.data(target, "panel").original) {
				$.data(target, "panel").original = {
					width : opts.width,
					height : opts.height,
					left : opts.left,
					top : opts.top,
					fit : opts.fit
				};
			}
			opts.left = 0;
			opts.top = 0;
			opts.fit = true;
			this._setSize(target);
			opts.minimized = false;
			opts.maximized = true;
			this._trigger("onMaximize");
		},
		/**
		 * 最小化panel 
		 */
		_minimizePanel : function (target){
			var opts  =$.data(target, "panel").options;
			var panel = $.data(target,'panel').panel;
			panel.hide();
			opts.minimized = true;
			opts.maximized = false;
			this._trigger("onMinimize");
		},
		/**
		 * 删除节点 
		 */
		_removeNode : function (node){
			node.each(function(){
				$(this).remove();
				if ($.browser.msie){
					this.outerHTML = '';
				}
			});
		},
		/**
		 * 关闭panel 
		 */
		_closePanel : function (target, forceClose){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceClose != true) {
				if (this._trigger("onBeforeClose") == false) return;
				// if(opts.onBeforeClose.call(target) == false) {
					// return;
				// }
			}
			panel.hide();
			opts.closed = true;
			this._trigger("onClose");
		},
		/**
		 * 展开面板
 	 	 * @param {Object} animate
		 */
		_expandPanel : function (target, animate){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var pBody = panel.children("div.panel-body");
			var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
			if(opts.collapsed == false) {
				return;
			}
			pBody.stop(true, true);
			if(self._trigger('onBeforeExpand') == false){
				return;
			}
			// if(opts.onBeforeExpand.call(target) == false) {
				// return;
			// }
			tool.removeClass("panel-tool-expand");
			if(animate == true) {
				pBody.slideDown("normal", function() {
					opts.collapsed = false;
					self._trigger('onExpand');
					//opts.onExpand.call(target);
					self._loadData(target);
					self._panelResize(target);
				});
			} else {
				pBody.show();
				opts.collapsed = false;
				self._trigger('onExpand');
				//opts.onExpand.call(target);
				self._loadData(target);
				self._panelResize(target);
			}
		},
		/**
		 * 调用resize事件 
		 */
		_panelResize : function (target){
			$(target).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function() {
				$(this).triggerHandler("_resize", [true]);
			});
		},
		/**
		 * 加载数据 
		 */
		_loadData : function (target){
			var state = $.data(target, "panel");
			if(state.options.href && (!state.isLoaded || !state.options.cache)) {
				state.isLoaded = false;
				// TODO
				//_1d(target);
				var pBody = state.panel.find(">div.panel-body");
				if(state.options.loadingMsg) {
					pBody.html($("<div class=\"panel-loading\"></div>").html(state.options.loadingMsg));
				}
				$.ajax({
					url : state.options.href,
					cache : false,
					success : function(data) {
						pBody.html(state.options.extractor.call(target, data));
						// if($.parser) {
							// $.parser.parse(body);
						// }
						//panel.options.onLoad.apply(target, arguments);
						this._trigger('onLoad', null, arguments);
						state.isLoaded = true;
					}
				});
			}
		},
		/**
		 * 收缩面板
 	 	 * @param {Object} animate
		 */
		_collapsePanel : function (target, animate){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var pBody = panel.children("div.panel-body");
			var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
			if(opts.collapsed == true) {
				return;
			}
			pBody.stop(true, true);
			if(self._trigger('onBeforeCollapse') == false){
				return;
			}
			// if(opts.onBeforeCollapse.call(target) == false) {
				// return;
			// }
			tool.addClass("panel-tool-expand");
			if(animate == true) {
				pBody.slideUp("normal", function() {
					opts.collapsed = true;
					self._trigger('onCollapse');
				});
			} else {
				pBody.hide();
				opts.collapsed = true;
				self._trigger('onCollapse');
			}
		}
	});
})(jQuery);