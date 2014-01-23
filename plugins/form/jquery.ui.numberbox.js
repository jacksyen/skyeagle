(function($) {

	$.widget('ui.numberbox', {
		options : {
			// 是否需要验证
			required : false,
			// 设置能显示的最大值
			max : null,
			// 设置能显示的最小值
			min : null,
			// 精度设置
			precision : 2,
			// 是否需要处理精度
			parseable : true,
			// 宽度
			width     : 150
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			var input = this.element,
				hidInput = $.data(this.element, 'numberbox').hid;
			input.validatebox('destroy');
			$.data(this.element, 'numberbox').hid.remove();
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			this.element.attr('disabled','true').removeClass('validatebox-invalid');
		},
		enable : function (){
			var ele = this.element;
			if(!ele.val() || ele.val() == '') {
				ele.removeAttr('disabled').addClass('validatebox-invalid');
			} else {
				ele.removeAttr('disabled');
			}
		},
		validate : function (){
			var self = this,
				ele = self.element,
				opts = this.options;
			if(opts.required){
				var val = ele.val();
				if(!val || val === ''){
					return false;
				}
			}
			return true;
		},
		clear : function (){
			this.element.val('');
			$.data(this.element, 'numberbox').hid.val('');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		setValue : function (param){
			this._addValue(param);
		},
		numberbox : function() {
			return $.data(this.element, 'numberbox').numberbox;
		},
		_create : function() {
			var self = this, ele = this.element, opts = this.options;

			ele.validatebox({
				required : opts.required,
				missMsg : '输入框不能为空',
				width : opts.width
			});
			ele.wrap($('<div></div>').addClass('numberbox'));
			var hidInput = $('<input type="hidden" class="numberbox-hidInput" />');
			ele.after(hidInput);
			$.data(ele, 'numberbox', {
				hid : hidInput,
				options : null,
				numberbox : ''
			});
			// 获得numberbox的对象
			$.data(ele, 'numberbox').numberbox = ele.parent();
			this._bindEvents();
		},
		_init : function() {
			//some code
			var self = this, ele = self.element, parent = ele.parent;
			this._addValue('');
			$.data(ele, 'numberbox').hid.val('');
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;
			ele.bind('keypress.numberbox', function(e) {
				if(e.which == 45) {//-
					return true;
				}
				if(e.which == 46) {//.
					return true;
				} else if((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 8) {
					return true;
				} else {
					return false;
				}
			}).bind('paste.numberbox', function() {
				if(window.clipboardData) {
					var s = clipboardData.getData('text');

					//粘贴的时候因为无论是什么都不能复制过去，所以可以用\D
					if(! /\D/.test(s)) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}).bind('dragenter.numberbox', function(event) {
				return false;
			}).bind('blur.numberbox', function(event) {
				self._addValue($(this).val());
			}).bind("focus.numberbox", function(event) {
				// 防止拖动，重新赋值
				var val = $.data(ele, 'numberbox').hid.val();
				if($(this).val() != val) {
					if(opts.min != null && opts.min != undefined && val < opts.min) {
						$(this).val(opts.min.toFixed(opts.precision));
					} else if(opts.max != null && opts.max != undefined && val > opts.max) {
						$(this).val(opts.max.toFixed(opts.precision));
					} else {
						$(this).val(val);
					}
				}
			});
		},
		_addValue : function (currentVal){
			var self = this,
				ele  = self.element,
				opts = self.options;
			//此处不能用\D，否则会把小数点符号也给清除
			if(/\d+/.test(currentVal)) {
				if(opts.parseable){
					var cval = parseFloat(currentVal).toFixed(opts.precision);
					$.data(ele, 'numberbox').hid.val(cval);
				} else {
					$.data(ele, 'numberbox').hid.val(currentVal);
				}
				
				if(opts.min != null && opts.min != undefined && cval < opts.min) {
					ele.val(opts.min.toFixed(opts.precision));
				} else if(opts.max != null && opts.max != undefined && cval > opts.max) {
					ele.val(opts.max.toFixed(opts.precision));
				} else {
					ele.val($.data(ele, 'numberbox').hid.val());
				}
				return;
			}
			// 存在字符串或其他字符,替换保存的值
			var cV = ele.val($.data(ele, 'numberbox').hid.val());
		}
	});
})(jQuery);
