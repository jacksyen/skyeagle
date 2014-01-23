(function($) {
	$.widget('ui.combogrid', $.ui.datagrid, {
		options : {
			idField : ''
		},
		destroy : function (){
			return $.data(this.element, 'combogrid').comboGrid.each(function() {
				this.outerHTML = '';
			});
		},
		resize : function (options){
			this.element.combo('resize', options);
		},
		disable : function (){
			this.element.combo('disable');
		},
		enable : function (){
			this.element.combo('enable');
		},
		getValue : function (){
			return $.data(this.element, 'combogrid').comboGrid.find('.combo-input').val();
		},
		setValue : function (val){
			$.data(this.element, 'combogrid').comboGrid.find('.combo-input').val(val);
		},
		_create : function() {
			var self = this,
				ele  = self.element;
			var combo = new $.ui.combo();
			var opts = $.extend(combo.options, this.options);	
				
			$.data(ele, 'combogrid', {
				comboGrid : ''
			});
			
			ele.append($('<table id="tt"></table>'));
			// 生成combo
			ele.combo(opts);
			
			// 生成datagrid
			ele.children().datagrid(
				$.extend(this.options, {
					width : opts.panelWidth - 2,
					onSelect : function(event, ui) {
						if(opts.idField == '') {
							for(var i in ui.rowData) {
								opts.idField = i;
								break;
							}
						}
						ele.combo('setValue', ui.rowData[opts.idField]);
						ele.panel('close');
					}
				})
			);
			
			$.data(ele, 'combogrid').comboGrid = ele.parent().parent();		},
		_init : function() {
			
		},
		_bindEvents : function() {
			
		}
	})
})(jQuery);
