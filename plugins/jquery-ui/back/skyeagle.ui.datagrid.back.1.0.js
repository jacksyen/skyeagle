/**
 * @auth 	 jacksyen
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
		    wrap.panel({
				title : opts.title,
				width : opts.width,
				height: opts.height,
				collapsible : opts.collapsible
		    });
		    
		     // 添加行号视图
		    var rowView1 = $('<div class="datagrid-view1"></div>');
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
		    					
		    
		    wrap.find('.datagrid-view2').before(rowView1);
		    
		    dgHeader.css({
		    	'height' : '22px',
		    	'width'  : dgView2.width()
		    });
		    rvHeader.css({
		    	'width'  : '26px',
		    	'height' : dgHeader.height()
		    });
		    rvHeaderTbl.css({
		    	'height' : dgHeader.outerHeight()
		    })
		    rvBody.css({
		    	'height' : wrap.height() - rvHeaderTbl.outerHeight(),
		    	'width'  : rowView1.width()
		    });
		    
		    if(opts.rownumbers){
			    rowView1.css({
			    	'width' : '26px'
			    });
		    }
		    dgView2.css({
		    	'width' : wrap.width() - rowView1.width(),
		    	'left'  : rowView1.width()
		    })
		     
		    
		    view.css({
		    	'width' : wrap.width(),
		    	'height': wrap.height()
		    })
		    
		    
		    dgBody.css({
		    	'height' : wrap.height() - dgHeader.outerHeight(),
		    	'width'  : dgView2.width()
		    });
		    
		    // 存储数据
		    $.data(ele, 'datagrid',{
		    	panel : wrap.panel('panel')
		    });
		    
		    // 
		    ele.attr({
				'cellpadding' : 0,
				'cellspacing' : 0,
				'border'      : 0
		    });
		    
		    self._setColumn(ele);
		    self._setData(ele);
		    
		    self._setRow(ele);
		    
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
			
			var dgHeader = panel.find('.datagrid-view2 .datagrid-header-inner');
			
			var headerTbl = $('<table cellspacing="0" cellpadding="0" border="0"></table>');
			
			var headerTr = $('<tr></tr>');
			for(var i = 0; i < column.length; i++){
				var cxt = $('<div class="datagrid-cell"></div>').html('<span>'+column[i].title+'</span>');
				cxt.css({
					'text-align' : column[i].align,
					'width'      : !column[i].width ? 'auto' : column[i].width
				});
				var headerTd = $('<td></td>').html(cxt);
				headerTr.append(headerTd);
			}
			headerTbl.append(headerTr);
			dgHeader.append(headerTbl);
			
		},
		/**
		 * 添加主体行内容 
 		 * @param {Object} target
		 */
		_setData : function (target){
			var opts   = this.options,
				column = opts.column,
				sources= opts.datasources.rows,
				panel  = $.data(target, 'datagrid').panel;
				
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
					bodyTd.attr('field',rowData[column[j].field]);
					bodyTr.append(bodyTd);
				}
				target.append(bodyTr);
			}
		},
		/**
		 * 添加行号数据 
		 */
		_setRow : function (target){
			var opts   = this.options,
				column = opts.column,
				total= opts.datasources.total,
				panel  = $.data(target, 'datagrid').panel;
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
				panel  = $.data(target, 'datagrid').panel;
			var body1 = $('.datagrid-view1 .datagrid-body', panel);
			var body2 = $('.datagrid-view2 .datagrid-body', panel);
			var header2 = $('.datagrid-view2 .datagrid-header', panel);
			
			// 滚动事件
			body2.scroll(function(){
				
				header2.scrollLeft(body2.scrollLeft());
				
				body1.scrollTop(body2.scrollTop());
			});	
		}
    });
})(jQuery);
