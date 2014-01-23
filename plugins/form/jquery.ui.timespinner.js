(function($) {

	$.widget('ui.timespinner', {
		options : {
			// 分隔符
			Separator : ':',
			//
			highlight : null,
			// 宽度
			width : 150
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			this.element.numberspinner('destroy');
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
			this.element.numberbox('enable');
		},
		clear : function (){
			this.element.numberbox('clear');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		// setValue : function (param){
			// $.data(this.element, 'timespinner', {
				// time : param
			// });
			// this.element.numberbox('setValue', param);
		// },
		timespinner : function() {
			return $.data(this.element, 'timespinner').timespinner;
		},
		_create : function() {
			var self = this, ele = self.element, opts = self.options;
			
			$.data(ele, 'timespinner', {
				time : '',
				timespinner : ''
			});
			
			ele.numberspinner({
				parseable : false,
				precision : 0,
				width : opts.width
			});

			$.data(ele, 'timespinner').timespinner = ele.numberspinner('numberspinner');
			
			this._bindEvents();
		},
		_bindEvents : function() {
			// 判断时间前面是否需要加0
			function checkTime(target) {
				if(target < 10) {
					target = "0" + target;
				}
				return target;
			}
			
			var self = this, ele = self.element, opts = self.options;
			var date = new Date(), h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();

			// set default value
			ele.val(checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s));

			ele.bind('focus.timespinner', function(event) {
				var val = $(this).val();
				if(val == '') {
					$.data(ele, 'timespinner', {
						time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					});
				} else {
					$.data(ele, 'timespinner', {
						time : val
					});
				}
				ele.numberbox('setValue', $.data(ele, 'timespinner').time);

			}).bind('click.timespinner', function(event) {
				var start = 0;
				var numstart = 0, numend = 0;
				// 考虑兼容性的问题，前面是主流浏览器支持，后面是IE支持
				if(this.selectionStart != null) {
					start = this.selectionStart;
				} else if((navigator.appName == "Microsoft Internet Explorer")) {
					var range = this.createTextRange();
					var s = document.selection.createRange();
					s.setEndPoint("StartToStart", range);
					start = s.text.length;
				}
				if(start >= 0 && start <= 2) {
					opts.highlight = 0;
					numstart = 0;
					numend = 2;
				} else if(start >= 3 && start <= 5) {
					opts.highlight = 1;
					numstart = 3;
					numend = 5;
				} else if(start >= 6 && start <= 8) {
					opts.highlight = 2;
					numstart = 6;
					numend = 8;
				}
				// this.setSelectionRange(numstart, numend);
				if (this.selectionStart != null){
					this.setSelectionRange(numstart, numend);
				} else if ((navigator.appName == "Microsoft Internet Explorer")){
					var range = this.createTextRange();
					range.collapse();
					range.moveEnd('character', numend);
					range.moveStart('character', numstart);
					range.select();
				}
				$.data(ele, 'clickPos', {
					start : numstart,
					end : numend
				});
			}).bind('blur.timespinner', function(event) {
				var th = this;
					// val = $(this).val();
				// $.data(ele, 'timespinner', {
					// time : val
				// });
				// if(val){
					// if(h > 23) {
						// h = 0;
					// }
					// if(m > 59) {
						// m = m-60;
						// h++;
					// }
					// if(s > 59) {
						// s = s-60;
						// m++;
					// }
					// $.data(ele, 'timespinner', {
						// time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					// });
					ele.numberbox('setValue', $.data(ele, 'timespinner').time);
				// }
				ele.parent().find('.spinner-arrow-up').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					switch(opts.highlight) {
						case 0 :
							if(h < 23) {
								h += 1;
							} else if(h == 23) {
								h = 0;
							}
							break;
						case 1 :
							if(m < 59) {
								m += 1;
							} else if(m == 59) {
								m = 0;
								if(h < 23) {
									h += 1;
								} else if(h == 23) {
									h = 0;
								}
							}
							break;
						case 2 :
							if(s < 59) {
								s += 1;
							} else if(s == 59) {
								s = 0;
								if(m < 59) {
									m += 1;
								} else if(m == 59) {
									m = 0;
								}
							}
							break;
					};
					$.data(ele, 'timespinner', {
						time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					});
					ele.numberbox('setValue', $.data(ele, 'timespinner').time);

					// 获取焦点
					ele.trigger('focus.timespinner');
					var clickPos = $.data(ele, 'clickPos');
					if(clickPos) {
						if ((navigator.appName == "Microsoft Internet Explorer")) {
						  	var range = th.createTextRange();
							range.collapse();
							range.moveEnd('character', clickPos.end);
							range.moveStart('character', clickPos.start);
							range.select();
						} else {
							th.setSelectionRange(clickPos.start, clickPos.end);
						}
						return;
					}
					
					
					
					//this.setSelectionRange(numstart, numend);

				});
				ele.parent().find('.spinner-arrow-down').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					switch(opts.highlight) {
						case 0 :
							if(h > 0) {
								h -= 1;
							} else if(h == 0) {
								h = 23;
							}
							break;
						case 1 :
							if(m > 0) {
								m -= 1;
							} else if(m == 0) {
								m = 59;
								if(h > 0) {
									h -= 1;
								} else if(h == 0) {
									h = 23;
								}
							}
							break;
						case 2 :
							if(s > 0) {
								s -= 1;
							} else if(s == 0) {
								s = 59;
								if(m > 0) {
									m -= 1;
								} else if(m == 0) {
									m = 59;
								}
							}
							break;
					};
					$.data(ele, 'timespinner', {
						time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					});
					ele.numberbox('setValue', $.data(ele, 'timespinner').time);
					// 获取焦点
					ele.trigger('focus.timespinner');
					var clickPos = $.data(ele, 'clickPos');
					if(clickPos) {
						if ((navigator.appName == "Microsoft Internet Explorer")) {
						  	var range = th.createTextRange();
							range.collapse();
							range.moveEnd('character', clickPos.end);
							range.moveStart('character', clickPos.start);
							range.select();
						} else {
							th.setSelectionRange(clickPos.start, clickPos.end);
						}
						return;
					}
				});
			});
		}
	});
})(jQuery);
