(function($) {
	$.widget('ui.combogrid', {
		options : {
			url : '',
			comboWidth : null,
			gridWidth : null
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options;
			ele.append($('<table id="tt"></table>'));
			ele.combo({
				width : opts.comboWidth,
				panelWidth : opts.gridWidth + 2,
				missMsg : '输入框不能为空'
			});			ele.children().datagrid({
				width : opts.gridWidth,
				pagination : true,
				pageSize : 10,
				pageList : [5,10],
				rownumbers: true,
				singleSelect : true,
				sortName : 'code',
				sortOrder : 'desc',
				url : opts.url,
				columns:[[{
						title : '合并列',
						colspan : 2
					},{
						field:'code',
						title:'Code',
						width:80,
						rowspan: 2,
						editor : {type: 'numberbox' }
					}
				],[
					{
						field:'name',
						title:'Name',
						width:120,
						editor : {type: 'combo' }
					},
					{
						field:'addr',
						title:'Addr',
						width:80,
						align:'right',
						sortable : true,
						sorter : function(a, b) {
							return (a > b ? 1 : -1);
						}
					}
				]],
				onClickRow : function(event, ui) {
					// alert(ui.rowIndex);					// ui.rowIndex					// alert(ele.children().datagrid('getSelections'));				},
				onSelect : function(event, ui) {
					// 获得名称
					// alert(ui.rowData.name);
					ele.combo('setValue', ui.rowData.name);
					ele.panel('close');
				}
			})
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			
		}
	})
})(jQuery);
