(function($) {

	$.widget('ui.combotree', $.ui.tree, {
		options : {
			
		},
		destroy : function (){
			return $.data(this.element, 'combotree').comboTree.each(function() {
				this.outerHTML = '';
			});		},
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
			return $.data(this.element, 'combotree').comboTree.find('.combo-input').val();
		},
		setValue : function (val){
			$.data(this.element, 'combotree').comboTree.find('.combo-input').val(val);
		},
		_create : function() {
			var self = this,
				ele  = self.element;
			var combo = new $.ui.combo();
			var opts = $.extend(combo.options, this.options);
			var optss = $.extend($.ui.tree.options, this.options);
			
			var combo = new $.ui.combo();
			
			$.data(ele, 'combotree', {
				val : [],
				comboTree : '',
				clear : []
			});
			
			// 添加生成tree的对象
			ele.append($('<ul></ul>').attr('id', 'tree-' + new Date().getTime()));
			
			if(opts.checkbox) {
				// 生成combo
				ele.combo(opts);
				// 在combo下面生成tree
				ele.children().tree(
					$.extend(this.options, {
						onBeforeCheck : function (event, ui){
							// 判断是否是子节点，子节点返回true，根节点返回false
							var isLeaf = ele.children().tree('isLeaf', ui.node.target);
							var val = ui.node.text;
							if(ui.checked) {
								if(isLeaf) {
									$.data(ele, 'combotree').val.push(val);
								} else {
									self._getChildren(ui.node);
								}
							} else {
								if(isLeaf) {
									var temp = $.data(ele, 'combotree').val;
									var index = $.inArray(val, temp);
									temp.splice(index, 1);
									$.data(ele, 'combotree').val = temp;
								} else {
									var temp = $.data(ele, 'combotree').val;
									self._getClear(ui.node);
									var clear_childVal = $.data(ele, 'combotree').clear;
									for(var i = 0; i < clear_childVal.length; i ++) {
										// alert(childVal[i]);
										var index = $.inArray(clear_childVal[i], temp);
										temp.splice(index, 1);
									}
									$.data(ele, 'combotree').val = temp;
									// 将数组清空
									$.data(ele, 'combotree').clear = [];
								}
							}
						},						onCheck : function(event, ui) {
							ele.combo('setValue', $.data(ele, 'combotree').val);						}
					})
				);
			} else {
				// 生成combo
				ele.combo(opts);
				// 在combo下面生成tree
				ele.children().tree(
					$.extend(this.options, {
						onClick : function(event, node) {
							ele.combo('setValue', node.text);							ele.panel('close');
						}
					})
				);
			}
			$.data(ele, 'combotree').comboTree = ele.parent().parent();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			
		},
		// 检测是否含有子节点如果有则返回，如果没有则跳出
		_getChildren : function(fuck) {
			var self = this,
				ele  = self.element;
			var children = ele.children().tree('getChildren', fuck.target);
			for(var i = 0; i < children.length; i ++) {
				if(!children[i].checked) { // 已经选择的节点则不需要再遍历
					var ch_isLeaf = ele.children().tree('isLeaf', children[i].target);
					if(ch_isLeaf) {
						$.data(ele, 'combotree').val.push(children[i].text);
					} else {
						self._getChildren(children[i]);
						break;
					}
				}
			}
			return $.data(ele, 'combotree').val;
		},
		// 获取需要清楚的节点
		_getClear : function(clear) {
			var self = this,
				ele  = self.element;
			var clear_children = ele.children().tree('getChildren', clear.target);
			for(var i = 0; i < clear_children.length; i ++) {
				var ch_isLeaf = ele.children().tree('isLeaf', clear_children[i].target);
				if(ch_isLeaf) {
					$.data(ele, 'combotree').clear.push(clear_children[i].text);
				} else {
					self._getClear(clear_children[i]);
					break;
				}
			}
			return $.data(ele, 'combotree').clear;
		}
	});

})(jQuery);
