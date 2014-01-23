/**
 * @auth 		 jacksyen
 * @created 	 2012.08.21
 * @description  基于easy UI扩展的searchbox组件
 */
(function($) {
	$.widget("ui.searchbox" , {
		version: "@VERSION",
		options : {
			// 宽度
			width : "auto",
			// 显示在搜索框的提示信息
			prompt : "",
			// 搜索框的默认值
			value : "",
			// 搜索类型下拉菜单
			menu : null
		},
		getOptions : function (){
			return $.data(this.element, "searchbox").options;
		},
		menu : function (){
			return $.data(this.element, "searchbox").menu;
		},
		textbox : function (){
			return $.data(this.element, "searchbox").searchbox.find("input.searchbox-text");
		},
		getValue : function (){
			return $.data(this.element, "searchbox").options.value;
		},
		setValue : function (value){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				$(ele).searchbox("options").value = value;
				$(ele).searchbox("textbox").val(value);
				$(ele).searchbox("textbox").blur();
			});
		},
		getName : function (){
			return $.data(this.element, "searchbox").searchbox.find("input.searchbox-text").attr("name");
		},
		selectName : function (name){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				var menu = $.data(this, "searchbox").menu;
				if(menu) {
					menu.children("div.menu-item[name=\"" + name + "\"]").triggerHandler("click");
				}
			});
		},
		destroy : function (){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				var menu = $(this).searchbox("menu");
				if(menu) {
					menu.menu("destroy");
				}
				$.data(this, "searchbox").searchbox.remove();
				$(this).remove();
			});
		},
		resize : function (width){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._setTextSize(ele, width);
			});
		},
		/**
		 * 当用户点击搜索按钮或者按下ENTER键的时候搜索函数将被调用 
		 */
		onSearcher : function (value, name){},
		/**
		 * 初始化 
		 */
		_init : function (){
			var self = this,
				opts = self.options;
				ele  = self.element;
			var state = $.data(ele, "searchbox");
			if(state) {
				$.extend(state.options, opts);
			}else{
				state = $.data(ele, "searchbox", {
					options : $.extend({}, opts),
					searchbox : self._wrapSearchBox(ele)
				});
			}
			self._initMenu(ele);
			self._setValue(ele);
			self._bindEvents(ele);
			self._setTextSize(ele);
		},
		/**
		 * 绑定事件 
		 */
		_bindEvents : function (target){
			var self = this;
			var state = $.data(target, "searchbox");
			var opts = state.options;
			var text = state.searchbox.find("input.searchbox-text");
			var button = state.searchbox.find(".searchbox-button");
			text.unbind(".searchbox").bind("blur.searchbox", function(e) {
				opts.value = $(this).val();
				if(opts.value == "") {
					$(this).val(opts.prompt);
					$(this).addClass("searchbox-prompt");
				} else {
					$(this).removeClass("searchbox-prompt");
				}
			}).bind("focus.searchbox", function(e) {
				if($(this).val() != opts.value) {
					$(this).val(opts.value);
				}
				$(this).removeClass("searchbox-prompt");
			}).bind("keydown.searchbox", function(e) {
				if(e.keyCode == 13) {
					e.preventDefault();
					var name = $.fn.prop ? text.prop("name") : text.attr("name");
					opts.value = $(this).val();
					self._trigger('onSearcher', e, {
						value : opts.value,
						name  : name
					});
					//opts.searcher.call(target, opts.value, name);
					return false;
				}
			});
			button.unbind(".searchbox").bind("click.searchbox", function(e) {
				var name = $.fn.prop ? text.prop("name") : text.attr("name");
				self._trigger('onSearcher', e, {
					value : opts.value,
					name  : name
				});
				//opts.searcher.call(target, opts.value, name);
			}).bind("mouseenter.searchbox", function() {
				$(this).addClass("searchbox-button-hover");
			}).bind("mouseleave.searchbox", function() {
				$(this).removeClass("searchbox-button-hover");
			});
		},
		/**
		 * 设置搜索框输入值 
		 */
		_setValue : function (target){
			var state = $.data(target, "searchbox");
			var opts = state.options;
			var text = state.searchbox.find("input.searchbox-text");
			if(opts.value == "") {
				text.val(opts.prompt);
				text.addClass("searchbox-prompt");
			} else {
				text.val(opts.value);
				text.removeClass("searchbox-prompt");
			}
		},
		/**
		 * 初始化menu 
		 */
		_initMenu : function (target){
			var self = this;
			var state = $.data(target, "searchbox");
			var opts = state.options;
			if(opts.menu) {
				state.menu = $(opts.menu).menu({
					onClick : function(event, item) {
						initMenuButton(item);
					}
				});
				var item = state.menu.children("div.menu-item:first[selected]");
				if(!item.length) {
					item = state.menu.children("div.menu-item:first");
				}
				item.triggerHandler("click");
			} else {
				state.searchbox.find("a.searchbox-menu").remove();
				state.menu = null;
			}
			function initMenuButton(item) {
				state.searchbox.find("a.searchbox-menu").remove();
				
				var mb = $("<a class=\"searchbox-menu\" href=\"javascript:void(0)\"></a>").html(item.text);
				
				mb.prependTo(state.searchbox).menubutton({
					menu : state.menu,
					iconCls : item.iconCls
				});
				state.searchbox.find("input.searchbox-text").attr("name", $(item.target).attr("name") || item.text);
				self._setTextSize(target);
			};
		},
		/**
		 * 设置 输入框大小
		 */
		_setTextSize : function (target, width){
			var opts = $.data(target, "searchbox").options;
			var sb = $.data(target, "searchbox").searchbox;
			if(width) {
				opts.width = width;
			}
			sb.appendTo("body");
			if(isNaN(opts.width)) {
				opts.width = sb.outerWidth();
			}
			sb._outerWidth(opts.width);
			sb.find("input.searchbox-text")._outerWidth(sb.width() - sb.find("a.searchbox-menu").outerWidth() - sb.find("span.searchbox-button").outerWidth());
			sb.insertAfter(target);
		},
		/**
		 * 初始化DOM元素 
 		 * @param {Object} target
		 */
		_wrapSearchBox : function (target){
			$(target).hide();
			var searchbox = $("<span class=\"searchbox\"></span>").insertAfter(target);
			var searchText = $("<input type=\"text\" class=\"searchbox-text\">").appendTo(searchbox);
			$("<span><span class=\"searchbox-button\"></span></span>").appendTo(searchbox);
			var name = $(target).attr("name");
			if(name) {
				searchText.attr("name", name); 
				$(target).removeAttr("name").attr("searchboxName", name);
			}
			return searchbox;
		}
	});
})(jQuery);