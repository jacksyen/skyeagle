test("combo()", function() {
	/*
	 * 	test-combo
	 */
	ok($('#combo').combo({
					width : 150,
					panelWidth : 300,
					// tipwidth : 50,
					editable : true,
					radioable : false,
					multiable : true,
					required : true,
					value : 'Java',
					missMsg : 'mmmmmmmmmmmmmmsdfsafgadfg'
					}));
	ok($('#combo2').combo({
					width : 200,
					editable : true,
					radioable : true
				}));
	ok($('#getPanel').click(function (){
					var panel = $('#combo').combo('panel');
					alert(panel.html());
				}));
	ok($('#destroy').click(function (){
					$('#combo').combo('destroy');
				}));
	ok($('#resize').click(function (){
					$('#combo').combo('resize',{
						width : 300,
						panelWidth : 150
					});
				}));
	ok($('#showPanel').click(function (){
					$('#combo').combo('showPanel');
				}));
	ok($('#hidePanel').click(function (){
					$('#combo').combo('hidePanel');
				}));
	ok($('#disable').click(function (){
					$('#combo').combo('disable');
				}));
	ok($('#enable').click(function (){
					$('#combo').combo('enable');
				}));
	ok($('#validate').click(function (){
					var validate = $('#combo').combo('validate');
					alert('validate:' + validate);
				}));
	ok($('#clear').click(function (){
					$('#combo').combo('clear');
				}));
	ok($('#getValue').click(function (){
					var val = $('#combo').combo('getValue');
					alert('getVlaue :' + val);
				}));
	ok($('#setValue').click(function (){
					var val = $('#combo').comboas('setValue','aaaa');
					// alert('setValue :' + val);
				}));
	ok($('#setData').click(function (){
					$('#combo').combo('setData',['Hello','XXX','SsSS']);
				}));
});
