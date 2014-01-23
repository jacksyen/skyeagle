(function($) {

	$.widget('ui.form', {
		options : {
			url : ''
		},
		submit : function (){
			var target = $(this.element)[0];
			target.submit();
		},
		_create : function (){
			var self = this;
			this.element.bind('submit.form',function (){
				self._trigger('onSubmit', null);
				// alert($(':input[validate-option|=true]').length);
				var length = $(':input[validate-option|=true]').length;
				var validate = false;
				$(':input[validate-option|=true]').each(function(index) {
					
					validate = $(this).validatebox('validate');
					if(!validate){
						validate = false;
					}
					
					// if(!validate) {
						// return false;
					// } else {
						// return true;
					// }
				});
				if(validate){
					self[0].submit();
					
				}
				// return validate;
				return false;
			});
		}
	});
})(jQuery);