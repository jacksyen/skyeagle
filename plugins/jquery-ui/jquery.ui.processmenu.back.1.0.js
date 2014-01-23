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
			
			ele.append($('<div class="titles"></div>')).width(opts.width).height(opts.height);
			
			var contents = $('<div class="contents"></div>');
			
			
			for(var i = 0; i < json.total; i++) {
				if( i == 0) {
					ele.find('.titles').append($('<span class="title title_first_selected">' + json.rows[i].title + '</span>'));
				} else if( i > 0 && i < total-1) {
					ele.find('.titles').append($('<span class="title title_middle_unselected">' + json.rows[i].title + '</span>'));
				} else if( i == total-1) {
					ele.find('.titles').append($('<span class="title title_last_unselected">' + json.rows[i].title + '</span>'));
				}
				
			}
			
			// var demo1 = ele.next().find('form');
			// contents.append(demo1);
			
			
			ele.append(contents);
			// ele.find('.contents').find('iframe').attr('src', json.rows[0].href);
			// self._addContent(contents, json.rows[0]);
			// alert(ele.next().html());
			
			
			
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
				
				
				// var form = ele.find('.contents').find('form');
				// alert(form);
				// form.form('submit');				$('#demo1').form('submit');
				
				
				// alert(ele.find('.contents > form').html());
				// alert('xxx');
				// ele.find('.contents > form').form('submit');
				// $(this).attr('type', 'submit');
				// var contents = ele.find('.contents'),
					// form = contents.find('#demo1');
				// alert(form.html());
				// form[0].submit();
				
				
				// var doc = window.frames["myframe"].document;
				// var arr = doc.scripts;
				// for(var j in arr){
					// var script = arr[j];
					// var context = script.innerHTML;
					// if(!context || context==''){
						// continue;
					// }
// 					
// 					
					// // $(ele.find('#demo1')).form('submit');
				// }
				
				
				//var form = ele.find('.contents').find('#myframe').contents().find('body #demo1');
				//var form = ele.find('.contents').find('#myframe')
				
				// alert(form.html());
				//form.form('submit');
				// $(ele.find('#demo1')).form('submit');
				
			});
		}
	});
	
})(jQuery);
