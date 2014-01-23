(function($) {
	var id = 0;

	$.widget('ui.combo', {
		options : {
			// 验证是否为空
			required : false,
			// 验证失败提示信息
			missMsg : '不能为空',
			// 宽度
			width : null,
			// 是否可编辑
			editable : false,
			// 是否带有单选按钮,不可与multiable同时为true
			radioable : true,
			// 是否可以多选
			multiable : false,
			// 分隔符
			separator : ',',
			// 设置初始值
			value : ''
		},
		getOptions : function (){
			return this.options;
		},
		panel : function (){
			return this.element.panel('panel');
		},
		destroy : function (){
			var combo = this.element.data('mycombo').combo;
			// 移除combo的父元素
			combo.parent().remove();
			// 移除panel
			this.element.panel('destroy', true);
		},
		/**
		 * {width : 100,height:100} 
		 */
		resize : function (options){
			//this.element.
			var combo = this.element.data('mycombo').combo;
			combo.width(options.width - (combo.outerWidth() - combo.width()));
			this.element.panel('resize',options);
			//alert(this.element.html());
			this._setSize();
		},
		showPanel : function (){
			this._showPanel();
			// this.element.panel('open');
		},
		hidePanel : function (){
			this.element.panel('close');
		},
		disable : function (){
			var combo = this.element.data('mycombo').combo;
			// combo.children().each(function (){
				// $(this).attr('disabled','true');
			// });
			var input = combo.find('.combo-input');
			input.attr('disabled','true').removeClass('validatebox-invalid');
			var arrow = combo.find('.combo-arrow');
			arrow.attr('disabled','true');
			arrow.unbind('.combo');
		},
		enable : function (){
			var combo = this.element.data('mycombo').combo;
			// combo.children().each(function (){
				// $(this).attr('disabled','true');
			// });
			var input = combo.find('.combo-input');
			input.removeAttr('disabled');//.addClass('validatebox-invalid');
			var arrow = combo.find('.combo-arrow');
			arrow.removeAttr('disabled')
			this._bindEvents();
		},
		validate : function (){
			var self = this,
				opts = this.options;
			if(opts.required){
				var combo = this.element.data('mycombo').combo;
				var val = combo.find('.combo-input').val();
				if(!val || val === ''){
					return false;
				}
			}
			return true;
		},
		clear : function (){
			var combo = this.element.data('mycombo').combo;
			combo.find('.combo-input').val('');
		},
		getValue : function (){
			var combo = this.element.data('mycombo').combo;
			return combo.find('.combo-input').val();
		},
		setValue : function (val){
			var combo = this.element.data('mycombo').combo;
			return combo.find('.combo-input').val(val);
		},
		
		/**
		 * 展示下拉框事件 
		 */
		onShowPanel : function() {},
		/**
		 * 隐藏下拉框事件 
		 */
		onHidePanel : function() {},
		/**
		 * 改变值事件
		 * data.oldVal,data.newVal
		 *  {oldVal : '', newVal : ''}
		 * @param {Object} event
		 * @param {Object} data
		 */
		onChange : function(event, data) {},

		_create : function() {
			var self = this, 
				ele = this.element, 
				opts = this.options;
// var opts = $.data('combo',options);
// opts.width = 100;
// $.data('combo',opts);
// $.data('combo',{options.width:100});
			ele.addClass('combo-panel').panel({
				
				doSize : false,
				closed : true,
				style : {
					position : 'absolute',
					backgroundColor : '#fff'
				},
				width : opts.width,
				onOpen : function() {
					$(this).panel('resize');
				}
			});
			if(opts.radioable) {
				ele.find('.sp').prepend('<input type="radio" name="lang" />');
			}
			var panel = ele.panel('panel');
			var ID = id++;
			panel.wrap($('<div></div>').attr('id', 'cb-' + ID));

			var combo = $('<div class="combo"></div>').insertBefore(panel);

			//combo.width(opts.width - combo.outerWidth());
			combo.width(opts.width);

			var text = $('<input type="text" class="combo-input" />').appendTo(combo);
			text.validatebox({
				required : opts.required,
				missMsg  : opts.missMsg
			});
			// $.data(ele, 'combo', {
				// val : ''
			// });

			if(!opts.editable) {
				text.attr('readonly', 'readonly');
				text.attr('autocomplete', 'off');
			}

			var arrow = $('<span class="combo-arrow"></span>').appendTo(combo);
			combo.width(opts.width - (combo.outerWidth() - opts.width));

			this.element.data('mycombo', {
				val : [],
				panel : panel,
				combo : combo,
				parent : combo.parent()
			});
			this._bindEvents();
			this._setSize();
		},
		_init : function() {
			//some code
		},
		_showPanel : function (){
			var self = this,
				ele  = this.element,
				parent = ele.data('mycombo').parent;
			parent.find('.combo-panel').panel('open');
			self._trigger('onShowPanel', null);
			parent.find('.combo-input').validatebox('txtEvent');
		},
		_bindEvents : function() {
			var self = this, ele = self.element, 
				opts = self.options, 
				combo = ele.data('mycombo').combo, 
				parent = ele.data('mycombo').parent;
			
			// if(opts.disabled){
				// return;
			// }

			//点击空白地方关闭所有panel
			parent.bind('mouseleave.combo', function(event) {
				$(document).unbind('click.combo').bind('click.combo', function(event) {
					$('div.combo-panel').each(function(index) {
						$(this).panel('close');
						self._trigger('onHidePanel', null);
					});
				});
			}).bind('mouseenter.combo', function() {
				$(document).unbind('click.combo');
			});

			//点击arrow，显示出panel及空字符提示
			combo.find('.combo-arrow').unbind('click.combo').bind('click.combo', function(event) {
				self._showPanel();
			});

			//箭头悬停动画
			combo.find('.combo-arrow').bind('mouseover.combo',function() {
				$(this).css({
					'opacity' : '1.0'
				});
			}).bind('mouseout',function() {
				$(this).css({
					'opacity' : '0.6'
				});
			});

			//获取数据传到input
			if(opts.value != ''){
				parent.find('.combo-input').validatebox('setValue', opts.value);
			}
			
			
			if(opts.radioable) {
				parent.find('.panel-body input[type="radio"]').each(function(index) {
					$(this).bind('click.combo', function() {
						var val = $(this).parent().text();
						// 调用validatebox的setValue方法
						parent.find('.combo-input').validatebox('setValue', val);
						self._trigger('onChange', null);
						parent.find('.combo-panel').panel('close');
						self._trigger('onHidePanel', null);
					}).bind('mouseover.combo', function() {
						$(this).css({
							'cursor' : 'pointer'
						});
					});
				});
			} else {
				if(!opts.multiable){
					parent.find('.sp').bind('click.combo', function() {
							// 检测时候含有高亮文本，有则取消其他高亮，为当前选中高亮显示
							var hl = $('.panel-body div');
							if(hl.hasClass('heightlight')) {
								hl.removeClass('heightlight');
							} 
							$(this).addClass('heightlight');
							// 获取div中的文本内容
							var val = $(this).text();
							// 调用validatebox的setValue方法
							parent.find('.combo-input').validatebox('setValue', val);
							self._trigger('onChange', null);
							parent.find('.combo-panel').panel('close');
							self._trigger('onHidePanel', null);
						}).bind('mouseover.combo', function() {
							$(this).css({
								'cursor' : 'pointer'
							});
						});
				} else {
					parent.find('.sp').bind('click.combo', function() {
						$(this).toggleClass('heightlight');
						var val = $(this).html();
						if($(this).hasClass('heightlight')){
							ele.data('mycombo').val.push(val);
						} else {
							var temp = ele.data('mycombo').val;
							var index = $.inArray(val, temp);
							temp.splice(index, 1);
							ele.data('mycombo').val = temp;
						}
						parent.find('.combo-input').validatebox('setValue', ele.data('mycombo').val);
						self._trigger('onChange', event, null);
					});
					parent.find('.sp').each(function(index) {
					  	$(this).bind('click.combo', function(event) {
							
						});
					});
				}
			}
		},
		_setSize : function() {
			var self = this, 
				ele = self.element, 
				opts = self.options, 
				combo = ele.data('mycombo').combo, 
				parent = ele.data('mycombo').parent;

			var arrow = parent.find('.combo-arrow');
			// parent.find('.tip').css({
				// 'left' : combo.width() - arrow.outerWidth(),
				// 'top' : combo.offset().top
			// });
			// parent.find('.validatebox-tip').width(opts.tipwidth);
			combo.find('.combo-input').width(combo.width() - arrow.outerWidth());
		}
	});
})(jQuery);

