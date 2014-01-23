(function($) {

	$.widget('ui.slider', {
		options : {
			// 滑块宽度
			width : 800,
			// 滑块高度
			height : 300,
			// 滑块方向，垂直/水平 且h为水平
			mode : 'h',
			// slider-rule精度
			rule_pre : 10,
			// 最大值
			max : 100,
			// 最小值
			min : -30,
			// 滑块默认值
			value : 0,
			// 默认单位
			unit : 'px',
			
			// events
			onChange : function (){},
			onSlideStart : function (){},
			onSlideEnd   : function (){}
		},
		_create : function() {
			var self = this, ele = self.element, opts = self.options;
			
			$.data(ele, 'slider', {
				pos : null
			});
			
			if(opts.mode == 'h') {
				ele.width(opts.width);
			} else {
				ele.height(opts.height);
			}
			var sliderBody = $('<div class="slider">' + '<div class="slider-inner">' + '<a href="javascript:void(0)" class="slider-handle"></a>' + '<span class="slider-tip"></span>' + '</div>' + '<div class="slider-rule"></div>' + '<div class="slider-rulelabel"></div>' + '<div style="clear:both"></div>' + '<input type="hidden" class="slider-value">' + '</div>').insertAfter('input');
			if($('.slider-tip').html() == '') {
				if(opts.mode == 'h') {
					$('.slider-tip').html(opts.value + 'px');
					$('.slider-handle').css({
						left : ((opts.value-opts.min)/(opts.max-opts.min))*100 + '%'
					});
					$('.slider-tip').css({
						left : ((opts.value-opts.min)/(opts.max-opts.min))*100 + '%'
					});
				} else {

				}
			}

			var rule = ele.find('div.slider-rule');
			var label = ele.find('div.slider-rulelabel');
			rule.empty();
			label.empty();
			for(var i = 0; i <= 1; i += (opts.rule_pre/(opts.max-opts.min))) {
				var distance = i*100 +'%';
				var span = $('<span></span>').appendTo(rule);
				span.css((opts.mode == 'h' ? 'left' : 'top'), distance);
			}
			for(var i = 0; i <= (opts.max-opts.min); i += opts.rule_pre*2) {
				var distance = i/(opts.max-opts.min)*100 + '%';
				var span = $('<span></span>').appendTo(label);
				span.html(opts.min+parseInt(i));
				if(opts.mode == 'h') {
					span.css({
						left : distance,
						marginLeft : -Math.round(span.outerWidth() / 2)
					});
				} else {
					span.css({
						top : distance,
						marginTop : -Math.round(span.outerHeight() / 2)
					});
				}
			}

			self._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = self.element, opts = self.options;
			ele.find('.slider-handle').unbind('.slider').bind('mousedown.slider', function(event) {
				var downPos = event.pageX;
				self._trigger('onSlideStart');
				
				
				
				ele.find('.slider-handle').bind('mousemove.slider', function(e) {
					var movePos = e.pageX;
					// alert(movePos);
					// 7为整个圆形滑动条的宽度的一半
					if(movePos >= 7 && movePos <= (opts.width+7)) {
						$('.slider-handle').css({
							left : movePos - 7
						});
						$('.slider-tip').css({
							left : movePos - 7
						});
						var tempS = opts.min+parseInt(((opts.max-opts.min)/opts.width) *(movePos-7));
						$('.slider-tip').html(tempS + opts.unit);
						
						self._trigger('onChange', null, tempS.toString());
					}
				});
			})
			
			// .bind('mouseup.slider', function(event) {
			  	// ele.find('.slider-handle').unbind('mousemove.slider');
			  	// self._trigger('onSlideEnd');
			// }).bind('mouseout.slider', function(event) {
			  	// ele.find('.slider-handle').unbind('mousemove.slider');
			// });
			// ele.bind('mouseup.slider mouseout.slider', function(event) {
				// ele.find('.slider-handle').unbind('mousemove.slider');
				// self._trigger('onSlideEnd', null);
			// });
			
		}
	});
})(jQuery);
