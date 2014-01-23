(function($) {
	$.widget('ui.combogrid', $.ui.datagrid, {
		options : {
			idField : 'name',
		},
		_create : function() {
			var self = this,
				ele  = self.element;
				// opts = self.options;			var combo = new $.ui.combo();
			var opts = $.extend(combo.options, this.options);	
				
			ele.append($('<table id="tt"></table>'));
			ele.combo(opts);
			// ele.combo({
				// // 验证是否为空
				// required : opts.required,
				// // 验证失败提示信息
				// missMsg : opts.missMsg,
				// // combo的宽度
				// comboWidth : opts.comboWidth,
				// // panel的宽度
				// panelWidth : opts.gridWidth + 2,
				// // 是否可编辑
				// editable : opts.editable,
				// // 是否带有单选按钮,不可与multiable同时为true
				// radioable : opts.radioable,
				// // 是否可以多选
				// multiable : opts.multiable,
				// // 分隔符
				// separator : opts.separator,
				// // 设置初始值
				// value : opts.value
			// });
			
			ele.children().datagrid(
				$.extend(this.options, {
					onSelect : function(event, ui) {
						// 获得名称
						// alert(ui.rowData.name);
						ele.combo('setValue', ui.rowData[opts.idField]);
						ele.panel('close');
					}
				})
			);			// ele.children().datagrid({
				// width : opts.gridWidth,
				// pagination : opts.pagination,
				// pageSize : opts.pageSize,
				// pageList : opts.pageList,
				// rownumbers: opts.rownumbers,
				// singleSelect : opts.singleSelect,
				// sortName : opts.sortName,
				// sortOrder : opts.sortOrder,
				// url : opts.url,
				// columns: opts.columns,
				// onClickRow : function(event, ui) {
					// // alert(ui.rowIndex);
					// // ui.rowIndex
					// // alert(ele.children().datagrid('getSelections'));
				// },
				// onSelect : function(event, ui) {
					// // 获得名称
					// // alert(ui.rowData.name);
					// ele.combo('setValue', ui.rowData[idField]);
					// ele.panel('close');
				// }
			// })
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			
		}
	})
})(jQuery);
