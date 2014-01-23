(function($) {

	$.widget('ui.form', {
		options : {
			url : '',
			/**
			 * 提交之前执行 
			 */
			onSubmit : function (){},
			/**
			 * 请求成功返回data数据 
			 */
			onSuccess : function (ui, data){}
		},
		/**
		 * 提交 
		 */
		submit : function (){
			this._bindSubmit(this.options);
		},
		/**
		 * 验证表单 
		 */
		validate : function (){
			// alert($(':input[validate-option|=true]').length);
			//var length = $(':input[validate-option|=true]').length;
			var self = this,
				validate = false,
				ele  = self.element;
			ele.find(':input[validate-option|=true]').each(function(index) {
				validate = $(this).validatebox('validate');
				if(!validate){
					validate = false;
				}
			});
			return validate;
		},
		_bindSubmit : function (opts){
			
			var self = this,
				ele  = self.element;
				
			if(self._trigger('onSubmit', null) == false){
				return;
			}
			
			if(opts.url){
				$(ele).attr('action', opts.url);
			}
			
			var frameId = 'form_frame_' + (new Date().getTime());
			var frame = $('<iframe id="' + frameId + '" name="' + frameId +
				'"></iframe>').attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank')
				.css({
					left : '-1000px',
					top :  '-1000px',
					position : 'absolute'
				});
			
			frame.appendTo($('body'));
			frame.bind('load', loadFrame);
			ele.attr('target', frameId);
			ele[0].submit();
			
			function loadFrame(){
				var frameBody = $('#' + frameId).contents().find('body');
				var data = frameBody.text();
				
				if(data == ''){
					setTimeout(loadFrame, 100);
					return;
				}
				self._trigger('onSuccess', null, data);
			}
		},
		
		_create : function (){
			var self = this;
			var opts = self.options;
			this.element.bind('submit.form',function (){
				self._bindSubmit(opts);
				return false;
			});
		}
	});
})(jQuery);