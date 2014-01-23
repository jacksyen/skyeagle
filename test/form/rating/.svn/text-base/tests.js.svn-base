test("ratingbox()", function() {
	/*
	 * 	test-ratingbox
	 */
	ok($('#rating_1').ratingbox());
	ok($('#destroy').click(function() {
		$('#rating_1').ratingbox('destroy');
	}));
	ok($('#disable').click(function() {
		$('#rating_1').ratingbox('disable');
	}));
	ok($('#enable').click(function() {
		$('#rating_1').ratingbox('enable');
	}));
	ok($('#getValue').click(function() {
		var val = $("#rating_1").ratingbox('getValue');
		alert('getVlaue :' + val);
	}));
	ok($('#setValue').click(function() {
		var val = $('#rating_1').ratingbox('setValue', '8');
	}));
	ok($('#rating_1').ratingbox({
		onChange : function() {
			alert('onChange');
		}
	}));
	// $('#rating_2').ratingbox();
});
