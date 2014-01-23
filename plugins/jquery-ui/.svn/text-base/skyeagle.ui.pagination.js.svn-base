/**
 * @auth 		 jacksyen
 * @created 	 2012.07.25 
 * @description  基于jquery UI、easyUI扩展的pagination组件
 * @since 		 2012.12.25  修改148行：eval(button.handler) -> button.handler
 */
(function($) {
	
	$.widget("ui.pagination" , {
		options : {
			// 总条数
			total : 1,
			// 每页显示多少条
			pageSize : 10,
			// 当前第几页
			pageNumber : 1,
			// 可选择的每页记录数
			pageList : [10, 20, 30, 50],
			// 是否正在载入状态
			loading : false,
			// array类型，自定义按钮，每个按钮包含两个属性，iconCls,handler
			//[{iconCls:'xx',handler:function (){}}]
			buttons : null,
			// 显示可选择的每页记录数
			showPageList : true,
			// 定义是否显示刷新按钮
			showRefresh : true,
			// 在输入框之前显示的符号
			beforePageText : "第",
			// 在输入框之后显示的符号
			afterPageText : "共{pages}页",
			// 在插件右上方显示分页信息
			displayMsg : "显示{from}到{to},共{total}记录",
			/**
			 * 当用户进行翻页时触发，回调函数包含2个参数: 
			 * @param {Object} event	
			 * @param {Object} ui	ui.pageNumber： 下一页的页码; ui.pageSize： 下一页的显示记录数
			 */
			onSelectPage : function(event, ui) {},
			/**
			 * 刷新之前触发, 返回false将取消刷新 
			 * @param {Object} event
			 * @param {Object} ui	ui.pageNumber： 下一页的页码; ui.pageSize： 下一页的显示记录数
			 */
			onBeforeRefresh : function(event, ui) {
			},
			/**
			 * 刷新之后触发
			 * @param {Object} event
			 * @param {Object} ui	ui.pageNumber： 下一页的页码; ui.pageSize： 下一页的显示记录数
			 */
			onRefresh : function(event, ui) {
			},
			/**
			 * 当用户修改每页显示记录数时触发
			 * @param {Object} event
			 * @param {Object} pageSize 下一页的显示记录数
			 */
			onChangePageSize : function(event, pageSize) {
			}
		},
		/**
		 * 提醒分页插件正在载入 
		 */
		loading : function() {
			var self = this;
			return self.element.each(function() {
				self._loadToggle(this, true);
			});
		},
		/**
		 * 提醒分页插件已经载入 
		 */
		loaded : function() {
			var self = this;
			return self.element.each(function() {
				self._loadToggle(this, false);
			});
		},
		/**
		 * 返回分页属性对象 
		 */
		getOptions : function (){
			return this.options;
		},
		_loadToggle : function (target, isLoad){
			var self = this,
				opts = self.options;
			//var opts = $.data(_17, "pagination").options;
			opts.loading = isLoad;
			if(opts.loading) {
				$(target).find("a[icon=pagination-load]").addClass("pagination-loading");
				//$(target).find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
			} else {
				$(target).find("a[icon=pagination-load]").removeClass("pagination-loading");
			}
		},
		_create : function (){
			var self = this,
				ele  = this.element;
			self._wrapPage(ele);
			
			self._initButton(ele);
		},
		_wrapPage : function (target){
			var self = this,
				opts = self.options;
			//var opts = $.data(target, "pagination").options;
			var th = target.addClass("pagination").empty();
			var t = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>").appendTo(th);
			var tr = $("tr", t);
			if(opts.showPageList) {
				var ps = $("<select class=\"pagination-page-list\"></select>");
				for(var i = 0; i < opts.pageList.length; i++) {
					var option = $("<option></option>").text(opts.pageList[i]).appendTo(ps);
					if(opts.pageList[i] == opts.pageSize) {
						option.attr("selected", "selected");
					}
				}
				$("<td></td>").append(ps).appendTo(tr);
				opts.pageSize = parseInt(ps.val());
				$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			}
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-first\" class=\"pagination-first\"></a></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-prev\" class=\"pagination-prev\"></a></td>").appendTo(tr);
			$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			$("<span style=\"padding-left:6px;\"></span>").html(opts.beforePageText).wrap("<td></td>").parent().appendTo(tr);
			$("<td><input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\"></td>").appendTo(tr);
			$("<span style=\"padding-right:6px;\"></span>").wrap("<td></td>").parent().appendTo(tr);
			$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-next\" class=\"pagination-next\"></a></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-last\" class=\"pagination-last\"></a></td>").appendTo(tr);
			if(opts.showRefresh) {
				$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
				$("<td><a href=\"javascript:void(0)\" icon=\"pagination-load\"class=\"pagination-load\"></a></td>").appendTo(tr);
			}
			if(opts.buttons) {
				$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
				for(var i = 0; i < opts.buttons.length; i++) {
					var button = opts.buttons[i];
					if(button == "-") {
						$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
					} else {
						var td = $("<td></td>").appendTo(tr);
						$("<a href=\"javascript:void(0)\"></a>").addClass(button.iconCls || "" + ' l-btn')
							.css("float", "left").text(button.text || "")
							.attr("icon", button.iconCls || "")
							.bind("click", button.handler ||
								function() {
								}).appendTo(td)
							.button({
								plain : true
							});
					}
				}
			}
			$("<div class=\"pagination-info\"></div>").appendTo(th);
			$("<div style=\"clear:both;\"></div>").appendTo(th);
			$("a[icon^=pagination]", th).button({
				plain : true
			});
			th.find("a[icon=pagination-first]").unbind(".pagination").bind("click.pagination", function() {
				if(opts.pageNumber > 1) {
					self.selectPage(target, 1);
				}
			});
			th.find("a[icon=pagination-prev]").unbind(".pagination").bind("click.pagination", function() {
				if(opts.pageNumber > 1) {
					self.selectPage(target, opts.pageNumber - 1);
				}
			});
			th.find("a[icon=pagination-next]").unbind(".pagination").bind("click.pagination", function() {
				var ceil = Math.ceil(opts.total / opts.pageSize);
				if(opts.pageNumber < ceil) {
					self.selectPage(target, opts.pageNumber + 1);
				}
			});
			th.find("a[icon=pagination-last]").unbind(".pagination").bind("click.pagination", function() {
				var ceil = Math.ceil(opts.total / opts.pageSize);
				if(opts.pageNumber < ceil) {
					self.selectPage(target, ceil);
				}
			});
			th.find("a[icon=pagination-load]").unbind(".pagination").bind("click.pagination", function() {
				if(self._trigger('onBeforeRefresh', null, {
						pageNumber : opts.pageNumber,
						pageSize   : opts.pageSize
					}) !=false){
					self.selectPage(target, opts.pageNumber);
					self._trigger('onRefresh', null, {
						pageNumber : opts.pageNumber,
						pageSize   : opts.pageSize
					});
				}
			});
			th.find("input.pagination-num").unbind(".pagination").bind("keydown.pagination", function(e) {
				if(e.keyCode == 13) {
					var num = parseInt($(this).val()) || 1;
					self.selectPage(target, num);
					return false;
				}
			});
			th.find(".pagination-page-list").unbind(".pagination").bind("change.pagination", function() {
				opts.pageSize = $(this).val();
				self._trigger('onChangePageSize', null, opts.pageSize);
				var ceil = Math.ceil(opts.total / opts.pageSize);
				self.selectPage(target, opts.pageNumber);
			});
		},
		selectPage : function (target, number){
			var self = this,
				opts = self.options;
			// var opts = $.data(target, "pagination").options;
			var ceil = Math.ceil(opts.total / opts.pageSize) || 1;
			var num = number;
			if(number < 1) {
				num = 1;
			}
			if(number > ceil) {
				num = ceil;
			}
			opts.pageNumber = num;
			// TODO onSelectPage
			var onSelectPage = opts.onSelectPage;
            if (typeof(onSelectPage) == 'function') {
            	//opts.onSelectPage.call(target, num, opts.pageSize);
				self._trigger('onSelectPage', null, {
					pageNumber : num, 
					pageSize : opts.pageSize
				});
			}
			self._initButton(target);
		},
		_initButton : function (target){
			var self = this,
				opts = self.options;
			//var opts = $.data(target, "pagination").options;
			var ceil = Math.ceil(opts.total / opts.pageSize) || 1;
			var num = target.find("input.pagination-num");
			num.val(opts.pageNumber);
			num.parent().next().find("span").html(opts.afterPageText.replace(/{pages}/, ceil));
			var msg = opts.displayMsg;
			msg = msg.replace(/{from}/, opts.pageSize * (opts.pageNumber - 1) + 1);
			msg = msg.replace(/{to}/, Math.min(opts.pageSize * (opts.pageNumber), opts.total));
			msg = msg.replace(/{total}/, opts.total);
			target.find(".pagination-info").html(msg);
			$("a[icon=pagination-first],a[icon=pagination-prev]", target).button({
				disabled : (opts.pageNumber == 1)
				 //icons: {primary:'pagination-first'}
				//label : '上一页'
			});
			$("a[icon=pagination-next],a[icon=pagination-last]", target).button({
				disabled : (opts.pageNumber == ceil)
			});
			if(opts.loading) {
				target.find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
			} else {
				target.find("a[icon=pagination-load]").find(".pagination-load").removeClass("pagination-loading");
			}
		}
	});
})(jQuery);
