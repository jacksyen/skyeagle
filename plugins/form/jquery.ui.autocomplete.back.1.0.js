(function($) {
	$.widget('ui.autocomplete', {
		options : {
			// 传进来的所有数据
			data : '',
			// 传进来的数据的个数
			total: ''
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
			for(var i = 0; i < opts.total; i++) {
				var sp = $('<div class="sp"></div>').addClass('sp' + i).text(opts.data[i]);
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
					for(var i = 0; i < opts.total; i++) {
						// alert($('.sp'+i).text());
						var sp = ele.find('.sp'+i).text();
						// alert(sp);
						if(sp.indexOf(input.val())<0) {
							ele.find('.sp'+i).css({
								display : 'none'
							});
							ele.panel('open');
						}else {
							ele.find('.sp'+i).removeClass('heightlight').css({
								display : 'block'
							});
						}
					}
					// }
				}else {
					ele.panel('close');
				}
			});
			
			arrow.bind('click.autocomplete', function(event) {
				for(var i = 0; i < opts.total; i++) {
			  		ele.find('.sp'+i).css({
						display : 'block'
					});
			  	}
			});
			
		}
	});
})(jQuery);

