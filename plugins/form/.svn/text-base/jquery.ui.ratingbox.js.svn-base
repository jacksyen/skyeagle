(function($) {
	$.widget('ui.ratingbox', {
		options : {
			// 星星个数最大值
			max : 10,
			// 星星个数最小值
			min : 1,
			// 当前值，即默认值
			value : 3,
			// 星星个数
			starnum : 10,
			/**
			 *  值改变时触发
	         * @param {Object} value 
			 */
			onChange : function (value){}
		},
		
		destroy : function (){
			this.element.children().unbind('.ratingbox');
			this.element.children().remove();
			this.element.unbind();
			this.element.remove();
		},
		disable : function (){
			this.element.children().unbind('.ratingbox');
			this.element.removeClass('enable').addClass('disable');
		},
		enable : function (){
			this.element.removeClass('disable').addClass('enable');
			this._bindEvents();
		},
		getValue : function (){
			var ele = this.element;
			var val = $.data(ele, 'ratingbox').initVal;
			return val;
		},
		setValue : function (val){
			var ele = this.element,
				opts = this.options;
			if(val > opts.min && val < opts.max){
				$.data(ele, 'ratingbox').initVal = val;
				this._showStar($.data(ele, 'ratingbox').initVal);
			} else {
				alert('设置的值超出范围，请检查！');
			}
		},
		_create : function() {
			var self = this,
				ele = self.element,
				opts = self.options;
				
			$.data(ele, 'ratingbox', {
				initVal : opts.value,	//存储初始值以便在点击事件以后可以修改值
				changeVal : ''
			});
				
			ele.addClass('rating');
			// alert(ele.parent().html());
			if(opts.starnum >= opts.min && opts.starnum <= opts.max){
				var star = ele.wrapInner('<span class="stars"></span>');
				// ele.wrapInner(star);
				var stars = ele.find('.stars');
				for(var i = 0; i < opts.starnum; i++) {
					$('<span></span>').insertAfter(stars).addClass('star-uncheck star');
				}
			} else {
				alert('请调整星星的个数至合适的值！');
			}
			this._bindEvents();
		},
		_init : function() {
			//some code
		},
		_bindEvents : function() {
			var self = this,
				ele = self.element,
				opts = self.options;
			self._showStar($.data(ele, 'ratingbox').initVal);
			ele.children().each(function(index) {
			  	$(this).unbind('mouseover.ratingbox').bind('mouseover.ratingbox', function(event) {
			  		$.data(ele, 'ratingbox').changeVal = index;
			  		self._showStar($.data(ele, 'ratingbox').changeVal);
				}).unbind('mouseout.ratingbox').bind('mouseout.ratingbox', function(event) {
					self._showStar($.data(ele, 'ratingbox').initVal);
				}).unbind('click.ratingbox').bind('click.ratingbox', function(event) {
					$.data(ele, 'ratingbox').initVal = index;
					self._showStar($.data(ele, 'ratingbox').initVal);
					self._trigger('onChange', event, index);
				});
			});
		},
		_showStar : function(target) {
			var ele = this.element;
			var span = ele.find('.stars').next('span');
			ele.find('.stars').siblings().removeClass('star-checked').addClass('star-uncheck');
			for(var i = 0; i < target; i++) {
				span.removeClass('star-uncheck').addClass('star-checked');
				var span = span.next('span');
			}
		}
	});
})(jQuery);

