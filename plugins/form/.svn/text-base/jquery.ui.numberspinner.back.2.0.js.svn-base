(function($) {
	var id = 0;	

	$.widget('ui.numberspinner', {
		options : {
			// 设置初始值
			initnumber : null,
			// 增量
			addnumber  : null,
			// 是否需要处理精度
			parseable  : true,
			// 精度
			precision  : 0,
			// 宽度
			width      : null
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			this.element.parent().next('input').remove();
			this.element.parent().remove();
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			this.element.numberbox('disable');
		},
		enable : function (){
			this.element.numberbox('enable');
		},
		// validate : function (){
			// var self = this,
				// ele = self.element,
				// opts = this.options;
			// if(opts.required){
				// var val = ele.val();
				// if(!val || val === ''){
					// return false;
				// }
			// }
			// return true;
		// },
		clear : function (){
			this.element.numberbox('clear');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		// setValue : function (param){
			// this.element.numberbox('setValue', param);
		// },
		_create : function() {
			var self = this, ele = this.element, opts = this.options;

			var numsp = ele.addClass('numsp').numberbox({
				parseable : opts.parseable,
				precision : opts.precision,
				width : opts.width
			});
			
			$.data(ele, 'numberspinner', {
				val : ''
			});

			var ID = id++;
			var div = $('<div class="numberspinner"></div>').attr('id', 'ns-' + ID);
			numsp.wrap(div);
			var span = $('<span class="spinner-arrow"><span class="spinner-arrow-up"></span><span class="spinner-arrow-down"></span></span>');
			span.insertAfter(numsp);

			this._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;

			ele.bind('focus.numberspinner', function() {
				var val = $(this).val();
				if($(this).val() == '') {
					$.data(ele, 'numberspinner', {
						val : opts.initnumber
					});
				} else {
					$.data(ele, 'numberspinner', {
						val : $(this).val()
					});
				}
				$(this).val($.data(ele, 'numberspinner').val);
			}).bind('blur.numberspinner', function() {
				$.data(ele, 'numberspinner', {
					val : parseInt($(this).val())
				});
				// 失去焦点之后才允许微调，可以避免初始值未设置师就可以调节微调器
				ele.parent().find('.spinner-arrow-up').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					($.data(ele, 'numberspinner').val) += opts.addnumber;
					ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
				});
				ele.parent().find('.spinner-arrow-down').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					($.data(ele, 'numberspinner').val)-= opts.addnumber;
					ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
				});
				
			});
			
		}
	});
})(jQuery);
