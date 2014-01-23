/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menu组件
 */
(function($) {
	$.widget('ui.menu', {
		/**
		 * 配置选项 
		 */
		options: {
			// z轴高度
			zIndex : 110000,
			// 靠左边距离
			left   : 0,
			// 靠顶部距离
			top    : 0
		},
		/**
		 * 打开事件 
		 */
		onShow : function() {},
		/**
		 * 隐藏事件 
		 */
		onHide : function() {},
		/**
		 * 单击事件 
		 */
		onClick : function (event, item){},
		/**
		 * 显示menu方法 
 		 * @param {Object} pos 位置参数，包含left,top
		 */
		show   : function (pos){
			var self = this,
				ele  = this.element,
				opts = this.options;
			if (pos){
				opts.left = pos.left;
				opts.top = pos.top;
			}
			self._showMenu(ele, {left:opts.left,top:opts.top}, function(){
				//$(document).bind('click.menu', ele, self._onDocClick);
				//opts.onShow.call(ele);
				$(document).bind('click.menu', function (event){
					self._hideAll(ele);
					return false;
				});
				if(opts.onShow){
					self._trigger("onShow");
				}
			});
		},
		/**
		 * 隐藏menu方法 
		 */
		hide : function(){
			this._hideAll(this.element);
		},
		/**
		 * 创建Menu，并添加事件 
		 */
		_create: function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
			ele.appendTo('body');
			ele.addClass('menu-top');	// the top menu
			var menus = [];
			adjust(ele);
			
			
			for(var i=0; i<menus.length; i++){
				var menu = menus[i];
				self._wrapMenu(menu);
				menu.find('>div.menu-item').each(function(){
					self._bindMenuItemEvent($(this));
				});
				
				
				menu.find('div.menu-item').click(function(){
					// only the sub menu clicked can hide all menus
					if (!this.submenu){
						self._hideAll(ele);
					}
					return false;
				});
			}
			
			function adjust(menu){
				menus.push(menu);
				menu.find('>div').each(function(){
					var item = $(this);
					var submenu = item.find('>div');
					if (submenu.length){
						submenu.insertAfter(ele);
						item[0].submenu = submenu;
						adjust(submenu);
					}
				});
			}
		
		},
		_init : function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
			ele.css({
				left: opts.left,
				top : opts.top
			});
		},
		_wrapMenu : function (menu){
			menu.addClass('menu').find('>div').each(function(){
				var item = $(this);
				if (item.hasClass('menu-sep')){
					item.html('&nbsp;');
				} else {
					var text = item.addClass('menu-item').html();
					item.empty().append($('<div class="menu-text"></div>').html(text));
					var icon = item.attr('icon');
					if (icon){
						$('<div class="menu-icon"></div>').addClass(icon).appendTo(item);
					}
					if (item[0].submenu){
						$('<div class="menu-rightarrow"></div>').appendTo(item);	// has sub menu
					}
					
					if ($.boxModel == true){
						var height = item.height();
						item.height(height - (item.outerHeight() - item.height()));
					}
				}
			});
			menu.hide();
		},
		_bindMenuItemEvent : function (item){
			var self = this;
			item.hover(
				function(){
					// hide other menu
					item.siblings().each(function(){
						if (this.submenu){
							self._hideMenu(this.submenu);
						}
						$(this).removeClass('menu-active');
					});
					
					// show this menu
					item.addClass('menu-active');
					var submenu = item[0].submenu;
					if (submenu){
						var left = item.offset().left + item.outerWidth() - 2;
						if (left + submenu.outerWidth() > $(window).width()){
							left = item.offset().left - submenu.outerWidth() + 2;
						}
						self._showMenu(submenu, {
							left: left,
							top:item.offset().top - 3
						});
					}
				},
				function(e){
					item.removeClass('menu-active');
					var submenu = item[0].submenu;
					if (submenu){
						if (e.pageX>=parseInt(submenu.css('left'))){
							item.addClass('menu-active');
						} else {
							self._hideMenu(submenu);
						}
						
					} else {
						item.removeClass('menu-active');
					}
					
				}
			);
		},
		_showMenu : function (menu, pos, callback){
			var self = this,
				opts = self.options;
			if (!menu) return;
		
			if (pos){
				menu.css(pos);
			}
			menu.show(1, function(){
				if (!menu[0].shadow){
					menu[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(menu);
				}
				menu[0].shadow.css({
					display:'block',
					zIndex:opts.zIndex++,
					left:menu.css('left'),
					top:menu.css('top'),
					width:menu.outerWidth(),
					height:menu.outerHeight()
				});
				menu.css('z-index', opts.zIndex++);
				
				if (callback){
					callback();
				}
			});
		},
		_hideMenu : function (menu){
			var self = this;
			if (!menu) return;
		
			hideit(menu);
			menu.find('div.menu-item').each(function(){
				if (this.submenu){
					self._hideMenu(this.submenu);
				}
				$(this).removeClass('menu-active');
			});
			
			function hideit(m){
				if (m[0].shadow){
					m[0].shadow.hide();
				}
				m.hide();
				
			}
		},
		_hideAll : function (target){
			var opts = this.options;
			this._hideMenu($(target));
			$(document).unbind('.menu');
			//opts.onHide.call(target);
			if(opts.onHide){
				this._trigger("onHide");
			}
			
	//		var state = $.data(target, 'menu');
	//		if (state){
	//			hideMenu($(target));
	//			$(document).unbind('.menu');
	//			state.options.onHide.call(target);
	//		}
			return false;
		}
	});
})(jQuery);
