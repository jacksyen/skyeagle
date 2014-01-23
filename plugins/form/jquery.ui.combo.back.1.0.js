(function($) {
	var id = 0;
	
	$.widget('ui.combo', {
		options : {
			width : null,
			// 是否可编辑
			editable : false,
		},
		_create : function (){
			var self = this,
				ele  = this.element,
				opts = this.options;
			
			ele.addClass('combo-panel').panel({
				doSize:false,
				closed:true,
				style:{
					position:'absolute',
					backgroundColor : '#fff'
				},
				width: opts.width,
				onOpen: function(){
					$(this).panel('resize');
				}
			});
			
			var panel = ele.panel('panel');
			var ID = id++;
			panel.wrap($('<div></div>').attr('id','cb-'+ ID));
			var combo = $('<div class="combo"></div>').insertBefore(panel);
			combo.width(opts.width - combo.outerWidth());
			var text = $('<input type="text" class="combo-input combo-warn" />').appendTo(combo);
			var arrow = $('<span class="combo-arrow"></span>').appendTo(combo);
			var content = $('<span class="tip-pointer"></span><span class="tip-content">This file is required.</span>');
			var tip = $('<div></div>').attr('id','cb-'+ ID).addClass('tip').wrapInner(content);
			var tip_tip = tip.insertAfter(panel);
			
			this.element.data('mycombo',{
				panel : panel,
				combo : combo,
				parent: combo.parent()
			});
			//combo.find('input.combo-text').attr('readonly', !state.options.editable);
			// $('input.combo-text', combo).attr('readonly', !opts.editable);
			this._bindEvents();
			this._setSize();
		},
		_init : function (){
			
		},
		_bindEvents : function (){
			var self = this,
				ele  = self.element,
				opts = self.options,
				combo = ele.data('mycombo').combo,
				parent= ele.data('mycombo').parent;

			//点击空白地方关闭所有panel
			parent.bind('mouseleave.combo', function(event) {
				$(document).unbind('click.combo').bind('click.combo', function(event) {
					$('div.combo-panel').each(function(index) {
						$(this).panel('close');
						parent.find('.tip').css({
							'display' : 'none'
						});
					});
				});
			}).bind('mouseenter.combo', function() {
				$(document).unbind('click.combo');
			});	
			
			//点击一个panel其他的都不显示
			// parent.bind('mouseenter.combo', function(event) {
				// $(this).unbind('click.combo').bind('click.combo', function(event) {
				// });
			// });
			
			//点击arrow，显示出panel
			// var panel_state = $('div.combo-panel').panel().html();
			// alert(panel_state);
			combo.find('.combo-arrow').unbind('click.combo').bind('click.combo', function(event) {
				// $('div.combo-panel').panel('open');
				parent.find('.combo-panel').panel('open');
				self._showTip();
			});
			
			//箭头悬停动画
			combo.find('.combo-arrow').hover(function() {
				$(this).css({
					'opacity' : '1.0'
				});
			}, function() {
				$(this).css({
					'opacity' : '0.6'
				});
			});
			
			//提示及警告
			combo.find('.combo-warn').hover(function() {
				self._showTip();
			}, function() {
				parent.find('.tip').css({
					'display' : 'none'
				});
			});
			
			//获取数据传到input
			parent.find('.panel-body input[type="radio"]').each(function(index) {
				$(this).bind('click.combo', function() {
					var val = $(this).next().html();
					parent.find('.combo-input').val(val);
					parent.find('.combo-panel').panel('close');
					self._showTip();
				});
			});
		},
		_setSize : function (){
			var self = this,
				ele  = self.element,
				opts = self.options,
				combo = ele.data('mycombo').combo,
				parent= ele.data('mycombo').parent;
			
			var arrow = parent.find('.combo-arrow');
			parent.find('.tip').css({
				'left' : combo.width() - arrow.outerWidth(),
				'top'  : combo.offset().top
			});
			combo.find('.combo-input').width(combo.width() - arrow.outerWidth());
		},
		_showTip : function () {
			var self = this,
				ele  = self.element,
				opts = self.options,
				combo = ele.data('mycombo').combo,
				parent= ele.data('mycombo').parent;
			var val = combo.find('.combo-input').val();
				if(val == null || val.length === 0) {
					parent.find('.tip').css({
						'display' : 'block'
					});
					combo.find('.combo-warn').css({
						'display' : 'block'
					});
					return true;
				} else if(val != null && val.length > 0) {
					parent.find('.tip').css({
						'display' : 'none'
					});
					combo.find('.combo-warn').css({
						'background' : '#FFE'
					});
				}
				return false;
		}
	});
})(jQuery);


