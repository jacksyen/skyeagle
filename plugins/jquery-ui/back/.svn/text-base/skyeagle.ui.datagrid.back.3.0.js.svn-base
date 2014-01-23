/**
 * @auth 	 	 jacksyen
 * @created 	 2012.07.16 
 * @description  基于jquery UI、easyUI扩展的datagrid组件
 */
(function($) {
    
    $.widget("ui.datagrid" , {
		options : {
		    // 宽度
		    width : 'auto',
		    // 高度
		    height: 'auto',
		    // 是否显示行号
		    rownumbers : false,
		    // 标题
		    title : 'DataGrid',
		    // 是否显示折叠按钮
			collapsible: false,
		    // 标题列
		    // [{field:'', title:'', width:'auto', align:center }]
		    column: [],
		    // 数据源URL
		    url : null,
		    // 主体数据
		    /*
			{total:0, rows:[
				{'pid':'001','status':1,'title':'hello'},
				{'pid':'002','status':0,'title':'hello'}]
			}*/
		    datasources: {}
		    
		},
		_create : function (){
		    var self = this,
			    ele  = this.element,
			    opts = this.options;
			
			    
		    // 数据主体
		    var dgBody = ele.wrap('<div class="datagrid-body"></div>').parent();
		    
		    // 数据头部
		    var dgHeader = $('<div class="datagrid-header"></div>');
		    var inner = $('<div class="datagrid-header-inner"></div>');
		    inner.css({
		    	'display' : 'block'
		    })
		   
		    dgHeader.append(inner);
		    
		    
		    // 数据视图
		    var dgView2 = dgBody.wrap('<div class="datagrid-view2" />').parent();
		    dgHeader.insertBefore(dgBody);
		    
			var view = dgView2.wrap('<div class="datagrid-view" />').parent();
			
		    var wrap = view.wrap('<div class="datagrid-wrap" />').parent();
		    
		    // if(opts.width=='auto'){    
				// if ($.boxModel == true) {
					// opts.width = wrap.width();
				// } else {
					// opts.width = wrap.outerWidth();
				// }    
			// }
		    
		    wrap.panel({
				title : opts.title,
				//width : opts.width=='auto' ? null : opts.width,
				//height: opts.height,
				collapsible : opts.collapsible
		    });
		    
		     // 添加行号视图
		    var rowView1 = $('<div class="datagrid-view1"></div>');
		    
		    if(opts.rownumbers){
			    var rvHeader = $('<div class="datagrid-header"></div>');
			    var rvHeaderTbl = $('<table cellspacing="0" cellpadding="0" border="0">' +
			    						'<tbody><tr><td rowspan="0">' +
			    							'<div class="datagrid-header-rownumber"></div>' +
			    						'</td></tr></tbody>' +
			    					'</table>');
			    rvHeader.append(rvHeaderTbl);
			    rvHeader.wrapInner($('<div class="datagrid-header-inner"></div>'));
			    rowView1.append(rvHeader);
			    var rvBody = $('<div class="datagrid-body"><div class="datagrid-body-inner"></div></div>');
			   
			    rowView1.append(rvBody);
		    }
		    wrap.find('.datagrid-view2').before(rowView1);
		    
		    // 存储数据
		    $.data(ele, 'datagrid',{
		    	panel : wrap/*wrap.panel('panel')*/
		    });
		    
		    // 
		    ele.attr({
				'cellpadding' : 0,
				'cellspacing' : 0,
				'border'      : 0
		    });
		    
		    self._setColumn(ele);
		   
		    self._setData(ele);
		    
		    if(opts.rownumbers){
		    	self._setRow(ele);
		    }
		    
		    self._setSize(ele);
		    
		    self._bindEvents(ele);
		},
		/**
		 * 添加主体标题列 
 		 * @param {Object} target
		 */
		_setColumn : function (target){
			var opts  = this.options,
				column= opts.column,
				panel = $.data(target, 'datagrid').panel;
			if(!column || column.length == 0) {
				return;
			}
			
			var dgHeader = panel.panel('panel').find('.datagrid-view2 .datagrid-header-inner');
			
			var headerTbl = $('<table cellspacing="0" cellpadding="0" border="0"></table>');
			
			var headerTr = $('<tr></tr>');
			for(var i = 0; i < column.length; i++){
				var cxt = $('<div class="datagrid-cell"></div>').html('<span>'+column[i].title+'</span>');
				cxt.css({
					'text-align' : column[i].align,
					'width'      : !column[i].width ? 'auto' : column[i].width
				});
				var headerTd = $('<td></td>').html(cxt).attr('field',column[i].field);
				headerTr.append(headerTd);
			}
			headerTbl.append(headerTr);
			dgHeader.append(headerTbl);
			
			
			
		},
		_loadData : function (target, sources){
			var opts   = this.options,
				column = opts.column,
				panel  = $.data(target, 'datagrid').panel.panel('panel');
			alert(sources.length);	
			for(var i = 0; i < sources.length; i++){
				var bodyTr = $('<tr class="datagrid-row"></tr>');
				bodyTr.attr('datagrid-row-index', i);
				bodyTr.css('height','25px');
				var rowData = sources[i];
				
				for(var j = 0; j < column.length; j++){
					var cxt = $('<div class="datagrid-cell"></div>').html(rowData[column[j].field]);
					cxt.css({
						'text-align' : column[j].align,
						'width'      : !column[j].width ? 'auto' : column[j].width
					});
					var bodyTd = $('<td></td>').html(cxt);
					bodyTd.attr('field',column[j].field);
					bodyTr.append(bodyTd);
				}
				target.append(bodyTr);
			}
		},
		/**
		 * 添加主体行内容 
 		 * @param {Object} target
		 */
		_setData : function (target){
			var self   = this,
				opts   = this.options,
				column = opts.column,
				sources= opts.datasources.rows,
				panel  = $.data(target, 'datagrid').panel.panel('panel');	
			if(opts.url){
				$.ajax({
					url : opts.url,
					dataType : 'json',
					success: function (data){
						self._loadData(target, data.rows);
					}
				});
				return;
			}
			self._loadData(target, sources);
			
		},
		/**
		 * 添加行号数据 
		 */
		_setRow : function (target){
			var opts   = this.options,
				column = opts.column,
				total= opts.datasources.total,
				panel  = $.data(target, 'datagrid').panel.panel('panel');
			var dgv1 =  panel.find('.datagrid-view1 .datagrid-body-inner');
			var bodyTbl = $('<table cellspacing="0" cellpadding="0" border="0"></table>');
			for(var i = 0; i < total; i++){
				var tr = $('<tr class="datagrid-row"></tr>').attr('datagrid-row-index',i).css('height','25px');
				var td = $('<td class="datagrid-td-rownumber">' +
								'<div class="datagrid-cell-rownumber">' + (i+1) +
								'</div>' +
							'</td>');
				tr.append(td);
				bodyTbl.append(tr);
			}
			dgv1.append(bodyTbl);	
		},
		/**
		 * 绑定事件 
 		 * @param {Object} target
		 */
		_bindEvents : function (target){
			var opts   = this.options,
				ele    = this.element;
				panel  = $.data(target, 'datagrid').panel.panel('panel');
			var body1 = $('.datagrid-view1 .datagrid-body', panel);
			var body2 = $('.datagrid-view2 .datagrid-body', panel);
			var header2 = $('.datagrid-view2 .datagrid-header', panel);
			
			//var differWidth;
			header2.find('.datagrid-cell').each(function(index) {
			  	$(this).resizable({
			  		handles : 'e',
			  		minWidth : 60,
			  		start : function (event, ui){
			  			//$(this).css("cursor", "e-resize");
			  			//differWidth = $(this).parent().width();
			  		},
			  		resize : function (event, ui){
			  			var field = $(this).parent().attr('field');
			  			$(this).width(ui.size.width).height('');
			  			body2.find('td[field="' + field + '"] >div').width(ui.size.width).height('');
			  			// body2.height()
// 			  			
			  			// bDiv.height(grid.height()-($titleDiv.is(":hidden")?0:$titleDiv.outerHeight())-hDiv.outerHeight()-pDiv.outerHeight());
                    	//body2.scrollLeft();
                    	//$('#show').html(ele.width());
                    	var w = ele.width() - body2.outerWidth();
                    	if(w>0){
                    		//body2.scrollLeft(w);
	                    	//$(this).html(body2.scrollLeft());
	                    	header2.scrollLeft(body2.scrollLeft());
                    	}
			  		},
			  		stop : function (event, ui){
			  			//differWidth = $th.width() - differWidth;
			  			//$(this).css("cursor", "");
			  			header2.scrollLeft(body2.scrollLeft());
			  		}
			  	});
			});
			
			// 滚动事件
			body2.scroll(function(){
				header2.scrollLeft(body2.scrollLeft());
				body1.scrollTop(body2.scrollTop());
			});	
			
			// 标题行鼠标移入和移出样式
			header2.find('td').hover(function() {
				$(this).addClass('datagrid-header-over');
			}, function() {
				$(this).removeClass('datagrid-header-over');
			});
			// 主体行鼠标移入和移出样式
			body2.find('tr').bind('mouseover.datagrid', function(event) {
			  	$(this).addClass('datagrid-row-over');
			}).bind('mouseout.datagrid', function(event) {
			  	$(this).removeClass('datagrid-row-over');
			}).bind('click.datagrid', function(event) {
				if($(this).hasClass('datagrid-row-selected')){
					$(this).removeClass('datagrid-row-selected');
				}else{
					$(this).addClass('datagrid-row-selected');
				}
			});
			body1.find('tr').hover(function() {
				body2.find('tr[datagrid-row-index=' + $(this).attr('datagrid-row-index') +']').trigger('mouseover');
			}, function() {
				body2.find('tr[datagrid-row-index=' + $(this).attr('datagrid-row-index') +']').trigger('mouseout');
			}).bind('click.datagrid', function(event) {
			  	body2.find('tr[datagrid-row-index=' + $(this).attr('datagrid-row-index') +']').trigger('click');
			});
			
			// window大小重置事件
			$(window).resize(function() {
				//this._setSize(this.element);
			});
		},
		/**
		 * 设置控件的大小 
 		 * @param {Object} target
		 */
		_setSize : function (target){
			var opts   = this.options,
				panel  = $.data(target, 'datagrid').panel;
			var wrap  = panel.panel('panel').find('.datagrid-wrap');
			var view  = wrap.find('.datagrid-view');
			var view1 = view.find('.datagrid-view1');
			var view2 = view.find('.datagrid-view2');
			var view1Header = view1.find('.datagrid-header');
			var view2Header = view2.find('.datagrid-header');
			
			
			var gridWidth = opts.width;
			 if(opts.width=='auto'){    
				if ($.boxModel == true) {
					gridWidth = wrap.width();
				} else {
					gridWidth = wrap.outerWidth();
				}    
			}
			panel.panel('resize',{
				width : gridWidth,
				height: opts.height
			});
			
			if(opts.rownumbers){
			    view1.css({
			    	'width' : '26px'
			    });
		    }
		    view2.css({
		    	'width' : wrap.width() - view1.width(),
		    	'left'  : view1.width()
		    });
		    view.css({
		    	'width' : wrap.width(),
		    	'height': wrap.height()
		    });
		    view2Header.css({
		    	'height' : '22px',
		    	'width'  : view2.width()
		    });
		    if(opts.rownumbers){
			    view1Header.css({
			    	'width'  : '26px',
			    	'height' : view2Header.height()
			    });
			    var v1HTbl = view1Header.find('table');
			    v1HTbl.css({
			    	'height' : view2Header.outerHeight()
			    })
			    view1.find('.datagrid-body').css({
			    	'height' : wrap.height() - v1HTbl.outerHeight(),
			    	'width'  : view1.width()
			    });
		    }
		    view2.find('.datagrid-body').css({
		    	'height' : wrap.height() - view2Header.outerHeight(),
		    	'width'  : view2.width()
		    });
		    view.css({
		    	'width'  : wrap.width(),
		    	'height' : view2.height()
		    });
		}
    });
})(jQuery);
