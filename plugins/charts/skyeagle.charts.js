(function ($){
	
	$.widget('ui.charts',{
		options : {
			// X轴配置
			xAxis : {
				
			},
			// Y轴配置
			yAxis : {
				
			},
			// 坐标配置
			series : [
				
			],
			
			colors : ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
			
			symbols : ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
			// 语言支持
			lang : {
				loading : 'Loading...',
				months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				shortMonths : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				weekdays : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				decimalPoint : '.',
				numericSymbols : ['k', 'M', 'G', 'T', 'P', 'E'], // SI prefixes used in axis labels
				resetZoom : 'Reset zoom',
				resetZoomTitle : 'Reset zoom level 1:1',
				thousandsSep : ','
			},
			// 全局配置
			global : {
				useUTC : true,
				canvasToolsURL : 'http://code.highcharts.com/2.3.2/modules/canvas-tools.js',
				VMLRadialGradientURL : 'http://code.highcharts.com/2.3.2/gfx/vml-radial-gradient.png'
			},
			// 主图形
			chart : {
				//animation: true,
				//alignTicks: false,
				//reflow: true,
				//className: null,
				//events: { load, selection },
				//margin: [null],
				//marginTop: null,
				//marginRight: null,
				//marginBottom: null,
				//marginLeft: null,
				borderColor : '#4572A7',
				//borderWidth: 0,
				borderRadius : 5,
				defaultSeriesType : 'line',
				ignoreHiddenSeries : true,
				//inverted: false,
				//shadow: false,
				spacingTop : 10,
				spacingRight : 10,
				spacingBottom : 15,
				spacingLeft : 10,
				style : {
					fontFamily : '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
					fontSize : '12px'
				},
				backgroundColor : '#FFFFFF',
				//plotBackgroundColor: null,
				plotBorderColor : '#C0C0C0',
				//plotBorderWidth: 0,
				//plotShadow: false,
				//zoomType: ''
				resetZoomButton : {
					theme : {
						zIndex : 20
					},
					position : {
						align : 'right',
						x : -10,
						//verticalAlign: 'top',
						y : 10
					}
					// relativeTo: 'plot'
				}
			},
			// 标题
			title : {
				text : 'Chart title',
				align : 'center',
				// floating: false,
				// margin: 15,
				// x: 0,
				// verticalAlign: 'top',
				y : 15,
				style : {
					color : '#3E576F',
					fontSize : '16px'
				}

			},
			// 副标题
			subtitle : {
				text : '',
				align : 'center',
				// floating: false
				// x: 0,
				// verticalAlign: 'top',
				y : 30,
				style : {
					color : '#6D869F'
				}
			},
			
			plotOptions : {
				line : {// base series options
					allowPointSelect : false,
					showCheckbox : false,
					animation : {
						duration : 1000
					},
					//connectNulls: false,
					//cursor: 'default',
					//clip: true,
					//dashStyle: null,
					//enableMouseTracking: true,
					events : {},
					//legendIndex: 0,
					lineWidth : 2,
					shadow : true,
					// stacking: null,
					marker : {
						enabled : true,
						//symbol: null,
						lineWidth : 0,
						radius : 4,
						lineColor : '#FFFFFF',
						//fillColor: null,
						states : {// states for a single point
							hover : {
								enabled : true
								//radius: base + 2
							},
							select : {
								fillColor : '#FFFFFF',
								lineColor : '#000000',
								lineWidth : 2
							}
						}
					},
					point : {
						events : {}
					},
					dataLabels : merge(defaultLabelOptions, {
						enabled : false,
						y : -6,
						formatter : function() {
							return this.y;
						}
						// backgroundColor: undefined,
						// borderColor: undefined,
						// borderRadius: undefined,
						// borderWidth: undefined,
						// padding: 3,
						// shadow: false
					}),
					cropThreshold : 300, // draw points outside the plot area when the number of points is less than this
					pointRange : 0,
					//pointStart: 0,
					//pointInterval: 1,
					showInLegend : true,
					states : {// states for the entire series
						hover : {
							//enabled: false,
							//lineWidth: base + 1,
							marker : {
								// lineWidth: base + 1,
								// radius: base + 1
							}
						},
						select : {
							marker : {}
						}
					},
					stickyTracking : true
					//tooltip: {
					//pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>'
					//valueDecimals: null,
					//xDateFormat: '%A, %b %e, %Y',
					//valuePrefix: '',
					//ySuffix: ''
					//}
					// turboThreshold: 1000
					// zIndex: null
				}
			},
			
			labels : {
				//items: [],
				style : {
					//font: defaultFont,
					position : ABSOLUTE,
					color : '#3E576F'
				}
			},
			
			legend : {
				enabled : true,
				align : 'center',
				//floating: false,
				layout : 'horizontal',
				labelFormatter : function() {
					return this.name;
				},
				borderWidth : 1,
				borderColor : '#909090',
				borderRadius : 5,
				navigation : {
					// animation: true,
					activeColor : '#3E576F',
					// arrowSize: 12
					inactiveColor : '#CCC'
					// style: {} // text styles
				},
				// margin: 10,
				// reversed: false,
				shadow : false,
				// backgroundColor: null,
				/*style: {
				 padding: '5px'
				 },*/
				itemStyle : {
					cursor : 'pointer',
					color : '#3E576F',
					fontSize : '12px'
				},
				itemHoverStyle : {
					//cursor: 'pointer', removed as of #601
					color : '#000'
				},
				itemHiddenStyle : {
					color : '#CCC'
				},
				itemCheckboxStyle : {
					position : ABSOLUTE,
					width : '13px', // for IE precision
					height : '13px'
				},
				// itemWidth: undefined,
				symbolWidth : 16,
				symbolPadding : 5,
				verticalAlign : 'bottom',
				// width: undefined,
				x : 0,
				y : 0
			},

			loading : {
				// hideDuration: 100,
				labelStyle : {
					fontWeight : 'bold',
					position : RELATIVE,
					top : '1em'
				},
				// showDuration: 0,
				style : {
					position : ABSOLUTE,
					backgroundColor : 'white',
					opacity : 0.5,
					textAlign : 'center'
				}
			},

			tooltip : {
				enabled : true,
				//crosshairs: null,
				backgroundColor : 'rgba(255, 255, 255, .85)',
				borderWidth : 2,
				borderRadius : 5,
				dateTimeLabelFormats : {
					millisecond : '%A, %b %e, %H:%M:%S.%L',
					second : '%A, %b %e, %H:%M:%S',
					minute : '%A, %b %e, %H:%M',
					hour : '%A, %b %e, %H:%M',
					day : '%A, %b %e, %Y',
					week : 'Week from %A, %b %e, %Y',
					month : '%B %Y',
					year : '%Y'
				},
				//formatter: defaultFormatter,
				headerFormat : '<span style="font-size: 10px">{point.key}</span><br/>',
				pointFormat : '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
				shadow : true,
				shared : useCanVG,
				snap : hasTouch ? 25 : 10,
				style : {
					color : '#333333',
					fontSize : '12px',
					padding : '5px',
					whiteSpace : 'nowrap'
				}
				//xDateFormat: '%A, %b %e, %Y',
				//valueDecimals: null,
				//valuePrefix: '',
				//valueSuffix: ''
			},

			credits : {
				enabled : true,
				text : 'Highcharts.com',
				href : 'http://www.highcharts.com',
				position : {
					align : 'right',
					x : -10,
					verticalAlign : 'bottom',
					y : -5
				},
				style : {
					cursor : 'pointer',
					color : '#909090',
					fontSize : '10px'
				}
			}
			
		},
		/**
		 * 取有值的参数 
		 */
		_pick : function (){
			var args = arguments, i, arg, length = args.length;
			for( i = 0; i < length; i++) {
				arg = args[i];
				if( typeof arg !== 'undefined' && arg !== null) {
					return arg;
				}
			}
		},
		/**
		 * 绑定事件 
		 * @param {Object} el
		 * @param {Object} event
		 * @param {Object} fn
		 */
		_addEvent : function (el, event, fn) {
			$(el).bind(event, fn);
		},
		/**
		 * 添加事件处理程序所必需的自动调整大小 
		 */
		_initReflow : function (){
			var chart = this,
				renderTo = chart.renderTo,
				renderTo = chart.renderTo,
				optionsChart = chart.options.chart;
				
			var reflowTimeout;
			
			function reflow(){
				
			}
			
			this._addEvent(window, 'resize', reflow);
				
				
		},
		init : function (){
			var options = this.options,
				chart   = options.chart,
				margin  = chart.margin,
				margin  = isObject(margin) ?  margin : [margin, margin, margin, margin];
				
			this.optionsMarginTop = this._pick(chart.marginTop, margin[0]);
			this.optionsMarginRight = this._pick(chart.marginRight, margin[1]);
			this.optionsMarginBottom = this._pick(chart.marginBottom, margin[2]);
			this.optionsMarginLeft = this._pick(chart.marginLeft, margin[3]);
			
			// 自适应大小
			if(chart.reflow !== false) {
				this._addEvent(chart, 'load', chart.initReflow);
			}
		}
	})
})(jQuery);
