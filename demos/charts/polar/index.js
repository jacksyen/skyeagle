$(document).ready(function() {

	$('.html').each(function(index) {
		var html = document.getElementById('mm').outerHTML.replace(/</g, '&lt;');
		$(this).append(html);
	});

	$("#tabs1").tabs({
		onActivate : function(event, n) {
			switch(n) {
				case 1:
					initDemo2();
					break;
				case 2:
					initDemo3();
					break;
				case 3:
					initDemo4();
					break;
			}
		}
	});

	/**
	 * demo 1
	 */
	new Highcharts.Chart({
		// chart主体配置
		chart : {
			// 在哪个DOM
			renderTo : 'demo1Container',
			polar : true
		},
		// 主标题
		title : {
			text : '极面图',
		},
		pane: {
	        startAngle: 0,
	        endAngle: 360
	    },
		xAxis : {
			tickInterval: 45,
	        min: 0,
	        max: 360,
	        labels: {
	        	formatter: function () {
	        		return this.value + '°';
	        	}
	        }
		},
		yAxis : {
			min : 0
		},
		// 其他配置参数
		plotOptions: {
	        series: {
	            pointStart: 0,
	            pointInterval: 45
	        },
	        column: {
	            pointPadding: 0,
	            groupPadding: 0
	        }
	    },
		// 数据
		series: [{
            type: 'column',
	        name: 'Column',
	        data: [8, 7, 6, 5, 4, 3, 2, 1],
	        pointPlacement: 'between'
	    }, {
	        type: 'line',
	        name: 'Line',
	        data: [1, 2, 3, 4, 5, 6, 7, 8]
	    }, {
	        type: 'area',
	        name: 'Area',
	        data: [1, 8, 2, 7, 3, 6, 4, 5]
	    }]
	});
	

	// 代码高亮
	DlHighlight.HELPERS.highlightByName("polarchart", "pre");
}); 