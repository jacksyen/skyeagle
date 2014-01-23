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
				type : 'column'
			},
			// 主标题
			title : {
				text : '基础柱形竖向',
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
				categories : ['1975', '1800', '1850', '1900', '1950', '1999', '2050']
			},
			// Y轴
			yAxis : {
				title : {
					text : '纵轴标题'
				},
				min : 0
			},
			// 其他配置参数
			plotOptions : {
				// 列配置
				column : {
					// 坐标边距
					pointPadding : 0.2,
					// 边框宽度
					borderWidth  : 1,
					borderColor  : '#CEFF66'
				}
			},
			// 数据
			series: [{
                name: 'column 1',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'column 2',
                data: [106, 107, 111, 133, 221, 767, 1766]
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
				type : 'column'
			},
			// 主标题
			title : {
				text : '柱形负值示例',
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
				categories : ['1975', '1800', '1850', '1900', '1950', '1999', '2050']
			},
			// Y轴
			yAxis : {
				title : {
					text : '纵轴标题'
				}
			},
			// 其他配置参数
			plotOptions : {
				// 列配置
				column : {
				}
			},
			// 数据
			series: [{
                name: 'column 1',
                data: [502, 635, 809, -247, 1402, 3634, -268]
            }, {
                name: 'column 2',
                data: [106, -107, 111, 133, 221, -767, 1266]
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
				// chart图类型
				type : 'column'
			},
			// 主标题
			title : {
				text : '标签栏旋转示例',
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
				// 标签样式
				labels : {
					// 旋转角度
					rotation : -45,
					align : 'right',
					style : {
						color : '#99B566',
						fontSize : '13px'
					}
					
				}
			},
			// Y轴
			yAxis : {
				title : {
					text : '纵轴标题'
				}
			},
			// 其他配置参数
			plotOptions : {
				// 列配置
				column : {
				}
			},
			tooltip : {
				enabled : false
			},
			// 数据
			series: [{
                name: 'column 1',
                data: [502, 635, 809, 247, 1402, 3634, 4268],
                // 数据标签样式
                dataLabels : {
                	enabled : true,
                	rotation : -90,
                	color : '#ccc',
                	align : 'center'
                }
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
			renderTo : 'demo1Container',
			// chart图类型为区域图
			type : 'bar'
		},
		// 主标题
		title : {
			text : '基础横向chart',
			x : 0
		},
		// 副标题
		subtitle : {
			text : '副标题',
			x : 0
		},
		// X轴
		xAxis : {
			categories: ['一', '二', '三', '四', '五'],
			title: {
                text: null
            }
		},
		// Y轴
		yAxis : {
			min : 0,
			title : {
				text : '纵轴标题',
				align: 'high'
			}
		},
		plotOptions : {
			bar : {
				dataLabels: {
                    enabled: true
				}
			}
		},
		// 签名档是否显示
		credits: {
            enabled: false
        },
		// 数据
		series: [{
            name: 'bar 1',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'bar 2',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'bar 3',
            data: [973, 914, 4054, 732, 34]
        }]
	});

	// 代码高亮
	DlHighlight.HELPERS.highlightByName("barchart", "pre");
}); 