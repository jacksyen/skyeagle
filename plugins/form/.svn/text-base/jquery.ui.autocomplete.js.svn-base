/**
 * 
 * @param 	{Object} $
 * @since 	2012.12.25  修改86、87行：eval() -> new RegExp()
 */
(function($) {
	$.widget('ui.autocomplete', {
		options : {
			// 传进来的所有数据
			data : ''
		},
		destroy : function() {
			this.element.combo('destroy');
			this.element.remove();
		},
		resize : function(target) {
			this.element.combo('resize', {
						width : target
					});
		},
		disable : function() {
			this.element.combo('disable');
		},
		enable : function() {
			this.element.combo('enable');
		},
		autocomplete : function() {
			return this.element.combo('combo');
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options;
			// 获取传进来的参数的data内的值
			// alert(opts.data[0]);
			// 获取data的总参数个数
			// alert(opts.data.length);
			// 传进来的参数的个数
			// alert(opts.total);
			
			// 生成div的内容
			var sp_all = ele.wrapInner('<div class="sp_all"></div>');
			for(var i = 0; i < opts.data.total; i++) {
				var sp = $('<div class="sp"></div>').addClass('sp' + i).text(opts.data.data[i]);
				sp_all.find('.sp_all').before(sp);
			}
			// 调用combo控件
			ele.combo({
				width : 150,
				editable : true,
				radioable : false
				// multiable : true,
				// required : true,
				// value : 'Java'
			});
			
			$.data(ele, 'autocomplete', {
				combo : ele.parent().parent()
			});
			
			this._bindEvents();
		},
		_init : function() {
			//some code
		},
		_bindEvents : function() {
			var self = this,
				ele = self.element,
				opts = self.options,
				combo = $.data(ele, 'autocomplete').combo;
			
			var input = combo.find('.combo-input'),
				arrow = combo.find('.combo-arrow');
			
			input.bind('keyup.autocomplete', function(event) {
				
				// alert('aaaaaa');
				
			  	if(input.val() != '') {
					// 如果需要只匹配字母，可以在这里添加如下注释的条件
					// var re = /^[a-z]+$/gi;
					// var rs = re.test(input.val());
					// if(rs) {
					
					var inputVal = input.val();
					// alert(inputVal);
					// var validateVal_1 = '/' + inputVal + '+/gi';
					// var validateVal_2 = '/' + inputVal + '+/i';
					var evalVal_1 = new RegExp(inputVal,'gi');
					var evalVal_2 = new RegExp(inputVal,'i');
					//var evalVal_1 = eval(validateVal_1);
					//var evalVal_2 = eval(validateVal_2);
					// alert(evalVal);
					// alert(validateVal);
					// alert(evalVal.test('bbbb'));
					for(var i = 0; i < opts.data.total; i++) {
						var sp = ele.find('.sp'+i).text();
						// alert(evalVal.test(sp));
						if(evalVal_1.test(sp) || evalVal_2.test(sp)) {
							ele.find('.sp'+i).removeClass('heightlight').css({
								display : 'block'
							});
						}else {
							ele.find('.sp'+i).css({
								display : 'none'
							});
							ele.panel('open');
						}
					}
					// }
					
				}else {
					ele.panel('close');
				}
			});
			
			arrow.bind('click.autocomplete', function(event) {
				for(var i = 0; i < opts.data.total; i++) {
			  		ele.find('.sp'+i).css({
						display : 'block'
					});
			  	}
			});
			
		}
	});
})(jQuery);

