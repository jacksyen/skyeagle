/**
 * @auth 		 jacksyen
 * @created 	 2012.06.13 
 * @description  基于jquery UI扩展的panel组件
 */
(function ($){
	$.widget('ui.layout',{
		version: "@VERSION",
		delay: 300,
		options: {
			
		},
		_create : function (){
			var self = this.element;
			self.addClass('layout');
			self.css({
				margin:0,
				padding:0
			});
		},
		_init : function (){
			var self = this.element;
			self.data('layout',{
				panels : this._initPanel(self)
			});
			alert(self.parent().height());
			this._setSize(self);
		},
		/**
		 * 初始化panel信息 
		 */
		_initPanel : function (self){
			function createPanel(dir){
				var pp = self.find('>div[region=' + dir + ']').addClass('layout-body');
				var toolCls = null;
				switch(dir){
					case 'north': toolCls = 'layout-button-up';break;
					case 'south': toolCls = 'layout-button-down';break;
					case 'east' : toolCls = 'layout-button-right';break;
					case 'west' : toolCls = 'layout-button-left';break;
				}
				var cls = 'layout-panel layout-panel-'+dir;
			
				if(pp.attr('split')=='true'){
					cls += ' layout-split-'+dir;
				}
				pp.panel({
					title : pp.attr('title'),
					cls   : cls,
					href  : pp.attr('href'),
					border: (pp.attr('border')=='false' ? false : true),
					tools:[{ iconCls:toolCls, handler:function (){this._collapsePanel(self,dir);}}]
				});
				if(pp.attr('split')=='true'){
					//var panel = pp.panel('panel');
					var handles = '';
					if (dir == 'north') handles = 's';
					if (dir == 'south') handles = 'n';
					if (dir == 'east') handles = 'w';
					if (dir == 'west') handles = 'e';
				}
				return pp;
			}
			$('<div class="layout-split-proxy-h"></div>').appendTo(self);
			$('<div class="layout-split-proxy-v"></div>').appendTo(self);
			var panels = {
				center : createPanel('center'),
				north  : createPanel('north'),
				south  : createPanel('south'),
				east   : createPanel('east'),
				west   : createPanel('west')
			};
			// 绑定窗口更改尺寸事件
			$(window).resize(function() {
				this._setSize(self);
			});
			return panels;
		},
		_expandPanel : function (){
			var panels = $(target).data('layout').panels;
			var t = $(target);
			if(region=='north' && panels.expandNorth){
				panels.expandNorth.panel('close');
				panels.north.panel('panel').stop(true,true);
				panels.north.panel('open').panel('resize',{
					top : -panels.north.panel('options').height
				});
				panels.north.panel('panel').animate({top: 0}, function() {
					setSize(target);
				})
			}else if (region=='south' && panels.expandSouth){
				panels.expandSouth.panel('close');
				panels.south.panel('panel').stop(true,true);
				panels.south.panel('open').panel('resize',{
					top : t.height()
				});
				panels.south.panel('panel').animate({top: t.height() - panels.south.panel('options').height}, function() {
					setSize(target);
				})
			}else if(region=='east' && panels.expandEast){
				panels.expandEast.panel('close');
				panels.east.panel('panel').stop(true,true);
				panels.east.panel('open').panel('resize',{left:t.width()});
				panels.east.panel('panel').animate({left: t.width()-panels.east.panel('options').width}, function() {
					setSize(target);
				})
			}else if(region=='west' && panels.expandWest){
				panels.expandWest.panel('close');
				panels.west.panel('panel').stop(true,true);
				panels.west.panel('open').panel('resize',{left:-panels.west.panel('options').width});
				panels.west.panel('panel').animate({left: 0}, function() {
					setSize(target);
				})
			}
		},
		_collapsePanel : function (target,region){
			var panels = $(target).data('layout').panels;
			var t = $(target);
			
			function createExpandPanel(dir){
				var iconCls,titleV=false;
				if(dir=='north'){
					iconCls = 'layout-button-down';
				}else if(dir=='south'){
					iconCls = 'layout-button-up';
				}else if(dir=='east'){
					iconCls = 'layout-button-left';
					titleV  = true;
				}else if(dir=='west'){
					iconCls = 'layout-button-right';
					titleV  = true;
				}
				
				
				var pp = $('<div></div>').appendTo(t).panel({
					cls: 'layout-expand',
					title : '&nbsp',
					closed: true,
					tools : [
						{
							iconCls : iconCls,
							handler : function (){
								expandPanel(target,dir);
							}
						}
					]
				});
				return pp;
			}
			
			if(region=='north'){
				var hh = t.height() - 28;
				if(isVisible(panels.expandSouth)){
					hh -= panels.expandSouth.panel('options').height;
				}else{
					hh -= panels.south.panel('options').height;
				}
				
				panels.center.panel('resize',{top:28,height:hh});
				panels.east.panel('resize',{top:28,height:hh});
				panels.west.panel('resize',{top:28,height:hh});
				if(isVisible(panels.expandEast)){panels.expandEast.panel('resize',{top:28,height:hh})}
				if(isVisible(panels.expandWest)){panels.expandWest.panel('resize',{top:28,height:hh})}
				
				panels.north.panel('panel').animate({top: -panels.north.panel('options').height}, function() {
					panels.north.panel('close');
					
					panels.expandNorth.panel('open').panel('resize',{
						top : 0,
						left: 0,
						height: 28,
						width : t.width()
					});
					panels.expandNorth.panel('setTitle',panels.north.panel('getTitle'));
					
					
				});
				if(!panels.expandNorth){
					panels.expandNorth = createExpandPanel('north');
					panels.expandNorth.panel('panel').click(function() {
						// TODO
						/*
						panels.north.panel('open').panel('resize',{
							top : -panels.north.panel('options').height
						});
						panels.north.panel('panel').animate({top: 0});
						return false;
						*/
					});
				}
			}else if(region=='south'){
				var hh = t.height() -28;
				if(isVisible(panels.expandNorth)){
					hh -= panels.expandNorth.panel('options').height;
				}else if(isVisible(panels.north)){
					hh -= panels.north.panel('options').height;
				}
				
				panels.center.panel('resize',{height:hh});
				panels.east.panel('resize',{height:hh});
				panels.west.panel('resize',{height:hh});
				if(isVisible(panels.expandEast)){panels.expandEast.panel('resize',{height:hh})}
				if(isVisible(panels.expandWest)){panels.expandWest.panel('resize',{height:hh})}
				
				panels.south.panel('panel').animate({top: t.height()}, function() {
					panels.south.panel('close');
					panels.expandSouth.panel('open').panel('resize',{
						top : t.height() - 28,
						left: 0,
						height:28,
						width :t.width()
					});
					panels.expandSouth.panel('setTitle',panels.south.panel('getTitle'));
				});
				if(!panels.expandSouth){
					panels.expandSouth = createExpandPanel('south');
					panels.expandSouth.panel('panel').click(function() {
						// TODO
					});
					
				}
			}else if(region=='east'){
				var ww = panels.center.panel('options').width + panels.east.panel('options').width - 28;
				panels.center.panel('resize',{width:ww});
				panels.east.panel('panel').animate({left: t.width()}, function() {
					panels.east.panel('close');
					panels.expandEast.panel('open').panel('resize',{
						top : panels.east.panel('options').top,
						left : t.width()-28,
						width:28,
						height : panels.east.panel('options').height
					});
					panels.expandEast.panel('setTitle',panels.east.panel('getTitle'));
				});
				if(!panels.expandEast){
					panels.expandEast = createExpandPanel('east');
					panels.expandEast.panel('panel').click(function() {
						// TODO
					});
				}
			}else if(region=='west'){
				panels.center.panel('resize',{
					width : panels.center.panel('options').width + panels.west.panel('options').width - 28,
					left  : 28
				});
				panels.west.panel('panel').animate({left: -panels.west.panel('options').width}, function() {
					panels.west.panel('close');
					panels.expandWest.panel('open').panel('resize',{
						top : panels.west.panel('options').top,
						left: 0,
						width:28,
						height:panels.west.panel('options').height
					});
					panels.expandWest.panel('setTitle',panels.west.panel('getTitle'));
				});
				if(!panels.expandWest){
					panels.expandWest = createExpandPanel('west');
					panels.expandWest.panel('panel').click(function() {
						// TODO
					});
				}
			}
		},
		_isVisible : function (p){
			if(!p) return false;
			if(p.length){
				return p.panel('panel').is(':visible');
			}
			return false;
		},
		_setSize : function (self){
			var panels = self.data('layout').panels;
			var pos = {
				top  : 0,
				left : 0,
				width: self.width(),
				height: self.height()
			};
			
			// Resize north
			function setNorthSize(p){
				if(p.length==0) return;
				p.panel('resize',{
					width : self.width(),
					heigth: p.panel('opts').height,
					left  : 0,
					top   : 0
				});
				
				pos.top += p.panel('opts').height;
				pos.height -= p.panel('opts').height;
			}
			if(this._isVisible(panels.expandNorth)){
				setNorthSize(panels.expandNorth);
			}else{
				setNorthSize(panels.north);
			}
			
			// Resize south
			function setSouthSize(p){
				if(p.length==0) return;
				p.panel('resize',{
					width : self.width(),
					height: p.panel('opts').height,
					left  : 0,
					top   : self.height() - p.panel('opts').height
				});
				
				pos.height -= p.panel('opts').height;
			}
			if(this._isVisible(panels.expandSouth)){
				setSouthSize(panels.expandSouth);	
			}else{
				setSouthSize(panels.south);
			}
			
			// Resize east
			function setEastSize(p){
				if(p.length==0) return;
				p.panel('resize',{
					width : p.panel('opts').width,
					height: pos.height,
					left  : self.width() - p.panel('opts').width,
					top   : pos.top
				});
				pos.width -= p.panel('opts').width;
			}
			if(this._isVisible(panels.expandEast)){
				setEastSize(panels.expandEast);
			}else{
				setEastSize(panels.east);
			}
			
			// Resize west
			function setWestSize(p){
				if(p.length==0) return;
				p.panel('resize',{
					width : p.panel('opts').width,
					height: pos.height,
					left  : 0,
					top   : pos.top
				}); 
				pos.left  += p.panel('opts').width;
				pos.width -= p.panel('opts').width;			
			}
			if(this._isVisible(panels.expandWest)){
				setWestSize(panels.expandWest);
			}else{
				setWestSize(panels.west);
			}
			
			panels.center.panel('resize',pos);
		}
	});
	
	
	
})(jQuery);
