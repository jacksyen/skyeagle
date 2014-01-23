(function($) {
	$.widget('ui.spotlight', {
		options : {
			/**
			 * 数据格式
			 * var json = {
					total : 8,
					rows  : [
						{ 
							title : 'P1',
							href : '#panel1',
							content : ''
						},
						{ 
							title : 'P2',
							href : '#panel2',
							content : ''
						}
					]				
				}
			 */
			data : ''
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// data数据
			$.data(ele, 'spotlight', {
				currentPanel : '',
				spotShadow : $('<div class="top spotShadow"></div><div class="right spotShadow"></div><div class="buttom spotShadow"></div><div class="left spotShadow"></div>')
			});
			// 给ele添加class，为了使用样式
			ele.addClass('spotlight');
			// 生成panel并添加到spotlight中
			for(var i = 0; i < json.total; i++) {
				var href = json.rows[i].href,
					title = json.rows[i].title;
				var panel = ele.find(href).panel({
								title : title,
								collapsible : false,
								width : 300,
								height : 150
							});
			}
			// 设置panel的样式  !!!此处不能用display : inline-block!!!
			ele.find('.panel').css({
				float : 'left',
				margin : 10
			});
			// 给panel添加按钮
			for(var i = 0; i < json.total; i++) {
				// !!!为了解决ie下面float的bug
				ele.find(json.rows[i].href).wrapInner('<div class="panel-text"></div>');
				if(i == json.total-1) {
					ele.find(json.rows[i].href).append($('<button>end</button>').addClass('endBut panelButton'));
				} else {
					ele.find(json.rows[i].href).append($('<button>nextPanel</button>').addClass('nextBut panelButton'));
				}
				// 给panel-text添加样式    !!!为了解决ie下面float的bug
				ele.find('.panel-text').css({
					float : 'left'
				})
				// 给panelButton添加样式
				ele.find('.panelButton').css({
					float : 'right',
					marginTop : ele.find(json.rows[i].href).height() - 25,
					marginRight : 5
				});
			}
			
			self._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			ele.parent().find('.startBut').bind('click.spotlight', function(event) {
				// 设定初始的panel
				$.data(ele, 'spotlight').currentPanel = ele.find('div:first-child');
				// 添加阴影
				$.data(ele, 'spotlight').spotShadow.insertAfter(ele);
				// 启用聚光灯
				self._spotPanel();
			});
			
			// 初始过后可以点击下一步
			ele.find('.nextBut').bind('click.spotlight', function(event) {
				if($.data(ele, 'spotlight').currentPanel != '') {
					// 改变当前panel
					$.data(ele, 'spotlight').currentPanel = $.data(ele, 'spotlight').currentPanel.next();
					// 启用聚光灯
					self._spotPanel();
				}
			});
			// 清除阴影
			ele.find('.endBut').bind('click.spotlight', function(event) {
				$.data(ele, 'spotlight').currentPanel = '';
				$.data(ele, 'spotlight').spotShadow.remove();
			});
		},
		_spotPanel : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// 定义左右浮动大小以及高度宽度
			var currentLeft = $.data(ele, 'spotlight').currentPanel.offset().left,
				currentTop  = $.data(ele, 'spotlight').currentPanel.offset().top,
				currentWidth = $.data(ele, 'spotlight').currentPanel.width(),
				currentHeight = $.data(ele, 'spotlight').currentPanel.height();
			// 给四个阴影改变大小和显示位置
			ele.parent().find('.top').css({
				left: currentLeft,
				top: 0,
				height: currentTop,
				width: document.documentElement.clientWidth - currentLeft
			});
			ele.parent().find('.right').css({
				left: currentLeft + currentWidth,
				top: currentTop,
				height: document.documentElement.clientHeight - currentTop,
				width: document.documentElement.clientWidth - currentLeft - currentWidth
			});
			ele.parent().find('.buttom').css({
				left: 0,
				top: currentTop + currentHeight,
				height: document.documentElement.clientHeight - currentTop - currentHeight,
				width: currentLeft + currentWidth
			});
			ele.parent().find('.left').css({
				left: 0,
				top: 0,
				height: currentHeight + currentTop,
				width: currentLeft
			});
		}
	});
})(jQuery);
