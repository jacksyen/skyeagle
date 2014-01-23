(function($) {
	
	$.widget('ui.processmenu', {
		options : {
			data : '',
			width : 710,
			height : 500
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var total = json.total;
			/**
			 *	动态生成title 
			 */
			ele.append($('<div class="titles"></div>')).width(opts.width).height(opts.height);
			
			for(var i = 0; i < json.total; i++) {
				if( i == 0) {
					ele.find('.titles').append($('<span class="title title_first_selected">' + json.rows[i].title + '</span>'));
				} else if( i > 0 && i < total-1) {
					ele.find('.titles').append($('<span class="title title_middle_unselected">' + json.rows[i].title + '</span>'));
				} else if( i == total-1) {
					ele.find('.titles').append($('<span class="title title_last_unselected">' + json.rows[i].title + '</span>'));
				}
				
			}
			/**
			 *	将外部的div生成内部的contents 
			 */
			var contents = $('<div class="contents"></div>');
			
			// for(var i = 0; i < json.total; i++) {
				// var demo = ele.next('div');
				// contents.append(demo);
			// }
			contents.append($(json.rows[0].href));
			for(var i = 1; i < json.total; i++) {
				$(json.rows[i].href).css('display', 'none');
			}
			
			ele.append(contents);
			// ele.find('.contents').find('iframe').attr('src', json.rows[0].href);
			// self._addContent(contents, json.rows[0]);
			// ele.find('.contents').append('<div class="content">' + json.rows[0].content + '</div>');
			
			ele.append($('<div class="buttons"></div>'));
			ele.find('.buttons').append($('<div class="button"><button class="continue">继续</button><button class="end">完成</button><button class="cancel">跳过</button></div>'));
			
			ele.find('.buttons').css({
				'top' : opts.height - ele.find('.titles').height() - ele.find('.contents').height() - 50,
				'left' : (opts.width - ele.find('.button').width())/2
			});
			
			$.data(ele, 'processmenu', {
				current : 0,
				first : ele.find('.titles span:first-child')
			});
			this._bindEvents();
		},
		_init : function() {
			
		},
		/**
		 *  
		 */
		_addContent : function (ele, data){
			if(data.content != null && data.content != ''){
				ele.html(data.content);
				//ele.append('<div class="content">' + data.content + '</div>');
			}
			if(data.href != null && data.href !='' ){
				$.ajax({
					url : data.href +'?t=' + (new Date()).getTime(),
					context : ele,
					success : function (data){
						$(this).html(data);
					},
					error : function (){
						
					}
				});
			}
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var total = json.total;
			// alert(json.rows[0].title);
			ele.find('.continue').bind('click.processmenu', function(event) {
				
				var validate = $(json.rows[$.data(ele, 'processmenu').current].href).find('form').form('validate');
				if(validate){
					$.data(ele, 'processmenu').current++;
					// alert($.data(ele, 'processmenu').current);
						if($.data(ele, 'processmenu').current == 1) {
							$.data(ele, 'processmenu').first.removeClass('title_first_selected').addClass('title_first_unselected')
								.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
						} else if($.data(ele, 'processmenu').current > 1 && $.data(ele, 'processmenu').current < total-1){
							$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
								.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
						} else if($.data(ele, 'processmenu').current == total-1){
							$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
								.next('span').removeClass('title_last_unselected').addClass('title_last_selected');
							$(this).css({
								'display' : 'none'
							});
							ele.find('.end').css({
								'display' : 'block',
								'float' : 'left'
							});
							ele.find('.cancel').css({
								'display' : 'none'
							});
						}
					$.data(ele, 'processmenu').first = $.data(ele, 'processmenu').first.next('span');
					
					ele.find('.contents').empty();
					ele.find('.contents').append($(json.rows[$.data(ele, 'processmenu').current].href).css('display', 'block'));
					// var vali = $(json.rows[0].href).find('form').form('validate');					// alert(vali);				}			});
		}
	});
	
})(jQuery);
