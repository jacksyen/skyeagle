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
				renderTo : 'demo2Con',
				// chart图类型
				type : 'area'
			},
			// 主标题
			title : {
				text : '堆叠块状示例',
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
				categories : ['1975', '1800', '1850', '1900', '1950', '1999', '2050'],
				tickmarkPlacement : 'on',
				title : {
					enabled : false
				}
			},
			// Y轴
			yAxis : {
				title : {
					text : '纵轴标题'
				},
				// 标签格式化
				labels : {
					formatter : function () {
					  	return this.value / 1000;
					}
				}
			},
			// 其他配置参数
			plotOptions : {
				// 线性配置
				area : {
					// 堆叠方式
					stacking : 'normal',
					lineColor : '#cccccc',
					lineWidth : 1,
					// 区域点的样式
					marker : {
						lineWidth : 1,
						lineColor : '#666666'
					}
				}
			},
			// 数据
			series: [{
                name: 'area 1',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'area 2',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'area 3',
                data: [163, 203, 276, 408, 547, 729, 628]
            }, {
                name: 'area 4',
                data: [18, 31, 54, 156, 339, 818, 1201]
            }, {
                name: 'area 5',
                data: [2, 2, 2, 6, 13, 30, 46]
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
				renderTo : 'demo3Con',
				// chart图类型
				type : 'area'
			},
			// 主标题
			title : {
				text : '百分比示例',
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
				categories : ['1975', '1800', '1850', '1900', '1950', '1999', '2050'],
				tickmarkPlacement : 'on',
				title : {
					enabled : false
				}
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
				area : {
					// 百分比方式
					stacking : 'percent',
					lineColor : '#cccccc',
					lineWidth : 1,
					// 区域点的样式
					marker : {
						lineWidth : 1,
						lineColor : '#666666'
					}
				}
			},
			// 提示框信息
			tooltip : {
				formatter : function (){
					return this.x + ': ' + Highcharts.numberFormat(this.percentage, 1) + '%(' +
						Highcharts.numberFormat(this.y, 0, ',') + 'millions)';
				}
			},
			// 数据
			series: [{
                name: 'area 1',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'area 2',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'area 3',
                data: [163, 203, 276, 408, 547, 729, 628]
            }, {
                name: 'area 4',
                data: [18, 31, 54, 156, 339, 818, 1201]
            }, {
                name: 'area 5',
                data: [2, 2, 2, 6, 13, 30, 46]
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
			// chart图类型为区域图
			type : 'area'
		},
		// 主标题
		title : {
			text : '基础块状chart',
			x : 0
		},
		// 副标题
		subtitle : {
			text : '副标题',
			x : 0
		},
		// X轴
		xAxis : {
			labels: {
                formatter: function() {
                    return this.value; // clean, unformatted number for year
                }
            }
		},
		// Y轴
		yAxis : {
			title : {
				text : '纵轴标题'
			}
		},
		plotOptions : {
			area : {
				pointStart : 1940,
				marker : {
					enabled : false,
					// 区域符号位圆形
					symbol : 'circle',
					// 半径
					radius : 2,
					// 状态
					states : {
						hover : {
							enabled : true
						}
					}
				}
			}
		},
		// 数据
		series : [{
			name : 'area 1',
			data: [null, null, null, null, null, 6 , 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104 ]
		}, {
			name : 'area 2',
			data: [null, null, null, null, null, null, null , null , null ,null,
                5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                21000, 20000, 19000, 18000, 18000, 17000, 16000]
		}]
	});

	// 代码高亮
	DlHighlight.HELPERS.highlightByName("linechart", "pre");
}); 