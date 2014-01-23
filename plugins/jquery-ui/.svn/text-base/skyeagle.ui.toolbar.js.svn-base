/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menu组件
 */
(function($) {
	
	
	$.widget('ui.toolbar', {
		/**
		 * 配置选项 
		 */
		options: {
			/**
			 * 数据项集合
			 * 可选属性为: 
			 * type : 为button、menubutton
			 * options : button或menubutton内置属性、
			 * line : 是否在项后显示分隔符
			 */
			item : [],
			/**
			 * 宽度 
			 */
			width : 'auto'
		},
		/**
		 * 创建时触发 
		 */
		onCreate : function (){},
		/**
		 * 初始化 
		 */
		_init : function (){
			var self = this,
				opts = self.options;
				ele  = self.element;
			var state = $.data(ele, "toolbar");
			if(state) {
				$.extend(state.options, opts);  
			}else{
				state = $.data(ele, "toolbar", {
					options : $.extend({}, opts),
					searchbox : self._wrapToolbar(ele)
				});
			}
			self._initItems(ele);
			self._setScroll(ele);
			self._bindEvents(ele);
		},
		/**
		 * 设置滚动按钮  
		 */
		_setScroll : function (target){
			var self = this,
				opts = self.options;
			if(opts.width !== 'auto'){
				target.width(opts.width);
			}
			var items = $.data(target, 'toolbar').items;	
			var totalWidth = 0;
			items.children().each(function() {
				totalWidth += $(this).outerWidth(true);
			});
			if(totalWidth > target.outerWidth()){
				items.before('<span class="toolbar-scroll-left toolbar-scroll-disabled"></span>');
				items.after('<span class="toolbar-scroll-right"></span>');
				
				items.css({
					left : '20px'
				});
			}
		},
		/**
		 * 绑定事件 
		 */
		_bindEvents : function (target){
			var items = $.data(target, 'toolbar').items;
			var totalWidth = 0;
			items.children().each(function() {
				totalWidth += $(this).outerWidth(true);
			});
			var scrollLeft  = target.find('.toolbar-scroll-left');
			var scrollRight = target.find('.toolbar-scroll-right');
			scrollRight.click(function() {
				if($(this).hasClass('toolbar-scroll-disabled')){
					return;
				}
				// var prevOff = items.prev().offset();
				var nextOff = items.next().offset();
				var itemOff = items.offset();
				
				items.animate({
	                left : -(totalWidth - nextOff.left) + 'px'
	            },'normal', 'swing', function() {
	            	if(scrollLeft.hasClass('toolbar-scroll-disabled')){
	            		scrollLeft.removeClass('toolbar-scroll-disabled');
	            	}
					scrollRight.addClass('toolbar-scroll-disabled');
				});
			});
			scrollLeft.click(function (){
				if($(this).hasClass('toolbar-scroll-disabled')){
					return;
				}
				var itemOff = items.offset();
				
				items.animate({
	                left : 20 + 'px'
	            },'normal', 'swing', function() {
	            	if(scrollRight.hasClass('toolbar-scroll-disabled')){
	            		scrollRight.removeClass('toolbar-scroll-disabled');
	            	}
					scrollLeft.addClass('toolbar-scroll-disabled');
				});
			});
		},
		/*
		 *  添加DOM信息
		 */
		_wrapToolbar : function (target){
			var self = this,
				ele  = self.element;
			ele.addClass('toolbar');
		},
		/**
		 * 初始化项元素 
 		 * @param {Object} target
		 */
		_initItems : function (target){
			var self = this,
				opts = self.options;
				ele  = self.element;
			var items = opts.item;
			var itemsHtml = $('<div class="toolbar-items"></div>');
			if(items && items.length > 0){
				for(var i = 0; i < items.length; i++){
					var item = items[i];
					var html = self._createItem(target, item);
					//html.addClass('ui-state-hover');
					html ? itemsHtml.append(html) : false;
					if(item.line){
						itemsHtml.append($('<span class="line-separator"></span>'));
					}
				}
			}
			ele.append(itemsHtml);
			$.data(ele, 'toolbar', {
				items : itemsHtml
			});
			self._trigger('onCreate', null);
		},
		/**
		 * 创建单个项 
 		 * @param {Object} target
		 */
		_createItem : function (target, item){
			var self = this,
				ele  = self.element;
				html = null;
			if(item.type != null){
				var itemOpts = item.options;
				
				switch (item.type){
					case 'button':
						html = $('<a></a>');
						html.button(itemOpts);
						break;
					case 'menubutton':
						html = $('<a></a>');
						html.menubutton(itemOpts);
						break;
				}
			}
			return html;
		}
		
	});
})(jQuery);
