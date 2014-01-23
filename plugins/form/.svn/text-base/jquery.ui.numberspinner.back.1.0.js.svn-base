(function($) {
	var id = 0;	

	$.widget('ui.numberspinner', {
		options : {
			// 设置初始值
			initnumber : null,
			// 增量
			addnumber  : null
		},
		_create : function() {
			var self = this, ele = this.element, opts = this.options;

			var numsp = ele.addClass('numsp').numberbox({
				precision : 0
			}).validate({
				required : true,
				missMsg : '请输入数字'
			});
			
			$.data(ele, 'numberspinner', {
				val : ''
			});
		
			var ID = id++;
			var div = $('<div class="numberspinner"></div>').attr('id', 'ns-' + ID);
			numsp.wrap(div);
			var span = $('<span class="spinner-arrow"><span class="spinner-arrow-up"></span><span class="spinner-arrow-down"></span></span>');
			span.insertAfter(numsp);
			
			
			
			// $('input').addClass('numsp');
			// var div = $('.validate-text').wrap($('<div class="numberspinner"></div>'));
			// var span = $('<span class="spinner-arrow"></span>');
			// span.insertAfter('.validate-text');
			// var span_up = $('<span class="spinner-arrow-up"></span>');
			// span.wrapInner(span_up);
			// var span_down = $('<span class="spinner-arrow-down"></span>').insertAfter(span_up);

			this._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;

			ele.parent().find('.numsp').bind('focus.numberspinner', function(event) {
				
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
			}).bind('blur.numberspinner', function(event) {
				$.data(ele, 'numberspinner', {
					val : $(this).val()
				});
				alert(typeof($(this).val()));
				
				$(this).val($.data(ele, 'numberspinner').val);
				// 失去焦点之后才允许微调，可以避免初始值未设置师就可以调节微调器
				ele.parent().find('.spinner-arrow-up').bind('click.numberspinner', function(event) {
					// for(var i = opts.addnumber ; i>0 ; i--){
						// ($.data(ele, 'numberspinner').val)++;
					// }
					($.data(ele, 'numberspinner').val) += opts.addnumber;
					alert(typeof($.data(ele, 'numberspinner').val));
					ele.parent().find('.numsp').val(($.data(ele, 'numberspinner').val));
				});
				ele.parent().find('.spinner-arrow-down').bind('click.numberspinner', function(event) {
					($.data(ele, 'numberspinner').val)-= opts.addnumber;
					alert(typeof($.data(ele, 'numberspinner').val));
					ele.parent().find('.numsp').val(($.data(ele, 'numberspinner').val));
				});
				
			});
			
		}
	});
})(jQuery);
