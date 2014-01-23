(function($) {
	$.widget('ui.linkagebox', {
		options : {
			data : ''
		},
		
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			$.data(ele, 'linkagebox',{
				count : json.count,
				data : ''
			});
			
			
			// 生成产生combo的div标签
			ele.children().addClass('fuck').each(function(index) {
		  		var div = $('<div></div>').addClass('link' + index);
		  		$(this).append(div);
			});
			
			// 取数据的方法
			// 第一层的元素
			// opts.data.data[0]
			// opts.data.data[0][1]
			// 第二层的元素
			// opts.data.data[1]['中国']
			// opts.data.data[1]['中国'][1]
			// 第三层的元素
			// opts.data.data[2]['中国-合肥']
			// opts.data.data[2]['中国-合肥'][1]
			
			// alert(opts.data.data[2]['中国-合肥'][1]);	
			
			// 给div标签添加内容
			// alert(opts.data.data[0].length);
			
			// for(var i = 0; i < json.data[0].length; i++) {
				// var sp_link0 = $('<div class="sp"></div>').text(json.data[0][i]);
				// ele.find('.link0').append(sp_link0);
				// var data_link1 = json.data[0][i];
				// for(var j = 0; j < json.data[1][json.data[0][i]].length; j++) {
					// var sp_link1 = $('<div class="sp"></div>').text(json.data[1][data_link1][j]);
					// ele.find('.link1').append(sp_link1);
					// var data_link2 = json.data[0][i]+json.data[1][data_link1][j];
					// for(var k = 0; k < json.data[2][data_link2].length; k++) {
						// var sp_link2 = $('<div class="sp"></div>').text(json.data[2][[data_link2]][k]);
						// ele.find('.link2').append(sp_link2);
					// }
				// }
			// }
			
			// link0
			// for(var i = 0; i < json.data[0].length; i++) {
				// var sp_link0 = $('<div class="sp"></div>').addClass('sp' + i).text(json.data[0][i]);
				// ele.find('.link0').append(sp_link0);
			// }
			
			// 添加combo
			ele.children().each(function (index){
				$(this).find('.link' + index).combo({
					width : 150,
					editable : true,
					radioable : true,
					required : true,
					value : '请选择'
				});
			});
// 			
			// ele.
			
			// 生成combo
			// ele.find('.link0').combo({
				// width : 150,
				// editable : true,
				// radioable : true,
				// required : true,
				// value : '请选择'
			// });
			
			this._bindEvents();
		},
		_init : function() {
			//some code
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// alert(ele.html());
			var data_0;
	  		ele.find('.link0').children().each(function(index) {
				$(this).bind('click.linkagebox', function(event) {
					$.data(ele, 'linkagebox').data = json.data[0][index];
					data_0 = json.data[0][index];
					// alert(data_0);
					self._buildData(json.data[0][index]);
				});
			});
		},
		_buildData : function(target) {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			var ss = json.data[1][target].length;
			for(var j = 0; j < ss; j++) {
				data_1 = json.data[1][target][j];
				var sp_link1 = $('<div class="sp"></div>').addClass('sp' + j).text(data_1);
				ele.find('.link1').append(sp_link1);
			}
			ele.find('.link1').combo({
				width : 150,
				editable : true,
				radioable : true,
				required : true,
				value : '请选择'
			});
		}
	});
})(jQuery);