/**
 * @auth 		 jacksyen
 * @created 	 2012.07.02 
 * @description  基于jquery UI扩展的menu组件
 */
(function( $, undefined ) {
	$.widget('ui.menu', {
		version : "@VERSION",
		options : {
			left : null,
			top  : null,
			dataSource : null
		},
		_create : function (){
			var self = this.element;
			self.addClass('ui-menu-container ui-menu-content ui-corner-all');
			self.find('>ul').addClass('ui-menu');
			self.find('a').addClass('ui-corner-all ui-menu-indicator');
			self.find('img').addClass('ui-menu-icon');
			
			self.find('span[role="popup"]').addClass('ui-icon-span');
			
			self.find('ul ul').css('display','none').addClass('ui-menu-content ui-corner-all');
			
			self.find('ul').width('140px');
			
			// self.find('li').each(function(index) {
			  // return false;
			// });
			self.find('li').bind('mouseover.menu', function(event) {
			  	// $(this).attr('se',$(this).find('>ul:first').length);
			  	var u = $(this).find('>ul:first');
			  	var parent = $(this).parent();
			  	
			  	if(u.css('display') == 'none'){
			  		u.css({
			  			display : 'block',
			  			left    : parent.width()
		  			});
			  	}
			  	
			});
			self.find('li').bind('mouseout.menu', function(event) {
			  	$(this).find('>ul:first').css('display','none');
			});
		}
	});
	
})( jQuery );
