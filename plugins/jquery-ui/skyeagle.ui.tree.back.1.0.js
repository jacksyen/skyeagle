/**
 * @auth 	 	 jacksyen
 * @created 	 2012.07.30 
 * @description  基于jquery UI、easyUI扩展的tree组件
 */
(function($) {
	
    $.widget("ui.tree" , {
		options : {
		   	url : null,
			method : "get",
			animate : false,
			checkbox : false,
			cascadeCheck : true,
			onlyLeafCheck : false,
			lines : false,
			dnd : false,
			data : null,
			loader : function(param, callback, errors) {
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
						callback(data);
					},
					error : function() {
						errors.apply(this.element, arguments);
					}
				});
			},
			loadFilter : function(data, _100) {
				return data;
			}
		},
		getOptions : function (){
			return $.data(this.element, "tree").options;
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
				// if(opts.dnd) {
					// self._draggableNode(ele);
				// } else {
					// self._disableDrag(ele);
				// }
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
				// proxy : function(_19) {	
					// var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
					// p.html($(_19).find(".tree-title").html());
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
					$(this).draggable("proxy").css({
						left : -10000,
						top : -10000
					});
				},
				drag : function(e) {
					var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
					var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
					if(d > 3) {
						$(this).draggable("proxy").show();
					}
					this.pageY = e.pageY;
				},
				stop : function() {
					$(this).next("ul").find("div.tree-node").droppable({
						accept : "div.tree-node"
					});
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
					//opts.onDrop.call(target, node, pop, "append");
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
				//opts.onDrop.call(target, node, pop, pos);
			};
		},
		/**
		 * 禁用拖动 
		 */
		_disableDrag : function (target){
			var treeNode = $(target).find("div.tree-node");
			//treeNode.draggable("disable");
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
				self._draggableNode(target);
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
			//opts.onLoadSuccess.call(target, parentNode, data);
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
			$("div.tree-node", tree).unbind(".tree").bind("dblclick.tree", function() {
				self._selectNode(target, this);
				//opts.onDblClick.call(target, self._nodeSelected(target));
			}).bind("click.tree", function() {
				self._selectNode(target, this);
				//opts.onClick.call(target, self._nodeSelected(target));
			}).bind("mouseenter.tree", function() {
				$(this).addClass("tree-node-hover");
				return false;
			}).bind("mouseleave.tree", function() {
				$(this).removeClass("tree-node-hover");
				return false;
			}).bind("contextmenu.tree", function(e) {
				//opts.onContextMenu.call(target, e, self._getParentNode(target, this));
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
			var pNode = self._getParentNode(target, node);
			//opts.onCheck.call(target, pNode, isCheck);
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
				// TODO a type undefined
				// alert('thead[0]:' + thead[0]);
				alert(thead.html());
				var treeNode = self._getPrevNode(target, thead[0]);
				alert('pass');
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
					//alert($(treeNode.target).html());
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
			//alert('node:'+$(node).html());
			alert('target:'+$(target).html());
			var ul = $(node).parent().parent();
			alert('ul:'+ul.html());
			if(ul[0] == target) {
				return null;
			} else {
				alert('mm:'+ul.prev()[0]);
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
			// alert(thead);
			var node = $.extend({}, $.data(thead, "tree-node"), {
				target : thead,
				checked : $(thead).find(".tree-checkbox").hasClass("tree-checkbox1")
			});
			// alert('aa');
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
			// if(opts.onBeforeCollapse.call(target, parentNode) == false) {
				// return;
			// }
			
			hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
			hit.next().removeClass("tree-folder-open");
			var ul = $(node).next();
			if(opts.animate) {
				ul.slideUp("normal", function() {
					//opts.onCollapse.call(target, parentNode);
				});
			} else {
				ul.css("display", "none");
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
			var callback = self._getParentNode(target, node);
			// if(opts.onBeforeExpand.call(target, callback) == false) {
				// return;
			// }
			hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
			hit.next().addClass("tree-folder-open");
			var ul = $(node).next();
			if(ul.length) {
				if(opts.animate) {
					ul.slideDown("normal", function() {
						//opts.onExpand.call(target, callback);
						if(callback) {
							callback();
						}
					});
				} else {
					ul.css("display", "block");
					//opts.onExpand.call(target, callback);
					if(callback) {
						callback();
					}
				}
			} else {
				var ul = $("<ul style=\"display:none\"></ul>").insertAfter(node);
				self._load(target, ul[0], {
					id : callback.id
				}, function() {
					if(ul.is(":empty")) {
						ul.remove();
					}
					if(opts.animate) {
						ul.slideDown("normal", function() {
							//opts.onExpand.call(target, callback);
							if(callback) {
								callback();
							}
						});
					} else {
						ul.css("display", "block");
						//opts.onExpand.call(target, callback);
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
			
			// TODO onBeforeLoad
			// if(opts.onBeforeLoad.call(target, parentNode, data) == false) {
				// return;
			// }
			var folder = $(ul).prev().children("span.tree-folder");
			folder.addClass("tree-loading");
			var loader = opts.loader.call(target, data, function(param) {
				folder.removeClass("tree-loading");
				//alert('xxxfas');
				self._loadData(target, ul, param);
				if(callback) {
					callback();
				}
			}, function() {
				folder.removeClass("tree-loading");
				//opts.onLoadError.apply(target, arguments);
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
			// if(opts.onBeforeSelect.call(target, node) == false) {
				// return;
			// }
			$("div.tree-node-selected", target).removeClass("tree-node-selected");
			$(thead).addClass("tree-node-selected");
			//opts.onSelect.call(target, node);
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
