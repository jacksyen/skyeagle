/**
 *  
 */
(function($) {
	$.widget("ui.layout", {
		options : {
            panels : [],
			fit : false,
            /**
             * 设置区域的panel之间的间隔。只能设置为数字，单位是px。
             * @default 5
             * @type Number
             * @example
             * $('#page').omBorderLayout({spacing : 3});
             */
			spacing : 5
		},
		_create : function() {
			if(!this.options.panels) return;
			// 设置body样式
			$('body').css({
				margin : 0,
				padding: 0
			});
			// 设置region拖拉改变宽度的最小值
			this._minWidth = 50;
			// 设置region拖拉改变高度的最小值
			this._minHeight = 28;
			this._buildRegion();
			this._resizeRegion();
			$(window).resize($.proxy(this, "_resizeRegion"));
		},
		// 获取区域的大小，如果区域被隐藏了则获取代理区域(regionProxy)的大小，如果代理区域也被隐藏则返回0
		_getRegionSize : function(region){
			var $region = this._getRegion(region),
				$proxy = this._getRegionProxy(region),
				size = {};
			size.width = this._regionVisible($region)?$region.outerWidth(true):
				(this._regionVisible($proxy)?$proxy.outerWidth(true):0);
			size.height = this._regionVisible($region)?$region.outerHeight(true):
				(this._regionVisible($proxy)?$proxy.outerHeight(true):0);
			return size;
		},
		/**
		 * 重置面板大小 
		 */
		_resizeRegion : function() {
			var $centerRegion = this._getRegion("center"),
				$northRegion = this._getRegion("north"),
				$southRegion = this._getRegion("south"),
				$westRegion = this._getRegion("west"),
				$eastRegion = this._getRegion("east"),

				$northProxy = this._getRegionProxy("north"),
				$southProxy = this._getRegionProxy("south"),
				$westProxy = this._getRegionProxy("west"),
				$eastProxy = this._getRegionProxy("east"),
				
				
				layoutWidth = this.element.width(),
				layoutHeight = this.element.height();
				
			
			
			$northProxy && $northProxy.outerWidth(layoutWidth);
			$northRegion && $northRegion.find(">.panel-body").panel("resize",{width:layoutWidth});

			$southProxy && $southProxy.outerWidth(layoutWidth);
			$southRegion && $southRegion.find(">.panel-body").panel("resize",{width:layoutWidth});
				
			// TODO
			var northHeight = this._getRegionSize("north").height,
				southHeight = this._getRegionSize("south").height,
				westWidth = this._getRegionSize("west").width,
				eastWidth = this._getRegionSize("east").width;
					
			$centerRegion.css({top:northHeight,left:westWidth});
			$centerRegion.find(">.panel-body").panel("resize",{
				width:layoutWidth - westWidth - eastWidth,
				height:layoutHeight - northHeight - southHeight
			});
			var centerHeight = $centerRegion.outerHeight(true);
			if($southRegion){
				$southRegion.css({top:layoutHeight-$southRegion.outerHeight(true)});
			}
			if($westRegion){
				$westRegion.css({top:northHeight});
				$westRegion.find(">.panel-body").panel("resize",{height:centerHeight});
				if($westProxy){
					$westProxy.css({top:northHeight});
					$westProxy.outerHeight(centerHeight);
				}
			}
			if($eastRegion){
				$eastRegion.css({top:northHeight});
				$eastRegion.find(">.panel-body").panel("resize",{height:centerHeight});
				if($eastProxy){
					$eastProxy.css({top:northHeight});
					$eastProxy.outerHeight(centerHeight);
				}
			}
			
		},
		_regionVisible : function($region){
			return $region && $region.css("display") != "none";
		},
		_createRegionProxy : function(panel){
			var _self = this;
			var proxyHtml = "<div class=\"sy-borderlayout-proxy sy-borderlayout-proxy-"+panel.region+"\" proxy=\""+panel.region+"\">" +
							"<div class=\"panel-title\"></div>"+
							"<div class=\"panel-tool\">"+
							"<div class=\"ui-icon panel-tool-expand\">"+
							"</div>"+
							"</div>"+
							"</div>";
			var $proxy = $(proxyHtml);
			$proxy.hover(function(){
						$(this).toggleClass("sy-borderlayout-proxy-hover");
					}).appendTo(this.element);
			(function(panel){
				$proxy.find(".panel-tool-expand").hover(function(){
					$(this).toggleClass("panel-tool-expand-hover");
				}).click(function(){
					_self.expandRegion(panel.region);
				});
			})(panel);
		},
		// 构建布局框架
		_buildRegion : function() {
			var _self = this,
				$layout = this.element,
				options = this.options;
			this.element.addClass("sy-borderlayout");
			if (options.fit) {
				$layout.css({
					"width" : "100%",
					"height" : "100%"
				});
			}
			for ( var i = 0; i < options.panels.length; i++) {
				var panel = $.extend({},options.panels[i]);
				var $panelEl = $layout.find("#" + panel.id);
				// 添加代理工具条
				if(panel.collapsible && panel.region != "center"){
					this._createRegionProxy(panel);
				}
				
				// 扩展panel初始化参数，添加一些必要的事件
				if(panel.collapsible){
					$.extend(panel,{
						collapsible:false,
						tools:[{
							iconCls:"panel-tool-collapse",//,"panel-tool-collapse-hover"],
							handler:function(widget){
								_self.collapseRegion(widget.element.parent().attr("region"));
							}
						}]
					});
				}
				if(panel.closable){
					var oldPanelOnClose = panel.onClose;
					$.extend(panel,{
						onClose:function(){
							oldPanelOnClose && oldPanelOnClose.call($panelEl[0]);
							_self._resizeRegion();
						}
					});
				}
				
				
				// 构建panel组件
				$panelEl.panel(panel);
				
				// 初始化north和south的宽度
				if(panel.region == "north" || panel.region == "south"){
					$panelEl.panel("resize",{"width":$layout.width()});
				}
				
				var margin = "0",
					spacing = this.options.spacing + "px";
				// 给panel添加resize功能
				if(panel.resizable && panel.region != "center"){
					var handles = "";
						handleClass = {};
					if(panel.region == "west"){
						handles = "e";
						handleClass.width = spacing;
						handleClass.right = "-" + spacing;
					} else if(panel.region == "east"){
						handles = "w";
						handleClass.width = spacing;
						handleClass.left = "-" + spacing;
					} else if(panel.region == "south"){
						handles = "n";
						handleClass.height = spacing;
						handleClass.top = "-" + spacing;
					} else if(panel.region == "north"){
						handles = "s";
						handleClass.height = spacing;
						handleClass.bottom = "-" + spacing;
					}
					
					
					$panelEl.parent().resizable({
						handles : handles,
						helper : "sy-borderlayout-resizable-helper-" + handles,
						stop : function(event,ui){
							$layout.find(">.sy-borderlayout-mask").remove();
							ui.element.find(">.panel-body").panel("resize",ui.size);
							_self._resizeRegion();
						},
						start : function(event,ui){
							var helper = ui.element.resizable("option","helper");
							// 修改resizable的helper的宽/高为spacing大小
							$("body").find("." + helper).css("border-width",_self.options.spacing);
							// 限制拖拉改变大小的范围
							var region = ui.element.attr("region"),
								maxWidth = $layout.width() - 2*_self._minWidth,
								maxHeight = $layout.height() - 2*_self._minHeight;
							if(region == "west"){
								maxWidth = $layout.width() - (_self._getRegionSize("east").width + _self._minWidth);
								ui.element.resizable( "option", "maxWidth", maxWidth );
							} else if(region == "east"){
								maxWidth = $layout.width() - (_self._getRegionSize("west").width + _self._minWidth);
								ui.element.resizable( "option", "maxWidth", maxWidth );
							} else if(region == "north"){
								maxHeight = $layout.height() - (_self._getRegionSize("south").height + _self._minHeight + _self.options.spacing);
								ui.element.resizable( "option", "maxHeight", maxHeight );
							} else if(region == "south"){
								maxHeight = $layout.height() - (_self._getRegionSize("north").height + _self._minHeight + _self.options.spacing);
								ui.element.resizable( "option", "maxHeight", maxHeight );
							}
							$('<div class="sy-borderlayout-mask"></div>').css({
								width:$layout.width(),
								height:$layout.height()
							}).appendTo($layout);
						},
						minWidth : _self._minWidth,
						minHeight : _self._minHeight
						
					});
					$panelEl.parent().find(".ui-resizable-handle").css(handleClass);
					margin = (panel.region == "south" ? spacing : 0) + " " +
							 (panel.region == "west" ? spacing : 0) + " " +
							 (panel.region == "north" ? spacing : 0) + " " +
							 (panel.region == "east" ? spacing : 0);
				}
				
				$panelEl.parent()
					   .addClass("sy-borderlayout-region")
					   .addClass("sy-borderlayout-region-" + panel.region)
					   .css("margin",margin)
					   .attr("region",panel.region);
				//添加header class用来区别borderlayout和borderlayout中内嵌的panel使用的tools 图片
				$panelEl.prev().addClass("sy-borderlayout-region-header");
			}
		},
		_getRegion : function(region){
			var $regionEl = this.element.find(">[region=\""+region+"\"]");
			return $regionEl.size()>0?$regionEl:false;
		},
		_getRegionProxy : function(region){
			var $proxyEl = this.element.find(">[proxy=\""+region+"\"]");
			return $proxyEl.size()>0?$proxyEl:false;
		},
		_getPanelOpts : function(region){
			for(var i = 0; i < this.options.panels.length; i++){
				if(region == this.options.panels[i].region){
					return this.options.panels[i];
				}
			}
			return false;
		},
        /**
         * 折叠某个区域的panel。
         * @name omBorderLayout#collapseRegion
         * @function
         * @param region 区域名称
         * @example
         * //折叠north区域的panel
         * $('#page').omBorderLayout('collapseRegion', 'north');
         */
		collapseRegion : function(region){
			var self = this;
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.collapsible){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(panelInstance.options.closed) return;
				if(panel.onBeforeCollapse && panelInstance._trigger("onBeforeCollapse") === false){
					return false;
				}
				// if(region=='north'){
					// $region.animate({top: -panelInstance.options.height},function (){
						// panelInstance.close();
						// //$region.hide();
						// var p = self._getRegionProxy(region);
						// p.css({
							// left  : 0,
							// top   : 0,
							// height: '26px'
						// })
						// p.show();
					// });
				// }
				
				$region.hide();
				panel.onCollapse && panelInstance._trigger("onCollapse");
				this._getRegionProxy(region).show();
				this._resizeRegion();
			}
		},
		/**
		 * 展开某个区域的panel。
		 * @name omBorderLayout#expandRegion
		 * @function
		 * @param region 区域名称
		 * @example
		 * //展开north区域的panel
		 * $('#page').omBorderLayout('expandRegion', 'north');
		 */
		expandRegion : function(region){
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.collapsible){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(panelInstance.options.closed) return;
				if(panel.onBeforeExpand && panelInstance._trigger("onBeforeExpand") === false){
					return false;
				}
				$region.show();
				panel.onExpand && panelInstance._trigger("onExpand");
				this._getRegionProxy(region).hide();
				this._resizeRegion();
			}
		},
		/**
		 * 关闭某个区域的panel。
		 * @name omBorderLayout#closeRegion
		 * @function
		 * @param region 区域名称
		 * @example
		 * //关闭north区域的panel
		 * $('#page').omBorderLayout('closeRegion', 'north');
		 */
		closeRegion : function(region){
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.closable){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(panelInstance.options.closed) return;
				
				$region.find(">.panel-body").panel("close");
				this._getRegionProxy(region).hide();
				this._resizeRegion();
			}
		},
		/**
		 * 打开某个区域的panel。
		 * @name omBorderLayout#openRegion
		 * @function
		 * @param region 区域名称
		 * @example
		 * //打开north区域的panel
		 * $('#page').omBorderLayout('openRegion', 'north');
		 */
		openRegion : function(region){
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.closable){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(!panelInstance.options.closed) return;
				
				$region.find(">.panel-body").panel("open");
				this._getRegionProxy(region).hide();
				this._resizeRegion();
			}
		}

	});
})(jQuery);