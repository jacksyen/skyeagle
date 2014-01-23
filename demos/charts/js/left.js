
/**
 * 生成左侧页面信息 
 */
var LeftPage = function (){
	
};
LeftPage.defaults = [
	{ header : '线性chart',
	  items  : [
	  	{href : '../linechart/index.html',text : 'linechart'}]},
	{ header : '块状chart',
	  items  : [
	  	{href : '../areachart/index.html',text : 'areachart'}]},
	{ header : '柱状chart',
	  items  : [
	  	{href : '../barchart/index.html',text : 'barchart'}]},
	{ header : '饼状chart',
	  items  : [
	  	{href : '../piechart/index.html',text : 'piechart'}]},
	{ header : '动态chart',
	  items  : [
	  	{href : '../splinechart/index.html',text : 'splinechart'}]},
	{ header : '极面图',
	  items  : [
	  	{href : '../polar/index.html',text : 'polarchart'}]}  	
];
LeftPage.prototype.init = function (selector){
	var sele = $(selector);
	var data = LeftPage.defaults;
	for(var i = 0; i < data.length; i++){
		var item = data[i];
		var ul = $('<ul></ul>').addClass('s-box');
		ul.append($('<h2></h2>').html(item.header));
		var content = $('<ul></ul>').addClass('s-box-bd');
		var items = item.items;
		for(var j = 0; j < items.length; j++){
			var cc = items[j];
			var li = $('<li></li>');
			var a = $('<a></a>').html(cc.text).attr({
				'href' : cc.href,// + '#' + cc.text,
				'id'   : cc.text
			});
			li.append(a);
			content.append(li);
			
		}
		ul.append(content);
		sele.append(ul);
	}
	
}
$(document).ready(function (){
	var l = new LeftPage();
	l.init('.leftColumn');
});

