/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menu组件
 */
(function($) {
	$.fn._outerWidth = function(target) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(target);
			} else {
				$(this).width(target - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(target) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).height(target);
			} else {
				$(this).height(target - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	
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
		 * 获取菜单项数据并将其返回, 数据包含以下属性：
		 * 	target：DOM对象，菜单项目。
		 * 	id：字符串，分配给元素的ID。
		 * 	text：字符串，菜单项的文本。
		 * 	href：字符串，超链接地址。
		 * 	disabled：布尔型，菜单项是启用还是禁用。
		 * 	onclick：函数, 当用户点击菜单时将要执行的函数。
		 * 	iconCls：字符串，图标css类。 
		 */
		getItem : function (target){
			var item = {
				target : target,
				id : $(target).attr("id"),
				text : $.trim($(target).children("div.menu-text").html()),
				disabled : $(target).hasClass("menu-item-disabled"),
				href : $(target).attr("href"),
				onclick : target.onclick
			};
			var men = $(target).children("div.menu-icon");
			if(men.length) {
				var cc = [];
				var aa = men.attr("class").split(" ");
				for(var i = 0; i < aa.length; i++) {
					if(aa[i] != "menu-icon") {
						cc.push(aa[i]);
					}
				}
				item.iconCls = cc.join(" ");
			}
			return item;
		},
		/**
		 * 查找菜单项
		 * @param  text	文本内容 
		 */
		findItem : function (text){
			return this._findItem(this.element, text);
		},
		/**
		 * 显示menu方法 
 		 * @param {Object} pos 位置参数，包含left,top
		 */
		show   : function (pos){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._showTopMenu(ele, pos);
			});
		},
		/**
		 * 隐藏menu方法 
		 */
		hide : function(){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._hide(ele);
			});
		},
		/**
		 * 销毁组件 
		 */
		destroy : function (){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._destroy(ele);
			});
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
		 * 销毁组件 
		 */
		_destroy : function (target){
			var self = this;
			$(target).children("div.menu-item").each(function() {
				self._remvoeNode(this);
			});
			if(target.shadow) {
				target.shadow.remove();
			}
			$(target).remove();
		},
		/**
		 * 删除menu菜单 
		 */
		_remvoeNode : function (el){
			function removeSubMenu(menu) {
				if(menu.submenu) {
					menu.submenu.children("div.menu-item").each(function() {
						removeSubMenu(this);
					});
					var shadow = menu.submenu[0].shadow;
					if(shadow) {
						shadow.remove();
					}
					menu.submenu.remove();
				}
				$(menu).remove();
			};
			removeSubMenu(el);
			
		},
		/**
		 * 查找菜单项 
		 */
		_findItem : function (target, text){
			var item = null;
			var tmp = $("<div></div>");
			function findI(thead) {
				thead.children("div.menu-item").each(function() {
					var getItme = $(target).menu("getItem", this);
					var s = tmp.empty().html(getItme.text).text();
					if(text == $.trim(s)) {
						item = getItme;
					} else {
						if(this.submenu && !item) {
							findI(this.submenu);
						}
					}
				});
			};
			findI($(target));
			tmp.remove();
			return item;
		},
		/**
		 * 显示menu菜单 
		 */
		_showTopMenu : function (target, pos){
			var self = this;
			var opts = $.data(target, "menu").options;
			if(pos) {
				opts.left = pos.left;
				opts.top = pos.top;
				if(opts.left + $(target).outerWidth() > $(window).width() + $(document).scrollLeft()) {
					opts.left = $(window).width() + $(document).scrollLeft() - $(target).outerWidth() - 5;
				}
				if(opts.top + $(target).outerHeight() > $(window).height() + $(document).scrollTop()) {
					opts.top -= $(target).outerHeight();
				}
			}
			self._showMenu($(target), {
				left : opts.left,
				top : opts.top
			}, function() {
				$(document).unbind(".menu").bind("mousedown.menu", function() {
					self._hide(target);
					$(document).unbind(".menu");
					return false;
				});
				self._trigger('onShow', null);
			});
		},
		/**
		 * 创建Menu，并添加事件 
		 */
		_create: function (){
		},
		/**
		 * 初始化 
		 */
		_init : function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
			var state = $.data(ele, "menu");
			if(state) {
				$.extend(state.options, opts);
			}else{
				state = $.data(ele, "menu", {
					options : $.extend({}, opts)
				});
				self._initMenu(ele);
			}
		},
		/**
		 * 初始化DOM元素 
 		 * @param {Object} target
		 */
		_initMenu : function (target){
			var self = this;
			$(target).appendTo("body");
			$(target).addClass("menu-top");
			var menus = [];
			adjust($(target));
			var timeOut = null;
			for(var i = 0; i < menus.length; i++) {
				var menu = menus[i];
				wrapMenu(menu);
				menu.children("div.menu-item").each(function() {
					self._bindMenuItemEvent(target, $(this));
				});
				menu.bind("mouseenter", function() {
					if(timeOut) {
						clearTimeout(timeOut);
						timeOut = null;
					}
				}).bind("mouseleave", function() {
					timeOut = setTimeout(function() {
						self._hide(target);
					}, 100);
				});
			}
			function adjust(menu) {
				menus.push(menu);
				menu.find(">div").each(function() {
					var item = $(this);
					var submenu = item.find(">div");
					if(submenu.length) {
						submenu.insertAfter(target);
						item[0].submenu = submenu;
						adjust(submenu);
					}
				});
			};
			function wrapMenu(menu) {
				menu.addClass("menu").find(">div").each(function() {
					var item = $(this);
					if(item.hasClass("menu-sep")) {
						item.html("&nbsp;");
					} else {
						var html = item.addClass("menu-item").html();
						item.empty().append($("<div class=\"menu-text\"></div>").html(html));
						var cls = item.attr("iconCls") || item.attr("icon");
						if(cls) {
							$("<div class=\"menu-icon\"></div>").addClass(cls).appendTo(item);
						}
						if(item[0].submenu) {
							$("<div class=\"menu-rightarrow\"></div>").appendTo(item);
						}
						item._outerHeight(22);
					}
				});
				menu.hide();
			};
		},
		/**
		 * 隐藏menu 
		 */
		_hide : function (target){
			var self = this;
			var opts = $.data(target, "menu").options;
			self._hideMenu($(target));
			$(document).unbind(".menu");
			self._trigger('onHide',null);
			return false;
		},
		_hideMenu : function (menu){
			var self = this;
			if(!menu) {
				return;
			}
			hideit(menu);
			menu.find("div.menu-item").each(function() {
				if(this.submenu) {
					self._hideMenu(this.submenu);
				}
				$(this).removeClass("menu-active");
			});
			function hideit(m) {
				m.stop(true, true);
				if(m[0].shadow) {
					m[0].shadow.hide();
				}
				m.hide();
			};
		},
		/**
		 * 绑定菜单事件 
 		 * @param {Object} target
		 */
		_bindMenuItemEvent : function (target, item){
			var self = this;
			item.unbind(".menu");
			item.bind("mousedown.menu", function() {
				return false;
			}).bind("click.menu", function(event) {
				if($(this).hasClass("menu-item-disabled")) {
					return;
				}
				if(!this.submenu) {
					self._hide(target);
					var href = $(this).attr("href");
					if(href) {
						location.href = href;
					}
				}
				var getItem = $(target).menu("getItem", this);
				self._trigger('onClick', event, getItem);
				//$.data(target, "menu").options.onClick.call(target, getItem);
			}).bind("mouseenter.menu", function(e) {
				item.siblings().each(function() {
					if(this.submenu) {
						self._hideMenu(this.submenu);
					}
					$(this).removeClass("menu-active");
				});
				item.addClass("menu-active");
				if($(this).hasClass("menu-item-disabled")) {
					item.addClass("menu-active-disabled");
					return;
				}
				var subMenu = item[0].submenu;
				if(subMenu) {
					var tLeft = item.offset().left + item.outerWidth() - 2;
					if(tLeft + subMenu.outerWidth() + 5 > $(window).width() + $(document).scrollLeft()) {
						tLeft = item.offset().left - subMenu.outerWidth() + 2;
					}
					var top = item.offset().top - 3;
					if(top + subMenu.outerHeight() > $(window).height() + $(document).scrollTop()) {
						top = $(window).height() + $(document).scrollTop() - subMenu.outerHeight() - 5;
					}
					self._showMenu(subMenu, {
						left : tLeft,
						top : top
					});
				}
			}).bind("mouseleave.menu", function(e) {
				item.removeClass("menu-active menu-active-disabled");
				var subMenu = item[0].submenu;
				if(subMenu) {
					if(e.pageX >= parseInt(subMenu.css("left"))) {
						item.addClass("menu-active");
					} else {
						self._hideMenu(subMenu);
					}
				} else {
					item.removeClass("menu-active");
				}
			});
		},
		/**
		 * 显示菜单 
		 * @param {Object} menu
		 * @param {Object} pos
		 * @param {Object} callback
		 */
		_showMenu : function (menu, pos, callback){
			var self = this,
				opts = self.options;
			if(!menu) {
				return;
			}
			if(pos) {
				menu.css(pos);
			}
			menu.show(0, function() {
				if(!menu[0].shadow) {
					menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
				}
				menu[0].shadow.css({
					display : "block",
					zIndex : opts.zIndex++,
					left : menu.css("left"),
					top : menu.css("top"),
					width : menu.outerWidth(),
					height : menu.outerHeight()
				});
				menu.css("z-index", opts.zIndex++);
				if(callback) {
					callback();
				}
			});
		}
	});
})(jQuery);
