
/**
 * 生成左侧页面信息 
 */
var LeftPage = function (){
	
};
LeftPage.defaults = [
	{ header : '基础模块',
	  items  : [
	  	{href : '../../basic/draggable/index.html',text : 'draggable'},
	  	{href : '../../basic/droppable/index.html',text : 'droppable'},
	  	{href : '../../basic/resizable/index.html',text : 'resizable'},
	  	{href : '../../basic/pagination/index.html',text : 'pagination'},
	  	{href : '../../basic/toolbar/index.html',text : 'toolbar'},
	  	{href : '../../basic/statusbar/index.html',text : 'statusbar'},
	  	{href : '../../basic/searchbox/index.html',text : 'searchbox'},
	  	{href : '../../basic/progressbar/index.html',text : 'progressbar'}]},
	{ header : 'layout布局',
	  items  : [
	  	{href : '../../layout/panel/index.html',text : 'panel'},
	  	{href : '../../layout/tabs/index.html',text : 'tabs'},
	  	{href : '../../layout/layout/index.html',text : 'layout'},
	  	{href : '../../layout/accordion/index.html',text : 'accordion'}]},
	{ header : 'Menu && Button模块',
	   items  : [
	  	{href : '../../menu-button/button/index.html',text : 'button'},
	  	{href : '../../menu-button/menu/index.html',text : 'menu'},
	  	{href : '../../menu-button/menubutton/index.html',text : 'menubutton'},
	  	{href : '../../menu-button/processmenu/index.html',text : 'processmenu'}]},
	{ header : 'form模块',
	  items  : [
	  	{href : '../../form/autocomplete/index.html',text : 'autocomplete'},
	  	{href : '../../form/calendar/index.html',text : 'calendar'},
	  	{href : '../../form/combo/index.html',text : 'combo'},
	  	{href : '../../form/combogrid/index.html',text : 'combogrid'},
	  	{href : '../../form/combotree/index.html',text : 'combotree'},
	  	{href : '../../form/datepicker/index.html',text : 'datepicker'},
	  	{href : '../../form/datetimepicker/index.html',text : 'datetimepicker'},
	  	{href : '../../form/fileupload/index.html',text : 'fileupload'},
	  	{href : '../../form/form/index.html',text : 'form'},
	  	{href : '../../form/linkagebox/index.html',text : 'linkagebox'},
	  	{href : '../../form/numberbox/index.html',text : 'numberbox'},
	  	{href : '../../form/numberspinner/index.html',text : 'numberspinner'},
	  	{href : '../../form/rating/index.html',text : 'rating'},
	  	{href : '../../form/slider/index.html',text : 'slider'},
	  	{href : '../../form/timespinner/index.html',text : 'timespinner'},
	  	{href : '../../form/validatebox/index.html',text : 'validatebox'}]},
	{ header : 'window模块',
	  items  : [
	  	{href : '../../window/dialog/index.html',text : 'dialog'},
	  	{href : '../../window/messagebox/index.html',text : 'messagebox'}]},
	{ header : 'datagrid && tree模块',
	  items  : [
	  	{href : '../../datagrid-tree/datagrid/index.html',text : 'datagird'},
	  	{href : '../../datagrid-tree/tree/index.html',text : 'tree'}]}
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

