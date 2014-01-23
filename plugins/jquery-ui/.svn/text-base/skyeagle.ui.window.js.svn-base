/**
 * @auth 		 jacksyen
 * @created 	 2012.07.05
 * @description  基于jquery UI扩展的menubutton组件
 */
(function($) {
	function getPageArea (){
			if (document.compatMode == 'BackCompat') {
				return {
					width: Math.max(document.body.scrollWidth, document.body.clientWidth),
					height: Math.max(document.body.scrollHeight, document.body.clientHeight)
				}
			} else {
				return {
					width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
					height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
				}
			}
		}
	
	// when window resize, reset the width and height of the window's mask
	$(window).resize(function(){
		$('.window-mask').css({
			width: $(window).width(),
			height: $(window).height()
		});
		setTimeout(function(){
			$('.window-mask').css({
				width: getPageArea().width,
				height: getPageArea().height
			});
		}, 50);
	});
	
	$.widget('ui.window', {
		options : {
			zIndex: 9000,
			draggable: true,
			resizable: true,
			shadow: true,
			modal: false,
			
			// 窗口标题
			title  : 'window',
			// 是否显示折叠按钮
			collapsible : true,
			// 是否显示最小化按钮
			minimizable : true,
			// 是否显示最大化按钮
			maximizable : true,
			// 是否显示关闭按钮
			closable    : true,
			// 初始化是否关闭
			closed      : false
		},
		window : function (){
			return $.data(this.element,'window').window;
		},
		setTitle : function (param){
			var self = this;
			return self.each(function(){
				$(this).panel('setTitle', param);
			});
		},
		open : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('open', param);
			});
		},
		close : function (){
			var self = this;
			return self.element.each(function(){
				$(this).panel('close', param);
			});
		},
		destroy : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('destroy', param);
			});
		},
		refresh : function (){
			var self = this;
			return self.element.each(function(){
				$(this).panel('refresh');
			});
		},
		resize : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('resize', param);
			});
		},
		move : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('move', param);
			});
		},
		maximize : function (){
			var self = this;
			return self.element.each(function(){
				$(this).panel('maximize');
			});
		},
		
		_create : function (){	
			var self = this,
				ele  = self.element,
				opts = self.options,
				state = $.data(ele, 'window', {});
			
			// create window
			var win = ele.panel($.extend({}, opts, {
				border: false,
				doSize: true,	// size the panel, the property undefined in window component
				closed: true,	// close the panel
				cls: 'window',
				headerCls: 'window-header',
				bodyCls: 'window-body',
				onBeforeDestroy: function(){
					if (opts.onBeforeDestroy){
						if (opts.onBeforeDestroy.call(target) == false) return false;
					}
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.remove();
					if (state.mask) state.mask.remove();

				},
				onClose: function(){
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.hide();
					if (state.mask) state.mask.hide();
					
					
					// if (opts.onClose) opts.onClose.call(target);
				},
				onOpen: function(){
					alert('onOpen');
					var state = $.data(ele, 'window');
					if (state.mask){
						state.mask.css({
							display:'block',
							zIndex: opts.zIndex++
						});
					}
					if (state.shadow){
						state.shadow.css({
							display:'block',
							zIndex: opts.zIndex++,
							left: state.options.left,
							top: state.options.top,
							width: state.window.outerWidth(),
							height: state.window.outerHeight()
						});
					}
					state.window.css('z-index', opts.zIndex++);
					if (opts.onOpen) opts.onOpen.call(target);
					
				},
				onResize: function(width, height){
					// alert('onresize');
						
					var state = $.data(ele, 'window');
					
					if (state.shadow){
						state.shadow.css({
							left: state.options.left,
							top: state.options.top,
							width: state.window.outerWidth(),
							height: state.window.outerHeight()
						});
					}
					// if (opts.onResize) opts.onResize.call(target, width, height);
				},
				onMove: function(left, top){
					// alert('onMove');
					state = $.data(ele, 'window');
					if (state.shadow){
						state.shadow.css({
							left: state.options.left,
							top: state.options.top
						});
					}
					
					
					// if (opts.onMove) opts.onMove.call(target, left, top);
				},
				onMinimize: function(){
					
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.hide();
					if (state.mask) state.mask.hide();
										
					
					// if (opts.onMinimize) opts.onMinimize.call(target);
				},
				onBeforeCollapse: function(){
					// alert('onBeforeCollapse');
					if (opts.onBeforeCollapse){
						if (opts.onBeforeCollapse.call(target) == false) return false;
					}
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.hide();
					
				},
				onExpand: function(){
					// alert('onExpand');
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.show();
					
					// if (opts.onExpand) opts.onExpand.call(target);
				}
			}));
			// save the window state
			state.options = win.panel('option');
			// state.opts = opts;
			state.window = win.panel('panel');
			
			// create mask
			if (state.mask) state.mask.remove();
			if (opts.modal == true){
				state.mask = $('<div class="window-mask"></div>').appendTo('body');
				state.mask.css({
	//				zIndex: $.fn.window.defaults.zIndex++,
					width: getPageArea().width,
					height: getPageArea().height,
					display: 'none'
				});
			}
			
			// create shadow
			if (state.shadow) state.shadow.remove();
			if (opts.shadow == true){
				state.shadow = $('<div class="window-shadow"></div>').insertAfter(state.window);
				state.shadow.css({
	//				zIndex: $.fn.window.defaults.zIndex++,
					display: 'none'
				});
			}
			// if require center the window
			if (opts.left == null){
				var width = opts.width;
				if (isNaN(width)){
					width = state.window.outerWidth();
				}
				opts.left = ($(window).width() - width) / 2 + $(document).scrollLeft();
			}
			if (opts.top == null){
				var height = state.window.height;
				if (isNaN(height)){
					height = state.window.outerHeight();
				}
				opts.top = ($(window).height() - height) / 2 + $(document).scrollTop();
			}
			win.window('move');
			
			if (opts.closed == false){
				win.window('open');	// open the window
			}
		},
		_init : function (){
			var self = this,
				ele  = this.element,
				opts = this.options;
			var state = $.data(ele, 'window');
			
			// function filteredUi(ui) {
				// return {
					// position: ui.position,
					// offset: ui.offset
				// };
			// }
		
			state.window.draggable({
				handle: '>div.panel-header>div.panel-title',
				disabled: state.options.draggable == false,
				cursor: 'move',
				start: function(e, ui){
					// if (state.mask) state.mask.css('z-index', opts.zIndex++);
					// if (state.shadow) state.shadow.css('z-index', opts++);
					// state.window.css('z-index', opts.zIndex++);
// 					
					// if (!state.proxy){
						// state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
					// }
					// state.proxy.css({
						// display:'none',
						// zIndex: opts.zIndex++,
						// left: ui.position.left,
						// top: ui.position.top,
						// width: ($.boxModel==true ? (state.window.outerWidth()-(state.proxy.outerWidth()-state.proxy.width())) : state.window.outerWidth()),
						// height: ($.boxModel==true ? (state.window.outerHeight()-(state.proxy.outerHeight()-state.proxy.height())) : state.window.outerHeight())
					// });
					// setTimeout(function(){
						// if (state.proxy) state.proxy.show();
					// }, 500);
				},
				drag: function(e, ui){
					// state.proxy.css({
						// display:'block',
						// left: ui.position.left,
						// top: ui.position.top,
					// });
					// return false;
				},
				stop: function(e, ui){
					// state.options.left = ui.position.left;
					// state.options.top = ui.position.top;
					// self.element.window('move');
					// state.proxy.remove();
					// state.proxy = null;
				}
			});
			
			state.window.resizable({
				disabled: state.options.resizable == false,
				start:function(e, ui){
					// if (!state.proxy){
						// state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
					// }
					// state.proxy.css({
						// zIndex: opts.zIndex++,
						// left: ui.position.left,
						// top: ui.position.top,
						// width: ($.boxModel==true ? ($(this).width()-(state.proxy.outerWidth()-state.proxy.width())) : $(this).width()),
						// height: ($.boxModel==true ? ($(this).height()-(state.proxy.outerHeight()-state.proxy.height())) : $(this).height())
					// });
				},
				resize: function(e, ui){
					// opts.left = ui.position.left;
					// opts.top = ui.position.top;
					// opts.height = $(this).height();
					// opts.width = $(this).width();
					// self._setSize(opts);
					// state.proxy.css({
						// left: ui.position.left,
						// top: ui.position.top,
						// width: ($.boxModel==true ? ($(this).width()-(state.proxy.outerWidth()-state.proxy.width())) : $(this).width()),
						// height: ($.boxModel==true ? ($(this).height()-(state.proxy.outerHeight()-state.proxy.height())) : $(this).height())
					// });
					// return false;
				},
				stop: function(e, ui){
					// opts.left = ui.position.left;
					// opts.top = ui.position.top;
					// opts.height = $(this).height();
					// opts.width = $(this).width();
					// self._setSize(opts);
					// state.proxy.remove();
					// state.proxy = null;
				}
			});
			state.window.css('height','');
		},
		_setSize : function (opts){
			this.element.panel('resize',{left: opts.left,top: opts.top, height: opts.height, width: opts.width});
			//$.data(this.element, 'window').window.css('height','');
		}
		
	});
})(jQuery);