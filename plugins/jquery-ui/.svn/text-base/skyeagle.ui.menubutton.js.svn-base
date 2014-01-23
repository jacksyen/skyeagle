/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menubutton组件
 */
(function($) {
	$.widget('ui.menubutton', {
		options : {
			// 是否禁用组件。如果禁用，则不可以进行任何操作
			disabled: false,
			// 设置为true将显示简洁效果
			plain: true,
			// 用来创建一个相应菜单的选择器
			menu: null,
			// 定义鼠标划过按钮时显示菜单所持续的时间，单位为毫秒
			duration: 100,
			// 显示的文字
			label : ''
		},
		disable : function (){
			
		},
		enable : function (){
			
		},
		destroy: function (){
			
		},
		_create: function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
			if(opts.label === ''){
				opts.label = ele.html();
			}
			ele.removeAttr('disabled');
			ele.append('<span class="m-btn-downarrow">&nbsp;</span>');
			ele.removeClass('m-btn-active m-btn-plain-active');
			ele.button(opts);
			if (opts.menu){
				$(opts.menu).menu({
					onShow: function(){
						ele.addClass((opts.plain==true) ? 'm-btn-plain-active' : 'm-btn-active');
					},
					onHide: function(){
						ele.removeClass((opts.plain==true) ? 'm-btn-plain-active' : 'm-btn-active');
					}
				});
			}
			ele.unbind('.button');
			if (opts.disabled == false && opts.menu){
				ele.bind('click.button', function(){
					showMenu();
					return false;
				});
				var timeout = null;
				ele.bind('mouseenter.button', function(){
					timeout = setTimeout(function(){
						showMenu();
					}, opts.duration);
					return false;
				}).bind('mouseleave.button', function(){
					if (timeout){
						clearTimeout(timeout);
					}
				});
			}
			
			function showMenu(){
				var left = ele.offset().left;
				if (left + $(opts.menu).outerWidth() + 5 > $(window).width()){
					left = $(window).width() - $(opts.menu).outerWidth() - 5;
				}
				
				$('.menu-top').menu('hide');
				$(opts.menu).menu('show', {
					left: left,
					top: ele.offset().top + ele.outerHeight()
				});
				ele.blur();
			}
		}
	});
})(jQuery);
