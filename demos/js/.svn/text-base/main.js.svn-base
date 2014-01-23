/**
 * 添加页码锚点 
 
$(document).ready(function (){
	var local = window.location.href;
	//var pattern =/^([0-9a-zA-Z-.:\/])+.html#\w+/;
	var pattern =/#\w+/;
	var href = local.match(pattern)[0];
	var pos = $(href).offset().top;
    $("html,body").animate({scrollTop: pos-100}, 1000);
});
*/

var MainPage = function (){
	
};
/**
 * 定义数据格式 
 */
/*
var d = {
	general : {
		title   : '',
		content : ['基于jqueryUI，可拖动的插件，通过鼠标拖动选中的元素','基于jqueryUI，可拖动的插件，通过鼠标拖动选中的元素']
	},
	definite: [
		{
			id : 'dependencies',
			content : []
		},
		{
			id : 'extend',
			content : []
		},
		{
			id : 'usage',
			content : []
		},
		{
			id : 'properties',
			content : [
				['disabled', 'Boolean', '是否禁用组件。如果禁用，则不可以进行任何操作。', 'false']]
		},
		{
			id : 'methods',
			content : [
				['destroy', 'null', '完全移除一个可拖动控件, 使其回退到该元素被初始化成可拖动控件之前的状态.', '']]
		},
		{
			id : 'events',
			content : [
				['create', 'event, ui', '被创建时触发']]
		},
	]
}*/


/**
 * 生成主页面信息 
 * @param {Object} data 数据源
 */
MainPage.prototype.init = function (selector, data){
	var sele = $(selector);
	// init general
	var gData = data.general;
	var gen = $('<div class="general-info"></div>');
	gen.append($('<h1></h1>').html(gData.title));
	var genBlock = $('<div class="line-block"></div>');
	var gCnt = gData.content;
	for(var i = 0; i < gCnt.length; i++){
		var line = $('<div class="line"></div>').html(gCnt[i]);
		genBlock.append(line);
	}
	gen.append(genBlock);
	
	// init definite
	var dData = data.definite;
	var def = $('<div class="definite-info"></div>');
	for(var i = 0; i < dData.length; i++){
		var dd = dData[i];
		var block = $('<div class="block"></div>').attr('id', dd.id);
		block.append($('<h1></h1>').html(dd.id));
		var dCnt = dd.content;
		if(dCnt.length === 0){
			continue;
		}
		var lineBlock = $('<div class="line-block"></div>');
		switch (dd.id){
			case 'properties':
				var tbl = initTbl(['名称','参数类型','描述','默认值'], dCnt);
				lineBlock.append(tbl);
				break;
			case 'methods':
				var tbl = initTbl(['名称','参数','描述','返回值'], dCnt);
				lineBlock.append(tbl);
				break;
			case 'events':
				var tbl = initTbl(['名称','参数','描述'], dCnt);
				lineBlock.append(tbl);
				break;
			default:
				for(var j = 0; j < dCnt.length; j++){
					var line = $('<div class="line"></div>').html(dCnt[j]);
					lineBlock.append(line);
				}
		}
		block.append(lineBlock);
		def.append(block);
	}
	sele.append(gen);
	sele.append(def);
	
	/**
	 * 生成属性、事件、方法表格对象 
 	 * @param {Object} tr 表头列数据集合
	 */
	function initTbl (tr, dCnt){
		var tbl = $('<table></table>');
		var header = $('<tr class="tbl-header"></tr>');
		for(var i = 0; i < tr.length; i++){
			var td = $('<td></td>').html(tr[i]);
			header.append(td);
		}
		tbl.append(header);
		for(var x = 0; x < dCnt.length; x++){
			var tr = $('<tr></tr>');
			var tdData = dCnt[x];
			for(var y = 0; y < tdData.length; y++){
				var td = $('<td></td>').html(tdData[y]);
				tr.append(td);
			}
			tbl.append(tr);
		}
		return tbl;
	}
};

