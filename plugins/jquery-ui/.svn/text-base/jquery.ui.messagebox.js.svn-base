/*!
 * jQuery UI MessageBox @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function( $, undefined ) {
	
	var close = function(target, handler, value){
	    handler ? handler(value) : jQuery.noop();
	    $(target).dialog('close');
	};
	
	var _show = function (config){
		var onClose = config.onClose;
		var doc = $('<div></div>').attr('id','mb-' + $.messagebox.defaultConfig.id++).appendTo(document.body);
		var p = $('<p></p>')
		var img = $('<span></span>').addClass('ui-icon ui-icon-'+config.type);
		img.css({
			float  : 'left',
			margin : '0 7px 20px 0'
		});
		p.append(img).append(config.content);
		doc.append(p);
		
		doc.dialog({
			resizable: false,
			title : config.title,
			modal: true,
			dialogClass: "alert",
			close : function (event, ui){
				$(this).dialog('destroy');
			},
			buttons: {
				 "Ok": function() {
				 	close(this, onClose, true); 
				 }
			}
			
		});
		
	}
	
	$.messagebox = {
		show  : function (options){
			var opts = $.extend({
				showType: 'slide',
				showSpeed: 600,
				width: 250,
				height: 100,
				msg: '',
				title: '',
				timeout: 4000,
				onClose: function (){}
			}, options || {});
			var doc = $('<div></div>').attr('id','mb-' + $.messagebox.defaultConfig.id++).html(opts.msg).appendTo(document.body);
			doc.dialog({
				resizable: false,
				title : opts.title,
				modal: true,
				// dialogClass: "alert",
				close : function (event, ui){
					$(this).dialog('destroy');
				},
				buttons: {
					 "Ok": function() {
					 	close(this, opts.onClose, true); 
					 }
				}
				
			});
			
			
		},
		
		alert: function(title, msg, icon, fn) {
			var content = '<div>' + msg + '</div>';
			
			switch(icon){
				case 'error':
					content = '<div class="messager-icon messager-error"></div>' + content;
					break;
				case 'info':
					content = '<div class="messager-icon messager-info"></div>' + content;
					break;
				case 'question':
					content = '<div class="messager-icon messager-question"></div>' + content;
					break;
				case 'warning':
					content = '<div class="messager-icon messager-warning"></div>' + content;
					break;
			}
			var doc = $('<div></div>').attr('id','mb-' + $.messagebox.defaultConfig.id++).html(content).appendTo(document.body);
			doc.dialog({
				resizable: false,
				title : title,
				modal: true,
				// dialogClass: "alert",
				close : function (event, ui){
					$(this).dialog('destroy');
				},
				buttons: {
					 "Ok": function() {
					 	close(this, fn, true); 
					 }
				}
				
			});
		},
		confirm: function(title, msg, fn) {
			var content = '<div class="messager-icon messager-question"></div>'
					+ '<div>' + msg + '</div>';
			var doc = $('<div></div>').attr('id','mb-' + $.messagebox.defaultConfig.id++).html(content).appendTo(document.body);
			doc.dialog({
				resizable: false,
				title : title,
				modal: true,
				// dialogClass: "alert",
				close : function (event, ui){
					$(this).dialog('destroy');
				},
				buttons: {
					 'Ok': function() {
					 	close(this, fn, true); 
					 },
					 'Cancel' : function (){
					 	close(this, fn, false); 
					 }
				}
				
			});
		},
		prompt: function(title, msg, fn) {
			var content = '<div class="messager-icon messager-question"></div>'
						+ '<div>' + msg + '</div>'
						+ '<br/>'
						+ '<input class="messager-input" type="text"/>';
			var doc = $('<div></div>').attr('id','mb-' + $.messagebox.defaultConfig.id++).html(content).appendTo(document.body);
			doc.dialog({
				resizable: false,
				title : title,
				modal: true,
				// dialogClass: "alert",
				close : function (event, ui){
					$(this).dialog('destroy');
				},
				buttons: {
					 'Ok': function() {					 	
					 	close(this, fn, $('.messager-input',doc).val()); 
					 },
					 'Cancel' : function (){
					 	close(this, fn, false); 
					 }
				}
				
			});
		}
	};
	$.messagebox.defaultConfig = {
		id : 0
	}
}( jQuery ) );
