$(document).ready(function() {

	$('.html').each(function(index) {
		var html = document.getElementById('mm').outerHTML.replace(/</g, '&lt;');
		$(this).append(html);
	});

	/**
	 * demo 2
	 */
	function initDemo2() {
		new Highcharts.Chart({
			// chart主体配置
			chart : {
				// 在哪个DOM
				renderTo : 'lableLineCon',
				// chart图类型
				type : 'line'
			},
			// 主标题
			title : {
				text : '显示文字功能',
				x : 0
			},
			// 副标题
			subtitle : {
				text : '副标题',
				x : 0
			},
			// X轴
			xAxis : {
				// 类别
				categories : ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
			},
			// Y轴
			yAxis : {
				title : {
					text : '纵轴标题'
				}
			},
			// 图例
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : 0,
				y : 0,
				borderWidth : 0
			},
			// 其他配置参数
			plotOptions : {
				// 线性配置
				line : {
					// 启用文字标签内容
					dataLabels : {
						enabled : true
					},
					// 禁用鼠标滑过显示框事件
					enableMouseTracking : false
				}
			},
			// 数据
			series : [{
				name : 'line 1',
				data : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3]
			}, {
				name : 'line2',
				data : [11.0, 6.1, 3.5, 24.5, 8.2, 1.5, 5.2, 6.5, 3.3, 8.3]
			}]
		});
	}

	/**
	 * demo 3
	 */
	function initDemo3() {
		new Highcharts.Chart({
			// chart主体配置
			chart : {
				// 在哪个DOM
				renderTo : 'splineCon',
				// chart图类型
				type : 'spline'
			},
			// 主标题
			title : {
				text : '纵轴线',
				x : 0
			},
			// 副标题
			subtitle : {
				text : '副标题',
				x : 0
			},
			// X轴
			xAxis : {
				// 类别
				categories : ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
			},
			// Y轴
			yAxis : {
				title : {
					text : '纵轴标题'
				}
			},
			// 图例
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : 0,
				y : 0,
				borderWidth : 0
			},
			// 其他配置参数
			plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    }
                }
            },
            // 工具标签
            tooltip : {
            	// 显示十字线
            	crosshairs : true
            },
			// 数据
			series : [{
				// 名称
				name : 'line 1',
				// 标记符号为方形
				marker : {
					symbol : 'square'
				},
				data : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3]
			}, {
				name : 'line2',
				// 标记符号为菱形
				marker: {
                    symbol: 'diamond'
                },
				data : [11.0, 6.1, 3.5, 24.5, 8.2, 1.5, 5.2, 6.5, 3.3, 8.3]
			}]
		});
	}
	
	/**
	 * demo 4
	 */
	function initDemo4() {
		new Highcharts.Chart({
			// chart主体配置
			chart : {
				// 在哪个DOM
				renderTo : 'demo4Con',
				// chart图类型(默认为line)
				//type : 'line'
			},
			// 主标题
			title : {
				text : '对轴线示例',
				x : 0
			},
			// 副标题
			subtitle : {
				text : '副标题',
				x : 0
			},
			// X轴
			xAxis : {
				// 时间间隔刻度
				tickInterval : 1
			},
			// Y轴
			yAxis : {
				// 对轴类型
				type : 'logarithmic',
				// 次要的时间间隔刻度
				minorTickInterval : 0.1
			},
            // 工具标签
            tooltip : {
            	// 显示十字线
            	crosshairs : true,
            	// 提示框头部格式
            	headerFormat : '<b>{series.name}</b><br/>',
            	// 坐标点格式
            	pointFormat : 'x = {point.x}, y = {point.y}'
            },
			// 数据
			series : [{
				// 名称
				name : 'line 1',
				// 坐标点开始位置
				pointStart : 1,
				data : [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
			}]
		});
	}


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
			renderTo : 'basicContainer',
			// chart图类型
			type : 'line',
			// 右边距
			marginRight : 90,
			// 下边距
			marginBottom : 25
		},
		// 主标题
		title : {
			text : '基础线性chart',
			x : 0
		},
		// 副标题
		subtitle : {
			text : '副标题',
			x : 0
		},
		// X轴
		xAxis : {
			// 类别
			categories : ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
		},
		// Y轴
		yAxis : {
			title : {
				text : '纵轴标题'
			}
		},
		// 图例
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'top',
			x : 0,
			y : 0,
			borderWidth : 0
		},
		// 数据
		series : [{
			name : 'line 1',
			data : [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3]
		}, {
			name : 'line2',
			data : [11.0, 6.1, 3.5, 24.5, 8.2, 1.5, 5.2, 6.5, 3.3, 8.3]
		}]
	});

	// 代码高亮
	DlHighlight.HELPERS.highlightByName("linechart", "pre");
}); 