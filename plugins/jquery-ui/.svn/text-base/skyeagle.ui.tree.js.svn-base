/**
 * @auth 	 	 jacksyen
 * @created 	 2012.07.30 
 * @description  基于jquery UI、easyUI扩展的tree组件
 */
(function($) {
	
    $.widget("ui.tree" , {
		options : {
			// 用以载入远程数据的超链接地址
		   	url : null,
		   	// 请求远程数据时的方法
			method : "get",
			// 定义当节点打开或关闭时是否显示动画效果
			animate : false,
			// 是否在每个节点前显示复选框
			checkbox : false,
			// 是否支持级联选择
			cascadeCheck : true,
			// 是否只在叶子前显示复选框
			onlyLeafCheck : false,
			// 是否显示节点之前的连接线
			lines : false,
			// 定义是否支持拖放
			dnd : false,
			// 将被载入的节点数据
			data : null,
			// 加载数据时执行，reutrn false终止操作
			loader : function(param, success, errors) {
				var opts = $(this).tree('getOptions');
				if(!opts.url) {
					return false;
				}
				$.ajax({
					type : opts.method,
					url : opts.url,
					data : param,
					dataType : "json",
					success : function(data) {
						success(data);
					},
					error : function() {
						errors.apply(this.element, arguments);
					}
				});
			},
			// 加载数据时的过滤器
			loadFilter : function(data, parent) {
				return data;
			},
			/**
			 * 当用户点击节点时触发，node参数包含如下属性：
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onClick : function (event, ui){},
			/**
			 * 当用户双击节点时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onDblClick : function (event, ui){},
			/**
			 * 在请求载入数据之前触发，返回false将取消载入。
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.param 请求参数
			 */
			onBeforeLoad : function (event, ui){},
			/**
			 * 当数据载入成功时触发
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.data  返回数据
			 */
			onLoadSuccess : function (event, ui){},
			/**
			 *  当数据载入失败时触发
			 * 		ui.arguments参数跟jQuery.ajax的'error'函数一样
			 */
			onLoadError : function (event, ui){},
			/**
			 * 在节点打开之前触发，返回false将取消打开 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onBeforeExpand : function (event, ui){},
			/**
			 * 在节点被打开时触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onExpand : function (event, ui){},
			/**
			 * 在节点被关闭之前触发，返回false将取消关闭
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onBeforeCollapse : function (event, ui){},
			/**
			 * 当节点被关闭时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onCollapse : function (event, ui){},
			/**
			 * 当用户点击复选框之前触发
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.checked  是否选中
			 */
			onBeforeCheck : function (event, ui){},
			/**
			 * 当用户点击复选框时触发
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.checked  是否选中
			 */
			onCheck : function (event, ui){},
			/**
			 *  在节点被选择之前触发，返回false将取消选择
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onBeforeSelect : function (event, ui){},
			/**
			 * 当节点被选择时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onSelect : function (event, ui){},
			/**
			 * 当节点被鼠标右键点击时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onContextMenu : function (event, node){},
			/**
			 * 当节点位置被（拖动）更换时触发
			 * 		ui.target 	DOM对象，需要被拖动动的目标节点。
			 *		ui.source   原始节点。
			 *		ui.point    指明拖动方式，可选值：'append'，'top'或者'bottom'。
			 */
			onDrop : function (event, ui){},
			/**
			 *	在编辑节点之前触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onBeforeEdit : function (event, node){},
			/**
			 *	在编辑节点之后触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onAfterEdit : function (event, node){},
			/**
			 *	当取消编辑时触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onCancelEdit : function (event, node){}
		},
		/**
		 * 返回树形菜单属性对象 
		 */
		getOptions : function (){
			return $.data(this.element, "tree").options;
		},
		/**
		 * 载入树形菜单数据
		 * @param data   
		 */
		loadData : function (data){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._loadData(ele, ele, data);
			});
		},
		/**
		 * 获取特定的节点对象
		 * @param target  
		 */
		getNode : function (target){
			return this._getParentNode(this.element, target);
		},
		/**
		 *  获取特定的节点数据，包括它的子节点
		 */
		getData : function (target){
			return this._getData(this.element, target);
		},
		/**
		 * 重新载入树形菜单数据 
		 */
		reload : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				if(target) {
					var tt = $(target);
					var hit = tt.children("span.tree-hit");
					hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
					tt.next().remove();
					self._expandNode(ele, target);
				} else {
					$(ele).empty();
					self._load(ele, ele);
				}
			});
		},
		/**
		 * 获取根节点，返回节点对象 
		 */
		getRoot : function (){
			return this._getRoot(this.element);
		},
		/**
		 * 获取根节点，返回节点数组 
		 */
		getRoots : function (){
			return this._getLiNode(this.element);
		},
		/**
		 * 获取父节点，target是一个节点DOM对象
		 */
		getParent : function (target){
			return this._getPrevNode(this.element, target);
		},
		/**
		 * 获取子节点，target参数是一个节点DOM对象 
		 */
		getChildren : function (target){
			return this._getChildren(this.element, target);
		},
		/**
		 * 获取所有被选择的节点 
		 */
		getChecked : function (){
			return this._getChecked(this.element);
		},
		/**
		 * 获取被选择的节点并返回，如果没有节点被选择则返回null 
		 */
		getSelected : function () {
			return this._nodeSelected(this.element);
		},
		/**
		 * 判断指定的节点是否是叶子节点，target参数是一个节点DOM对象 
		 */
		isLeaf : function (target){
			return this._isTreeHit(this.element, target);
		},
		/**
		 * 查找指定的节点并返回节点对象 
		 */
		find : function (id){
			return this._find(this.element, id);
		},
		/**
		 * 选择一个节点，target参数是一个节点DOM对象 
		 */
		select : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._selectNode(ele, target);
			});
		},
		/**
		 * 设置指定的节点为已选择状态 
		 */
		check : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._checkNode(ele, target, true);
			});
		},
		/**
		 * 设置指定的节点为未选择状态 
		 */
		uncheck : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._checkNode(ele, target, false);
			});
		},
		/**
		 * 关闭节点，target参数是一个节点DOM对象 
		 */
		collapse : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._collapseNode(ele, target);
			});
		},
		/**
		 * 打开节点，target参数是一个节点DOM对象 
		 */
		expand : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._expandNode(ele, target);
			});
		},
		/**
		 *  关闭所有的节点
		 */
		collapseAll : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._collapseAll(ele, target);
			});
		},
		/**
		 * 打开所有的节点 
		 */
		expandAll : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._expandAll(ele, target);
			});
		},
		/**
		 * 打开从根节点到指定节点之间的所有节点 
		 */
		expandTo : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._expandTo(ele, target);
			});
		},
		/**
		 *  添加若干子节点到一个父节点，param参数有2个属性：
		 * 		parent：DOM对象，将要被添加子节点的父节点，如果未指定，子节点将被添加至根节点
		 * 		data：数组，节点数据
		 */
		append : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._appendNode(ele, param);
			});
		},
		/**
		 *  打开或关闭节点的触发器，target参数是一个节点DOM对象
		 */
		toggle : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._toggleNode(ele, target);
			});
		},
		/**
		 *  在一个指定节点之前或之后插入节点，'param'参数包含如下属性：
		 * 		before：DOM对象，在某个节点之前插入
		 * 		after: DOM对象，在某个节点之后插入
		 * 		data：对象，节点数据
		 */
		insert : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._insertNode(ele, param);
			});
		},
		/**
		 * 移除一个节点和它的子节点，target参数是一个节点DOM对象 
		 */
		remove : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._removeNode(ele, target);
			});
		},
		/**
		 * 移除一个节点和它的子节点，该方法跟remove方法一样，不同的是它将返回被移除的节点数据 
		 */
		pop : function (target){
			var data = this.element.tree("getData", target);
			this.element.tree("remove", target);
			return data;
		},
		/**
		 * 更新指定的节点，param参数有如下属性：
		 * 		target(DOM对象，将被更新的目标节点)，id，text，iconCls，checked等。 
		 */
		update : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._update(ele, param);
			});
		},
		/**
		 * 启用拖动特性 
		 */
		enableDnd : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				// TODO enableDnd
				//_15(ele);
			});
		},
		/**
		 * 禁用拖动特性 
		 */
		disableDnd : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				// TODO disableDnd
				// _12(ele);
			});
		},
		/**
		 *  开始编辑节点
		 */
		beginEdit : function (nodeEl){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._beginEdit(ele, nodeEl);
			});
		},
		/**
		 * 结束编辑节点 
		 */
		endEdit : function (nodeEl){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._afterEdit(ele, nodeEl);
			});
		},
		/**
		 * 取消编辑节点 
		 */
		cancelEdit : function (nodeEl){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._cancelEdit(ele, nodeEl);
			});
		},
		_beginEdit : function (target, nodeEl){
			var self = this;
			var opts = $.data(target, "tree").options;
			var pNode = this._getParentNode(target, nodeEl);
			if(self._trigger('onBeforeEdit', null, pNode) == false){
				return;
			}
			// if(opts.onBeforeEdit.call(target, pNode) == false) {
				// return;
			// }
			$(nodeEl).css("position", "relative");
			var nt = $(nodeEl).find(".tree-title");
			var oWidth = nt.outerWidth();
			nt.empty();
			var editor = $("<input class=\"tree-editor\">").appendTo(nt);
			editor.val(pNode.text).focus();
			editor.width(oWidth + 20);
			editor.height(document.compatMode == "CSS1Compat" ? (18 - (editor.outerHeight() - editor.height())) : 18);
			editor.bind("click", function(e) {
				return false;
			}).bind("mousedown", function(e) {
				e.stopPropagation();
			}).bind("mousemove", function(e) {
				e.stopPropagation();
			}).bind("keydown", function(e) {
				if(e.keyCode == 13) {
					self._afterEdit(target, nodeEl);
					return false;
				} else {
					if(e.keyCode == 27) {
						self._cancelEdit(target, nodeEl);
						return false;
					}
				}
			}).bind("blur", function(e) {
				e.stopPropagation();
				self._afterEdit(target, nodeEl);
			});
		},
		_cancelEdit : function (target, nodeEl){
			var opts = $.data(target, "tree").options;
			$(nodeEl).css("position", "");
			$(nodeEl).find("input.tree-editor").remove();
			var pNode = this._getParentNode(target, nodeEl);
			this._update(target, pNode);
			this._trigger('onCancelEdit', null, pNode);
			// opts.onCancelEdit.call(target, pNode);
		},
		_afterEdit : function (target, nodeEl){
			var opts = $.data(target, "tree").options;
			$(nodeEl).css("position", "");
			var editor = $(nodeEl).find("input.tree-editor");
			var val = editor.val();
			editor.remove();
			var pNode = this._getParentNode(target, nodeEl);
			pNode.text = val;
			this._update(target, pNode);
			this._trigger('onAfterEdit', null, pNode);
			// opts.onAfterEdit.call(target, pNode);
		},
		_update : function (target, param){
			var tt = $(param.target);
			var node = $.data(param.target, "tree-node");
			if(node.iconCls) {
				tt.find(".tree-icon").removeClass(node.iconCls);
			}
			$.extend(node, param);
			$.data(param.target, "tree-node", node);
			tt.attr("node-id", node.id);
			tt.find(".tree-title").html(node.text);
			if(node.iconCls) {
				tt.find(".tree-icon").addClass(node.iconCls);
			}
			var ck = tt.find(".tree-checkbox");
			ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
			if(node.checked) {
				this._checkNode(target, param.target, true);
			} else {
				this._checkNode(target, param.target, false);
			}
		},
		_removeNode : function (target, node){
			var prevNode = this._getPrevNode(target, node);
			var pNode = $(node);
			var li = pNode.parent();
			var ul = li.parent();
			li.remove();
			if(ul.children("li").length == 0) {
				var pNode = ul.prev();
				pNode.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
				pNode.find(".tree-hit").remove();
				$("<span class=\"tree-indent\"></span>").prependTo(pNode);
				if(ul[0] != target) {
					ul.remove();
				}
			}
			if(prevNode) {
				this._appendCheckNode(target, prevNode.target);
			}
			this._joinNode(target, target);
		},
		_insertNode : function (target, param){
			var ref = param.before || param.after;
			var node = this._getPrevNode(target, ref);
			var li;
			if(node) {
				this._appendNode(target, {
					parent : node.target,
					data : [param.data]
				});
				li = $(node.target).next().children("li:last");
			} else {
				this._appendNode(target, {
					parent : null,
					data : [param.data]
				});
				li = $(target).children("li:last");
			}
			if(param.before) {
				li.insertBefore($(ref).parent());
			} else {
				li.insertAfter($(ref).parent());
			}
		},
		_appendNode : function (target, param){
			var parent = $(param.parent);
			var ul;
			if(parent.length == 0) {
				ul = $(target);
			} else {
				ul = parent.next();
				if(ul.length == 0) {
					ul = $("<ul></ul>").insertAfter(parent);
				}
			}
			if(param.data && param.data.length) {
				var tree = parent.find("span.tree-icon");
				if(tree.hasClass("tree-file")) {
					tree.removeClass("tree-file").addClass("tree-folder");
					var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(tree);
					if(hit.prev().length) {
						hit.prev().remove();
					}
				}
			}
			this._loadData(target, ul[0], param.data, true);
			this._appendCheckNode(target, ul.prev());
		},
		_appendCheckNode : function (target, node){
			var self = this;
			var opts = $.data(target, "tree").options;
			var pNode = $(node);
			if(self._isTreeHit(target, node)) {
				var ck = pNode.find(".tree-checkbox");
				if(ck.length) {
					if(ck.hasClass("tree-checkbox1")) {
						self._checkNode(target, node, true);
					} else {
						self._checkNode(target, node, false);
					}
				} else {
					if(opts.onlyLeafCheck) {
						$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(pNode.find(".tree-title"));
						self._bindEvents(target);
					}
				}
			} else {
				var ck = pNode.find(".tree-checkbox");
				if(opts.onlyLeafCheck) {
					ck.remove();
				} else {
					if(ck.hasClass("tree-checkbox1")) {
						self._checkNode(target, node, true);
					} else {
						if(ck.hasClass("tree-checkbox2")) {
							var nodeCheck1 = true;
							var nodeCheck2 = true;
							var children = self._getChildren(target, node);
							for(var i = 0; i < children.length; i++) {
								if(children[i].checked) {
									nodeCheck2 = false;
								} else {
									nodeCheck1 = false;
								}
							}
							if(nodeCheck1) {
								self._checkNode(target, node, true);
							}
							if(nodeCheck2) {
								self._checkNode(target, node, false);
							}
						}
					}
				}
			}
		},
		_expandTo : function (target, node){
			var result = [];
			var p = this._getPrevNode(target, node);
			while(p) {
				result.unshift(p);
				p = this._getPrevNode(target, p.target);
			}
			for(var i = 0; i < result.length; i++) {
				this._expandNode(target, result[i].target);
			}
		},
		_expandAll : function (target, node){
			var children = this._getChildren(target, node);
			if(node) {
				children.unshift(this._getParentNode(target, node));
			}
			for(var i = 0; i < children.length; i++) {
				this._expandNode(target, children[i].target);
			}
		},
		_collapseAll : function (target, node){
			var children = this._getChildren(target, node);
			if(node) {
				children.unshift(this._getParentNode(target, node));
			}
			for(var i = 0; i < children.length; i++) {
				this._collapseNode(target, children[i].target);
			}
		},
		_find : function (target, id){
			var treeNode = $(target).find("div.tree-node[node-id=" + id + "]");
			if(treeNode.length) {
				return this._getParentNode(target, treeNode[0]);
			} else {
				return null;
			}
		},
		_getChecked : function (target){
			var result = [];
			var self = this;
			$(target).find(".tree-checkbox1").each(function() {
				var parent = $(this).parent();
				result.push(self._getParentNode(target, parent[0]));
			});
			return result;
		},
		_getChildren : function (target, thead){
			var self = this;
			var result = [];
			if(thead) {
				setNode($(thead));
			} else {
				var nodeAttr = self._getLiNode(target);
				for(var i = 0; i < nodeAttr.length; i++) {
					result.push(nodeAttr[i]);
					setNode($(nodeAttr[i].target));
				}
			}
			function setNode(that) {
				that.next().find("div.tree-node").each(function() {
					result.push(self._getParentNode(target, this));
				});
			};
			return result;
		},
		_getRoot : function (target){
			var nodeAttr = this._getLiNode(target);
			if(nodeAttr.length) {
				return nodeAttr[0];
			} else {
				return null;
			}
		},
		_getLiNode : function (target){
			var result = [];
			var self = this;
			$(target).children("li").each(function() {
				var treeNode = $(this).children("div.tree-node");
				result.push(self._getParentNode(target, treeNode[0]));
			});
			return result;
		},
		_getData : function (target, thead){
			var self = this;
			function pushData(aa, ul) {
				ul.children("li").each(function() {
					var treeNode = $(this).children("div.tree-node");
					var pNode = self._getParentNode(target, treeNode[0]);
					var sub = $(this).children("ul");
					if(sub.length) {
						pNode.children = [];
						self._getData(pNode.children, sub);
					}
					aa.push(pNode);
				});
			};
			if(thead) {
				var node = self._getParentNode(target, thead);
				node.children = [];
				pushData(node.children, $(thead).next());
				return node;
			} else {
				return null;
			}
		},
		
		
		/**
		 * 初始化函数 
		 */
		_init : function (){
			var self = this,
				ele  = self.element;
			var state = $.data(this.element, "tree");
			var opts;
			if(state) {
				opts = $.extend(state.options, this.options);
				state.options = opts;
			} else {
				opts = $.extend({}, this.options);
				$.data(ele, "tree", {
					options : opts,
					tree : self._addStyle(ele)
				});
				var treeAttr = self._getTreeAttr(ele);
				if(treeAttr.length && !opts.data) {
					opts.data = treeAttr;
				}
			}
			if(opts.lines) {
				ele.addClass("tree-lines");
			}
			if(opts.data) {
				self._loadData(ele, ele, opts.data);
			} else {
				if(opts.dnd) {
					// TODO 拖动功能未实现
					//self._draggableNode(ele);
				} else {
					self._disableDrag(ele);
				}
			}
			self._load(ele, ele);
		},
		/**
		 * 添加样式，返回tree对象 
 		 * @param {Object} target
		 */
		_addStyle : function (target){
			return $(target).addClass('tree');
		},
		/**
		 * 得到所有的li元素集合  
 		 * @param {Object} target
		 */
		_getTreeAttr : function (target){
			var result = [];
			getTreeLi(result, $(target));
			function getTreeLi(aa, thead) {
				thead.children("li").each(function() {
					var that = $(this);
					var attr = {};
					attr.text = that.children("span").html();
					if(!attr.text) {
						attr.text = that.html();
					}
					attr.id = that.attr("id");
					attr.iconCls = that.attr("iconCls") || that.attr("icon");
					attr.checked = that.attr("checked") == "true";
					attr.state = that.attr("state") || "open";
					var ul = that.children("ul");
					if(ul.length) {
						attr.children = [];
						getTreeLi(attr.children, ul);
					}
					aa.push(attr);
				});
			};
			return result;
		},
		/**
		 * 拖动节点 
		 */
		_draggableNode : function (target){
			var self = this;
			var opts = $.data(target, "tree").options;
			var tree = $.data(target, "tree").tree;
			tree.find("div.tree-node").draggable({
				disabled : false,
				revert : true,
				cursor : "pointer",
				delay  : 15,
				// helper : function(target) {	
					// var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
					// p.html($(target).find(".tree-title").html());
					// p.hide();
					// return p;
				// },
				// deltaX : 15,
				// deltaY : 15,
				create : function(e) {
					if(e.which != 1) {
						return false;
					}
					$(this).next("ul").find("div.tree-node").droppable({
						accept : "no-accept"
					});
					var indent = $(this).find("span.tree-indent");
					if(indent.length) {
						e.data.startLeft += indent.length * indent.width();
					}
				},
				start : function() {
					// $(this).draggable("proxy").css({
						// left : -10000,
						// top : -10000
					// });
				},
				drag : function(e) {
					// var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
					// var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
					// if(d > 3) {
						// $(this).draggable("proxy").show();
					// }
					// this.pageY = e.pageY;
				},
				stop : function() {
					// $(this).next("ul").find("div.tree-node").droppable({
						// accept : "div.tree-node"
					// });
				}
			}).droppable({
				accept : "div.tree-node",
				over : function(e, ui) {
					var pageY = ui.pageY;
					var top = $(this).offset().top;
					var height = top + $(this).outerHeight();
					$(ui).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
					$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
					if(pageY > top + (height - top) / 2) {
						if(height - pageY < 5) {
							$(this).addClass("tree-node-bottom");
						} else {
							$(this).addClass("tree-node-append");
						}
					} else {
						if(pageY - top < 5) {
							$(this).addClass("tree-node-top");
						} else {
							$(this).addClass("tree-node-append");
						}
					}
				},
				out : function(e, ui) {
					$(ui).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
					$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
				},
				drop : function(e, ui) {
					var that = this;
					var append, insert;
					if($(this).hasClass("tree-node-append")) {
						append = appendNode;
					} else {
						append = insertNode;
						insert = $(this).hasClass("tree-node-top") ? "top" : "bottom";
					}
					setTimeout(function() {
						append(ui, that, insert);
					}, 0);
					$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
				}
			});
			function appendNode(thead, node) {
				var self = this;
				if(self._getParentNode(target, node).state == "closed") {
					self._expandNode(target, node, function() {
						appendDrop();
					});
				} else {
					appendDrop();
				}
				function appendDrop() {
					var pop = $(target).tree("pop", thead);
					$(target).tree("append", {
						parent : node,
						data : [pop]
					});
					self._trigger('onDrop', null,{
						target : node,
						source : pop,
						point  : 'append'
					});
				};
			};
			function insertNode(thead, node, pos) {
				var param = {};
				if(pos == "top") {
					param.before = node;
				} else {
					param.after = node;
				}
				var pop = $(target).tree("pop", thead);
				param.data = pop;
				$(target).tree("insert", param);
				self._trigger('onDrop', null,{
						target : node,
						source : pop,
						point  : pos
					});
			};
		},
		/**
		 * 禁用拖动 
		 */
		_disableDrag : function (target){
			var treeNode = $(target).find("div.tree-node");
			treeNode.draggable({
				disabled : true
			});
			treeNode.css("cursor", "pointer");
		},
		_joinNode : function (target, ul, isClear) {
			var self = this;
			var opts = $.data(target, "tree").options;
			if(!opts.lines) {
				return;
			}
			if(!isClear) {
				isClear = true;
				$(target).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
				$(target).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
				var roots = $(target).tree("getRoots");
				if(roots.length > 1) {
					$(roots[0].target).addClass("tree-root-first");
				} else {
					$(roots[0].target).addClass("tree-root-one");
				}
			}
			$(ul).children("li").each(function() {
				var treeNode = $(this).children("div.tree-node");
				var ul = treeNode.next("ul");
				if(ul.length) {
					if($(this).next().length) {
						addTreeLine(treeNode);
					}
					self._joinNode(target, ul, isClear);
				} else {
					addTreeJoin(treeNode);
				}
			});
			var node = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
			node.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
			function addTreeJoin(thead) {
				var icon = thead.find("span.tree-icon");
				icon.prev("span.tree-indent").addClass("tree-join");
			};
			function addTreeLine(thead) {
				var len = thead.find("span.tree-indent, span.tree-hit").length;
				thead.next().find("div.tree-node").each(function() {
					$(this).children("span:eq(" + (len - 1) + ")").addClass("tree-line");
				});
			};
		},
		/**
		 * 加载数据 
		 * @param {Object} target
		 * @param {Object} ul
		 * @param {Object} data
		 * @param {Object} isEmpty
		 */
		_loadData : function (target, ul, data, isEmpty) {
			var self = this;
			var opts = $.data(target, "tree").options;
			data = opts.loadFilter.call(target, data, $(ul).prev("div.tree-node")[0]);
			if(!isEmpty) {
				$(ul).empty();
			}
			var nodeAttr = [];
			var treeLen = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
			wrapNode(ul, data, treeLen);
			self._bindEvents(target);
			if(opts.dnd) {
				// TODO 拖动功能未实现
				//self._draggableNode(target);
			} else {
				self._disableDrag(target);
			}
			for(var i = 0; i < nodeAttr.length; i++) {
				self._checkNode(target, nodeAttr[i], true);
			}
			setTimeout(function() {
				self._joinNode(target, target);
			}, 0);
			var parentNode = null;
			if(target != ul) {
				var prev = $(ul).prev();
				parentNode = self._getParentNode(target, prev[0]);
			}
			self._trigger('onLoadSuccess', null, {
				node : parentNode,
				data : data
			});
			function wrapNode(ul, data, treeLen) {
				for(var i = 0; i < data.length; i++) {
					var li = $("<li></li>").appendTo(ul);
					var options = data[i];
					if(options.state != "open" && options.state != "closed") {
						options.state = "open";
					}
					var node = $("<div class=\"tree-node\"></div>").appendTo(li);
					node.attr("node-id", options.id);
					$.data(node[0], "tree-node", {
						id : options.id,
						text : options.text,
						iconCls : options.iconCls,
						attributes : options.attributes
					});
					$("<span class=\"tree-title\"></span>").html(options.text).appendTo(node);
					if(opts.checkbox) {
						if(opts.onlyLeafCheck) {
							if(options.state == "open" && (!options.children || !options.children.length)) {
								if(options.checked) {
									$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(node);
								} else {
									$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(node);
								}
							}
						} else {
							if(options.checked) {
								$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(node);
								nodeAttr.push(node[0]);
							} else {
								$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(node);
							}
						}
					}
					if(options.children && options.children.length) {
						var tempul = $("<ul></ul>").appendTo(li);
						if(options.state == "open") {
							$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(node);
						} else {
							$("<span class=\"tree-icon tree-folder\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(node);
							tempul.css("display", "none");
						}
						wrapNode(tempul, options.children, treeLen + 1);
					} else {
						if(options.state == "closed") {
							$("<span class=\"tree-icon tree-folder\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(node);
						} else {
							$("<span class=\"tree-icon tree-file\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-indent\"></span>").prependTo(node);
						}
					}
					for(var j = 0; j < treeLen; j++) {
						$("<span class=\"tree-indent\"></span>").prependTo(node);
					}
				}
			};
		},
		/**
		 * 得到选中的节点 
		 */
		_nodeSelected : function (target){
			var selected = $(target).find("div.tree-node-selected");
			if(selected.length) {
				return this._getParentNode(target, selected[0]);
			} else {
				return null;
			}
		},
		/**
		 * 绑定事件 
 		 * @param {Object} target
		 */
		_bindEvents : function (target){
			var self = this;
			var opts = $.data(target, "tree").options;
			var tree = $.data(target, "tree").tree;
			$("div.tree-node", tree).unbind(".tree").bind("dblclick.tree", function(event) {
				self._selectNode(target, this);
				self._trigger('onDblClick', event, self._nodeSelected(target));
			}).bind("click.tree", function(event) {
				self._selectNode(target, this);
				self._trigger('onClick', event, self._nodeSelected(target));
			}).bind("mouseenter.tree", function() {
				$(this).addClass("tree-node-hover");
				return false;
			}).bind("mouseleave.tree", function() {
				$(this).removeClass("tree-node-hover");
				return false;
			}).bind("contextmenu.tree", function(e) {
				self._trigger('onContextMenu', e, self._getParentNode(target, this));
			});
			$("span.tree-hit", tree).unbind(".tree").bind("click.tree", function() {
				var parent = $(this).parent();
				self._toggleNode(target, parent[0]);
				return false;
			}).bind("mouseenter.tree", function() {
				if($(this).hasClass("tree-expanded")) {
					$(this).addClass("tree-expanded-hover");
				} else {
					$(this).addClass("tree-collapsed-hover");
				}
			}).bind("mouseleave.tree", function() {
				if($(this).hasClass("tree-expanded")) {
					$(this).removeClass("tree-expanded-hover");
				} else {
					$(this).removeClass("tree-collapsed-hover");
				}
			}).bind("mousedown.tree", function() {
				return false;
			});
			$("span.tree-checkbox", tree).unbind(".tree").bind("click.tree", function() {
				var parent = $(this).parent();
				self._checkNode(target, parent[0], !$(this).hasClass("tree-checkbox1"));
				return false;
			}).bind("mousedown.tree", function() {
				return false;
			});
		},
		/**
		 * 选中节点 
		 */
		_checkNode : function (target, node, isCheck){
			var self = this;
			var opts = $.data(target, "tree").options;
			if(!opts.checkbox) {
				return;
			}
			var pNode = self._getParentNode(target, node);
			
			self._trigger('onBeforeCheck', null, {
				node : pNode,
				checked : isCheck
			});
			
			var cNode = $(node);
			var ck = cNode.find(".tree-checkbox");
			ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
			if(isCheck) {
				ck.addClass("tree-checkbox1");
			} else {
				ck.addClass("tree-checkbox0");
			}
			if(opts.cascadeCheck) {
				addCheckStyle(cNode);
				setParentCheckbox(cNode);
			}
			
			self._trigger('onCheck', null, {
				node : pNode,
				checked : isCheck
			});
			function setParentCheckbox(thead) {
				var treeCk = thead.next().find(".tree-checkbox");
				treeCk.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
				if(thead.find(".tree-checkbox").hasClass("tree-checkbox1")) {
					treeCk.addClass("tree-checkbox1");
				} else {
					treeCk.addClass("tree-checkbox0");
				}
			};
			function addCheckStyle(thead) {
				var treeNode = self._getPrevNode(target, thead[0]);
				if(treeNode) {
					var ck = $(treeNode.target).find(".tree-checkbox");
					ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
					if(isAllSelected(thead)) {
						ck.addClass("tree-checkbox1");
					} else {
						if(isAllNull(thead)) {
							ck.addClass("tree-checkbox0");
						} else {
							ck.addClass("tree-checkbox2");
						}
					}
					addCheckStyle($(treeNode.target));
				}
				function isAllSelected(n) {
					var ck = n.find(".tree-checkbox");
					if(ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
						return false;
					}
					var b = true;
					n.parent().siblings().each(function() {
						if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
							b = false;
						}
					});
					return b;
				};
				function isAllNull(n) {
					var ck = n.find(".tree-checkbox");
					if(ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
						return false;
					}
					var b = true;
					n.parent().siblings().each(function() {
						if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
							b = false;
						}
					});
					return b;
				};
			};
		},
		_getPrevNode : function (target, node){
			//////alert(('node:'+$(node).html());
			////alert(('target:'+$(target).html());
			var ul = $(node).parent().parent();
			////alert(('ul:'+ul.html());
			// TODO change equals
			if($(ul[0]).attr('id') == $(target).attr('id')) {
				return null;
			} else {
				////alert(('mm:'+ul.prev()[0]);
				return this._getParentNode(target, ul.prev()[0]);
			}
		},
		/**
		 * 获取父元素节点 
		 * @param {Object} target
		 * @param {Object} thead
		 */
		_getParentNode : function (tt, thead){
			var self = this;
			// ////alert((thead);
			var node = $.extend({}, $.data(thead, "tree-node"), {
				target : thead,
				checked : $(thead).find(".tree-checkbox").hasClass("tree-checkbox1")
			});
			// ////alert(('aa');
			if(!self._isTreeHit(tt, thead)) {
				node.state = $(thead).find(".tree-hit").hasClass("tree-expanded") ? "open" : "closed";
			}
			return node;
		},
		/**
		 * 收缩节点
		 */
		_collapseNode : function (target, node){
			var self = this;
			var opts = $.data(target, "tree").options;
			var hit = $(node).children("span.tree-hit");
			if(hit.length == 0) {
				return;
			}
			if(hit.hasClass("tree-collapsed")) {
				return;
			}
			var parentNode = self._getParentNode(target, node);
			if(self._trigger('onBeforeCollapse', null, parentNode) == false){
				return;
			}

			hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
			hit.next().removeClass("tree-folder-open");
			var ul = $(node).next();
			if(opts.animate) {
				ul.slideUp("normal", function() {
					self._trigger('onCollapse', null, parentNode);
					//opts.onCollapse.call(target, parentNode);
				});
			} else {
				ul.css("display", "none");
				self._trigger('onCollapse', null, parentNode);
				//opts.onCollapse.call(target, parentNode);
			}
		},
		/**
		 * 展开节点 
		 */
		_expandNode : function (target, node, callback){
			var self = this;
			var opts = $.data(target, "tree").options;
			var hit = $(node).children("span.tree-hit");
			if(hit.length == 0) {
				return;
			}
			if(hit.hasClass("tree-expanded")) {
				return;
			}
			var parentNode = self._getParentNode(target, node);
			if(self._trigger('onBeforeExpand', null, parentNode) == false){
				return;
			}
			hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
			hit.next().addClass("tree-folder-open");
			var ul = $(node).next();
			if(ul.length) {
				if(opts.animate) {
					ul.slideDown("normal", function() {
						self._trigger('onExpand', null, parentNode);
						if(callback) {
							callback();
						}
					});
				} else {
					ul.css("display", "block");
					self._trigger('onExpand', null, parentNode);
					if(callback) {
						callback();
					}
				}
			} else {
				var ul = $("<ul style=\"display:none\"></ul>").insertAfter(node);
				self._load(target, ul[0], {
					id : parentNode.id
				}, function() {
					if(ul.is(":empty")) {
						ul.remove();
					}
					if(opts.animate) {
						ul.slideDown("normal", function() {
							self._trigger('onExpand', null, parentNode);
							if(callback) {
								callback();
							}
						});
					} else {
						ul.css("display", "block");
						self._trigger('onExpand', null, parentNode);
						if(callback) {
							callback();
						}
					}
				});
			}
		},
		/**
		 * 加载数据 
		 */
		_load : function (target, ul, data, callback) {
			var self = this;
			var opts = $.data(target, "tree").options;
			data = data || {};
			var parentNode = null;
			if(target != ul) {
				var prev = $(ul).prev();
				parentNode = self._getParentNode(target, prev[0]);
			}
			if(self._trigger('onBeforeLoad', null, {node: parentNode, param:data}) == false){
				return;
			}
			var folder = $(ul).prev().children("span.tree-folder");
			folder.addClass("tree-loading");
			var loader = opts.loader.call(target, data, function(param) {
				folder.removeClass("tree-loading");
				//////alert(('xxxfas');
				self._loadData(target, ul, param);
				if(callback) {
					callback();
				}
			}, function() {
				folder.removeClass("tree-loading");
				self._trigger('onLoadError', null, arguments);
				if(callback) {
					callback();
				}
			});
			
			if(loader == false) {
				folder.removeClass("tree-loading");
			}
		},
		/**
		 * 收缩节点 或展开节点
		 */
		_toggleNode : function (target, node){
			var hit = $(node).children("span.tree-hit");
			if(hit.length == 0) {
				return;
			}
			if(hit.hasClass("tree-expanded")) {
				this._collapseNode(target, node);
			} else {
				this._expandNode(target, node);
			}
		},
		/**
		 * 选择节点 
 		 * @param {Object} target
		 */
		_selectNode : function (target, thead){
			var self = this;
			var opts = $.data(target, "tree").options;
			var node = self._getParentNode(target, thead);
			if(self._trigger('onBeforeSelect', null, node) == false){
				return;
			}
			$("div.tree-node-selected", target).removeClass("tree-node-selected");
			$(thead).addClass("tree-node-selected");
			self._trigger('onSelect', null, node);
		},
		/**
		 * tree是否自适应大小 
		 * @param {Object} target
		 * @param {Object} thead
		 */
		_isTreeHit : function (target, thead){
			var hit = $(thead).children("span.tree-hit");
			return hit.length == 0;
		}
    });
})(jQuery);
