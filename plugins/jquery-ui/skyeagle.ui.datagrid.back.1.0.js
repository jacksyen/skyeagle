/**
 * @auth 	 	 jacksyen
 * @created 	 2012.07.16 
 * @description  基于jquery UI、easyUI扩展的datagrid组件
 */
(function($) {
	$.fn._outerWidth = function(width) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(width);
			} else {
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
    
    /**
     * 编辑列属性信息 
     */
    var _editors = {
		text : {
			init : function(container, options) {
				var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
				return input;
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target , value) {
				$(target).val(value);
			},
			resize : function(target , width) {
				$(target)._outerWidth(width);
			}
		},
		textarea : {
			init : function(container, options) {
				var textarea = $('<textarea class="datagrid-editable-input"></textarea>').appendTo(container);
				return textarea;
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target , value) {
				$(target).val(value);
			},
			resize : function(target , width) {
				$(target)._outerWidth(width);
			}
		},
		checkbox : {
			init : function(container, options) {
				var input = $('<input type="checkbox">').appendTo(container);
				input.val(options.on);
				input.attr("offval", options.off);
				return input;
			},
			getValue : function(target) {
				if($(target).is(":checked")) {
					return $(target).val();
				} else {
					return $(target).attr("offval");
				}
			},
			setValue : function(target, value) {
				var result = false;
				if($(target).val() == value) {
					result = true;
				}
				$.fn.prop ? $(target).prop("checked", result) : $(target).attr("checked", result);
			}
		},
		numberbox : {
			init : function(container, options) {
				var input = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(container);
				input.numberbox(options);
				return input;
			},
			destroy : function(target) {
				$(target).numberbox("destroy");
			},
			getValue : function(target) {
				return $(target).numberbox("getValue");
			},
			setValue : function(target, value) {
				$(target).numberbox("setValue", value);
			},
			resize : function(target, width) {
				$(target)._outerWidth(width);
			}
		},
		validatebox : {
			init : function(target, options) {
				var input = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(target);
				input.validatebox(options);
				return input;
			},
			destroy : function(target) {
				$(target).validatebox("destroy");
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target, value) {
				$(target).val(value);
			},
			resize : function(target, width) {
				$(target)._outerWidth(width);
			}
		},
		datebox : {
			init : function(target, options) {
				var input = $("<input type=\"text\">").appendTo(target);
				input.datebox(options);
				return input;
			},
			destroy : function(target) {
				$(target).datebox("destroy");
			},
			getValue : function(target) {
				return $(target).datebox("getValue");
			},
			setValue : function(target, value) {
				$(target).datebox("setValue", value);
			},
			resize : function(target, width) {
				$(target).datebox("resize", width);
			}
		},
		combobox : {
			init : function(target, options) {
				var input = $("<input type=\"text\">").appendTo(target);
				input.combobox(options || {});
				return input;
			},
			destroy : function(target) {
				$(target).combobox("destroy");
			},
			getValue : function(target) {
				return $(target).combobox("getValue");
			},
			setValue : function(target, value) {
				$(target).combobox("setValue", value);
			},
			resize : function(target, width) {
				$(target).combobox("resize", width);
			}
		},
		combotree : {
			init : function(target, options) {
				var input = $("<input type=\"text\">").appendTo(target);
				input.combotree(options);
				return input;
			},
			destroy : function(target) {
				$(target).combotree("destroy");
			},
			getValue : function(target) {
				return $(target).combotree("getValue");
			},
			setValue : function(target, value) {
				$(target).combotree("setValue", value);
			},
			resize : function(target, width) {
				$(target).combotree("resize", width);
			}
		}
	};
    
    $.widget("ui.datagrid" , {
		options : {
			// 固定列
		   	frozenColumns : undefined,
		   	// 数据表格列
			columns : undefined,
			// 设置为true将自动使列适应表格宽度以防止出现水平滚动
			fitColumns : false,
			// 自动填充行高度
			autoRowHeight : true,
			// 工具栏
			toolbar : null,
			// 设置为true将交替显示行背景 
			striped : false,
			// 请求远程数据的方法类型 
			method : "get",
			// 设置为true,当数据长度超出列宽度将会自动截取
			nowrap : true,
			// 表名改列是唯一列
			idField : null,
			// 一个用以从远程站点请求数据的超链接地址
			url : null,
			// 载入数据时，显示的加载信息
			loadMsg : "请稍候，正在加载中...",
			// 是否显示行数，默认为false 
			rownumbers : false,
			// 设置为true将只允许选择一行
			singleSelect : false,
			// 设置为true将在数据表格底部显示分页工具栏
			pagination : false,
			// 当设置分页属性时，初始化分页码
			pageNumber : 1,
			// 当设置分页属性时，初始化每页记录数
			pageSize : 10,
			// 当设置分页属性时，初始化每页记录数列表
			pageList : [10, 20, 30, 40, 50],
			// 请求远程数据参数
			queryParams : {},
			// 当数据表格初始化时以哪一列来排序
			sortName : null,
			// 定义排序顺序，可以是'asc'或者'desc'（正序或者倒序）
			sortOrder : "asc",
			// 定义是否通过远程服务器对数据排序
			remoteSort : true,
			// 定义是否显示行头（标题行）
			showHeader : true,
			// 定义是否显示行底（如果是做统计表格，这里可以显示总计等）
			showFooter : false,
			// 滚动条大小	
			scrollbarSize : 18,
			/**
			 * 返回样式
			 * @param index 行索引，从0开始.
			 * @param row   对应于该行记录的对象。
			 */
			rowStyler : function(index, row) {
			},
			/**
			 * 如何从远程服务器加载数据，返回false可以中止 
			 */
			loader : function(lData, method, callback) {
				var opts = $(this).datagrid("getOptions");
				if(!opts.url) {
					return false;
				}
				$.ajax({
					type : opts.method,
					url : opts.url,
					data : lData,
					dataType : "json",
					success : function(data) {
						method(data);
					},
					error : function() {
						callback.apply(this, arguments);
					}
				});
			},
			/**
			 * 载入过滤器 
			 */
			loadFilter : function(data) {
				if( typeof data.length == "number" && typeof data.splice == "function") {
					return {
						total : data.length,
						rows : data
					};
				} else {
					return data;
				}
			},
			/**
			 * 编辑视图 
			 */
			editors : _editors,
			/**
			 * 定义数据表格的视图 
			 */
			view : {
				render : function(target, view, field) {
					var opts = $.data(target, "datagrid").options;
					var rows = $.data(target, "datagrid").data.rows;
					var columnAttr = $(target).datagrid("getColumnFields", field);
					if(field) {
						if(!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
							return;
						}
					}
					var table = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
					for(var i = 0; i < rows.length; i++) {
						var cls = (i % 2 && opts.striped) ? "class=\"datagrid-row datagrid-row-alt\"" : "class=\"datagrid-row\"";
						var rowStyler = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : "";
						var styler = rowStyler ? "style=\"" + rowStyler + "\"" : "";
						table.push("<tr datagrid-row-index=\"" + i + "\" " + cls + " " + styler + ">");
						table.push(this.renderRow.call(this, target, columnAttr, field, i, rows[i]));
						table.push("</tr>");
					}
					table.push("</tbody></table>");
					$(view).html(table.join(""));
				},
				renderFooter : function(target, view, field) {
					var opts = $.data(target, "datagrid").options;
					var rows = $.data(target, "datagrid").footer || [];
					var columnAttr = $(target).datagrid("getColumnFields", field);
					var table = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
					for(var i = 0; i < rows.length; i++) {
						table.push("<tr class=\"datagrid-row\" datagrid-row-index=\"" + i + "\">");
						table.push(this.renderRow.call(this, target, columnAttr, field, i, rows[i]));
						table.push("</tr>");
					}
					table.push("</tbody></table>");
					$(view).html(table.join(""));
				},
				renderRow : function(target, thead, columnAttr, field, row) {
					var opts = $.data(target, "datagrid").options;
					var cc = [];
					if(columnAttr && opts.rownumbers) {
						var number = field + 1;
						if(opts.pagination) {
							number += (opts.pageNumber - 1) * opts.pageSize;
						}
						cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + number + "</div></td>");
					}
					for(var i = 0; i < thead.length; i++) {
						var colOpts = thead[i];
						var col = $(target).datagrid("getColumnOption", colOpts);
						if(col) {
							var styler = col.styler ? (col.styler(row[colOpts], row, field) || "") : "";
							var display = col.hidden ? "style=\"display:none;" + styler + "\"" : ( styler ? "style=\"" + styler + "\"" : "");
							cc.push("<td field=\"" + colOpts + "\" " + display + ">");
							var display = "width:" + (col.boxWidth) + "px;";
							display += "text-align:" + (col.align || "left") + ";";
							if(!opts.nowrap) {
								display += "white-space:normal;height:auto;";
							} else {
								if(opts.autoRowHeight) {
									display += "height:auto;";
								}
							}
							cc.push("<div style=\"" + display + "\" ");
							if(col.checkbox) {
								cc.push("class=\"datagrid-cell-check ");
							} else {
								cc.push("class=\"datagrid-cell ");
							}
							cc.push("\">");
							if(col.checkbox) {
								cc.push("<input type=\"checkbox\"/>");
							} else {
								if(col.formatter) {
									cc.push(col.formatter(row[colOpts], row, field));
								} else {
									cc.push(row[colOpts]);
								}
							}
							cc.push("</div>");
							cc.push("</td>");
						}
					}
					return cc.join("");
				},
				refreshRow : function(target, field) {
					var row = {};
					var columnAttr = $(target).datagrid("getColumnFields", true).concat($(target).datagrid("getColumnFields", false));
					for(var i = 0; i < columnAttr.length; i++) {
						row[columnAttr[i]] = undefined;
					}
					var rows = $(target).datagrid("getRows");
					$.extend(row, rows[field]);
					this.updateRow.call(this, target, field, row);
				},
				updateRow : function(target, field, row) {
					var opts = $.data(target, "datagrid").options;
					var rows = $(target).datagrid("getRows");
					var tr = opts.finder.getTr(target, field);
					for(var i in row) {
						rows[field][i] = row[i];
						var td = tr.children("td[field=\"" + i + "\"]");
						var cell = td.find("div.datagrid-cell");
						var col = $(target).datagrid("getColumnOption", i);
						if(col) {
							var styler = col.styler ? col.styler(rows[field][i], rows[field], field) : "";
							td.attr("style", styler || "");
							if(col.hidden) {
								td.hide();
							}
							if(col.formatter) {
								cell.html(col.formatter(rows[field][i], rows[field], field));
							} else {
								cell.html(rows[field][i]);
							}
						}
					}
					var styler = opts.rowStyler ? opts.rowStyler.call(target, field, rows[field]) : "";
					tr.attr("style", styler || "");
					$(target).datagrid("fixRowHeight", field);
				},
				insertRow : function(target, length, row) {
					var opts = $.data(target, "datagrid").options;
					var dc = $.data(target, "datagrid").dc;
					var data = $.data(target, "datagrid").data;
					if(length == undefined || length == null) {
						length = data.rows.length;
					}
					if(length > data.rows.length) {
						length = data.rows.length;
					}
					for(var i = data.rows.length - 1; i >= length; i--) {
						opts.finder.getTr(target, i, "body", 2).attr("datagrid-row-index", i + 1);
						var tr = opts.finder.getTr(target, i, "body", 1).attr("datagrid-row-index", i + 1);
						if(opts.rownumbers) {
							tr.find("div.datagrid-cell-rownumber").html(i + 2);
						}
					}
					var columnAttr = $(target).datagrid("getColumnFields", true);
					var columnAttr2 = $(target).datagrid("getColumnFields", false);
					var tr1 = "<tr class=\"datagrid-row\" datagrid-row-index=\"" + length + "\">" + this.renderRow.call(this, target, columnAttr, true, length, row) + "</tr>";
					var tr2 = "<tr class=\"datagrid-row\" datagrid-row-index=\"" + length + "\">" + this.renderRow.call(this, target, columnAttr2, false, length, row) + "</tr>";
					if(length >= data.rows.length) {
						if(data.rows.length) {
							opts.finder.getTr(target, "", "last", 1).after(tr1);
							opts.finder.getTr(target, "", "last", 2).after(tr2);
						} else {
							dc.body1.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr1 + "</tbody></table>");
							dc.body2.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr2 + "</tbody></table>");
						}
					} else {
						opts.finder.getTr(target, length + 1, "body", 1).before(tr1);
						opts.finder.getTr(target, length + 1, "body", 2).before(tr2);
					}
					data.total += 1;
					data.rows.splice(length, 0, row);
					this.refreshRow.call(this, target, length);
				},
				deleteRow : function(target, field) {
					var opts = $.data(target, "datagrid").options;
					var data = $.data(target, "datagrid").data;
					opts.finder.getTr(target, field).remove();
					for(var i = field + 1; i < data.rows.length; i++) {
						opts.finder.getTr(target, i, "body", 2).attr("datagrid-row-index", i - 1);
						var tr1 = opts.finder.getTr(target, i, "body", 1).attr("datagrid-row-index", i - 1);
						if(opts.rownumbers) {
							tr1.find("div.datagrid-cell-rownumber").html(i);
						}
					}
					data.total -= 1;
					data.rows.splice(field, 1);
				},
				onBeforeRender : function(target, rows) {
				},
				onAfterRender : function(target) {
					var opts = $.data(target, "datagrid").options;
					if(opts.showFooter) {
						var footer = $(target).datagrid("getPanel").find("div.datagrid-footer");
						footer.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
					}
				}
			},
			/**
			 * 当数据载入成功时触发 
			 */
			onLoadSuccess : function (event, data){},
			/**
			 * 数据加载错误事件 
			 */
			onLoadError : function (){},
			/**
			 * 加载数据之前调用 
			 */
			onBeforeLoad : function (event, param){},
			/**
			 * 单击行事件
			 * @param ui.rowIndex 行位置
			 * @param ui.rowData  行数据 
			 */
			onClickRow : function (event, ui){},
			/**
			 * 双击行事件
			 * @param ui.rowIndex 行位置
			 * @param ui.rowData  行数据 
			 */
			onDblClickRow : function (event, ui){},
			/**
			 *  单击单表格事件
			 *  ui.rowIndex 当前点击的行数
			 *  ui.field    当前点击的单元格field值
			 *  ui.value    当前点击的单元格值
			 */
			onClickCell : function (event, ui){},
			/**
			 *  双击单表格事件
			 *  ui.rowIndex 当前点击的行数
			 *  ui.field    当前点击的单元格field值
			 *  ui.value    当前点击的单元格值
			 */
			onDblClickCell : function (event, ui){},
			/**
			 * 排序列事件
			 * @param ui.sort  排序列名称
			 * @param ui.order 以哪种方式排序,desc/asc 
			 */
			onSortColumn : function (event, ui){},
			/**
			 * 当用户调整列宽时触发
			 * @param ui.field  列名称
			 * @param ui.width  列宽度
			 */
			onResizeColumn : function (event, ui){},
			/**
			 *  选择一行事件
			 * 	ui.rowIndex 当前点击的行数
			 *  ui.rowData  当前点击的行数据
			 */
			onSelect : function (event, ui){},
			/**
			 *  取消选择一行事件
			 * 	ui.rowIndex 当前点击的行数
			 *  ui.rowData  当前点击的行数据
			 */
			onUnselect : function (event, ui){},
			/**
			 * 当用户选择所有行时触发
			 * @param ui.rows  所有行内容
			 */
			onSelectAll : function (event, ui){},
			/**
			 * 当用户取消选择所有行时触发 
			 * @param ui.rows  所有行内容
			 */
			onUnselectAll : function (event, ui){},
			/**
			 * 当用户开始编辑一行时触发
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 */
			onBeforeEdit : function (event, ui){},
			/**
			 * 当用户编辑完成时触发，参数如下:
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 * @param ui.changes   被改变的字段内容，对应方式为字段：值。
			 */
			onAfterEdit : function (event, ui){},
			/**
			 * 当用户取消编辑行时触发
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 */
			onCancelEdit : function (event, ui){},
			/**
			 * 当数据表格的列标题被鼠标右键单击时触发
			 * @param field		列标题名称
			 */
			onHeaderContextMenu : function (event, field){},
			/**
			 * 当一行被鼠标右键单击时触发
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 */
			onRowContextMenu : function (event, ui){},
			
			finder : {
				getTr : function(target, index, type, isBody) {
					type = type || "body";
					isBody = isBody || 0;
					var dc = $.data(target, "datagrid").dc;
					var opts = $.data(target, "datagrid").options;
					if(isBody == 0) {
						var tr1 = opts.finder.getTr(target, index, type, 1);
						var tr2 = opts.finder.getTr(target, index, type, 2);
						return tr1.add(tr2);
					} else {
						if(type == "body") {
							return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index=" + index + "]");
						} else {
							if(type == "footer") {
								return (isBody == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index=" + index + "]");
							} else {
								if(type == "selected") {
									return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-selected");
								} else {
									if(type == "last") {
										return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr:last[datagrid-row-index]");
									} else {
										if(type == "allbody") {
											return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]");
										} else {
											if(type == "allfooter") {
												return (isBody == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
											}
										}
									}
								}
							}
						}
					}
				},
				getRow : function(_1ca, _1cb) {
					return $.data(_1ca,"datagrid").data.rows[_1cb];
				}
			}
		},
		/**
		 * 返回属性对象 
		 */
		getOptions : function (){
			var self = this,
				ele  = self.element;
			
			var options = $.data(ele, "datagrid").options;
			var panelOpts = $.data(ele, "datagrid").panel.panel("getOptions");
			var opts = $.extend(options, {
				width : panelOpts.width,
				height : panelOpts.height,
				closed : panelOpts.closed,
				collapsed : panelOpts.collapsed,
				minimized : panelOpts.minimized,
				maximized : panelOpts.maximized
			});
			var pager = ele.datagrid("getPager");
			if(pager.length) {
				var pageOpts = pager.pagination("getOptions");
				$.extend(opts, {
					pageNumber : pageOpts.pageNumber,
					pageSize : pageOpts.pageSize
				});
			}
			return opts;
		},
		/**
		 * 返回控制面板对象
		 */
		getPanel : function() {
			return $.data(this.element, "datagrid").panel;
		},
		/**
		 * 返回页面对象 
		 */
		getPager : function() {
			return $.data(this.element, "datagrid").panel.find("div.datagrid-pager");
		},
		/**
		 * 返回列字段，如果设置了frozen属性为true，将返回固定列的字段名 
		 */
		getColumnFields : function (frozen){
			return this._getColumnAttr(this.element, frozen);
		},
		/**
		 * 返回特定的列属性 
		 */
		getColumnOption : function(field) {
			return this._getTdColspan(this.element, field);
		},
		/**
		 * 缩放和布局 
		 */
		resize : function (param){
			var self = this;
			return this.element.each(function() {
				self._resize(this.element, param);
			});
		},
		/**
		 * 载入并显示第一页的记录，如果传递了'param'参数，它将会覆盖查询参数属性的值 
		 */
		load : function (param) {
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				var opts = $(ele).datagrid("options");
				opts.pageNumber = 1;
				var pager = $(ele).datagrid("getPager");
				pager.pagination({
					pageNumber : 1
				});
				self._loadData(ele, param);
			});
		},
		/**
		 * 重载记录，跟'load'方法一样但是重载的是当前页的记录而非第一页 
		 */
		reload : function (param){
			var self = this;
			return this.element.each(function() {
				self._loadData(this.element, param);
			});
		},
		/**
		 * 重载行底记录 
		 */
		reloadFooter : function (footer){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				var view = $(ele).datagrid("getPanel").children("div.datagrid-view");
				var view1 = view.children("div.datagrid-view1");
				var view2 = view.children("div.datagrid-view2");
				if(footer) {
					$.data(ele, "datagrid").footer = footer;
				}
				if(opts.showFooter) {
					opts.view.renderFooter.call(opts.view, ele, view2.find("div.datagrid-footer-inner"), false);
					opts.view.renderFooter.call(opts.view, ele, view1.find("div.datagrid-footer-inner"), true);
					if(opts.view.onAfterRender) {
						opts.view.onAfterRender.call(opts.view, ele);
					}
					$(ele).datagrid("fixRowHeight");
				}
			});
		},
		/**
		 * 显示载入状态 
		 */
		loading : function() {
			var self = this,
				ele  = self.element;
			return self.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				$(this).datagrid("getPager").pagination("loading");
				if(opts.loadMsg) {
					var panel = $(ele).datagrid("getPanel");
					$('<div class="datagrid-mask" style="display:block"></div>').appendTo(panel);
					$('<div class="datagrid-mask-msg" style="display:block"></div>').html(opts.loadMsg).appendTo(panel);
					self._setMaskSize(self.element);
				}
			});
		},
		/**
		 * 隐藏载入状态 
		 */
		loaded : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				$(ele).datagrid("getPager").pagination("loaded");
				var panel = $(ele).datagrid("getPanel");
				panel.children("div.datagrid-mask-msg").remove();
				panel.children("div.datagrid-mask").remove();
			});
		},
		/**
		 * 让列宽自动适应数据表格的宽度 
		 */
		fitColumns : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._resizeTdCell(ele);
			});
		},
		/**
		 * 固定列尺寸 
		 */
		fixColumnSize : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._fix(ele);
			});
		},
		/**
		 * 固定特定列的高度 
		 */
		fixRowHeight : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._fitRowHeight(ele, index);
			});
		},
		/**
		 * 载入本地数据，旧记录将被移除
		 */
		loadData : function (data){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._setEvent(ele, data);
				self._initGridData(ele);
			});
		},
		/**
		 * 返回已载入数据
		 */
		getData : function (){
			return $.data(this.element, "datagrid").data;
		},
		/**
		 * 返回当前页的记录 
		 */
		getRows : function (){
			return $.data(this.element, "datagrid").data.rows;
		},
		/**
		 * 返回行底记录 
		 */
		getFooterRows : function (){
			return $.data(this.element, "datagrid").footer;
		},
		/**
		 * 返回指定行的索引
		 * @param row  可以是行记录或者是一个id字段的值 
		 */
		getRowIndex : function (row){
			return this._getRowIndex(this.element, row);
		},
		/**
		 * 返回第一个被选择的行记录或null 
		 */
		getSelected : function (){
			var rows = this._getSelectRows(this.element);
			return rows.length > 0 ? rows[0] : null;
		},
		/**
		 * 返回所有被选择的行，当没有记录被选择时，将返回一个空数组。 
		 */
		getSelections : function (){
			return this._getSelectRows(this.element);
		},
		/**
		 * 取消所有的已选择项 
		 */
		clearSelections : function () {
		  	var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._singeSelected(ele);
			});
		},
		/**
		 * 全选 
		 */
		selectAll : function (){
			var self = this;
				ele  = this.element;
			return this.element.each(function() {
				self._selectAll(ele);
			});
		},
		/**
		 * 取消全选 
		 */
		unselectAll : function (){
			var self = this;
				ele  = this.element;
			return this.element.each(function() {
				self._unSelectAll(ele);
			});
		},
		/**
		 * 选择一行，行索引从0开始 
		 */
		selectRow : function (index){
			var self = this;
				ele  = this.element;
			return this.element.each(function() {
				self._setCheck(ele, index);
			});
		},
		/**
		 * 通过传递id参数来选择一行 
		 */
		selectRecord : function (idValue){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._selectRow(ele, idValue);
			});
		},
		/**
		 * 取消选择一行 
		 */
		unselectRow : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._unSelected(ele, index);
			});
		},
		/**
		 * 开始编辑一行 
		 */
		beginEdit : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._setEditRow(ele, index);
			});
		},
		/**
		 * 结束编辑 
		 */
		endEdit : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._endEditorRow(ele, index, false);
			});
		},
		/**
		 * 取消编辑 
		 */
		cancelEdit : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._endEditorRow(ele, index, false);
			});
		},
		/**
		 * 获取指定行的编辑器，每个编辑器有如下属性：
		 * 	actions：编辑器可以做的行为。
		 *  target：目标编辑器jQuery对象
		 * 	field：字段名。
		 *  type：编辑器类型。 
		 */
		getEditors : function (index){
			return this._getEditors(this.element, index);
		},
		/**
		 * 获取特定的编辑器，options参数有2个属性：
		 * 	index：行索引。
		 * 	field:字段名。 
		 */
		getEditor : function (options){
			return this._getEditor(this.element, options);
		},
		/**
		 * 刷新一行 
		 */
		refreshRow : function (index) {
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				opts.view.refreshRow.call(opts.view, ele, index);
			});
		},
		/**
		 * 校验指定的行，如果有效返回true 
		 */
		validateRow : function (index) {
			return this._isEditorRow(this.element, index);
		},
		/**
		 * 更新指定的行，param参数包含如下属性：
		 * 	index：	 要更新的行索引
		 * 	row：	新的行数据 
		 */
		updateRow : function (param){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				opts.view.updateRow.call(opts.view, ele, param.index, param.row);
			});
		},
		/**
		 * 添加一行 
		 */
		appendRow : function (row){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._appendRow(ele, row);
			});
		},
		/**
		 * 插入一个新行，param参数包含如下属性
		 * 	index：要插入的行索引，如果没有定义则在最后面添加一个新行。
		 * 	row：行数据。 
		 */
		insertRow : function (param) {
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._insertRow(ele, param);
			});
		},
		/**
		 * 删除一行 
		 */
		deleteRow : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._deleteRow(ele, index);
			});
		},
		/**
		 * 获取从最后一次提交开始的被修改的所有行
		 * @param type 表明修改的类型,可选值：inserted，deleted，updated等
		 * 			      当没有传递 type参数时，返回所有被修改的行
		 */
		getChanges : function (type){
			return this._getChangeRows(this.element, type);
		},
		/**
		 * 提交所有修改的数据，提交后的数据将不能再修改或者回滚
		 */
		acceptChanges : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._acceptChanges(ele);
			});
		},
		/**
		 * 回滚所有被删除的行 
		 */
		rejectChanges : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._rejectChanges(ele);
			});
		},
		/**
		 * 合并单元格，options参数包含如下属性：
		 * 	index：行索引。
		 * 	field：字段名。
		 * 	rowspan：整合单元格要跨的行数。
		 * 	colspan：整合单元格要跨的列数。 
		 */
		mergeCells : function (options){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._mergeCells(ele, options);
			});
		},
		/**
		 * 显示特定的列 
		 */
		showColumn : function (field){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var panel = $(ele).datagrid("getPanel");
				panel.find("td[field=\"" + field + "\"]").show();
				$(ele).datagrid("getColumnOption", field).hidden = false;
				$(ele).datagrid("fitColumns");
			});
		},
		/**
		 * 隐藏特定的列 
		 */
		hideColumn : function (field){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var panel = $(ele).datagrid("getPanel");
				panel.find("td[field=\"" + field + "\"]").hide();
				$(ele).datagrid("getColumnOption", field).hidden = true;
				$(ele).datagrid("fitColumns");
			});
		},
		/**
		 * 合并单元格 
		 */
		_mergeCells : function (target, options){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var rows = $.data(target, "datagrid").data.rows;
			options.rowspan = options.rowspan || 1;
			options.colspan = options.colspan || 1;
			if(options.index < 0 || options.index >= rows.length) {
				return;
			}
			if(options.rowspan == 1 && options.colspan == 1) {
				return;
			}
			var field = rows[options.index][options.field];
			var tr = opts.finder.getTr(target, options.index);
			var td = tr.find("td[field=\"" + options.field + "\"]");
			td.attr("rowspan", options.rowspan).attr("colspan", options.colspan);
			td.addClass("datagrid-td-merged");
			for(var i = 1; i < options.colspan; i++) {
				td = td.next();
				td.hide();
				rows[options.index][td.attr("field")] = field;
			}
			for(var i = 1; i < options.rowspan; i++) {
				tr = tr.next();
				var td = tr.find("td[field=\"" + options.field + "\"]").hide();
				rows[options.index+i][td.attr("field")] = field;
				for(var j = 1; j < options.colspan; j++) {
					td = td.next();
					td.hide();
					rows[options.index+i][td.attr("field")] = field;
				}
			}
			setTimeout(function() {
				self._merged(target);
			}, 0);
		},
		/**
		 * 回滚删除行数据 
		 */
		_rejectChanges : function (target){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var originalRows = $.data(target, "datagrid").originalRows;
			var insertRows = $.data(target, "datagrid").insertedRows;
			var deleteRows = $.data(target, "datagrid").deletedRows;
			var selectRows = $.data(target, "datagrid").selectedRows;
			var data = $.data(target, "datagrid").data;
			for(var i = 0; i < data.rows.length; i++) {
				self._endEditorRow(target, i, true);
			}
			var selectField = [];
			for(var i = 0; i < selectRows.length; i++) {
				selectField.push(selectRows[i][opts.idField]);
			}
			selectRows.splice(0, selectRows.length);
			data.total += deleteRows.length - insertRows.length;
			data.rows = originalRows;
			self._setEvent(target, data);
			for(var i = 0; i < selectField.length; i++) {
				self._selectRow(target, selectField[i]);
			}
			self._initGridData(target);
		},
		/**
		 * 提交修改数据 
		 */
		_acceptChanges : function (target){
			var self = this;
			var data = $.data(target, "datagrid").data;
			var ok = true;
			for(var i = 0, len = data.rows.length; i < len; i++) {
				if(self._isEditorRow(target, i)) {
					self._endEditorRow(target, i, false);
				} else {
					ok = false;
				}
			}
			if(ok) {
				self._initGridData(target);
			}
		},
		_getChangeRows : function (target, type){
			var insertRows = $.data(target, "datagrid").insertedRows;
			var deleteRows = $.data(target, "datagrid").deletedRows;
			var updateRows = $.data(target, "datagrid").updatedRows;
			if(!type) {
				var rows = [];
				rows = rows.concat(insertRows);
				rows = rows.concat(deleteRows);
				rows = rows.concat(updateRows);
				return rows;
			} else {
				if(type == "inserted") {
					return insertRows;
				} else {
					if(type == "deleted") {
						return deleteRows;
					} else {
						if(type == "updated") {
							return updateRows;
						}
					}
				}
			}
			return [];
		},
		/**
		 * 删除行操作 
		 */		
		_deleteRow : function (target, index){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var data = $.data(target, "datagrid").data;
			var insertRows = $.data(target, "datagrid").insertedRows;
			var deleteRows = $.data(target, "datagrid").deletedRows;
			var selectRows = $.data(target, "datagrid").selectedRows;
			$(target).datagrid("cancelEdit", index);
			var row = data.rows[index];
			if(self._getType(insertRows, row) >= 0) {
				self._parseType(insertRows, row);
			} else {
				deleteRows.push(row);
			}
			self._parseType(selectRows, opts.idField, data.rows[index][opts.idField]);
			opts.view.deleteRow.call(opts.view, target, index);
			if(opts.height == "auto") {
				self._fitRowHeight(target);
			}
		},
		_insertRow : function (target, row){
			var view = $.data(target, "datagrid").options.view;
			var insertRows = $.data(target, "datagrid").insertedRows;
			view.insertRow.call(view, target, row.index, row.row);
			this._setProperties(target);
			insertRows.push(row.row);
		},
		_appendRow : function (target, row){
			var view = $.data(target, "datagrid").options.view;
			var insertRows = $.data(target, "datagrid").insertedRows;
			view.insertRow.call(view, target, null, row);
			this._setProperties(target);
			insertRows.push(row);
		},
		
		_getEditor : function (target, options){
			var editors = this._getEditors(target, options.index);
			for(var i = 0; i < editors.length; i++) {
				if(editors[i].field == options.field) {
					return editors[i];
				}
			}
			return null;
		},
		_getEditors : function (target, index){
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			var editors = [];
			tr.children("td").each(function() {
				var editable = $(this).find("div.datagrid-editable");
				if(editable.length) {
					var ed = $.data(editable[0], "datagrid.editor");
					editors.push(ed);
				}
			});
			return editors;
		},
		/**
		 * 结束编辑行状态 
		 */
		_endEditorRow : function (target, index, isCancel){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var updateRows = $.data(target, "datagrid").updatedRows;
			var insertRows = $.data(target, "datagrid").insertedRows;
			var tr = opts.finder.getTr(target, index);
			var row = opts.finder.getRow(target, index);
			if(!tr.hasClass("datagrid-row-editing")) {
				return;
			}
			if(!isCancel) {
				if(!self._isEditorRow(target, index)) {
					return;
				}
				var update = false;
				var changes = {};
				tr.find("div.datagrid-editable").each(function() {
					var field = $(this).parent().attr("field");
					var ed = $.data(this, "datagrid.editor");
					var value = ed.actions.getValue(ed.target);
					if(row[field] != value) {
						row[field] = value;
						update = true;
						changes[field] = value;
					}
				});
				if(update) {
					if(self._getType(insertRows, row) == -1) {
						if(self._getType(updateRows, row) == -1) {
							updateRows.push(row);
						}
					}
				}
			}
			tr.removeClass("datagrid-row-editing");
			self._removeEditor(target, index);
			$(target).datagrid("refreshRow", index);
			if(!isCancel) {
				self._trigger('onAfterEdit', null, {
					rowIndex : index,
					rowData  : row,
					changes  : changes
				});
				//opts.onAfterEdit.call(target, index, row, changes);
			} else {
				self._trigger('onCancelEdit', null, {
					rowIndex : index,
					rowData  : row
				});
				//opts.onCancelEdit.call(target, index, row);
			}
		},
		/**
		 * 清楚编辑时的数据和样式信息 
		 */
		_removeEditor : function (target, index){
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			tr.children("td").each(function() {
				var cell = $(this).find("div.datagrid-editable");
				if(cell.length) {
					var ed = $.data(cell[0], "datagrid.editor");
					if(ed.actions.destroy) {
						ed.actions.destroy(ed.target);
					}
					cell.html(ed.oldHtml);
					$.removeData(cell[0], "datagrid.editor");
					var width = cell.outerWidth();
					cell.removeClass("datagrid-editable");
					cell._outerWidth(width);
				}
			});
		},
		
		/**
		 * 设置编辑行 
		 */
		_setEditRow : function (target, index){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			var row = opts.finder.getRow(target, index);
			if(tr.hasClass("datagrid-row-editing")) {
				return;
			}
			if(opts.onBeforeEdit.call(target, index, row) == false) {
				return;
			}
			tr.addClass("datagrid-row-editing");
			// TODO editor
			self._wrapEditor(target, index);
			self._setEditor(target);
			tr.find("div.datagrid-editable").each(function() {
				var field = $(this).parent().attr("field");
				var ed = $.data(this, "datagrid.editor");
				ed.actions.setValue(ed.target, row[field]);
			});
			self._isEditorRow(target, index);
		},
		/**
		 * 是否处入编辑状态 
		 */
		_isEditorRow : function (target, index){
			var tr = $.data(target, "datagrid").options.finder.getTr(target, index);
			if(!tr.hasClass("datagrid-row-editing")) {
				return true;
			}
			var vbox = tr.find(".validatebox-text");
			vbox.validatebox("validate");
			vbox.trigger("mouseleave");
			var invalid = tr.find(".validatebox-invalid");
			return invalid.length == 0;
		},
		_wrapEditor : function (target, index){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			tr.children("td").each(function() {
				var cell = $(this).find("div.datagrid-cell");
				var field = $(this).attr("field");
				var col = self._getTdColspan(target, field);
				if(col && col.editor) {
					var type, opt;
					if( typeof col.editor == "string") {
						type = col.editor;
					} else {
						type = col.editor.type;
						opt = col.editor.options;
					}
					var editor = opts.editors[type];
					
					if(editor) {
						var content = cell.html();
						var width = cell.outerWidth();
						cell.addClass("datagrid-editable");
						cell._outerWidth(width);
						cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
						cell.children("table").attr("align", col.align);
						cell.children("table").bind("click dblclick contextmenu", function(e) {
							e.stopPropagation();
						});
						$.data(cell[0], "datagrid.editor", {
							actions : editor,
							target : editor.init(cell.find("td"), opt),
							field : field,
							type : type,
							oldHtml : content
						});
					}
				}
			});
			self._fitRowHeight(target, index, true);
		},
		
		
		/**
		 * 获取所有选中行数据 
		 */
		_getSelectRows : function (target){
			var opts = $.data(target, "datagrid").options;
			var data = $.data(target, "datagrid").data;
			if(opts.idField) {
				return $.data(target, "datagrid").selectedRows;
			} else {
				var rows = [];
				opts.finder.getTr(target, "", "selected", 2).each(function() {
					var index = parseInt($(this).attr("datagrid-row-index"));
					rows.push(data.rows[index]);
				});
				return rows;
			}
		},
		
		_getRowIndex : function(target, row){
			var opts = $.data(target, "datagrid").options;
			var rows = $.data(target, "datagrid").data.rows;
			if( typeof row == "object") {
				return this._getType(rows, row);
			} else {
				for(var i = 0; i < rows.length; i++) {
					if(rows[i][opts.idField] == row) {
						return i;
					}
				}
				return -1;
			}
		},
		_create : function (){
			
			// TODO create
			var self = this,
				opts = self.options,
				ele  = self.element;
		    ele.css("width", "").css("height", "");
		    var wrapResult = self._wrapGrid(ele, opts.rownumbers);
		    
		    if(!opts.columns) {
				opts.columns = wrapResult.columns;
			}
			if(!opts.frozenColumns) {
				opts.frozenColumns = wrapResult.frozenColumns;
			}
			
			
			
			
			$.data(ele, "datagrid", {
				options : opts,
				panel : wrapResult.panel,
				dc : wrapResult.dc,
				selectedRows : [],
				data : {
					total : 0,
					rows : []
				},
				originalRows : [],
				updatedRows : [],
				insertedRows : [],
				deletedRows : []
			});
			self._initGrid(ele);
			var data = self._getRowsData(ele);
			if(data.total > 0) {
				self._setEvent(ele, data);
				self._initGridData(ele);
			}
			self._resize(ele);
			
			self._loadData(ele);
			
			self._setGridEvent(ele);
		},
		_selectAll : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel,
				selectedRows = $.data(target, "datagrid").selectedRows;
			
			//var opts = $.data(target, "datagrid").options;
			var rows = $.data(target, "datagrid").data.rows;
			var selected = $.data(target, "datagrid").selectedRows;
			var tr = opts.finder.getTr(target, "", "allbody").addClass("datagrid-row-selected");
			var cellCheck = tr.find("div.datagrid-cell-check input[type=checkbox]");
			$.fn.prop ? cellCheck.prop("checked", true) : cellCheck.attr("checked", true);
			for(var i = 0; i < rows.length; i++) {
				if(opts.idField) {
					(function() {
						var row = rows[i];
						for(var i = 0; i < selected.length; i++) {
							if(selected[i][opts.idField] == row[opts.idField]) {
								return;
							}
						}
						selected.push(row);
					})();
				}
			}
			self._trigger('onSelectAll', null, {rows : rows});
			// opts.onSelectAll.call(target, rows);
		},
		_setGridEvent : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel,
				selectedRows = $.data(target, "datagrid").selectedRows;
				
			// var datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(target, "datagrid").options;
			// var dc = $.data(target, "datagrid").dc;
			var viewHeader = dc.view.find("div.datagrid-header");
			viewHeader.find("td:has(div.datagrid-cell)").unbind(".datagrid").bind("mouseenter.datagrid", function() {
				$(this).addClass("datagrid-header-over");
				$(this).children(".datagrid-cell").css({
					position : 'relative'
				});
			}).bind("mouseleave.datagrid", function() {
				$(this).removeClass("datagrid-header-over");
			}).bind("contextmenu.datagrid", function(e) {
				var field = $(this).attr("field");
				self._trigger('onHeaderContextMenu', e, field);
				// opts.onHeaderContextMenu.call(target, e, field);
			});
			viewHeader.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function() {
				if(opts.singleSelect) {
					return false;
				}
				if($(this).is(":checked")) {
					self._selectAll(target);
				} else {
					self._unSelectAll(target);
				}
			});
			dc.body2.unbind(".datagrid").bind("scroll.datagrid", function() {
				dc.view2.find("div.datagrid-header-inner td .datagrid-cell").each(function(index) {
				   	$(this).css('position','static');
				});
				
				dc.view1.children("div.datagrid-body").scrollTop($(this).scrollTop());
				dc.view2.children("div.datagrid-header").scrollLeft($(this).scrollLeft());
				dc.view2.children("div.datagrid-footer").scrollLeft($(this).scrollLeft());
			});
			function sortColumn(thread, isSort) {
				thread.unbind(".datagrid");
				if(!isSort) {
					return;
				}
				thread.bind("click.datagrid", function(e) {
					var field = $(this).parent().attr("field");
					var opt = self._getTdColspan(target, field);
					if(!opt.sortable) {
						return;
					}
					opts.sortName = field;
					opts.sortOrder = "asc";
					var c = "datagrid-sort-asc";
					if($(this).hasClass("datagrid-sort-asc")) {
						c = "datagrid-sort-desc";
						opts.sortOrder = "desc";
					}
					viewHeader.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
					$(this).addClass(c);
					if(opts.remoteSort) {
						self._loadData(target);
					} else {
						var gridData = $.data(target, "datagrid").data;
						self._setEvent(target, gridData);
					}
					if(opts.onSortColumn) {
						self._trigger('onSortColumn', e, {
							sort : opts.sortName,
							order: opts.sortOrder
						});
						//opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
					}
				});
			};
			
			sortColumn(viewHeader.find("div.datagrid-cell"), true);
			viewHeader.find("div.datagrid-cell").each(function() {
				$(this).resizable({
					handles : "e",
					disabled : ($(this).attr("resizable") ? $(this).attr("resizable") == "false" : false),
					minWidth : 25,
					//animate  : true,
					start : function(e) {
						viewHeader.css("cursor", "e-resize");
						dc.view.children("div.datagrid-resize-proxy").css({
							left : e.pageX - $(datagrid).offset().left - 1,
							display : "block"
						});
						sortColumn($(this), false);
					},
					resize : function(e) {
						dc.view.children("div.datagrid-resize-proxy").css({
							display : "block",
							left : e.pageX - $(datagrid).offset().left - 1
						});
						return false;
					},
					stop : function(e) {
						viewHeader.css("cursor", "");
						var field = $(this).parent().attr("field");
						var col = self._getTdColspan(target, field);
						var width = col.width - col.boxWidth;
						col.width = $(this).outerWidth();
						col.boxWidth = col.width - width;
						self._fix(target, field);
						
						self._resizeTdCell(target);
						setTimeout(function() {
							sortColumn($(e.target), true);
						}, 0);
						dc.view2.children("div.datagrid-header").scrollLeft(dc.body2.scrollLeft());
						dc.view.children("div.datagrid-resize-proxy").css("display", "none");
						self._trigger('onResizeColumn', e, {
							field : field,
							width : col.width
						});
						//opts.onResizeColumn.call(target, field, col.width);
					}
				});
			});
			dc.view1.children("div.datagrid-header").find("div.datagrid-cell").resizable({
				onStopResize : function(e) {
					viewHeader.css("cursor", "");
					var field = $(this).parent().attr("field");
					var col = self._getTdColspan(target, field);
					var width = col.width - col.boxWidth;
					col.width = $(this).outerWidth();
					col.boxWidth = col.width - width;
					self._fix(target, field);
					dc.view2.children("div.datagrid-header").scrollLeft(dc.body2.scrollLeft());
					dc.view.children("div.datagrid-resize-proxy").css("display", "none");
					self._setSize(target);
					
					self._resizeTdCell(target);
					setTimeout(function() {
						sortColumn($(e.data.target), true);
					}, 0);
					self._trigger('onResizeColumn', e, {
						field : field,
						width : col.width
					});
					//opts.onResizeColumn.call(target, field, col.width);
				}
			});
		
		},
		_resizeTdCell : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc = $.data(target, "datagrid").dc;
			//var opts = $.data(target, "datagrid").options;
			if(!opts.fitColumns) {
				return;
			}
			var v2Header = dc.view2.children("div.datagrid-header");
			var width = 0;
			var clospan;
			var columnAttr = self._getColumnAttr(target, false);
			for(var i = 0; i < columnAttr.length; i++) {
				var col = self._getTdColspan(target, columnAttr[i]);
				if(!col.hidden && !col.checkbox) {
					width += col.width;
					clospan = col;
				}
			}
			var inner = v2Header.children("div.datagrid-header-inner").show();
			var otherWidth = v2Header.width() - v2Header.find("table").width() - opts.scrollbarSize;
			var diff = otherWidth / width;
			if(!opts.showHeader) {
				inner.hide();
			}
			for(var i = 0; i < columnAttr.length; i++) {
				var col = _7f(target, columnAttr[i]);
				if(!col.hidden && !col.checkbox) {
					var temp = Math.floor(col.width * diff);
					setCellWidth(col, temp);
					otherWidth -= temp;
				}
			}
			self._fix(target);
			if(otherWidth) {
				setCellWidth(clospan, otherWidth);
				self._fix(target, clospan.field);
			}
			function setCellWidth(col, width) {
				col.width += width;
				col.boxWidth += width;
				v2Header.find("td[field=\"" + col.field + "\"] div.datagrid-cell").width(col.boxWidth);
			};
		},
		/**
		 * 加载数据 
		 */
		_loadData : function (target, param){
			var self = this,
				opts = $.data(target, "datagrid").options;
			//var opts = $.data(target, "datagrid").options;
			if(param) {
				opts.queryParams = param;
			}
			var queryParams = $.extend({}, opts.queryParams);
			if(opts.pagination) {
				$.extend(queryParams, {
					page : opts.pageNumber,
					rows : opts.pageSize
				});
			}
			if(opts.sortName) {
				$.extend(queryParams, {
					sort : opts.sortName,
					order : opts.sortOrder
				});
			}
			// TODO onBeforeLoad
			if(self._trigger( "onBeforeLoad", null, queryParams) == false) {
				return;
			}
			// if(opts.onBeforeLoad.call(target, queryParams) == false) {
				// return;
			// }
			$(target).datagrid("loading");
			setTimeout(function() {
				loadColumnData();
			}, 0);
			function loadColumnData() {
				var loader = opts.loader.call(target, queryParams, function(data) {
					setTimeout(function() {
						$(target).datagrid("loaded");
					}, 0);
					self._setEvent(target, data);
					setTimeout(function() {
						self._initGridData(target);
					}, 0);
				}, function() {
					setTimeout(function() {
						$(target).datagrid("loaded");
					}, 0);
					self._trigger( "onLoadError", null);
					//opts.onLoadError.apply(target, arguments);
				});
				if(loader == false) {
					$(target).datagrid("loaded");
				}
			};
			
		},
		_initGridData : function (target){
			var data = $.data(target, "datagrid").data;
			var rows = data.rows;
			var result = [];
			for(var i = 0; i < rows.length; i++) {
				result.push($.extend({}, rows[i]));
			}
			$.data(target, "datagrid").originalRows = result;
			$.data(target, "datagrid").updatedRows = [];
			$.data(target, "datagrid").insertedRows = [];
			$.data(target, "datagrid").deletedRows = [];
		},
		_setEvent : function (target, jsonData) {
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel,
				selectedRows = $.data(target, "datagrid").selectedRows;
			
			//var opts = $.data(target, "datagrid").options;
			
			jsonData = opts.loadFilter.call(target, jsonData);
			var rows = jsonData.rows;
			$.data(target, "datagrid").data = jsonData;
			if(jsonData.footer) {
				$.data(target, "datagrid").footer = jsonData.footer;
			}
			if(!opts.remoteSort) {
				var opt = self._getTdColspan(target, opts.sortName);
				if(opt) {
					var sorter = opt.sorter ||
					function(a, b) {
						return (a > b ? 1 : -1);
					};
					jsonData.rows.sort(function(r1, r2) {
						return sorter(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
					});
				}
			}
			if(opts.view.onBeforeRender) {
				opts.view.onBeforeRender.call(opts.view, target, rows);
			}
			opts.view.render.call(opts.view, target, dc.body2, false);
			opts.view.render.call(opts.view, target, dc.body1, true);
			if(opts.showFooter) {
				opts.view.renderFooter.call(opts.view, target, dc.footer2, false);
				opts.view.renderFooter.call(opts.view, target, dc.footer1, true);
			}
			if(opts.view.onAfterRender) {
				opts.view.onAfterRender.call(opts.view, target);
			}
			// TODO onLoadSuccess
			//opts.onLoadSuccess.call(target, jsonData);
			self._trigger( "onLoadSuccess", null, jsonData);
			
			var pager = datagrid.children("div.datagrid-pager");
			if(pager.length) {
				if(pager.pagination("getOptions").total != jsonData.total) {
					pager.pagination({
						total : jsonData.total
					});
				}
			}
			self._fitRowHeight(target);
			self._setProperties(target);
			
			
			dc.body2.triggerHandler("scroll");
			if(opts.idField) {
				for(var i = 0; i < rows.length; i++) {
					if(isSelected(rows[i])) {
						self._selectRow(target, rows[i][opts.idField]);
					}
				}
			}
			function isSelected(row) {
				for(var i = 0; i < selectedRows.length; i++) {
					if(selectedRows[i][opts.idField] == row[opts.idField]) {
						selectedRows[i] = row;
						return true;
					}
				}
				return false;
			};
		},
		_selectRow : function (target, row){
			var self = this,
				opts = $.data(target, "datagrid").options;
			//var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			if(opts.idField) {
				var index = -1;
				for(var i = 0; i < gridData.rows.length; i++) {
					if(gridData.rows[i][opts.idField] == row) {
						index = i;
						break;
					}
				}
				if(index >= 0) {
					self._setCheck(target, index);
				}
			}
		},
		_setCheck : function (target, index){
			var dc = $.data(target, "datagrid").dc;
			var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			var selected = $.data(target, "datagrid").selectedRows;
			if(index < 0 || index >= gridData.rows.length) {
				return;
			}
			if(opts.singleSelect == true) {
				self._singeSelected(target);
			}
			var tr = opts.finder.getTr(target, index);
			if(!tr.hasClass("datagrid-row-selected")) {
				tr.addClass("datagrid-row-selected");
				var ck = $("div.datagrid-cell-check input[type=checkbox]", tr);
				$.fn.prop ? ck.prop("checked", true) : ck.attr("checked", true);
				if(opts.idField) {
					var row = gridData.rows[index];
					(function() {
						for(var i = 0; i < selected.length; i++) {
							if(selected[i][opts.idField] == row[opts.idField]) {
								return;
							}
						}
						selected.push(row);
					})();
				}
			}
			this._trigger('onSelect', null, {
				rowIndex : index,
				rowData  : gridData.rows[index]
			});
			//opts.onSelect.call(target, index, gridData.rows[index]);
			var height = dc.view2.children("div.datagrid-header").outerHeight();
			var body2 = dc.body2;
			var top = tr.position().top - height;
			if(top <= 0) {
				body2.scrollTop(body2.scrollTop() + top);
			} else {
				if(top + tr.outerHeight() > body2.height() - 18) {
					body2.scrollTop(body2.scrollTop() + top + tr.outerHeight() - body2.height() + 18);
				}
			}
		},
		/**
		 * 绑定事件 
		 */
		_setProperties : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			// var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			var tr = opts.finder.getTr(target, "", "allbody");
			tr.unbind(".datagrid").bind("mouseenter.datagrid", function() {
				var index = $(this).attr("datagrid-row-index");
				opts.finder.getTr(target, index).addClass("datagrid-row-over");
			}).bind("mouseleave.datagrid", function() {
				var index = $(this).attr("datagrid-row-index");
				opts.finder.getTr(target, index).removeClass("datagrid-row-over");
			}).bind("click.datagrid", function(event) {
				var index = $(this).attr("datagrid-row-index");
				if(opts.singleSelect == true) {
					self._singeSelected(target);
					self._setCheck(target, index);
				} else {
					if($(this).hasClass("datagrid-row-selected")) {
						self._unSelected(target, index);
					} else {
						self._setCheck(target, index);
					}
				}
				if(opts.onClickRow) {
					self._trigger('onClickRow', event, {
						rowIndex : index,
						rowData  : gridData.rows[index]
					});
					//opts.onClickRow.call(target, index, gridData.rows[index]);
				}
			}).bind("dblclick.datagrid", function(event) {
				var index = $(this).attr("datagrid-row-index");
				if(opts.onDblClickRow) {
					self._trigger('onDblClickRow', event, {
						rowIndex : index,
						rowData  : gridData.rows[index]
					});
					//opts.onDblClickRow.call(target, index, gridData.rows[index]);
				}
			}).bind("contextmenu.datagrid", function(e) {
				var index = $(this).attr("datagrid-row-index");
				if(opts.onRowContextMenu) {
					self._trigger('onRowContextMenu', e, {
						rowIndex : index,
						rowData  : gridData.rows[index]
					});
					//opts.onRowContextMenu.call(target, e, index, gridData.rows[index]);
				}
			});
			tr.find("td[field]").unbind(".datagrid").bind("click.datagrid", function(event) {
				var index = $(this).parent().attr("datagrid-row-index");
				var field = $(this).attr("field");
				var row = gridData.rows[index][field];
				
				self._trigger("onClickCell", event, {
					rowIndex : index, 
					field    : field, 
					value    : row
				});
				
				//opts.onClickCell.call(target, index, field, row);
			}).bind("dblclick.datagrid", function(event) {
				var index = $(this).parent().attr("datagrid-row-index");
				var field = $(this).attr("field");
				var row = gridData.rows[index][field];
				self._trigger("onDblClickCell", event, {
					rowIndex : index, 
					field    : field, 
					value    : row
				});
				//opts.onDblClickCell.call(target, index, field, row);
			});
			tr.find("div.datagrid-cell-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function(e) {
				var parent = $(this).parent().parent().parent().attr("datagrid-row-index");
				if(opts.singleSelect) {
					self._singeSelected(target);
					self._setCheck(target, parent);
				} else {
					if($(this).is(":checked")) {
						self._setCheck(target, parent);
					} else {
						self._unSelected(target, parent);
					}
				}
				e.stopPropagation();
			});
		},
		_getType : function (selected, idField){
			for(var i = 0, len = selected.length; i < len; i++) {
				if(selected[i] == idField) {
					return i;
				}
			}
			return -1;
		},
		_parseType : function (selected, idField, id){
			if( typeof idField == "string") {
				for(var i = 0, len = selected.length; i < len; i++) {
					if(selected[i][idField] == id) {
						selected.splice(i, 1);
						return;
					}
				}
			} else {
				var index = this._getType(selected, idField);
				if(index != -1) {
					selected.splice(index, 1);
				}
			}
		},
		_unSelectAll : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			var selected = $.data(target, "datagrid").selectedRows;
			var tr = opts.finder.getTr(target, "", "selected").removeClass("datagrid-row-selected");
			var cellCheck = tr.find("div.datagrid-cell-check input[type=checkbox]");
			$.fn.prop ? cellCheck.prop("checked", false) : cellCheck.attr("checked", false);
			if(opts.idField) {
				for(var i = 0; i < gridData.rows.length; i++) {
					self._parseType(selected, opts.idField, gridData.rows[i][opts.idField]);
				}
			}
			self._trigger('onUnselectAll', null, {rows : gridData.rows});
			// opts.onUnselectAll.call(target, gridData.rows);
		},
		_unSelected : function (target, index){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc;
			// var opts = $.data(target, "datagrid").options;
			// var dc = $.data(target, "datagrid").dc;
			var gridData = $.data(target, "datagrid").data;
			var selected = $.data(target, "datagrid").selectedRows;
			if(index < 0 || index >= gridData.rows.length) {
				return;
			}
			var tr = opts.finder.getTr(target, index);
			var ck = tr.find("div.datagrid-cell-check input[type=checkbox]");
			tr.removeClass("datagrid-row-selected");
			$.fn.prop ? ck.prop("checked", false) : ck.attr("checked", false);
			var row = gridData.rows[index];
			if(opts.idField) {
				self._parseType(selected, opts.idField, row[opts.idField]);
			}
			self._trigger('onUnselect', null, {
				rowIndex : index,
				rowData  : row
			});
			//opts.onUnselect.call(target, index, row);
		},
		_singeSelected : function (target){
			this._unSelectAll(target);
			var selected = $.data(target, "datagrid").selectedRows;
			selected.splice(0, selected.length);
		},
		/**
		 * 获取行数据 
		 */
		_getRowsData : function (target){
			var self = this;
			var jsonData = {
				total : 0,
				rows : []
			};
			var columnData = self._getColumnAttr(target, true).concat(self._getColumnAttr(target, false));
			$(target).find("tbody tr").each(function() {
				jsonData.total++;
				var col = {};
				for(var i = 0; i < columnData.length; i++) {
					col[columnData[i]] = $("td:eq(" + i + ")", this).html();
				}
				jsonData.rows.push(col);
			});
			return jsonData;
		},
		
		/**
		 * 设置mask样式信息 
		 */
		_setMaskSize : function (target){
			var panel = target.datagrid("getPanel");
			var mask = panel.children("div.datagrid-mask");
			if(mask.length) {
				mask.css({
					width : panel.width(),
					height : panel.height()
				});
				var msg = panel.children("div.datagrid-mask-msg");
				msg.css({
					left : (panel.width() - msg.outerWidth()) / 2,
					top : (panel.height() - msg.outerHeight()) / 2
				});
			}
		},
		_getColumnAttr : function (target, isFrozenCol){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(target, "datagrid").options;
			var columns = (isFrozenCol == true) ? (opts.frozenColumns || [[]]) : opts.columns;
			if(columns.length == 0) {
				return [];
			}
			var result = [];
			function getIndex(index) {
				var c = 0;
				var i = 0;
				while(true) {
					if(result[i] == undefined) {
						if(c == index) {
							return i;
						}
						c++;
					}
					i++;
				}
			};
			function getColumn(r) {
				var ff = [];
				var c = 0;
				for(var i = 0; i < columns[r].length; i++) {
					var col = columns[r][i];
					if(col.field) {
						ff.push([c, col.field]);
					}
					c += parseInt(col.colspan || "1");
				}
				for(var i = 0; i < ff.length; i++) {
					ff[i][0] = getIndex(ff[i][0]);
				}
				for(var i = 0; i < ff.length; i++) {
					var f = ff[i];
					result[f[0]] = f[1];
				}
			};
			for(var i = 0; i < columns.length; i++) {
				getColumn(i);
			}
			return result;
		},
		_setHeaderWidth : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
				
				
			// var opts = $.data(target, "datagrid").options;
			// var dc = $.data(target, "datagrid").dc;
			if(!opts.fitColumns) {
				return;
			}
			var v2Header = dc.view2.children("div.datagrid-header");
			var width = 0;
			var colspan;
			var columns = self._getColumnAttr(target, false);
			for(var i = 0; i < columns.length; i++) {
				var col = self._getTdColspan(target, columns[i]);
				if(!col.hidden && !col.checkbox) {
					width += col.width;
					colspan = col;
				}
			}
			var v2HeaderInner = v2Header.children("div.datagrid-header-inner").show();
			var otherWidth = v2Header.width() - v2Header.find("table").width() - opts.scrollbarSize;
			var tempWidth = otherWidth / width;
			if(!opts.showHeader) {
				v2HeaderInner.hide();
			}
			for(var i = 0; i < columns.length; i++) {
				var col = self._getTdColspan(target, columns[i]);
				if(!col.hidden && !col.checkbox) {
					var wi = Math.floor(col.width * tempWidth);
					setCellWidth(col, wi);
					otherWidth -= wi;
				}
			}
			self._fix(target);
			if(otherWidth) {
				setCellWidth(colspan, otherWidth);
				self._fix(target, colspan.field);
			}
			function setCellWidth(col, tWidth) {
				col.width += tWidth;
				col.boxWidth += tWidth;
				v2Header.find('td[field="' + col.field + '"] div.datagrid-cell').width(col.boxWidth);
			};
		},
		/**
		 * 初始化表格 
		 */
		_initGrid : function (target){
			
			//TODO
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			
			datagrid.panel($.extend({}, opts, {
				id : null,
				doSize : false,
				onResize : function(width, height) {
					self._setMaskSize(target);
					setTimeout(function() {
						if($.data(target, "datagrid")) {
							self._setSize(target);
							self._setHeaderWidth(target);
							// TODO onResize
							//opts.onResize.call(datagrid, width, height);
						}
					}, 0);
				},
				onExpand : function() {
					self._fitRowHeight(target);
					//opts.onExpand.call(datagrid);
				}
			}));
			var view1 = dc.view1;
			var view2 = dc.view2;
			var v1HeaderInner = view1.children("div.datagrid-header").children("div.datagrid-header-inner");
			var v2HeaderInner = view2.children("div.datagrid-header").children("div.datagrid-header-inner");
			showViewHeader(v1HeaderInner, opts.frozenColumns, true);
			showViewHeader(v2HeaderInner, opts.columns, false);
			v1HeaderInner.css("display", opts.showHeader ? "block" : "none");
			v2HeaderInner.css("display", opts.showHeader ? "block" : "none");
			view1.find("div.datagrid-footer-inner").css("display", opts.showFooter ? "block" : "none");
			view2.find("div.datagrid-footer-inner").css("display", opts.showFooter ? "block" : "none");
			if(opts.toolbar) {
				if( typeof opts.toolbar == "string") {
					$(opts.toolbar).addClass("datagrid-toolbar").prependTo(datagrid);
					$(opts.toolbar).show();
				} else {
					var tb = $('<div class="datagrid-toolbarss"></div>').prependTo(datagrid);
					tb.toolbar({
						item : opts.toolbar
					});
					// $("div.datagrid-toolbar", datagrid).remove();
					// var tb = $('<div class="datagrid-toolbar"></div>').prependTo(datagrid);
					// for(var i = 0; i < opts.toolbar.length; i++) {
						// var btn = opts.toolbar[i];
						// if(btn == "-") {
							// $('<div class="datagrid-btn-separator"></div>').appendTo(tb);
						// } else {
							// var ahtml = $('<a href="javascript:void(0)"></a>');
							// ahtml[0].onclick = eval(btn.handler ||
							// function() {
							// });
							// ahtml.css("float", "left").appendTo(tb).linkbutton($.extend({}, btn, {
								// plain : true
							// }));
						// }
					// }
				}
			} else {
				$("div.datagrid-toolbar", datagrid).remove();
			}
			$("div.datagrid-pager", datagrid).remove();
			if(opts.pagination) {
				var pager = $('<div class="datagrid-pager"></div>').appendTo(datagrid);
				pager.pagination({
					pageNumber : opts.pageNumber,
					pageSize : opts.pageSize,
					pageList : opts.pageList,
					onSelectPage : function(event, ui) {
						opts.pageNumber = ui.pageNumber;
						opts.pageSize = ui.pageSize;
						self._loadData(target);
					}
				});
				opts.pageSize = pager.pagination("getOptions").pageSize;
			}
			function showViewHeader(thread, columns, isFrozen) {
				if(!columns) {
					return;
				}
				$(thread).show();
				$(thread).empty();
				var t = $('<table border="0" cellspacing="0" cellpadding="0"><tbody></tbody></table>').appendTo(thread);
				for(var i = 0; i < columns.length; i++) {
					var tr = $("<tr></tr>").appendTo($("tbody", t));
					var column = columns[i];
					for(var j = 0; j < column.length; j++) {
						var col = column[j];
						var str = "";
						if(col.rowspan) {
							str += "rowspan=\"" + col.rowspan + "\" ";
						}
						if(col.colspan) {
							str += "colspan=\"" + col.colspan + "\" ";
						}
						var td = $("<td " + str + "></td>").appendTo(tr);
						if(col.checkbox) {
							td.attr("field", col.field);
							$('<div class="datagrid-header-check"></div>').html('<input type="checkbox"/>').appendTo(td);
						} else {
							if(col.field) {
								td.attr('field', col.field);
								td.append('<div class="datagrid-cell"><span></span><span class="datagrid-sort-icon"></span></div>');
								$("span", td).html(col.title);
								$("span.datagrid-sort-icon", td).html("&nbsp;");
								var cell = td.find("div.datagrid-cell");
								if(col.resizable == false) {
									cell.attr("resizable", "false");
								}
								// TODO _outerWidth
								cell._outerWidth(col.width);
								if(parseInt(cell[0].style.width) == col.width) {
									col.boxWidth = col.width;
								} else {
									col.boxWidth = col.width - (cell.outerWidth() - cell.width());
								}
								cell.css("text-align", (col.align || "left"));
							} else {
								$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
							}
						}
						if(col.hidden) {
							td.hide();
						}
					}
				}
				if(isFrozen && opts.rownumbers) {
					var td = $('<td rowspan="' + opts.frozenColumns.length + '"><div class="datagrid-header-rownumber"></div></td>');
					if($("tr", t).length == 0) {
						td.wrap("<tr></tr>").parent().appendTo($("tbody", t));
					} else {
						td.prependTo($("tr:first", t));
					}
				}
			};
		},
		_wrapGrid : function (target, rownumbers){
			var self = this;
			function getColumns(thead) {
				var trColAttr = [];
				$("tr", thead).each(function() {
					var colAttr = [];
					$("th", this).each(function() {
						var th = $(this);
						var col = {
							title : th.html(),
							align : th.attr("align") || "left",
							sortable : th.attr("sortable") == "true" || false,
							checkbox : th.attr("checkbox") == "true" || false
						};
						if(th.attr("field")) {
							col.field = th.attr("field");
						}
						if(th.attr("formatter")) {
							col.formatter = eval(th.attr("formatter"));
						}
						if(th.attr("styler")) {
							col.styler = eval(th.attr("styler"));
						}
						if(th.attr("editor")) {
							var s = $.trim(th.attr("editor"));
							if(s.substr(0, 1) == "{") {
								col.editor = eval("(" + s + ")");
							} else {
								col.editor = s;
							}
						}
						if(th.attr("rowspan")) {
							col.rowspan = parseInt(th.attr("rowspan"));
						}
						if(th.attr("colspan")) {
							col.colspan = parseInt(th.attr("colspan"));
						}
						if(th.attr("width")) {
							col.width = parseInt(th.attr("width")) || 100;
						}
						if(th.attr("hidden")) {
							col.hidden = true;
						}
						if(th.attr("resizable")) {
							col.resizable = th.attr("resizable") == "true";
						}
						colAttr.push(col);
					});
					trColAttr.push(colAttr);
				});
				return trColAttr;
			};	
			//var datagrid = $("<div class=\"datagrid-wrap\">" + "<div class=\"datagrid-view\">" + "<div class=\"datagrid-view1\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\">" + "<div class=\"datagrid-body-inner\"></div>" + "</div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-view2\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\"></div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-resize-proxy\"></div>" + "</div>" + "</div>").insertAfter(target);
				
			var dgPanel = $('<div class="datagrid-wrap">' +
			    				'<div class="datagrid-view">' +
			    					'<div class="datagrid-view1">' +
			    						'<div class="datagrid-header">' +
			    							'<div class="datagrid-header-inner"></div>' +
			    						'</div>' +
			    						'<div class="datagrid-body">' +
			    							'<div class="datagrid-body-inner"></div>' +
			    						'</div>' +
			    						'<div class="datagrid-footer">' +
			    							'<div class="datagrid-footer-inner"></div>' +
			    						'</div>' +
			    					'</div>' +
			    					'<div class="datagrid-view2">' +
			    						'<div class="datagrid-header">' +
			    							'<div class="datagrid-header-inner"></div>' +
			    						'</div>' +
			    						'<div class="datagrid-body"></div>' +
			    						'<div class="datagrid-footer">' +
			    							'<div class="datagrid-footer-inner"></div>' +
			    						'</div>' +
			    					'</div>' +
			    					'<div class="datagrid-resize-proxy"></div>' +
			    				'</div>' +
		    				'</div>').insertAfter(target);
		    
		    // TODO 这里由于panel木有添加对同一个DOM元素添加控件设置，因此调整datagrid.panel位置
		    dgPanel.panel({
				doSize : false
			});
			
			dgPanel.panel("panel").addClass("datagrid").bind("_resize", function(e, param) {
				var opts = $.data(target, "datagrid").options;
				if(opts.fit == true || param) {
					self._resize(target);
					setTimeout(function() {
						if($.data(target, "datagrid")) {
							self._fix(target);
						}
					}, 0);
				}
				return false;
			});
			target.hide().appendTo(dgPanel.children("div.datagrid-view"));//$(target).hide().appendTo(datagrid.children("div.datagrid-view"));
			var frozenColumns = getColumns($("thead[frozen=true]", target));
			var columns = getColumns($("thead[frozen!=true]", target));
			var view = dgPanel.children("div.datagrid-view");
			var view1 = view.children("div.datagrid-view1");
			var view2 = view.children("div.datagrid-view2");
			return {
				panel : dgPanel,
				frozenColumns : frozenColumns,
				columns : columns,
				dc : {
					view : view,
					view1 : view1,
					view2 : view2,
					body1 : view1.children("div.datagrid-body").children("div.datagrid-body-inner"),
					body2 : view2.children("div.datagrid-body"),
					footer1 : view1.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
					footer2 : view2.children("div.datagrid-footer").children("div.datagrid-footer-inner")
				}
			};
			
		},
		_merged : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			var view1Chi = dc.view1.children("div.datagrid-header").add(dc.view2.children("div.datagrid-header"));
			datagrid.find("div.datagrid-body td.datagrid-td-merged").each(function() {
				var td = $(this);
				var colspan = td.attr("colspan") || 1;
				var field = td.attr("field");
				var tdField = view1Chi.find("td[field=\"" + field + "\"]");
				var width = tdField.width();
				for(var i = 1; i < colspan; i++) {
					tdField = tdField.next();
					width  += tdField.outerWidth();
				}
				td.children("div.datagrid-cell")._outerWidth(width);
			});
		},
		_setSize : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(_c, "datagrid").options;
			//var dc = $.data(_c, "datagrid").dc;
			//var datagrid = $.data(_c, "datagrid").panel;
			var gridWidth = datagrid.width();
			var gridHeight = datagrid.height();
			var view = dc.view;
			var view1 = dc.view1;
			var view2 = dc.view2;
			var view1Header = view1.children("div.datagrid-header");
			var view2Header = view2.children("div.datagrid-header");
			var v1Tbl = view1Header.find("table");
			var v2Tbl = view2Header.find("table");
			view.width(gridWidth);
			
			
			
			
			var v1HeaderInner = view1Header.children("div.datagrid-header-inner").show();
			view1.width(v1HeaderInner.find("table").width());
			if(!opts.showHeader) {
				v1HeaderInner.hide();
			}
			view2.width(gridWidth - view1.outerWidth());
			view1.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(view1.width());
			view2.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(view2.width());
			var hh;
			view1Header.css("height", "");
			view2Header.css("height", "");
			v1Tbl.css("height", "");
			v2Tbl.css("height", "");
			hh = Math.max(v1Tbl.height(), v2Tbl.height());
			v1Tbl.height(hh);
			v2Tbl.height(hh);
			// TODO _outerHeight -> outerHeight
			view1Header.add(view2Header).outerHeight(hh);
			if(opts.height != "auto") {
				var bodyHeight = gridHeight - view2.children("div.datagrid-header").outerHeight(true) - view2.children("div.datagrid-footer").outerHeight(true) - datagrid.children("div.datagrid-toolbar").outerHeight(true) - datagrid.children("div.datagrid-pager").outerHeight(true);
				view1.children("div.datagrid-body").height(bodyHeight);
				view2.children("div.datagrid-body").height(bodyHeight);
			}
			view.height(view2.height());
			view2.css("left", view1.outerWidth());
		},
		_fitRowHeight : function (target, index, autoHeight) {
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc;
				rows = $.data(target, "datagrid").data.rows;
			if(!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || autoHeight)) {
				if(index != undefined) {
					var tr1 = opts.finder.getTr(target, index, "body", 1);
					var tr2 = opts.finder.getTr(target, index, "body", 2);
					setTrHeight(tr1, tr2);
				} else {
					var tr1 = opts.finder.getTr(target, 0, "allbody", 1);
					var tr2 = opts.finder.getTr(target, 0, "allbody", 2);
					setTrHeight(tr1, tr2);
					if(opts.showFooter) {
						var tr1 = opts.finder.getTr(target, 0, "allfooter", 1);
						var tr2 = opts.finder.getTr(target, 0, "allfooter", 2);
						setTrHeight(tr1, tr2);
					}
				}
			}
			self._setSize(target);
			if(opts.height == "auto") {
				var dcParent = dc.body1.parent();
				var dcBody2 = dc.body2;
				var height = 0;
				var width = 0;
				dcBody2.children().each(function() {
					var c = $(this);
					if(c.is(":visible")) {
						height += c.outerHeight();
						if(width < c.outerWidth()) {
							width = c.outerWidth();
						}
					}
				});
				if(width > dcBody2.width()) {
					height += 18;
				}
				dcParent.height(height);
				dcBody2.height(height);
				dc.view.height(dc.view2.height());
			}
			dc.body2.triggerHandler("scroll");
			function setTrHeight(obj1, obj2) {
				for(var i = 0; i < obj2.length; i++) {
					var tr1 = $(obj1[i]);
					var tr2 = $(obj2[i]);
					tr1.css("height", "");
					tr2.css("height", "");
					var maxHeight = Math.max(tr1.height(), tr2.height());
					tr1.css("height", maxHeight);
					tr2.css("height", maxHeight);
				}
			};
		},
		_setEditor : function (target){
			var datagrid = $.data(target, "datagrid").panel;
			datagrid.find("div.datagrid-editable").each(function() {
				var ed = $.data(this, "datagrid.editor");
				if(ed.actions.resize) {
					ed.actions.resize(ed.target, $(this).width());
				}
			});
		},
		_fix : function (target, param){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			if(param) {
				fix(param);
			} else {
				var view1Chi = dc.view1.children("div.datagrid-header").add(dc.view2.children("div.datagrid-header"));
				view1Chi.find("td[field]").each(function() {
					fix($(this).attr("field"));
				});
			}
			self._merged(target);
			setTimeout(function() {
				self._fitRowHeight(target);
				self._setEditor(target);
			}, 0);
			function fix(field) {
				var col = self._getTdColspan(target, field);
				var bf = opts.finder.getTr(target, "", "allbody").add(opts.finder.getTr(target, "", "allfooter"));
				bf.find("td[field=\"" + field + "\"]").each(function() {
					var td = $(this);
					var colspan = td.attr("colspan") || 1;
					if(colspan == 1) {
						td.find("div.datagrid-cell").width(col.boxWidth);
						td.find("div.datagrid-editable").width(col.width);
					}
				});
			};
		},
		/**
		 * 获取列 跨度数
		 * @param {Object} target
		 * @param {Object} field
		 */
		_getTdColspan : function (target, field){
			var self = this,
				opts = $.data(target, "datagrid").options;
			if(opts.columns) {
				for(var i = 0; i < opts.columns.length; i++) {
					var columns = opts.columns[i];
					for(var j = 0; j < columns.length; j++) {
						var col = columns[j];
						if(col.field == field) {
							return col;
						}
					}
				}
			}
			if(opts.frozenColumns) {
				for(var i = 0; i < opts.frozenColumns.length; i++) {
					var columns = opts.frozenColumns[i];
					for(var j = 0; j < columns.length; j++) {
						var col = columns[j];
						if(col.field == field) {
							return col;
						}
					}
				}
			}
			return null;
		},
		_resize : function (target, param){
			// TODO resize
			var opts = this.options;
			var datagrid = $.data(target, "datagrid").panel;
			if(param) {
				if(param.width) {
					opts.width = param.width;
				}
				if(param.height) {
					opts.height = param.height;
				}
			}
			if(opts.fit == true) {
				var p = datagrid.panel("panel").parent();
				opts.width = p.width();
				opts.height = p.height();
			}
			datagrid.panel("resize", {
				width : opts.width,
				height : opts.height
			});
		}
    });
})(jQuery);
