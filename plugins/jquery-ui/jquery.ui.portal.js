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
				// 阴影变量
				shadow : $('<div class="shadow" style="display : none;"></div>'),
				// 附加panel层集合
				extArray : [],
				// 存储移动的前一位置
				oldTop : null
			});
			// 初始化界面元素
			self._wrapPortal(ele, opts, json);
			
			self._bindEvents(ele);
		},
		
		_init : function() {
		},
		/**
		 * 生成protal DOM元素 
		 */
		_wrapPortal : function (ele, opts, json){
			// 按照用户给定的参数生成列
			for(var i=0; i < json.column.length; i++) {
				var columnEle = $('<div></div>');
				var width = json.column[i];
				for(var j = 0; j < json.data[i].length; j++) {
					// 每列中一行的数据
			  		var rowData = json.data[i][j];
			  		var panel = $(rowData.id).css('display', 'block');
			  		panel.panel($.extend(rowData, {
	  					width : width
	  				}));
	  				columnEle.append(panel.panel('panel').attr('panel-item', 'row'+i + '-' + j));
			  	}
			  	
			  	var extPanel = $('<div></div>');
			  	extPanel.panel({
			  		height: 100,
			  		width : width
			  	});
			  	extPanel = extPanel.panel('panel').css({
			  		visibility : 'hidden'
			  	}).attr('panel-item', 'ext-panel');
			  	
			  	$.data(ele, 'portal').extArray.push(extPanel);
			  	
			  	columnEle.addClass('portalRow').css({
			  		width : width,
			  		padding : opts.padding
			  	}).attr('id', 'row'+i).append(extPanel);
			  	
			  	
				ele.append(columnEle);
			}
		},
		/**
		 * 设置portal的拖动事件
		 */
		_bindEvents : function (ele){
			var beginEle, endEle,
				self = this,
				moveStatus = false, // true->向上，false->向下
				portal = $.data(ele, 'portal');
				
			// 添加draggable控件
			ele.find('.panel').draggable({
				helper : 'clone',
				zIndex : 9999,
				// 开始拖动事件
				start : function (){
					$(this).css({
						display : 'none'
					});
					beginEle = portal.shadow.css({
						display	: 'block',
						width   : $(this).width(),
						height  : $(this).height()
					}).insertBefore($(this));
					// 设置附加panel层样式					
					self._setExtStyle(true);
				},
				// 拖动事件
				drag : function(event, ui) {
					portal.oldTop = portal.oldTop || ui.offset.top;
					var offset = 0;
					if(ui.offset.top - portal.oldTop > offset) {
						// down
						moveStatus = false;
					} else if(ui.offset.top - portal.oldTop < offset) {
						// up
						moveStatus = true;
					}
				},
				// 拖动结束事件
				stop : function (){
					// 如果没有拖动到panel中，则还原位置
					if(!endEle){
						$(this).css({
							display :  'block'
						});
						beginEle.css({
							display : 'none'
						});
						return;
					}
					var width = endEle.width(),
						height= endEle.height();
					$(this).css({
						display	: 'block'
					}).replaceAll(endEle);
					
					// 重置panel 大小
					$(this).find('.panel-body').panel('resize',{
						width : width,
						height: height
					});
					
					// 设置附加panel层样式
					self._setExtStyle(false);
				}
			}).droppable({
				// 进入范围改变，默认为50%
				tolerance : 'intersect',
				// 拖动进入事件
				over : function (event, ui){
					var self   = $(this), 
						helper = ui.helper;
						
					$('').replaceAll(beginEle);
					endEle = portal.shadow.css({
						display	: 'block',
						width   : self.width(),
						height  : helper.height()
					});
						
					// 移动最下层div.也在它上层添加。和向上移动情况相同
					if(self.attr('panel-item') === 'ext-panel' || moveStatus){
						endEle.insertBefore($(this));
						return;
					}	
					// 向下移动
					endEle.insertAfter($(this));
				}
			});
		},
		/**
		 * 设置附加panel的样式 
 		 * @param {Object} isBlock 为true时，将样式设置成visibility:hidden（占位置），反之，设置display:none
		 */
		_setExtStyle : function (isBlock){
			this.element.find('div[panel-item="ext-panel"]').each(function (){
				if(isBlock){
					$(this).css({
						visibility  : 'hidden',
						display		: 'block'
					});
					return;
				}
				$(this).css({
					display : 'none'
				});
			});
		}
	});
})(jQuery);
