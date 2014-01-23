(function($) {
	$.widget('ui.desktop', {
		options : {
			/**
			 * 数据格式
			 * var json = {
					total : 8,
					rows  : [
						{ 
							title : 'Test',
							icon : '',
							href : '#click1'
						},
						{ 
							title : 'Window',
							icon : '',
							href : '#click2'
						}
					]				
				}
			 */
			data : ''
		},
		/**
		 * 在外部调用，给桌面添加一个图标
		 * @param param :
		 * 	{
		 * 		title : '',
				icon : '',
				href : ''
		 * }
		 */
		addModule : function(param) {
			var self = this,
				ele  = self.element,
				opts = self.options;
				
			// 添加到页面
			//var itemId = opts.data.total + 1;
			var module = self._buildItem(opts.data.total, param);
			
			var moduleNum = $.data(ele, 'desktop').moduleNum;
			
			var columnNum = Math.ceil(opts.data.total / moduleNum);
			// alert(columnNum);
			if(opts.data.total % moduleNum == 0){
				columnNum++;
			}			ele.find('#list' + columnNum).append(module);
			
			// 修改options中的data数据
			this.options.data.total++;
			this.options.data.rows.push(param);
			// 重新生成界面图标
			ele.find('.desktop-modules').children().remove();
			self._buildModule();
			self._showPanelAndBar();
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
				
			$.data(ele, 'desktop', {
				zIndex : 0,
				panelTop : 0,
				panelLeft : 0,
				MaxzIndex : 0,
				// 列数
				moduleNum : 0
			});
			
			// 重新布局
			self._browserResize();
			ele.addClass('desktop');
			/**
			 *	定义第二层框架 
			 */
			var desk = $('<div class="desktop-desk"></div>');
			var top  = $('<div class="desktop-top"></div>');
			ele.append(desk);
			ele.append(top);
			/**
			 * 	定义底层的横条上面的框架
			 */
			var topBars = $('<div class="desktop-bars"></div>');
			ele.find('.desktop-top').append(topBars);
			
			/**
			 *	定义desk上面的图标 
			 */
			// 定义所有图标的集合
			var modules = $('<div class="desktop-modules"></div>');
			ele.find('.desktop-desk').append(modules);
			// 生成图标
			self._buildModule();
			// 点击图标触发事件
			self._showPanelAndBar();
			
			// 绑定事件
			self._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			/**
			 *	浏览器窗口发生变化时触发resize事件 
			 */
			$(window).resize(function() {
				// 先清除以前生成的元素
				ele.find('.desktop-modules').children().remove();
				// 再重新调整界面的大小
				self._browserResize();
				// 最后再生成新的布局
				self._buildModule();
				// 点击图标触发事件
				self._showPanelAndBar();
			});

		},
		_browserResize : function() {
			var self = this,
				ele  = self.element,
				opts = self.options;
			var currentWidth = document.documentElement.clientWidth,
				currentHeight = document.documentElement.clientHeight;
			ele.width(currentWidth).height(currentHeight);
			ele.find('.desktop-desk').css({
				'height': currentHeight - ele.find('.desktop-top').height()
			});
		},
		/**
		 * 生成图标
 		 * @param {Object} a 图标
 		 * @param {Object} b 每一列存在的图标数
		 */
		_buildList : function(a,b) {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			for(var i = a; i < a+b; i++) {
				if(json.rows[i]){
					ele.find('#list'+(a+b)/b).append(self._buildItem(i, json.rows[i]));
				}
			}
		},
		/**
		 * 生成一项
		 * @param i
		 * @param itemParam 
		 */
		_buildItem : function (i, itemParam){
			var	text = ('<div class="desktop-module-text">' + itemParam.title + '</div>');
			if(itemParam.icon == '') {
				var icon = ('<div class="desktop-module-icon"></div>');
			} else {
				var icon = ('<div class="desktop-module-icon"></div>').css('background', itemParam.icon);
			}
			var module = $('<div class="desktop-modules-list-module">' + icon + text + 
				'</div>').attr('id', 'module'+(i+1));
			return module;
		},
		/**
		 *	生成列 
		 */
		_buildModule : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// 获得当前的摆放图标的桌面的高度
			var deskHeight = document.documentElement.clientHeight - ele.find('.desktop-top').height();
			// 获得每一列能摆放图标的最大个数，95是80+15 80是module的高度，15是margin-bottom的高度在程序中固定
			var moduleNum = parseInt(deskHeight/95);
			$.data(ele, 'desktop').moduleNum = moduleNum;
			// 获得将要生成的列数
			var listNum = Math.ceil(json.total/moduleNum);	
			// 生成列
			for(var i = 1; i <= listNum; i++) {
				ele.find('.desktop-modules').append($('<div class="desktop-modules-list"></div>').attr('id', 'list'+i));
			}
			//　生成图标
			for(var i = 0; i < listNum*moduleNum; i+=moduleNum) {
				self._buildList(i,moduleNum);
			}
		},
		/**
		 *	生成panel和对应的bar 
		 */
		_showPanelAndBar : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			ele.find('.desktop-modules-list-module').bind('click.desktop', function() {
				// alert(this.id);				// 获取当前点击元素的id
				$.data(ele, 'desktop').zIndex++;
				$.data(ele, 'desktop').panelLeft+= 10;
				$.data(ele, 'desktop').panelTop+= 20;
				var moduleId = this.id;
				//　正则匹配数字
				var reg = /\d+/;
				// 获取正则匹配后的数字id
				var clickId = reg.exec(moduleId);
				// alert(clickId);
				
				// 清除已经存在的active然后定义top下面的显示内容
				ele.find('.desktop-bar').removeClass('desktop-bar-active');
				var topText = $('<a class="desktop-bar"><span class="desktop-bar-text">' + json.rows[clickId-1].title + '</span></a>')
																.addClass('desktop-bar-active').addClass('bar-'+clickId);
				// 如果点击topText则最小化panel，再点击则重新显示
				topText.click(function() {
					if(ele.parent().find(json.rows[clickId-1].href).parent().css('display') == 'none') {
						ele.parent().find(json.rows[clickId-1].href).panel('open');
						ele.parent().find(json.rows[clickId-1].href).parent().css({
							'z-index' : $.data(ele, 'desktop').zIndex++
						});
						ele.find('.desktop-bar').removeClass('desktop-bar-active');
						ele.find('.bar-'+clickId).addClass('desktop-bar-active');
					} else if(ele.parent().find(json.rows[clickId-1].href).parent().css('display') == 'block') {
						ele.parent().find(json.rows[clickId-1].href).panel('minimize');
						// ele.find('.desktop-bar').removeClass('desktop-bar-active');					}
				});
				// 因为rows是从0开始到7，所以这里需要减一
				// 如果关闭已经存在的panel之后再点击打开，则打开以前的panel，否则生成新的panel
				if(ele.parent().find(json.rows[clickId-1].href).parent().hasClass('panel')) {
					ele.parent().find(json.rows[clickId-1].href).panel('open');
					ele.parent().find(json.rows[clickId-1].href).parent().css({
						'z-index' : $.data(ele, 'desktop').zIndex++
					});
				} else {
					ele.parent().find(json.rows[clickId-1].href).panel({
						'title' : json.rows[clickId-1].title,
						'closable' : true,
						'width' : 450,
						'height' : 300,
						'draggabled' : true,
						'minimizable' : true,
						'maximizable' : true,
						onClose : function() {
							// 点击关闭panel按钮
							self._panelClose(topText, clickId);
							self._showToptext();
						},
						onMinimize : function() {
							// 最小化之后，让他之前生成的z-index最高的panel对应的topText显示高亮
							self._showToptext();
						},
						onRestore : function() {
							// 点击还原以后，让panel在初始位置显示
							ele.parent().find(json.rows[clickId-1].href).parent().css({
								'left' : document.documentElement.clientWidth/2 - 225 + $.data(ele, 'desktop').panelLeft,
								'top' : document.documentElement.clientHeight/2 - 150 + $.data(ele, 'desktop').panelTop
							});
						}
					}).css('display', 'block').parent().css({
						'background' : 'white',
						'position' : 'absolute',
						'left' : document.documentElement.clientWidth/2 - 225 + $.data(ele, 'desktop').panelLeft,
						'top' : document.documentElement.clientHeight/2 - 150 + $.data(ele, 'desktop').panelTop,
						'z-index' : $.data(ele, 'desktop').zIndex
					});
					var panelHeight = ele.parent().find(json.rows[clickId-1].href).parent().height();
					if((document.documentElement.clientHeight/2 - 150 + $.data(ele, 'desktop').panelTop + panelHeight)>document.documentElement.clientHeight-70) {
						$.data(ele, 'desktop').panelLeft = 0;
						$.data(ele, 'desktop').panelTop = 0;
					}
				}
				
				// 如果重复点击已经存在的panel图标，则显示panel；如果不存在，则添加
				if(ele.find('.desktop-bar').hasClass('bar-'+clickId)) {
					ele.find('.bar-'+clickId).addClass('desktop-bar-active');
					ele.parent().find(json.rows[clickId-1].href).parent().css({
						'z-index' : $.data(ele, 'desktop').zIndex++
					});
				} else {
					ele.find('.desktop-bars').append(topText);
				}
				// 点击已经存在的panel面板，将点击的面板置顶
				ele.parent().find(json.rows[clickId-1].href).panel('panel').bind('click.desktop', function() {
					ele.find('.desktop-bar').removeClass('desktop-bar-active');
					ele.find('.bar-'+clickId).addClass('desktop-bar-active');
					ele.parent().find(json.rows[clickId-1].href).parent().css({
						'z-index' : $.data(ele, 'desktop').zIndex+=json.total
					})
				});
			});
		},
		/**
		 *	点击panel面板上的关闭按钮触发事件 
		 */
		_panelClose : function(target, id) {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			target.removeClass('desktop-bar-active');
			ele.find('.desktop-bars').find('.bar-'+id).remove();
			// ele.find('.desktop-bars a:last-child').addClass('desktop-bar-active');		},
		/**
		 *	高亮显示z-index最高的topText 
		 */
		_showToptext : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			Array.prototype.max = function() {
		   		var max = this[0];
		    	var len = this.length;
		    	for(var j = 1; j < len; j++) {
		    		if (this[j] > max) {
		    			max = this[j];
		    		} else {
		    			max = max;
		    		}
		    	}
		    	return max;
		    };
			var arr = new Array();
			var i = 0;
			ele.parent().find('.panel').each(function (index){
				if($(this).css('display') === 'block'){
					arr[i++] = parseInt($(this).css('z-index'));
				}
			});
            ele.parent().find('.panel').each(function (index){
				if($(this).css('display') === 'block' && parseInt($(this).css('z-index')) === arr.max()){
					var thisId = /\d+/.exec($(this).find('.panel-body').attr('id'));
					ele.find('.desktop-bar').removeClass('desktop-bar-active');
					ele.find('.bar-'+thisId).addClass('desktop-bar-active');
				}
			});
		}
	});
})(jQuery);
