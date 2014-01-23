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
				type : 'pie'
			},
			// 主标题
			title : {
				text : '无文字连接示例',
				x : 0
			},
			// 副标题
			subtitle : {
				text : '副标题',
				x : 0
			},
			tooltip : {
				pointFormat : '{series.name} : <b>{point.percentage}%</b>',
				percentageDecimals : 1
			},
			// 其他配置参数
			plotOptions : {
				// 饼状图配置
				pie : {
					// 是否可以选择
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : false
					},
					showInLegend : true
				}
			},
			// 数据
			series: [{
                type: 'pie',
                name: '浏览器占有率',
                data: [
                    ['Firefox',   45.0],
                    ['IE',       26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari',    8.5],
                    ['Opera',     6.2],
                    ['Others',   0.7]
                ]
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
			// 类型
			type : 'spline',
			// 右边距
			marginRight : 10,
			// 事件
			events : {
				load : function (){
					var series = this.series[0];
					setInterval(function (){
						var x = (new Date()).getTime(),
							y = Math.random();
						series.addPoint([x, y], true, true);
					}, 1000)
				}
			}
		},
		// 主标题
		title : {
			text : '线性动态chart图',
			x : 0
		},
		// 副标题
		subtitle : {
			text : '副标题',
			x : 0
		},
		// X 轴
		xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        // Y 轴
        yAxis: {
            title: {
                text: '值'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
		tooltip : {
			formatter : function (){
				return '<b>' + this.series.name + '</b><br />' + 
					Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                    Highcharts.numberFormat(this.y, 2);
			}
		},
		// 标签是否显示
		legend :{
			enabled : false
		},
		exporting: {
            enabled: false
        },
		// 数据
		series: [{
            name: '随机数据',
           	data: (function (){
           		var data = [],
           			time = (new Date()).getTime(),
           			i;
           		for(i = -19; i <= 0; i++){
           			data.push({
           				x : time + i * 1000,
           				y : Math.random()
           			})
           		}
           		return data;
           	})()
        }]
	});

	// 代码高亮
	DlHighlight.HELPERS.highlightByName("piechart", "pre");
}); 