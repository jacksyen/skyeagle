(function($) {
	// var id = 0;	
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
			width      : 150
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			var arrow = this.element.next('span'),
				parent = this.element.parent();
			this.element.numberbox('destroy');
			
			// 取消绑定事件
			$(document).unbind('click.combo');
			$(document).unbind('focus.combo');
			$(document).unbind('blur.combo');
			
			// 删除arrow
			arrow.remove();
			parent.remove();
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			var span = this.element.next('span');
			this.element.numberbox('disable');
			span.attr('disabled', 'true');
			span.children().unbind('click');
		},
		enable : function (){
			var ele = this.element,
				opts = this.options;
			var span = this.element.next('span');
			this.element.numberbox('enable');
			span.removeAttr('disabled');
			span.children().bind('click');
			span.find('.spinner-arrow-up').unbind('.numberspinner').bind('click.numberspinner', function(event) {
				($.data(ele, 'numberspinner').val) += opts.addnumber;
				ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
			});
			span.find('.spinner-arrow-down').unbind('.numberspinner').bind('click.numberspinner', function(event) {
				($.data(ele, 'numberspinner').val)-= opts.addnumber;
				ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
			});
		},
		clear : function (){
			this.element.numberbox('clear');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		numberspinner : function (){
			return $.data(this.element, 'numberspinner').numberspinner;
		},
		_create : function() {
			var self = this, ele = this.element, opts = this.options;

			var numsp = ele.addClass('numsp').numberbox({
				parseable : opts.parseable,
				precision : opts.precision,
				width : opts.width
			});
			
			$.data(ele, 'numberspinner', {
				val : '',
				numberspinner : ''
			});

			// var ID = id++;
			// var div = $('<span class="numberspinner"></span>').attr('id', 'ns-' + ID);
			// numsp.wrap(div);
			// var span = $('<span class="spinner-arrow"><span class="spinner-arrow-up"></span><span class="spinner-arrow-down"></span></span>');
			// span.insertAfter(numsp);
			// var div = $('<span class="numberspinner"></span>');
			var div = ele.wrap($('<span class="numberspinner"></span>'));
			var span = $('<span class="spinner-arrow"><span class="spinner-arrow-up"></span><span class="spinner-arrow-down"></span></span>');
			span.insertAfter(ele);
			ele.parent().find('.spinner-arrow').css({
				width : 18
			});
			// 设置numberspinner的外框宽度
			ele.parent().width(opts.width + ele.parent().find('.spinner-arrow').width());
			// 得到numberspinner对象
			$.data(ele, 'numberspinner').numberspinner = ele.parent();

			this._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;

			ele.bind('focus.numberspinner', function(event) {
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
			}).bind('blur.numberspinner', function(event) {
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
