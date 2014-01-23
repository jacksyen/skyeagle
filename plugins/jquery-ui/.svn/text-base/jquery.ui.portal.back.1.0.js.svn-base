(function($) {
	$.widget('ui.portal', {
		options : {
			data : '',
			// 每个列之间的间隔
			padding : 5
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;

			$.data(ele, 'portal', {
				// 给当前的panel记录left
				panelLeft : null,
				// 给当前的panel记录top
				panelTop : null,
				
				panelWidth : null,
				
				shadow : ''
			});
			// 按照用户给定的参数生成列
			for(var i=0; i < json.column.length; i++) {
				ele.append($('<div></div>').addClass('portalRow').attr('id', 'row'+i));
			}
			// 按照列生成对应的列上面的panel
			ele.find('.portalRow').each(function(index) {
			  	for(var i = 0; i < json.data[index].length; i++) {
			  		var data = json.data[index][i];
			  		$(this).append(ele.parent().find(data.id).css('display', 'block'));
			  		$(this).find(data.id)
			  			.panel($.extend(data, {
			  					width : json.column[index]
			  				})
			  			);
			  	}
			}).css('padding', opts.padding);
			
			// 定义一个div，用来生成panel下面对应的阴影
			$.data(ele, 'portal').shadow = $('<div class="shadow" style="display : none;"></div>');
			// 给每个panel下面添加一个阴影并设置他的大小跟panel一样
			// shadow.insertAfter(ele.find('.panel'));
			// ele.find('.shadow').each(function(index) {
			  	// $(this).width($(this).prev().width())
			  			// .height($(this).prev().height());
			// });
			// 给每个列添加一个隐藏的div
			// var hidDiv = $('<div class="hidDiv"></div>');
			// ele.find('.portalRow').append(hidDiv);
			
			self._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			// 判断是否触发over事件
			var isOverPanel = false;
			var isOverRow = false;
			// 给panel绑定拖动事件
			ele.find('.panel').draggable({
				start : function() {
					isOverPanel = false;
					isOverRow = false;
					$.data(ele, 'portal').panelLeft = $(this).offset().left;
					$.data(ele, 'portal').panelTop = $(this).offset().top;
					$.data(ele, 'portal').shadow.insertAfter($(this)).css({
						'display' : 'block',
						'position' : 'absolute',
						'left' : $.data(ele, 'portal').panelLeft,
						'top' : $.data(ele, 'portal').panelTop,
						'width' : $(this).width(),
						'height' : $(this).height()
					});
					// $(this).next().css({
									// 'display' : 'block',
									// 'position' : 'absolute',
									// 'left' : $.data(ele, 'portal').panelLeft,
									// 'top' : $.data(ele, 'portal').panelTop
								// });
				},
				drag : function() {
					
				},
				stop : function() {
					if(isOverPanel) {
						$(this).css({
							'position' : 'absolute',
							'left' : $.data(ele, 'portal').panelLeft,
							'top' : $.data(ele, 'portal').panelTop
						});
						$(this).find('.panel-body').panel('resize', {
							width : $.data(ele, 'portal').panelWidth
						});
						
						var panel = $(this).detach();
						panel.insertBefore(ele.find('.shadow'));
						ele.find('.shadow').remove();
						$(this).css({
							'position' : 'relative',
							'top' : 0,
							'left' : 0
						});
						$(this).nextAll().css({
							'position' : 'relative',
							'top' : 0,
							'left' : 0
						});
						// $(this).css('position', '');
						// $(this).next().css({
										// 'display' : 'none'
									// });
					} else if(isOverRow) {
						$(this).css({
							'position' : 'absolute',
							'left' : $(this).next().css('left'),
							'top' : $(this).next().css('top')
						});
						$(this).next().css({
										'display' : 'none'
									});
					} else {
						$(this).css({
							'position' : 'absolute',
							'left' : $(this).next().css('left'),
							'top' : $(this).next().css('top')
						});
						$(this).next().css({
										'display' : 'none'
									});
					}
				}
			});
			ele.find('.panel').droppable({
				// draggable控件进入时触发
				over : function (event, ui) {
					isOverPanel = true;
					var moveDom = ui.draggable;
					// $(this) 取到over下面的panel   ui.draggable取到over上面的panel
					$.data(ele, 'portal').panelLeft = $(this).offset().left;
					$.data(ele, 'portal').panelTop = $(this).offset().top;
					
					// 首先显示shadow
					$.data(ele, 'portal').shadow.insertBefore($(this)).css({
						'display' : 'block',
						'float' : 'left',
						'left' : $.data(ele, 'portal').panelLeft,
						'top' : $.data(ele, 'portal').panelTop,
						'width' : $(this).width(),
						'height' : moveDom.height()
					});
					// $.data(ele, 'portal').shadow.css('position','');
					// 其次再把其他的panel移动
					$.data(ele, 'portal').shadow.nextAll().css({
						top : ele.find('.shadow').height()
					});
					
					$.data(ele, 'portal').panelWidth = $(this).width();
				},
				// draggable控件移出时触发
				out : function (event, ui){
					
				},
				// 进入范围改变，默认为50%
				tolerance : 'intersect'
			});
			
			// ele.find('.portalRow').droppable({
				// // draggable控件进入时触发
				// over : function (event, ui) {
					// // alert('over');
					// isOverRow = true;
					// // alert($(this).height());
					// // $(this) 取到over下面的panel   ui.draggable取到over上面的panel
					// $.data(ele, 'portal').panelLeft = $(this).offset().left;
					// $.data(ele, 'portal').panelTop = $(this).offset().top + $(this).height();
					// var shadow = ui.draggable.next().detach();
					// // ui.draggable.insertBefore($(this));
					// $(this).append(ui.draggable);
					// shadow.css({
						// 'position' : 'absolute',
						// 'left' : $.data(ele, 'portal').panelLeft,
						// 'top' : $.data(ele, 'portal').panelTop,
						// 'width' : $(this).width()
					// }).insertAfter(ui.draggable);
					// // $(this).append(shadow);
					// // $.data(ele, 'portal').panelWidth = $(this).width();
				// },
				// // draggable控件移出时触发
				// out : function (event, ui){
// 					
				// },
				// // 进入范围改变，默认为50%
				// tolerance : 'intersect'
			// });
			
		}
	});
})(jQuery);
