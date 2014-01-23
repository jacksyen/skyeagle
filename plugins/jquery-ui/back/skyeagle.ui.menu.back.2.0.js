/**
 * @auth 		 jacksyen
 * @created 	 2012.07.02 
 * @description  基于jquery UI扩展的menu组件
 */
(function($) {
	$.widget('ui.menu', {
		version : "@VERSION",
		options : {
			// 内部定义参数，最小宽度
			_minWidth : 100,
			// 内部定义参数，最大宽度
			_maxWidth : 200,
			left : null,
			top  : null,
			// 是否右键显示
			contextMenu : false,
			// 数据源，默认为空，从页面DOM元素读取
			dataSource : null
		},
		_create : function (){
			var self = this,
				ele  = self.element,
				opts = this.options;
			ele.addClass('ui-menu-container ui-menu-content ui-corner-all');
			ele.css({
				position : 'absolute'
			});
			if(opts.dataSource != null){
				
			}else{
				var firstMenu = ele.children('ul').addClass('ui-menu');
				self._parseMenu(firstMenu);
				self._bindEvent();
				//firstMenu.show();
			}
			
		},
		_init : function(){
			var opts = this.options,
				ele  = this.element;
			ele.css({
				minWidth : opts._minWidth,
				maxWidth : opts._maxWidth - 10
			});
			
			if($.browser.msie && $.browser.version == '6.0') {
                ele.css('width', opts._minWidth + 30);
            }
            if($.browser.msie && $.browser.version == '7.0') {
                ele.css('width', opts._maxWidth - 10);
            }
		},
		/**
		 * 解析DOM元素，添加样式信息 
 		 * @param {Object} element
		 */
		_parseMenu : function (element){
			if(element.parent().attr("aria-haspopup") == "true"){ //判断是否为第一帧
                element.addClass("ui-menu-content ui-corner-all");
            }
			var self = this;
			element.css('display','none');
			element.find('>li').each(function(index) {
			  	var that = $(this);
			  	var cul  = $(this).children('ul');
			  	if(cul.length > 0){
			  		that.attr('aria-haspopup',true);
			  		that.find('span[role="popup"]').addClass('ui-icon-span');
			  		self._parseMenu(cul);
			  	}
			  	that.find('a').addClass('ui-corner-all ui-menu-indicator')
			  	that.find('img').addClass('ui-menu-icon');
			});			
		},
		/**
		 * 绑定事件，显示或隐藏子菜单 
		 */
		_bindEvent : function (){
			var self = this,
				ele  = self.element;
			ele.find('li[aria-haspopup="true"]').bind('mouseenter.menuItem', function(event) {
				var that = $(this);
				setTimeout(function (){
					self._showChildren(that);
				},200);
			}).bind('mouseleave.menuItem', function(event) {
			  	var that = $(this);
			  	setTimeout(function (){
			  		that.children('ul').hide();
			  	});
			}).bind('mousedown.menuItem', function(event) {
			  	var that = $(this);
			  	
			});
		},
		/**
		 * 显示子菜单 
 		 * @param {Object} element
		 */
		_showChildren : function (element){
			var self = this,
				opts = this.options;
			if(element){
				var cul = element.children('ul').eq(0);
				cul.css({
					minWidth : opts._minWidth,
					top      : element.position().top
				})
				var left = element.width();
                if((2*left + element.offset().left) > document.documentElement.clientWidth){ //当右边距离过短的时候会将提示框调整到左边
                    left = - left;
                }
                cul.css('left',left);
                cul.show();
			}
		},
		show : function (target){
			var left,top,
			 	self = this,
				ele  = self.element,
				opts = self.options,
				offset = $(target).offset();
				
			if(opts.contextMenu){
				left = target.pageX;
				top  = target.pageY;
				if (target.preventDefault) target.preventDefault();
			    if (target.stopPropagation) target.stopPropagation();
				target.cancelBubble=true; //IE
			}else{
                var buttomWidth = parseInt($(target).css('borderBottomWidth').replace('px',''));
                top = offset.top +  $(target).height() + (buttomWidth != 'NaN'?buttomWidth:0) + 1; //1px作为调节距离
                left = offset.left +  1;
            }
           
            var parent = ele.parent();
            while(parent.css('position') == 'static' && parent[0].nodeName != 'BODY'){
                parent = parent.parent();
            }
            // alert(parent.position().top);
            
            top  -= parent.offset().top;
            left -= parent.offset().left;
            if((left + ele.outerWidth()) > document.body.clientWidth){ //当右边距离过短的时候会将提示框调整到左边
                left = left - ele.outerWidth() - 20;
            }
            ele.css({
            	'top' : top,
            	'left': left
            }).show();
            var ful = ele.children('ul.ui-menu');
            ful.show();
            ful.children().each(function(index) {
	          	if($(this).find("span:first").hasClass('ui-menu-item-sep')){
	                $(this).find("span:first").width('98%'); //分隔条宽度
	            }else{
	                var width = $(ele).width()*0.7;
	                if($(this).find("span:first").width() > width){
	                    $(this).find("span:first").width($(this).attr('aria-haspopup')?width-15:width); //去掉icon的padding
	                }
	            }
            });
            
		}
		
	});
	
})( jQuery );
