(function($) {

	window.Skyeagle = {};

	var defaultOptions = {
		// XML文件
		xmlFile : undefined,
		// XML字符串
		xmlStr : undefined,
		// highcharts文件路径
		globalJs : []

	}
	
	var Chartparser = function(opts) {
		this.options = $.extend(true, opts, defaultOptions);
	}

	Chartparser.prototype = {
		/**
		 * 替换换行符、制表符 
		 */
		_replaceStr : function (str){
			if(str == null){
				return '';
			}
			var reg = /[\r\n\t]/g;
			return str.replace(reg, '');
		},
		/**
		 * 解析XML文件
		 */
		_parseFile : function(xmlFile) {
			xmlFile = this._replaceStr(xmlFile);
			var xmlDoc = null;
			//判断浏览器的类型
			//支持IE浏览器
			if(!window.DOMParser && window.ActiveXObject) {
				var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
				for(var i = 0; i < xmlDomVersions.length; i++) {
					try {
						xmlDoc = new ActiveXObject(xmlDomVersions[i]);
						break;
					} catch(e) {
					}
				}
			}
			//支持Mozilla浏览器
			else if(document.implementation && document.implementation.createDocument) {
				try {
					/* document.implementation.createDocument('','',null); 方法的三个参数说明
					 * 第一个参数是包含文档所使用的命名空间URI的字符串；
					 * 第二个参数是包含文档根元素名称的字符串；
					 * 第三个参数是要创建的文档类型（也称为doctype）
					 */
					xmlDoc = document.implementation.createDocument('', '', null);
				} catch(e) {

				}
			} else {
				return null;
			}
			if(xmlDoc != null) {
				xmlDoc.async = false;
				xmlDoc.load(xmlFile);
			}
			return xmlDoc;
		},
		/**
		 * 解析XML字符串
		 */
		_parseStr : function(xmlStr) {
			xmlStr = this._replaceStr(xmlStr);
			var xmlDoc = null;
			//判断浏览器的类型
			//支持IE浏览器
			if(!window.DOMParser && window.ActiveXObject) {//window.DOMParser 判断是否是非ie浏览器
				var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
				for(var i = 0; i < xmlDomVersions.length; i++) {
					try {
						xmlDoc = new ActiveXObject(xmlDomVersions[i]);
						xmlDoc.async = false;
						xmlDoc.loadXML(xmlString);
						//loadXML方法载入xml字符串
						break;
					} catch(e) {
					}
				}
			}
			//支持Mozilla浏览器
			else if(window.DOMParser && document.implementation && document.implementation.createDocument) {
				try {
					/* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
					 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
					 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
					 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
					 */
					domParser = new DOMParser();
					xmlDoc = domParser.parseFromString(xmlStr, 'text/xml');
				} catch(e) {
				}
			} else {
				return null;
			}
			return xmlDoc;
		},
		/**
		 * 解析XML节点 
 		 * @param {Object} xmlDoc
 		 * @return [Object,Object...] 数组里面包含chart对象
		 */
		_parseNode : function (xmlDoc){
			var self = this;
			
			function parseChart(chartParam){
				var result = new Object();
				for(var i = 0; i < chartParam.length; i++){
					var item = chartParam[i];
					var itemName = item.nodeName;
					
					if(/#.*/g.test(itemName)){
						continue;
					}
					if(item.childNodes.length == 0){
						result[itemName] = '';
						continue;
					}
					// alert(item.childNodes.length + '||' + item.nodeValue);
					if(item.childNodes.length == 1){
						// 判断是否是数组
						var reg = /^\[.*\]$/;
						var val = item.childNodes[0].nodeValue;
						var content = self._replaceStr(val);//.replace(/[\r\n\t]/g,'');
						if(reg.test(content)){
							result[itemName] = eval(content);
						}else{
							result[itemName] = val;
						}
						continue;
					}
					
					var children = item.childNodes;
					result[itemName] = parseChart(children);
					
					// result[itemName] = new Object();
					// for(var j = 0; j < children.length; j++){
						// var nextItem = children[j];
						// result[itemName][nextItem.nodeName] = nextItem.textContent;
					// }
				}
				return result;
			}
			
			var doc = xmlDoc.documentElement;
			
			var nodes = doc.childNodes;
			var result = [];
			for(var j = 0; j < nodes.length; j++){
				var chart = nodes[j];
				if(/#.*/g.test(chart.nodeName) || chart.childNodes.length == 0){
					continue;
				}
				// if(chart.localName == null || chart.childElementCount == 0){
					// continue;
				// }
				
				result.push(parseChart(chart.childNodes));
			}
			
			return result;
		},
		/**
		 * 生成JS字符串 
 		 * @param {Object} charts
		 */
		_generateJs : function (charts){
			var str = '';
			for(var i in charts){
				var chart = charts[i];
				if(chart.chart == null){
					continue;
				}
				str += '<div id="' + chart.chart.renderTo+ '"></div>';
				str += '<script>new Highcharts.Chart(' + JSON.stringify(chart)+ ');</script>';
			}
			//str += '<script>$(document).ready(function (){' + js + '});</script>';
			return str;
		},
		/**
		 * 对外暴露的方法，传入XML字符串或者文件，解析得到HTML内容 
 		 * @param {Object} opts
		 */
		parseXML : function (opts){
			this.options = $.extend(true, opts, this.options);
			var body = this.init();
			var globalJs = this.options.globalJs;
			function getHeader(){
				var result = "";
				for(var js in globalJs){
					result += '<script src="' + globalJs[js] + '" type="text/javascript" language="JavaScript"></script>\n';
				}
				return result;
			}
			return getHeader() + body;
		},
		init : function() {
			var opts = this.options;
			var xmlDoc = null;

			if(opts.xmlFile) {
				xmlDoc = this._parseFile(opts.xmlFile);
			}
			if(opts.xmlStr) {
				xmlDoc = this._parseStr(opts.xmlStr);
			}
			
			var charts = this._parseNode(xmlDoc);
			
			var str = this._generateJs(charts);
			
			return str;
		}
	}
	
	window.Skyeagle.Chartparser = Chartparser;

})(jQuery);
