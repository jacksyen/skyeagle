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
				// 阴影变量
				shadow : '',
				// 当前移动panel的left和top值
				currentLeft : null,
				currentTop : null,
				oldTop : null
			});
			// 按照用户给定的参数生成列
			for(var i=0; i < json.column.length; i++) {
				ele.append($('<div></div>').addClass('portalRow').attr('id', 'row'+i));
			}
			// 按照列生成对应的列上面的panel
			ele.find('.portalRow').each(function(index) {
			  	for(var i = 0; i < json.data[index].length; i++) {
			  		var data = json.data[index][i];
			  		$(this).width(json.column[index]);
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
			var draggable = false;
			var dragRight = false;
			var dragLeft = false;
			var moveUp = false;
			var moveDown = false;
			// 给panel绑定拖动事件
			ele.find('.panel').draggable({
				start : function() {
					isOverPanel = false;
					isOverRow = false;
					draggable = false;
					dragRight = false;
					dragLeft = false;
					moveDown = false;
					moveUp = false;
					ele.find('.shadow').remove();
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
				},
				drag : function(event, ui) {
					$.data(ele, 'portal').oldTop = $.data(ele, 'portal').oldTop || ui.offset.top;
					var offset = 0;
					if(ui.offset.top - $.data(ele, 'portal').oldTop > offset) {
						// down
						moveDown = true;
						moveUp = false;
					} else if($.data(ele, 'portal').oldTop - ui.offset.top > offset) {
						// up
						moveUp = true;
						moveDown = false;
					}
					$.data(ele, 'portal').oldTop = ui.offset.top;
					
					// 拿到当前拖动的元素的left和top
					$.data(ele, 'portal').currentLeft = ui.offset.left;
					$.data(ele, 'portal').currentTop = ui.offset.top;
					
					// 左移
					if($.data(ele, 'portal').currentLeft < $(this).parent().offset().left && $.data(ele, 'portal').currentLeft > 0 && $.data(ele, 'portal').currentTop > $(this).parent().prev().height()) {
						draggable = true;
						dragLeft = true;
						// alert($(this).parent().prev().innerHeight());
						ele.find('.shadow').remove();
						$(this).parent().prev().append($.data(ele, 'portal').shadow);
						$.data(ele, 'portal').shadow.css({
							'display' : 'block',
							'position' : 'absolute',
							'left' : $(this).parent().prev().offset().left + opts.padding,
							'top' : $(this).parent().prev().outerHeight() - opts.padding,
							'width' : $(this).parent().prev().width(),
							'height' : $(this).height()
						});
					}
					// 右移 
					else if($.data(ele, 'portal').currentLeft > $(this).parent().offset().left + $(this).width() && $.data(ele, 'portal').currentTop > $(this).parent().next().height()) {
						draggable = true;
						dragRight = true;
						// alert($(this).parent().prev().innerHeight());
						ele.find('.shadow').remove();
						$(this).parent().next().append($.data(ele, 'portal').shadow);
						$.data(ele, 'portal').shadow.css({
							'display' : 'block',
							'position' : 'absolute',
							'left' : $(this).parent().next().offset().left + opts.padding,
							'top' : $(this).parent().next().outerHeight() - opts.padding,
							'width' : $(this).parent().next().width(),
							'height' : $(this).height()
						});
					}
				},
				stop : function() {
					if(isOverPanel) {
						if(moveUp) {
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
							moveUp = false;
						} else if(moveDown) {
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
							moveDown = false;
						}
					} else if(draggable) {
						if(dragLeft) {
							self._changeInLast($(this), $(this).parent().prev());
							draggable = false;
							dragLeft = false;
						} else if(dragRight) {
							self._changeInLast($(this), $(this).parent().next());
							draggable = false;
							dragRight = false;
						}
					} else {
						$(this).css({
							'left' : 0,
							'top' : 0
						});
					}
					ele.find('.shadow').remove();
					ele.find('.panel').css({
						'position' : 'relative',
						'top' : 0,
						'left' : 0
					});
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
					
					// 超过50%并且继续向上移动，则把下面的panel向下移
					if(moveUp) {
						ele.find('.shadow').remove();
						// 首先显示shadow
						$.data(ele, 'portal').shadow.insertBefore($(this)).css({
							'display' : 'block',
							'float' : 'left',
							'left' : $.data(ele, 'portal').panelLeft,
							'top' : $.data(ele, 'portal').panelTop,
							'width' : $(this).width(),
							'height' : moveDom.height()
						});
						if($(this).next() != '' && $(this).next().html() != ui.draggable.html()) {
							// 其次再把其他的panel移动
							$.data(ele, 'portal').shadow.nextAll().css({
								top : ele.find('.shadow').height()
							});
						} else {
							// 其次再把其他的panel移动
							$.data(ele, 'portal').shadow.next().css({
								top : ele.find('.shadow').height()
							});
						}
					}
					// 超过50%并且继续向下移动,则把下面的panel向上移
					else if(moveDown) {
						ele.find('.shadow').remove();
						// 首先显示shadow
						$.data(ele, 'portal').shadow.insertAfter($(this)).css({
							'display' : 'block',
							'float' : 'left',
							'left' : $.data(ele, 'portal').panelLeft,
							'top' : $.data(ele, 'portal').panelTop + ($(this).height() - ui.draggable.height()),
							'width' : $(this).width(),
							'height' : moveDom.height()
						});
						if($(this).prev() != '' && $(this).prev().html() != ui.draggable.html()) {
							// 其次再把其他的panel移动
							$.data(ele, 'portal').shadow.prevAll().css({
								top : -(ui.draggable.height())
							});
						} else {
							// 其次再把其他的panel移动
							$.data(ele, 'portal').shadow.prev().css({
								top : -(ui.draggable.height())
							});
						}
					}
					
					$.data(ele, 'portal').panelWidth = $(this).width();
				},
				out : function() {
					isOverPanel = false;
				},
				// 进入范围改变，默认为50%
				tolerance : 'intersect'
			});
		},
		_changeInLast : function(target, row) {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			target.css({
				'position' : 'absolute',
				'left' : row.offset().left + opts.padding,
				'top' : row.outerHeight() - opts.padding
			});
			target.find('.panel-body').panel('resize', {
				width : row.width()
			});
			var panel = target.detach();
			panel.insertBefore(ele.find('.shadow'));
			ele.find('.shadow').remove();
			target.css({
				'position' : 'relative',
				'left' : '',
				'top' : ''
			});
		}
	});
})(jQuery);
