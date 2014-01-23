(function($) {

	$.widget('ui.validatebox', {
		options : {
			// 验证能否为空
			required : false,
			// 提示框宽度
			tipwidth : null,
			// 验证失败提示信息
			missMsg : '输入框不能为空',
			// 宽度
			width   : null
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			// var vabox = this.element.find('.validate-text').parent();
			this.element.parent().remove();
			alert('xxx');
			// vabox.remove();
		},
		resize : function (options){
			alert('xxx');
			var width = this.element.options.width;
			width = options;
		},
		disable : function (){
			// var combo = this.element.data('mycombo').combo;
			// // combo.children().each(function (){
				// // $(this).attr('disabled','true');
			// // });
			// var input = combo.find('.combo-input');
			// input.attr('disabled','true').removeClass('validatebox-invalid');
			// var arrow = combo.find('.combo-arrow');
			// arrow.attr('disabled','true');
			// arrow.unbind('.combo');
		},
		enable : function (){
			// var combo = this.element.data('mycombo').combo;
			// // combo.children().each(function (){
				// // $(this).attr('disabled','true');
			// // });
			// var input = combo.find('.combo-input');
			// input.removeAttr('disabled');//.addClass('validatebox-invalid');
			// var arrow = combo.find('.combo-arrow');
			// arrow.removeAttr('disabled')
			// this._bindEvents();
		},
		validate : function (){
			// var self = this,
				// opts = this.options;
			// if(opts.required){
				// var combo = this.element.data('mycombo').combo;
				// var val = combo.find('.combo-input').val();
				// if(!val || val === ''){
					// return false;
				// }
			// }
			// return true;
		},
		clear : function (){
			alert('xxx');
			// var combo = this.element.data('mycombo').combo;
			// combo.find('.combo-input').val('');
		},
		getValue : function (){
			//var val = this.element.val();
			alert('xxx');
			//return val;
			// return this.element.find('.validate-text').val();
			// var combo = this.element.data('mycombo').combo;
			// return combo.find('.combo-input').val();
		},
		// setValue : function (val){
			// var combo = this.element.data('mycombo').combo;
			// return combo.find('.combo-input').val(val);
		// },
		
		
		
		/**
		 * 设置值
		 * @param  string
		 */
		setValue : function(param) {
			if(!param) {
				return;
			}
			this.element.val(param);
			this._validate(this.element);
		},
		/*
		 * 手动触发验证事件
		 */
		txtEvent : function() {
			this._validate(this.element);
		},
		_create : function() {
			var ele = this.element,
				opts = this.options;
			ele.addClass('validate-text').width(opts.width);

			// 初始化内存数据validate
			$.data(ele, 'validate', {
				tip : null,
				showTip : true
			});
			this._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;
			// parent = ele.data('validate').parent;
			var time = null;

			ele.unbind('.validate').bind('focus.validate', function() {
				if(time) {
					clearInterval(time);
				}
				time = setInterval(function() {
					self._validate(ele);
				}, 200);
			}).bind('blur.validate', function() {
				clearInterval(time);
				time = null;
				self._hideTip(ele);
				$.data(ele, 'validate').showTip = false;
			}).bind('mouseover.validate', function() {
				$.data(ele, 'validate').showTip = true;
				if($(this).hasClass('validate-invalid')) {
					self._showTip(ele);
				}
			}).bind('mouseout.validate', function() {
				self._hideTip(ele);
				$.data(ele, 'validate').showTip = false;
			});

		},
		/**
		 * 验证输入框是否有内容
		 * 为空返回false
		 */
		_validate : function(target) {
			var showTip = $.data(target, 'validate').showTip;

			var opts = this.options, ele = this.element;

			var bVal = target.val();
			if(opts.required) {
				if(bVal == '') {
					if(!showTip) {
						return false;
					}
					target.addClass('validatebox-invalid');
					this._showTip(target);
					return false;
				}
			}
			$.data(target, 'validate').showTip = true;
			target.removeClass('validatebox-invalid');
			this._hideTip(target);
			return true;

		},
		/**
		 * 隐藏提示层
		 */
		_hideTip : function(target) {
			var tip = $.data(target, 'validate').tip;
			if(tip) {
				tip.remove();
				$.data(target, 'validate').tip = false;
			}
		},
		/**
		 * 显示提示层
		 */
		_showTip : function(target) {
			var opts = this.options;

			var tip = $.data(target, 'validate').tip;
			if(!tip) {
				tip = $('<div class="validatebox-tip">' + '<span class="validatebox-tip-content">' + '</span>' + '<span class="validatebox-tip-pointer">' + '</span>' + '</div>').appendTo('body');
				$.data(target, 'validate').tip = tip;
			}
			tip.find('.validatebox-tip-content').width(opts.tipwidth).html(opts.missMsg);
			tip.css({
				display : 'block',
				left : target.offset().left + target.outerWidth(),
				top : target.offset().top
			});
		}
	});
})(jQuery);
