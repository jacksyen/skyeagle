(function($) {
	
	$.widget('ui.processmenu', {
		options : {
			/**
			 * 
			 * 数据格式如下
			 * 	var json = {
					total : 7,
					rows : [{
						title : '意见',
						href : '#demo1',
						content : '',
						isJump : false
					}, {
						title : '申报1',
						href : '#demo2',
						content : '',
						isJump : false
					}]
				}
			 */
			data : '',
			width : 600,
			height : 500,
			/**
			 *下一步事件, 进入下一步菜单之前触发
			 * @param index 下一步菜单是第几项 
			 */
			onNext : function (ui, index){},
			// 进程菜单结束事件
			onEnd : function (){}
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var total = json.total;
			/**
			 *	初始化title
			 */
			ele.addClass('processmenu');
			ele.append($('<div class="titles"></div>')).height(opts.height).width(opts.width);
			for(var i = 0; i < json.total; i++) {
				if( i == 0) {
					ele.find('.titles').append($('<span class="title title_first_selected">' + json.rows[i].title + '</span>'));
				} else if( i > 0 && i < total-1) {
					ele.find('.titles').append($('<span class="title title_middle_unselected">' + json.rows[i].title + '</span>'));
				} else if( i == total-1) {
					ele.find('.titles').append($('<span class="title title_last_unselected">' + json.rows[i].title + '</span>'));
				}
			}
			ele.width(ele.find('.titles').width());
			/**
			 *	初始化contents
			 */
			var contents = $('<div class="contents"></div>');
			contents.append($(json.rows[0].href));
			for(var i = 1; i < json.total; i++) {
				$(json.rows[i].href).css('display', 'none');
			}
			contents.css('height', opts.height - ele.find('.titles').height() - 50);			ele.append(contents);
			/**
			 *	初始化button 
			 */
			ele.append($('<div class="buttons"></div>'));
			ele.find('.buttons').append($('<div class="button"><button class="continue">继续</button><button class="end">完成</button><button class="jump">跳过</button></div>'));
			if(!json.rows[0].isJump) {
				ele.find('.buttons').find('.button').find('.jump').css({
					'display': 'none'
				});
			}
			$.data(ele, 'processmenu', {
				current : 0,
				first : ele.find('.titles span:first-child')
			});
			this._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var total = json.total;
			/**
			 *	继续按钮和完成按钮 
			 */
			ele.find('.continue').bind('click.processmenu', function(event) {
				var validate = $(json.rows[$.data(ele, 'processmenu').current].href).find('form').form('validate');
				if(validate){
					var current = ++$.data(ele, 'processmenu').current;
						if(current == 1) {
							$.data(ele, 'processmenu').first.removeClass('title_first_selected').addClass('title_first_unselected')
								.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
						} else if(current > 1 && current < total-1){
							$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
								.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
						} else if(current == total-1){
							$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
								.next('span').removeClass('title_last_unselected').addClass('title_last_selected');
							$(this).css({
								'display' : 'none'
							});
							ele.find('.end').css({
								'display' : 'block'
							}).click(function (){
								self._trigger('onEnd', null);
							});
							ele.find('.jump').css({
								'display' : 'none'
							});
						}
					$.data(ele, 'processmenu').first = $.data(ele, 'processmenu').first.next('span');
					ele.find('.contents').empty();

					self._trigger('onNext', null, current);
					ele.find('.contents').append($(json.rows[current].href).css('display', 'block'));
					if(json.rows[$.data(ele, 'processmenu').current].isJump) {
						ele.find('.jump').css({
							'display' : 'inline-block'
						});
					} else {
						ele.find('.jump').css({
							'display' : 'none'
						});
					}				}			});
			ele.find('.jump').bind('click.processmenu', function() {
				// 解决因为用户在可以跳过的地方点击继续导致的validatebox-tip弹出在后一界面无法消失的问题
				$('body').find('.validatebox-tip').remove();
				var current = ++$.data(ele, 'processmenu').current;
				if(current == 1) {
					$.data(ele, 'processmenu').first.removeClass('title_first_selected').addClass('title_first_unselected')
						.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
				} else if(current > 1 && current < total-1){
					$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
						.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
				} else if(current == total-1){
					$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
						.next('span').removeClass('title_last_unselected').addClass('title_last_selected');
					$(this).css({
						'display' : 'none'
					});
					ele.find('.end').css({
						'display' : 'block'
					}).click(function (){
						self._trigger('onEnd', null);
					});
					ele.find('.continue').css({
						'display' : 'none'
					});
				}
				$.data(ele, 'processmenu').first = $.data(ele, 'processmenu').first.next('span');
				ele.find('.contents').empty();

				self._trigger('onNext', null, current);
				ele.find('.contents').append($(json.rows[current].href).css('display', 'block'));
				if(!json.rows[$.data(ele, 'processmenu').current].isJump) {
					ele.find('.jump').css({
						'display' : 'none'
					});
				}
			});
		}
	});
	
})(jQuery);
