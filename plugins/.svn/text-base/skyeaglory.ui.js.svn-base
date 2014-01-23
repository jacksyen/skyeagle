/***********************/
/** jquery.ui.core.js **/
/***********************/
/*!
 * jQuery UI @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function( $, undefined ) {

var uuid = 0,
	runiqueId = /^ui-id-\d+$/;

// prevent duplicate loading
// this is only a problem because we proxy existing functions
// and we don't want to double proxy them
$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "@VERSION",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.css(this,'position')) && (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.css(this,'overflow')+$.css(this,'overflow-y')+$.css(this,'overflow-x'));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	uniqueId: function() {
		return this.each(function() {
			if ( !this.id ) {
				this.id = "ui-id-" + (++uuid);
			}
		});
	},

	removeUniqueId: function() {
		return this.each(function() {
			if ( runiqueId.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	},

	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap=#" + mapName + "]" )[0];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.css( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}

$.extend( $.expr[ ":" ], {
	data: function( elem, i, match ) {
		return !!$.data( elem, match[ 3 ] );
	},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support
$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	// access offsetHeight before setting the style to prevent a layout bug
	// in IE 9 which causes the element to continue to take up space even
	// after it is removed from the DOM (#8026)
	div.offsetHeight;

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	// set display to none to avoid a layout bug in IE
	// http://dev.jquery.com/ticket/4014
	body.removeChild( div ).style.display = "none";
});





// deprecated
$.extend( $.ui, {
	// $.ui.plugin is deprecated.  Use the proxy pattern instead.
	plugin: {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var i,
				set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) {
				return;
			}
	
			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},
	
	contains: $.contains,
	
	// only used by resizable
	hasScroll: function( el, a ) {
	
		//If overflow is hidden, the element might have extra content, but the user wants to hide it
		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}
	
		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;
	
		if ( el[ scroll ] > 0 ) {
			return true;
		}
	
		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},
	
	// these are odd functions, fix the API or move into individual plugins
	isOverAxis: function( x, reference, size ) {
		//Determines when x coordinate is over "b" element axis
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		//Determines when x, y coordinates is over "b" element
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );


/***********************/
/** jquery.ui.widget.js **/
/***********************/
/*!
 * jQuery UI Widget @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function( $, undefined ) {

var slice = Array.prototype.slice,
	_cleanData = $.cleanData;
$.cleanData = function( elems ) {
	for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
		try {
			$( elem ).triggerHandler( "remove" );
		// http://bugs.jquery.com/ticket/8235
		} catch( e ) {}
	}
	_cleanData( elems );
};

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( $.isFunction( value ) ) {
			prototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		}
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: name
	}, prototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		// TODO remove widgetBaseClass, see #8155
		widgetBaseClass: fullName,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );
};

$.widget.extend = function( target ) {
	var input = slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if (input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				target[ key ] = $.isPlainObject( value ) ? $.widget.extend( {}, target[ key ], value ) : value;
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					new object( options, this );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			// 1.9 BC for #7810
			// TODO remove dual storage
			$.data( element, this.widgetName, this );
			$.data( element, this.widgetFullName, this );
			this._bind({ remove: "destroy" });
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._bind()
		this.element
			.unbind( "." + this.widgetName )
			// 1.9 BC for #7810
			// TODO remove dual storage
			.removeData( this.widgetName )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( "." + this.widgetName );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( value === undefined ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( value === undefined ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
				.attr( "aria-disabled", value );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_bind: function( element, handlers ) {
		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
		} else {
			// accept selectors, DOM elements
			element = $( element );
			this.bindings = this.bindings.add( element );
		}

		var instance = this;
		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( instance.options.disabled === true ||
						$( this ).hasClass( "ui-state-disabled" ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || jQuery.guid++;
			}

			var match = event.match( /^(\w+)\s*(.*)$/ ),
				eventName = match[1] + "." + instance.widgetName,
				selector = match[2];
			if ( selector ) {
				instance.widget().delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._bind( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._bind( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && ( $.effects.effect[ effectName ] || $.uiBackCompat !== false && $.effects[ effectName ] ) ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

// DEPRECATED
if ( $.uiBackCompat !== false ) {
	$.Widget.prototype._getCreateOptions = function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	};
}

})( jQuery );


/***********************/
/** jquery.ui.mouse.js **/
/***********************/
/*!
 * jQuery UI Mouse @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function( e ) {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	version: "@VERSION",
	options: {
		cancel: 'input,textarea,button,select,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
					$.removeData(event.target, that.widgetName + '.preventClickEvent');
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if( mouseHandled ) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
			$.removeData(event.target, this.widgetName + '.preventClickEvent');
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();
		
		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.browser.msie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + '.preventClickEvent', true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})(jQuery);


/***********************/
/** jquery.ui.draggable.js **/
/***********************/
/*!
 * jQuery UI Draggable @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.draggable", $.ui.mouse, {
	version: "@VERSION",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	},
	_create: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	_destroy: function() {
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {

		var o = this.options;

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;
		
		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
			$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
			.css({
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.positionAbs = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if 'cursorAt' is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		if(o.containment)
			this._setContainment();

		//Trigger event + callbacks
		if(this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		
		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) $.ui.ddmanager.dragStart(this, event);
		
		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if(this._trigger('drag', event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		//if a drop comes from outside (a sortable)
		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}
		
		//if the original element is no longer in the DOM don't bother to continue (see #8269)
		var element = this.element[0], elementInDom = false;
		while ( element && (element = element.parentNode) ) {
			if (element == document ) {
				elementInDom = true;
			}
		}
		if ( !elementInDom && this.options.helper === "original" )
			return false;

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var that = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if(that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if(this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},
	
	_mouseUp: function(event) {
		if (this.options.iframeFix === true) {
			$("div.ui-draggable-iframeFix").each(function() { 
				this.parentNode.removeChild(this); 
			}); //Remove frame helpers
		}
		
		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if( $.ui.ddmanager ) $.ui.ddmanager.dragStop(this, event);
		
		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},
	
	cancel: function() {
		
		if(this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}
		
		return this;
		
	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone().removeAttr('id') : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0),
			right: (parseInt(this.element.css("marginRight"),10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			o.containment == 'document' ? 0 : $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
			o.containment == 'document' ? 0 : $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top,
			(o.containment == 'document' ? 0 : $(window).scrollLeft()) + $(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			(o.containment == 'document' ? 0 : $(window).scrollTop()) + ($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
			var c = $(o.containment);
			var ce = c[0]; if(!ce) return;
			var co = c.offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				(parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0),
				(parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0),
				(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right,
				(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top  - this.margins.bottom
			];
			this.relative_container = c;

		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options
			var containment;
			if(this.containment) {
			if (this.relative_container){
				var co = this.relative_container.offset();
				containment = [ this.containment[0] + co.left,
					this.containment[1] + co.top,
					this.containment[2] + co.left,
					this.containment[3] + co.top ];
			}
			else {
				containment = this.containment;
			}

				if(event.pageX - this.offset.click.left < containment[0]) pageX = containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < containment[1]) pageY = containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > containment[2]) pageX = containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > containment[3]) pageY = containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				var top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? (!(top - this.offset.click.top < containment[1] || top - this.offset.click.top > containment[3]) ? top : (!(top - this.offset.click.top < containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? (!(left - this.offset.click.left < containment[0] || left - this.offset.click.left > containment[2]) ? left : (!(left - this.offset.click.left < containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		//if($.ui.ddmanager) $.ui.ddmanager.current = null;
		this.helper = null;
		this.cancelHelperRemoval = false;
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.Widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: 'valid/invalid'
				if(this.shouldRevert) this.instance.options.revert = true;

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), that = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {
			
			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;
			
			if(this.instance._intersectsWith(this.instance.containerCache)) {

				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(that).clone().removeAttr('id').appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;
					
					//Prevent reverting on this forced stop
					this.instance.options.revert = false;
					
					// The out event needs to be triggered independently
					this.instance._trigger('out', event, this.instance._uiHash(this.instance));
					
					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			//Yes, I know, this is insane ;)
			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);
		});
		if (!group.length) { return; }
		
		var min = parseInt(group[0].style.zIndex) || 0;
		$(group).each(function(i) {
			this.style.zIndex = min + i;
		});

		this[0].style.zIndex = min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})(jQuery);


/***********************/
/** jquery.ui.droppable.js **/
/***********************/
/*!
 * jQuery UI Droppable @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.mouse.js
 *	jquery.ui.draggable.js
 */
(function( $, undefined ) {

$.widget("ui.droppable", {
	version: "@VERSION",
	widgetEventPrefix: "drop",
	options: {
		accept: '*',
		activeClass: false,
		addClasses: true,
		greedy: false,
		hoverClass: false,
		scope: 'default',
		tolerance: 'intersect'
	},
	_create: function() {

		var o = this.options, accept = o.accept;
		this.isover = 0; this.isout = 1;

		this.accept = $.isFunction(accept) ? accept : function(d) {
			return d.is(accept);
		};

		//Store the droppable's proportions
		this.proportions = { width: this.element[0].offsetWidth, height: this.element[0].offsetHeight };

		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [];
		$.ui.ddmanager.droppables[o.scope].push(this);

		(o.addClasses && this.element.addClass("ui-droppable"));

	},

	_destroy: function() {
		var drop = $.ui.ddmanager.droppables[this.options.scope];
		for ( var i = 0; i < drop.length; i++ )
			if ( drop[i] == this )
				drop.splice(i, 1);

		this.element.removeClass("ui-droppable ui-droppable-disabled");
	},

	_setOption: function(key, value) {

		if(key == 'accept') {
			this.accept = $.isFunction(value) ? value : function(d) {
				return d.is(value);
			};
		}
		$.Widget.prototype._setOption.apply(this, arguments);
	},

	_activate: function(event) {
		var draggable = $.ui.ddmanager.current;
		if(this.options.activeClass) this.element.addClass(this.options.activeClass);
		(draggable && this._trigger('activate', event, this.ui(draggable)));
	},

	_deactivate: function(event) {
		var draggable = $.ui.ddmanager.current;
		if(this.options.activeClass) this.element.removeClass(this.options.activeClass);
		(draggable && this._trigger('deactivate', event, this.ui(draggable)));
	},

	_over: function(event) {

		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element

		if (this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.hoverClass) this.element.addClass(this.options.hoverClass);
			this._trigger('over', event, this.ui(draggable));
		}

	},

	_out: function(event) {

		var draggable = $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return; // Bail if draggable and droppable are same element

		if (this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);
			this._trigger('out', event, this.ui(draggable));
		}

	},

	_drop: function(event,custom) {

		var draggable = custom || $.ui.ddmanager.current;
		if (!draggable || (draggable.currentItem || draggable.element)[0] == this.element[0]) return false; // Bail if draggable and droppable are same element

		var childrenIntersection = false;
		this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function() {
			var inst = $.data(this, 'droppable');
			if(
				inst.options.greedy
				&& !inst.options.disabled
				&& inst.options.scope == draggable.options.scope
				&& inst.accept.call(inst.element[0], (draggable.currentItem || draggable.element))
				&& $.ui.intersect(draggable, $.extend(inst, { offset: inst.element.offset() }), inst.options.tolerance)
			) { childrenIntersection = true; return false; }
		});
		if(childrenIntersection) return false;

		if(this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
			if(this.options.activeClass) this.element.removeClass(this.options.activeClass);
			if(this.options.hoverClass) this.element.removeClass(this.options.hoverClass);
			this._trigger('drop', event, this.ui(draggable));
			return this.element;
		}

		return false;

	},

	ui: function(c) {
		return {
			draggable: (c.currentItem || c.element),
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	}

});

$.ui.intersect = function(draggable, droppable, toleranceMode) {

	if (!droppable.offset) return false;

	var x1 = (draggable.positionAbs || draggable.position.absolute).left, x2 = x1 + draggable.helperProportions.width,
		y1 = (draggable.positionAbs || draggable.position.absolute).top, y2 = y1 + draggable.helperProportions.height;
	var l = droppable.offset.left, r = l + droppable.proportions.width,
		t = droppable.offset.top, b = t + droppable.proportions.height;

	switch (toleranceMode) {
		case 'fit':
			return (l <= x1 && x2 <= r
				&& t <= y1 && y2 <= b);
			break;
		case 'intersect':
			return (l < x1 + (draggable.helperProportions.width / 2) // Right Half
				&& x2 - (draggable.helperProportions.width / 2) < r // Left Half
				&& t < y1 + (draggable.helperProportions.height / 2) // Bottom Half
				&& y2 - (draggable.helperProportions.height / 2) < b ); // Top Half
			break;
		case 'pointer':
			var draggableLeft = ((draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left),
				draggableTop = ((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top),
				isOver = $.ui.isOver(draggableTop, draggableLeft, t, l, droppable.proportions.height, droppable.proportions.width);
			return isOver;
			break;
		case 'touch':
			return (
					(y1 >= t && y1 <= b) ||	// Top edge touching
					(y2 >= t && y2 <= b) ||	// Bottom edge touching
					(y1 < t && y2 > b)		// Surrounded vertically
				) && (
					(x1 >= l && x1 <= r) ||	// Left edge touching
					(x2 >= l && x2 <= r) ||	// Right edge touching
					(x1 < l && x2 > r)		// Surrounded horizontally
				);
			break;
		default:
			return false;
			break;
		}

};

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: { 'default': [] },
	prepareOffsets: function(t, event) {

		var m = $.ui.ddmanager.droppables[t.options.scope] || [];
		var type = event ? event.type : null; // workaround for #2317
		var list = (t.currentItem || t.element).find(":data(droppable)").andSelf();

		droppablesLoop: for (var i = 0; i < m.length; i++) {

			if(m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0],(t.currentItem || t.element)))) continue;	//No disabled and non-accepted
			for (var j=0; j < list.length; j++) { if(list[j] == m[i].element[0]) { m[i].proportions.height = 0; continue droppablesLoop; } }; //Filter out elements in the current dragged item
			m[i].visible = m[i].element.css("display") != "none"; if(!m[i].visible) continue; 									//If the element is not visible, continue

			if(type == "mousedown") m[i]._activate.call(m[i], event); //Activate the droppable if used directly from draggables

			m[i].offset = m[i].element.offset();
			m[i].proportions = { width: m[i].element[0].offsetWidth, height: m[i].element[0].offsetHeight };

		}

	},
	drop: function(draggable, event) {

		var dropped = false;
		$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {

			if(!this.options) return;
			if (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance))
				dropped = this._drop.call(this, event) || dropped;

			if (!this.options.disabled && this.visible && this.accept.call(this.element[0],(draggable.currentItem || draggable.element))) {
				this.isout = 1; this.isover = 0;
				this._deactivate.call(this, event);
			}

		});
		return dropped;

	},
	dragStart: function( draggable, event ) {
		//Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
		draggable.element.parentsUntil( "body" ).bind( "scroll.droppable", function() {
			if( !draggable.options.refreshPositions ) $.ui.ddmanager.prepareOffsets( draggable, event );
		});
	},
	drag: function(draggable, event) {

		//If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if(draggable.options.refreshPositions) $.ui.ddmanager.prepareOffsets(draggable, event);

		//Run through all droppables and check their positions based on specific tolerance options
		$.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {

			if(this.options.disabled || this.greedyChild || !this.visible) return;
			var intersects = $.ui.intersect(draggable, this, this.options.tolerance);

			var c = !intersects && this.isover == 1 ? 'isout' : (intersects && this.isover == 0 ? 'isover' : null);
			if(!c) return;

			var parentInstance;
			if (this.options.greedy) {
				var parent = this.element.parents(':data(droppable):eq(0)');
				if (parent.length) {
					parentInstance = $.data(parent[0], 'droppable');
					parentInstance.greedyChild = (c == 'isover' ? 1 : 0);
				}
			}

			// we just moved into a greedy child
			if (parentInstance && c == 'isover') {
				parentInstance['isover'] = 0;
				parentInstance['isout'] = 1;
				parentInstance._out.call(parentInstance, event);
			}

			this[c] = 1; this[c == 'isout' ? 'isover' : 'isout'] = 0;
			this[c == "isover" ? "_over" : "_out"].call(this, event);

			// we just moved out of a greedy child
			if (parentInstance && c == 'isout') {
				parentInstance['isout'] = 0;
				parentInstance['isover'] = 1;
				parentInstance._over.call(parentInstance, event);
			}
		});

	},
	dragStop: function( draggable, event ) {
		draggable.element.parentsUntil( "body" ).unbind( "scroll.droppable" );
		//Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
		if( !draggable.options.refreshPositions ) $.ui.ddmanager.prepareOffsets( draggable, event );
	}
};

})(jQuery);


/***********************/
/** jquery.ui.panel.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.06 
 * @description  基于jquery UI、easyUI扩展的panel组件
 */
(function($) {
	
	$.fn._outerWidth = function(width) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(width);
			} else {
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(height) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).height(height);
			} else {
				$(this).height(height - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	
	$.widget("ui.panel" , {
		version: "@VERSION",
		options : {
			// 标题
			title: null,
			// 图标样式
			iconCls: null,
			// 宽度
			width: 'auto',
			// 高度
			height: 'auto',
			// 靠左距离
			left: null,
			// 靠顶部距离
			top: null,
			// panel样式
			cls: null,
			// 头部样式
			headerCls: null,
			// body样式
			bodyCls: null,
			// 给面板自定义样式
			style: {},
			// 远程URL获取
			href: null,
			// 获取URL时缓存数据
			cache: true,
			// 当设置为true，面板尺寸将适合它的父容器
			fit: false,
			// 定义面板的边框
			border: true,
			// 当设置为true，面板载创建的时候将被调整和重新布局
			doSize: true,
			// 不添加头部
			noheader: false,
			// 具体内容
			content: null,
			// 定义是否显示可折叠定义按钮
			collapsible: true,
			// 定义是否显示最小化按钮
			minimizable: false,
			// 定义是否显示最大化按钮
			maximizable: false,
			// 定义是否显示关闭按钮
			closable: false,
			// 定义在初始化的时候折叠面板
			collapsed: false,
			// 定义在初始化的时候最小化面板
			minimized: false,
			// 定义在初始化的时候最大化面板
			maximized: false,
			// 定义在初始化的时候关闭面板
			closed: false,
			// 自定义工具栏，每一个工具都可以包含2个属性：图标类 和句柄。
			tools: [],	
			// 是否可拖动
			draggabled : false,
			
			// 加载信息
			loadingMsg : '正在加载中...',
			
			/**
			 * 在远程数据被载入时触发
			 */
			onLoad: function(){},
			/**
			 * 在控制面板被打开之前触发，返回false将停止打开 
			 */
			onBeforeOpen: function(){},
			/**
			 * 在控制面板被打开之后触发 
			 */
			onOpen: function(){},
			/**
			 * 在控制面板被关闭之前触发，返回false将取消关闭 
			 */
			onBeforeClose: function(){},
			/**
			 * 在控制面板被关闭后触发 
			 */
			onClose: function(){},
			/**
			 * 在控制面板被注销前触发，返回false将取消注销 
			 */
			onBeforeDestroy: function(){},
			/**
			 * 在控制面板被注销后触发 
			 */
			onDestroy: function(){},
			/**
			 * 在控制面板被缩放后触发  
			 * ui.width：   新的控制面板宽度
			 * ui.height: 新的控制面板高度
			 */
			onResize: function(event, ui){},
			/**
			 * 在控制面板被移动后触发
			 * ui.left：新的控制面板左边距
			 * ui.top：新的控制面板顶边距 
			 */
			onMove: function(event, ui){},
			/**
			 * 在控制面板被最大化后触发 
			 */
			onMaximize: function(){},
			/**
			 * 在控制面板被重置为初始大小后触发 
			 */
			onRestore: function(){},
			/**
			 * 在控制面板被最小化后触发 
			 */
			onMinimize: function(){},
			/**
			 * 在控制面板被折叠之前触发，返回false将停止折叠 
			 */
			onBeforeCollapse: function(){},
			/**
			 * 在控制面板被扩展之前触发，返回false将停止扩展（这里应该是指扩展区域，宽、高等） 
			 */
			onBeforeExpand: function(){},
			/**
			 * 在控制面板被折叠之后触发 
			 */
			onCollapse: function(){},
			/**
			 * 在控制面板被扩展之后触发 
			 */
			onExpand: function(){},
			/**
			 * 
			 */
			onDraggleBegin : function (){
				
			},
			/**
			 * 
			 */
			onDraggleDrag : function (){},
			/**
			 * 
			 */
			onDraggleEnd : function (){}
		},
		/**
		 * 返回选项属性 
		 */
		getOptions : function (){
			return $.data(this.element,'panel').options;
		},
		/**
		 * 返回控制面板对象 
		 */
		panel : function (){
			return $.data(this.element,'panel').panel;
		},
		/**
		 * 返回控制面板头对象 
		 */
		header: function (){
			return $.data(this.element,'panel').panel.find('>div.panel-header');
		},
		/**
		 * 返回控制面板主体对象 
		 */
		body : function (){
			return $.data(this.element,'panel').panel.find('>div.panel-body');
		},
		/**
		 * 设置控制面板头部的标题文本
		 * @param {Object} param 标题文本
		 */
		setTitle : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._setTitle(ele, param);
			});
		},
		/**
		 * 打开控制面板
		 * @param {Object} param 设置为true时，控制面板将被打开，不受onBeforeOpen回调函数的约束
		 */
		open : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._openPanel(ele, param);
			});
		},
		/**
		 * 关闭控制面板
		 * @param {Object} param 设置为true时，控制面板将被关闭，不受onBeforeClose回调函数的约束
		 */
		close : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._closePanel(ele, param);
			});
		},
		/**
		 * 销毁控制面板
		 * @param {Object} param 设置为true时，控制面板将被销毁，不受onBeforeDestroy回调函数的约束
		 */
		destroy : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._destroyPanel(ele, param);
			});
		},
		/**
		 * 当param属性被设置时，刷新控制面板以载入远程数据 
		 */
		refresh : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				$.data(ele, "panel").isLoaded = false;
				if(param) {
					$.data(ele, "panel").options.href = param;
				}
				self._loadData(ele);
			});
		},
		/**
		 * 重置控制面板的尺寸
		 * @param {Object} param {}
		 * 		width：   新的控制面板宽度
		 * 		height： 新的控制面板高度
		 * 		left：     新的控制面板左边距
		 * 		top： 	新的控制面板顶边距
		 */
		resize : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._setSize(ele, param);
			});
		},
		/**
		 * 移动控制面板到一个新的位置
		 * @param {Object} param {}
		 * 		left： 新的控制面板左边距
		 *		top： 新的控制面板顶边距
		 */
		move : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._movePanel(ele, param);
			});
		},
		/**
		 * 使控制面板铺满整个容器 
		 */
		maximize : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._maximizePanel(ele);
			});
		},
		/**
		 * 最小化控制面板 
		 */
		minimize : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._minimizePanel(ele);
			});
		},
		/**
		 * 使最大化的控制面板重置为其初始化时的大小和位置 
		 */
		restore : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._restorePanel(ele);
			});
		},
		/**
		 * 折叠控制面板主体 
		 * @param {Object} param  是否显示动画
		 */
		collapse : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._collapsePanel(ele, param);	// param: boolean,indicate animate or not
			});
		},
		/**
		 * 扩展控制面板主体
		 * @param {Object} param  是否显示动画
		 */
		expand : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._expandPanel(ele, param);	// param: boolean,indicate animate or not
			});
		},
		/**
		 * 移动panel 
		 */
		_movePanel : function (target, param){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(param) {
				if(param.left != null) {
					opts.left = param.left;
				}
				if(param.top != null) {
					opts.top = param.top;
				}
			}
			panel.css({
				left : opts.left,
				top : opts.top
			});
			this._trigger("onMove", null, {
				left : opts.left,
				top  : opts.top
			});
		},
		/**
		 * 销毁panel 
		 */
		_destroyPanel : function (target, forceDestroy){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceDestroy != true) {
				if (this._trigger("onBeforeDestroy") == false) return;
				// if(opts.onBeforeDestroy.call(target) == false) {
					// return;
				// }
			}
			//_1d(target);
			this._removeNode(panel);
			this._trigger("onDestroy");
		},
		/**
		 * 设置标题 
		 */
		_setTitle : function (target, title){
			$.data(target, "panel").options.title = title;
			$(target).panel('header').find('div.panel-title').html(title);
		},
		_create : function (){
			//alert('_create');
		},
		/**
		 * 创建panel初始化 
		 */
		_init : function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
				
			if(!opts.id) {
				opts.id = ele.attr('id') || undefined;
			}
			
			var state = $.data(ele, "panel");
			
			if(state) {
				opts = $.extend(state.options, opts);
			} else {
				ele.attr("title", "");
				state = $.data(ele, "panel", {
					options : opts,
					panel : self._wrapPanel(ele),
					isLoaded : false
				});
			}
			if(opts.content) {
				ele.html(opts.content);
			}
			
			self._addHeader(ele);
			self._setBorder(ele);
			if(opts.doSize == true) {
				state.panel.css("display", "block");
				self._setSize(ele);
			}
			if(opts.closed == true || opts.minimized == true) {
				state.panel.hide();
			} else {
				self._openPanel(ele);
			}
			
			// 配置可拖动
			if(opts.draggabled == true){
				self._setDraggabled(ele);
			}
		},
		/**
		 * 生成panel样式 
		 */
		_wrapPanel : function (target){
			var self = this;
			var panel = $(target).addClass("panel-body").wrap("<div class=\"panel\"></div>").parent();
			panel.bind("_resize", function() {
				var opts = $.data(target, "panel").options;
				if(opts.fit == true) {
					self._setSize(target);
				}
				return false;
			});
			return panel;
		},
		/**
		 * 打开panel 
		 */
		_openPanel : function (target, forceOpen){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceOpen != true) {
				if (this._trigger("onBeforeOpen") == false) return;
				// if(opts.onBeforeOpen.call(target) == false) {
					// return;
				// }
			}
			panel.show();
			opts.closed = false;
			opts.minimized = false;
			this._trigger("onOpen");
			if(opts.maximized == true) {
				opts.maximized = false;
				this._maximizePanel(target);
			}
			if(opts.collapsed == true) {
				opts.collapsed = false;
				this._collapsePanel(target);
			}
			if(!opts.collapsed) {
				this._loadData(target);
				this._panelResize(target);
			}
			
		},
		/**
		 *  添加拖动
		 */
		_setDraggabled : function (target){
			var self = this;
			var panel = $.data(target, "panel").panel;
			var header = panel.children("div.panel-header");
			var pBody = panel.children("div.panel-body");
			panel.draggable({
				handle : header,
				start : function (event, ui){
					self._trigger('onDraggleBegin');
				},
				drag : function (event, ui){
					self._trigger('onDraggleDrag');
				},
				end : function (event, ui){
					self._trigger('onDraggleEnd');
				}
			});
			
		},
		/**
		 * 设置panel大小 
		 */
		_setSize : function (target, param){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var header = panel.children("div.panel-header");
			var pBody = panel.children("div.panel-body");
			if(param) {
				if(param.width) {
					opts.width = param.width;
				}
				if(param.height) {
					opts.height = param.height;
				}
				if(param.left != null) {
					opts.left = param.left;
				}
				if(param.top != null) {
					opts.top = param.top;
				}
			}
			if(opts.fit == true) {
				var p = panel.parent();
				p.addClass("panel-noscroll");
				opts.width = p.width();
				opts.height = p.height();
			}
			panel.css({
				left : opts.left,
				top : opts.top
			});
			if(!isNaN(opts.width)) {
				panel._outerWidth(opts.width);
			} else {
				panel.width("auto");
			}
			header.add(pBody)._outerWidth(panel.width());
			if(!isNaN(opts.height)) {
				panel._outerHeight(opts.height);
				pBody._outerHeight(panel.height() - header.outerHeight());
			} else {
				pBody.height("auto");
			}
			panel.css("height", "");
			this._trigger("onResize", null, {
				width : opts.width, 
				height: opts.height
			});
			// opts.onResize.apply(target, [opts.width, opts.height]);
			panel.find(">div.panel-body>div").triggerHandler("_resize");
			
		},
		/**
		 * 设置边框样式 
		 */
		_setBorder : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var header = $(target).panel("header");
			var pBody = $(target).panel("body");
			
			panel.css(opts.style);
			panel.addClass(opts.cls);
			if(opts.border) {
				header.removeClass("panel-header-noborder");
				pBody.removeClass("panel-body-noborder");
			} else {
				header.addClass("panel-header-noborder");
				pBody.addClass("panel-body-noborder");
			}
			header.addClass(opts.headerCls);
			pBody.addClass(opts.bodyCls);
			
			if(opts.id) {
				$(target).attr("id", opts.id);
			} else {
				$(target).removeAttr('id');
			}
		},
		/**
		 * 添加panel头信息 
		 */
		_addHeader : function (target){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(opts.tools && typeof opts.tools == "string") {
				panel.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
			}
			self._removeNode(panel.children("div.panel-header"));
			if(opts.title && !opts.noheader) {
				var header = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(panel);
				if(opts.iconCls) {
					header.find(".panel-title").addClass("panel-with-icon");
					$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(header);
				}
				var tool = $("<div class=\"panel-tool\"></div>").appendTo(header);
				if(opts.tools) {
					if( typeof opts.tools == "string") {
						$(opts.tools).children().each(function() {
							$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
						});
					} else {
						for(var i = 0; i < opts.tools.length; i++) {
							var tl = opts.tools[i];
							var t = $("<a href=\"javascript:void(0)\" class='ui-icon'></a>").addClass(tl.iconCls).appendTo(tool);
							if(tl.handler) {
								t.click(function(event){
									tl.handler.call(this, self, event);
								});
								//t.bind("click", eval(opts.tools[i].handler));
							}
						}
					}
				}
				if(opts.collapsible) {
					$("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						
						if(opts.collapsed == true) {
							self._expandPanel(target, true);
						} else {
							self._collapsePanel(target, true);
						}
						return false;
					});
				}
				if(opts.minimizable) {
					$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						self._minimizePanel(target);
						return false;
					});
				}
				if(opts.maximizable) {
					$("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						if(opts.maximized == true) {
							self._restorePanel(target);
						} else {
							self._maximizePanel(target);
						}
						return false;
					});
				}
				if(opts.closable) {
					$("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						self._closePanel(target);
						return false;
					});
				}
				panel.children("div.panel-body").removeClass("panel-body-noheader");
			} else {
				panel.children("div.panel-body").addClass("panel-body-noheader");
			}
		},
		/**
		 * 还原panel 
		 */
		_restorePanel  : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var tool = panel.children("div.panel-header").find("a.panel-tool-max");
			if(opts.maximized == false) {
				return;
			}
			panel.show();
			tool.removeClass("panel-tool-restore");
			var original = $.data(target, "panel").original;
			opts.width = original.width;
			opts.height = original.height;
			opts.left = original.left;
			opts.top = original.top;
			opts.fit = original.fit;
			this._setSize(target);
			opts.minimized = false;
			opts.maximized = false;
			$.data(target, "panel").original = null;
			this._trigger("onRestore");
		},
		/*
		 * 最大化panel
		 */
		_maximizePanel : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var tool = panel.children("div.panel-header").find("a.panel-tool-max");
			if(opts.maximized == true) {
				return;
			}
			tool.addClass("panel-tool-restore");
			if(!$.data(target, "panel").original) {
				$.data(target, "panel").original = {
					width : opts.width,
					height : opts.height,
					left : opts.left,
					top : opts.top,
					fit : opts.fit
				};
			}
			opts.left = 0;
			opts.top = 0;
			opts.fit = true;
			this._setSize(target);
			opts.minimized = false;
			opts.maximized = true;
			this._trigger("onMaximize");
		},
		/**
		 * 最小化panel 
		 */
		_minimizePanel : function (target){
			var opts  =$.data(target, "panel").options;
			var panel = $.data(target,'panel').panel;
			panel.hide();
			opts.minimized = true;
			opts.maximized = false;
			this._trigger("onMinimize");
		},
		/**
		 * 删除节点 
		 */
		_removeNode : function (node){
			node.each(function(){
				$(this).remove();
				if ($.browser.msie){
					this.outerHTML = '';
				}
			});
		},
		/**
		 * 关闭panel 
		 */
		_closePanel : function (target, forceClose){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceClose != true) {
				if (this._trigger("onBeforeClose") == false) return;
				// if(opts.onBeforeClose.call(target) == false) {
					// return;
				// }
			}
			panel.hide();
			opts.closed = true;
			this._trigger("onClose");
		},
		/**
		 * 展开面板
 	 	 * @param {Object} animate
		 */
		_expandPanel : function (target, animate){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var pBody = panel.children("div.panel-body");
			var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
			if(opts.collapsed == false) {
				return;
			}
			pBody.stop(true, true);
			if(self._trigger('onBeforeExpand') == false){
				return;
			}
			// if(opts.onBeforeExpand.call(target) == false) {
				// return;
			// }
			tool.removeClass("panel-tool-expand");
			if(animate == true) {
				pBody.slideDown("normal", function() {
					opts.collapsed = false;
					self._trigger('onExpand');
					//opts.onExpand.call(target);
					self._loadData(target);
					self._panelResize(target);
				});
			} else {
				pBody.show();
				opts.collapsed = false;
				self._trigger('onExpand');
				//opts.onExpand.call(target);
				self._loadData(target);
				self._panelResize(target);
			}
		},
		/**
		 * 调用resize事件 
		 */
		_panelResize : function (target){
			$(target).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function() {
				$(this).triggerHandler("_resize", [true]);
			});
		},
		/**
		 * 加载数据 
		 */
		_loadData : function (target){
			var state = $.data(target, "panel");
			if(state.options.href && (!state.isLoaded || !state.options.cache)) {
				state.isLoaded = false;
				// TODO
				//_1d(target);
				var pBody = state.panel.find(">div.panel-body");
				if(state.options.loadingMsg) {
					pBody.html($("<div class=\"panel-loading\"></div>").html(state.options.loadingMsg));
				}
				$.ajax({
					url : state.options.href,
					cache : false,
					success : function(data) {
						pBody.html(state.options.extractor.call(target, data));
						// if($.parser) {
							// $.parser.parse(body);
						// }
						//panel.options.onLoad.apply(target, arguments);
						this._trigger('onLoad', null, arguments);
						state.isLoaded = true;
					}
				});
			}
		},
		/**
		 * 收缩面板
 	 	 * @param {Object} animate
		 */
		_collapsePanel : function (target, animate){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var pBody = panel.children("div.panel-body");
			var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
			if(opts.collapsed == true) {
				return;
			}
			pBody.stop(true, true);
			if(self._trigger('onBeforeCollapse') == false){
				return;
			}
			// if(opts.onBeforeCollapse.call(target) == false) {
				// return;
			// }
			tool.addClass("panel-tool-expand");
			if(animate == true) {
				pBody.slideUp("normal", function() {
					opts.collapsed = true;
					self._trigger('onCollapse');
				});
			} else {
				pBody.hide();
				opts.collapsed = true;
				self._trigger('onCollapse');
			}
		}
	});
})(jQuery);


/***********************/
/** jquery.ui.resizable.js **/
/***********************/
/*!
 * jQuery UI Resizable @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {
$.widget("ui.resizable", $.ui.mouse, {
	version: "@VERSION",
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,
		zIndex: 1000
	},
	_create: function() {
		var that = this, o = this.options;
		this.element.addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!(o.aspectRatio),
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || 'ui-resizable-helper' : null
		});

		//Wrap the element if it cannot hold child nodes
		if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {

			//Create a wrapper element and set the wrapper to the new current internal element
			this.element.wrap(
				$('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
					position: this.element.css('position'),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css('top'),
					left: this.element.css('left')
				})
			);

			//Overwrite the original this.element
			this.element = this.element.parent().data(
				"resizable", this.element.data('resizable')
			);

			this.elementIsWrapper = true;

			//Move margins to the wrapper
			this.element.css({ marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom") });
			this.originalElement.css({ marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});

			//Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css('resize');
			this.originalElement.css('resize', 'none');

			//Push the actual element to our proportionallyResize internal array
			this._proportionallyResizeElements.push(this.originalElement.css({ position: 'static', zoom: 1, display: 'block' }));

			// avoid IE jump (hard set the margin)
			this.originalElement.css({ margin: this.originalElement.css('margin') });

			// fix handlers offset
			this._proportionallyResize();

		}

		this.handles = o.handles || (!$('.ui-resizable-handle', this.element).length ? "e,s,se" : { n: '.ui-resizable-n', e: '.ui-resizable-e', s: '.ui-resizable-s', w: '.ui-resizable-w', se: '.ui-resizable-se', sw: '.ui-resizable-sw', ne: '.ui-resizable-ne', nw: '.ui-resizable-nw' });
		if(this.handles.constructor == String) {

			if(this.handles == 'all') this.handles = 'n,e,s,w,se,sw,ne,nw';
			var n = this.handles.split(","); this.handles = {};

			for(var i = 0; i < n.length; i++) {

				var handle = $.trim(n[i]), hname = 'ui-resizable-'+handle;
				var axis = $('<div class="ui-resizable-handle ' + hname + '"></div>');

				// Apply zIndex to all handles - see #7960
				axis.css({ zIndex: o.zIndex });

				//TODO : What's going on here?
				if ('se' == handle) {
					axis.addClass('ui-icon ui-icon-gripsmall-diagonal-se');
				};

				//Insert into internal handles object and append to element
				this.handles[handle] = '.ui-resizable-'+handle;
				this.element.append(axis);
			}

		}

		this._renderAxis = function(target) {

			target = target || this.element;

			for(var i in this.handles) {

				if(this.handles[i].constructor == String)
					this.handles[i] = $(this.handles[i], this.element).show();

				//Apply pad to wrapper element, needed to fix axis position (textarea, inputs, scrolls)
				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {

					var axis = $(this.handles[i], this.element), padWrapper = 0;

					//Checking the correct pad and border
					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					//The padding type i have to apply...
					var padPos = [ 'padding',
						/ne|nw|n/.test(i) ? 'Top' :
						/se|sw|s/.test(i) ? 'Bottom' :
						/^e$/.test(i) ? 'Right' : 'Left' ].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();

				}

				//TODO: What's that good for? There's not anything to be executed left
				if(!$(this.handles[i]).length)
					continue;

			}
		};

		//TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = $('.ui-resizable-handle', this.element)
			.disableSelection();

		//Matching axis name
		this._handles.mouseover(function() {
			if (!that.resizing) {
				if (this.className)
					var axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				//Axis, default = se
				that.axis = axis && axis[1] ? axis[1] : 'se';
			}
		});

		//If we want to auto hide the elements
		if (o.autoHide) {
			this._handles.hide();
			$(this.element)
				.addClass("ui-resizable-autohide")
				.mouseenter(function() {
					if (o.disabled) return;
					$(this).removeClass("ui-resizable-autohide");
					that._handles.show();
				})
				.mouseleave(function(){
					if (o.disabled) return;
					if (!that.resizing) {
						$(this).addClass("ui-resizable-autohide");
						that._handles.hide();
					}
				});
		}

		//Initialize the mouse interaction
		this._mouseInit();

	},

	_destroy: function() {

		this._mouseDestroy();

		var _destroy = function(exp) {
			$(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
				.removeData("resizable").removeData("ui-resizable").unbind(".resizable").find('.ui-resizable-handle').remove();
		};

		//TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			var wrapper = this.element;
			wrapper.after(
				this.originalElement.css({
					position: wrapper.css('position'),
					width: wrapper.outerWidth(),
					height: wrapper.outerHeight(),
					top: wrapper.css('top'),
					left: wrapper.css('left')
				})
			).remove();
		}

		this.originalElement.css('resize', this.originalResizeStyle);
		_destroy(this.originalElement);

		return this;
	},

	_mouseCapture: function(event) {
		var handle = false;
		for (var i in this.handles) {
			if ($(this.handles[i])[0] == event.target) {
				handle = true;
			}
		}

		return !this.options.disabled && handle;
	},

	_mouseStart: function(event) {
		
		var o = this.options, iniPos = this.element.position(), el = this.element;

		this.resizing = true;
		this.documentScroll = { top: $(document).scrollTop(), left: $(document).scrollLeft() };

		// bugfix for http://dev.jquery.com/ticket/1749
		if (el.is('.ui-draggable') || (/absolute/).test(el.css('position'))) {
			el.css({ position: 'absolute', top: iniPos.top, left: iniPos.left });
		}

		this._renderProxy();

		var curleft = num(this.helper.css('left')), curtop = num(this.helper.css('top'));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		//Store needed variables
		this.offset = this.helper.offset();
		this.position = { left: curleft, top: curtop };
		this.size = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
		this.originalSize = this._helper ? { width: el.outerWidth(), height: el.outerHeight() } : { width: el.width(), height: el.height() };
		this.originalPosition = { left: curleft, top: curtop };
		this.sizeDiff = { width: el.outerWidth() - el.width(), height: el.outerHeight() - el.height() };
		this.originalMousePosition = { left: event.pageX, top: event.pageY };

		//Aspect Ratio
		this.aspectRatio = (typeof o.aspectRatio == 'number') ? o.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);

		var cursor = $('.ui-resizable-' + this.axis).css('cursor');
		$('body').css('cursor', cursor == 'auto' ? this.axis + '-resize' : cursor);

		el.addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function(event) {

		//Increase performance, avoid regex
		var el = this.helper, o = this.options, props = {},
			that = this, smp = this.originalMousePosition, a = this.axis;

		var dx = (event.pageX-smp.left)||0, dy = (event.pageY-smp.top)||0;
		var trigger = this._change[a];
		if (!trigger) return false;

		// Calculate the attrs that will be change
		var data = trigger.apply(this, [event, dx, dy]);

		// Put this in the mouseDrag handler since the user can start pressing shift while resizing
		this._updateVirtualBoundaries(event.shiftKey);
		if (this._aspectRatio || event.shiftKey)
			data = this._updateRatio(data, event);

		data = this._respectSize(data, event);

		// plugins callbacks need to be called first
		this._propagate("resize", event);

		el.css({
			top: this.position.top + "px", left: this.position.left + "px",
			width: this.size.width + "px", height: this.size.height + "px"
		});

		if (!this._helper && this._proportionallyResizeElements.length)
			this._proportionallyResize();

		this._updateCache(data);

		// calling the user callback at the end
		this._trigger('resize', event, this.ui());

		return false;
	},

	_mouseStop: function(event) {

		this.resizing = false;
		var o = this.options, that = this;

		if(this._helper) {
			var pr = this._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
				soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : that.sizeDiff.height,
				soffsetw = ista ? 0 : that.sizeDiff.width;

			var s = { width: (that.helper.width()  - soffsetw), height: (that.helper.height() - soffseth) },
				left = (parseInt(that.element.css('left'), 10) + (that.position.left - that.originalPosition.left)) || null,
				top = (parseInt(that.element.css('top'), 10) + (that.position.top - that.originalPosition.top)) || null;

			if (!o.animate)
				this.element.css($.extend(s, { top: top, left: left }));

			that.helper.height(that.size.height);
			that.helper.width(that.size.width);

			if (this._helper && !o.animate) this._proportionallyResize();
		}

		$('body').css('cursor', 'auto');

		this.element.removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) this.helper.remove();
		return false;

	},

	_updateVirtualBoundaries: function(forceAspectRatio) {
		var o = this.options, pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b;

		b = {
			minWidth: isNumber(o.minWidth) ? o.minWidth : 0,
			maxWidth: isNumber(o.maxWidth) ? o.maxWidth : Infinity,
			minHeight: isNumber(o.minHeight) ? o.minHeight : 0,
			maxHeight: isNumber(o.maxHeight) ? o.maxHeight : Infinity
		};

		if(this._aspectRatio || forceAspectRatio) {
			// We want to create an enclosing box whose aspect ration is the requested one
			// First, compute the "projected" size for each dimension based on the aspect ratio and other dimension
			pMinWidth = b.minHeight * this.aspectRatio;
			pMinHeight = b.minWidth / this.aspectRatio;
			pMaxWidth = b.maxHeight * this.aspectRatio;
			pMaxHeight = b.maxWidth / this.aspectRatio;

			if(pMinWidth > b.minWidth) b.minWidth = pMinWidth;
			if(pMinHeight > b.minHeight) b.minHeight = pMinHeight;
			if(pMaxWidth < b.maxWidth) b.maxWidth = pMaxWidth;
			if(pMaxHeight < b.maxHeight) b.maxHeight = pMaxHeight;
		}
		this._vBoundaries = b;
	},

	_updateCache: function(data) {
		var o = this.options;
		this.offset = this.helper.offset();
		if (isNumber(data.left)) this.position.left = data.left;
		if (isNumber(data.top)) this.position.top = data.top;
		if (isNumber(data.height)) this.size.height = data.height;
		if (isNumber(data.width)) this.size.width = data.width;
	},

	_updateRatio: function(data, event) {

		var o = this.options, cpos = this.position, csize = this.size, a = this.axis;

		if (isNumber(data.height)) data.width = (data.height * this.aspectRatio);
		else if (isNumber(data.width)) data.height = (data.width / this.aspectRatio);

		if (a == 'sw') {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a == 'nw') {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function(data, event) {

		var el = this.helper, o = this._vBoundaries, pRatio = this._aspectRatio || event.shiftKey, a = this.axis,
				ismaxw = isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width), ismaxh = isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
					isminw = isNumber(data.width) && o.minWidth && (o.minWidth > data.width), isminh = isNumber(data.height) && o.minHeight && (o.minHeight > data.height);

		if (isminw) data.width = o.minWidth;
		if (isminh) data.height = o.minHeight;
		if (ismaxw) data.width = o.maxWidth;
		if (ismaxh) data.height = o.maxHeight;

		var dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height;
		var cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);

		if (isminw && cw) data.left = dw - o.minWidth;
		if (ismaxw && cw) data.left = dw - o.maxWidth;
		if (isminh && ch)	data.top = dh - o.minHeight;
		if (ismaxh && ch)	data.top = dh - o.maxHeight;

		// fixing jump error on top/left - bug #2330
		var isNotwh = !data.width && !data.height;
		if (isNotwh && !data.left && data.top) data.top = null;
		else if (isNotwh && !data.top && data.left) data.left = null;

		return data;
	},

	_proportionallyResize: function() {

		var o = this.options;
		if (!this._proportionallyResizeElements.length) return;
		var element = this.helper || this.element;

		for (var i=0; i < this._proportionallyResizeElements.length; i++) {

			var prel = this._proportionallyResizeElements[i];

			if (!this.borderDif) {
				var b = [prel.css('borderTopWidth'), prel.css('borderRightWidth'), prel.css('borderBottomWidth'), prel.css('borderLeftWidth')],
					p = [prel.css('paddingTop'), prel.css('paddingRight'), prel.css('paddingBottom'), prel.css('paddingLeft')];

				this.borderDif = $.map(b, function(v, i) {
					var border = parseInt(v,10)||0, padding = parseInt(p[i],10)||0;
					return border + padding;
				});
			}

			if ($.browser.msie && !(!($(element).is(':hidden') || $(element).parents(':hidden').length)))
				continue;

			prel.css({
				height: (element.height() - this.borderDif[0] - this.borderDif[2]) || 0,
				width: (element.width() - this.borderDif[1] - this.borderDif[3]) || 0
			});

		};

	},

	_renderProxy: function() {

		var el = this.element, o = this.options;
		this.elementOffset = el.offset();

		if(this._helper) {

			this.helper = this.helper || $('<div style="overflow:hidden;"></div>');

			// fix ie6 offset TODO: This seems broken
			var ie6 = $.browser.msie && $.browser.version < 7, ie6offset = (ie6 ? 1 : 0),
			pxyoffset = ( ie6 ? 2 : -1 );

			this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() + pxyoffset,
				height: this.element.outerHeight() + pxyoffset,
				position: 'absolute',
				left: this.elementOffset.left - ie6offset +'px',
				top: this.elementOffset.top - ie6offset +'px',
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper
				.appendTo("body")
				.disableSelection();

		} else {
			this.helper = this.element;
		}

	},

	_change: {
		e: function(event, dx, dy) {
			return { width: this.originalSize.width + dx };
		},
		w: function(event, dx, dy) {
			var o = this.options, cs = this.originalSize, sp = this.originalPosition;
			return { left: sp.left + dx, width: cs.width - dx };
		},
		n: function(event, dx, dy) {
			var o = this.options, cs = this.originalSize, sp = this.originalPosition;
			return { top: sp.top + dy, height: cs.height - dy };
		},
		s: function(event, dx, dy) {
			return { height: this.originalSize.height + dy };
		},
		se: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		sw: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		},
		ne: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]));
		},
		nw: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]));
		}
	},

	_propagate: function(n, event) {
		$.ui.plugin.call(this, n, [event, this.ui()]);
		(n != "resize" && this._trigger(n, event, this.ui()));
	},

	plugins: {},

	ui: function() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

});

/*
 * Resizable Extensions
 */

$.ui.plugin.add("resizable", "alsoResize", {

	start: function (event, ui) {
		var that = $(this).data("resizable"), o = that.options;

		var _store = function (exp) {
			$(exp).each(function() {
				var el = $(this);
				el.data("resizable-alsoresize", {
					width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
					left: parseInt(el.css('left'), 10), top: parseInt(el.css('top'), 10)
				});
			});
		};

		if (typeof(o.alsoResize) == 'object' && !o.alsoResize.parentNode) {
			if (o.alsoResize.length) { o.alsoResize = o.alsoResize[0]; _store(o.alsoResize); }
			else { $.each(o.alsoResize, function (exp) { _store(exp); }); }
		}else{
			_store(o.alsoResize);
		}
	},

	resize: function (event, ui) {
		var that = $(this).data("resizable"), o = that.options, os = that.originalSize, op = that.originalPosition;

		var delta = {
			height: (that.size.height - os.height) || 0, width: (that.size.width - os.width) || 0,
			top: (that.position.top - op.top) || 0, left: (that.position.left - op.left) || 0
		},

		_alsoResize = function (exp, c) {
			$(exp).each(function() {
				var el = $(this), start = $(this).data("resizable-alsoresize"), style = {}, 
					css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ['width', 'height'] : ['width', 'height', 'top', 'left'];

				$.each(css, function (i, prop) {
					var sum = (start[prop]||0) + (delta[prop]||0);
					if (sum && sum >= 0)
						style[prop] = sum || null;
				});

				el.css(style);
			});
		};

		if (typeof(o.alsoResize) == 'object' && !o.alsoResize.nodeType) {
			$.each(o.alsoResize, function (exp, c) { _alsoResize(exp, c); });
		}else{
			_alsoResize(o.alsoResize);
		}
	},

	stop: function (event, ui) {
		$(this).removeData("resizable-alsoresize");
	}
});

$.ui.plugin.add("resizable", "animate", {

	stop: function(event, ui) {
		var that = $(this).data("resizable"), o = that.options;

		var pr = that._proportionallyResizeElements, ista = pr.length && (/textarea/i).test(pr[0].nodeName),
					soffseth = ista && $.ui.hasScroll(pr[0], 'left') /* TODO - jump height */ ? 0 : that.sizeDiff.height,
						soffsetw = ista ? 0 : that.sizeDiff.width;

		var style = { width: (that.size.width - soffsetw), height: (that.size.height - soffseth) },
					left = (parseInt(that.element.css('left'), 10) + (that.position.left - that.originalPosition.left)) || null,
						top = (parseInt(that.element.css('top'), 10) + (that.position.top - that.originalPosition.top)) || null;

		that.element.animate(
			$.extend(style, top && left ? { top: top, left: left } : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {

					var data = {
						width: parseInt(that.element.css('width'), 10),
						height: parseInt(that.element.css('height'), 10),
						top: parseInt(that.element.css('top'), 10),
						left: parseInt(that.element.css('left'), 10)
					};

					if (pr && pr.length) $(pr[0]).css({ width: data.width, height: data.height });

					// propagating resize, and updating values for each animation step
					that._updateCache(data);
					that._propagate("resize", event);

				}
			}
		);
	}

});

$.ui.plugin.add("resizable", "containment", {

	start: function(event, ui) {
		var that = $(this).data("resizable"), o = that.options, el = that.element;
		var oc = o.containment,	ce = (oc instanceof $) ? oc.get(0) : (/parent/.test(oc)) ? el.parent().get(0) : oc;
		if (!ce) return;

		that.containerElement = $(ce);

		if (/document/.test(oc) || oc == document) {
			that.containerOffset = { left: 0, top: 0 };
			that.containerPosition = { left: 0, top: 0 };

			that.parentData = {
				element: $(document), left: 0, top: 0,
				width: $(document).width(), height: $(document).height() || document.body.parentNode.scrollHeight
			};
		}

		// i'm a node, so compute top, left, right, bottom
		else {
			var element = $(ce), p = [];
			$([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) { p[i] = num(element.css("padding" + name)); });

			that.containerOffset = element.offset();
			that.containerPosition = element.position();
			that.containerSize = { height: (element.innerHeight() - p[3]), width: (element.innerWidth() - p[1]) };

			var co = that.containerOffset, ch = that.containerSize.height,	cw = that.containerSize.width,
						width = ($.ui.hasScroll(ce, "left") ? ce.scrollWidth : cw ), height = ($.ui.hasScroll(ce) ? ce.scrollHeight : ch);

			that.parentData = {
				element: ce, left: co.left, top: co.top, width: width, height: height
			};
		}
	},

	resize: function(event, ui) {
		var that = $(this).data("resizable"), o = that.options,
				ps = that.containerSize, co = that.containerOffset, cs = that.size, cp = that.position,
				pRatio = that._aspectRatio || event.shiftKey, cop = { top:0, left:0 }, ce = that.containerElement;

		if (ce[0] != document && (/static/).test(ce.css('position'))) cop = co;

		if (cp.left < (that._helper ? co.left : 0)) {
			that.size.width = that.size.width + (that._helper ? (that.position.left - co.left) : (that.position.left - cop.left));
			if (pRatio) that.size.height = that.size.width / that.aspectRatio;
			that.position.left = o.helper ? co.left : 0;
		}

		if (cp.top < (that._helper ? co.top : 0)) {
			that.size.height = that.size.height + (that._helper ? (that.position.top - co.top) : that.position.top);
			if (pRatio) that.size.width = that.size.height * that.aspectRatio;
			that.position.top = that._helper ? co.top : 0;
		}

		that.offset.left = that.parentData.left+that.position.left;
		that.offset.top = that.parentData.top+that.position.top;

		var woset = Math.abs( (that._helper ? that.offset.left - cop.left : (that.offset.left - cop.left)) + that.sizeDiff.width ),
					hoset = Math.abs( (that._helper ? that.offset.top - cop.top : (that.offset.top - co.top)) + that.sizeDiff.height );

		var isParent = that.containerElement.get(0) == that.element.parent().get(0),
			isOffsetRelative = /relative|absolute/.test(that.containerElement.css('position'));

		if(isParent && isOffsetRelative) woset -= that.parentData.left;

		if (woset + that.size.width >= that.parentData.width) {
			that.size.width = that.parentData.width - woset;
			if (pRatio) that.size.height = that.size.width / that.aspectRatio;
		}

		if (hoset + that.size.height >= that.parentData.height) {
			that.size.height = that.parentData.height - hoset;
			if (pRatio) that.size.width = that.size.height * that.aspectRatio;
		}
	},

	stop: function(event, ui){
		var that = $(this).data("resizable"), o = that.options, cp = that.position,
				co = that.containerOffset, cop = that.containerPosition, ce = that.containerElement;

		var helper = $(that.helper), ho = helper.offset(), w = helper.outerWidth() - that.sizeDiff.width, h = helper.outerHeight() - that.sizeDiff.height;

		if (that._helper && !o.animate && (/relative/).test(ce.css('position')))
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

		if (that._helper && !o.animate && (/static/).test(ce.css('position')))
			$(this).css({ left: ho.left - cop.left - co.left, width: w, height: h });

	}
});

$.ui.plugin.add("resizable", "ghost", {

	start: function(event, ui) {

		var that = $(this).data("resizable"), o = that.options, cs = that.size;

		that.ghost = that.originalElement.clone();
		that.ghost
			.css({ opacity: .25, display: 'block', position: 'relative', height: cs.height, width: cs.width, margin: 0, left: 0, top: 0 })
			.addClass('ui-resizable-ghost')
			.addClass(typeof o.ghost == 'string' ? o.ghost : '');

		that.ghost.appendTo(that.helper);

	},

	resize: function(event, ui){
		var that = $(this).data("resizable"), o = that.options;
		if (that.ghost) that.ghost.css({ position: 'relative', height: that.size.height, width: that.size.width });
	},

	stop: function(event, ui){
		var that = $(this).data("resizable"), o = that.options;
		if (that.ghost && that.helper) that.helper.get(0).removeChild(that.ghost.get(0));
	}

});

$.ui.plugin.add("resizable", "grid", {

	resize: function(event, ui) {
		var that = $(this).data("resizable"), o = that.options, cs = that.size, os = that.originalSize, op = that.originalPosition, a = that.axis, ratio = o._aspectRatio || event.shiftKey;
		o.grid = typeof o.grid == "number" ? [o.grid, o.grid] : o.grid;
		var ox = Math.round((cs.width - os.width) / (o.grid[0]||1)) * (o.grid[0]||1), oy = Math.round((cs.height - os.height) / (o.grid[1]||1)) * (o.grid[1]||1);

		if (/^(se|s|e)$/.test(a)) {
			that.size.width = os.width + ox;
			that.size.height = os.height + oy;
		}
		else if (/^(ne)$/.test(a)) {
			that.size.width = os.width + ox;
			that.size.height = os.height + oy;
			that.position.top = op.top - oy;
		}
		else if (/^(sw)$/.test(a)) {
			that.size.width = os.width + ox;
			that.size.height = os.height + oy;
			that.position.left = op.left - ox;
		}
		else {
			that.size.width = os.width + ox;
			that.size.height = os.height + oy;
			that.position.top = op.top - oy;
			that.position.left = op.left - ox;
		}
	}

});

var num = function(v) {
	return parseInt(v, 10) || 0;
};

var isNumber = function(value) {
	return !isNaN(parseInt(value, 10));
};

})(jQuery);


/***********************/
/** jquery.ui.accordion.js **/
/***********************/
/*!
 * jQuery UI Accordion @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var uid = 0,
	hideProps = {},
	showProps = {},
	showPropsAdjust = {};

hideProps.height = hideProps.paddingTop = hideProps.paddingBottom =
	hideProps.borderTopWidth = hideProps.borderBottomWidth = "hide";
showProps.height = showProps.paddingTop = showProps.paddingBottom =
	showProps.borderTopWidth = showProps.borderBottomWidth = "show";
$.extend( showPropsAdjust, showProps, { accordionHeight: "show" } );

$.fx.step.accordionHeight = function( fx ) {
	var elem = $( fx.elem ),
		data = elem.data( "ui-accordion-height" );
	elem.height( data.total - elem.outerHeight() - data.toHide.outerHeight() + elem.height() );
};

$.widget( "ui.accordion", {
	version: "@VERSION",
	options: {
		active: 0,
		animate: {},
		collapsible: false,
		event: "click",
		header: "> li > :first-child,> :not(li):even",
		heightStyle: "auto",
		icons: {
			activeHeader: "ui-icon-triangle-1-s",
			header: "ui-icon-triangle-1-e"
		},

		// callbacks
		activate: null,
		beforeActivate: null
	},

	_create: function() {
		var accordionId = this.accordionId = "ui-accordion-" +
				(this.element.attr( "id" ) || ++uid),
			options = this.options;

		this.prevShow = this.prevHide = $();
		this.element.addClass( "ui-accordion ui-widget ui-helper-reset" );

		this.headers = this.element.find( options.header )
			.addClass( "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" );
		this._hoverable( this.headers );
		this._focusable( this.headers );

		this.headers.next()
			.addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" )
			.hide();

		// don't allow collapsible: false and active: false
		if ( !options.collapsible && options.active === false ) {
			options.active = 0;
		}
		// handle negative values
		if ( options.active < 0 ) {
			options.active += this.headers.length;
		}
		this.active = this._findActive( options.active )
			.addClass( "ui-accordion-header-active ui-state-active" )
			.toggleClass( "ui-corner-all ui-corner-top" );
		this.active.next()
			.addClass( "ui-accordion-content-active" )
			.show();

		this._createIcons();
		this.originalHeight = this.element[0].style.height;
		this.refresh();

		// ARIA
		this.element.attr( "role", "tablist" );

		this.headers
			.attr( "role", "tab" )
			.each(function( i ) {
				var header = $( this ),
					headerId = header.attr( "id" ),
					panel = header.next(),
					panelId = panel.attr( "id" );
				if ( !headerId ) {
					headerId = accordionId + "-header-" + i;
					header.attr( "id", headerId );
				}
				if ( !panelId ) {
					panelId = accordionId + "-panel-" + i;
					panel.attr( "id", panelId );
				}
				header.attr( "aria-controls", panelId );
				panel.attr( "aria-labelledby", headerId );
			})
			.next()
				.attr( "role", "tabpanel" );

		this.headers
			.not( this.active )
			.attr({
				"aria-selected": "false",
				tabIndex: -1
			})
			.next()
				.attr({
					"aria-expanded": "false",
					"aria-hidden": "true"
				})
				.hide();

		// make sure at least one header is in the tab order
		if ( !this.active.length ) {
			this.headers.eq( 0 ).attr( "tabIndex", 0 );
		} else {
			this.active.attr({
				"aria-selected": "true",
				tabIndex: 0
			})
			.next()
				.attr({
					"aria-expanded": "true",
					"aria-hidden": "false"
				});
		}

		this._bind( this.headers, { keydown: "_keydown" });
		this._bind( this.headers.next(), { keydown: "_panelKeyDown" });
		this._setupEvents( options.event );
	},

	_getCreateEventData: function() {
		return {
			header: this.active,
			content: !this.active.length ? $() : this.active.next()
		};
	},

	_createIcons: function() {
		var icons = this.options.icons;
		if ( icons ) {
			$( "<span>" )
				.addClass( "ui-accordion-header-icon ui-icon " + icons.header )
				.prependTo( this.headers );
			this.active.children( ".ui-accordion-header-icon" )
				.removeClass( icons.header )
				.addClass( icons.activeHeader );
			this.headers.addClass( "ui-accordion-icons" );
		}
	},

	_destroyIcons: function() {
		this.headers
			.removeClass( "ui-accordion-icons" )
			.children( ".ui-accordion-header-icon" )
				.remove();
	},

	_destroy: function() {
		var contents;

		// clean up main element
		this.element
			.removeClass( "ui-accordion ui-widget ui-helper-reset" )
			.removeAttr( "role" );

		// clean up headers
		this.headers
			.removeClass( "ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top" )
			.removeAttr( "role" )
			.removeAttr( "aria-selected" )
			.removeAttr( "aria-controls" )
			.removeAttr( "tabIndex" )
			.each(function() {
				if ( /^ui-accordion/.test( this.id ) ) {
					this.removeAttribute( "id" );
				}
			});
		this._destroyIcons();

		// clean up content panels
		contents = this.headers.next()
			.css( "display", "" )
			.removeAttr( "role" )
			.removeAttr( "aria-expanded" )
			.removeAttr( "aria-hidden" )
			.removeAttr( "aria-labelledby" )
			.removeClass( "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled" )
			.each(function() {
				if ( /^ui-accordion/.test( this.id ) ) {
					this.removeAttribute( "id" );
				}
			});
		if ( this.options.heightStyle !== "content" ) {
			this.element.css( "height", this.originalHeight );
			contents.css( "height", "" );
		}
	},

	_setOption: function( key, value ) {
		if ( key === "active" ) {
			// _activate() will handle invalid values and update this.options
			this._activate( value );
			return;
		}

		if ( key === "event" ) {
			if ( this.options.event ) {
				this.headers.unbind(
					this.options.event.split( " " ).join( ".accordion " ) + ".accordion" );
			}
			this._setupEvents( value );
		}

		this._super( key, value );

		// setting collapsible: false while collapsed; open first panel
		if ( key === "collapsible" && !value && this.options.active === false ) {
			this._activate( 0 );
		}

		if ( key === "icons" ) {
			this._destroyIcons();
			if ( value ) {
				this._createIcons();
			}
		}

		// #5332 - opacity doesn't cascade to positioned elements in IE
		// so we need to add the disabled class to the headers and panels
		if ( key === "disabled" ) {
			this.headers.add( this.headers.next() )
				.toggleClass( "ui-state-disabled", !!value );
		}
	},

	_keydown: function( event ) {
		if ( event.altKey || event.ctrlKey ) {
			return;
		}

		var keyCode = $.ui.keyCode,
			length = this.headers.length,
			currentIndex = this.headers.index( event.target ),
			toFocus = false;

		switch ( event.keyCode ) {
			case keyCode.RIGHT:
			case keyCode.DOWN:
				toFocus = this.headers[ ( currentIndex + 1 ) % length ];
				break;
			case keyCode.LEFT:
			case keyCode.UP:
				toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];
				break;
			case keyCode.SPACE:
			case keyCode.ENTER:
				this._eventHandler( event );
				break;
			case keyCode.HOME:
				toFocus = this.headers[ 0 ];
				break;
			case keyCode.END:
				toFocus = this.headers[ length - 1 ];
				break;
		}

		if ( toFocus ) {
			$( event.target ).attr( "tabIndex", -1 );
			$( toFocus ).attr( "tabIndex", 0 );
			toFocus.focus();
			event.preventDefault();
		}
	},

	_panelKeyDown : function( event ) {
		if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
			$( event.currentTarget ).prev().focus();
		}
	},

	refresh: function() {
		var maxHeight, overflow,
			heightStyle = this.options.heightStyle,
			parent = this.element.parent();

		this.element.css( "height", this.originalHeight );

		if ( heightStyle === "fill" ) {
			// IE 6 treats height like minHeight, so we need to turn off overflow
			// in order to get a reliable height
			// we use the minHeight support test because we assume that only
			// browsers that don't support minHeight will treat height as minHeight
			if ( !$.support.minHeight ) {
				overflow = parent.css( "overflow" );
				parent.css( "overflow", "hidden");
			}
			maxHeight = parent.height();
			this.element.siblings( ":visible" ).each(function() {
				var elem = $( this ),
					position = elem.css( "position" );

				if ( position === "absolute" || position === "fixed" ) {
					return;
				}
				maxHeight -= elem.outerHeight( true );
			});
			if ( overflow ) {
				parent.css( "overflow", overflow );
			}

			this.headers.each(function() {
				maxHeight -= $( this ).outerHeight( true );
			});

			this.headers.next()
				.each(function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				})
				.css( "overflow", "auto" );
		} else if ( heightStyle === "auto" ) {
			maxHeight = 0;
			this.headers.next()
				.each(function() {
					maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
				})
				.height( maxHeight );
		}

		if ( heightStyle !== "content" ) {
			this.element.height( this.element.height() );
		}
	},

	_activate: function( index ) {
		var active = this._findActive( index )[ 0 ];

		// trying to activate the already active panel
		if ( active === this.active[ 0 ] ) {
			return;
		}

		// trying to collapse, simulate a click on the currently active header
		active = active || this.active[ 0 ];

		this._eventHandler({
			target: active,
			currentTarget: active,
			preventDefault: $.noop
		});
	},

	_findActive: function( selector ) {
		return typeof selector === "number" ? this.headers.eq( selector ) : $();
	},

	_setupEvents: function( event ) {
		var events = {};
		if ( !event ) {
			return;
		}
		$.each( event.split(" "), function( index, eventName ) {
			events[ eventName ] = "_eventHandler";
		});
		this._bind( this.headers, events );
	},

	_eventHandler: function( event ) {
		var options = this.options,
			active = this.active,
			clicked = $( event.currentTarget ),
			clickedIsActive = clicked[ 0 ] === active[ 0 ],
			collapsing = clickedIsActive && options.collapsible,
			toShow = collapsing ? $() : clicked.next(),
			toHide = active.next(),
			eventData = {
				oldHeader: active,
				oldPanel: toHide,
				newHeader: collapsing ? $() : clicked,
				newPanel: toShow
			};

		event.preventDefault();

		if (
				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||
				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
			return;
		}

		options.active = collapsing ? false : this.headers.index( clicked );

		// when the call to ._toggle() comes after the class changes
		// it causes a very odd bug in IE 8 (see #6720)
		this.active = clickedIsActive ? $() : clicked;
		this._toggle( eventData );

		// switch classes
		// corner classes on the previously active header stay after the animation
		active.removeClass( "ui-accordion-header-active ui-state-active" );
		if ( options.icons ) {
			active.children( ".ui-accordion-header-icon" )
				.removeClass( options.icons.activeHeader )
				.addClass( options.icons.header );
		}

		if ( !clickedIsActive ) {
			clicked
				.removeClass( "ui-corner-all" )
				.addClass( "ui-accordion-header-active ui-state-active ui-corner-top" );
			if ( options.icons ) {
				clicked.children( ".ui-accordion-header-icon" )
					.removeClass( options.icons.header )
					.addClass( options.icons.activeHeader );
			}

			clicked
				.next()
				.addClass( "ui-accordion-content-active" );
		}
	},

	_toggle: function( data ) {
		var toShow = data.newPanel,
			toHide = this.prevShow.length ? this.prevShow : data.oldPanel;

		// handle activating a panel during the animation for another activation
		this.prevShow.add( this.prevHide ).stop( true, true );
		this.prevShow = toShow;
		this.prevHide = toHide;

		if ( this.options.animate ) {
			this._animate( toShow, toHide, data );
		} else {
			toHide.hide();
			toShow.show();
			this._toggleComplete( data );
		}

		toHide.attr({
			"aria-expanded": "false",
			"aria-hidden": "true"
		});
		toHide.prev().attr( "aria-selected", "false" );
		// if we're switching panels, remove the old header from the tab order
		// if we're opening from collapsed state, remove the previous header from the tab order
		// if we're collapsing, then keep the collapsing header in the tab order
		if ( toShow.length && toHide.length ) {
			toHide.prev().attr( "tabIndex", -1 );
		} else if ( toShow.length ) {
			this.headers.filter(function() {
				return $( this ).attr( "tabIndex" ) === 0;
			})
			.attr( "tabIndex", -1 );
		}

		toShow
			.attr({
				"aria-expanded": "true",
				"aria-hidden": "false"
			})
			.prev()
				.attr({
					"aria-selected": "true",
					tabIndex: 0
				});
	},

	_animate: function( toShow, toHide, data ) {
		var total, easing, duration,
			that = this,
			down = toShow.length &&
				( !toHide.length || ( toShow.index() < toHide.index() ) ),
			animate = this.options.animate || {},
			options = down && animate.down || animate,
			complete = function() {
				toShow.removeData( "ui-accordion-height" );
				that._toggleComplete( data );
			};

		if ( typeof options === "number" ) {
			duration = options;
		}
		if ( typeof options === "string" ) {
			easing = options;
		}
		// fall back from options to animation in case of partial down settings
		easing = easing || options.easing || animate.easing;
		duration = duration || options.duration || animate.duration;

		if ( !toHide.length ) {
			return toShow.animate( showProps, duration, easing, complete );
		}
		if ( !toShow.length ) {
			return toHide.animate( hideProps, duration, easing, complete );
		}

		total = toShow.show().outerHeight();
		toHide.animate( hideProps, duration, easing );
		toShow
			.hide()
			.data( "ui-accordion-height", {
				total: total,
				toHide: toHide
			})
			.animate( this.options.heightStyle === "content" ? showProps : showPropsAdjust,
				duration, easing, complete );
	},

	_toggleComplete: function( data ) {
		var toHide = data.oldPanel;

		toHide
			.removeClass( "ui-accordion-content-active" )
			.prev()
				.removeClass( "ui-corner-top" )
				.addClass( "ui-corner-all" );

		// Work around for rendering bug in IE (#5421)
		if ( toHide.length ) {
			toHide.parent()[0].className = toHide.parent()[0].className;
		}

		this._trigger( "activate", null, data );
	}
});



// DEPRECATED
if ( $.uiBackCompat !== false ) {
	// navigation options
	(function( $, prototype ) {
		$.extend( prototype.options, {
			navigation: false,
			navigationFilter: function() {
				return this.href.toLowerCase() === location.href.toLowerCase();
			}
		});

		var _create = prototype._create;
		prototype._create = function() {
			if ( this.options.navigation ) {
				var that = this,
					headers = this.element.find( this.options.header ),
					content = headers.next(),
					current = headers.add( content )
						.find( "a" )
						.filter( this.options.navigationFilter )
						[ 0 ];
				if ( current ) {
					headers.add( content ).each( function( index ) {
						if ( $.contains( this, current ) ) {
							that.options.active = Math.floor( index / 2 );
							return false;
						}
					});
				}
			}
			_create.call( this );
		};
	}( jQuery, jQuery.ui.accordion.prototype ) );

	// height options
	(function( $, prototype ) {
		$.extend( prototype.options, {
			heightStyle: null, // remove default so we fall back to old values
			autoHeight: true, // use heightStyle: "auto"
			clearStyle: false, // use heightStyle: "content"
			fillSpace: false // use heightStyle: "fill"
		});

		var _create = prototype._create,
			_setOption = prototype._setOption;

		$.extend( prototype, {
			_create: function() {
				this.options.heightStyle = this.options.heightStyle ||
					this._mergeHeightStyle();

				_create.call( this );
			},

			_setOption: function( key, value ) {
				if ( key === "autoHeight" || key === "clearStyle" || key === "fillSpace" ) {
					this.options.heightStyle = this._mergeHeightStyle();
				}
				_setOption.apply( this, arguments );
			},

			_mergeHeightStyle: function() {
				var options = this.options;

				if ( options.fillSpace ) {
					return "fill";
				}

				if ( options.clearStyle ) {
					return "content";
				}

				if ( options.autoHeight ) {
					return "auto";
				}
			}
		});
	}( jQuery, jQuery.ui.accordion.prototype ) );

	// icon options
	(function( $, prototype ) {
		$.extend( prototype.options.icons, {
			activeHeader: null, // remove default so we fall back to old values
			headerSelected: "ui-icon-triangle-1-s"
		});

		var _createIcons = prototype._createIcons;
		prototype._createIcons = function() {
			if ( this.options.icons ) {
				this.options.icons.activeHeader = this.options.icons.activeHeader ||
					this.options.icons.headerSelected;
			}
			_createIcons.call( this );
		};
	}( jQuery, jQuery.ui.accordion.prototype ) );

	// expanded active option, activate method
	(function( $, prototype ) {
		prototype.activate = prototype._activate;

		var _findActive = prototype._findActive;
		prototype._findActive = function( index ) {
			if ( index === -1 ) {
				index = false;
			}
			if ( index && typeof index !== "number" ) {
				index = this.headers.index( this.headers.filter( index ) );
				if ( index === -1 ) {
					index = false;
				}
			}
			return _findActive.call( this, index );
		};
	}( jQuery, jQuery.ui.accordion.prototype ) );

	// resize method
	jQuery.ui.accordion.prototype.resize = jQuery.ui.accordion.prototype.refresh;

	// change events
	(function( $, prototype ) {
		$.extend( prototype.options, {
			change: null,
			changestart: null
		});

		var _trigger = prototype._trigger;
		prototype._trigger = function( type, event, data ) {
			var ret = _trigger.apply( this, arguments );
			if ( !ret ) {
				return false;
			}

			if ( type === "beforeActivate" ) {
				ret = _trigger.call( this, "changestart", event, {
					oldHeader: data.oldHeader,
					oldContent: data.oldPanel,
					newHeader: data.newHeader,
					newContent: data.newPanel
				});
			} else if ( type === "activate" ) {
				ret = _trigger.call( this, "change", event, {
					oldHeader: data.oldHeader,
					oldContent: data.oldPanel,
					newHeader: data.newHeader,
					newContent: data.newPanel
				});
			}
			return ret;
		};
	}( jQuery, jQuery.ui.accordion.prototype ) );

	// animated option
	// NOTE: this only provides support for "slide", "bounceslide", and easings
	// not the full $.ui.accordion.animations API
	(function( $, prototype ) {
		$.extend( prototype.options, {
			animate: null,
			animated: "slide"
		});

		var _create = prototype._create;
		prototype._create = function() {
			var options = this.options;
			if ( options.animate === null ) {
				if ( !options.animated ) {
					options.animate = false;
				} else if ( options.animated === "slide" ) {
					options.animate = 300;
				} else if ( options.animated === "bounceslide" ) {
					options.animate = {
						duration: 200,
						down: {
							easing: "easeOutBounce",
							duration: 1000
						}
					};
				} else {
					options.animate = options.animated;
				}
			}

			_create.call( this );
		};
	}( jQuery, jQuery.ui.accordion.prototype ) );
}

})( jQuery );


/***********************/
/** jquery.ui.button.js **/
/***********************/
/*!
 * jQuery UI Button @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var lastActive, startXPos, startYPos, clickDragged,
	baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
	stateClasses = "ui-state-hover ui-state-active ",
	typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
	formResetHandler = function() {
		var buttons = $( this ).find( ":ui-button" );
		setTimeout(function() {
			buttons.button( "refresh" );
		}, 1 );
	},
	radioGroup = function( radio ) {
		var name = radio.name,
			form = radio.form,
			radios = $( [] );
		if ( name ) {
			if ( form ) {
				radios = $( form ).find( "[name='" + name + "']" );
			} else {
				radios = $( "[name='" + name + "']", radio.ownerDocument )
					.filter(function() {
						return !this.form;
					});
			}
		}
		return radios;
	};

$.widget( "ui.button", {
	version: "@VERSION",
	defaultElement: "<button>",
	options: {
		disabled: null,
		text: true,
		label: null,
		icons: {
			primary: null,
			secondary: null
		},
		onClick : function (event, ui){}
	},
	_create: function() {
		
		this.element.closest( "form" )
			.unbind( "reset.button" )
			.bind( "reset.button", formResetHandler );

		if ( typeof this.options.disabled !== "boolean" ) {
			this.options.disabled = !!this.element.prop( "disabled" );
		} else {
			this.element.prop( "disabled", this.options.disabled );
		}

		this._determineButtonType();
		this.hasTitle = !!this.buttonElement.attr( "title" );

		var that = this,
			options = this.options,
			toggleButton = this.type === "checkbox" || this.type === "radio",
			hoverClass = "ui-state-hover" + ( !toggleButton ? " ui-state-active" : "" ),
			focusClass = "ui-state-focus";

		if ( options.label === null ) {
			options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
		}

		this.buttonElement
			.addClass( baseClasses )
			.attr( "role", "button" )
			.bind( "mouseenter.button", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).addClass( "ui-state-hover" );
				if ( this === lastActive ) {
					$( this ).addClass( "ui-state-active" );
				}
			})
			.bind( "mouseleave.button", function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( hoverClass );
			})
			.bind( "click.button", function( event ) {
				if ( options.disabled ) {
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			});

		this.element
			.bind( "focus.button", function() {
				// no need to check disabled, focus won't be triggered anyway
				that.buttonElement.addClass( focusClass );
			})
			.bind( "blur.button", function() {
				that.buttonElement.removeClass( focusClass );
			})
			.bind('click.button', function(e){
				that._trigger('onClick', e);
			});

		if ( toggleButton ) {
			this.element.bind( "change.button", function() {
				if ( clickDragged ) {
					return;
				}
				that.refresh();
			});
			// if mouse moves between mousedown and mouseup (drag) set clickDragged flag
			// prevents issue where button state changes but checkbox/radio checked state
			// does not in Firefox (see ticket #6970)
			this.buttonElement
				.bind( "mousedown.button", function( event ) {
					if ( options.disabled ) {
						return;
					}
					clickDragged = false;
					startXPos = event.pageX;
					startYPos = event.pageY;
				})
				.bind( "mouseup.button", function( event ) {
					if ( options.disabled ) {
						return;
					}
					if ( startXPos !== event.pageX || startYPos !== event.pageY ) {
						clickDragged = true;
					}
			});
		}

		if ( this.type === "checkbox" ) {
			this.buttonElement.bind( "click.button", function() {
				if ( options.disabled || clickDragged ) {
					return false;
				}
				$( this ).toggleClass( "ui-state-active" );
				that.buttonElement.attr( "aria-pressed", that.element[0].checked );
			});
		} else if ( this.type === "radio" ) {
			this.buttonElement.bind( "click.button", function() {
				if ( options.disabled || clickDragged ) {
					return false;
				}
				$( this ).addClass( "ui-state-active" );
				that.buttonElement.attr( "aria-pressed", "true" );

				var radio = that.element[ 0 ];
				radioGroup( radio )
					.not( radio )
					.map(function() {
						return $( this ).button( "widget" )[ 0 ];
					})
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			});
		} else {
			this.buttonElement
				.bind( "mousedown.button", function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).addClass( "ui-state-active" );
					lastActive = this;
					that.document.one( "mouseup", function() {
						lastActive = null;
					});
				})
				.bind( "mouseup.button", function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).removeClass( "ui-state-active" );
				})
				.bind( "keydown.button", function(event) {
					if ( options.disabled ) {
						return false;
					}
					if ( event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER ) {
						$( this ).addClass( "ui-state-active" );
					}
				})
				.bind( "keyup.button", function() {
					$( this ).removeClass( "ui-state-active" );
				});

			if ( this.buttonElement.is("a") ) {
				this.buttonElement.keyup(function(event) {
					if ( event.keyCode === $.ui.keyCode.SPACE ) {
						// TODO pass through original event correctly (just as 2nd argument doesn't work)
						$( this ).click();
					}
				});
			}
		}

		// TODO: pull out $.Widget's handling for the disabled option into
		// $.Widget.prototype._setOptionDisabled so it's easy to proxy and can
		// be overridden by individual plugins
		this._setOption( "disabled", options.disabled );
		this._resetButton();
	},

	_determineButtonType: function() {
		var ancestor, labelSelector, checked;

		if ( this.element.is("[type=checkbox]") ) {
			this.type = "checkbox";
		} else if ( this.element.is("[type=radio]") ) {
			this.type = "radio";
		} else if ( this.element.is("input") ) {
			this.type = "input";
		} else {
			this.type = "button";
		}

		if ( this.type === "checkbox" || this.type === "radio" ) {
			// we don't search against the document in case the element
			// is disconnected from the DOM
			ancestor = this.element.parents().last();
			labelSelector = "label[for='" + this.element.attr("id") + "']";
			this.buttonElement = ancestor.find( labelSelector );
			if ( !this.buttonElement.length ) {
				ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
				this.buttonElement = ancestor.filter( labelSelector );
				if ( !this.buttonElement.length ) {
					this.buttonElement = ancestor.find( labelSelector );
				}
			}
			this.element.addClass( "ui-helper-hidden-accessible" );

			checked = this.element.is( ":checked" );
			if ( checked ) {
				this.buttonElement.addClass( "ui-state-active" );
			}
			this.buttonElement.prop( "aria-pressed", checked );
		} else {
			this.buttonElement = this.element;
		}
	},

	widget: function() {
		return this.buttonElement;
	},

	_destroy: function() {
		
		this.element
			.removeClass( "ui-helper-hidden-accessible" );
		this.buttonElement
			.removeClass( baseClasses + " " + stateClasses + " " + typeClasses )
			.removeAttr( "role" )
			.removeAttr( "aria-pressed" )
			.html( this.buttonElement.find(".ui-button-text").html() );

		if ( !this.hasTitle ) {
			this.buttonElement.removeAttr( "title" );
		}
	},

	_setOption: function( key, value ) {
		
		this._super( key, value );
		if ( key === "disabled" ) {
			if ( value ) {
				this.element.prop( "disabled", true );
			} else {
				this.element.prop( "disabled", false );
			}
			return;
		}
		this._resetButton();
	},

	refresh: function() {
		var isDisabled = this.element.is( ":disabled" );
		if ( isDisabled !== this.options.disabled ) {
			this._setOption( "disabled", isDisabled );
		}
		if ( this.type === "radio" ) {
			radioGroup( this.element[0] ).each(function() {
				if ( $( this ).is( ":checked" ) ) {
					$( this ).button( "widget" )
						.addClass( "ui-state-active" )
						.attr( "aria-pressed", "true" );
				} else {
					$( this ).button( "widget" )
						.removeClass( "ui-state-active" )
						.attr( "aria-pressed", "false" );
				}
			});
		} else if ( this.type === "checkbox" ) {
			if ( this.element.is( ":checked" ) ) {
				this.buttonElement
					.addClass( "ui-state-active" )
					.attr( "aria-pressed", "true" );
			} else {
				this.buttonElement
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			}
		}
	},

	_resetButton: function() {
		if ( this.type === "input" ) {
			if ( this.options.label ) {
				this.element.val( this.options.label );
			}
			return;
		}
		var buttonElement = this.buttonElement.removeClass( typeClasses ),
			buttonText = $( "<span></span>", this.document[0] )
				.addClass( "ui-button-text" )
				.html( this.options.label )
				.appendTo( buttonElement.empty() )
				.text(),
			icons = this.options.icons,
			multipleIcons = icons.primary && icons.secondary,
			buttonClasses = [];

		if ( icons.primary || icons.secondary ) {
			if ( this.options.text ) {
				buttonClasses.push( "ui-button-text-icon" + ( multipleIcons ? "s" : ( icons.primary ? "-primary" : "-secondary" ) ) );
			}

			if ( icons.primary ) {
				buttonElement.prepend( "<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>" );
			}

			if ( icons.secondary ) {
				buttonElement.append( "<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>" );
			}

			if ( !this.options.text ) {
				buttonClasses.push( multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only" );

				if ( !this.hasTitle ) {
					buttonElement.attr( "title", buttonText );
				}
			}
		} else {
			buttonClasses.push( "ui-button-text-only" );
		}
		buttonElement.addClass( buttonClasses.join( " " ) );
	}
});

$.widget( "ui.buttonset", {
	version: "@VERSION",
	options: {
		items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(button)"
	},

	_create: function() {
		this.element.addClass( "ui-buttonset" );
	},

	_init: function() {
		this.refresh();
	},

	_setOption: function( key, value ) {
		if ( key === "disabled" ) {
			this.buttons.button( "option", key, value );
		}

		this._super( key, value );
	},

	refresh: function() {
		var rtl = this.element.css( "direction" ) === "rtl";

		this.buttons = this.element.find( this.options.items )
			.filter( ":ui-button" )
				.button( "refresh" )
			.end()
			.not( ":ui-button" )
				.button()
			.end()
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
				.filter( ":first" )
					.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )
				.end()
				.filter( ":last" )
					.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )
				.end()
			.end();
	},

	_destroy: function() {
		this.element.removeClass( "ui-buttonset" );
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-left ui-corner-right" )
			.end()
			.button( "destroy" );
	}
});

}( jQuery ) );


/***********************/
/** jquery.ui.desktop.js **/
/***********************/
(function($) {
	Array.prototype.max = function() {
   		var max = this[0];
    	var len = this.length;
    	for(var j = 1; j < len; j++) {
    		if (this[j] > max) {
    			max = this[j];
    		} else {
    			max = max;
    		}
    	}
    	return max;
    };
	$.widget('ui.desktop', {
		options : {
			/**
			 * 数据格式
			 * var json = {
					total : 8,
					rows  : [
						{ 
							title : 'Test',
							icon : '',
							href : '#click1'
						},
						{ 
							title : 'Window',
							icon : '',
							href : '#click2'
						}
					]				
				}
			 */
			data : ''
		},
		/**
		 * 在外部调用，给桌面添加一个图标
		 * @param param :
		 * 	{
		 * 		title : '',
				icon : '',
				href : ''
		 * }
		 */
		addModule : function(param) {
			var self = this,
				ele  = self.element,
				opts = self.options;
				
			// 添加到页面
			//var itemId = opts.data.total + 1;
			var module = self._buildItem(opts.data.total, param);
			
			var moduleNum = $.data(ele, 'desktop').moduleNum;
			
			var columnNum = Math.ceil(opts.data.total / moduleNum);
			// alert(columnNum);
			if(opts.data.total % moduleNum == 0){
				columnNum++;
			}
			ele.find('#list' + columnNum).append(module);
			
			// 修改options中的data数据
			this.options.data.total++;
			this.options.data.rows.push(param);
			// 重新生成界面图标
			ele.find('.desktop-modules').children().remove();
			self._buildModule();
			self._showPanelAndBar();
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
				
			$.data(ele, 'desktop', {
				zIndex : 0,
				panelTop : 0,
				panelLeft : 0,
				MaxzIndex : 0,
				// 列数
				moduleNum : 0
			});
			
			// 重新布局
			self._browserResize();
			ele.addClass('desktop');
			/**
			 *	定义第二层框架 
			 */
			var desk = $('<div class="desktop-desk"></div>');
			var top  = $('<div class="desktop-top"></div>');
			ele.append(desk);
			ele.append(top);
			/**
			 * 	定义底层的横条上面的框架
			 */
			var topBars = $('<div class="desktop-bars"></div>');
			ele.find('.desktop-top').append(topBars);
			
			/**
			 *	定义desk上面的图标 
			 */
			// 定义所有图标的集合
			var modules = $('<div class="desktop-modules"></div>');
			ele.find('.desktop-desk').append(modules);
			// 生成图标
			self._buildModule();
			// 点击图标触发事件
			self._showPanelAndBar();
			
			// 绑定事件
			self._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			/**
			 *	浏览器窗口发生变化时触发resize事件 
			 */
			$(window).resize(function() {
				// 先清除以前生成的元素
				ele.find('.desktop-modules').children().remove();
				// 再重新调整界面的大小
				self._browserResize();
				// 最后再生成新的布局
				self._buildModule();
				// 点击图标触发事件
				self._showPanelAndBar();
			});

		},
		_browserResize : function() {
			var self = this,
				ele  = self.element,
				opts = self.options;
			var currentWidth = document.documentElement.clientWidth,
				currentHeight = document.documentElement.clientHeight;
			ele.width(currentWidth).height(currentHeight);
			ele.find('.desktop-desk').css({
				'height': currentHeight - ele.find('.desktop-top').height()
			});
		},
		/**
		 * 生成图标
 		 * @param {Object} a 图标
 		 * @param {Object} b 每一列存在的图标数
		 */
		_buildList : function(a,b) {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			for(var i = a; i < a+b; i++) {
				if(json.rows[i]){
					ele.find('#list'+(a+b)/b).append(self._buildItem(i, json.rows[i]));
				}
			}
		},
		/**
		 * 生成一项
		 * @param i
		 * @param itemParam 
		 */
		_buildItem : function (i, itemParam){
			var	text = ('<div class="desktop-module-text">' + itemParam.title + '</div>');
			if(itemParam.icon == '') {
				var icon = ('<div class="desktop-module-icon"></div>');
			} else {
				var icon = ('<div class="desktop-module-icon"></div>').css('background', itemParam.icon);
			}
			var module = $('<div class="desktop-modules-list-module">' + icon + text + 
				'</div>').attr('id', 'module'+(i+1));
			return module;
		},
		/**
		 *	生成列 
		 */
		_buildModule : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// 获得当前的摆放图标的桌面的高度
			var deskHeight = document.documentElement.clientHeight - ele.find('.desktop-top').height();
			// 获得每一列能摆放图标的最大个数，95是80+15 80是module的高度，15是margin-bottom的高度在程序中固定
			var moduleNum = parseInt(deskHeight/95);
			$.data(ele, 'desktop').moduleNum = moduleNum;
			// 获得将要生成的列数
			var listNum = Math.ceil(json.total/moduleNum);	
			// 生成列
			for(var i = 1; i <= listNum; i++) {
				ele.find('.desktop-modules').append($('<div class="desktop-modules-list"></div>').attr('id', 'list'+i));
			}
			//　生成图标
			for(var i = 0; i < listNum*moduleNum; i+=moduleNum) {
				self._buildList(i,moduleNum);
			}
		},
		/**
		 *	生成panel和对应的bar 
		 */
		_showPanelAndBar : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			ele.find('.desktop-modules-list-module').bind('click.desktop', function() {
				// alert(this.id);
				// 获取当前点击元素的id
				$.data(ele, 'desktop').zIndex++;
				$.data(ele, 'desktop').panelLeft+= 10;
				$.data(ele, 'desktop').panelTop+= 20;
				var moduleId = this.id;
				//　正则匹配数字
				var reg = /\d+/;
				// 获取正则匹配后的数字id
				var clickId = reg.exec(moduleId);
				// alert(clickId);
				
				// 清除已经存在的active然后定义top下面的显示内容
				ele.find('.desktop-bar').removeClass('desktop-bar-active');
				var topText = $('<a class="desktop-bar"><span class="desktop-bar-text">' + json.rows[clickId-1].title + '</span></a>')
																.addClass('desktop-bar-active').addClass('bar-'+clickId);
				// 如果点击topText则最小化panel，再点击则重新显示
				topText.click(function() {
					if(ele.parent().find(json.rows[clickId-1].href).parent().css('display') == 'none') {
						ele.parent().find(json.rows[clickId-1].href).panel('open');
						ele.parent().find(json.rows[clickId-1].href).parent().css({
							'z-index' : $.data(ele, 'desktop').zIndex++
						});
						ele.find('.desktop-bar').removeClass('desktop-bar-active');
						ele.find('.bar-'+clickId).addClass('desktop-bar-active');
					} else if(ele.parent().find(json.rows[clickId-1].href).parent().css('display') == 'block') {
						ele.parent().find(json.rows[clickId-1].href).panel('minimize');
						// ele.find('.desktop-bar').removeClass('desktop-bar-active');
					}
				});

				// 因为rows是从0开始到7，所以这里需要减一
				// 如果关闭已经存在的panel之后再点击打开，则打开以前的panel，否则生成新的panel
				if(ele.parent().find(json.rows[clickId-1].href).parent().hasClass('panel')) {
					ele.parent().find(json.rows[clickId-1].href).panel('open');
					ele.parent().find(json.rows[clickId-1].href).parent().css({
						'z-index' : $.data(ele, 'desktop').zIndex++
					});
				} else {
					ele.parent().find(json.rows[clickId-1].href).panel({
						'title' : json.rows[clickId-1].title,
						'closable' : true,
						'width' : 450,
						'height' : 300,
						'draggabled' : true,
						'minimizable' : true,
						'maximizable' : true,
						onClose : function() {
							// 点击关闭panel按钮
							self._panelClose(topText, clickId);
							self._showToptext();
						},
						onMinimize : function() {
							// 最小化之后，让他之前生成的z-index最高的panel对应的topText显示高亮
							self._showToptext();
						},
						onRestore : function() {
							// 点击还原以后，让panel在初始位置显示
							ele.parent().find(json.rows[clickId-1].href).parent().css({
								'left' : document.documentElement.clientWidth/2 - 225 + $.data(ele, 'desktop').panelLeft,
								'top' : document.documentElement.clientHeight/2 - 150 + $.data(ele, 'desktop').panelTop
							});
						}
					}).css('display', 'block').parent().css({
						'background' : 'white',
						'position' : 'absolute',
						'left' : document.documentElement.clientWidth/2 - 225 + $.data(ele, 'desktop').panelLeft,
						'top' : document.documentElement.clientHeight/2 - 150 + $.data(ele, 'desktop').panelTop,
						'z-index' : $.data(ele, 'desktop').zIndex
					});
					var panelHeight = ele.parent().find(json.rows[clickId-1].href).parent().height();
					if((document.documentElement.clientHeight/2 - 150 + $.data(ele, 'desktop').panelTop + panelHeight)>document.documentElement.clientHeight-70) {
						$.data(ele, 'desktop').panelLeft = 0;
						$.data(ele, 'desktop').panelTop = 0;
					}
				}
				
				// 如果重复点击已经存在的panel图标，则显示panel；如果不存在，则添加
				if(ele.find('.desktop-bar').hasClass('bar-'+clickId)) {
					ele.find('.bar-'+clickId).addClass('desktop-bar-active');
					ele.parent().find(json.rows[clickId-1].href).parent().css({
						'z-index' : $.data(ele, 'desktop').zIndex++
					});
				} else {
					ele.find('.desktop-bars').append(topText);
				}
				// 点击已经存在的panel面板，将点击的面板置顶
				ele.parent().find(json.rows[clickId-1].href).panel('panel').bind('click.desktop', function() {
					ele.find('.desktop-bar').removeClass('desktop-bar-active');
					ele.find('.bar-'+clickId).addClass('desktop-bar-active');
					ele.parent().find(json.rows[clickId-1].href).parent().css({
						'z-index' : $.data(ele, 'desktop').zIndex+=json.total
					})
				});
			});
		},
		/**
		 *	点击panel面板上的关闭按钮触发事件 
		 */
		_panelClose : function(target, id) {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			target.removeClass('desktop-bar-active');
			ele.find('.desktop-bars').find('.bar-'+id).remove();
			// ele.find('.desktop-bars a:last-child').addClass('desktop-bar-active');
		},
		/**
		 *	高亮显示z-index最高的topText 
		 */
		_showToptext : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var arr = new Array();
			var i = 0;
			ele.parent().find('.panel').each(function (index){
				if($(this).css('display') === 'block'){
					arr[i++] = parseInt($(this).css('z-index'));
				}
			});
            ele.parent().find('.panel').each(function (index){
				if($(this).css('display') === 'block' && parseInt($(this).css('z-index')) === arr.max()){
					var thisId = /\d+/.exec($(this).find('.panel-body').attr('id'));
					ele.find('.desktop-bar').removeClass('desktop-bar-active');
					ele.find('.bar-'+thisId).addClass('desktop-bar-active');
				}
			});
		}
	});
})(jQuery);


/***********************/
/** jquery.ui.dialog.js **/
/***********************/
/*!
 * jQuery UI Dialog @VERSION
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

var uiDialogClasses = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	};

$.widget("ui.dialog", {
	version: "@VERSION",
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: "close",
		dialogClass: "",
		draggable: true,
		hide: null,
		height: "auto",
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: {
			my: "center",
			at: "center",
			of: window,
			collision: "fit",
			// ensure that the titlebar is never outside the document
			using: function( pos ) {
				var topOffset = $( this ).css( pos ).offset().top;
				if ( topOffset < 0 ) {
					$( this ).css( "top", pos.top - topOffset );
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: "",
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr( "title" );
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}
		this.oldPosition = {
			parent: this.element.parent(),
			index: this.element.parent().children().index( this.element )
		};
		this.options.title = this.options.title || this.originalTitle;
		var that = this,
			options = this.options,

			title = options.title || "&#160;",

			uiDialog = ( this.uiDialog = $( "<div>" ) )
				.addClass( uiDialogClasses + options.dialogClass )
				.css({
					display: "none",
					outline: 0, // TODO: move to stylesheet
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				.attr( "tabIndex", -1)
				.keydown(function( event ) {
					if ( options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
							event.keyCode === $.ui.keyCode.ESCAPE ) {
						that.close( event );
						event.preventDefault();
					}
				})
				.mousedown(function( event ) {
					that.moveToTop( false, event );
				})
				.appendTo( "body" ),

			uiDialogContent = this.element
				.show()
				.removeAttr( "title" )
				.addClass( "ui-dialog-content ui-widget-content" )
				.appendTo( uiDialog ),

			uiDialogTitlebar = ( this.uiDialogTitlebar = $( "<div>" ) )
				.addClass( "ui-dialog-titlebar  ui-widget-header  " +
					"ui-corner-all  ui-helper-clearfix" )
				.prependTo( uiDialog ),

			uiDialogTitlebarClose = $( "<a href='#'></a>" )
				.addClass( "ui-dialog-titlebar-close  ui-corner-all" )
				.attr( "role", "button" )
				.click(function( event ) {
					event.preventDefault();
					that.close( event );
				})
				.appendTo( uiDialogTitlebar ),

			uiDialogTitlebarCloseText = ( this.uiDialogTitlebarCloseText = $( "<span>" ) )
				.addClass( "ui-icon ui-icon-closethick" )
				.text( options.closeText )
				.appendTo( uiDialogTitlebarClose ),

			uiDialogTitle = $( "<span>" )
				.uniqueId()
				.addClass( "ui-dialog-title" )
				.html( title )
				.prependTo( uiDialogTitlebar ),

			uiDialogButtonPane = ( this.uiDialogButtonPane = $( "<div>" ) )
				.addClass( "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" ),

			uiButtonSet = ( this.uiButtonSet = $( "<div>" ) )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		uiDialog.attr({
			role: "dialog",
			"aria-labelledby": uiDialogTitle.attr( "id" )
		});

		uiDialogTitlebar.find( "*" ).add( uiDialogTitlebar ).disableSelection();
		this._hoverable( uiDialogTitlebarClose );
		this._focusable( uiDialogTitlebarClose );

		if ( options.draggable && $.fn.draggable ) {
			this._makeDraggable();
		}
		if ( options.resizable && $.fn.resizable ) {
			this._makeResizable();
		}

		this._createButtons( options.buttons );
		this._isOpen = false;

		if ( $.fn.bgiframe ) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	_destroy: function() {
		var next,
			oldPosition = this.oldPosition;

		if ( this.overlay ) {
			this.overlay.destroy();
		}
		this.uiDialog.hide();
		this.element
			.removeClass( "ui-dialog-content ui-widget-content" )
			.hide()
			.appendTo( "body" );
		this.uiDialog.remove();

		if ( this.originalTitle ) {
			this.element.attr( "title", this.originalTitle );
		}

		next = oldPosition.parent.children().eq( oldPosition.index );
		if ( next.length ) {
			next.before( this.element );
		} else {
			oldPosition.parent.append( this.element );
		}
	},

	widget: function() {
		return this.uiDialog;
	},

	close: function( event ) {
		var that = this,
			maxZ, thisZ;

		if ( !this._isOpen ) {
			return;
		}

		if ( false === this._trigger( "beforeClose", event ) ) {
			return;
		}

		this._isOpen = false;

		if ( this.overlay ) {
			this.overlay.destroy();
		}
		this.uiDialog.unbind( "keypress.ui-dialog" );

		if ( this.options.hide ) {
			this.uiDialog.hide( this.options.hide, function() {
				that._trigger( "close", event );
			});
		} else {
			this.uiDialog.hide();
			this._trigger( "close", event );
		}

		$.ui.dialog.overlay.resize();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if ( this.options.modal ) {
			maxZ = 0;
			$( ".ui-dialog" ).each(function() {
				if ( this !== that.uiDialog[0] ) {
					thisZ = $( this ).css( "z-index" );
					if ( !isNaN( thisZ ) ) {
						maxZ = Math.max( maxZ, thisZ );
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}

		return this;
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function( force, event ) {
		var options = this.options,
			saveScroll;

		if ( ( options.modal && !force ) ||
				( !options.stack && !options.modal ) ) {
			return this._trigger( "focus", event );
		}

		if ( options.zIndex > $.ui.dialog.maxZ ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if ( this.overlay ) {
			$.ui.dialog.maxZ += 1;
			$.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ;
			this.overlay.$el.css( "z-index", $.ui.dialog.overlay.maxZ );
		}

		// Save and then restore scroll
		// Opera 9.5+ resets when parent z-index is changed.
		// http://bugs.jqueryui.com/ticket/3193
		saveScroll = {
			scrollTop: this.element.scrollTop(),
			scrollLeft: this.element.scrollLeft()
		};
		$.ui.dialog.maxZ += 1;
		this.uiDialog.css( "z-index", $.ui.dialog.maxZ );
		this.element.attr( saveScroll );
		this._trigger( "focus", event );

		return this;
	},

	open: function() {
		if ( this._isOpen ) {
			return;
		}

		var hasFocus,
			options = this.options,
			uiDialog = this.uiDialog;

		this._size();
		this._position( options.position );
		uiDialog.show( options.show );
		this.overlay = options.modal ? new $.ui.dialog.overlay( this ) : null;
		this.moveToTop( true );

		// prevent tabbing out of modal dialogs
		if ( options.modal ) {
			uiDialog.bind( "keydown.ui-dialog", function( event ) {
				if ( event.keyCode !== $.ui.keyCode.TAB ) {
					return;
				}

				var tabbables = $( ":tabbable", this ),
					first = tabbables.filter( ":first" ),
					last  = tabbables.filter( ":last" );

				if ( event.target === last[0] && !event.shiftKey ) {
					first.focus( 1 );
					return false;
				} else if ( event.target === first[0] && event.shiftKey ) {
					last.focus( 1 );
					return false;
				}
			});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		hasFocus = this.element.find( ":tabbable" );
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
			if ( !hasFocus.length ) {
				hasFocus = uiDialog;
			}
		}
		hasFocus.eq( 0 ).focus();

		this._isOpen = true;
		this._trigger( "open" );

		return this;
	},

	_createButtons: function( buttons ) {
		var uiDialogButtonPane, uiButtonSet,
			that = this,
			hasButtons = false;

		// if we already have a button pane, remove it
		this.uiDialogButtonPane.remove();
		this.uiButtonSet.empty();

		if ( typeof buttons === "object" && buttons !== null ) {
			$.each( buttons, function() {
				return !(hasButtons = true);
			});
		}
		if ( hasButtons ) {
			$.each( buttons, function( name, props ) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $( "<button type='button'>" )
					.attr( props, true )
					.unbind( "click" )
					.click(function() {
						props.click.apply( that.element[0], arguments );
					})
					.appendTo( that.uiButtonSet );
				if ( $.fn.button ) {
					button.button();
				}
			});
			this.uiDialog.addClass( "ui-dialog-buttons" );
			this.uiDialogButtonPane.appendTo( this.uiDialog );
		} else {
			this.uiDialog.removeClass( "ui-dialog-buttons" );
		}
	},

	_makeDraggable: function() {
		var that = this,
			options = this.options;

		function filteredUi( ui ) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		this.uiDialog.draggable({
			cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
			handle: ".ui-dialog-titlebar",
			containment: "document",
			start: function( event, ui ) {
				$( this )
					.addClass( "ui-dialog-dragging" );
				that._trigger( "dragStart", event, filteredUi( ui ) );
			},
			drag: function( event, ui ) {
				that._trigger( "drag", event, filteredUi( ui ) );
			},
			stop: function( event, ui ) {
				options.position = [
					ui.position.left - that.document.scrollLeft(),
					ui.position.top - that.document.scrollTop()
				];
				$( this )
					.removeClass( "ui-dialog-dragging" );
				that._trigger( "dragStop", event, filteredUi( ui ) );
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function( handles ) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var that = this,
			options = this.options,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = this.uiDialog.css( "position" ),
			resizeHandles = typeof handles === 'string' ?
				handles	:
				"n,e,s,w,se,sw,ne,nw";

		function filteredUi( ui ) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}

		this.uiDialog.resizable({
			cancel: ".ui-dialog-content",
			containment: "document",
			alsoResize: this.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: this._minHeight(),
			handles: resizeHandles,
			start: function( event, ui ) {
				$( this ).addClass( "ui-dialog-resizing" );
				that._trigger( "resizeStart", event, filteredUi( ui ) );
			},
			resize: function( event, ui ) {
				that._trigger( "resize", event, filteredUi( ui ) );
			},
			stop: function( event, ui ) {
				$( this ).removeClass( "ui-dialog-resizing" );
				options.height = $( this ).height();
				options.width = $( this ).width();
				that._trigger( "resizeStop", event, filteredUi( ui ) );
				$.ui.dialog.overlay.resize();
			}
		})
		.css( "position", position )
		.find( ".ui-resizable-se" )
			.addClass( "ui-icon ui-icon-grip-diagonal-se" );
	},

	_minHeight: function() {
		var options = this.options;

		if ( options.height === "auto" ) {
			return options.minHeight;
		} else {
			return Math.min( options.minHeight, options.height );
		}
	},

	_position: function( position ) {
		var myAt = [],
			offset = [ 0, 0 ],
			isVisible;

		if ( position ) {
			// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
	//		if (typeof position == 'string' || $.isArray(position)) {
	//			myAt = $.isArray(position) ? position : position.split(' ');

			if ( typeof position === "string" || (typeof position === "object" && "0" in position ) ) {
				myAt = position.split ? position.split( " " ) : [ position[ 0 ], position[ 1 ] ];
				if ( myAt.length === 1 ) {
					myAt[ 1 ] = myAt[ 0 ];
				}

				$.each( [ "left", "top" ], function( i, offsetPosition ) {
					if ( +myAt[ i ] === myAt[ i ] ) {
						offset[ i ] = myAt[ i ];
						myAt[ i ] = offsetPosition;
					}
				});

				position = {
					my: myAt.join( " " ),
					at: myAt.join( " " ),
					offset: offset.join( " " )
				};
			}

			position = $.extend( {}, $.ui.dialog.prototype.options.position, position );
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		// need to show the dialog to get the actual offset in the position plugin
		isVisible = this.uiDialog.is( ":visible" );
		if ( !isVisible ) {
			this.uiDialog.show();
		}
		this.uiDialog.position( position );
		if ( !isVisible ) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var that = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			that._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function( key, value ) {
		var isDraggable, isResizable,
			uiDialog = this.uiDialog;

		switch ( key ) {
			case "buttons":
				this._createButtons( value );
				break;
			case "closeText":
				// ensure that we always pass a string
				this.uiDialogTitlebarCloseText.text( "" + value );
				break;
			case "dialogClass":
				uiDialog
					.removeClass( this.options.dialogClass )
					.addClass( uiDialogClasses + value );
				break;
			case "disabled":
				if ( value ) {
					uiDialog.addClass( "ui-dialog-disabled" );
				} else {
					uiDialog.removeClass( "ui-dialog-disabled" );
				}
				break;
			case "draggable":
				isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					this._makeDraggable();
				}
				break;
			case "position":
				this._position( value );
				break;
			case "resizable":
				// currently resizable, becoming non-resizable
				isResizable = uiDialog.is( ":data(resizable)" );
				if ( isResizable && !value ) {
					uiDialog.resizable( "destroy" );
				}

				// currently resizable, changing handles
				if ( isResizable && typeof value === "string" ) {
					uiDialog.resizable( "option", "handles", value );
				}

				// currently non-resizable, becoming resizable
				if ( !isResizable && value !== false ) {
					this._makeResizable( value );
				}
				break;
			case "title":
				// convert whatever was passed in o a string, for html() to not throw up
				$( ".ui-dialog-title", this.uiDialogTitlebar )
					.html( "" + ( value || "&#160;" ) );
				break;
		}

		this._super( key, value );
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var nonContentHeight, minContentHeight, autoHeight,
			options = this.options,
			isVisible = this.uiDialog.is( ":visible" );

		// reset content sizing
		this.element.show().css({
			width: "auto",
			minHeight: 0,
			height: 0
		});

		if ( options.minWidth > options.width ) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: "auto",
				width: options.width
			})
			.outerHeight();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			// only needed for IE6 support
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
		}
	}
});

$.extend($.ui.dialog, {
	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr( "id" );
		if ( !id ) {
			this.uuid += 1;
			id = this.uuid;
		}
		return "ui-dialog-title-" + id;
	},

	overlay: function( dialog ) {
		this.$el = $.ui.dialog.overlay.create( dialog );
	}
});

$.extend( $.ui.dialog.overlay, {
	instances: [],
	// reuse old instances due to IE memory leak with alpha transparency (see #5185)
	oldInstances: [],
	maxZ: 0,
	events: $.map(
		"focus,mousedown,mouseup,keydown,keypress,click".split( "," ),
		function( event ) {
			return event + ".dialog-overlay";
		}
	).join( " " ),
	create: function( dialog ) {
		if ( this.instances.length === 0 ) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ( $.ui.dialog.overlay.instances.length ) {
					$( document ).bind( $.ui.dialog.overlay.events, function( event ) {
						// stop events if the z-index of the target is < the z-index of the overlay
						// we cannot return true when we don't want to cancel the event (#3523)
						if ( $( event.target ).zIndex() < $.ui.dialog.overlay.maxZ ) {
							return false;
						}
					});
				}
			}, 1 );

			// handle window resize
			$( window ).bind( "resize.dialog-overlay", $.ui.dialog.overlay.resize );
		}

		var $el = ( this.oldInstances.pop() || $( "<div>" ).addClass( "ui-widget-overlay" ) );

		// allow closing by pressing the escape key
		$( document ).bind( "keydown.dialog-overlay", function( event ) {
			var instances = $.ui.dialog.overlay.instances;
			// only react to the event if we're the top overlay
			if ( instances.length !== 0 && instances[ instances.length - 1 ] === $el &&
				dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
				event.keyCode === $.ui.keyCode.ESCAPE ) {

				dialog.close( event );
				event.preventDefault();
			}
		});

		$el.appendTo( document.body ).css({
			width: this.width(),
			height: this.height()
		});

		if ( $.fn.bgiframe ) {
			$el.bgiframe();
		}

		this.instances.push( $el );
		return $el;
	},

	destroy: function( $el ) {
		var indexOf = $.inArray( $el, this.instances ),
			maxZ = 0;

		if ( indexOf !== -1 ) {
			this.oldInstances.push( this.instances.splice( indexOf, 1 )[ 0 ] );
		}

		if ( this.instances.length === 0 ) {
			$( [ document, window ] ).unbind( ".dialog-overlay" );
		}

		$el.height( 0 ).width( 0 ).remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		$.each( this.instances, function() {
			maxZ = Math.max( maxZ, this.css( "z-index" ) );
		});
		this.maxZ = maxZ;
	},

	height: function() {
		var scrollHeight,
			offsetHeight;
		// handle IE
		if ( $.browser.msie ) {
			scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			offsetHeight = Math.max(
				document.documentElement.offsetHeight,
				document.body.offsetHeight
			);

			if ( scrollHeight < offsetHeight ) {
				return $( window ).height() + "px";
			} else {
				return scrollHeight + "px";
			}
		// handle "good" browsers
		} else {
			return $( document ).height() + "px";
		}
	},

	width: function() {
		var scrollWidth,
			offsetWidth;
		// handle IE
		if ( $.browser.msie ) {
			scrollWidth = Math.max(
				document.documentElement.scrollWidth,
				document.body.scrollWidth
			);
			offsetWidth = Math.max(
				document.documentElement.offsetWidth,
				document.body.offsetWidth
			);

			if ( scrollWidth < offsetWidth ) {
				return $( window ).width() + "px";
			} else {
				return scrollWidth + "px";
			}
		// handle "good" browsers
		} else {
			return $( document ).width() + "px";
		}
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $( [] );
		$.each( $.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add( this );
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend( $.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy( this.$el );
	}
});

}( jQuery ) );


/***********************/
/** jquery.ui.position.js **/
/***********************/
/*!
 * jQuery UI Position @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function( $, undefined ) {

$.ui = $.ui || {};

var cachedScrollbarWidth,
	max = Math.max,
	abs = Math.abs,
	round = Math.round,
	rhorizontal = /left|center|right/,
	rvertical = /top|center|bottom/,
	roffset = /[\+\-]\d+%?/,
	rposition = /^\w+/,
	rpercent = /%$/,
	_position = $.fn.position;

function getOffsets( offsets, width, height ) {
	return [
		parseInt( offsets[ 0 ], 10 ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
		parseInt( offsets[ 1 ], 10 ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
	];
}
function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}

$.position = {
	scrollbarWidth: function() {
		if ( cachedScrollbarWidth !== undefined ) {
			return cachedScrollbarWidth;
		}
		var w1, w2,
			div = $( "<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
			innerDiv = div.children()[0];

		$( "body" ).append( div );
		w1 = innerDiv.offsetWidth;
		div.css( "overflow", "scroll" );

		w2 = innerDiv.offsetWidth;

		if ( w1 === w2 ) {
			w2 = div[0].clientWidth;
		}

		div.remove();

		return (cachedScrollbarWidth = w1 - w2);
	},
	getScrollInfo: function( within ) {
		var overflowX = within.isWindow ? "" : within.element.css( "overflow-x" ),
			overflowY = within.isWindow ? "" : within.element.css( "overflow-y" ),
			hasOverflowX = overflowX === "scroll" ||
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
			hasOverflowY = overflowY === "scroll" ||
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );
		return {
			width: hasOverflowX ? $.position.scrollbarWidth() : 0,
			height: hasOverflowY ? $.position.scrollbarWidth() : 0
		};
	},
	getWithinInfo: function( element ) {
		var withinElement = $( element || window ),
			isWindow = $.isWindow( withinElement[0] );
		return {
			element: withinElement,
			isWindow: isWindow,
			offset: withinElement.offset() || { left: 0, top: 0 },
			scrollLeft: withinElement.scrollLeft(),
			scrollTop: withinElement.scrollTop(),
			width: isWindow ? withinElement.width() : withinElement.outerWidth(),
			height: isWindow ? withinElement.height() : withinElement.outerHeight()
		};
	}
};

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var atOffset, targetWidth, targetHeight, targetOffset, basePosition,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		targetElem = target[0],
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};

	if ( targetElem.nodeType === 9 ) {
		targetWidth = target.width();
		targetHeight = target.height();
		targetOffset = { top: 0, left: 0 };
	} else if ( $.isWindow( targetElem ) ) {
		targetWidth = target.width();
		targetHeight = target.height();
		targetOffset = { top: target.scrollTop(), left: target.scrollLeft() };
	} else if ( targetElem.preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
		targetWidth = targetHeight = 0;
		targetOffset = { top: targetElem.pageY, left: targetElem.pageX };
	} else {
		targetWidth = target.outerWidth();
		targetHeight = target.outerHeight();
		targetOffset = target.offset();
	}
	// clone to reuse original targetOffset later
	basePosition = $.extend( {}, targetOffset );

	// force my and at to have valid horizontal and vertical positions
	// if a value is missing or invalid, it will be converted to center
	$.each( [ "my", "at" ], function() {
		var pos = ( options[ this ] || "" ).split( " " ),
			horizontalOffset,
			verticalOffset;

		if ( pos.length === 1) {
			pos = rhorizontal.test( pos[ 0 ] ) ?
				pos.concat( [ "center" ] ) :
				rvertical.test( pos[ 0 ] ) ?
					[ "center" ].concat( pos ) :
					[ "center", "center" ];
		}
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

		// calculate offsets
		horizontalOffset = roffset.exec( pos[ 0 ] );
		verticalOffset = roffset.exec( pos[ 1 ] );
		offsets[ this ] = [
			horizontalOffset ? horizontalOffset[ 0 ] : 0,
			verticalOffset ? verticalOffset[ 0 ] : 0
		];

		// reduce to just the positions without the offsets
		options[ this ] = [
			rposition.exec( pos[ 0 ] )[ 0 ],
			rposition.exec( pos[ 1 ] )[ 0 ]
		];
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	if ( options.at[ 0 ] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[ 0 ] === "center" ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[ 1 ] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[ 1 ] === "center" ) {
		basePosition.top += targetHeight / 2;
	}

	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
	basePosition.left += atOffset[ 0 ];
	basePosition.top += atOffset[ 1 ];

	return this.each(function() {
		var collisionPosition, using,
			elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseCss( this, "marginLeft" ),
			marginTop = parseCss( this, "marginTop" ),
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
			position = $.extend( {}, basePosition ),
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

		if ( options.my[ 0 ] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[ 0 ] === "center" ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[ 1 ] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[ 1 ] === "center" ) {
			position.top -= elemHeight / 2;
		}

		position.left += myOffset[ 0 ];
		position.top += myOffset[ 1 ];

		// if the browser doesn't support fractions, then round for consistent results
		if ( !$.support.offsetFractions ) {
			position.left = round( position.left );
			position.top = round( position.top );
		}

		collisionPosition = {
			marginLeft: marginLeft,
			marginTop: marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[ i ] ] ) {
				$.ui.position[ collision[ i ] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
					my: options.my,
					at: options.at,
					within: within,
					elem : elem
				});
			}
		});

		if ( $.fn.bgiframe ) {
			elem.bgiframe();
		}

		if ( options.using ) {
			// adds feedback as second argument to using callback, if present
			using = function( props ) {
				var left = targetOffset.left - position.left,
					right = left + targetWidth - elemWidth,
					top = targetOffset.top - position.top,
					bottom = top + targetHeight - elemHeight,
					feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
					feedback.horizontal = "center";
				}
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
					feedback.vertical = "middle";
				}
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
					feedback.important = "horizontal";
				} else {
					feedback.important = "vertical";
				}
				options.using.call( this, props, feedback );
			};
		}

		elem.offset( $.extend( position, { using: using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? 0 : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			}
			else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? 0 : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
			else if ( overBottom > 0 ) {
				newOverTop = position.top -  data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			$.ui.position.flip.left.apply( this, arguments );
			$.ui.position.fit.left.apply( this, arguments );
		},
		top: function() {
			$.ui.position.flip.top.apply( this, arguments );
			$.ui.position.fit.top.apply( this, arguments );
		}
	}
};

// fraction support test
(function () {
	var testElement, testElementParent, testElementStyle, offsetLeft, i,
		body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" );

	//Create a "fake body" for testing based on method used in jQuery.support
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px;";

	offsetLeft = $( div ).offset().left;
	$.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );
})();

// DEPRECATED
if ( $.uiBackCompat !== false ) {
	// offset option
	(function( $ ) {
		var _position = $.fn.position;
		$.fn.position = function( options ) {
			if ( !options || !options.offset ) {
				return _position.call( this, options );
			}
			var offset = options.offset.split( " " ),
				at = options.at.split( " " );
			if ( offset.length === 1 ) {
				offset[ 1 ] = offset[ 0 ];
			}
			if ( /^\d/.test( offset[ 0 ] ) ) {
				offset[ 0 ] = "+" + offset[ 0 ];
			}
			if ( /^\d/.test( offset[ 1 ] ) ) {
				offset[ 1 ] = "+" + offset[ 1 ];
			}
			if ( at.length === 1 ) {
				if ( /left|center|right/.test( at[ 0 ] ) ) {
					at[ 1 ] = "center";
				} else {
					at[ 1 ] = at[ 0 ];
					at[ 0 ] = "center";
				}
			}
			return _position.call( this, $.extend( options, {
				at: at[ 0 ] + offset[ 0 ] + " " + at[ 1 ] + offset[ 1 ],
				offset: undefined
			} ) );
		};
	}( jQuery ) );
}

}( jQuery ) );


/***********************/
/** jquery.ui.mouse.js **/
/***********************/
/*!
 * jQuery UI Mouse @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

var mouseHandled = false;
$( document ).mouseup( function( e ) {
	mouseHandled = false;
});

$.widget("ui.mouse", {
	version: "@VERSION",
	options: {
		cancel: 'input,textarea,button,select,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + '.preventClickEvent')) {
					$.removeData(event.target, that.widgetName + '.preventClickEvent');
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if( mouseHandled ) { return; }

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + '.preventClickEvent')) {
			$.removeData(event.target, this.widgetName + '.preventClickEvent');
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();
		
		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.browser.msie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + '.preventClickEvent', true);
			}

			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})(jQuery);


/***********************/
/** jquery.ui.messagebox.js **/
/***********************/
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


/***********************/
/** jquery.ui.portal.js **/
/***********************/
(function($) {
	$.widget('ui.portal', {
		options : {
			data : '',
			// 每个列之间的间隔
			padding : 5
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			$.data(ele, 'portal', {
				// 阴影变量
				shadow : $('<div class="shadow" style="display : none;"></div>'),
				// 附加panel层集合
				extArray : [],
				// 存储移动的前一位置
				oldTop : null
			});
			// 初始化界面元素
			self._wrapPortal(ele, opts, json);
			
			self._bindEvents(ele);
		},
		
		_init : function() {
		},
		/**
		 * 生成protal DOM元素 
		 */
		_wrapPortal : function (ele, opts, json){
			// 按照用户给定的参数生成列
			for(var i=0; i < json.column.length; i++) {
				var columnEle = $('<div></div>');
				var width = json.column[i];
				for(var j = 0; j < json.data[i].length; j++) {
					// 每列中一行的数据
			  		var rowData = json.data[i][j];
			  		var panel = $(rowData.id).css('display', 'block');
			  		panel.panel($.extend(rowData, {
	  					width : width
	  				}));
	  				columnEle.append(panel.panel('panel').attr('panel-item', 'row'+i + '-' + j));
			  	}
			  	
			  	var extPanel = $('<div></div>');
			  	extPanel.panel({
			  		height: 100,
			  		width : width
			  	});
			  	extPanel = extPanel.panel('panel').css({
			  		visibility : 'hidden'
			  	}).attr('panel-item', 'ext-panel');
			  	
			  	$.data(ele, 'portal').extArray.push(extPanel);
			  	
			  	columnEle.addClass('portalRow').css({
			  		width : width,
			  		padding : opts.padding
			  	}).attr('id', 'row'+i).append(extPanel);
			  	
			  	
				ele.append(columnEle);
			}
		},
		/**
		 * 设置portal的拖动事件
		 */
		_bindEvents : function (ele){
			var beginEle, endEle,
				self = this,
				moveStatus = false, // true->向上，false->向下
				portal = $.data(ele, 'portal');
				
			// 添加draggable控件
			ele.find('.panel').draggable({
				helper : 'clone',
				zIndex : 9999,
				// 开始拖动事件
				start : function (){
					$(this).css({
						display : 'none'
					});
					beginEle = portal.shadow.css({
						display	: 'block',
						width   : $(this).width(),
						height  : $(this).height()
					}).insertBefore($(this));
					// 设置附加panel层样式					
					self._setExtStyle(true);
				},
				// 拖动事件
				drag : function(event, ui) {
					portal.oldTop = portal.oldTop || ui.offset.top;
					var offset = 0;
					if(ui.offset.top - portal.oldTop > offset) {
						// down
						moveStatus = false;
					} else if(ui.offset.top - portal.oldTop < offset) {
						// up
						moveStatus = true;
					}
				},
				// 拖动结束事件
				stop : function (){
					// 如果没有拖动到panel中，则还原位置
					if(!endEle){
						$(this).css({
							display :  'block'
						});
						beginEle.css({
							display : 'none'
						});
						return;
					}
					var width = endEle.width(),
						height= endEle.height();
					$(this).css({
						display	: 'block'
					}).replaceAll(endEle);
					
					// 重置panel 大小
					$(this).find('.panel-body').panel('resize',{
						width : width,
						height: height
					});
					
					// 设置附加panel层样式
					self._setExtStyle(false);
				}
			}).droppable({
				// 进入范围改变，默认为50%
				tolerance : 'intersect',
				// 拖动进入事件
				over : function (event, ui){
					var self   = $(this), 
						helper = ui.helper;
						
					$('').replaceAll(beginEle);
					endEle = portal.shadow.css({
						display	: 'block',
						width   : self.width(),
						height  : helper.height()
					});
						
					// 移动最下层div.也在它上层添加。和向上移动情况相同
					if(self.attr('panel-item') === 'ext-panel' || moveStatus){
						endEle.insertBefore($(this));
						return;
					}	
					// 向下移动
					endEle.insertAfter($(this));
				}
			});
		},
		/**
		 * 设置附加panel的样式 
 		 * @param {Object} isBlock 为true时，将样式设置成visibility:hidden（占位置），反之，设置display:none
		 */
		_setExtStyle : function (isBlock){
			this.element.find('div[panel-item="ext-panel"]').each(function (){
				if(isBlock){
					$(this).css({
						visibility  : 'hidden',
						display		: 'block'
					});
					return;
				}
				$(this).css({
					display : 'none'
				});
			});
		}
	});
})(jQuery);


/***********************/
/** jquery.ui.processmenu.js **/
/***********************/
(function($) {
	
	$.widget('ui.processmenu', {
		options : {
			/**
			 * 
			 * 数据格式如下
			 * 	var json = {
					total : 7,
					rows : [{
						title : '意见',
						href : '#demo1',
						content : '',
						isJump : false
					}, {
						title : '申报1',
						href : '#demo2',
						content : '',
						isJump : false
					}]
				}
			 */
			data : '',
			width : 600,
			height : 500,
			/**
			 *下一步事件, 进入下一步菜单之前触发
			 * @param index 下一步菜单是第几项 
			 */
			onNext : function (ui, index){},
			// 进程菜单结束事件
			onEnd : function (){}
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var total = json.total;
			/**
			 *	初始化title
			 */
			ele.addClass('processmenu');
			ele.append($('<div class="titles"></div>')).height(opts.height).width(opts.width);
			for(var i = 0; i < json.total; i++) {
				if( i == 0) {
					ele.find('.titles').append($('<span class="title title_first_selected">' + json.rows[i].title + '</span>'));
				} else if( i > 0 && i < total-1) {
					ele.find('.titles').append($('<span class="title title_middle_unselected">' + json.rows[i].title + '</span>'));
				} else if( i == total-1) {
					ele.find('.titles').append($('<span class="title title_last_unselected">' + json.rows[i].title + '</span>'));
				}
			}
			ele.width(ele.find('.titles').width());
			/**
			 *	初始化contents
			 */
			var contents = $('<div class="contents"></div>');
			contents.append($(json.rows[0].href));
			for(var i = 1; i < json.total; i++) {
				$(json.rows[i].href).css('display', 'none');
			}
			contents.css('height', opts.height - ele.find('.titles').height() - 50);
			ele.append(contents);
			/**
			 *	初始化button 
			 */
			ele.append($('<div class="buttons"></div>'));
			ele.find('.buttons').append($('<div class="button"><button class="continue">继续</button><button class="end">完成</button><button class="jump">跳过</button></div>'));
			if(!json.rows[0].isJump) {
				ele.find('.buttons').find('.button').find('.jump').css({
					'display': 'none'
				});
			}
			$.data(ele, 'processmenu', {
				current : 0,
				first : ele.find('.titles span:first-child')
			});
			this._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			var total = json.total;
			/**
			 *	继续按钮和完成按钮 
			 */
			ele.find('.continue').bind('click.processmenu', function(event) {
				var validate = $(json.rows[$.data(ele, 'processmenu').current].href).find('form').form('validate');
				if(validate){
					var current = ++$.data(ele, 'processmenu').current;
						if(current == 1) {
							$.data(ele, 'processmenu').first.removeClass('title_first_selected').addClass('title_first_unselected')
								.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
						} else if(current > 1 && current < total-1){
							$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
								.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
						} else if(current == total-1){
							$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
								.next('span').removeClass('title_last_unselected').addClass('title_last_selected');
							$(this).css({
								'display' : 'none'
							});
							ele.find('.end').css({
								'display' : 'block'
							}).click(function (){
								self._trigger('onEnd', null);
							});
							ele.find('.jump').css({
								'display' : 'none'
							});
						}
					$.data(ele, 'processmenu').first = $.data(ele, 'processmenu').first.next('span');
					ele.find('.contents').empty();

					self._trigger('onNext', null, current);
					ele.find('.contents').append($(json.rows[current].href).css('display', 'block'));
					if(json.rows[$.data(ele, 'processmenu').current].isJump) {
						ele.find('.jump').css({
							'display' : 'inline-block'
						});
					} else {
						ele.find('.jump').css({
							'display' : 'none'
						});
					}
				}
			});
			ele.find('.jump').bind('click.processmenu', function() {
				// 解决因为用户在可以跳过的地方点击继续导致的validatebox-tip弹出在后一界面无法消失的问题
				$('body').find('.validatebox-tip').remove();
				var current = ++$.data(ele, 'processmenu').current;
				if(current == 1) {
					$.data(ele, 'processmenu').first.removeClass('title_first_selected').addClass('title_first_unselected')
						.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
				} else if(current > 1 && current < total-1){
					$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
						.next('span').removeClass('title_middle_unselected').addClass('title_middle_selected');
				} else if(current == total-1){
					$.data(ele, 'processmenu').first.removeClass('title_middle_selected').addClass('title_middle_unselected')
						.next('span').removeClass('title_last_unselected').addClass('title_last_selected');
					$(this).css({
						'display' : 'none'
					});
					ele.find('.end').css({
						'display' : 'block'
					}).click(function (){
						self._trigger('onEnd', null);
					});
					ele.find('.continue').css({
						'display' : 'none'
					});
				}
				$.data(ele, 'processmenu').first = $.data(ele, 'processmenu').first.next('span');
				ele.find('.contents').empty();

				self._trigger('onNext', null, current);
				ele.find('.contents').append($(json.rows[current].href).css('display', 'block'));
				if(!json.rows[$.data(ele, 'processmenu').current].isJump) {
					ele.find('.jump').css({
						'display' : 'none'
					});
				}
			});
		}
	});
	
})(jQuery);


/***********************/
/** jquery.ui.progressbar.js **/
/***********************/
/*!
 * jQuery UI Progressbar @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   jquery.ui.core.js
 *   jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget( "ui.progressbar", {
	version: "@VERSION",
	options: {
		value: 0,
		max: 100
	},

	min: 0,

	_create: function() {
		this.element
			.addClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
			.attr({
				role: "progressbar",
				"aria-valuemin": this.min,
				"aria-valuemax": this.options.max,
				"aria-valuenow": this._value()
			});

		this.valueDiv = $( "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>" )
			.appendTo( this.element );

		this.oldValue = this._value();
		this._refreshValue();
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-progressbar ui-widget ui-widget-content ui-corner-all" )
			.removeAttr( "role" )
			.removeAttr( "aria-valuemin" )
			.removeAttr( "aria-valuemax" )
			.removeAttr( "aria-valuenow" );

		this.valueDiv.remove();
	},

	value: function( newValue ) {
		if ( newValue === undefined ) {
			return this._value();
		}

		this._setOption( "value", newValue );
		return this;
	},

	_setOption: function( key, value ) {
		if ( key === "value" ) {
			this.options.value = value;
			this._refreshValue();
			if ( this._value() === this.options.max ) {
				this._trigger( "complete" );
			}
		}

		this._super( key, value );
	},

	_value: function() {
		var val = this.options.value;
		// normalize invalid value
		if ( typeof val !== "number" ) {
			val = 0;
		}
		return Math.min( this.options.max, Math.max( this.min, val ) );
	},

	_percentage: function() {
		return 100 * this._value() / this.options.max;
	},

	_refreshValue: function() {
		var value = this.value(),
			percentage = this._percentage();

		if ( this.oldValue !== value ) {
			this.oldValue = value;
			this._trigger( "change" );
		}

		this.valueDiv
			.toggle( value > this.min )
			.toggleClass( "ui-corner-right", value === this.options.max )
			.width( percentage.toFixed(0) + "%" );
		this.element.attr( "aria-valuenow", value );
	}
});

})( jQuery );


/***********************/
/** jquery.ui.spotlight.js **/
/***********************/
(function($) {
	$.widget('ui.spotlight', {
		options : {
			/**
			 * 数据格式
			 * var json = {
					total : 8,
					rows  : [
						{ 
							title : 'P1',
							href : '#panel1',
							content : ''
						},
						{ 
							title : 'P2',
							href : '#panel2',
							content : ''
						}
					]				
				}
			 */
			data : ''
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// data数据
			$.data(ele, 'spotlight', {
				currentPanel : '',
				spotShadow : $('<div class="top spotShadow"></div><div class="right spotShadow"></div><div class="buttom spotShadow"></div><div class="left spotShadow"></div>')
			});
			// 给ele添加class，为了使用样式
			ele.addClass('spotlight');
			// 生成panel并添加到spotlight中
			for(var i = 0; i < json.total; i++) {
				var href = json.rows[i].href,
					title = json.rows[i].title;
				var panel = ele.find(href).panel({
								title : title,
								collapsible : false,
								width : 300,
								height : 150
							});
			}
			// 设置panel的样式  !!!此处不能用display : inline-block!!!
			ele.find('.panel').css({
				float : 'left',
				margin : 10
			});
			// 给panel添加按钮
			for(var i = 0; i < json.total; i++) {
				// !!!为了解决ie下面float的bug
				ele.find(json.rows[i].href).wrapInner('<div class="panel-text"></div>');
				if(i == json.total-1) {
					ele.find(json.rows[i].href).append($('<button>end</button>').addClass('endBut panelButton'));
				} else {
					ele.find(json.rows[i].href).append($('<button>nextPanel</button>').addClass('nextBut panelButton'));
				}
				// 给panel-text添加样式    !!!为了解决ie下面float的bug
				ele.find('.panel-text').css({
					float : 'left'
				})
				// 给panelButton添加样式
				ele.find('.panelButton').css({
					float : 'right',
					marginTop : ele.find(json.rows[i].href).height() - 25,
					marginRight : 5
				});
			}
			
			self._bindEvents();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			ele.parent().find('.startBut').bind('click.spotlight', function(event) {
				// 设定初始的panel
				$.data(ele, 'spotlight').currentPanel = ele.find('div:first-child');
				// 添加阴影
				$.data(ele, 'spotlight').spotShadow.insertAfter(ele);
				// 启用聚光灯
				self._spotPanel();
			});
			
			// 初始过后可以点击下一步
			ele.find('.nextBut').bind('click.spotlight', function(event) {
				if($.data(ele, 'spotlight').currentPanel != '') {
					// 改变当前panel
					$.data(ele, 'spotlight').currentPanel = $.data(ele, 'spotlight').currentPanel.next();
					// 启用聚光灯
					self._spotPanel();
				}
			});
			// 清除阴影
			ele.find('.endBut').bind('click.spotlight', function(event) {
				$.data(ele, 'spotlight').currentPanel = '';
				$.data(ele, 'spotlight').spotShadow.remove();
			});
		},
		_spotPanel : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			// 定义左右浮动大小以及高度宽度
			var currentLeft = $.data(ele, 'spotlight').currentPanel.offset().left,
				currentTop  = $.data(ele, 'spotlight').currentPanel.offset().top,
				currentWidth = $.data(ele, 'spotlight').currentPanel.width(),
				currentHeight = $.data(ele, 'spotlight').currentPanel.height();
			// 给四个阴影改变大小和显示位置
			ele.parent().find('.top').css({
				left: currentLeft,
				top: 0,
				height: currentTop,
				width: document.documentElement.clientWidth - currentLeft
			});
			ele.parent().find('.right').css({
				left: currentLeft + currentWidth,
				top: currentTop,
				height: document.documentElement.clientHeight - currentTop,
				width: document.documentElement.clientWidth - currentLeft - currentWidth
			});
			ele.parent().find('.buttom').css({
				left: 0,
				top: currentTop + currentHeight,
				height: document.documentElement.clientHeight - currentTop - currentHeight,
				width: currentLeft + currentWidth
			});
			ele.parent().find('.left').css({
				left: 0,
				top: 0,
				height: currentHeight + currentTop,
				width: currentLeft
			});
		}
	});
})(jQuery);


/***********************/
/** jquery.ui.tabs.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.10 
 * @description  基于jquery UI、easyUI扩展的tabs组件
 * @extends		 panel
 */
(function(){
    var tabIdPrefix = 'ui-tabs-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1) + '-',
        id = 0;
    /**
     * class panel， 在target指定的地方根据config生成一个Panel， 该类是$.fn.panel包装器。
     * param target dom元素，一般指向一个div。
     * param config 生成Panel所需要的配置项，如果设置了content属性，则使用其为内容将会被传递给 $.fn.panel。
     * return 原先的target
     */
    function panel (target, config) {
        if ( config.content ) {
            $(target).html(config.content);
        }
        return $(target).panel(config);
    }
    $.widget('ui.tabs', {
        options : /** @lends uitabs#*/ {
            /**
             * 页签布局的宽度，可取值为'auto'(默认情况，不做处理)，可以取值为'fit'，表示适应父容器的大小(width:100%)，也可以直接设置width大小（单位：像素）。
             * @default 'auto'
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({width: 500});
             */
            width : 'auto',
            /**
             * 页签布局的高度，可取值为'auto'(默认情况，不做处理)，可以取值为'fit'，表示适应父容器的大小(height:100%)，也可以直接设置height大小（单位：像素）。
             * @default 'auto'
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({height: 200});
             */
            height : 'auto',
            /**
             * 是否显示页签正文区的边框。
             * @default true
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({border: false});//不显示页签正文区的边框
             */
            border : true,
            /**
             * 单个页签头部的宽度。
             * @default auto
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({tabWidth: 'auto'});
             */
            tabWidth : 'auto',
            /**
             * 单个页签头部的高度，可取值为'auto'。默认为18像素。
             * @default 18
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({tabHeight: 'auto'});
             */
            tabHeight : 18,
            // TODO: 暂时不启用
            /*
             * 是否禁用组件。 
             * @name uitabs#disabled
             * @default false
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({disabled : true});//初始化时禁用组件
             */
            disabled : false,
            /**
             * 当页签超过组件宽度时是否出现左右滚动箭头。
             * @default true
             * @type Boolean
             * @example
             * //当页签数目较多时不显示滚动箭头，将访问不到未显示的页签
             * $('#make-tab').uitabs({scrollable: false});
             */
            scrollable : true,
            /**
             * 页签是否可关闭，当本属性为true时，所有页签都可以关闭。当属性值为数组时，只有数组中指定的index的页签可以关闭，index从0开始。
             * @default false
             * @type Boolean,Array
             * @example
             * //页签可关闭
             * $('#make-tab').uitabs({closable : true});
             * 
             * //只有第一个和第三个页签可以关闭
             * $('#make-tab').uitabs({closable : [0,2]);
             */
            closable : false,
            
            //  暂时不公布
            //  页签头部的位置，可为top和left //TODO 'left'
            // @default 'top'
            // @type String
            // @example
            // $('#make-tab').uitabs({position : 'left'});//页签头部在组件的左边
            //
            position : 'top',
            /**
             * 页签切换的模式。可为click(鼠标点击切换)，mouseover(鼠标滑过切换)。<b>注意：当设置了autoPlay属性时，虽然组件在自动切换，此时仍可以使用鼠标点击（鼠标划过）切换页签</b>
             * @default 'click'
             * @type String
             * @example
             * $('#make-tab').uitabs({switchMode : 'mouseover'});//鼠标划过切换页签
             */
            switchMode : 'click',
            /**
             * 是否自动循环切换页签。
             * @default false
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({autoPlay:true});//自动切换页签
             */
            autoPlay : false,
            /**
             * 自动切换页签的时间间隔，单位为毫秒。 该属性在 switchMode 为auto时才生效。
             * @default 1000
             * @type Number
             * @example
             * $('#make-tab').uitabs({autoPlay:true, interval : 2000});//自动切换页签时，时间间隔为2s
             */
            interval : 1000,
            /**
             * 初始化时被激活页签的索引（从0开始计数）或者tabId。
             * @default 0
             * @type Number,String
             * @example
             * $('#make-tab').uitabs({active : 1});//初始化时激活第二个页签
             * $('#make-tab').uitabs({active : 'tab-1'});//初始化时激活Id为'tab-1'的页签
             */
            active : 0,
            /**
             * 是否懒加载，当该属性为true时，只有在页签被单击选中时才尝试加载页签正文区。
             * @default false
             * @type Boolean
             * @example
             * $('#make-tab').uitabs({lazyLoad : true});
             */
            lazyLoad : false,
            /**
             * 当页签被选中之前执行的方法。
             * @event
             * @param n 选中页签的索引，从0开始计数.
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeActivate : function(event,n) {
             *          alert('tab ' + n + ' will be activated!');
             *      }
             *  });
             */
            onBeforeActivate : function(event, n) {
            },
            /**
             * 当页签被选中后执行的方法。
             * @event
             * @param n 选中页签的索引，从0开始计数.
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onActivate : function(n,event) {
             *          alert('tab ' + n + ' has been activated!');
             *      }
             *  });
             */
            onActivate : function(event, n) {
            },
            /**
             * 当页签被关闭之前执行的方法。
             * @event
             * @param n 被关闭页签的索引，从0开始计数。
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeClose : function(n,event) {
             *          alert('tab ' + n + ' will be closed!');
             *      }
             *  });
             */
            onBeforeClose : function(event, n) {
            },
            /**
             * 当页签被关闭之后执行的方法。
             * @event
             * @param n 被关闭页签的索引，从0开始计数。
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onClose : function(n,event) {
             *          alert('tab ' + n + ' has been closed!');
             *      }
             *  });
             */
            onClose : function(event, n) {
            },
            /**
             * 当关闭所有页签之前执行的方法。
             * @event
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeCloseAll : function(event) {
             *          alert('all tabs will be closed !');
             *      }
             *  });
             */
            onBeforeCloseAll : function(event) {
            },
            /**
             * 当关闭所有页签之后执行的方法。
             * @event
             * @param event jQuery.Event对象
             * @default emptyFn 
             * @example
             *  $('#make-tab').uitabs({
             *      onCloseAll : function(event) {
             *          alert('tabs are all closed now !');
             *      }
             *  });
             */
            onCloseAll : function() {
            },
            /**
             * 当新页签被添加之后执行的方法。
             * @event
             * @default emptyFn 
             * @param config 经过处理的配置项。在调用add新增页签时，传入的配置项参数可能不完整(使用默认值)，此处的config就是完整的配置项
             * @param event jQuery.Event对象
             * @example
             *  $('#make-tab').uitabs({
             *      onAdd : function(config,event) {
             *          console.dir(config);
             *          alert('you have added a tab at position:' + config.index );
             *      }
             *  });
             * title, content, url, closable , index
             */
            onAdd : function(event, config) {
            },
            /**
             * 当新页签被添加之前执行的方法。
             * @event
             * @default emptyFn 
             * @param config 经过处理的配置项。在调用add新增页签时，传入的配置项参数可能不完整(使用默认值)，此处的config就是完整的配置项
             * @param event jQuery.Event对象
             * @example
             *  $('#make-tab').uitabs({
             *      onBeforeAdd : function(config,event) {
             *          console.dir(config);
             *          alert('you will add a tab at position:' + index );
             *      }
             *  });
             */
            onBeforeAdd : function(event, config) {
            },
            /**
             * 当页签使用ajax方式加载内容，加载完成后执行的方法。
             * @event
             * @default emptyFn
             * @param tabId 刚加载完成的页签的tabId
             * @param event jQuery.Event对象
             * @example
             *  $('#make-tab').uitabs({
             *      onLoadComplete : function(tabId,event) {
             *          alert(tabId + 'has just been loaded!' );
             *      }
             *  });
             */
            onLoadComplete : function(event, tabId) {
            }
        },
        
        /**
         * 在index处增加一个tab页签。参数为json格式的配置项。 调用该方法会触发 add事件。
         * 配置项参数：
         * <ol>
         * <li>index：新增页签的位置（从0开始计数,默认在末尾增加页签），可设置为'last'</li>
         * <li>title：新增页签的标题，默认值为 'New Title' + 全局唯一字符串</li>
         * <li>content：新增页签的内容，默认值为 'New Content' + 全局唯一字符串</li>
         * <li>url：新增页签的数据源为url。如果同时设置了content和url，则优先使用url</li>
         * <li>tabId：设置tabId，作为唯一标识，可以通过此标识唯一确定一个tab页签，tabId不能重复</li>
         * <li>closable：该新增的页签是否可关闭。</li>
         * </ol>
         * @name uitabs#add
         * @function
         * @param Object {index,title,content,url,colsable,tabId}
         * @example
         * //在第一个页签的位置新增一个页签,该页签的内容是远程数据
         * $('#make-tab').uitabs('add', {
         *     index : 0,
         *     title : 'New Tab1',
         *     content : 'New Content1',
         *     closable : false
         * });
         */
        // TODO: index param should support 'first'
        add : function(config /*title, content, url, closable , index,tabId*/) {
            this._add(config /*title, content, url, closable , index,tabId*/);
        },
        
        /**
         * 关闭特定的页签，如果n指向当前页签，则会选中下一页签；如果当前页签是最末尾的页签，则会选中第一个页签。可以看到每关闭一个页签就会分别触发一次close事件和activate事件。
         * @name uitabs#close
         * @function
         * @param n 要关闭的页签的位置（从0开始计数），或者该页签的tabId(一个全局唯一的字符串)。 如果未指定该参数，则默认关闭当前页签。
         * @example
         * //关闭第一个页签
         * $('#make-tab').uitabs('close', 0);
         */
        close : function(n) {
            this._close(n);
        },
        /**
         * 关闭所有页签，由于该操作只关注于删除所有页签，因此只会触发 onCloseAll事件，而不会逐个触发每个页签的onClose事件。
         * @name uitabs#closeAll
         * @function
         * @example
         * //关闭所有页签
         * $('#make-tab').uitabs('closeAll');
         */
        closeAll : function() {
            this._closeAll();
        },
    
        /**
         * 选中特定的页签，触发activate事件。
         * @name uitabs#activate
         * @function
         * @param n 可为页签的索引（从0开始计数），或者页签的tabId
         * @example
         * //激活第一个页签
         * $('#make-tab').uitabs('activate', 0);
         */
        activate : function(n) {
            this._activate(n);
        },
        /**
         * 页签索引和tabId的转换器。传入其中的一个值，获取另一个值。
         * @name uitabs#getAlter
         * @function
         * @param id 标识符
         * @returns 如果id为数字，则表示页签的索引，函数返回页签的tabId；如果id为字符串，则表示该页签的tabId，函数返回页签的索引。
         *          如果索引不合法或者id作为tabId时找不到，则统一返回null。
         * @example
         * //获取第一个页签的tabId
         * var tabId = $('#make-tab').uitabs('getAlter', 0);
         */
        getAlter : function(id) {
            return this._getAlter(id);
        },
        /**
         * 返回当前选中的页签的tabId。
         * @name uitabs#getActivated
         * @function
         * @returns 当前选中页签的tabId
         * @example
         * //获取当前选中页签的tabId
         * var activatedTabId = $('#make-tab').uitabs('getActivated');
         */
        getActivated : function() {
            return this._getActivated();
        },
        /**
         * 获得所有页签的数目。
         * @name uitabs#getLength
         * @function
         * @returns 页签的数目
         * @example
         * //获取页签的总数
         * var total = $('#make-tab').uitabs('getLength');
         */
        getLength : function() {
            return this._getLength();
        },
        /**(deprecated，建议用reload方法)
         * 设置第n个页签的数据源，可为普通文本或者url。注意该方法只是会重置一个当前页签是否已被加载的标记，而不负责实际加载数据，
         * 在非懒加载的情况下，需要手动加载数据。在懒加载的情况下，当页签被点击选中时会检查是否已经加载的标记，从而尝试重新加载内容。
         * @deprecated
         * @name uitabs#setDataSource
         * @function
         * @param index 被操作页签的索引(从0开始计数)
         * @param content 设置了该属性则表示数据源为普通文本。
         * @param url 设置了该属性表示数据源是远程url，如果同时设置了content和url，则优先使用url。
         * @example
         * //设置第一个页签的数据源为远程数据
         *  $('#make-tab').uitabs('setDataSource', {
         *      index : 0,
         *      url : './ajax/content1.html'
         *  });
         */
        setDataSource : function(config /*content, url, index*/) {
            if (config.index === undefined || (  !config.url && !config.content )) {
                return;
            }
            this._setDataSource(config /*content, url, index*/);
        },
        /**
         * 根据新的数据源重新加载某个页签的内容。
         * @name uitabs#reload
         * @function
         * @param index 页签的索引
         * @param url 页签为远程取数时的url，此属性优先级高于content
         * @param content 页签的文本内容
         * @example
         * //重新加载第一个页签的内容
         * $('#make-tab').uitabs('reload', 0 , "./getData.html");
         */
        reload : function(index , url , content) {
            this._reload(index , url , content);
        },
        /**
         * 对组件重新布局，主要操作是刷新页签滚动箭头。
         * 如果有必要使用页签滚动箭头，则刷新滚动箭头的状态。如果没必要使用页签滚动箭头，则将存在的删除。
         * @name uitabs#doLayout
         * @function
         * @example
         * //对组件重新布局，如果有必要使用页签滚动箭头，则刷新滚动箭头的状态。
         */
        doLayout : function() {
            this._doLayout();
        },
        
        _create : function() {
            var $self = this.element;
            $.data($self, 'uitabs', {});
            $.data($self, 'uitabs').uitabs = this._makeSketch();
            $.data($self, 'uitabs').items = this._collectItems();
            $.data($self, 'uitabs').history = [];//页签访问的历史记录
        }, 
        
        _init : function() {
            this._render();
            this._afterRender();
            this._buildEvent();
        },
        
        _makeSketch : function() {
	        var $self = this.element,
	        	$tabs = $self.find('>ul').wrap('<div class="ui-tabs-headers ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"></div>').parent().parent()
	        			.addClass('ui-tabs ui-widget ui-widget-content ui-corner-all').append('<div class="ui-tabs-panels ui-widget-content ui-corner-bottom"></div>');
	        //now we have a sketch, which contains the headers and panels
	        return $tabs;
    	},
    	
    	_collectItems : function() {
	        var _self = this,
	        	$self = this.element,
	        	options = this.options,
	        	items = [],
	        	loadInfo = [];
	        $self.find('>div.ui-tabs-headers a').each(function(){
	            var href  = this.getAttribute('href', 2);
	            var hrefBase = href.split( "#" )[ 0 ],
	                baseEl;
	            if ( hrefBase && ( hrefBase === location.toString().split( "#" )[ 0 ] ||
	                    ( baseEl = $( "base" )[ 0 ]) && hrefBase === baseEl.href ) ) {
	                href = this.hash;
	                this.href = href;
	            }
	            var anchor = $(this);
	            var tabId = anchor.attr('tabId') || anchor.attr('id') || tabIdPrefix + id++ ;
	            anchor.attr('tabId', tabId);
	            var cfg = {
	                    tabId : tabId,
	                    title : anchor.text(),
	                    _closeMode : "visibility",
	                    noheader : true,
	                    closed : true,//先全部隐藏.
	                    onSuccess : function(data, textStatus, xmlHttpRequest){
	        				_self._trigger("onLoadComplete",null,cfg.tabId);
	        				
			        	},
			        	onError : function(xmlHttpRequest, textStatus, errorThrown){
			        		_self._trigger("onLoadComplete",null,cfg.tabId);
			        	}
	            };

	            var target = $('>' + href, $self)[0];
	            
	            // 考虑到tab DOM结构不完整的情况。
	            // 例如，当anchor的href='#tab-3'，而用户忘记在tabs里面写id=tab-3的DOM，此时不应该把#tab-3作为url进行load
	            // http://jira.apusic.net/browse/AOM-204
	            if (!target && href.indexOf('#') != 0) {
	                //如果是url，并且是非懒加载，则直接交由panel去加载
	                if(options.lazyLoad === false){
	                	cfg.url = href;
	                }else{
	                	loadInfo.push({
	                		tabId: tabId,
	                		url: href,
	                		loaded: false  
	                	});
	                }
	            }
	            var item = new panel(target || $('<div></div>')[0], cfg);
	            items.push(item);
	        });
	        
	        if(loadInfo.length > 0){
            	//一旦存储在loadInfo中，表示该tab还没有进行加载(设置了懒加载)，一旦tab加载完了，相应的要删掉其loadInfo信息
            	$.data($self , "uitabs").loadInfo = loadInfo;
            }
	        // tems 是panel的集合.每一个item通过 $(item).panel('panel')之后能获取到对应的panel对象
	        return items;
    	},
    	
    	_render : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items;
	        // 对不合法的值处理
	        if(typeof options.active == 'number'){
	        	if (options.active < 0) {
	        		options.active = 0;
	        	}
	        	if (options.active > items.length - 1) {
	        		options.active = items.length - 1;
	        	}
	        }
	        if (options.width == 'fit') {
	        	$uitabs.outerWidth($uitabs.parent().innerWidth());
	        } else if (options.width != 'auto') {
	            $uitabs.css('width', options.width);
	            // 解决IE7下，tabs在table>tr>td中ul把table的宽度撑宽的问题
	//            uitabs.children(':first').css('width',options.width);
	            var isPercent = isNaN(options.width) && options.width.indexOf('%') != -1;
	            $uitabs.children(':first').css('width',isPercent?'100%':options.width);
	        }
	        if (options.height == 'fit') {
	        	$uitabs.outerHeight($uitabs.parent().innerHeight());
	        } else if (options.height != 'auto') {
	            $uitabs.css('height', options.height);
	        }
	        this._renderHeader();
	        this._renderBody();
    	},
    	
		_renderHeader : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs;
	        var $headers = $uitabs.find('>div.ui-tabs-headers');
	        var $lis = $headers.find('ul li');
	        $lis.addClass('ui-state-default ui-corner-top');
	        $lis.each(function(n){
	            //$('a.om-icon-close', $(this)).remove(); 暂时去掉
	            
	            var $innera = $(this).find('a:first');
	            if ($.browser.msie && parseInt($.browser.version) == 7 ) {
	                $innera.attr('hideFocus', 'true');
	            }
	            if (!$innera.hasClass('ui-tabs-inner')) {
	                $innera.addClass('ui-tabs-inner');
	            }
	            if (n === options.active || options.active === $innera.attr('tabId')) {
	                $(this).addClass('ui-tabs-activated ui-state-active');
	                options.activeTabId = $innera.attr('tabId');
	                options.active = n;
	                var i=0,
	                	his;
	                while(his=data.history[i]){
	                	if(options.activeTabId != his){ //防止多次条用init时加入重复的历史记录导致active不正确
	                		data.history.push(options.activeTabId);
	                		break;
	                	}
	                }
	            } else {
	            	$(this).removeClass('ui-tabs-activated ui-state-active');
	            }
	            //tab width and height. by default, tabWidth=auto tabHeight=25, accept 'auto'
	            $innera.css({
	                'width' : options.tabWidth,
	                'height' : options.tabHeight
	            });
	            if (options.closable===true || ($.isArray(options.closable) && -1 !== $.inArray(n,options.closable))) {
	            	if($innera.next('.ui-icon-close').length <= 0){
	            		$('<a class="ui-icon ui-icon-close"></a>').insertAfter($innera);
	            	}
	            }else{
	            	$innera.next().remove();
	            }
	        });
	        var aHeight = $lis.find('a.ui-tabs-inner').height();
	         $lis.parent().css({
	            // 'height' : ++ aHeight ,
	             'line-height' : aHeight + 'px'
	         });
	        $headers.height(aHeight + 7);
	        this._checkScroller() && this._enableScroller();
    	},
    	
		_renderBody : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	        	$panels = $uitabs.find('>div.ui-tabs-panels');
	        //detach all sub divs
	        $panels.children().detach();
	        if (options.height !== 'auto') {
	            var uitabsHeight = $uitabs.innerHeight(),
	                headersHeight = $uitabs.find('>div.ui-tabs-headers').outerHeight();
	            $panels.css('height', uitabsHeight - headersHeight);
	        }
	        options.border ? $uitabs.removeClass('ui-tabs-noborder') : $uitabs.addClass('ui-tabs-noborder');
	        var i = items.length;
	        while( i-- ) {
				items[i].addClass("ui-state-nobd").parent().prependTo($panels);
	        }
    	},
    	
    	_afterRender : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            items = data.items,
	            $uitabs = data.uitabs;
	        var i = items.length;
	        $self.children().each(function(){
	            if (!$(this).hasClass('ui-tabs-headers') &&
	                    !$(this).hasClass('ui-tabs-panels') ) {
	                $(this).remove();
	            }
	        });
	        if (!options.lazyLoad) {
	            //$(items).panel('reload');
	        }
	        while( i -- ) {
	            var $target = $(items[i]);
	            if (i == options.active) {
	                $target.panel('open');
	            } else {
	                $target.panel('close');
	            }
	        }
	        $uitabs.css('height',$uitabs.height());
	    	$uitabs.css('height',options.height);
    	},
    	
		_buildEvent : function() {
	        var that = this,
	        	$self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            $closeIcon = $uitabs.find('>div.ui-tabs-headers a.ui-icon-close');
	        //close icon
	        $closeIcon.unbind('click.uitabs');
	        $closeIcon.bind('click.uitabs', function(e){
	            var tabid = $(e.target).prev().attr('tabId');
	            that._close(tabid);
	            return false;
	        });
	        // tab click
	        var $tabInner = $uitabs.find('>div.ui-tabs-headers a.ui-tabs-inner'); 
	        if (options.switchMode.indexOf('mouseover') != -1) {
	        	$tabInner.bind('mouseover.uitabs', function() {
	                 var tabId = $(this).attr('tabId'), timer = $.data($self, 'activateTimer');
	                (typeof timer !=='undefined') && clearTimeout(timer);
	                timer = setTimeout(function(){
	                    that._activate(tabId);
	                    return false;
	                },500);
	                $.data($self, 'activateTimer', timer);
	            });
	        } else if (options.switchMode.indexOf('click') != -1 ) {
	        	$tabInner.bind('click.uitabs', function(){
	                that._activate($(this).attr('tabId'));
	            });
	        }
	        $tabInner.bind('click.uitabs',function(){
	        	return false;
	        });
	        if (options.autoPlay != false ) {
	            options.autoInterId = setInterval(function(){
	                $self.uitabs('activate', 'next');
	            }, options.interval);
	        } else {
	            clearInterval(options.autoInterId);
	        }
	        //tab hover
	        if ( options.switchMode.indexOf("mouseover") == -1 ) {
	            var $lis = $uitabs.find('>div.ui-tabs-headers li');
	            var addState = function( state, $el ) {
	                if ( $el.is( ":not(.ui-state-disabled)" ) ) {
	                    $el.addClass( "ui-state-" + state );
	                }
	            };
	            var removeState = function( state, $el ) {
	                $el.removeClass( "ui-state-" + state );
	            };
	            $lis.bind( "mouseover.uitabs" , function() {
	                addState( "hover", $( this ) );
	            });
	            $lis.bind( "mouseout.uitabs", function() {
	                removeState( "hover", $( this ) );
	            });
	        }
	        //scroller click
	        $uitabs.find('>div.ui-tabs-headers >span').bind('click.uitabs', function(e) {
	            if ($(this).hasClass('ui-tabs-scroll-disabled')) {
	                return false;
	            }
	            var dist = $(this).parent().find('ul').children(':last').outerWidth(true);
	            if ($(this).hasClass('ui-tabs-scroll-left')) {
	                that._scroll(dist, that._scrollCbFn());
	            }
	            if ($(this).hasClass('ui-tabs-scroll-right')) {
	                that._scroll(- dist, that._scrollCbFn());
	            }
	            return false;
	        });
		},
		
    	//remove every events.
		_purgeEvent : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs;
	        var $headers = $uitabs.find('>div.ui-tabs-headers');
	
	        $headers.children().unbind('.uitabs');
	        $headers.find('>ul >li >a').unbind('.uitabs');
	        if (options.autoInterId) {
	            clearInterval(options.autoInterId);
	        }
    	},
    	
	    /**
	     * 选中特定的页签
	     * n 可为页签的索引（从0开始计数），或者页签的tabId TODO n 需要支持first  和 last 表示选中第一个和最后一个
	     */
     	_activate : function(n) {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	            url;
	        var $ul = $uitabs.find('>div.ui-tabs-headers ul');
	        if ( options.activeTabId == n || options.active == n ) {
	            return false;
	        }
	        n = n || 0;
	        var $anchor , tid = n;
	        if ( n == 'next' ) {
	            n = (options.active + 1) % items.length ;
	        } else if ( n == 'prev' ) {
	            n = (options.active - 1) % items.length ;
	        } 
	        if (typeof n == 'number') {
	            tid = this._getAlter(n);
	        } else if (typeof n == 'string') {
	            n = this._getAlter(n);
	        }
	        if (options.onBeforeActivate && this._trigger("onBeforeActivate",null,n) == false) {
	            return false;
	        }
	        $anchor = $ul.find('li a[tabId=' + tid + ']');
	        $anchor.parent().siblings().removeClass('ui-tabs-activated ui-state-active');
	        $anchor.parent().addClass('ui-tabs-activated ui-state-active');
	        options.activeTabId = tid;
	        options.active = n;
	        var i = items.length;
	        // 保证切换面板时先显示后隐藏，防止页面抖动的现象
	        for(i=items.length;i--;i>=0){
	        	var $target = items[i];
	        	if ($target.panel('option' , 'tabId')== tid) {
	        		$target.panel('open');
	        		if(url=this._getUnloadedUrl(tid)){
	        			$target.panel("reload" , url);
	        			this._removeLoadInfo(tid);
	        		}
	        	}
	        }
	        for(i=items.length;i--;i>=0){
	        	var $target = items[i];
	        	if ($target.panel('option' , 'tabId') != tid) {
	        		$target.panel('close');
	        	}
	        }
	        //当选中了一个并未完全显示的页签,需要滚动让他完全显示出来
	        if (this._checkScroller()) {
	            //stop every animation.
	            $ul.stop(true, true);
	            $self.clearQueue();
	            var $lScroller = $ul.prev();
	            var $rScroller = $ul.next();
	            var lBorder = $anchor.parent().offset().left;
	            var rBorder = lBorder + $anchor.parent().outerWidth(true);
	            var lDiff = $lScroller.offset().left + $lScroller.outerWidth(true) + 4 - lBorder ;
	            var rDiff = $rScroller.offset().left - rBorder ;
	            if (lDiff >= 0) {
	                this._scroll(lDiff, this._scrollCbFn());
	            } else if (rDiff <= 0) {
	                this._scroll(rDiff, this._scrollCbFn());
	            } else {
	                this._scrollCbFn()();
	            }
	        }
	        var his = data.history,
	        	index = data.history.length;
	        while(his[--index] && tid !== his[index]){};
	        index==-1 ? his.push(tid) : his.push(his.splice(index , 1)[0]);
	        options.onActivate && this._trigger("onActivate",null,n);
    	},
    
		/**
    	 * 如果对应的tab已经加载过了，返回null,否则返回指定tab的url
    	 */
		_getUnloadedUrl : function(tid){
    		var loadInfo = $.data(this.element, 'uitabs').loadInfo, 
    			len,
    			info;
    		if(loadInfo){
    			len = loadInfo.length;
    			while(info=loadInfo[--len]){
    				if(info.tabId === tid && info.loaded === false){
    					return info.url;
    				}
    			}
    		}
    	 	return null;
		},
		
		/**
		 * 把对应的tab的loadInfo信息删除掉
		 */
		_removeLoadInfo : function(tid){
			var loadInfo = $.data(this.element, 'uitabs').loadInfo, 
    			len,
    			info;
    		if(loadInfo){
    			len = loadInfo.length;
    			while(info=loadInfo[--len]){
    				if(info.tabId === tid){
    					loadInfo.splice(len , 1);
    					break;
    				}
    			}
    		}
		},
		
		/**
		 * 添加对应的tab的loadInfo信息
		 */
		_addLoadInfo : function(tabId , url){
			$.data(this.element, 'uitabs').loadInfo.push({
				tabId : tabId , 
				loaded: false , 
				url : url
			});
		},
    
	    /**
	     * 页签索引和tabId的转换器。
	     * 如果传入的id为数字，则表示页签的索引，函数返回页签的tabId；如果id为字符串，则表示该页签的tabId，函数返回页签的索引。
	     */
		_getAlter : function(id) {
	        var $self = this.element,
	        	$uitabs = $.data($self, 'uitabs').uitabs,
	            rt;
	        if (typeof id == 'number'){
	            rt = $uitabs.find('>div.ui-tabs-headers li:nth-child(' + ++id + ') a.ui-tabs-inner').attr('tabId');
	        } else if (typeof id == 'string') {
	            $uitabs.find('>div.ui-tabs-headers li a.ui-tabs-inner').each(function(i){
	                if ($(this).attr('tabId') == id ) {
	                    rt = i;
	                    return false;
	                }
	            });
	        }
	        return rt===undefined? null : rt;//如果找不到要返回null,而不是undefined,这源于om-core.js中对于返回undefined，最终会返回组件实例
    	},
    	
	    /**
	     * 返回当前选中的页签的tabId
	     */
    	_getActivated : function() {
			return this.options.activeTabId;
    	},
    	
	    /**
	     * 增加一个tab到页签布局中.最后一个参数isAjax指示了ds是否为一个URL
	     */
    	_add : function(config/*title, content, url, closable , index,tabId*/) {
	        var _self = this,
	        	$self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items;
	        var $ul = $uitabs.find('>div.ui-tabs-headers ul');
	        var tabId = config.tabId?config.tabId:tabIdPrefix + id++;
	        //调整参数
	        config.index = config.index || 'last';
	        if (config.index == 'last' || config.index > items.length - 1) {
	            config.index = items.length;
	        }
	        config.title = config.title || 'New Title ' + tabId;
	        config.url = $.trim(config.url);
	        config.content = $.trim(config.content);
	        if (config.url) {
	            config.content = undefined;
	        } else {
	            config.url = undefined;
	            config.content = config.content || 'New Content ' + tabId;
	        }
	        if (options.onBeforeAdd && _self._trigger("onBeforeAdd",null,config/*title, content, url, closable , index*/) == false) {
	            return false;
	        }
	        var $nHeader=$('<li class="ui-state-default ui-corner-top"> </li>');
	        var $anchor = $('<a class="ui-tabs-inner"></a>').html(config.title).attr({
	                href : '#' + tabId,
	                tabId : tabId
	            }).css({
	                width : options.tabWidth,
	                height : options.tabHeight
	            }).appendTo($nHeader);
	        if ($.browser.msie && parseInt($.browser.version) == 7) {
	            $anchor.attr('hideFocus','true');
	        }
	        if ((config.closable === true) || 
	                (config.closable == undefined && options.closable)) {
	            $anchor.after('<a class="ui-icon ui-icon-close"></a>');
	        }
			var cfg = {
	            tabId : tabId,
	            title : $anchor.text(),
	            _closeMode : "visibility",
	            noheader : true,
	            closed : true,
                onSuccess : function(data, textStatus, xmlHttpRequest){
    				_self._trigger("onLoadComplete",null,tabId);
	        	},
	        	onError : function(xmlHttpRequest, textStatus, errorThrown){
	        		_self._trigger("onLoadComplete",null,tabId);
	        	}
	        };
	        if(config.url){
	        	cfg.url = config.url;
	        	// 添加url请求content
	        	$.ajax({
	        		url : cfg.url,
	        		async : false,
	        		success : function (data){
	        			cfg.content = data;
	        		}
	        	})
	        	alert(cfg.content);
	        }
	        $.extend(cfg, config);
	        
	        // 添加panel id
	        var $nPanel = new panel($('<div>'+(config.content || '')+'</div>').attr('id',tabId)[0],cfg);
	        if (config.index == items.length) {
	            items[config.index] = $nPanel;
	            $nHeader.appendTo($ul);
	        } else {
	            //insert at index
	            items.splice(config.index, 0, $nPanel);
	            $ul.children().eq(config.index).before($nHeader);
	        }
	        //om-tabs在添加很多个页签后，当页签头的宽度超过5000px的时候出现换行。所以这里进行宽度自动扩充
            if($ul.innerWidth()-$nHeader.position().left<500){
                $ul.width($ul.width()+500);
            }
	        //every time we add or close an tab, check if scroller is needed.
	        this._checkScroller() && this._enableScroller();
	        this._renderBody();
	        this._purgeEvent();
	        this._buildEvent();
	        this._trigger("onAdd",null,cfg);
	        this._activate(config.index);
    	},
    	
	    /**
	     * 将index处的页签关闭，如果index指向当前页签，则激活下一页签；如果当前页签是最后一个页签，则激活第一个页签
	     * index :页签的位置，可为数字，tabId等。 TODO index将要支持prev，  next， first， last
	     */
    	_close : function(index) {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	        	$headers = $uitabs.find('>div.ui-tabs-headers'),
	        	$panels = $uitabs.find('>div.ui-tabs-panels'),
	        	uitabsHeight = $uitabs.height(),
	        	tabId = index,//待关闭的tab的id
	        	his = data.history;//页签打开历史记录
	        index = (index === undefined ? options.active:index);
	        if (typeof index == 'string') {
	            //index is a tabid
	            index = this._getAlter(index);
	        }else{
	        	tabId = this._getAlter(index);
	        }
	        if (options.onBeforeClose && this._trigger("onBeforeClose",null,index) == false) {
	            return false;
	        }
	        //这里删除loadInfo是有必要的，因为也许该tab从来就没有激活过，但却是懒加载的
	        this._removeLoadInfo(this._getAlter(index));
	        var liR = $headers.find('li').eq(index);
	        var panelId = liR.find('a[tabid="' + tabId + '"]').attr('href');
	        //$headers.find('li').eq(index).remove();
	        liR.remove();
	        
	        $(panelId).panel('destroy');//_remove();
	        //$panels.children().find(">.panel-body").eq(index).panel('close');
	        //alert($panels.children().find(">.panel-body").eq(index).html());
	        //$panels.children().find(">.panel-body").eq(index).remove();
	        items.splice(index, 1);
	        //in case of all tabs are closed, set body height
	        if ($panels.children().length == 0) {
	            $panels.css({height : uitabsHeight - $headers.outerHeight()});
	        }
	        var len = his.length;
	        while(his[--len] && tabId === his[len]){
	        	his.splice(len , 1);
	        	break;
	        }
	        options.onClose && this._trigger("onClose",null,index);
	        if (items.length == 0) {
	            options.active = -1;
	            options.activeTabId = null;
	            return ;
	        } else if (index == options.active) {
	            options.active = -1;
	            this._activate(his.length>0? his.pop() : 0);
	        } else {
	            index < options.active && options.active --;
	            this._checkScroller() && this._enableScroller();
	        }
    	},
    	
	    /**
	     * 关闭所有页签，该操作会触发 closeAll事件
	     */
     	_closeAll : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs,
	            items = data.items,
	        	$headers = $uitabs.find('>div.ui-tabs-headers'),
	        	$panels = $uitabs.find('>div.ui-tabs-panels'),
	        	uitabsHeight = $uitabs.height();
	        
	        if (options.onBeforeCloseAll && this._trigger("onBeforeCloseAll") == false) {
	            return false;
	        }
	        for(var i=0,len=items.length; i<len; i++){
	        	this._removeLoadInfo(items[i].panel("option" , "tabId"));
	        }
	        $headers.find('li').remove();
	        $panels.children().remove();
	        items.splice(0,items.length);
	        $panels.css({height : uitabsHeight - $headers.outerHeight()});
	        options.active = -1;
	        options.activeTabId = null;
	        data.history = [];
	        options.onCloseAll && this._trigger("onCloseAll");
    	},
    	
	    /**
	     * 如果tab页签总宽度较大，则显示scroll并返回true；否则删除scroll并返回false。
	     */
     	_checkScroller : function() {
	        var $self = this.element,
	        	data = $.data($self, 'uitabs'),
	            options = this.options,
	            $uitabs = data.uitabs;
	        if (!options.scrollable) {
	            return false;
	        }
	        var $ul = $uitabs.find('>div.ui-tabs-headers ul');
	        var totalWidth = 0, flag = false;
	        if ($ul.hasClass('ui-tabs-scrollable')) {
	            //先假定没有左右滚动器 ,来计算宽度是否超过.
	            flag = true;
	            $ul.removeClass('ui-tabs-scrollable');
	        }
	        totalWidth += parseInt($ul.css('paddingLeft')) + parseInt($ul.css('paddingRight'));
	        if (flag == true) {
	            //重新加上滚动器 .
	            flag = false;
	            $ul.addClass('ui-tabs-scrollable');
	        }
	        $ul.children().each(function() {
	            //计算一个li占用的总宽度
	            totalWidth += $(this).outerWidth(true);//sub element's width
	        });
	        if (totalWidth > $ul.parent().innerWidth()) {
	            if (!$ul.hasClass('ui-tabs-scrollable')) {
	                var $leftScr = $('<span></span>').insertBefore($ul).addClass('ui-tabs-scroll-left');
	                var $rightScr = $('<span></span>').insertAfter($ul).addClass('ui-tabs-scroll-right');
	                var mgn = ($ul.height() - $leftScr.height())/2;
	                // $leftScr.add($rightScr).css({ // scroller in vertical center.
	                    // 'marginTop' : mgn,
	                    // 'marginBottom' : mgn
	                // });
	                $ul.addClass('ui-tabs-scrollable');
	            }
	            return true;
	        } else {
	            $ul.siblings().remove();
	            $ul.removeClass('ui-tabs-scrollable');
	            return false;
	        }
    	},
    	
	    /**
	     * 一般滚动之后都需要执行回调_enableScroller设置滚动条的状态，现包装成方法。
	     */
    	_scrollCbFn : function() {
    		var that = this;
	        return function(){
	            that._enableScroller();
	        };
    	},
    	
	    /**
	     * 根据页签的位置，设置scroller的状态。
	     * 当最右边的页签顶住组件右边沿，则右边的scroller应该禁用，表示不能再往右滚动了。
	     * 当最左边的页签顶住组件左边沿，则左边的scroller应该禁用，表示不能再往左滚动了。
	     */
     	_enableScroller : function() {
	        var $self = this.element,
	        	$uitabs = $.data($self, 'uitabs').uitabs,
	       		$headers = $uitabs.find('>div.ui-tabs-headers'),
	        	$ul = $headers.children('ul'),
	        	$lScroller = $ul.prev(),
	        	$rScroller = $ul.next(),
	        	$li = $ul.children(':last'),
	        	lBorder = $headers.offset().left,
	            rBorder = $rScroller.offset().left,
	            ulLeft = $ul.offset().left,
	            ulRight = $li.offset().left + $li.outerWidth(true);
	        if (ulLeft < lBorder) {
	            $lScroller.removeClass('ui-tabs-scroll-disabled');
	        } else {
	            $lScroller.addClass('ui-tabs-scroll-disabled');
	            //_scroll(self, lBorder - ulLeft);
	        }
	        if (ulRight > rBorder) {
	            $rScroller.removeClass('ui-tabs-scroll-disabled');
	        } else {
	            $rScroller.addClass('ui-tabs-scroll-disabled');
	            //_scroll(self, rBorder - ulRight);
	        }
    	},
    	
	    /**
	     * 将页签头部往右边滑动distance的距离。当distance为负数时，表示往左边滑动；fn为回调函数
	     */
     	_scroll : function(distance, fn) {
	        var $self = this.element,
	        	$uitabs = $.data($self, 'uitabs').uitabs,
	        	$ul = $uitabs.find('>div.ui-tabs-headers ul'),
	        	$li = $ul.children(':last');
	        if (distance == 0) {
	            return;
	        }
	        var scrOffset = distance > 0 ? $ul.prev().offset() : $ul.next().offset();
	        var queuedFn = function(next) {
	            if (distance > 0 && $ul.prev().hasClass('.ui-tabs-scroll-disabled') ||
	                    distance < 0 && $ul.next().hasClass('.ui-tabs-scroll-disabled')){
	                $ul.stop(true, true);
	                $self.clearQueue();
	                return;
	            }
	            var flag = false;
	            //fix distance.
	            distance = (distance > 0) ? '+=' + Math.min(scrOffset.left - $ul.offset().left, distance) : 
	                '-=' + Math.min($li.offset().left + $li.outerWidth(true) - scrOffset.left, Math.abs(distance));
	            $.data($self, 'uitabs').isScrolling = true;
	            $ul.animate({
	                left : distance + 'px'
	            },'normal', 'swing', function() {
	                !!fn && fn();
	                $.data($self, 'uitabs').isScrolling = false;
	                next();
	            });
	        };
	        $self.queue(queuedFn);
	        if( $self.queue().length == 1 && 
	                !$.data($self, 'uitabs').isScrolling){
	            $self.dequeue(); //start queue
	        }
    	},
    	
	    /**
	     * 获得当前所有页签的数目
	     */
	    _getLength : function() {
	        return $.data(this.element, 'uitabs').items.length;
	    },
	    
	    /**
	     * 重新计算uitabs布局
	     */
	    _doLayout : function() {
	        this._checkScroller() && this._enableScroller();
	    },
	    
	    /**
	     * 设置第config.index个页签的数据源，如果设置了cofnig.url，则数据源为远程数据，如果设置了config.content数据源为普通文本。
	     */
	    _setDataSource : function(config /*content, url, index*/) {
	        var $self = this.element,
	        	items = $.data($self, 'uitabs').items,
	        	options = this.options,
	        	tabId = this._getAlter(config.index);
	        config.url = $.trim(config.url);
	        config.content = $.trim(config.content);
	        if(config.url){
	        	if(options.lazyLoad !== false){
	        		this._addLoadInfo(tabId , config.url);
	        		items[config.index].panel("option" , "url" , config.url);	       
	        	}else{
	        		this._removeLoadInfo(tabId);
					items[config.index].panel("reload" , config.url);					 		
	        	}
	        }else{
	        	items[config.index].html(config.content);
	        }
	    },
	    
	    /**
	     * 重新加载第n个页签的内容
	     */
	    _reload : function(index , url , content) {
	    	var $self = this.element,
	        	items = $.data($self, 'uitabs').items,
	        	tabId = this._getAlter(index);
	        if(url){
	        	this._removeLoadInfo(tabId);
	        	items[index].panel("reload" , url);	
	        }else if(content){
	        	items[index].html(content);
	        }else{//只传了索引
	        	//case1:如果一个页签还未加载过，则panel中并不会保存其url,所以这里必须再传一个url给panel。
	        	//case2:页签如果已经加载过了，那么传给panel的url将会是null,这将会正常重新加载。
	        	items[index].panel("reload" , this._getUnloadedUrl(tabId));
	        	this._removeLoadInfo(tabId);
	        }
	    }
    });
})(jQuery);


/***********************/
/** skyeagle.ui.datagrid.js **/
/***********************/
/**
 * @auth 	 	 jacksyen
 * @created 	 2012.07.16 
 * @description  基于jquery UI、easyUI扩展的datagrid组件
 */
(function($) {
	$.fn._outerWidth = function(width) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(width);
			} else {
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
    
    /**
     * 编辑列属性信息 
     */
    var _editors = {
		text : {
			init : function(container, options) {
				var input = $('<input type="text" class="datagrid-editable-input">').appendTo(container);
				return input;
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target , value) {
				$(target).val(value);
			},
			resize : function(target , width) {
				$(target)._outerWidth(width);
			}
		},
		textarea : {
			init : function(container, options) {
				var textarea = $('<textarea class="datagrid-editable-input"></textarea>').appendTo(container);
				return textarea;
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target , value) {
				$(target).val(value);
			},
			resize : function(target , width) {
				$(target)._outerWidth(width);
			}
		},
		checkbox : {
			init : function(container, options) {
				var input = $('<input type="checkbox">').appendTo(container);
				input.val(options.on);
				input.attr("offval", options.off);
				return input;
			},
			getValue : function(target) {
				if($(target).is(":checked")) {
					return $(target).val();
				} else {
					return $(target).attr("offval");
				}
			},
			setValue : function(target, value) {
				var result = false;
				if($(target).val() == value) {
					result = true;
				}
				$.fn.prop ? $(target).prop("checked", result) : $(target).attr("checked", result);
			}
		},
		numberbox : {
			init : function(container, options) {
				var input = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(container);
				input.numberbox(options);
				return input;
			},
			destroy : function(target) {
				$(target).numberbox("destroy");
			},
			getValue : function(target) {
				return $(target).numberbox("getValue");
			},
			setValue : function(target, value) {
				$(target).numberbox("setValue", value);
			},
			resize : function(target, width) {
				$(target)._outerWidth(width);
			}
		},
		validatebox : {
			init : function(target, options) {
				var input = $("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(target);
				input.validatebox(options);
				return input;
			},
			destroy : function(target) {
				$(target).validatebox("destroy");
			},
			getValue : function(target) {
				return $(target).val();
			},
			setValue : function(target, value) {
				$(target).val(value);
			},
			resize : function(target, width) {
				$(target)._outerWidth(width);
			}
		},
		datepicker : {
			init : function(target, options) {
				var input = $("<input type=\"text\">").appendTo(target);
				input.datepicker(options);
				return input;
			},
			destroy : function(target) {
				$(target).datepicker("destroy");
			},
			getValue : function(target) {
				return $(target).val();
				//return $(target).datepicker("getDate");
			},
			setValue : function(target, value) {
				$(target).datepicker("setDate", value);
			},
			resize : function(target, width) {
				// TODO datepicker resize
				//$(target).datepicker("resize", width);
			}
		},
		combo : {
			init : function(target, options) {
				var input = $("<input type=\"text\">").appendTo(target);
				input.combo(options || {});
				return input;
			},
			destroy : function(target) {
				$(target).combo("destroy");
			},
			getValue : function(target) {
				return $(target).combo("getValue");
			},
			setValue : function(target, value) {
				$(target).combo("setValue", value);
			},
			resize : function(target, width) {
				$(target).combo("resize", width);
			}
		},
		combotree : {
			init : function(target, options) {
				var input = $("<input type=\"text\">").appendTo(target);
				input.combotree(options);
				return input;
			},
			destroy : function(target) {
				$(target).combotree("destroy");
			},
			getValue : function(target) {
				return $(target).combotree("getValue");
			},
			setValue : function(target, value) {
				$(target).combotree("setValue", value);
			},
			resize : function(target, width) {
				$(target).combotree("resize", width);
			}
		}
	};
    
    $.widget("ui.datagrid" , {
		options : {
			// 固定列
		   	frozenColumns : undefined,
		   	// 数据表格列
			columns : undefined,
			// 设置为true将自动使列适应表格宽度以防止出现水平滚动
			fitColumns : false,
			// 自动填充行高度
			autoRowHeight : true,
			// 工具栏
			toolbar : null,
			// 设置为true将交替显示行背景 
			striped : false,
			// 请求远程数据的方法类型 
			method : "get",
			// 设置为true,当数据长度超出列宽度将会自动截取
			nowrap : true,
			// 表名改列是唯一列
			idField : null,
			// 一个用以从远程站点请求数据的超链接地址
			url : null,
			// 载入数据时，显示的加载信息
			loadMsg : "请稍候，正在加载中...",
			// 是否显示行数，默认为false 
			rownumbers : false,
			// 设置为true将只允许选择一行
			singleSelect : false,
			// 设置为true将在数据表格底部显示分页工具栏
			pagination : false,
			// 当设置分页属性时，初始化分页码
			pageNumber : 1,
			// 当设置分页属性时，初始化每页记录数
			pageSize : 10,
			// 当设置分页属性时，初始化每页记录数列表
			pageList : [10, 20, 30, 40, 50],
			// 请求远程数据参数
			queryParams : {},
			// 当数据表格初始化时以哪一列来排序
			sortName : null,
			// 定义排序顺序，可以是'asc'或者'desc'（正序或者倒序）
			sortOrder : "asc",
			// 定义是否通过远程服务器对数据排序
			remoteSort : true,
			// 定义是否显示行头（标题行）
			showHeader : true,
			// 定义是否显示行底（如果是做统计表格，这里可以显示总计等）
			showFooter : false,
			// 滚动条大小	
			scrollbarSize : 18,
			/**
			 * 返回样式
			 * @param index 行索引，从0开始.
			 * @param row   对应于该行记录的对象。
			 */
			rowStyler : function(index, row) {
			},
			/**
			 * 如何从远程服务器加载数据，返回false可以中止 
			 */
			loader : function(lData, method, callback) {
				var opts = $(this).datagrid("getOptions");
				if(!opts.url) {
					return false;
				}
				$.ajax({
					type : opts.method,
					url : opts.url,
					data : lData,
					dataType : "json",
					success : function(data) {
						method(data);
					},
					error : function() {
						callback.apply(this, arguments);
					}
				});
			},
			/**
			 * 载入过滤器 
			 */
			loadFilter : function(data) {
				if( typeof data.length == "number" && typeof data.splice == "function") {
					return {
						total : data.length,
						rows : data
					};
				} else {
					return data;
				}
			},
			/**
			 * 编辑视图 
			 */
			editors : _editors,
			/**
			 * 定义数据表格的视图 
			 */
			view : {
				render : function(target, view, field) {
					var opts = $.data(target, "datagrid").options;
					var rows = $.data(target, "datagrid").data.rows;
					var columnAttr = $(target).datagrid("getColumnFields", field);
					if(field) {
						if(!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))) {
							return;
						}
					}
					var table = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
					for(var i = 0; i < rows.length; i++) {
						var cls = (i % 2 && opts.striped) ? "class=\"datagrid-row datagrid-row-alt\"" : "class=\"datagrid-row\"";
						var rowStyler = opts.rowStyler ? opts.rowStyler.call(target, i, rows[i]) : "";
						var styler = rowStyler ? "style=\"" + rowStyler + "\"" : "";
						table.push("<tr datagrid-row-index=\"" + i + "\" " + cls + " " + styler + ">");
						table.push(this.renderRow.call(this, target, columnAttr, field, i, rows[i]));
						table.push("</tr>");
					}
					table.push("</tbody></table>");
					$(view).html(table.join(""));
				},
				renderFooter : function(target, view, field) {
					var opts = $.data(target, "datagrid").options;
					var rows = $.data(target, "datagrid").footer || [];
					var columnAttr = $(target).datagrid("getColumnFields", field);
					var table = ["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
					for(var i = 0; i < rows.length; i++) {
						table.push("<tr class=\"datagrid-row\" datagrid-row-index=\"" + i + "\">");
						table.push(this.renderRow.call(this, target, columnAttr, field, i, rows[i]));
						table.push("</tr>");
					}
					table.push("</tbody></table>");
					$(view).html(table.join(""));
				},
				renderRow : function(target, thead, columnAttr, field, row) {
					var opts = $.data(target, "datagrid").options;
					var cc = [];
					if(columnAttr && opts.rownumbers) {
						var number = field + 1;
						if(opts.pagination) {
							number += (opts.pageNumber - 1) * opts.pageSize;
						}
						cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">" + number + "</div></td>");
					}
					for(var i = 0; i < thead.length; i++) {
						var colOpts = thead[i];
						var col = $(target).datagrid("getColumnOption", colOpts);
						if(col) {
							var styler = col.styler ? (col.styler(row[colOpts], row, field) || "") : "";
							var display = col.hidden ? "style=\"display:none;" + styler + "\"" : ( styler ? "style=\"" + styler + "\"" : "");
							cc.push("<td field=\"" + colOpts + "\" " + display + ">");
							var display = "width:" + (col.boxWidth) + "px;";
							display += "text-align:" + (col.align || "left") + ";";
							if(!opts.nowrap) {
								display += "white-space:normal;height:auto;";
							} else {
								if(opts.autoRowHeight) {
									display += "height:auto;";
								}
							}
							cc.push("<div style=\"" + display + "\" ");
							if(col.checkbox) {
								cc.push("class=\"datagrid-cell-check ");
							} else {
								cc.push("class=\"datagrid-cell ");
							}
							cc.push("\">");
							if(col.checkbox) {
								cc.push("<input type=\"checkbox\"/>");
							} else {
								if(col.formatter) {
									cc.push(col.formatter(row[colOpts], row, field));
								} else {
									cc.push(row[colOpts]);
								}
							}
							cc.push("</div>");
							cc.push("</td>");
						}
					}
					return cc.join("");
				},
				refreshRow : function(target, field) {
					var row = {};
					var columnAttr = $(target).datagrid("getColumnFields", true).concat($(target).datagrid("getColumnFields", false));
					for(var i = 0; i < columnAttr.length; i++) {
						row[columnAttr[i]] = undefined;
					}
					var rows = $(target).datagrid("getRows");
					$.extend(row, rows[field]);
					this.updateRow.call(this, target, field, row);
				},
				updateRow : function(target, field, row) {
					var opts = $.data(target, "datagrid").options;
					var rows = $(target).datagrid("getRows");
					var tr = opts.finder.getTr(target, field);
					for(var i in row) {
						rows[field][i] = row[i];
						var td = tr.children("td[field=\"" + i + "\"]");
						var cell = td.find("div.datagrid-cell");
						var col = $(target).datagrid("getColumnOption", i);
						if(col) {
							var styler = col.styler ? col.styler(rows[field][i], rows[field], field) : "";
							td.attr("style", styler || "");
							if(col.hidden) {
								td.hide();
							}
							if(col.formatter) {
								cell.html(col.formatter(rows[field][i], rows[field], field));
							} else {
								cell.html(rows[field][i]);
							}
						}
					}
					var styler = opts.rowStyler ? opts.rowStyler.call(target, field, rows[field]) : "";
					tr.attr("style", styler || "");
					$(target).datagrid("fixRowHeight", field);
				},
				insertRow : function(target, length, row) {
					var opts = $.data(target, "datagrid").options;
					var dc = $.data(target, "datagrid").dc;
					var data = $.data(target, "datagrid").data;
					if(length == undefined || length == null) {
						length = data.rows.length;
					}
					if(length > data.rows.length) {
						length = data.rows.length;
					}
					for(var i = data.rows.length - 1; i >= length; i--) {
						opts.finder.getTr(target, i, "body", 2).attr("datagrid-row-index", i + 1);
						var tr = opts.finder.getTr(target, i, "body", 1).attr("datagrid-row-index", i + 1);
						if(opts.rownumbers) {
							tr.find("div.datagrid-cell-rownumber").html(i + 2);
						}
					}
					var columnAttr = $(target).datagrid("getColumnFields", true);
					var columnAttr2 = $(target).datagrid("getColumnFields", false);
					var tr1 = "<tr class=\"datagrid-row\" datagrid-row-index=\"" + length + "\">" + this.renderRow.call(this, target, columnAttr, true, length, row) + "</tr>";
					var tr2 = "<tr class=\"datagrid-row\" datagrid-row-index=\"" + length + "\">" + this.renderRow.call(this, target, columnAttr2, false, length, row) + "</tr>";
					if(length >= data.rows.length) {
						if(data.rows.length) {
							opts.finder.getTr(target, "", "last", 1).after(tr1);
							opts.finder.getTr(target, "", "last", 2).after(tr2);
						} else {
							dc.body1.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr1 + "</tbody></table>");
							dc.body2.html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>" + tr2 + "</tbody></table>");
						}
					} else {
						opts.finder.getTr(target, length + 1, "body", 1).before(tr1);
						opts.finder.getTr(target, length + 1, "body", 2).before(tr2);
					}
					data.total += 1;
					data.rows.splice(length, 0, row);
					this.refreshRow.call(this, target, length);
				},
				deleteRow : function(target, field) {
					var opts = $.data(target, "datagrid").options;
					var data = $.data(target, "datagrid").data;
					opts.finder.getTr(target, field).remove();
					for(var i = field + 1; i < data.rows.length; i++) {
						opts.finder.getTr(target, i, "body", 2).attr("datagrid-row-index", i - 1);
						var tr1 = opts.finder.getTr(target, i, "body", 1).attr("datagrid-row-index", i - 1);
						if(opts.rownumbers) {
							tr1.find("div.datagrid-cell-rownumber").html(i);
						}
					}
					data.total -= 1;
					data.rows.splice(field, 1);
				},
				onBeforeRender : function(target, rows) {
				},
				onAfterRender : function(target) {
					var opts = $.data(target, "datagrid").options;
					if(opts.showFooter) {
						var footer = $(target).datagrid("getPanel").find("div.datagrid-footer");
						footer.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
					}
				}
			},
			/**
			 * 当数据载入成功时触发 
			 */
			onLoadSuccess : function (event, data){},
			/**
			 * 数据加载错误事件 
			 */
			onLoadError : function (){},
			/**
			 * 加载数据之前调用 
			 */
			onBeforeLoad : function (event, param){},
			/**
			 * 单击行事件
			 * @param ui.rowIndex 行位置
			 * @param ui.rowData  行数据 
			 */
			onClickRow : function (event, ui){},
			/**
			 * 双击行事件
			 * @param ui.rowIndex 行位置
			 * @param ui.rowData  行数据 
			 */
			onDblClickRow : function (event, ui){},
			/**
			 *  单击单表格事件
			 *  ui.rowIndex 当前点击的行数
			 *  ui.field    当前点击的单元格field值
			 *  ui.value    当前点击的单元格值
			 */
			onClickCell : function (event, ui){},
			/**
			 *  双击单表格事件
			 *  ui.rowIndex 当前点击的行数
			 *  ui.field    当前点击的单元格field值
			 *  ui.value    当前点击的单元格值
			 */
			onDblClickCell : function (event, ui){},
			/**
			 * 排序列事件
			 * @param ui.sort  排序列名称
			 * @param ui.order 以哪种方式排序,desc/asc 
			 */
			onSortColumn : function (event, ui){},
			/**
			 * 当用户调整列宽时触发
			 * @param ui.field  列名称
			 * @param ui.width  列宽度
			 */
			onResizeColumn : function (event, ui){},
			/**
			 *  选择一行事件
			 * 	ui.rowIndex 当前点击的行数
			 *  ui.rowData  当前点击的行数据
			 */
			onSelect : function (event, ui){},
			/**
			 *  取消选择一行事件
			 * 	ui.rowIndex 当前点击的行数
			 *  ui.rowData  当前点击的行数据
			 */
			onUnselect : function (event, ui){},
			/**
			 * 当用户选择所有行时触发
			 * @param ui.rows  所有行内容
			 */
			onSelectAll : function (event, ui){},
			/**
			 * 当用户取消选择所有行时触发 
			 * @param ui.rows  所有行内容
			 */
			onUnselectAll : function (event, ui){},
			/**
			 * 当用户开始编辑一行时触发
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 */
			onBeforeEdit : function (event, ui){},
			/**
			 * 当用户编辑完成时触发，参数如下:
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 * @param ui.changes   被改变的字段内容，对应方式为字段：值。
			 */
			onAfterEdit : function (event, ui){},
			/**
			 * 当用户取消编辑行时触发
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 */
			onCancelEdit : function (event, ui){},
			/**
			 * 当数据表格的列标题被鼠标右键单击时触发
			 * @param field		列标题名称
			 */
			onHeaderContextMenu : function (event, field){},
			/**
			 * 当一行被鼠标右键单击时触发
			 * @param ui.rowIndex  正在编辑的行索引，从0开始
			 * @param ui.rowData   对应于正在编辑的行的记录
			 */
			onRowContextMenu : function (event, ui){},
			
			finder : {
				getTr : function(target, index, type, isBody) {
					type = type || "body";
					isBody = isBody || 0;
					var dc = $.data(target, "datagrid").dc;
					var opts = $.data(target, "datagrid").options;
					if(isBody == 0) {
						var tr1 = opts.finder.getTr(target, index, type, 1);
						var tr2 = opts.finder.getTr(target, index, type, 2);
						return tr1.add(tr2);
					} else {
						if(type == "body") {
							return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index=" + index + "]");
						} else {
							if(type == "footer") {
								return (isBody == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index=" + index + "]");
							} else {
								if(type == "selected") {
									return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr.datagrid-row-selected");
								} else {
									if(type == "last") {
										return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr:last[datagrid-row-index]");
									} else {
										if(type == "allbody") {
											return (isBody == 1 ? dc.body1 : dc.body2).find(">table>tbody>tr[datagrid-row-index]");
										} else {
											if(type == "allfooter") {
												return (isBody == 1 ? dc.footer1 : dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
											}
										}
									}
								}
							}
						}
					}
				},
				getRow : function(_1ca, _1cb) {
					return $.data(_1ca,"datagrid").data.rows[_1cb];
				}
			}
		},
		/**
		 * 返回属性对象 
		 */
		getOptions : function (){
			var self = this,
				ele  = self.element;
			
			var options = $.data(ele, "datagrid").options;
			var panelOpts = $.data(ele, "datagrid").panel.panel("getOptions");
			var opts = $.extend(options, {
				width : panelOpts.width,
				height : panelOpts.height,
				closed : panelOpts.closed,
				collapsed : panelOpts.collapsed,
				minimized : panelOpts.minimized,
				maximized : panelOpts.maximized
			});
			var pager = ele.datagrid("getPager");
			if(pager.length) {
				var pageOpts = pager.pagination("getOptions");
				$.extend(opts, {
					pageNumber : pageOpts.pageNumber,
					pageSize : pageOpts.pageSize
				});
			}
			return opts;
		},
		/**
		 * 返回控制面板对象
		 */
		getPanel : function() {
			return $.data(this.element, "datagrid").panel;
		},
		/**
		 * 返回页面对象 
		 */
		getPager : function() {
			return $.data(this.element, "datagrid").panel.find("div.datagrid-pager");
		},
		/**
		 * 返回列字段，如果设置了frozen属性为true，将返回固定列的字段名 
		 */
		getColumnFields : function (frozen){
			return this._getColumnAttr(this.element, frozen);
		},
		/**
		 * 返回特定的列属性 
		 */
		getColumnOption : function(field) {
			return this._getTdColspan(this.element, field);
		},
		/**
		 * 缩放和布局 
		 */
		resize : function (param){
			var self = this;
			return this.element.each(function() {
				self._resize(this.element, param);
			});
		},
		/**
		 * 载入并显示第一页的记录，如果传递了'param'参数，它将会覆盖查询参数属性的值 
		 */
		load : function (param) {
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				var opts = $(ele).datagrid("options");
				opts.pageNumber = 1;
				var pager = $(ele).datagrid("getPager");
				pager.pagination({
					pageNumber : 1
				});
				self._loadData(ele, param);
			});
		},
		/**
		 * 重载记录，跟'load'方法一样但是重载的是当前页的记录而非第一页 
		 */
		reload : function (param){
			var self = this;
			return this.element.each(function() {
				self._loadData(this.element, param);
			});
		},
		/**
		 * 重载行底记录 
		 */
		reloadFooter : function (footer){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				var view = $(ele).datagrid("getPanel").children("div.datagrid-view");
				var view1 = view.children("div.datagrid-view1");
				var view2 = view.children("div.datagrid-view2");
				if(footer) {
					$.data(ele, "datagrid").footer = footer;
				}
				if(opts.showFooter) {
					opts.view.renderFooter.call(opts.view, ele, view2.find("div.datagrid-footer-inner"), false);
					opts.view.renderFooter.call(opts.view, ele, view1.find("div.datagrid-footer-inner"), true);
					if(opts.view.onAfterRender) {
						opts.view.onAfterRender.call(opts.view, ele);
					}
					$(ele).datagrid("fixRowHeight");
				}
			});
		},
		/**
		 * 显示载入状态 
		 */
		loading : function() {
			var self = this,
				ele  = self.element;
			return self.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				$(this).datagrid("getPager").pagination("loading");
				if(opts.loadMsg) {
					var panel = $(ele).datagrid("getPanel");
					$('<div class="datagrid-mask" style="display:block"></div>').appendTo(panel);
					$('<div class="datagrid-mask-msg" style="display:block"></div>').html(opts.loadMsg).appendTo(panel);
					self._setMaskSize(self.element);
				}
			});
		},
		/**
		 * 隐藏载入状态 
		 */
		loaded : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				$(ele).datagrid("getPager").pagination("loaded");
				var panel = $(ele).datagrid("getPanel");
				panel.children("div.datagrid-mask-msg").remove();
				panel.children("div.datagrid-mask").remove();
			});
		},
		/**
		 * 让列宽自动适应数据表格的宽度 
		 */
		fitColumns : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._resizeTdCell(ele);
			});
		},
		/**
		 * 固定列尺寸 
		 */
		fixColumnSize : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._fix(ele);
			});
		},
		/**
		 * 固定特定列的高度 
		 */
		fixRowHeight : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._fitRowHeight(ele, index);
			});
		},
		/**
		 * 载入本地数据，旧记录将被移除
		 */
		loadData : function (data){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._setEvent(ele, data);
				self._initGridData(ele);
			});
		},
		/**
		 * 返回已载入数据
		 */
		getData : function (){
			return $.data(this.element, "datagrid").data;
		},
		/**
		 * 返回当前页的记录 
		 */
		getRows : function (){
			return $.data(this.element, "datagrid").data.rows;
		},
		/**
		 * 返回行底记录 
		 */
		getFooterRows : function (){
			return $.data(this.element, "datagrid").footer;
		},
		/**
		 * 返回指定行的索引
		 * @param row  可以是行记录或者是一个id字段的值 
		 */
		getRowIndex : function (row){
			return this._getRowIndex(this.element, row);
		},
		/**
		 * 返回第一个被选择的行记录或null 
		 */
		getSelected : function (){
			var rows = this._getSelectRows(this.element);
			return rows.length > 0 ? rows[0] : null;
		},
		/**
		 * 返回所有被选择的行，当没有记录被选择时，将返回一个空数组。 
		 */
		getSelections : function (){
			return this._getSelectRows(this.element);
		},
		/**
		 * 取消所有的已选择项 
		 */
		clearSelections : function () {
		  	var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._singeSelected(ele);
			});
		},
		/**
		 * 全选 
		 */
		selectAll : function (){
			var self = this;
				ele  = this.element;
			return this.element.each(function() {
				self._selectAll(ele);
			});
		},
		/**
		 * 取消全选 
		 */
		unselectAll : function (){
			var self = this;
				ele  = this.element;
			return this.element.each(function() {
				self._unSelectAll(ele);
			});
		},
		/**
		 * 选择一行，行索引从0开始 
		 */
		selectRow : function (index){
			var self = this;
				ele  = this.element;
			return this.element.each(function() {
				self._setCheck(ele, index);
			});
		},
		/**
		 * 通过传递id参数来选择一行 
		 */
		selectRecord : function (idValue){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._selectRow(ele, idValue);
			});
		},
		/**
		 * 取消选择一行 
		 */
		unselectRow : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._unSelected(ele, index);
			});
		},
		/**
		 * 开始编辑一行 
		 */
		beginEdit : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._setEditRow(ele, index);
			});
		},
		/**
		 * 结束编辑 
		 */
		endEdit : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._endEditorRow(ele, index, false);
			});
		},
		/**
		 * 取消编辑 
		 */
		cancelEdit : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._endEditorRow(ele, index, false);
			});
		},
		/**
		 * 获取指定行的编辑器，每个编辑器有如下属性：
		 * 	actions：编辑器可以做的行为。
		 *  target：目标编辑器jQuery对象
		 * 	field：字段名。
		 *  type：编辑器类型。 
		 */
		getEditors : function (index){
			return this._getEditors(this.element, index);
		},
		/**
		 * 获取特定的编辑器，options参数有2个属性：
		 * 	index：行索引。
		 * 	field:字段名。 
		 */
		getEditor : function (options){
			return this._getEditor(this.element, options);
		},
		/**
		 * 刷新一行 
		 */
		refreshRow : function (index) {
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				opts.view.refreshRow.call(opts.view, ele, index);
			});
		},
		/**
		 * 校验指定的行，如果有效返回true 
		 */
		validateRow : function (index) {
			return this._isEditorRow(this.element, index);
		},
		/**
		 * 更新指定的行，param参数包含如下属性：
		 * 	index：	 要更新的行索引
		 * 	row：	新的行数据 
		 */
		updateRow : function (param){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var opts = $.data(ele, "datagrid").options;
				opts.view.updateRow.call(opts.view, ele, param.index, param.row);
			});
		},
		/**
		 * 添加一行 
		 */
		appendRow : function (row){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._appendRow(ele, row);
			});
		},
		/**
		 * 插入一个新行，param参数包含如下属性
		 * 	index：要插入的行索引，如果没有定义则在最后面添加一个新行。
		 * 	row：行数据。 
		 */
		insertRow : function (param) {
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._insertRow(ele, param);
			});
		},
		/**
		 * 删除一行 
		 */
		deleteRow : function (index){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._deleteRow(ele, index);
			});
		},
		/**
		 * 获取从最后一次提交开始的被修改的所有行
		 * @param type 表明修改的类型,可选值：inserted，deleted，updated等
		 * 			      当没有传递 type参数时，返回所有被修改的行
		 */
		getChanges : function (type){
			return this._getChangeRows(this.element, type);
		},
		/**
		 * 提交所有修改的数据，提交后的数据将不能再修改或者回滚
		 */
		acceptChanges : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._acceptChanges(ele);
			});
		},
		/**
		 * 回滚所有被删除的行 
		 */
		rejectChanges : function (){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._rejectChanges(ele);
			});
		},
		/**
		 * 合并单元格，options参数包含如下属性：
		 * 	index：行索引。
		 * 	field：字段名。
		 * 	rowspan：整合单元格要跨的行数。
		 * 	colspan：整合单元格要跨的列数。 
		 */
		mergeCells : function (options){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				self._mergeCells(ele, options);
			});
		},
		/**
		 * 显示特定的列 
		 */
		showColumn : function (field){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var panel = $(ele).datagrid("getPanel");
				panel.find("td[field=\"" + field + "\"]").show();
				$(ele).datagrid("getColumnOption", field).hidden = false;
				$(ele).datagrid("fitColumns");
			});
		},
		/**
		 * 隐藏特定的列 
		 */
		hideColumn : function (field){
			var self = this,
				ele  = self.element;
			return this.element.each(function() {
				var panel = $(ele).datagrid("getPanel");
				panel.find("td[field=\"" + field + "\"]").hide();
				$(ele).datagrid("getColumnOption", field).hidden = true;
				$(ele).datagrid("fitColumns");
			});
		},
		/**
		 * 合并单元格 
		 */
		_mergeCells : function (target, options){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var rows = $.data(target, "datagrid").data.rows;
			options.rowspan = options.rowspan || 1;
			options.colspan = options.colspan || 1;
			if(options.index < 0 || options.index >= rows.length) {
				return;
			}
			if(options.rowspan == 1 && options.colspan == 1) {
				return;
			}
			var field = rows[options.index][options.field];
			var tr = opts.finder.getTr(target, options.index);
			var td = tr.find("td[field=\"" + options.field + "\"]");
			td.attr("rowspan", options.rowspan).attr("colspan", options.colspan);
			td.addClass("datagrid-td-merged");
			for(var i = 1; i < options.colspan; i++) {
				td = td.next();
				td.hide();
				rows[options.index][td.attr("field")] = field;
			}
			for(var i = 1; i < options.rowspan; i++) {
				tr = tr.next();
				var td = tr.find("td[field=\"" + options.field + "\"]").hide();
				rows[options.index+i][td.attr("field")] = field;
				for(var j = 1; j < options.colspan; j++) {
					td = td.next();
					td.hide();
					rows[options.index+i][td.attr("field")] = field;
				}
			}
			setTimeout(function() {
				self._merged(target);
			}, 0);
		},
		/**
		 * 回滚删除行数据 
		 */
		_rejectChanges : function (target){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var originalRows = $.data(target, "datagrid").originalRows;
			var insertRows = $.data(target, "datagrid").insertedRows;
			var deleteRows = $.data(target, "datagrid").deletedRows;
			var selectRows = $.data(target, "datagrid").selectedRows;
			var data = $.data(target, "datagrid").data;
			for(var i = 0; i < data.rows.length; i++) {
				self._endEditorRow(target, i, true);
			}
			var selectField = [];
			for(var i = 0; i < selectRows.length; i++) {
				selectField.push(selectRows[i][opts.idField]);
			}
			selectRows.splice(0, selectRows.length);
			data.total += deleteRows.length - insertRows.length;
			data.rows = originalRows;
			self._setEvent(target, data);
			for(var i = 0; i < selectField.length; i++) {
				self._selectRow(target, selectField[i]);
			}
			self._initGridData(target);
		},
		/**
		 * 提交修改数据 
		 */
		_acceptChanges : function (target){
			var self = this;
			var data = $.data(target, "datagrid").data;
			var ok = true;
			for(var i = 0, len = data.rows.length; i < len; i++) {
				if(self._isEditorRow(target, i)) {
					self._endEditorRow(target, i, false);
				} else {
					ok = false;
				}
			}
			if(ok) {
				self._initGridData(target);
			}
		},
		_getChangeRows : function (target, type){
			var insertRows = $.data(target, "datagrid").insertedRows;
			var deleteRows = $.data(target, "datagrid").deletedRows;
			var updateRows = $.data(target, "datagrid").updatedRows;
			if(!type) {
				var rows = [];
				rows = rows.concat(insertRows);
				rows = rows.concat(deleteRows);
				rows = rows.concat(updateRows);
				return rows;
			} else {
				if(type == "inserted") {
					return insertRows;
				} else {
					if(type == "deleted") {
						return deleteRows;
					} else {
						if(type == "updated") {
							return updateRows;
						}
					}
				}
			}
			return [];
		},
		/**
		 * 删除行操作 
		 */		
		_deleteRow : function (target, index){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var data = $.data(target, "datagrid").data;
			var insertRows = $.data(target, "datagrid").insertedRows;
			var deleteRows = $.data(target, "datagrid").deletedRows;
			var selectRows = $.data(target, "datagrid").selectedRows;
			$(target).datagrid("cancelEdit", index);
			var row = data.rows[index];
			if(self._getType(insertRows, row) >= 0) {
				self._parseType(insertRows, row);
			} else {
				deleteRows.push(row);
			}
			self._parseType(selectRows, opts.idField, data.rows[index][opts.idField]);
			opts.view.deleteRow.call(opts.view, target, index);
			if(opts.height == "auto") {
				self._fitRowHeight(target);
			}
		},
		_insertRow : function (target, row){
			var view = $.data(target, "datagrid").options.view;
			var insertRows = $.data(target, "datagrid").insertedRows;
			view.insertRow.call(view, target, row.index, row.row);
			this._setProperties(target);
			insertRows.push(row.row);
		},
		_appendRow : function (target, row){
			var view = $.data(target, "datagrid").options.view;
			var insertRows = $.data(target, "datagrid").insertedRows;
			view.insertRow.call(view, target, null, row);
			this._setProperties(target);
			insertRows.push(row);
		},
		
		_getEditor : function (target, options){
			var editors = this._getEditors(target, options.index);
			for(var i = 0; i < editors.length; i++) {
				if(editors[i].field == options.field) {
					return editors[i];
				}
			}
			return null;
		},
		_getEditors : function (target, index){
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			var editors = [];
			tr.children("td").each(function() {
				var editable = $(this).find("div.datagrid-editable");
				if(editable.length) {
					var ed = $.data(editable[0], "datagrid.editor");
					editors.push(ed);
				}
			});
			return editors;
		},
		/**
		 * 结束编辑行状态 
		 */
		_endEditorRow : function (target, index, isCancel){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var updateRows = $.data(target, "datagrid").updatedRows;
			var insertRows = $.data(target, "datagrid").insertedRows;
			var tr = opts.finder.getTr(target, index);
			var row = opts.finder.getRow(target, index);
			if(!tr.hasClass("datagrid-row-editing")) {
				return;
			}
			if(!isCancel) {
				if(!self._isEditorRow(target, index)) {
					return;
				}
				var update = false;
				var changes = {};
				tr.find("div.datagrid-editable").each(function() {
					var field = $(this).parent().attr("field");
					var ed = $.data(this, "datagrid.editor");
					var value = ed.actions.getValue(ed.target);
					if(row[field] != value) {
						row[field] = value;
						update = true;
						changes[field] = value;
					}
				});
				if(update) {
					if(self._getType(insertRows, row) == -1) {
						if(self._getType(updateRows, row) == -1) {
							updateRows.push(row);
						}
					}
				}
			}
			tr.removeClass("datagrid-row-editing");
			self._removeEditor(target, index);
			$(target).datagrid("refreshRow", index);
			if(!isCancel) {
				self._trigger('onAfterEdit', null, {
					rowIndex : index,
					rowData  : row,
					changes  : changes
				});
				//opts.onAfterEdit.call(target, index, row, changes);
			} else {
				self._trigger('onCancelEdit', null, {
					rowIndex : index,
					rowData  : row
				});
				//opts.onCancelEdit.call(target, index, row);
			}
		},
		/**
		 * 清楚编辑时的数据和样式信息 
		 */
		_removeEditor : function (target, index){
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			tr.children("td").each(function() {
				var cell = $(this).find("div.datagrid-editable");
				if(cell.length) {
					var ed = $.data(cell[0], "datagrid.editor");
					if(ed.actions.destroy) {
						ed.actions.destroy(ed.target);
					}
					cell.html(ed.oldHtml);
					$.removeData(cell[0], "datagrid.editor");
					var width = cell.outerWidth();
					cell.removeClass("datagrid-editable");
					cell._outerWidth(width);
				}
			});
		},
		
		/**
		 * 设置编辑行 
		 */
		_setEditRow : function (target, index){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			var row = opts.finder.getRow(target, index);
			if(tr.hasClass("datagrid-row-editing")) {
				return;
			}
			if(self._trigger('onBeforeEdit', null, {
				rowIndex : index,
				rowData  : row
			}) == false){
				return;
			}
			// if(opts.onBeforeEdit.call(target, index, row) == false) {
				// return;
			// }
			tr.addClass("datagrid-row-editing");
			// TODO editor
			self._wrapEditor(target, index);
			self._setEditor(target);
			tr.find("div.datagrid-editable").each(function() {
				var field = $(this).parent().attr("field");
				var ed = $.data(this, "datagrid.editor");
				ed.actions.setValue(ed.target, row[field]);
			});
			self._isEditorRow(target, index);
		},
		/**
		 * 是否处入编辑状态 
		 */
		_isEditorRow : function (target, index){
			var tr = $.data(target, "datagrid").options.finder.getTr(target, index);
			if(!tr.hasClass("datagrid-row-editing")) {
				return true;
			}
			var vbox = tr.find(".validatebox-text");
			vbox.validatebox("validate");
			vbox.trigger("mouseleave");
			var invalid = tr.find(".validatebox-invalid");
			return invalid.length == 0;
		},
		_wrapEditor : function (target, index){
			var self = this;
			var opts = $.data(target, "datagrid").options;
			var tr = opts.finder.getTr(target, index);
			tr.children("td").each(function() {
				var cell = $(this).find("div.datagrid-cell");
				var field = $(this).attr("field");
				var col = self._getTdColspan(target, field);
				if(col && col.editor) {
					var type, opt;
					if( typeof col.editor == "string") {
						type = col.editor;
					} else {
						type = col.editor.type;
						opt = col.editor.options;
					}
					var editor = opts.editors[type];
					
					if(editor) {
						var content = cell.html();
						var width = cell.outerWidth();
						cell.addClass("datagrid-editable");
						cell._outerWidth(width);
						cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
						cell.children("table").attr("align", col.align);
						cell.children("table").bind("click dblclick contextmenu", function(e) {
							e.stopPropagation();
						});
						$.data(cell[0], "datagrid.editor", {
							actions : editor,
							target : editor.init(cell.find("td"), opt),
							field : field,
							type : type,
							oldHtml : content
						});
					}
				}
			});
			self._fitRowHeight(target, index, true);
		},
		
		
		/**
		 * 获取所有选中行数据 
		 */
		_getSelectRows : function (target){
			var opts = $.data(target, "datagrid").options;
			var data = $.data(target, "datagrid").data;
			if(opts.idField) {
				return $.data(target, "datagrid").selectedRows;
			} else {
				var rows = [];
				opts.finder.getTr(target, "", "selected", 2).each(function() {
					var index = parseInt($(this).attr("datagrid-row-index"));
					rows.push(data.rows[index]);
				});
				return rows;
			}
		},
		
		_getRowIndex : function(target, row){
			var opts = $.data(target, "datagrid").options;
			var rows = $.data(target, "datagrid").data.rows;
			if( typeof row == "object") {
				return this._getType(rows, row);
			} else {
				for(var i = 0; i < rows.length; i++) {
					if(rows[i][opts.idField] == row) {
						return i;
					}
				}
				return -1;
			}
		},
		_create : function (){
			
			// TODO create
			var self = this,
				opts = self.options,
				ele  = self.element;
		    ele.css("width", "").css("height", "");
		    var wrapResult = self._wrapGrid(ele, opts.rownumbers);
		    
		    if(!opts.columns) {
				opts.columns = wrapResult.columns;
			}
			if(!opts.frozenColumns) {
				opts.frozenColumns = wrapResult.frozenColumns;
			}
			
			
			
			
			$.data(ele, "datagrid", {
				options : opts,
				panel : wrapResult.panel,
				dc : wrapResult.dc,
				selectedRows : [],
				data : {
					total : 0,
					rows : []
				},
				originalRows : [],
				updatedRows : [],
				insertedRows : [],
				deletedRows : []
			});
			self._initGrid(ele);
			var data = self._getRowsData(ele);
			if(data.total > 0) {
				self._setEvent(ele, data);
				self._initGridData(ele);
			}
			self._resize(ele);
			
			self._loadData(ele);
			
			self._setGridEvent(ele);
		},
		_selectAll : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel,
				selectedRows = $.data(target, "datagrid").selectedRows;
			
			//var opts = $.data(target, "datagrid").options;
			var rows = $.data(target, "datagrid").data.rows;
			var selected = $.data(target, "datagrid").selectedRows;
			var tr = opts.finder.getTr(target, "", "allbody").addClass("datagrid-row-selected");
			var cellCheck = tr.find("div.datagrid-cell-check input[type=checkbox]");
			$.fn.prop ? cellCheck.prop("checked", true) : cellCheck.attr("checked", true);
			for(var i = 0; i < rows.length; i++) {
				if(opts.idField) {
					(function() {
						var row = rows[i];
						for(var i = 0; i < selected.length; i++) {
							if(selected[i][opts.idField] == row[opts.idField]) {
								return;
							}
						}
						selected.push(row);
					})();
				}
			}
			self._trigger('onSelectAll', null, {rows : rows});
			// opts.onSelectAll.call(target, rows);
		},
		_setGridEvent : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel,
				selectedRows = $.data(target, "datagrid").selectedRows;
				
			// var datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(target, "datagrid").options;
			// var dc = $.data(target, "datagrid").dc;
			var viewHeader = dc.view.find("div.datagrid-header");
			viewHeader.find("td:has(div.datagrid-cell)").unbind(".datagrid").bind("mouseenter.datagrid", function() {
				$(this).addClass("datagrid-header-over");
				$(this).children(".datagrid-cell").css({
					position : 'relative'
				});
			}).bind("mouseleave.datagrid", function() {
				$(this).removeClass("datagrid-header-over");
			}).bind("contextmenu.datagrid", function(e) {
				var field = $(this).attr("field");
				self._trigger('onHeaderContextMenu', e, field);
				// opts.onHeaderContextMenu.call(target, e, field);
			});
			viewHeader.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function() {
				if(opts.singleSelect) {
					return false;
				}
				if($(this).is(":checked")) {
					self._selectAll(target);
				} else {
					self._unSelectAll(target);
				}
			});
			dc.body2.unbind(".datagrid").bind("scroll.datagrid", function() {
				dc.view2.find("div.datagrid-header-inner td .datagrid-cell").each(function(index) {
				   	$(this).css('position','static');
				});
				
				dc.view1.children("div.datagrid-body").scrollTop($(this).scrollTop());
				dc.view2.children("div.datagrid-header").scrollLeft($(this).scrollLeft());
				dc.view2.children("div.datagrid-footer").scrollLeft($(this).scrollLeft());
			});
			function sortColumn(thread, isSort) {
				thread.unbind(".datagrid");
				if(!isSort) {
					return;
				}
				thread.bind("click.datagrid", function(e) {
					var field = $(this).parent().attr("field");
					var opt = self._getTdColspan(target, field);
					if(!opt.sortable) {
						return;
					}
					opts.sortName = field;
					opts.sortOrder = "asc";
					var c = "datagrid-sort-asc";
					if($(this).hasClass("datagrid-sort-asc")) {
						c = "datagrid-sort-desc";
						opts.sortOrder = "desc";
					}
					viewHeader.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
					$(this).addClass(c);
					if(opts.remoteSort) {
						self._loadData(target);
					} else {
						var gridData = $.data(target, "datagrid").data;
						self._setEvent(target, gridData);
					}
					if(opts.onSortColumn) {
						self._trigger('onSortColumn', e, {
							sort : opts.sortName,
							order: opts.sortOrder
						});
						//opts.onSortColumn.call(target, opts.sortName, opts.sortOrder);
					}
				});
			};
			
			sortColumn(viewHeader.find("div.datagrid-cell"), true);
			viewHeader.find("div.datagrid-cell").each(function() {
				$(this).resizable({
					handles : "e",
					disabled : ($(this).attr("resizable") ? $(this).attr("resizable") == "false" : false),
					minWidth : 25,
					//animate  : true,
					start : function(e) {
						viewHeader.css("cursor", "e-resize");
						dc.view.children("div.datagrid-resize-proxy").css({
							left : e.pageX - $(datagrid).offset().left - 1,
							display : "block"
						});
						sortColumn($(this), false);
					},
					resize : function(e) {
						dc.view.children("div.datagrid-resize-proxy").css({
							display : "block",
							left : e.pageX - $(datagrid).offset().left - 1
						});
						return false;
					},
					stop : function(e) {
						viewHeader.css("cursor", "");
						var field = $(this).parent().attr("field");
						var col = self._getTdColspan(target, field);
						var width = col.width - col.boxWidth;
						col.width = $(this).outerWidth();
						col.boxWidth = col.width - width;
						self._fix(target, field);
						
						self._resizeTdCell(target);
						setTimeout(function() {
							sortColumn($(e.target), true);
						}, 0);
						dc.view2.children("div.datagrid-header").scrollLeft(dc.body2.scrollLeft());
						dc.view.children("div.datagrid-resize-proxy").css("display", "none");
						self._trigger('onResizeColumn', e, {
							field : field,
							width : col.width
						});
						//opts.onResizeColumn.call(target, field, col.width);
					}
				});
			});
			dc.view1.children("div.datagrid-header").find("div.datagrid-cell").resizable({
				onStopResize : function(e) {
					viewHeader.css("cursor", "");
					var field = $(this).parent().attr("field");
					var col = self._getTdColspan(target, field);
					var width = col.width - col.boxWidth;
					col.width = $(this).outerWidth();
					col.boxWidth = col.width - width;
					self._fix(target, field);
					dc.view2.children("div.datagrid-header").scrollLeft(dc.body2.scrollLeft());
					dc.view.children("div.datagrid-resize-proxy").css("display", "none");
					self._setSize(target);
					
					self._resizeTdCell(target);
					setTimeout(function() {
						sortColumn($(e.data.target), true);
					}, 0);
					self._trigger('onResizeColumn', e, {
						field : field,
						width : col.width
					});
					//opts.onResizeColumn.call(target, field, col.width);
				}
			});
		
		},
		_resizeTdCell : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc = $.data(target, "datagrid").dc;
			//var opts = $.data(target, "datagrid").options;
			if(!opts.fitColumns) {
				return;
			}
			var v2Header = dc.view2.children("div.datagrid-header");
			var width = 0;
			var clospan;
			var columnAttr = self._getColumnAttr(target, false);
			for(var i = 0; i < columnAttr.length; i++) {
				var col = self._getTdColspan(target, columnAttr[i]);
				if(!col.hidden && !col.checkbox) {
					width += col.width;
					clospan = col;
				}
			}
			var inner = v2Header.children("div.datagrid-header-inner").show();
			var otherWidth = v2Header.width() - v2Header.find("table").width() - opts.scrollbarSize;
			var diff = otherWidth / width;
			if(!opts.showHeader) {
				inner.hide();
			}
			for(var i = 0; i < columnAttr.length; i++) {
				var col = _7f(target, columnAttr[i]);
				if(!col.hidden && !col.checkbox) {
					var temp = Math.floor(col.width * diff);
					setCellWidth(col, temp);
					otherWidth -= temp;
				}
			}
			self._fix(target);
			if(otherWidth) {
				setCellWidth(clospan, otherWidth);
				self._fix(target, clospan.field);
			}
			function setCellWidth(col, width) {
				col.width += width;
				col.boxWidth += width;
				v2Header.find("td[field=\"" + col.field + "\"] div.datagrid-cell").width(col.boxWidth);
			};
		},
		/**
		 * 加载数据 
		 */
		_loadData : function (target, param){
			var self = this,
				opts = $.data(target, "datagrid").options;
			//var opts = $.data(target, "datagrid").options;
			if(param) {
				opts.queryParams = param;
			}
			var queryParams = $.extend({}, opts.queryParams);
			if(opts.pagination) {
				$.extend(queryParams, {
					page : opts.pageNumber,
					rows : opts.pageSize
				});
			}
			if(opts.sortName) {
				$.extend(queryParams, {
					sort : opts.sortName,
					order : opts.sortOrder
				});
			}
			// TODO onBeforeLoad
			if(self._trigger( "onBeforeLoad", null, queryParams) == false) {
				return;
			}
			// if(opts.onBeforeLoad.call(target, queryParams) == false) {
				// return;
			// }
			$(target).datagrid("loading");
			setTimeout(function() {
				loadColumnData();
			}, 0);
			function loadColumnData() {
				var loader = opts.loader.call(target, queryParams, function(data) {
					setTimeout(function() {
						$(target).datagrid("loaded");
					}, 0);
					self._setEvent(target, data);
					setTimeout(function() {
						self._initGridData(target);
					}, 0);
				}, function() {
					setTimeout(function() {
						$(target).datagrid("loaded");
					}, 0);
					self._trigger( "onLoadError", null);
					//opts.onLoadError.apply(target, arguments);
				});
				if(loader == false) {
					$(target).datagrid("loaded");
				}
			};
			
		},
		_initGridData : function (target){
			var data = $.data(target, "datagrid").data;
			var rows = data.rows;
			var result = [];
			for(var i = 0; i < rows.length; i++) {
				result.push($.extend({}, rows[i]));
			}
			$.data(target, "datagrid").originalRows = result;
			$.data(target, "datagrid").updatedRows = [];
			$.data(target, "datagrid").insertedRows = [];
			$.data(target, "datagrid").deletedRows = [];
		},
		_setEvent : function (target, jsonData) {
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel,
				selectedRows = $.data(target, "datagrid").selectedRows;
			
			//var opts = $.data(target, "datagrid").options;
			
			jsonData = opts.loadFilter.call(target, jsonData);
			var rows = jsonData.rows;
			$.data(target, "datagrid").data = jsonData;
			if(jsonData.footer) {
				$.data(target, "datagrid").footer = jsonData.footer;
			}
			if(!opts.remoteSort) {
				var opt = self._getTdColspan(target, opts.sortName);
				if(opt) {
					var sorter = opt.sorter ||
					function(a, b) {
						return (a > b ? 1 : -1);
					};
					jsonData.rows.sort(function(r1, r2) {
						return sorter(r1[opts.sortName], r2[opts.sortName]) * (opts.sortOrder == "asc" ? 1 : -1);
					});
				}
			}
			if(opts.view.onBeforeRender) {
				opts.view.onBeforeRender.call(opts.view, target, rows);
			}
			opts.view.render.call(opts.view, target, dc.body2, false);
			opts.view.render.call(opts.view, target, dc.body1, true);
			if(opts.showFooter) {
				opts.view.renderFooter.call(opts.view, target, dc.footer2, false);
				opts.view.renderFooter.call(opts.view, target, dc.footer1, true);
			}
			if(opts.view.onAfterRender) {
				opts.view.onAfterRender.call(opts.view, target);
			}
			// TODO onLoadSuccess
			//opts.onLoadSuccess.call(target, jsonData);
			self._trigger( "onLoadSuccess", null, jsonData);
			
			var pager = datagrid.children("div.datagrid-pager");
			if(pager.length) {
				if(pager.pagination("getOptions").total != jsonData.total) {
					pager.pagination({
						total : jsonData.total
					});
				}
			}
			self._fitRowHeight(target);
			self._setProperties(target);
			
			
			dc.body2.triggerHandler("scroll");
			if(opts.idField) {
				for(var i = 0; i < rows.length; i++) {
					if(isSelected(rows[i])) {
						self._selectRow(target, rows[i][opts.idField]);
					}
				}
			}
			function isSelected(row) {
				for(var i = 0; i < selectedRows.length; i++) {
					if(selectedRows[i][opts.idField] == row[opts.idField]) {
						selectedRows[i] = row;
						return true;
					}
				}
				return false;
			};
		},
		_selectRow : function (target, row){
			var self = this,
				opts = $.data(target, "datagrid").options;
			//var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			if(opts.idField) {
				var index = -1;
				for(var i = 0; i < gridData.rows.length; i++) {
					if(gridData.rows[i][opts.idField] == row) {
						index = i;
						break;
					}
				}
				if(index >= 0) {
					self._setCheck(target, index);
				}
			}
		},
		_setCheck : function (target, index){
			var dc = $.data(target, "datagrid").dc;
			var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			var selected = $.data(target, "datagrid").selectedRows;
			if(index < 0 || index >= gridData.rows.length) {
				return;
			}
			if(opts.singleSelect == true) {
				this._singeSelected(target);
			}
			var tr = opts.finder.getTr(target, index);
			if(!tr.hasClass("datagrid-row-selected")) {
				tr.addClass("datagrid-row-selected");
				var ck = $("div.datagrid-cell-check input[type=checkbox]", tr);
				$.fn.prop ? ck.prop("checked", true) : ck.attr("checked", true);
				if(opts.idField) {
					var row = gridData.rows[index];
					(function() {
						for(var i = 0; i < selected.length; i++) {
							if(selected[i][opts.idField] == row[opts.idField]) {
								return;
							}
						}
						selected.push(row);
					})();
				}
			}
			this._trigger('onSelect', null, {
				rowIndex : index,
				rowData  : gridData.rows[index]
			});
			//opts.onSelect.call(target, index, gridData.rows[index]);
			var height = dc.view2.children("div.datagrid-header").outerHeight();
			var body2 = dc.body2;
			var top = tr.position().top - height;
			if(top <= 0) {
				body2.scrollTop(body2.scrollTop() + top);
			} else {
				if(top + tr.outerHeight() > body2.height() - 18) {
					body2.scrollTop(body2.scrollTop() + top + tr.outerHeight() - body2.height() + 18);
				}
			}
		},
		/**
		 * 绑定事件 
		 */
		_setProperties : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			// var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			var tr = opts.finder.getTr(target, "", "allbody");
			tr.unbind(".datagrid").bind("mouseenter.datagrid", function() {
				var index = $(this).attr("datagrid-row-index");
				opts.finder.getTr(target, index).addClass("datagrid-row-over");
			}).bind("mouseleave.datagrid", function() {
				var index = $(this).attr("datagrid-row-index");
				opts.finder.getTr(target, index).removeClass("datagrid-row-over");
			}).bind("click.datagrid", function(event) {
				var index = $(this).attr("datagrid-row-index");
				if(opts.singleSelect == true) {
					self._singeSelected(target);
					self._setCheck(target, index);
				} else {
					if($(this).hasClass("datagrid-row-selected")) {
						self._unSelected(target, index);
					} else {
						self._setCheck(target, index);
					}
				}
				if(opts.onClickRow) {
					self._trigger('onClickRow', event, {
						rowIndex : index,
						rowData  : gridData.rows[index]
					});
					//opts.onClickRow.call(target, index, gridData.rows[index]);
				}
			}).bind("dblclick.datagrid", function(event) {
				var index = $(this).attr("datagrid-row-index");
				if(opts.onDblClickRow) {
					self._trigger('onDblClickRow', event, {
						rowIndex : index,
						rowData  : gridData.rows[index]
					});
					//opts.onDblClickRow.call(target, index, gridData.rows[index]);
				}
			}).bind("contextmenu.datagrid", function(e) {
				var index = $(this).attr("datagrid-row-index");
				if(opts.onRowContextMenu) {
					self._trigger('onRowContextMenu', e, {
						rowIndex : index,
						rowData  : gridData.rows[index]
					});
					//opts.onRowContextMenu.call(target, e, index, gridData.rows[index]);
				}
			});
			tr.find("td[field]").unbind(".datagrid").bind("click.datagrid", function(event) {
				var index = $(this).parent().attr("datagrid-row-index");
				var field = $(this).attr("field");
				var row = gridData.rows[index][field];
				
				self._trigger("onClickCell", event, {
					rowIndex : index, 
					field    : field, 
					value    : row
				});
				
				//opts.onClickCell.call(target, index, field, row);
			}).bind("dblclick.datagrid", function(event) {
				var index = $(this).parent().attr("datagrid-row-index");
				var field = $(this).attr("field");
				var row = gridData.rows[index][field];
				self._trigger("onDblClickCell", event, {
					rowIndex : index, 
					field    : field, 
					value    : row
				});
				//opts.onDblClickCell.call(target, index, field, row);
			});
			tr.find("div.datagrid-cell-check input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function(e) {
				var parent = $(this).parent().parent().parent().attr("datagrid-row-index");
				if(opts.singleSelect) {
					self._singeSelected(target);
					self._setCheck(target, parent);
				} else {
					if($(this).is(":checked")) {
						self._setCheck(target, parent);
					} else {
						self._unSelected(target, parent);
					}
				}
				e.stopPropagation();
			});
		},
		_getType : function (selected, idField){
			for(var i = 0, len = selected.length; i < len; i++) {
				if(selected[i] == idField) {
					return i;
				}
			}
			return -1;
		},
		_parseType : function (selected, idField, id){
			if( typeof idField == "string") {
				for(var i = 0, len = selected.length; i < len; i++) {
					if(selected[i][idField] == id) {
						selected.splice(i, 1);
						return;
					}
				}
			} else {
				var index = this._getType(selected, idField);
				if(index != -1) {
					selected.splice(index, 1);
				}
			}
		},
		_unSelectAll : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(target, "datagrid").options;
			var gridData = $.data(target, "datagrid").data;
			var selected = $.data(target, "datagrid").selectedRows;
			var tr = opts.finder.getTr(target, "", "selected").removeClass("datagrid-row-selected");
			var cellCheck = tr.find("div.datagrid-cell-check input[type=checkbox]");
			$.fn.prop ? cellCheck.prop("checked", false) : cellCheck.attr("checked", false);
			if(opts.idField) {
				for(var i = 0; i < gridData.rows.length; i++) {
					self._parseType(selected, opts.idField, gridData.rows[i][opts.idField]);
				}
			}
			self._trigger('onUnselectAll', null, {rows : gridData.rows});
			// opts.onUnselectAll.call(target, gridData.rows);
		},
		_unSelected : function (target, index){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc;
			// var opts = $.data(target, "datagrid").options;
			// var dc = $.data(target, "datagrid").dc;
			var gridData = $.data(target, "datagrid").data;
			var selected = $.data(target, "datagrid").selectedRows;
			if(index < 0 || index >= gridData.rows.length) {
				return;
			}
			var tr = opts.finder.getTr(target, index);
			var ck = tr.find("div.datagrid-cell-check input[type=checkbox]");
			tr.removeClass("datagrid-row-selected");
			$.fn.prop ? ck.prop("checked", false) : ck.attr("checked", false);
			var row = gridData.rows[index];
			if(opts.idField) {
				self._parseType(selected, opts.idField, row[opts.idField]);
			}
			self._trigger('onUnselect', null, {
				rowIndex : index,
				rowData  : row
			});
			//opts.onUnselect.call(target, index, row);
		},
		_singeSelected : function (target){
			this._unSelectAll(target);
			var selected = $.data(target, "datagrid").selectedRows;
			selected.splice(0, selected.length);
		},
		/**
		 * 获取行数据 
		 */
		_getRowsData : function (target){
			var self = this;
			var jsonData = {
				total : 0,
				rows : []
			};
			var columnData = self._getColumnAttr(target, true).concat(self._getColumnAttr(target, false));
			$(target).find("tbody tr").each(function() {
				jsonData.total++;
				var col = {};
				for(var i = 0; i < columnData.length; i++) {
					col[columnData[i]] = $("td:eq(" + i + ")", this).html();
				}
				jsonData.rows.push(col);
			});
			return jsonData;
		},
		
		/**
		 * 设置mask样式信息 
		 */
		_setMaskSize : function (target){
			var panel = target.datagrid("getPanel");
			var mask = panel.children("div.datagrid-mask");
			if(mask.length) {
				mask.css({
					width : panel.width(),
					height : panel.height()
				});
				var msg = panel.children("div.datagrid-mask-msg");
				msg.css({
					left : (panel.width() - msg.outerWidth()) / 2,
					top : (panel.height() - msg.outerHeight()) / 2
				});
			}
		},
		_getColumnAttr : function (target, isFrozenCol){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(target, "datagrid").options;
			var columns = (isFrozenCol == true) ? (opts.frozenColumns || [[]]) : opts.columns;
			if(columns.length == 0) {
				return [];
			}
			var result = [];
			function getIndex(index) {
				var c = 0;
				var i = 0;
				while(true) {
					if(result[i] == undefined) {
						if(c == index) {
							return i;
						}
						c++;
					}
					i++;
				}
			};
			function getColumn(r) {
				var ff = [];
				var c = 0;
				for(var i = 0; i < columns[r].length; i++) {
					var col = columns[r][i];
					if(col.field) {
						ff.push([c, col.field]);
					}
					c += parseInt(col.colspan || "1");
				}
				for(var i = 0; i < ff.length; i++) {
					ff[i][0] = getIndex(ff[i][0]);
				}
				for(var i = 0; i < ff.length; i++) {
					var f = ff[i];
					result[f[0]] = f[1];
				}
			};
			for(var i = 0; i < columns.length; i++) {
				getColumn(i);
			}
			return result;
		},
		_setHeaderWidth : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
				
				
			// var opts = $.data(target, "datagrid").options;
			// var dc = $.data(target, "datagrid").dc;
			if(!opts.fitColumns) {
				return;
			}
			var v2Header = dc.view2.children("div.datagrid-header");
			var width = 0;
			var colspan;
			var columns = self._getColumnAttr(target, false);
			for(var i = 0; i < columns.length; i++) {
				var col = self._getTdColspan(target, columns[i]);
				if(!col.hidden && !col.checkbox) {
					width += col.width;
					colspan = col;
				}
			}
			var v2HeaderInner = v2Header.children("div.datagrid-header-inner").show();
			var otherWidth = v2Header.width() - v2Header.find("table").width() - opts.scrollbarSize;
			var tempWidth = otherWidth / width;
			if(!opts.showHeader) {
				v2HeaderInner.hide();
			}
			for(var i = 0; i < columns.length; i++) {
				var col = self._getTdColspan(target, columns[i]);
				if(!col.hidden && !col.checkbox) {
					var wi = Math.floor(col.width * tempWidth);
					setCellWidth(col, wi);
					otherWidth -= wi;
				}
			}
			self._fix(target);
			if(otherWidth) {
				setCellWidth(colspan, otherWidth);
				self._fix(target, colspan.field);
			}
			function setCellWidth(col, tWidth) {
				col.width += tWidth;
				col.boxWidth += tWidth;
				v2Header.find('td[field="' + col.field + '"] div.datagrid-cell').width(col.boxWidth);
			};
		},
		/**
		 * 初始化表格 
		 */
		_initGrid : function (target){
			
			//TODO
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			
			datagrid.panel($.extend({}, opts, {
				id : null,
				doSize : false,
				onResize : function(width, height) {
					self._setMaskSize(target);
					setTimeout(function() {
						if($.data(target, "datagrid")) {
							self._setSize(target);
							self._setHeaderWidth(target);
							// TODO onResize
							//opts.onResize.call(datagrid, width, height);
						}
					}, 0);
				},
				onExpand : function() {
					self._fitRowHeight(target);
					//opts.onExpand.call(datagrid);
				}
			}));
			var view1 = dc.view1;
			var view2 = dc.view2;
			var v1HeaderInner = view1.children("div.datagrid-header").children("div.datagrid-header-inner");
			var v2HeaderInner = view2.children("div.datagrid-header").children("div.datagrid-header-inner");
			showViewHeader(v1HeaderInner, opts.frozenColumns, true);
			showViewHeader(v2HeaderInner, opts.columns, false);
			v1HeaderInner.css("display", opts.showHeader ? "block" : "none");
			v2HeaderInner.css("display", opts.showHeader ? "block" : "none");
			view1.find("div.datagrid-footer-inner").css("display", opts.showFooter ? "block" : "none");
			view2.find("div.datagrid-footer-inner").css("display", opts.showFooter ? "block" : "none");
			if(opts.toolbar) {
				if( typeof opts.toolbar == "string") {
					$(opts.toolbar).addClass("datagrid-toolbar").prependTo(datagrid);
					$(opts.toolbar).show();
				} else {
					var tb = $('<div class="datagrid-toolbarss"></div>').prependTo(datagrid);
					tb.toolbar({
						item : opts.toolbar
					});
					// $("div.datagrid-toolbar", datagrid).remove();
					// var tb = $('<div class="datagrid-toolbar"></div>').prependTo(datagrid);
					// for(var i = 0; i < opts.toolbar.length; i++) {
						// var btn = opts.toolbar[i];
						// if(btn == "-") {
							// $('<div class="datagrid-btn-separator"></div>').appendTo(tb);
						// } else {
							// var ahtml = $('<a href="javascript:void(0)"></a>');
							// ahtml[0].onclick = eval(btn.handler ||
							// function() {
							// });
							// ahtml.css("float", "left").appendTo(tb).linkbutton($.extend({}, btn, {
								// plain : true
							// }));
						// }
					// }
				}
			} else {
				$("div.datagrid-toolbar", datagrid).remove();
			}
			$("div.datagrid-pager", datagrid).remove();
			if(opts.pagination) {
				var pager = $('<div class="datagrid-pager"></div>').appendTo(datagrid);
				pager.pagination({
					pageNumber : opts.pageNumber,
					pageSize : opts.pageSize,
					pageList : opts.pageList,
					onSelectPage : function(event, ui) {
						opts.pageNumber = ui.pageNumber;
						opts.pageSize = ui.pageSize;
						self._loadData(target);
					}
				});
				opts.pageSize = pager.pagination("getOptions").pageSize;
			}
			function showViewHeader(thread, columns, isFrozen) {
				if(!columns) {
					return;
				}
				$(thread).show();
				$(thread).empty();
				var t = $('<table border="0" cellspacing="0" cellpadding="0"><tbody></tbody></table>').appendTo(thread);
				for(var i = 0; i < columns.length; i++) {
					var tr = $("<tr></tr>").appendTo($("tbody", t));
					var column = columns[i];
					for(var j = 0; j < column.length; j++) {
						var col = column[j];
						var str = "";
						if(col.rowspan) {
							str += "rowspan=\"" + col.rowspan + "\" ";
						}
						if(col.colspan) {
							str += "colspan=\"" + col.colspan + "\" ";
						}
						var td = $("<td " + str + "></td>").appendTo(tr);
						if(col.checkbox) {
							td.attr("field", col.field);
							$('<div class="datagrid-header-check"></div>').html('<input type="checkbox"/>').appendTo(td);
						} else {
							if(col.field) {
								td.attr('field', col.field);
								td.append('<div class="datagrid-cell"><span></span><span class="datagrid-sort-icon"></span></div>');
								$("span", td).html(col.title);
								$("span.datagrid-sort-icon", td).html("&nbsp;");
								var cell = td.find("div.datagrid-cell");
								if(col.resizable == false) {
									cell.attr("resizable", "false");
								}
								// TODO _outerWidth
								cell._outerWidth(col.width);
								if(parseInt(cell[0].style.width) == col.width) {
									col.boxWidth = col.width;
								} else {
									col.boxWidth = col.width - (cell.outerWidth() - cell.width());
								}
								cell.css("text-align", (col.align || "left"));
							} else {
								$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
							}
						}
						if(col.hidden) {
							td.hide();
						}
					}
				}
				if(isFrozen && opts.rownumbers) {
					var td = $('<td rowspan="' + opts.frozenColumns.length + '"><div class="datagrid-header-rownumber"></div></td>');
					if($("tr", t).length == 0) {
						td.wrap("<tr></tr>").parent().appendTo($("tbody", t));
					} else {
						td.prependTo($("tr:first", t));
					}
				}
			};
		},
		_wrapGrid : function (target, rownumbers){
			var self = this;
			function getColumns(thead) {
				var trColAttr = [];
				$("tr", thead).each(function() {
					var colAttr = [];
					$("th", this).each(function() {
						var th = $(this);
						var col = {
							title : th.html(),
							align : th.attr("align") || "left",
							sortable : th.attr("sortable") == "true" || false,
							checkbox : th.attr("checkbox") == "true" || false
						};
						if(th.attr("field")) {
							col.field = th.attr("field");
						}
						if(th.attr("formatter")) {
							col.formatter = eval(th.attr("formatter"));
						}
						if(th.attr("styler")) {
							col.styler = eval(th.attr("styler"));
						}
						if(th.attr("editor")) {
							var s = $.trim(th.attr("editor"));
							if(s.substr(0, 1) == "{") {
								col.editor = eval("(" + s + ")");
							} else {
								col.editor = s;
							}
						}
						if(th.attr("rowspan")) {
							col.rowspan = parseInt(th.attr("rowspan"));
						}
						if(th.attr("colspan")) {
							col.colspan = parseInt(th.attr("colspan"));
						}
						if(th.attr("width")) {
							col.width = parseInt(th.attr("width")) || 100;
						}
						if(th.attr("hidden")) {
							col.hidden = true;
						}
						if(th.attr("resizable")) {
							col.resizable = th.attr("resizable") == "true";
						}
						colAttr.push(col);
					});
					trColAttr.push(colAttr);
				});
				return trColAttr;
			};	
			//var datagrid = $("<div class=\"datagrid-wrap\">" + "<div class=\"datagrid-view\">" + "<div class=\"datagrid-view1\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\">" + "<div class=\"datagrid-body-inner\"></div>" + "</div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-view2\">" + "<div class=\"datagrid-header\">" + "<div class=\"datagrid-header-inner\"></div>" + "</div>" + "<div class=\"datagrid-body\"></div>" + "<div class=\"datagrid-footer\">" + "<div class=\"datagrid-footer-inner\"></div>" + "</div>" + "</div>" + "<div class=\"datagrid-resize-proxy\"></div>" + "</div>" + "</div>").insertAfter(target);
				
			var dgPanel = $('<div class="datagrid-wrap">' +
			    				'<div class="datagrid-view">' +
			    					'<div class="datagrid-view1">' +
			    						'<div class="datagrid-header">' +
			    							'<div class="datagrid-header-inner"></div>' +
			    						'</div>' +
			    						'<div class="datagrid-body">' +
			    							'<div class="datagrid-body-inner"></div>' +
			    						'</div>' +
			    						'<div class="datagrid-footer">' +
			    							'<div class="datagrid-footer-inner"></div>' +
			    						'</div>' +
			    					'</div>' +
			    					'<div class="datagrid-view2">' +
			    						'<div class="datagrid-header">' +
			    							'<div class="datagrid-header-inner"></div>' +
			    						'</div>' +
			    						'<div class="datagrid-body"></div>' +
			    						'<div class="datagrid-footer">' +
			    							'<div class="datagrid-footer-inner"></div>' +
			    						'</div>' +
			    					'</div>' +
			    					'<div class="datagrid-resize-proxy"></div>' +
			    				'</div>' +
		    				'</div>').insertAfter(target);
		    
		    // TODO 这里由于panel木有添加对同一个DOM元素添加控件设置，因此调整datagrid.panel位置
		    dgPanel.panel({
				doSize : false
			});
			
			dgPanel.panel("panel").addClass("datagrid").bind("_resize", function(e, param) {
				var opts = $.data(target, "datagrid").options;
				if(opts.fit == true || param) {
					self._resize(target);
					setTimeout(function() {
						if($.data(target, "datagrid")) {
							self._fix(target);
						}
					}, 0);
				}
				return false;
			});
			target.hide().appendTo(dgPanel.children("div.datagrid-view"));//$(target).hide().appendTo(datagrid.children("div.datagrid-view"));
			var frozenColumns = getColumns($("thead[frozen=true]", target));
			var columns = getColumns($("thead[frozen!=true]", target));
			var view = dgPanel.children("div.datagrid-view");
			var view1 = view.children("div.datagrid-view1");
			var view2 = view.children("div.datagrid-view2");
			return {
				panel : dgPanel,
				frozenColumns : frozenColumns,
				columns : columns,
				dc : {
					view : view,
					view1 : view1,
					view2 : view2,
					body1 : view1.children("div.datagrid-body").children("div.datagrid-body-inner"),
					body2 : view2.children("div.datagrid-body"),
					footer1 : view1.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
					footer2 : view2.children("div.datagrid-footer").children("div.datagrid-footer-inner")
				}
			};
			
		},
		_merged : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			var view1Chi = dc.view1.children("div.datagrid-header").add(dc.view2.children("div.datagrid-header"));
			datagrid.find("div.datagrid-body td.datagrid-td-merged").each(function() {
				var td = $(this);
				var colspan = td.attr("colspan") || 1;
				var field = td.attr("field");
				var tdField = view1Chi.find("td[field=\"" + field + "\"]");
				var width = tdField.width();
				for(var i = 1; i < colspan; i++) {
					tdField = tdField.next();
					width  += tdField.outerWidth();
				}
				td.children("div.datagrid-cell")._outerWidth(width);
			});
		},
		_setSize : function (target){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			//var opts = $.data(_c, "datagrid").options;
			//var dc = $.data(_c, "datagrid").dc;
			//var datagrid = $.data(_c, "datagrid").panel;
			var gridWidth = datagrid.width();
			var gridHeight = datagrid.height();
			var view = dc.view;
			var view1 = dc.view1;
			var view2 = dc.view2;
			var view1Header = view1.children("div.datagrid-header");
			var view2Header = view2.children("div.datagrid-header");
			var v1Tbl = view1Header.find("table");
			var v2Tbl = view2Header.find("table");
			view.width(gridWidth);
			
			
			
			
			var v1HeaderInner = view1Header.children("div.datagrid-header-inner").show();
			view1.width(v1HeaderInner.find("table").width());
			if(!opts.showHeader) {
				v1HeaderInner.hide();
			}
			view2.width(gridWidth - view1.outerWidth());
			view1.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(view1.width());
			view2.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(view2.width());
			var hh;
			view1Header.css("height", "");
			view2Header.css("height", "");
			v1Tbl.css("height", "");
			v2Tbl.css("height", "");
			hh = Math.max(v1Tbl.height(), v2Tbl.height());
			v1Tbl.height(hh);
			v2Tbl.height(hh);
			// TODO _outerHeight -> outerHeight
			view1Header.add(view2Header).outerHeight(hh);
			if(opts.height != "auto") {
				var bodyHeight = gridHeight - view2.children("div.datagrid-header").outerHeight(true) - view2.children("div.datagrid-footer").outerHeight(true) - datagrid.children("div.datagrid-toolbar").outerHeight(true) - datagrid.children("div.datagrid-pager").outerHeight(true);
				view1.children("div.datagrid-body").height(bodyHeight);
				view2.children("div.datagrid-body").height(bodyHeight);
			}
			view.height(view2.height());
			view2.css("left", view1.outerWidth());
		},
		_fitRowHeight : function (target, index, autoHeight) {
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc;
				rows = $.data(target, "datagrid").data.rows;
			if(!dc.body1.is(":empty") && (!opts.nowrap || opts.autoRowHeight || autoHeight)) {
				if(index != undefined) {
					var tr1 = opts.finder.getTr(target, index, "body", 1);
					var tr2 = opts.finder.getTr(target, index, "body", 2);
					setTrHeight(tr1, tr2);
				} else {
					var tr1 = opts.finder.getTr(target, 0, "allbody", 1);
					var tr2 = opts.finder.getTr(target, 0, "allbody", 2);
					setTrHeight(tr1, tr2);
					if(opts.showFooter) {
						var tr1 = opts.finder.getTr(target, 0, "allfooter", 1);
						var tr2 = opts.finder.getTr(target, 0, "allfooter", 2);
						setTrHeight(tr1, tr2);
					}
				}
			}
			self._setSize(target);
			if(opts.height == "auto") {
				var dcParent = dc.body1.parent();
				var dcBody2 = dc.body2;
				var height = 0;
				var width = 0;
				dcBody2.children().each(function() {
					var c = $(this);
					if(c.is(":visible")) {
						height += c.outerHeight();
						if(width < c.outerWidth()) {
							width = c.outerWidth();
						}
					}
				});
				if(width > dcBody2.width()) {
					height += 18;
				}
				dcParent.height(height);
				dcBody2.height(height);
				dc.view.height(dc.view2.height());
			}
			dc.body2.triggerHandler("scroll");
			function setTrHeight(obj1, obj2) {
				for(var i = 0; i < obj2.length; i++) {
					var tr1 = $(obj1[i]);
					var tr2 = $(obj2[i]);
					tr1.css("height", "");
					tr2.css("height", "");
					var maxHeight = Math.max(tr1.height(), tr2.height());
					tr1.css("height", maxHeight);
					tr2.css("height", maxHeight);
				}
			};
		},
		_setEditor : function (target){
			var datagrid = $.data(target, "datagrid").panel;
			datagrid.find("div.datagrid-editable").each(function() {
				var ed = $.data(this, "datagrid.editor");
				if(ed.actions.resize) {
					ed.actions.resize(ed.target, $(this).width());
				}
			});
		},
		_fix : function (target, param){
			var self = this,
				opts = $.data(target, "datagrid").options,
				dc   = $.data(target, "datagrid").dc,
				datagrid = $.data(target, "datagrid").panel;
			if(param) {
				fix(param);
			} else {
				var view1Chi = dc.view1.children("div.datagrid-header").add(dc.view2.children("div.datagrid-header"));
				view1Chi.find("td[field]").each(function() {
					fix($(this).attr("field"));
				});
			}
			self._merged(target);
			setTimeout(function() {
				self._fitRowHeight(target);
				self._setEditor(target);
			}, 0);
			function fix(field) {
				var col = self._getTdColspan(target, field);
				var bf = opts.finder.getTr(target, "", "allbody").add(opts.finder.getTr(target, "", "allfooter"));
				bf.find("td[field=\"" + field + "\"]").each(function() {
					var td = $(this);
					var colspan = td.attr("colspan") || 1;
					if(colspan == 1) {
						td.find("div.datagrid-cell").width(col.boxWidth);
						td.find("div.datagrid-editable").width(col.width);
					}
				});
			};
		},
		/**
		 * 获取列 跨度数
		 * @param {Object} target
		 * @param {Object} field
		 */
		_getTdColspan : function (target, field){
			var self = this,
				opts = $.data(target, "datagrid").options;
			if(opts.columns) {
				for(var i = 0; i < opts.columns.length; i++) {
					var columns = opts.columns[i];
					for(var j = 0; j < columns.length; j++) {
						var col = columns[j];
						if(col.field == field) {
							return col;
						}
					}
				}
			}
			if(opts.frozenColumns) {
				for(var i = 0; i < opts.frozenColumns.length; i++) {
					var columns = opts.frozenColumns[i];
					for(var j = 0; j < columns.length; j++) {
						var col = columns[j];
						if(col.field == field) {
							return col;
						}
					}
				}
			}
			return null;
		},
		_resize : function (target, param){
			// TODO resize
			var opts = this.options;
			var datagrid = $.data(target, "datagrid").panel;
			if(param) {
				if(param.width) {
					opts.width = param.width;
				}
				if(param.height) {
					opts.height = param.height;
				}
			}
			if(opts.fit == true) {
				var p = datagrid.panel("panel").parent();
				opts.width = p.width();
				opts.height = p.height();
			}
			datagrid.panel("resize", {
				width : opts.width,
				height : opts.height
			});
		}
    });
})(jQuery);


/***********************/
/** skyeagle.ui.layout.2.0.js **/
/***********************/
/**
 *  
 */
(function($) {
	$.widget("ui.layout", {
		options : {
            panels : [],
			fit : false,
            /**
             * 设置区域的panel之间的间隔。只能设置为数字，单位是px。
             * @default 5
             * @type Number
             * @example
             * $('#page').omBorderLayout({spacing : 3});
             */
			spacing : 5
		},
		_create : function() {
			if(!this.options.panels) return;
			// 设置body样式
			$('body').css({
				margin : 0,
				padding: 0
			});
			// 设置region拖拉改变宽度的最小值
			this._minWidth = 50;
			// 设置region拖拉改变高度的最小值
			this._minHeight = 28;
			this._buildRegion();
			this._resizeRegion();
			$(window).resize($.proxy(this, "_resizeRegion"));
		},
		// 获取区域的大小，如果区域被隐藏了则获取代理区域(regionProxy)的大小，如果代理区域也被隐藏则返回0
		_getRegionSize : function(region){
			var $region = this._getRegion(region),
				$proxy = this._getRegionProxy(region),
				size = {};
			size.width = this._regionVisible($region)?$region.outerWidth(true):
				(this._regionVisible($proxy)?$proxy.outerWidth(true):0);
			size.height = this._regionVisible($region)?$region.outerHeight(true):
				(this._regionVisible($proxy)?$proxy.outerHeight(true):0);
			return size;
		},
		/**
		 * 重置面板大小 
		 */
		_resizeRegion : function() {
			var $centerRegion = this._getRegion("center"),
				$northRegion = this._getRegion("north"),
				$southRegion = this._getRegion("south"),
				$westRegion = this._getRegion("west"),
				$eastRegion = this._getRegion("east"),

				$northProxy = this._getRegionProxy("north"),
				$southProxy = this._getRegionProxy("south"),
				$westProxy = this._getRegionProxy("west"),
				$eastProxy = this._getRegionProxy("east"),
				
				
				layoutWidth = this.element.width(),
				layoutHeight = this.element.height();
				
			
			
			$northProxy && $northProxy.outerWidth(layoutWidth);
			$northRegion && $northRegion.find(">.panel-body").panel("resize",{width:layoutWidth});

			$southProxy && $southProxy.outerWidth(layoutWidth);
			$southRegion && $southRegion.find(">.panel-body").panel("resize",{width:layoutWidth});
				
			// TODO
			var northHeight = this._getRegionSize("north").height,
				southHeight = this._getRegionSize("south").height,
				westWidth = this._getRegionSize("west").width,
				eastWidth = this._getRegionSize("east").width;
					
			$centerRegion.css({top:northHeight,left:westWidth});
			$centerRegion.find(">.panel-body").panel("resize",{
				width:layoutWidth - westWidth - eastWidth,
				height:layoutHeight - northHeight - southHeight
			});
			var centerHeight = $centerRegion.outerHeight(true);
			if($southRegion){
				$southRegion.css({top:layoutHeight-$southRegion.outerHeight(true)});
			}
			if($westRegion){
				$westRegion.css({top:northHeight});
				$westRegion.find(">.panel-body").panel("resize",{height:centerHeight});
				if($westProxy){
					$westProxy.css({top:northHeight});
					$westProxy.outerHeight(centerHeight);
				}
			}
			if($eastRegion){
				$eastRegion.css({top:northHeight});
				$eastRegion.find(">.panel-body").panel("resize",{height:centerHeight});
				if($eastProxy){
					$eastProxy.css({top:northHeight});
					$eastProxy.outerHeight(centerHeight);
				}
			}
			
		},
		_regionVisible : function($region){
			return $region && $region.css("display") != "none";
		},
		_createRegionProxy : function(panel){
			var _self = this;
			var proxyHtml = "<div class=\"sy-borderlayout-proxy sy-borderlayout-proxy-"+panel.region+"\" proxy=\""+panel.region+"\">" +
							"<div class=\"panel-title\"></div>"+
							"<div class=\"panel-tool\">"+
							"<div class=\"ui-icon panel-tool-expand\">"+
							"</div>"+
							"</div>"+
							"</div>";
			var $proxy = $(proxyHtml);
			$proxy.hover(function(){
						$(this).toggleClass("sy-borderlayout-proxy-hover");
					}).appendTo(this.element);
			(function(panel){
				$proxy.find(".panel-tool-expand").hover(function(){
					$(this).toggleClass("panel-tool-expand-hover");
				}).click(function(){
					_self.expandRegion(panel.region);
				});
			})(panel);
		},
		// 构建布局框架
		_buildRegion : function() {
			var _self = this,
				$layout = this.element,
				options = this.options;
			this.element.addClass("sy-borderlayout");
			if (options.fit) {
				$layout.css({
					"width" : "100%",
					"height" : "100%"
				});
			}
			for ( var i = 0; i < options.panels.length; i++) {
				var panel = $.extend({},options.panels[i]);
				var $panelEl = $layout.find("#" + panel.id);
				// 添加代理工具条
				if(panel.collapsible && panel.region != "center"){
					this._createRegionProxy(panel);
				}
				
				// 扩展panel初始化参数，添加一些必要的事件
				if(panel.collapsible){
					$.extend(panel,{
						collapsible:false,
						tools:[{
							iconCls:"panel-tool-collapse",//,"panel-tool-collapse-hover"],
							handler:function(widget){
								_self.collapseRegion(widget.element.parent().attr("region"));
							}
						}]
					});
				}
				if(panel.closable){
					var oldPanelOnClose = panel.onClose;
					$.extend(panel,{
						onClose:function(){
							oldPanelOnClose && oldPanelOnClose.call($panelEl[0]);
							_self._resizeRegion();
						}
					});
				}
				
				
				// 构建panel组件
				$panelEl.panel(panel);
				
				// 初始化north和south的宽度
				if(panel.region == "north" || panel.region == "south"){
					$panelEl.panel("resize",{"width":$layout.width()});
				}
				
				var margin = "0",
					spacing = this.options.spacing + "px";
				// 给panel添加resize功能
				if(panel.resizable && panel.region != "center"){
					var handles = "";
						handleClass = {};
					if(panel.region == "west"){
						handles = "e";
						handleClass.width = spacing;
						handleClass.right = "-" + spacing;
					} else if(panel.region == "east"){
						handles = "w";
						handleClass.width = spacing;
						handleClass.left = "-" + spacing;
					} else if(panel.region == "south"){
						handles = "n";
						handleClass.height = spacing;
						handleClass.top = "-" + spacing;
					} else if(panel.region == "north"){
						handles = "s";
						handleClass.height = spacing;
						handleClass.bottom = "-" + spacing;
					}
					
					
					$panelEl.parent().resizable({
						handles : handles,
						helper : "sy-borderlayout-resizable-helper-" + handles,
						stop : function(event,ui){
							$layout.find(">.sy-borderlayout-mask").remove();
							ui.element.find(">.panel-body").panel("resize",ui.size);
							_self._resizeRegion();
						},
						start : function(event,ui){
							var helper = ui.element.resizable("option","helper");
							// 修改resizable的helper的宽/高为spacing大小
							$("body").find("." + helper).css("border-width",_self.options.spacing);
							// 限制拖拉改变大小的范围
							var region = ui.element.attr("region"),
								maxWidth = $layout.width() - 2*_self._minWidth,
								maxHeight = $layout.height() - 2*_self._minHeight;
							if(region == "west"){
								maxWidth = $layout.width() - (_self._getRegionSize("east").width + _self._minWidth);
								ui.element.resizable( "option", "maxWidth", maxWidth );
							} else if(region == "east"){
								maxWidth = $layout.width() - (_self._getRegionSize("west").width + _self._minWidth);
								ui.element.resizable( "option", "maxWidth", maxWidth );
							} else if(region == "north"){
								maxHeight = $layout.height() - (_self._getRegionSize("south").height + _self._minHeight + _self.options.spacing);
								ui.element.resizable( "option", "maxHeight", maxHeight );
							} else if(region == "south"){
								maxHeight = $layout.height() - (_self._getRegionSize("north").height + _self._minHeight + _self.options.spacing);
								ui.element.resizable( "option", "maxHeight", maxHeight );
							}
							$('<div class="sy-borderlayout-mask"></div>').css({
								width:$layout.width(),
								height:$layout.height()
							}).appendTo($layout);
						},
						minWidth : _self._minWidth,
						minHeight : _self._minHeight
						
					});
					$panelEl.parent().find(".ui-resizable-handle").css(handleClass);
					margin = (panel.region == "south" ? spacing : 0) + " " +
							 (panel.region == "west" ? spacing : 0) + " " +
							 (panel.region == "north" ? spacing : 0) + " " +
							 (panel.region == "east" ? spacing : 0);
				}
				
				$panelEl.parent()
					   .addClass("sy-borderlayout-region")
					   .addClass("sy-borderlayout-region-" + panel.region)
					   .css("margin",margin)
					   .attr("region",panel.region);
				//添加header class用来区别borderlayout和borderlayout中内嵌的panel使用的tools 图片
				$panelEl.prev().addClass("sy-borderlayout-region-header");
			}
		},
		_getRegion : function(region){
			var $regionEl = this.element.find(">[region=\""+region+"\"]");
			return $regionEl.size()>0?$regionEl:false;
		},
		_getRegionProxy : function(region){
			var $proxyEl = this.element.find(">[proxy=\""+region+"\"]");
			return $proxyEl.size()>0?$proxyEl:false;
		},
		_getPanelOpts : function(region){
			for(var i = 0; i < this.options.panels.length; i++){
				if(region == this.options.panels[i].region){
					return this.options.panels[i];
				}
			}
			return false;
		},
        /**
         * 折叠某个区域的panel。
         * @name omBorderLayout#collapseRegion
         * @function
         * @param region 区域名称
         * @example
         * //折叠north区域的panel
         * $('#page').omBorderLayout('collapseRegion', 'north');
         */
		collapseRegion : function(region){
			var self = this;
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.collapsible){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(panelInstance.options.closed) return;
				if(panel.onBeforeCollapse && panelInstance._trigger("onBeforeCollapse") === false){
					return false;
				}
				// if(region=='north'){
					// $region.animate({top: -panelInstance.options.height},function (){
						// panelInstance.close();
						// //$region.hide();
						// var p = self._getRegionProxy(region);
						// p.css({
							// left  : 0,
							// top   : 0,
							// height: '26px'
						// })
						// p.show();
					// });
				// }
				
				$region.hide();
				panel.onCollapse && panelInstance._trigger("onCollapse");
				this._getRegionProxy(region).show();
				this._resizeRegion();
			}
		},
		/**
		 * 展开某个区域的panel。
		 * @name omBorderLayout#expandRegion
		 * @function
		 * @param region 区域名称
		 * @example
		 * //展开north区域的panel
		 * $('#page').omBorderLayout('expandRegion', 'north');
		 */
		expandRegion : function(region){
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.collapsible){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(panelInstance.options.closed) return;
				if(panel.onBeforeExpand && panelInstance._trigger("onBeforeExpand") === false){
					return false;
				}
				$region.show();
				panel.onExpand && panelInstance._trigger("onExpand");
				this._getRegionProxy(region).hide();
				this._resizeRegion();
			}
		},
		/**
		 * 关闭某个区域的panel。
		 * @name omBorderLayout#closeRegion
		 * @function
		 * @param region 区域名称
		 * @example
		 * //关闭north区域的panel
		 * $('#page').omBorderLayout('closeRegion', 'north');
		 */
		closeRegion : function(region){
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.closable){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(panelInstance.options.closed) return;
				
				$region.find(">.panel-body").panel("close");
				this._getRegionProxy(region).hide();
				this._resizeRegion();
			}
		},
		/**
		 * 打开某个区域的panel。
		 * @name omBorderLayout#openRegion
		 * @function
		 * @param region 区域名称
		 * @example
		 * //打开north区域的panel
		 * $('#page').omBorderLayout('openRegion', 'north');
		 */
		openRegion : function(region){
			var panel = this._getPanelOpts(region);
			if(!panel || !panel.closable){
				return;
			}
			var $region = this._getRegion(region);
				$body = $region.find(">.panel-body");
			if($region){
				var panelInstance = $.data($body[0],"panel");
				if(!panelInstance.options.closed) return;
				
				$region.find(">.panel-body").panel("open");
				this._getRegionProxy(region).hide();
				this._resizeRegion();
			}
		}

	});
})(jQuery);


/***********************/
/** skyeagle.ui.menu.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menu组件
 */
(function($) {
	$.fn._outerWidth = function(target) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(target);
			} else {
				$(this).width(target - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(target) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).height(target);
			} else {
				$(this).height(target - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	
	$.widget('ui.menu', {
		/**
		 * 配置选项 
		 */
		options: {
			// z轴高度
			zIndex : 110000,
			// 靠左边距离
			left   : 0,
			// 靠顶部距离
			top    : 0
		},
		/**
		 * 获取菜单项数据并将其返回, 数据包含以下属性：
		 * 	target：DOM对象，菜单项目。
		 * 	id：字符串，分配给元素的ID。
		 * 	text：字符串，菜单项的文本。
		 * 	href：字符串，超链接地址。
		 * 	disabled：布尔型，菜单项是启用还是禁用。
		 * 	onclick：函数, 当用户点击菜单时将要执行的函数。
		 * 	iconCls：字符串，图标css类。 
		 */
		getItem : function (target){
			var item = {
				target : target,
				id : $(target).attr("id"),
				text : $.trim($(target).children("div.menu-text").html()),
				disabled : $(target).hasClass("menu-item-disabled"),
				href : $(target).attr("href"),
				onclick : target.onclick
			};
			var men = $(target).children("div.menu-icon");
			if(men.length) {
				var cc = [];
				var aa = men.attr("class").split(" ");
				for(var i = 0; i < aa.length; i++) {
					if(aa[i] != "menu-icon") {
						cc.push(aa[i]);
					}
				}
				item.iconCls = cc.join(" ");
			}
			return item;
		},
		/**
		 * 查找菜单项
		 * @param  text	文本内容 
		 */
		findItem : function (text){
			return this._findItem(this.element, text);
		},
		/**
		 * 显示menu方法 
 		 * @param {Object} pos 位置参数，包含left,top
		 */
		show   : function (pos){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._showTopMenu(ele, pos);
			});
		},
		/**
		 * 隐藏menu方法 
		 */
		hide : function(){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._hide(ele);
			});
		},
		/**
		 * 销毁组件 
		 */
		destroy : function (){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._destroy(ele);
			});
		},
		/**
		 * 打开事件 
		 */
		onShow : function() {},
		/**
		 * 隐藏事件 
		 */
		onHide : function() {},
		/**
		 * 单击事件 
		 */
		onClick : function (event, item){},
		/**
		 * 销毁组件 
		 */
		_destroy : function (target){
			var self = this;
			$(target).children("div.menu-item").each(function() {
				self._remvoeNode(this);
			});
			if(target.shadow) {
				target.shadow.remove();
			}
			$(target).remove();
		},
		/**
		 * 删除menu菜单 
		 */
		_remvoeNode : function (el){
			function removeSubMenu(menu) {
				if(menu.submenu) {
					menu.submenu.children("div.menu-item").each(function() {
						removeSubMenu(this);
					});
					var shadow = menu.submenu[0].shadow;
					if(shadow) {
						shadow.remove();
					}
					menu.submenu.remove();
				}
				$(menu).remove();
			};
			removeSubMenu(el);
			
		},
		/**
		 * 查找菜单项 
		 */
		_findItem : function (target, text){
			var item = null;
			var tmp = $("<div></div>");
			function findI(thead) {
				thead.children("div.menu-item").each(function() {
					var getItme = $(target).menu("getItem", this);
					var s = tmp.empty().html(getItme.text).text();
					if(text == $.trim(s)) {
						item = getItme;
					} else {
						if(this.submenu && !item) {
							findI(this.submenu);
						}
					}
				});
			};
			findI($(target));
			tmp.remove();
			return item;
		},
		/**
		 * 显示menu菜单 
		 */
		_showTopMenu : function (target, pos){
			var self = this;
			var opts = $.data(target, "menu").options;
			if(pos) {
				opts.left = pos.left;
				opts.top = pos.top;
				if(opts.left + $(target).outerWidth() > $(window).width() + $(document).scrollLeft()) {
					opts.left = $(window).width() + $(document).scrollLeft() - $(target).outerWidth() - 5;
				}
				if(opts.top + $(target).outerHeight() > $(window).height() + $(document).scrollTop()) {
					opts.top -= $(target).outerHeight();
				}
			}
			self._showMenu($(target), {
				left : opts.left,
				top : opts.top
			}, function() {
				$(document).unbind(".menu").bind("mousedown.menu", function() {
					self._hide(target);
					$(document).unbind(".menu");
					return false;
				});
				self._trigger('onShow', null);
			});
		},
		/**
		 * 创建Menu，并添加事件 
		 */
		_create: function (){
		},
		/**
		 * 初始化 
		 */
		_init : function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
			var state = $.data(ele, "menu");
			if(state) {
				$.extend(state.options, opts);
			}else{
				state = $.data(ele, "menu", {
					options : $.extend({}, opts)
				});
				self._initMenu(ele);
			}
		},
		/**
		 * 初始化DOM元素 
 		 * @param {Object} target
		 */
		_initMenu : function (target){
			var self = this;
			$(target).appendTo("body");
			$(target).addClass("menu-top");
			var menus = [];
			adjust($(target));
			var timeOut = null;
			for(var i = 0; i < menus.length; i++) {
				var menu = menus[i];
				wrapMenu(menu);
				menu.children("div.menu-item").each(function() {
					self._bindMenuItemEvent(target, $(this));
				});
				menu.bind("mouseenter", function() {
					if(timeOut) {
						clearTimeout(timeOut);
						timeOut = null;
					}
				}).bind("mouseleave", function() {
					timeOut = setTimeout(function() {
						self._hide(target);
					}, 100);
				});
			}
			function adjust(menu) {
				menus.push(menu);
				menu.find(">div").each(function() {
					var item = $(this);
					var submenu = item.find(">div");
					if(submenu.length) {
						submenu.insertAfter(target);
						item[0].submenu = submenu;
						adjust(submenu);
					}
				});
			};
			function wrapMenu(menu) {
				menu.addClass("menu").find(">div").each(function() {
					var item = $(this);
					if(item.hasClass("menu-sep")) {
						item.html("&nbsp;");
					} else {
						var html = item.addClass("menu-item").html();
						item.empty().append($("<div class=\"menu-text\"></div>").html(html));
						var cls = item.attr("iconCls") || item.attr("icon");
						if(cls) {
							$("<div class=\"menu-icon\"></div>").addClass(cls).appendTo(item);
						}
						if(item[0].submenu) {
							$("<div class=\"menu-rightarrow\"></div>").appendTo(item);
						}
						item._outerHeight(22);
					}
				});
				menu.hide();
			};
		},
		/**
		 * 隐藏menu 
		 */
		_hide : function (target){
			var self = this;
			var opts = $.data(target, "menu").options;
			self._hideMenu($(target));
			$(document).unbind(".menu");
			self._trigger('onHide',null);
			return false;
		},
		_hideMenu : function (menu){
			var self = this;
			if(!menu) {
				return;
			}
			hideit(menu);
			menu.find("div.menu-item").each(function() {
				if(this.submenu) {
					self._hideMenu(this.submenu);
				}
				$(this).removeClass("menu-active");
			});
			function hideit(m) {
				m.stop(true, true);
				if(m[0].shadow) {
					m[0].shadow.hide();
				}
				m.hide();
			};
		},
		/**
		 * 绑定菜单事件 
 		 * @param {Object} target
		 */
		_bindMenuItemEvent : function (target, item){
			var self = this;
			item.unbind(".menu");
			item.bind("mousedown.menu", function() {
				return false;
			}).bind("click.menu", function(event) {
				if($(this).hasClass("menu-item-disabled")) {
					return;
				}
				if(!this.submenu) {
					self._hide(target);
					var href = $(this).attr("href");
					if(href) {
						location.href = href;
					}
				}
				var getItem = $(target).menu("getItem", this);
				self._trigger('onClick', event, getItem);
				//$.data(target, "menu").options.onClick.call(target, getItem);
			}).bind("mouseenter.menu", function(e) {
				item.siblings().each(function() {
					if(this.submenu) {
						self._hideMenu(this.submenu);
					}
					$(this).removeClass("menu-active");
				});
				item.addClass("menu-active");
				if($(this).hasClass("menu-item-disabled")) {
					item.addClass("menu-active-disabled");
					return;
				}
				var subMenu = item[0].submenu;
				if(subMenu) {
					var tLeft = item.offset().left + item.outerWidth() - 2;
					if(tLeft + subMenu.outerWidth() + 5 > $(window).width() + $(document).scrollLeft()) {
						tLeft = item.offset().left - subMenu.outerWidth() + 2;
					}
					var top = item.offset().top - 3;
					if(top + subMenu.outerHeight() > $(window).height() + $(document).scrollTop()) {
						top = $(window).height() + $(document).scrollTop() - subMenu.outerHeight() - 5;
					}
					self._showMenu(subMenu, {
						left : tLeft,
						top : top
					});
				}
			}).bind("mouseleave.menu", function(e) {
				item.removeClass("menu-active menu-active-disabled");
				var subMenu = item[0].submenu;
				if(subMenu) {
					if(e.pageX >= parseInt(subMenu.css("left"))) {
						item.addClass("menu-active");
					} else {
						self._hideMenu(subMenu);
					}
				} else {
					item.removeClass("menu-active");
				}
			});
		},
		/**
		 * 显示菜单 
		 * @param {Object} menu
		 * @param {Object} pos
		 * @param {Object} callback
		 */
		_showMenu : function (menu, pos, callback){
			var self = this,
				opts = self.options;
			if(!menu) {
				return;
			}
			if(pos) {
				menu.css(pos);
			}
			menu.show(0, function() {
				if(!menu[0].shadow) {
					menu[0].shadow = $("<div class=\"menu-shadow\"></div>").insertAfter(menu);
				}
				menu[0].shadow.css({
					display : "block",
					zIndex : opts.zIndex++,
					left : menu.css("left"),
					top : menu.css("top"),
					width : menu.outerWidth(),
					height : menu.outerHeight()
				});
				menu.css("z-index", opts.zIndex++);
				if(callback) {
					callback();
				}
			});
		}
	});
})(jQuery);



/***********************/
/** skyeagle.ui.menubutton.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menubutton组件
 */
(function($) {
	$.widget('ui.menubutton', {
		options : {
			// 是否禁用组件。如果禁用，则不可以进行任何操作
			disabled: false,
			// 设置为true将显示简洁效果
			plain: true,
			// 用来创建一个相应菜单的选择器
			menu: null,
			// 定义鼠标划过按钮时显示菜单所持续的时间，单位为毫秒
			duration: 100,
			// 显示的文字
			label : ''
		},
		disable : function (){
			
		},
		enable : function (){
			
		},
		destroy: function (){
			
		},
		_create: function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
			if(opts.label === ''){
				opts.label = ele.html();
			}
			ele.removeAttr('disabled');
			ele.append('<span class="m-btn-downarrow">&nbsp;</span>');
			ele.removeClass('m-btn-active m-btn-plain-active');
			ele.button(opts);
			if (opts.menu){
				$(opts.menu).menu({
					onShow: function(){
						ele.addClass((opts.plain==true) ? 'm-btn-plain-active' : 'm-btn-active');
					},
					onHide: function(){
						ele.removeClass((opts.plain==true) ? 'm-btn-plain-active' : 'm-btn-active');
					}
				});
			}
			ele.unbind('.button');
			if (opts.disabled == false && opts.menu){
				ele.bind('click.button', function(){
					showMenu();
					return false;
				});
				var timeout = null;
				ele.bind('mouseenter.button', function(){
					timeout = setTimeout(function(){
						showMenu();
					}, opts.duration);
					return false;
				}).bind('mouseleave.button', function(){
					if (timeout){
						clearTimeout(timeout);
					}
				});
			}
			
			function showMenu(){
				var left = ele.offset().left;
				if (left + $(opts.menu).outerWidth() + 5 > $(window).width()){
					left = $(window).width() - $(opts.menu).outerWidth() - 5;
				}
				
				$('.menu-top').menu('hide');
				$(opts.menu).menu('show', {
					left: left,
					top: ele.offset().top + ele.outerHeight()
				});
				ele.blur();
			}
		}
	});
})(jQuery);



/***********************/
/** skyeagle.ui.pagination.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.25 
 * @description  基于jquery UI、easyUI扩展的pagination组件
 */
(function($) {
	
	$.widget("ui.pagination" , {
		options : {
			// 总条数
			total : 1,
			// 每页显示多少条
			pageSize : 10,
			// 当前第几页
			pageNumber : 1,
			// 可选择的每页记录数
			pageList : [10, 20, 30, 50],
			// 是否正在载入状态
			loading : false,
			// array类型，自定义按钮，每个按钮包含两个属性，iconCls,handler
			buttons : null,
			// 显示可选择的每页记录数
			showPageList : true,
			// 定义是否显示刷新按钮
			showRefresh : true,
			// 在输入框之前显示的符号
			beforePageText : "第",
			// 在输入框之后显示的符号
			afterPageText : "共{pages}页",
			// 在插件右上方显示分页信息
			displayMsg : "显示{from}到{to},共{total}记录",
			/**
			 * 当用户进行翻页时触发，回调函数包含2个参数: 
			 * @param {Object} event	
			 * @param {Object} ui	ui.pageNumber： 下一页的页码; ui.pageSize： 下一页的显示记录数
			 */
			onSelectPage : function(event, ui) {},
			/**
			 * 刷新之前触发, 返回false将取消刷新 
			 * @param {Object} event
			 * @param {Object} ui	ui.pageNumber： 下一页的页码; ui.pageSize： 下一页的显示记录数
			 */
			onBeforeRefresh : function(event, ui) {
			},
			/**
			 * 刷新之后触发
			 * @param {Object} event
			 * @param {Object} ui	ui.pageNumber： 下一页的页码; ui.pageSize： 下一页的显示记录数
			 */
			onRefresh : function(event, ui) {
			},
			/**
			 * 当用户修改每页显示记录数时触发
			 * @param {Object} event
			 * @param {Object} pageSize 下一页的显示记录数
			 */
			onChangePageSize : function(event, pageSize) {
			}
		},
		/**
		 * 提醒分页插件正在载入 
		 */
		loading : function() {
			var self = this;
			return self.element.each(function() {
				self._loadToggle(this, true);
			});
		},
		/**
		 * 提醒分页插件已经载入 
		 */
		loaded : function() {
			var self = this;
			return self.element.each(function() {
				self._loadToggle(this, false);
			});
		},
		/**
		 * 返回分页属性对象 
		 */
		getOptions : function (){
			return this.options;
		},
		_loadToggle : function (target, isLoad){
			var self = this,
				opts = self.options;
			//var opts = $.data(_17, "pagination").options;
			opts.loading = isLoad;
			if(opts.loading) {
				$(target).find("a[icon=pagination-load]").addClass("pagination-loading");
				//$(target).find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
			} else {
				$(target).find("a[icon=pagination-load]").removeClass("pagination-loading");
			}
		},
		_create : function (){
			var self = this,
				ele  = this.element;
			self._wrapPage(ele);
			
			self._initButton(ele);
		},
		_wrapPage : function (target){
			var self = this,
				opts = self.options;
			//var opts = $.data(target, "pagination").options;
			var th = target.addClass("pagination").empty();
			var t = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>").appendTo(th);
			var tr = $("tr", t);
			if(opts.showPageList) {
				var ps = $("<select class=\"pagination-page-list\"></select>");
				for(var i = 0; i < opts.pageList.length; i++) {
					var option = $("<option></option>").text(opts.pageList[i]).appendTo(ps);
					if(opts.pageList[i] == opts.pageSize) {
						option.attr("selected", "selected");
					}
				}
				$("<td></td>").append(ps).appendTo(tr);
				opts.pageSize = parseInt(ps.val());
				$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			}
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-first\" class=\"pagination-first\"></a></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-prev\" class=\"pagination-prev\"></a></td>").appendTo(tr);
			$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			$("<span style=\"padding-left:6px;\"></span>").html(opts.beforePageText).wrap("<td></td>").parent().appendTo(tr);
			$("<td><input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\"></td>").appendTo(tr);
			$("<span style=\"padding-right:6px;\"></span>").wrap("<td></td>").parent().appendTo(tr);
			$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-next\" class=\"pagination-next\"></a></td>").appendTo(tr);
			$("<td><a href=\"javascript:void(0)\" icon=\"pagination-last\" class=\"pagination-last\"></a></td>").appendTo(tr);
			if(opts.showRefresh) {
				$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
				$("<td><a href=\"javascript:void(0)\" icon=\"pagination-load\"class=\"pagination-load\"></a></td>").appendTo(tr);
			}
			if(opts.buttons) {
				$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
				for(var i = 0; i < opts.buttons.length; i++) {
					var button = opts.buttons[i];
					if(button == "-") {
						$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
					} else {
						var td = $("<td></td>").appendTo(tr);
						$("<a href=\"javascript:void(0)\"></a>").addClass(button.iconCls || "" + ' l-btn').css("float", "left").text(button.text || "").attr("icon", button.iconCls || "").bind("click", eval(button.handler ||
						function() {
						})).appendTo(td).button({
							plain : true
						});
					}
				}
			}
			$("<div class=\"pagination-info\"></div>").appendTo(th);
			$("<div style=\"clear:both;\"></div>").appendTo(th);
			$("a[icon^=pagination]", th).button({
				plain : true
			});
			th.find("a[icon=pagination-first]").unbind(".pagination").bind("click.pagination", function() {
				if(opts.pageNumber > 1) {
					self.selectPage(target, 1);
				}
			});
			th.find("a[icon=pagination-prev]").unbind(".pagination").bind("click.pagination", function() {
				if(opts.pageNumber > 1) {
					self.selectPage(target, opts.pageNumber - 1);
				}
			});
			th.find("a[icon=pagination-next]").unbind(".pagination").bind("click.pagination", function() {
				var ceil = Math.ceil(opts.total / opts.pageSize);
				if(opts.pageNumber < ceil) {
					self.selectPage(target, opts.pageNumber + 1);
				}
			});
			th.find("a[icon=pagination-last]").unbind(".pagination").bind("click.pagination", function() {
				var ceil = Math.ceil(opts.total / opts.pageSize);
				if(opts.pageNumber < ceil) {
					self.selectPage(target, ceil);
				}
			});
			th.find("a[icon=pagination-load]").unbind(".pagination").bind("click.pagination", function() {
				if(self._trigger('onBeforeRefresh', null, {
						pageNumber : opts.pageNumber,
						pageSize   : opts.pageSize
					}) !=false){
					self.selectPage(target, opts.pageNumber);
					self._trigger('onRefresh', null, {
						pageNumber : opts.pageNumber,
						pageSize   : opts.pageSize
					});
				}
			});
			th.find("input.pagination-num").unbind(".pagination").bind("keydown.pagination", function(e) {
				if(e.keyCode == 13) {
					var num = parseInt($(this).val()) || 1;
					self.selectPage(target, num);
					return false;
				}
			});
			th.find(".pagination-page-list").unbind(".pagination").bind("change.pagination", function() {
				opts.pageSize = $(this).val();
				self._trigger('onChangePageSize', null, opts.pageSize);
				var ceil = Math.ceil(opts.total / opts.pageSize);
				self.selectPage(target, opts.pageNumber);
			});
		},
		selectPage : function (target, number){
			var self = this,
				opts = self.options;
			// var opts = $.data(target, "pagination").options;
			var ceil = Math.ceil(opts.total / opts.pageSize) || 1;
			var num = number;
			if(number < 1) {
				num = 1;
			}
			if(number > ceil) {
				num = ceil;
			}
			opts.pageNumber = num;
			// TODO onSelectPage
			var onSelectPage = opts.onSelectPage;
            if (typeof(onSelectPage) == 'function') {
            	//opts.onSelectPage.call(target, num, opts.pageSize);
				self._trigger('onSelectPage', null, {
					pageNumber : num, 
					pageSize : opts.pageSize
				});
			}
			self._initButton(target);
		},
		_initButton : function (target){
			var self = this,
				opts = self.options;
			//var opts = $.data(target, "pagination").options;
			var ceil = Math.ceil(opts.total / opts.pageSize) || 1;
			var num = target.find("input.pagination-num");
			num.val(opts.pageNumber);
			num.parent().next().find("span").html(opts.afterPageText.replace(/{pages}/, ceil));
			var msg = opts.displayMsg;
			msg = msg.replace(/{from}/, opts.pageSize * (opts.pageNumber - 1) + 1);
			msg = msg.replace(/{to}/, Math.min(opts.pageSize * (opts.pageNumber), opts.total));
			msg = msg.replace(/{total}/, opts.total);
			target.find(".pagination-info").html(msg);
			$("a[icon=pagination-first],a[icon=pagination-prev]", target).button({
				disabled : (opts.pageNumber == 1)
				 //icons: {primary:'pagination-first'}
				//label : '上一页'
			});
			$("a[icon=pagination-next],a[icon=pagination-last]", target).button({
				disabled : (opts.pageNumber == ceil)
			});
			if(opts.loading) {
				target.find("a[icon=pagination-load]").find(".pagination-load").addClass("pagination-loading");
			} else {
				target.find("a[icon=pagination-load]").find(".pagination-load").removeClass("pagination-loading");
			}
		}
	});
})(jQuery);



/***********************/
/** skyeagle.ui.panel.4.0.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.06 
 * @description  基于jquery UI、easyUI扩展的panel组件
 */
(function($) {
	
	$.fn._outerWidth = function(width) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).width(width);
			} else {
				$(this).width(width - ($(this).outerWidth() - $(this).width()));
			}
		});
	};
	$.fn._outerHeight = function(height) {
		return this.each(function() {
			if(!$.boxModel && $.browser.msie) {
				$(this).height(height);
			} else {
				$(this).height(height - ($(this).outerHeight() - $(this).height()));
			}
		});
	};
	
	$.widget("ui.panel" , {
		version: "@VERSION",
		options : {
			// 标题
			title: null,
			// 图标样式
			iconCls: null,
			// 宽度
			width: 'auto',
			// 高度
			height: 'auto',
			// 靠左距离
			left: null,
			// 靠顶部距离
			top: null,
			// panel样式
			cls: null,
			// 头部样式
			headerCls: null,
			// body样式
			bodyCls: null,
			// 给面板自定义样式
			style: {},
			// 远程URL获取
			href: null,
			// 获取URL时缓存数据
			cache: true,
			// 当设置为true，面板尺寸将适合它的父容器
			fit: false,
			// 定义面板的边框
			border: true,
			// 当设置为true，面板载创建的时候将被调整和重新布局
			doSize: true,
			// 不添加头部
			noheader: false,
			// 具体内容
			content: null,
			// 定义是否显示可折叠定义按钮
			collapsible: true,
			// 定义是否显示最小化按钮
			minimizable: false,
			// 定义是否显示最大化按钮
			maximizable: false,
			// 定义是否显示关闭按钮
			closable: false,
			// 定义在初始化的时候折叠面板
			collapsed: false,
			// 定义在初始化的时候最小化面板
			minimized: false,
			// 定义在初始化的时候最大化面板
			maximized: false,
			// 定义在初始化的时候关闭面板
			closed: false,
			// 自定义工具栏，每一个工具都可以包含2个属性：图标类 和句柄。
			tools: [],	
			// 是否可拖动
			draggabled : false,
			
			// 加载信息
			loadingMsg : '正在加载中...',
			
			/**
			 * 在远程数据被载入时触发
			 */
			onLoad: function(){},
			/**
			 * 在控制面板被打开之前触发，返回false将停止打开 
			 */
			onBeforeOpen: function(){},
			/**
			 * 在控制面板被打开之后触发 
			 */
			onOpen: function(){},
			/**
			 * 在控制面板被关闭之前触发，返回false将取消关闭 
			 */
			onBeforeClose: function(){},
			/**
			 * 在控制面板被关闭后触发 
			 */
			onClose: function(){},
			/**
			 * 在控制面板被注销前触发，返回false将取消注销 
			 */
			onBeforeDestroy: function(){},
			/**
			 * 在控制面板被注销后触发 
			 */
			onDestroy: function(){},
			/**
			 * 在控制面板被缩放后触发  
			 * ui.width：   新的控制面板宽度
			 * ui.height: 新的控制面板高度
			 */
			onResize: function(event, ui){},
			/**
			 * 在控制面板被移动后触发
			 * ui.left：新的控制面板左边距
			 * ui.top：新的控制面板顶边距 
			 */
			onMove: function(event, ui){},
			/**
			 * 在控制面板被最大化后触发 
			 */
			onMaximize: function(){},
			/**
			 * 在控制面板被重置为初始大小后触发 
			 */
			onRestore: function(){},
			/**
			 * 在控制面板被最小化后触发 
			 */
			onMinimize: function(){},
			/**
			 * 在控制面板被折叠之前触发，返回false将停止折叠 
			 */
			onBeforeCollapse: function(){},
			/**
			 * 在控制面板被扩展之前触发，返回false将停止扩展（这里应该是指扩展区域，宽、高等） 
			 */
			onBeforeExpand: function(){},
			/**
			 * 在控制面板被折叠之后触发 
			 */
			onCollapse: function(){},
			/**
			 * 在控制面板被扩展之后触发 
			 */
			onExpand: function(){},
			/**
			 * 
			 */
			onDraggleBegin : function (){
				
			},
			/**
			 * 
			 */
			onDraggleDrag : function (){},
			/**
			 * 
			 */
			onDraggleEnd : function (){}
		},
		/**
		 * 返回选项属性 
		 */
		getOptions : function (){
			return $.data(this.element,'panel').options;
		},
		/**
		 * 返回控制面板对象 
		 */
		panel : function (){
			return $.data(this.element,'panel').panel;
		},
		/**
		 * 返回控制面板头对象 
		 */
		header: function (){
			return $.data(this.element,'panel').panel.find('>div.panel-header');
		},
		/**
		 * 返回控制面板主体对象 
		 */
		body : function (){
			return $.data(this.element,'panel').panel.find('>div.panel-body');
		},
		/**
		 * 设置控制面板头部的标题文本
		 * @param {Object} param 标题文本
		 */
		setTitle : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._setTitle(ele, param);
			});
		},
		/**
		 * 打开控制面板
		 * @param {Object} param 设置为true时，控制面板将被打开，不受onBeforeOpen回调函数的约束
		 */
		open : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._openPanel(ele, param);
			});
		},
		/**
		 * 关闭控制面板
		 * @param {Object} param 设置为true时，控制面板将被关闭，不受onBeforeClose回调函数的约束
		 */
		close : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._closePanel(ele, param);
			});
		},
		/**
		 * 销毁控制面板
		 * @param {Object} param 设置为true时，控制面板将被销毁，不受onBeforeDestroy回调函数的约束
		 */
		destroy : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._destroyPanel(ele, param);
			});
		},
		/**
		 * 当param属性被设置时，刷新控制面板以载入远程数据 
		 */
		refresh : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				$.data(ele, "panel").isLoaded = false;
				if(param) {
					$.data(ele, "panel").options.href = param;
				}
				self._loadData(ele);
			});
		},
		/**
		 * 重置控制面板的尺寸
		 * @param {Object} param {}
		 * 		width：   新的控制面板宽度
		 * 		height： 新的控制面板高度
		 * 		left：     新的控制面板左边距
		 * 		top： 	新的控制面板顶边距
		 */
		resize : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._setSize(ele, param);
			});
		},
		/**
		 * 移动控制面板到一个新的位置
		 * @param {Object} param {}
		 * 		left： 新的控制面板左边距
		 *		top： 新的控制面板顶边距
		 */
		move : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._movePanel(ele, param);
			});
		},
		/**
		 * 使控制面板铺满整个容器 
		 */
		maximize : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._maximizePanel(ele);
			});
		},
		/**
		 * 最小化控制面板 
		 */
		minimize : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._minimizePanel(ele);
			});
		},
		/**
		 * 使最大化的控制面板重置为其初始化时的大小和位置 
		 */
		restore : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._restorePanel(ele);
			});
		},
		/**
		 * 折叠控制面板主体 
		 * @param {Object} param  是否显示动画
		 */
		collapse : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._collapsePanel(ele, param);	// param: boolean,indicate animate or not
			});
		},
		/**
		 * 扩展控制面板主体
		 * @param {Object} param  是否显示动画
		 */
		expand : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function(){
				self._expandPanel(ele, param);	// param: boolean,indicate animate or not
			});
		},
		/**
		 * 移动panel 
		 */
		_movePanel : function (target, param){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(param) {
				if(param.left != null) {
					opts.left = param.left;
				}
				if(param.top != null) {
					opts.top = param.top;
				}
			}
			panel.css({
				left : opts.left,
				top : opts.top
			});
			this._trigger("onMove", null, {
				left : opts.left,
				top  : opts.top
			});
		},
		/**
		 * 销毁panel 
		 */
		_destroyPanel : function (target, forceDestroy){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceDestroy != true) {
				if (this._trigger("onBeforeDestroy") == false) return;
				// if(opts.onBeforeDestroy.call(target) == false) {
					// return;
				// }
			}
			//_1d(target);
			this._removeNode(panel);
			this._trigger("onDestroy");
		},
		/**
		 * 设置标题 
		 */
		_setTitle : function (target, title){
			$.data(target, "panel").options.title = title;
			$(target).panel('header').find('div.panel-title').html(title);
		},
		_create : function (){
			//alert('_create');
		},
		/**
		 * 创建panel初始化 
		 */
		_init : function (){
			var self = this,
				ele  = self.element,
				opts = self.options;
				
			if(!opts.id) {
				opts.id = ele.attr('id') || undefined;
			}
			
			var state = $.data(ele, "panel");
			
			if(state) {
				opts = $.extend(state.options, opts);
			} else {
				ele.attr("title", "");
				state = $.data(ele, "panel", {
					options : opts,
					panel : self._wrapPanel(ele),
					isLoaded : false
				});
			}
			if(opts.content) {
				ele.html(opts.content);
			}
			
			self._addHeader(ele);
			self._setBorder(ele);
			if(opts.doSize == true) {
				state.panel.css("display", "block");
				self._setSize(ele);
			}
			if(opts.closed == true || opts.minimized == true) {
				state.panel.hide();
			} else {
				self._openPanel(ele);
			}
			
			// 配置可拖动
			if(opts.draggabled == true){
				self._setDraggabled(ele);
			}
		},
		/**
		 * 生成panel样式 
		 */
		_wrapPanel : function (target){
			var self = this;
			var panel = $(target).addClass("panel-body").wrap("<div class=\"panel\"></div>").parent();
			panel.bind("_resize", function() {
				var opts = $.data(target, "panel").options;
				if(opts.fit == true) {
					self._setSize(target);
				}
				return false;
			});
			return panel;
		},
		/**
		 * 打开panel 
		 */
		_openPanel : function (target, forceOpen){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceOpen != true) {
				if (this._trigger("onBeforeOpen") == false) return;
				// if(opts.onBeforeOpen.call(target) == false) {
					// return;
				// }
			}
			panel.show();
			opts.closed = false;
			opts.minimized = false;
			this._trigger("onOpen");
			if(opts.maximized == true) {
				opts.maximized = false;
				this._maximizePanel(target);
			}
			if(opts.collapsed == true) {
				opts.collapsed = false;
				this._collapsePanel(target);
			}
			if(!opts.collapsed) {
				this._loadData(target);
				this._panelResize(target);
			}
			
		},
		/**
		 *  添加拖动
		 */
		_setDraggabled : function (target){
			var self = this;
			var panel = $.data(target, "panel").panel;
			var header = panel.children("div.panel-header");
			var pBody = panel.children("div.panel-body");
			panel.draggable({
				handle : header,
				start : function (event, ui){
					self._trigger('onDraggleBegin');
				},
				drag : function (event, ui){
					self._trigger('onDraggleDrag');
				},
				end : function (event, ui){
					self._trigger('onDraggleEnd');
				}
			});
			
		},
		/**
		 * 设置panel大小 
		 */
		_setSize : function (target, param){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var header = panel.children("div.panel-header");
			var pBody = panel.children("div.panel-body");
			if(param) {
				if(param.width) {
					opts.width = param.width;
				}
				if(param.height) {
					opts.height = param.height;
				}
				if(param.left != null) {
					opts.left = param.left;
				}
				if(param.top != null) {
					opts.top = param.top;
				}
			}
			if(opts.fit == true) {
				var p = panel.parent();
				p.addClass("panel-noscroll");
				opts.width = p.width();
				opts.height = p.height();
			}
			panel.css({
				left : opts.left,
				top : opts.top
			});
			if(!isNaN(opts.width)) {
				panel._outerWidth(opts.width);
			} else {
				panel.width("auto");
			}
			header.add(pBody)._outerWidth(panel.width());
			if(!isNaN(opts.height)) {
				panel._outerHeight(opts.height);
				pBody._outerHeight(panel.height() - header.outerHeight());
			} else {
				pBody.height("auto");
			}
			panel.css("height", "");
			this._trigger("onResize", null, {
				width : opts.width, 
				height: opts.height
			});
			// opts.onResize.apply(target, [opts.width, opts.height]);
			panel.find(">div.panel-body>div").triggerHandler("_resize");
			
		},
		/**
		 * 设置边框样式 
		 */
		_setBorder : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var header = $(target).panel("header");
			var pBody = $(target).panel("body");
			
			panel.css(opts.style);
			panel.addClass(opts.cls);
			if(opts.border) {
				header.removeClass("panel-header-noborder");
				pBody.removeClass("panel-body-noborder");
			} else {
				header.addClass("panel-header-noborder");
				pBody.addClass("panel-body-noborder");
			}
			header.addClass(opts.headerCls);
			pBody.addClass(opts.bodyCls);
			
			if(opts.id) {
				$(target).attr("id", opts.id);
			} else {
				$(target).removeAttr('id');
			}
		},
		/**
		 * 添加panel头信息 
		 */
		_addHeader : function (target){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(opts.tools && typeof opts.tools == "string") {
				panel.find(">div.panel-header>div.panel-tool .panel-tool-a").appendTo(opts.tools);
			}
			self._removeNode(panel.children("div.panel-header"));
			if(opts.title && !opts.noheader) {
				var header = $("<div class=\"panel-header\"><div class=\"panel-title\">" + opts.title + "</div></div>").prependTo(panel);
				if(opts.iconCls) {
					header.find(".panel-title").addClass("panel-with-icon");
					$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(header);
				}
				var tool = $("<div class=\"panel-tool\"></div>").appendTo(header);
				if(opts.tools) {
					if( typeof opts.tools == "string") {
						$(opts.tools).children().each(function() {
							$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
						});
					} else {
						for(var i = 0; i < opts.tools.length; i++) {
							var tl = opts.tools[i];
							var t = $("<a href=\"javascript:void(0)\" class='ui-icon'></a>").addClass(tl.iconCls).appendTo(tool);
							if(tl.handler) {
								t.click(function(event){
									tl.handler.call(this, self, event);
								});
								//t.bind("click", eval(opts.tools[i].handler));
							}
						}
					}
				}
				if(opts.collapsible) {
					$("<a class=\"panel-tool-collapse\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						
						if(opts.collapsed == true) {
							self._expandPanel(target, true);
						} else {
							self._collapsePanel(target, true);
						}
						return false;
					});
				}
				if(opts.minimizable) {
					$("<a class=\"panel-tool-min\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						self._minimizePanel(target);
						return false;
					});
				}
				if(opts.maximizable) {
					$("<a class=\"panel-tool-max\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						if(opts.maximized == true) {
							self._restorePanel(target);
						} else {
							self._maximizePanel(target);
						}
						return false;
					});
				}
				if(opts.closable) {
					$("<a class=\"panel-tool-close\" href=\"javascript:void(0)\"></a>").appendTo(tool).bind("click", function() {
						self._closePanel(target);
						return false;
					});
				}
				panel.children("div.panel-body").removeClass("panel-body-noheader");
			} else {
				panel.children("div.panel-body").addClass("panel-body-noheader");
			}
		},
		/**
		 * 还原panel 
		 */
		_restorePanel  : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var tool = panel.children("div.panel-header").find("a.panel-tool-max");
			if(opts.maximized == false) {
				return;
			}
			panel.show();
			tool.removeClass("panel-tool-restore");
			var original = $.data(target, "panel").original;
			opts.width = original.width;
			opts.height = original.height;
			opts.left = original.left;
			opts.top = original.top;
			opts.fit = original.fit;
			this._setSize(target);
			opts.minimized = false;
			opts.maximized = false;
			$.data(target, "panel").original = null;
			this._trigger("onRestore");
		},
		/*
		 * 最大化panel
		 */
		_maximizePanel : function (target){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var tool = panel.children("div.panel-header").find("a.panel-tool-max");
			if(opts.maximized == true) {
				return;
			}
			tool.addClass("panel-tool-restore");
			if(!$.data(target, "panel").original) {
				$.data(target, "panel").original = {
					width : opts.width,
					height : opts.height,
					left : opts.left,
					top : opts.top,
					fit : opts.fit
				};
			}
			opts.left = 0;
			opts.top = 0;
			opts.fit = true;
			this._setSize(target);
			opts.minimized = false;
			opts.maximized = true;
			this._trigger("onMaximize");
		},
		/**
		 * 最小化panel 
		 */
		_minimizePanel : function (target){
			var opts  =$.data(target, "panel").options;
			var panel = $.data(target,'panel').panel;
			panel.hide();
			opts.minimized = true;
			opts.maximized = false;
			this._trigger("onMinimize");
		},
		/**
		 * 删除节点 
		 */
		_removeNode : function (node){
			node.each(function(){
				$(this).remove();
				if ($.browser.msie){
					this.outerHTML = '';
				}
			});
		},
		/**
		 * 关闭panel 
		 */
		_closePanel : function (target, forceClose){
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			if(forceClose != true) {
				if (this._trigger("onBeforeClose") == false) return;
				// if(opts.onBeforeClose.call(target) == false) {
					// return;
				// }
			}
			panel.hide();
			opts.closed = true;
			this._trigger("onClose");
		},
		/**
		 * 展开面板
 	 	 * @param {Object} animate
		 */
		_expandPanel : function (target, animate){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var pBody = panel.children("div.panel-body");
			var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
			if(opts.collapsed == false) {
				return;
			}
			pBody.stop(true, true);
			if(self._trigger('onBeforeExpand') == false){
				return;
			}
			// if(opts.onBeforeExpand.call(target) == false) {
				// return;
			// }
			tool.removeClass("panel-tool-expand");
			if(animate == true) {
				pBody.slideDown("normal", function() {
					opts.collapsed = false;
					self._trigger('onExpand');
					//opts.onExpand.call(target);
					self._loadData(target);
					self._panelResize(target);
				});
			} else {
				pBody.show();
				opts.collapsed = false;
				self._trigger('onExpand');
				//opts.onExpand.call(target);
				self._loadData(target);
				self._panelResize(target);
			}
		},
		/**
		 * 调用resize事件 
		 */
		_panelResize : function (target){
			$(target).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function() {
				$(this).triggerHandler("_resize", [true]);
			});
		},
		/**
		 * 加载数据 
		 */
		_loadData : function (target){
			var state = $.data(target, "panel");
			if(state.options.href && (!state.isLoaded || !state.options.cache)) {
				state.isLoaded = false;
				// TODO
				//_1d(target);
				var pBody = state.panel.find(">div.panel-body");
				if(state.options.loadingMsg) {
					pBody.html($("<div class=\"panel-loading\"></div>").html(state.options.loadingMsg));
				}
				$.ajax({
					url : state.options.href,
					cache : false,
					success : function(data) {
						pBody.html(state.options.extractor.call(target, data));
						// if($.parser) {
							// $.parser.parse(body);
						// }
						//panel.options.onLoad.apply(target, arguments);
						this._trigger('onLoad', null, arguments);
						state.isLoaded = true;
					}
				});
			}
		},
		/**
		 * 收缩面板
 	 	 * @param {Object} animate
		 */
		_collapsePanel : function (target, animate){
			var self = this;
			var opts = $.data(target, "panel").options;
			var panel = $.data(target, "panel").panel;
			var pBody = panel.children("div.panel-body");
			var tool = panel.children("div.panel-header").find("a.panel-tool-collapse");
			if(opts.collapsed == true) {
				return;
			}
			pBody.stop(true, true);
			if(self._trigger('onBeforeCollapse') == false){
				return;
			}
			// if(opts.onBeforeCollapse.call(target) == false) {
				// return;
			// }
			tool.addClass("panel-tool-expand");
			if(animate == true) {
				pBody.slideUp("normal", function() {
					opts.collapsed = true;
					self._trigger('onCollapse');
				});
			} else {
				pBody.hide();
				opts.collapsed = true;
				self._trigger('onCollapse');
			}
		}
	});
})(jQuery);


/***********************/
/** skyeagle.ui.searchbox.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.08.21
 * @description  基于easy UI扩展的searchbox组件
 */
(function($) {
	$.widget("ui.searchbox" , {
		version: "@VERSION",
		options : {
			// 宽度
			width : "auto",
			// 显示在搜索框的提示信息
			prompt : "",
			// 搜索框的默认值
			value : "",
			// 搜索类型下拉菜单
			menu : null
		},
		getOptions : function (){
			return $.data(this.element, "searchbox").options;
		},
		menu : function (){
			return $.data(this.element, "searchbox").menu;
		},
		textbox : function (){
			return $.data(this.element, "searchbox").searchbox.find("input.searchbox-text");
		},
		getValue : function (){
			return $.data(this.element, "searchbox").options.value;
		},
		setValue : function (value){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				$(ele).searchbox("options").value = value;
				$(ele).searchbox("textbox").val(value);
				$(ele).searchbox("textbox").blur();
			});
		},
		getName : function (){
			return $.data(this.element, "searchbox").searchbox.find("input.searchbox-text").attr("name");
		},
		selectName : function (name){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				var menu = $.data(this, "searchbox").menu;
				if(menu) {
					menu.children("div.menu-item[name=\"" + name + "\"]").triggerHandler("click");
				}
			});
		},
		destroy : function (){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				var menu = $(this).searchbox("menu");
				if(menu) {
					menu.menu("destroy");
				}
				$.data(this, "searchbox").searchbox.remove();
				$(this).remove();
			});
		},
		resize : function (width){
			var self = this,
				ele  = self.element;
			return ele.each(function() {
				self._setTextSize(ele, width);
			});
		},
		/**
		 * 当用户点击搜索按钮或者按下ENTER键的时候搜索函数将被调用 
		 */
		onSearcher : function (value, name){},
		/**
		 * 初始化 
		 */
		_init : function (){
			var self = this,
				opts = self.options;
				ele  = self.element;
			var state = $.data(ele, "searchbox");
			if(state) {
				$.extend(state.options, opts);
			}else{
				state = $.data(ele, "searchbox", {
					options : $.extend({}, opts),
					searchbox : self._wrapSearchBox(ele)
				});
			}
			self._initMenu(ele);
			self._setValue(ele);
			self._bindEvents(ele);
			self._setTextSize(ele);
		},
		/**
		 * 绑定事件 
		 */
		_bindEvents : function (target){
			var self = this;
			var state = $.data(target, "searchbox");
			var opts = state.options;
			var text = state.searchbox.find("input.searchbox-text");
			var button = state.searchbox.find(".searchbox-button");
			text.unbind(".searchbox").bind("blur.searchbox", function(e) {
				opts.value = $(this).val();
				if(opts.value == "") {
					$(this).val(opts.prompt);
					$(this).addClass("searchbox-prompt");
				} else {
					$(this).removeClass("searchbox-prompt");
				}
			}).bind("focus.searchbox", function(e) {
				if($(this).val() != opts.value) {
					$(this).val(opts.value);
				}
				$(this).removeClass("searchbox-prompt");
			}).bind("keydown.searchbox", function(e) {
				if(e.keyCode == 13) {
					e.preventDefault();
					var name = $.fn.prop ? text.prop("name") : text.attr("name");
					opts.value = $(this).val();
					self._trigger('onSearcher', e, {
						value : opts.value,
						name  : name
					});
					//opts.searcher.call(target, opts.value, name);
					return false;
				}
			});
			button.unbind(".searchbox").bind("click.searchbox", function(e) {
				var name = $.fn.prop ? text.prop("name") : text.attr("name");
				self._trigger('onSearcher', e, {
					value : opts.value,
					name  : name
				});
				//opts.searcher.call(target, opts.value, name);
			}).bind("mouseenter.searchbox", function() {
				$(this).addClass("searchbox-button-hover");
			}).bind("mouseleave.searchbox", function() {
				$(this).removeClass("searchbox-button-hover");
			});
		},
		/**
		 * 设置搜索框输入值 
		 */
		_setValue : function (target){
			var state = $.data(target, "searchbox");
			var opts = state.options;
			var text = state.searchbox.find("input.searchbox-text");
			if(opts.value == "") {
				text.val(opts.prompt);
				text.addClass("searchbox-prompt");
			} else {
				text.val(opts.value);
				text.removeClass("searchbox-prompt");
			}
		},
		/**
		 * 初始化menu 
		 */
		_initMenu : function (target){
			var self = this;
			var state = $.data(target, "searchbox");
			var opts = state.options;
			if(opts.menu) {
				state.menu = $(opts.menu).menu({
					onClick : function(event, item) {
						initMenuButton(item);
					}
				});
				var item = state.menu.children("div.menu-item:first[selected]");
				if(!item.length) {
					item = state.menu.children("div.menu-item:first");
				}
				item.triggerHandler("click");
			} else {
				state.searchbox.find("a.searchbox-menu").remove();
				state.menu = null;
			}
			function initMenuButton(item) {
				state.searchbox.find("a.searchbox-menu").remove();
				
				var mb = $("<a class=\"searchbox-menu\" href=\"javascript:void(0)\"></a>").html(item.text);
				
				mb.prependTo(state.searchbox).menubutton({
					menu : state.menu,
					iconCls : item.iconCls
				});
				state.searchbox.find("input.searchbox-text").attr("name", $(item.target).attr("name") || item.text);
				self._setTextSize(target);
			};
		},
		/**
		 * 设置 输入框大小
		 */
		_setTextSize : function (target, width){
			var opts = $.data(target, "searchbox").options;
			var sb = $.data(target, "searchbox").searchbox;
			if(width) {
				opts.width = width;
			}
			sb.appendTo("body");
			if(isNaN(opts.width)) {
				opts.width = sb.outerWidth();
			}
			sb._outerWidth(opts.width);
			sb.find("input.searchbox-text")._outerWidth(sb.width() - sb.find("a.searchbox-menu").outerWidth() - sb.find("span.searchbox-button").outerWidth());
			sb.insertAfter(target);
		},
		/**
		 * 初始化DOM元素 
 		 * @param {Object} target
		 */
		_wrapSearchBox : function (target){
			$(target).hide();
			var searchbox = $("<span class=\"searchbox\"></span>").insertAfter(target);
			var searchText = $("<input type=\"text\" class=\"searchbox-text\">").appendTo(searchbox);
			$("<span><span class=\"searchbox-button\"></span></span>").appendTo(searchbox);
			var name = $(target).attr("name");
			if(name) {
				searchText.attr("name", name); 
				$(target).removeAttr("name").attr("searchboxName", name);
			}
			return searchbox;
		}
	});
})(jQuery);



/***********************/
/** skyeagle.ui.toolbar.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.04
 * @description  基于jquery UI扩展的menu组件
 */
(function($) {
	
	
	$.widget('ui.toolbar', {
		/**
		 * 配置选项 
		 */
		options: {
			/**
			 * 数据项集合
			 * 可选属性为: 
			 * type : 为button、menubutton
			 * options : button或menubutton内置属性、
			 * line : 是否在项后显示分隔符
			 */
			item : [],
			/**
			 * 宽度 
			 */
			width : 'auto'
		},
		/**
		 * 创建时触发 
		 */
		onCreate : function (){},
		/**
		 * 初始化 
		 */
		_init : function (){
			var self = this,
				opts = self.options;
				ele  = self.element;
			var state = $.data(ele, "toolbar");
			if(state) {
				$.extend(state.options, opts);  
			}else{
				state = $.data(ele, "toolbar", {
					options : $.extend({}, opts),
					searchbox : self._wrapToolbar(ele)
				});
			}
			self._initItems(ele);
			self._setScroll(ele);
			self._bindEvents(ele);
		},
		/**
		 * 设置滚动按钮  
		 */
		_setScroll : function (target){
			var self = this,
				opts = self.options;
			if(opts.width !== 'auto'){
				target.width(opts.width);
			}
			var items = $.data(target, 'toolbar').items;	
			var totalWidth = 0;
			items.children().each(function() {
				totalWidth += $(this).outerWidth(true);
			});
			if(totalWidth > target.outerWidth()){
				items.before('<span class="toolbar-scroll-left toolbar-scroll-disabled"></span>');
				items.after('<span class="toolbar-scroll-right"></span>');
				
				items.css({
					left : '20px'
				});
			}
		},
		/**
		 * 绑定事件 
		 */
		_bindEvents : function (target){
			var items = $.data(target, 'toolbar').items;
			var totalWidth = 0;
			items.children().each(function() {
				totalWidth += $(this).outerWidth(true);
			});
			var scrollLeft  = target.find('.toolbar-scroll-left');
			var scrollRight = target.find('.toolbar-scroll-right');
			scrollRight.click(function() {
				if($(this).hasClass('toolbar-scroll-disabled')){
					return;
				}
				// var prevOff = items.prev().offset();
				var nextOff = items.next().offset();
				var itemOff = items.offset();
				
				items.animate({
	                left : -(totalWidth - nextOff.left) + 'px'
	            },'normal', 'swing', function() {
	            	if(scrollLeft.hasClass('toolbar-scroll-disabled')){
	            		scrollLeft.removeClass('toolbar-scroll-disabled');
	            	}
					scrollRight.addClass('toolbar-scroll-disabled');
				});
			});
			scrollLeft.click(function (){
				if($(this).hasClass('toolbar-scroll-disabled')){
					return;
				}
				var itemOff = items.offset();
				
				items.animate({
	                left : 20 + 'px'
	            },'normal', 'swing', function() {
	            	if(scrollRight.hasClass('toolbar-scroll-disabled')){
	            		scrollRight.removeClass('toolbar-scroll-disabled');
	            	}
					scrollLeft.addClass('toolbar-scroll-disabled');
				});
			});
		},
		/*
		 *  添加DOM信息
		 */
		_wrapToolbar : function (target){
			var self = this,
				ele  = self.element;
			ele.addClass('toolbar');
		},
		/**
		 * 初始化项元素 
 		 * @param {Object} target
		 */
		_initItems : function (target){
			var self = this,
				opts = self.options;
				ele  = self.element;
			var items = opts.item;
			var itemsHtml = $('<div class="toolbar-items"></div>');
			if(items && items.length > 0){
				for(var i = 0; i < items.length; i++){
					var item = items[i];
					var html = self._createItem(target, item);
					//html.addClass('ui-state-hover');
					html ? itemsHtml.append(html) : false;
					if(item.line){
						itemsHtml.append($('<span class="line-separator"></span>'));
					}
				}
			}
			ele.append(itemsHtml);
			$.data(ele, 'toolbar', {
				items : itemsHtml
			});
			self._trigger('onCreate', null);
		},
		/**
		 * 创建单个项 
 		 * @param {Object} target
		 */
		_createItem : function (target, item){
			var self = this,
				ele  = self.element;
				html = null;
			if(item.type != null){
				var itemOpts = item.options;
				
				switch (item.type){
					case 'button':
						html = $('<a></a>');
						html.button(itemOpts);
						break;
					case 'menubutton':
						html = $('<a></a>');
						html.menubutton(itemOpts);
						break;
				}
			}
			return html;
		}
		
	});
})(jQuery);



/***********************/
/** skyeagle.ui.tree.js **/
/***********************/
/**
 * @auth 	 	 jacksyen
 * @created 	 2012.07.30 
 * @description  基于jquery UI、easyUI扩展的tree组件
 */
(function($) {
	
    $.widget("ui.tree" , {
		options : {
			// 用以载入远程数据的超链接地址
		   	url : null,
		   	// 请求远程数据时的方法
			method : "get",
			// 定义当节点打开或关闭时是否显示动画效果
			animate : false,
			// 是否在每个节点前显示复选框
			checkbox : false,
			// 是否支持级联选择
			cascadeCheck : true,
			// 是否只在叶子前显示复选框
			onlyLeafCheck : false,
			// 是否显示节点之前的连接线
			lines : false,
			// 定义是否支持拖放
			dnd : false,
			// 将被载入的节点数据
			data : null,
			// 加载数据时执行，reutrn false终止操作
			loader : function(param, success, errors) {
				var opts = $(this).tree('getOptions');
				if(!opts.url) {
					return false;
				}
				$.ajax({
					type : opts.method,
					url : opts.url,
					data : param,
					dataType : "json",
					success : function(data) {
						success(data);
					},
					error : function() {
						errors.apply(this.element, arguments);
					}
				});
			},
			// 加载数据时的过滤器
			loadFilter : function(data, parent) {
				return data;
			},
			/**
			 * 当用户点击节点时触发，node参数包含如下属性：
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onClick : function (event, ui){},
			/**
			 * 当用户双击节点时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onDblClick : function (event, ui){},
			/**
			 * 在请求载入数据之前触发，返回false将取消载入。
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.param 请求参数
			 */
			onBeforeLoad : function (event, ui){},
			/**
			 * 当数据载入成功时触发
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.data  返回数据
			 */
			onLoadSuccess : function (event, ui){},
			/**
			 *  当数据载入失败时触发
			 * 		ui.arguments参数跟jQuery.ajax的'error'函数一样
			 */
			onLoadError : function (event, ui){},
			/**
			 * 在节点打开之前触发，返回false将取消打开 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onBeforeExpand : function (event, ui){},
			/**
			 * 在节点被打开时触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onExpand : function (event, ui){},
			/**
			 * 在节点被关闭之前触发，返回false将取消关闭
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onBeforeCollapse : function (event, ui){},
			/**
			 * 当节点被关闭时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onCollapse : function (event, ui){},
			/**
			 * 当用户点击复选框时触发
			 *  	ui.node.id 		节点ID
			 * 		ui.node.text 	显示在节点上的文本
			 * 		ui.node.checked  节点是否被选择。
			 *		ui.node.attributes 节点的自定义属性。
			 *		ui.node.target   被点击的目标DOM对象。 
			 * 		
			 * 		ui.checked  是否选中
			 */
			onCheck : function (event, ui){},
			/**
			 *  在节点被选择之前触发，返回false将取消选择
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onBeforeSelect : function (event, ui){},
			/**
			 * 当节点被选择时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。 
			 */
			onSelect : function (event, ui){},
			/**
			 * 当节点被鼠标右键点击时触发 
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onContextMenu : function (event, node){},
			/**
			 * 当节点位置被（拖动）更换时触发
			 * 		ui.target 	DOM对象，需要被拖动动的目标节点。
			 *		ui.source   原始节点。
			 *		ui.point    指明拖动方式，可选值：'append'，'top'或者'bottom'。
			 */
			onDrop : function (event, ui){},
			/**
			 *	在编辑节点之前触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onBeforeEdit : function (event, node){},
			/**
			 *	在编辑节点之后触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onAfterEdit : function (event, node){},
			/**
			 *	当取消编辑时触发
			 *  	ui.id 		节点ID
			 * 		ui.text 	显示在节点上的文本
			 * 		ui.checked  节点是否被选择。
			 *		ui.attributes 节点的自定义属性。
			 *		ui.target   被点击的目标DOM对象。  
			 */
			onCancelEdit : function (event, node){}
		},
		/**
		 * 返回树形菜单属性对象 
		 */
		getOptions : function (){
			return $.data(this.element, "tree").options;
		},
		/**
		 * 载入树形菜单数据
		 * @param data   
		 */
		loadData : function (data){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._loadData(ele, ele, data);
			});
		},
		/**
		 * 获取特定的节点对象
		 * @param target  
		 */
		getNode : function (target){
			return this._getParentNode(this.element, target);
		},
		/**
		 *  获取特定的节点数据，包括它的子节点
		 */
		getData : function (target){
			return this._getData(this.element, target);
		},
		/**
		 * 重新载入树形菜单数据 
		 */
		reload : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				if(target) {
					var tt = $(target);
					var hit = tt.children("span.tree-hit");
					hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
					tt.next().remove();
					self._expandNode(ele, target);
				} else {
					$(ele).empty();
					self._load(ele, ele);
				}
			});
		},
		/**
		 * 获取根节点，返回节点对象 
		 */
		getRoot : function (){
			return this._getRoot(this.element);
		},
		/**
		 * 获取根节点，返回节点数组 
		 */
		getRoots : function (){
			return this._getLiNode(this.element);
		},
		/**
		 * 获取父节点，target是一个节点DOM对象
		 */
		getParent : function (target){
			return this._getPrevNode(this.element, target);
		},
		/**
		 * 获取子节点，target参数是一个节点DOM对象 
		 */
		getChildren : function (target){
			return this._getChildren(this.element, target);
		},
		/**
		 * 获取所有被选择的节点 
		 */
		getChecked : function (){
			return this._getChecked(this.element);
		},
		/**
		 * 获取被选择的节点并返回，如果没有节点被选择则返回null 
		 */
		getSelected : function () {
			return this._nodeSelected(this.element);
		},
		/**
		 * 判断指定的节点是否是叶子节点，target参数是一个节点DOM对象 
		 */
		isLeaf : function (target){
			return this._isTreeHit(this.element, target);
		},
		/**
		 * 查找指定的节点并返回节点对象 
		 */
		find : function (id){
			return this._find(this.element, id);
		},
		/**
		 * 选择一个节点，target参数是一个节点DOM对象 
		 */
		select : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._selectNode(ele, target);
			});
		},
		/**
		 * 设置指定的节点为已选择状态 
		 */
		check : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._checkNode(ele, target, true);
			});
		},
		/**
		 * 设置指定的节点为未选择状态 
		 */
		uncheck : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._checkNode(ele, target, false);
			});
		},
		/**
		 * 关闭节点，target参数是一个节点DOM对象 
		 */
		collapse : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._collapseNode(ele, target);
			});
		},
		/**
		 * 打开节点，target参数是一个节点DOM对象 
		 */
		expand : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._expandNode(ele, target);
			});
		},
		/**
		 *  关闭所有的节点
		 */
		collapseAll : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._collapseAll(ele, target);
			});
		},
		/**
		 * 打开所有的节点 
		 */
		expandAll : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._expandAll(ele, target);
			});
		},
		/**
		 * 打开从根节点到指定节点之间的所有节点 
		 */
		expandTo : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._expandTo(ele, target);
			});
		},
		/**
		 *  添加若干子节点到一个父节点，param参数有2个属性：
		 * 		parent：DOM对象，将要被添加子节点的父节点，如果未指定，子节点将被添加至根节点
		 * 		data：数组，节点数据
		 */
		append : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._appendNode(ele, param);
			});
		},
		/**
		 *  打开或关闭节点的触发器，target参数是一个节点DOM对象
		 */
		toggle : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._toggleNode(ele, target);
			});
		},
		/**
		 *  在一个指定节点之前或之后插入节点，'param'参数包含如下属性：
		 * 		before：DOM对象，在某个节点之前插入
		 * 		after: DOM对象，在某个节点之后插入
		 * 		data：对象，节点数据
		 */
		insert : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._insertNode(ele, param);
			});
		},
		/**
		 * 移除一个节点和它的子节点，target参数是一个节点DOM对象 
		 */
		remove : function (target){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._removeNode(ele, target);
			});
		},
		/**
		 * 移除一个节点和它的子节点，该方法跟remove方法一样，不同的是它将返回被移除的节点数据 
		 */
		pop : function (target){
			var data = this.element.tree("getData", target);
			this.element.tree("remove", target);
			return data;
		},
		/**
		 * 更新指定的节点，param参数有如下属性：
		 * 		target(DOM对象，将被更新的目标节点)，id，text，iconCls，checked等。 
		 */
		update : function (param){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._update(ele, param);
			});
		},
		/**
		 * 启用拖动特性 
		 */
		enableDnd : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				// TODO enableDnd
				//_15(ele);
			});
		},
		/**
		 * 禁用拖动特性 
		 */
		disableDnd : function (){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				// TODO disableDnd
				// _12(ele);
			});
		},
		/**
		 *  开始编辑节点
		 */
		beginEdit : function (nodeEl){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._beginEdit(ele, nodeEl);
			});
		},
		/**
		 * 结束编辑节点 
		 */
		endEdit : function (nodeEl){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._afterEdit(ele, nodeEl);
			});
		},
		/**
		 * 取消编辑节点 
		 */
		cancelEdit : function (nodeEl){
			var self = this;
				ele  = this.element;
			return ele.each(function() {
				self._cancelEdit(ele, nodeEl);
			});
		},
		_beginEdit : function (target, nodeEl){
			var self = this;
			var opts = $.data(target, "tree").options;
			var pNode = this._getParentNode(target, nodeEl);
			if(self._trigger('onBeforeEdit', null, pNode) == false){
				return;
			}
			// if(opts.onBeforeEdit.call(target, pNode) == false) {
				// return;
			// }
			$(nodeEl).css("position", "relative");
			var nt = $(nodeEl).find(".tree-title");
			var oWidth = nt.outerWidth();
			nt.empty();
			var editor = $("<input class=\"tree-editor\">").appendTo(nt);
			editor.val(pNode.text).focus();
			editor.width(oWidth + 20);
			editor.height(document.compatMode == "CSS1Compat" ? (18 - (editor.outerHeight() - editor.height())) : 18);
			editor.bind("click", function(e) {
				return false;
			}).bind("mousedown", function(e) {
				e.stopPropagation();
			}).bind("mousemove", function(e) {
				e.stopPropagation();
			}).bind("keydown", function(e) {
				if(e.keyCode == 13) {
					self._afterEdit(target, nodeEl);
					return false;
				} else {
					if(e.keyCode == 27) {
						self._cancelEdit(target, nodeEl);
						return false;
					}
				}
			}).bind("blur", function(e) {
				e.stopPropagation();
				self._afterEdit(target, nodeEl);
			});
		},
		_cancelEdit : function (target, nodeEl){
			var opts = $.data(target, "tree").options;
			$(nodeEl).css("position", "");
			$(nodeEl).find("input.tree-editor").remove();
			var pNode = this._getParentNode(target, nodeEl);
			this._update(target, pNode);
			this._trigger('onCancelEdit', null, pNode);
			// opts.onCancelEdit.call(target, pNode);
		},
		_afterEdit : function (target, nodeEl){
			var opts = $.data(target, "tree").options;
			$(nodeEl).css("position", "");
			var editor = $(nodeEl).find("input.tree-editor");
			var val = editor.val();
			editor.remove();
			var pNode = this._getParentNode(target, nodeEl);
			pNode.text = val;
			this._update(target, pNode);
			this._trigger('onAfterEdit', null, pNode);
			// opts.onAfterEdit.call(target, pNode);
		},
		_update : function (target, param){
			var tt = $(param.target);
			var node = $.data(param.target, "tree-node");
			if(node.iconCls) {
				tt.find(".tree-icon").removeClass(node.iconCls);
			}
			$.extend(node, param);
			$.data(param.target, "tree-node", node);
			tt.attr("node-id", node.id);
			tt.find(".tree-title").html(node.text);
			if(node.iconCls) {
				tt.find(".tree-icon").addClass(node.iconCls);
			}
			var ck = tt.find(".tree-checkbox");
			ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
			if(node.checked) {
				this._checkNode(target, param.target, true);
			} else {
				this._checkNode(target, param.target, false);
			}
		},
		_removeNode : function (target, node){
			var prevNode = this._getPrevNode(target, node);
			var pNode = $(node);
			var li = pNode.parent();
			var ul = li.parent();
			li.remove();
			if(ul.children("li").length == 0) {
				var pNode = ul.prev();
				pNode.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
				pNode.find(".tree-hit").remove();
				$("<span class=\"tree-indent\"></span>").prependTo(pNode);
				if(ul[0] != target) {
					ul.remove();
				}
			}
			if(prevNode) {
				this._appendCheckNode(target, prevNode.target);
			}
			this._joinNode(target, target);
		},
		_insertNode : function (target, param){
			var ref = param.before || param.after;
			var node = this._getPrevNode(target, ref);
			var li;
			if(node) {
				this._appendNode(target, {
					parent : node.target,
					data : [param.data]
				});
				li = $(node.target).next().children("li:last");
			} else {
				this._appendNode(target, {
					parent : null,
					data : [param.data]
				});
				li = $(target).children("li:last");
			}
			if(param.before) {
				li.insertBefore($(ref).parent());
			} else {
				li.insertAfter($(ref).parent());
			}
		},
		_appendNode : function (target, param){
			var parent = $(param.parent);
			var ul;
			if(parent.length == 0) {
				ul = $(target);
			} else {
				ul = parent.next();
				if(ul.length == 0) {
					ul = $("<ul></ul>").insertAfter(parent);
				}
			}
			if(param.data && param.data.length) {
				var tree = parent.find("span.tree-icon");
				if(tree.hasClass("tree-file")) {
					tree.removeClass("tree-file").addClass("tree-folder");
					var hit = $("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(tree);
					if(hit.prev().length) {
						hit.prev().remove();
					}
				}
			}
			this._loadData(target, ul[0], param.data, true);
			this._appendCheckNode(target, ul.prev());
		},
		_appendCheckNode : function (target, node){
			var self = this;
			var opts = $.data(target, "tree").options;
			var pNode = $(node);
			if(self._isTreeHit(target, node)) {
				var ck = pNode.find(".tree-checkbox");
				if(ck.length) {
					if(ck.hasClass("tree-checkbox1")) {
						self._checkNode(target, node, true);
					} else {
						self._checkNode(target, node, false);
					}
				} else {
					if(opts.onlyLeafCheck) {
						$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(pNode.find(".tree-title"));
						self._bindEvents(target);
					}
				}
			} else {
				var ck = pNode.find(".tree-checkbox");
				if(opts.onlyLeafCheck) {
					ck.remove();
				} else {
					if(ck.hasClass("tree-checkbox1")) {
						self._checkNode(target, node, true);
					} else {
						if(ck.hasClass("tree-checkbox2")) {
							var nodeCheck1 = true;
							var nodeCheck2 = true;
							var children = self._getChildren(target, node);
							for(var i = 0; i < children.length; i++) {
								if(children[i].checked) {
									nodeCheck2 = false;
								} else {
									nodeCheck1 = false;
								}
							}
							if(nodeCheck1) {
								self._checkNode(target, node, true);
							}
							if(nodeCheck2) {
								self._checkNode(target, node, false);
							}
						}
					}
				}
			}
		},
		_expandTo : function (target, node){
			var result = [];
			var p = this._getPrevNode(target, node);
			while(p) {
				result.unshift(p);
				p = this._getPrevNode(target, p.target);
			}
			for(var i = 0; i < result.length; i++) {
				this._expandNode(target, result[i].target);
			}
		},
		_expandAll : function (target, node){
			var children = this._getChildren(target, node);
			if(node) {
				children.unshift(this._getParentNode(target, node));
			}
			for(var i = 0; i < children.length; i++) {
				this._expandNode(target, children[i].target);
			}
		},
		_collapseAll : function (target, node){
			var children = this._getChildren(target, node);
			if(node) {
				children.unshift(this._getParentNode(target, node));
			}
			for(var i = 0; i < children.length; i++) {
				this._collapseNode(target, children[i].target);
			}
		},
		_find : function (target, id){
			var treeNode = $(target).find("div.tree-node[node-id=" + id + "]");
			if(treeNode.length) {
				return this._getParentNode(target, treeNode[0]);
			} else {
				return null;
			}
		},
		_getChecked : function (target){
			var result = [];
			var self = this;
			$(target).find(".tree-checkbox1").each(function() {
				var parent = $(this).parent();
				result.push(self._getParentNode(target, parent[0]));
			});
			return result;
		},
		_getChildren : function (target, thead){
			var self = this;
			var result = [];
			if(thead) {
				setNode($(thead));
			} else {
				var nodeAttr = self._getLiNode(target);
				for(var i = 0; i < nodeAttr.length; i++) {
					result.push(nodeAttr[i]);
					setNode($(nodeAttr[i].target));
				}
			}
			function setNode(that) {
				that.next().find("div.tree-node").each(function() {
					result.push(self._getParentNode(target, this));
				});
			};
			return result;
		},
		_getRoot : function (target){
			var nodeAttr = this._getLiNode(target);
			if(nodeAttr.length) {
				return nodeAttr[0];
			} else {
				return null;
			}
		},
		_getLiNode : function (target){
			var result = [];
			var self = this;
			$(target).children("li").each(function() {
				var treeNode = $(this).children("div.tree-node");
				result.push(self._getParentNode(target, treeNode[0]));
			});
			return result;
		},
		_getData : function (target, thead){
			var self = this;
			function pushData(aa, ul) {
				ul.children("li").each(function() {
					var treeNode = $(this).children("div.tree-node");
					var pNode = self._getParentNode(target, treeNode[0]);
					var sub = $(this).children("ul");
					if(sub.length) {
						pNode.children = [];
						self._getData(pNode.children, sub);
					}
					aa.push(pNode);
				});
			};
			if(thead) {
				var node = self._getParentNode(target, thead);
				node.children = [];
				pushData(node.children, $(thead).next());
				return node;
			} else {
				return null;
			}
		},
		
		
		/**
		 * 初始化函数 
		 */
		_init : function (){
			var self = this,
				ele  = self.element;
			var state = $.data(this.element, "tree");
			var opts;
			if(state) {
				opts = $.extend(state.options, this.options);
				state.options = opts;
			} else {
				opts = $.extend({}, this.options);
				$.data(ele, "tree", {
					options : opts,
					tree : self._addStyle(ele)
				});
				var treeAttr = self._getTreeAttr(ele);
				if(treeAttr.length && !opts.data) {
					opts.data = treeAttr;
				}
			}
			if(opts.lines) {
				ele.addClass("tree-lines");
			}
			if(opts.data) {
				self._loadData(ele, ele, opts.data);
			} else {
				if(opts.dnd) {
					// TODO 拖动功能未实现
					//self._draggableNode(ele);
				} else {
					self._disableDrag(ele);
				}
			}
			self._load(ele, ele);
		},
		/**
		 * 添加样式，返回tree对象 
 		 * @param {Object} target
		 */
		_addStyle : function (target){
			return $(target).addClass('tree');
		},
		/**
		 * 得到所有的li元素集合  
 		 * @param {Object} target
		 */
		_getTreeAttr : function (target){
			var result = [];
			getTreeLi(result, $(target));
			function getTreeLi(aa, thead) {
				thead.children("li").each(function() {
					var that = $(this);
					var attr = {};
					attr.text = that.children("span").html();
					if(!attr.text) {
						attr.text = that.html();
					}
					attr.id = that.attr("id");
					attr.iconCls = that.attr("iconCls") || that.attr("icon");
					attr.checked = that.attr("checked") == "true";
					attr.state = that.attr("state") || "open";
					var ul = that.children("ul");
					if(ul.length) {
						attr.children = [];
						getTreeLi(attr.children, ul);
					}
					aa.push(attr);
				});
			};
			return result;
		},
		/**
		 * 拖动节点 
		 */
		_draggableNode : function (target){
			var self = this;
			var opts = $.data(target, "tree").options;
			var tree = $.data(target, "tree").tree;
			tree.find("div.tree-node").draggable({
				disabled : false,
				revert : true,
				cursor : "pointer",
				delay  : 15,
				// helper : function(target) {	
					// var p = $("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
					// p.html($(target).find(".tree-title").html());
					// p.hide();
					// return p;
				// },
				// deltaX : 15,
				// deltaY : 15,
				create : function(e) {
					if(e.which != 1) {
						return false;
					}
					$(this).next("ul").find("div.tree-node").droppable({
						accept : "no-accept"
					});
					var indent = $(this).find("span.tree-indent");
					if(indent.length) {
						e.data.startLeft += indent.length * indent.width();
					}
				},
				start : function() {
					// $(this).draggable("proxy").css({
						// left : -10000,
						// top : -10000
					// });
				},
				drag : function(e) {
					// var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
					// var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
					// if(d > 3) {
						// $(this).draggable("proxy").show();
					// }
					// this.pageY = e.pageY;
				},
				stop : function() {
					// $(this).next("ul").find("div.tree-node").droppable({
						// accept : "div.tree-node"
					// });
				}
			}).droppable({
				accept : "div.tree-node",
				over : function(e, ui) {
					var pageY = ui.pageY;
					var top = $(this).offset().top;
					var height = top + $(this).outerHeight();
					$(ui).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
					$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
					if(pageY > top + (height - top) / 2) {
						if(height - pageY < 5) {
							$(this).addClass("tree-node-bottom");
						} else {
							$(this).addClass("tree-node-append");
						}
					} else {
						if(pageY - top < 5) {
							$(this).addClass("tree-node-top");
						} else {
							$(this).addClass("tree-node-append");
						}
					}
				},
				out : function(e, ui) {
					$(ui).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
					$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
				},
				drop : function(e, ui) {
					var that = this;
					var append, insert;
					if($(this).hasClass("tree-node-append")) {
						append = appendNode;
					} else {
						append = insertNode;
						insert = $(this).hasClass("tree-node-top") ? "top" : "bottom";
					}
					setTimeout(function() {
						append(ui, that, insert);
					}, 0);
					$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
				}
			});
			function appendNode(thead, node) {
				var self = this;
				if(self._getParentNode(target, node).state == "closed") {
					self._expandNode(target, node, function() {
						appendDrop();
					});
				} else {
					appendDrop();
				}
				function appendDrop() {
					var pop = $(target).tree("pop", thead);
					$(target).tree("append", {
						parent : node,
						data : [pop]
					});
					self._trigger('onDrop', null,{
						target : node,
						source : pop,
						point  : 'append'
					});
				};
			};
			function insertNode(thead, node, pos) {
				var param = {};
				if(pos == "top") {
					param.before = node;
				} else {
					param.after = node;
				}
				var pop = $(target).tree("pop", thead);
				param.data = pop;
				$(target).tree("insert", param);
				self._trigger('onDrop', null,{
						target : node,
						source : pop,
						point  : pos
					});
			};
		},
		/**
		 * 禁用拖动 
		 */
		_disableDrag : function (target){
			var treeNode = $(target).find("div.tree-node");
			treeNode.draggable({
				disabled : true
			});
			treeNode.css("cursor", "pointer");
		},
		_joinNode : function (target, ul, isClear) {
			var self = this;
			var opts = $.data(target, "tree").options;
			if(!opts.lines) {
				return;
			}
			if(!isClear) {
				isClear = true;
				$(target).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
				$(target).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
				var roots = $(target).tree("getRoots");
				if(roots.length > 1) {
					$(roots[0].target).addClass("tree-root-first");
				} else {
					$(roots[0].target).addClass("tree-root-one");
				}
			}
			$(ul).children("li").each(function() {
				var treeNode = $(this).children("div.tree-node");
				var ul = treeNode.next("ul");
				if(ul.length) {
					if($(this).next().length) {
						addTreeLine(treeNode);
					}
					self._joinNode(target, ul, isClear);
				} else {
					addTreeJoin(treeNode);
				}
			});
			var node = $(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
			node.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
			function addTreeJoin(thead) {
				var icon = thead.find("span.tree-icon");
				icon.prev("span.tree-indent").addClass("tree-join");
			};
			function addTreeLine(thead) {
				var len = thead.find("span.tree-indent, span.tree-hit").length;
				thead.next().find("div.tree-node").each(function() {
					$(this).children("span:eq(" + (len - 1) + ")").addClass("tree-line");
				});
			};
		},
		/**
		 * 加载数据 
		 * @param {Object} target
		 * @param {Object} ul
		 * @param {Object} data
		 * @param {Object} isEmpty
		 */
		_loadData : function (target, ul, data, isEmpty) {
			var self = this;
			var opts = $.data(target, "tree").options;
			data = opts.loadFilter.call(target, data, $(ul).prev("div.tree-node")[0]);
			if(!isEmpty) {
				$(ul).empty();
			}
			var nodeAttr = [];
			var treeLen = $(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
			wrapNode(ul, data, treeLen);
			self._bindEvents(target);
			if(opts.dnd) {
				// TODO 拖动功能未实现
				//self._draggableNode(target);
			} else {
				self._disableDrag(target);
			}
			for(var i = 0; i < nodeAttr.length; i++) {
				self._checkNode(target, nodeAttr[i], true);
			}
			setTimeout(function() {
				self._joinNode(target, target);
			}, 0);
			var parentNode = null;
			if(target != ul) {
				var prev = $(ul).prev();
				parentNode = self._getParentNode(target, prev[0]);
			}
			self._trigger('onLoadSuccess', null, {
				node : parentNode,
				data : data
			});
			function wrapNode(ul, data, treeLen) {
				for(var i = 0; i < data.length; i++) {
					var li = $("<li></li>").appendTo(ul);
					var options = data[i];
					if(options.state != "open" && options.state != "closed") {
						options.state = "open";
					}
					var node = $("<div class=\"tree-node\"></div>").appendTo(li);
					node.attr("node-id", options.id);
					$.data(node[0], "tree-node", {
						id : options.id,
						text : options.text,
						iconCls : options.iconCls,
						attributes : options.attributes
					});
					$("<span class=\"tree-title\"></span>").html(options.text).appendTo(node);
					if(opts.checkbox) {
						if(opts.onlyLeafCheck) {
							if(options.state == "open" && (!options.children || !options.children.length)) {
								if(options.checked) {
									$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(node);
								} else {
									$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(node);
								}
							}
						} else {
							if(options.checked) {
								$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(node);
								nodeAttr.push(node[0]);
							} else {
								$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(node);
							}
						}
					}
					if(options.children && options.children.length) {
						var tempul = $("<ul></ul>").appendTo(li);
						if(options.state == "open") {
							$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(node);
						} else {
							$("<span class=\"tree-icon tree-folder\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(node);
							tempul.css("display", "none");
						}
						wrapNode(tempul, options.children, treeLen + 1);
					} else {
						if(options.state == "closed") {
							$("<span class=\"tree-icon tree-folder\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(node);
						} else {
							$("<span class=\"tree-icon tree-file\"></span>").addClass(options.iconCls).prependTo(node);
							$("<span class=\"tree-indent\"></span>").prependTo(node);
						}
					}
					for(var j = 0; j < treeLen; j++) {
						$("<span class=\"tree-indent\"></span>").prependTo(node);
					}
				}
			};
		},
		/**
		 * 得到选中的节点 
		 */
		_nodeSelected : function (target){
			var selected = $(target).find("div.tree-node-selected");
			if(selected.length) {
				return this._getParentNode(target, selected[0]);
			} else {
				return null;
			}
		},
		/**
		 * 绑定事件 
 		 * @param {Object} target
		 */
		_bindEvents : function (target){
			var self = this;
			var opts = $.data(target, "tree").options;
			var tree = $.data(target, "tree").tree;
			$("div.tree-node", tree).unbind(".tree").bind("dblclick.tree", function(event) {
				self._selectNode(target, this);
				self._trigger('onDblClick', event, self._nodeSelected(target));
			}).bind("click.tree", function(event) {
				self._selectNode(target, this);
				self._trigger('onClick', event, self._nodeSelected(target));
			}).bind("mouseenter.tree", function() {
				$(this).addClass("tree-node-hover");
				return false;
			}).bind("mouseleave.tree", function() {
				$(this).removeClass("tree-node-hover");
				return false;
			}).bind("contextmenu.tree", function(e) {
				self._trigger('onContextMenu', e, self._getParentNode(target, this));
			});
			$("span.tree-hit", tree).unbind(".tree").bind("click.tree", function() {
				var parent = $(this).parent();
				self._toggleNode(target, parent[0]);
				return false;
			}).bind("mouseenter.tree", function() {
				if($(this).hasClass("tree-expanded")) {
					$(this).addClass("tree-expanded-hover");
				} else {
					$(this).addClass("tree-collapsed-hover");
				}
			}).bind("mouseleave.tree", function() {
				if($(this).hasClass("tree-expanded")) {
					$(this).removeClass("tree-expanded-hover");
				} else {
					$(this).removeClass("tree-collapsed-hover");
				}
			}).bind("mousedown.tree", function() {
				return false;
			});
			$("span.tree-checkbox", tree).unbind(".tree").bind("click.tree", function() {
				var parent = $(this).parent();
				self._checkNode(target, parent[0], !$(this).hasClass("tree-checkbox1"));
				return false;
			}).bind("mousedown.tree", function() {
				return false;
			});
		},
		/**
		 * 选中节点 
		 */
		_checkNode : function (target, node, isCheck){
			var self = this;
			var opts = $.data(target, "tree").options;
			if(!opts.checkbox) {
				return;
			}
			var cNode = $(node);
			var ck = cNode.find(".tree-checkbox");
			ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
			if(isCheck) {
				ck.addClass("tree-checkbox1");
			} else {
				ck.addClass("tree-checkbox0");
			}
			if(opts.cascadeCheck) {
				addCheckStyle(cNode);
				setParentCheckbox(cNode);
			}
			var pNode = self._getParentNode(target, node);
			self._trigger('onCheck', null, {
				node : pNode,
				checked : isCheck
			});
			function setParentCheckbox(thead) {
				var treeCk = thead.next().find(".tree-checkbox");
				treeCk.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
				if(thead.find(".tree-checkbox").hasClass("tree-checkbox1")) {
					treeCk.addClass("tree-checkbox1");
				} else {
					treeCk.addClass("tree-checkbox0");
				}
			};
			function addCheckStyle(thead) {
				var treeNode = self._getPrevNode(target, thead[0]);
				if(treeNode) {
					var ck = $(treeNode.target).find(".tree-checkbox");
					ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
					if(isAllSelected(thead)) {
						ck.addClass("tree-checkbox1");
					} else {
						if(isAllNull(thead)) {
							ck.addClass("tree-checkbox0");
						} else {
							ck.addClass("tree-checkbox2");
						}
					}
					addCheckStyle($(treeNode.target));
				}
				function isAllSelected(n) {
					var ck = n.find(".tree-checkbox");
					if(ck.hasClass("tree-checkbox0") || ck.hasClass("tree-checkbox2")) {
						return false;
					}
					var b = true;
					n.parent().siblings().each(function() {
						if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")) {
							b = false;
						}
					});
					return b;
				};
				function isAllNull(n) {
					var ck = n.find(".tree-checkbox");
					if(ck.hasClass("tree-checkbox1") || ck.hasClass("tree-checkbox2")) {
						return false;
					}
					var b = true;
					n.parent().siblings().each(function() {
						if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")) {
							b = false;
						}
					});
					return b;
				};
			};
		},
		_getPrevNode : function (target, node){
			//////alert(('node:'+$(node).html());
			////alert(('target:'+$(target).html());
			var ul = $(node).parent().parent();
			////alert(('ul:'+ul.html());
			// TODO change equals
			if($(ul[0]).attr('id') == $(target).attr('id')) {
				return null;
			} else {
				////alert(('mm:'+ul.prev()[0]);
				return this._getParentNode(target, ul.prev()[0]);
			}
		},
		/**
		 * 获取父元素节点 
		 * @param {Object} target
		 * @param {Object} thead
		 */
		_getParentNode : function (tt, thead){
			var self = this;
			// ////alert((thead);
			var node = $.extend({}, $.data(thead, "tree-node"), {
				target : thead,
				checked : $(thead).find(".tree-checkbox").hasClass("tree-checkbox1")
			});
			// ////alert(('aa');
			if(!self._isTreeHit(tt, thead)) {
				node.state = $(thead).find(".tree-hit").hasClass("tree-expanded") ? "open" : "closed";
			}
			return node;
		},
		/**
		 * 收缩节点
		 */
		_collapseNode : function (target, node){
			var self = this;
			var opts = $.data(target, "tree").options;
			var hit = $(node).children("span.tree-hit");
			if(hit.length == 0) {
				return;
			}
			if(hit.hasClass("tree-collapsed")) {
				return;
			}
			var parentNode = self._getParentNode(target, node);
			if(self._trigger('onBeforeCollapse', null, parentNode) == false){
				return;
			}

			hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
			hit.next().removeClass("tree-folder-open");
			var ul = $(node).next();
			if(opts.animate) {
				ul.slideUp("normal", function() {
					self._trigger('onCollapse', null, parentNode);
					//opts.onCollapse.call(target, parentNode);
				});
			} else {
				ul.css("display", "none");
				self._trigger('onCollapse', null, parentNode);
				//opts.onCollapse.call(target, parentNode);
			}
		},
		/**
		 * 展开节点 
		 */
		_expandNode : function (target, node, callback){
			var self = this;
			var opts = $.data(target, "tree").options;
			var hit = $(node).children("span.tree-hit");
			if(hit.length == 0) {
				return;
			}
			if(hit.hasClass("tree-expanded")) {
				return;
			}
			var parentNode = self._getParentNode(target, node);
			if(self._trigger('onBeforeExpand', null, parentNode) == false){
				return;
			}
			hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
			hit.next().addClass("tree-folder-open");
			var ul = $(node).next();
			if(ul.length) {
				if(opts.animate) {
					ul.slideDown("normal", function() {
						self._trigger('onExpand', null, parentNode);
						if(callback) {
							callback();
						}
					});
				} else {
					ul.css("display", "block");
					self._trigger('onExpand', null, parentNode);
					if(callback) {
						callback();
					}
				}
			} else {
				var ul = $("<ul style=\"display:none\"></ul>").insertAfter(node);
				self._load(target, ul[0], {
					id : parentNode.id
				}, function() {
					if(ul.is(":empty")) {
						ul.remove();
					}
					if(opts.animate) {
						ul.slideDown("normal", function() {
							self._trigger('onExpand', null, parentNode);
							if(callback) {
								callback();
							}
						});
					} else {
						ul.css("display", "block");
						self._trigger('onExpand', null, parentNode);
						if(callback) {
							callback();
						}
					}
				});
			}
		},
		/**
		 * 加载数据 
		 */
		_load : function (target, ul, data, callback) {
			var self = this;
			var opts = $.data(target, "tree").options;
			data = data || {};
			var parentNode = null;
			if(target != ul) {
				var prev = $(ul).prev();
				parentNode = self._getParentNode(target, prev[0]);
			}
			if(self._trigger('onBeforeLoad', null, {node: parentNode, param:data}) == false){
				return;
			}
			var folder = $(ul).prev().children("span.tree-folder");
			folder.addClass("tree-loading");
			var loader = opts.loader.call(target, data, function(param) {
				folder.removeClass("tree-loading");
				//////alert(('xxxfas');
				self._loadData(target, ul, param);
				if(callback) {
					callback();
				}
			}, function() {
				folder.removeClass("tree-loading");
				self._trigger('onLoadError', null, arguments);
				if(callback) {
					callback();
				}
			});
			
			if(loader == false) {
				folder.removeClass("tree-loading");
			}
		},
		/**
		 * 收缩节点 或展开节点
		 */
		_toggleNode : function (target, node){
			var hit = $(node).children("span.tree-hit");
			if(hit.length == 0) {
				return;
			}
			if(hit.hasClass("tree-expanded")) {
				this._collapseNode(target, node);
			} else {
				this._expandNode(target, node);
			}
		},
		/**
		 * 选择节点 
 		 * @param {Object} target
		 */
		_selectNode : function (target, thead){
			var self = this;
			var opts = $.data(target, "tree").options;
			var node = self._getParentNode(target, thead);
			if(self._trigger('onBeforeSelect', null, node) == false){
				return;
			}
			$("div.tree-node-selected", target).removeClass("tree-node-selected");
			$(thead).addClass("tree-node-selected");
			self._trigger('onSelect', null, node);
		},
		/**
		 * tree是否自适应大小 
		 * @param {Object} target
		 * @param {Object} thead
		 */
		_isTreeHit : function (target, thead){
			var hit = $(thead).children("span.tree-hit");
			return hit.length == 0;
		}
    });
})(jQuery);



/***********************/
/** skyeagle.ui.window.js **/
/***********************/
/**
 * @auth 		 jacksyen
 * @created 	 2012.07.05
 * @description  基于jquery UI扩展的menubutton组件
 */
(function($) {
	function getPageArea (){
			if (document.compatMode == 'BackCompat') {
				return {
					width: Math.max(document.body.scrollWidth, document.body.clientWidth),
					height: Math.max(document.body.scrollHeight, document.body.clientHeight)
				}
			} else {
				return {
					width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
					height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
				}
			}
		}
	
	// when window resize, reset the width and height of the window's mask
	$(window).resize(function(){
		$('.window-mask').css({
			width: $(window).width(),
			height: $(window).height()
		});
		setTimeout(function(){
			$('.window-mask').css({
				width: getPageArea().width,
				height: getPageArea().height
			});
		}, 50);
	});
	
	$.widget('ui.window', {
		options : {
			zIndex: 9000,
			draggable: true,
			resizable: true,
			shadow: true,
			modal: false,
			
			// 窗口标题
			title  : 'window',
			// 是否显示折叠按钮
			collapsible : true,
			// 是否显示最小化按钮
			minimizable : true,
			// 是否显示最大化按钮
			maximizable : true,
			// 是否显示关闭按钮
			closable    : true,
			// 初始化是否关闭
			closed      : false
		},
		window : function (){
			return $.data(this.element,'window').window;
		},
		setTitle : function (param){
			var self = this;
			return self.each(function(){
				$(this).panel('setTitle', param);
			});
		},
		open : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('open', param);
			});
		},
		close : function (){
			var self = this;
			return self.element.each(function(){
				$(this).panel('close', param);
			});
		},
		destroy : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('destroy', param);
			});
		},
		refresh : function (){
			var self = this;
			return self.element.each(function(){
				$(this).panel('refresh');
			});
		},
		resize : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('resize', param);
			});
		},
		move : function (param){
			var self = this;
			return self.element.each(function(){
				$(this).panel('move', param);
			});
		},
		maximize : function (){
			var self = this;
			return self.element.each(function(){
				$(this).panel('maximize');
			});
		},
		
		_create : function (){	
			var self = this,
				ele  = self.element,
				opts = self.options,
				state = $.data(ele, 'window', {});
			
			// create window
			var win = ele.panel($.extend({}, opts, {
				border: false,
				doSize: true,	// size the panel, the property undefined in window component
				closed: true,	// close the panel
				cls: 'window',
				headerCls: 'window-header',
				bodyCls: 'window-body',
				onBeforeDestroy: function(){
					if (opts.onBeforeDestroy){
						if (opts.onBeforeDestroy.call(target) == false) return false;
					}
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.remove();
					if (state.mask) state.mask.remove();

				},
				onClose: function(){
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.hide();
					if (state.mask) state.mask.hide();
					
					
					// if (opts.onClose) opts.onClose.call(target);
				},
				onOpen: function(){
					alert('onOpen');
					var state = $.data(ele, 'window');
					if (state.mask){
						state.mask.css({
							display:'block',
							zIndex: opts.zIndex++
						});
					}
					if (state.shadow){
						state.shadow.css({
							display:'block',
							zIndex: opts.zIndex++,
							left: state.options.left,
							top: state.options.top,
							width: state.window.outerWidth(),
							height: state.window.outerHeight()
						});
					}
					state.window.css('z-index', opts.zIndex++);
					if (opts.onOpen) opts.onOpen.call(target);
					
				},
				onResize: function(width, height){
					// alert('onresize');
						
					var state = $.data(ele, 'window');
					
					if (state.shadow){
						state.shadow.css({
							left: state.options.left,
							top: state.options.top,
							width: state.window.outerWidth(),
							height: state.window.outerHeight()
						});
					}
					// if (opts.onResize) opts.onResize.call(target, width, height);
				},
				onMove: function(left, top){
					// alert('onMove');
					state = $.data(ele, 'window');
					if (state.shadow){
						state.shadow.css({
							left: state.options.left,
							top: state.options.top
						});
					}
					
					
					// if (opts.onMove) opts.onMove.call(target, left, top);
				},
				onMinimize: function(){
					
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.hide();
					if (state.mask) state.mask.hide();
										
					
					// if (opts.onMinimize) opts.onMinimize.call(target);
				},
				onBeforeCollapse: function(){
					// alert('onBeforeCollapse');
					if (opts.onBeforeCollapse){
						if (opts.onBeforeCollapse.call(target) == false) return false;
					}
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.hide();
					
				},
				onExpand: function(){
					// alert('onExpand');
					var state = $.data(ele, 'window');
					if (state.shadow) state.shadow.show();
					
					// if (opts.onExpand) opts.onExpand.call(target);
				}
			}));
			// save the window state
			state.options = win.panel('option');
			// state.opts = opts;
			state.window = win.panel('panel');
			
			// create mask
			if (state.mask) state.mask.remove();
			if (opts.modal == true){
				state.mask = $('<div class="window-mask"></div>').appendTo('body');
				state.mask.css({
	//				zIndex: $.fn.window.defaults.zIndex++,
					width: getPageArea().width,
					height: getPageArea().height,
					display: 'none'
				});
			}
			
			// create shadow
			if (state.shadow) state.shadow.remove();
			if (opts.shadow == true){
				state.shadow = $('<div class="window-shadow"></div>').insertAfter(state.window);
				state.shadow.css({
	//				zIndex: $.fn.window.defaults.zIndex++,
					display: 'none'
				});
			}
			// if require center the window
			if (opts.left == null){
				var width = opts.width;
				if (isNaN(width)){
					width = state.window.outerWidth();
				}
				opts.left = ($(window).width() - width) / 2 + $(document).scrollLeft();
			}
			if (opts.top == null){
				var height = state.window.height;
				if (isNaN(height)){
					height = state.window.outerHeight();
				}
				opts.top = ($(window).height() - height) / 2 + $(document).scrollTop();
			}
			win.window('move');
			
			if (opts.closed == false){
				win.window('open');	// open the window
			}
		},
		_init : function (){
			var self = this,
				ele  = this.element,
				opts = this.options;
			var state = $.data(ele, 'window');
			
			// function filteredUi(ui) {
				// return {
					// position: ui.position,
					// offset: ui.offset
				// };
			// }
		
			state.window.draggable({
				handle: '>div.panel-header>div.panel-title',
				disabled: state.options.draggable == false,
				cursor: 'move',
				start: function(e, ui){
					// if (state.mask) state.mask.css('z-index', opts.zIndex++);
					// if (state.shadow) state.shadow.css('z-index', opts++);
					// state.window.css('z-index', opts.zIndex++);
// 					
					// if (!state.proxy){
						// state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
					// }
					// state.proxy.css({
						// display:'none',
						// zIndex: opts.zIndex++,
						// left: ui.position.left,
						// top: ui.position.top,
						// width: ($.boxModel==true ? (state.window.outerWidth()-(state.proxy.outerWidth()-state.proxy.width())) : state.window.outerWidth()),
						// height: ($.boxModel==true ? (state.window.outerHeight()-(state.proxy.outerHeight()-state.proxy.height())) : state.window.outerHeight())
					// });
					// setTimeout(function(){
						// if (state.proxy) state.proxy.show();
					// }, 500);
				},
				drag: function(e, ui){
					// state.proxy.css({
						// display:'block',
						// left: ui.position.left,
						// top: ui.position.top,
					// });
					// return false;
				},
				stop: function(e, ui){
					// state.options.left = ui.position.left;
					// state.options.top = ui.position.top;
					// self.element.window('move');
					// state.proxy.remove();
					// state.proxy = null;
				}
			});
			
			state.window.resizable({
				disabled: state.options.resizable == false,
				start:function(e, ui){
					// if (!state.proxy){
						// state.proxy = $('<div class="window-proxy"></div>').insertAfter(state.window);
					// }
					// state.proxy.css({
						// zIndex: opts.zIndex++,
						// left: ui.position.left,
						// top: ui.position.top,
						// width: ($.boxModel==true ? ($(this).width()-(state.proxy.outerWidth()-state.proxy.width())) : $(this).width()),
						// height: ($.boxModel==true ? ($(this).height()-(state.proxy.outerHeight()-state.proxy.height())) : $(this).height())
					// });
				},
				resize: function(e, ui){
					// opts.left = ui.position.left;
					// opts.top = ui.position.top;
					// opts.height = $(this).height();
					// opts.width = $(this).width();
					// self._setSize(opts);
					// state.proxy.css({
						// left: ui.position.left,
						// top: ui.position.top,
						// width: ($.boxModel==true ? ($(this).width()-(state.proxy.outerWidth()-state.proxy.width())) : $(this).width()),
						// height: ($.boxModel==true ? ($(this).height()-(state.proxy.outerHeight()-state.proxy.height())) : $(this).height())
					// });
					// return false;
				},
				stop: function(e, ui){
					// opts.left = ui.position.left;
					// opts.top = ui.position.top;
					// opts.height = $(this).height();
					// opts.width = $(this).width();
					// self._setSize(opts);
					// state.proxy.remove();
					// state.proxy = null;
				}
			});
			state.window.css('height','');
		},
		_setSize : function (opts){
			this.element.panel('resize',{left: opts.left,top: opts.top, height: opts.height, width: opts.width});
			//$.data(this.element, 'window').window.css('height','');
		}
		
	});
})(jQuery);


/***********************/
/** jquery.ui.validatebox.js **/
/***********************/
(function($) {

	$.widget('ui.validatebox', {
		options : {
			// 验证能否为空
			required : false,
			// 提示框宽度
			tipwidth : null,
			// 验证失败提示信息
			missMsg : '输入框不能为空',
			// 宽度
			width   : null
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			var ele = this.element;
			ele.unbind();
			ele.remove();
			// this.element.remove();
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			this.element.attr('disabled','true').removeClass('validatebox-invalid');
		},
		enable : function (){
			var ele = this.element;
			if(!ele.val() || ele.val() == '') {
				ele.removeAttr('disabled').addClass('validatebox-invalid');
			} else {
				ele.removeAttr('disabled');
			}
		},
		validate : function (){
			var self = this,
				ele = self.element,
				opts = this.options;
			if(opts.required){
				var val = ele.val();
				if(!val || val === ''){
					$.data(ele, 'validate').showTip = true;
					self._validate(ele);
					return false;
				}
			}
			return true;
		},
		clear : function (){
			var val = this.element.val('');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		
		/**
		 * 设置值
		 * @param  string
		 */
		setValue : function(param) {
			if(!param) {
				return;
			}
			this.element.val(param);
			this._validate(this.element);
		},
		/*
		 * 手动触发验证事件
		 */
		txtEvent : function() {
			this._validate(this.element);
		},
		_create : function() {
			var ele = this.element,
				opts = this.options;
				
			// 初始化内存数据validate
			$.data(ele, 'validate', {
				tip : null,
				showTip : true
			});
			
			ele.addClass('validate-text').width(opts.width);
			if(opts.required) {
				ele.attr('validate-option','true');
			} else {
				ele.attr('validate-option','false');
			}
			this._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;
			// parent = ele.data('validate').parent;
			var time = null;

			ele.unbind('.validate').bind('focus.validate', function(event) {
				if(time) {
					clearInterval(time);
				}
				time = setInterval(function() {
					self._validate(ele);
				}, 200);
			}).bind('blur.validate', function(event) {
				clearInterval(time);
				time = null;
				self._hideTip(ele);
				$.data(ele, 'validate').showTip = false;
			}).bind('mouseover.validate', function(event) {
				$.data(ele, 'validate').showTip = true;
				if($(this).hasClass('validate-invalid')) {
					self._showTip(ele);
				}
			}).bind('mouseout.validate', function(event) {
				self._hideTip(ele);
				$.data(ele, 'validate').showTip = false;
			});

		},
		/**
		 * 验证输入框是否有内容
		 * 为空返回false
		 */
		_validate : function(target) {
			var showTip = $.data(target, 'validate').showTip;

			var opts = this.options, ele = this.element;

			var bVal = target.val();
			if(opts.required) {
				if(bVal == '') {
					if(!showTip) {
						return false;
					}
					target.addClass('validatebox-invalid');
					this._showTip(target);
					return false;
				}
			}
			$.data(target, 'validate').showTip = true;
			target.removeClass('validatebox-invalid');
			this._hideTip(target);
			return true;

		},
		/**
		 * 隐藏提示层
		 */
		_hideTip : function(target) {
			var tip = $.data(target, 'validate').tip;
			if(tip) {
				tip.remove();
				$.data(target, 'validate').tip = false;
			}
		},
		/**
		 * 显示提示层
		 */
		_showTip : function(target) {
			var opts = this.options;

			var tip = $.data(target, 'validate').tip;
			if(!tip) {
				tip = $('<div class="validatebox-tip">' + '<span class="validatebox-tip-content">' + '</span>' + '<span class="validatebox-tip-pointer">' + '</span>' + '</div>').appendTo('body');
				$.data(target, 'validate').tip = tip;
			}
			tip.find('.validatebox-tip-content').width(opts.tipwidth).html(opts.missMsg);
			tip.css({
				display : 'block',
				left : target.offset().left + target.outerWidth(),
				top : target.offset().top
			});
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.numberbox.js **/
/***********************/
(function($) {

	$.widget('ui.numberbox', {
		options : {
			// 是否需要验证
			required : false,
			// 设置能显示的最大值
			max : null,
			// 设置能显示的最小值
			min : null,
			// 精度设置
			precision : 2,
			// 是否需要处理精度
			parseable : true,
			// 宽度
			width     : null
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			var input = this.element,
				hidInput = $.data(this.element, 'numberbox').hid;
			input.validatebox('destroy');
			$.data(this.element, 'numberbox').hid.remove();
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			this.element.attr('disabled','true').removeClass('validatebox-invalid');
		},
		enable : function (){
			var ele = this.element;
			if(!ele.val() || ele.val() == '') {
				ele.removeAttr('disabled').addClass('validatebox-invalid');
			} else {
				ele.removeAttr('disabled');
			}
		},
		validate : function (){
			var self = this,
				ele = self.element,
				opts = this.options;
			if(opts.required){
				var val = ele.val();
				if(!val || val === ''){
					return false;
				}
			}
			return true;
		},
		clear : function (){
			this.element.val('');
			$.data(this.element, 'numberbox').hid.val('');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		setValue : function (param){
			this._addValue(param);
		},
		numberbox : function() {
			return $.data(this.element, 'numberbox').numberbox;
		},
		_create : function() {
			var self = this, ele = this.element, opts = this.options;

			ele.validatebox({
				required : opts.required,
				missMsg : '输入框不能为空',
				width : opts.width
			});
			ele.wrap($('<div></div>').addClass('numberbox'));
			var hidInput = $('<input type="hidden" class="numberbox-hidInput" />');
			ele.after(hidInput);
			$.data(ele, 'numberbox', {
				hid : hidInput,
				options : null,
				numberbox : ''
			});
			// 获得numberbox的对象
			$.data(ele, 'numberbox').numberbox = ele.parent();
			this._bindEvents();
		},
		_init : function() {
			//some code
			var self = this, ele = self.element, parent = ele.parent;
			this._addValue('');
			$.data(ele, 'numberbox').hid.val('');
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;
			ele.bind('keypress.numberbox', function(e) {
				if(e.which == 45) {//-
					return true;
				}
				if(e.which == 46) {//.
					return true;
				} else if((e.which >= 48 && e.which <= 57 && e.ctrlKey == false && e.shiftKey == false) || e.which == 8) {
					return true;
				} else {
					return false;
				}
			}).bind('paste.numberbox', function() {
				if(window.clipboardData) {
					var s = clipboardData.getData('text');

					//粘贴的时候因为无论是什么都不能复制过去，所以可以用\D
					if(! /\D/.test(s)) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}).bind('dragenter.numberbox', function(event) {
				return false;
			}).bind('blur.numberbox', function(event) {
				self._addValue($(this).val());
			}).bind("focus.numberbox", function(event) {
				// 防止拖动，重新赋值
				var val = $.data(ele, 'numberbox').hid.val();
				if($(this).val() != val) {
					if(opts.min != null && opts.min != undefined && val < opts.min) {
						$(this).val(opts.min.toFixed(opts.precision));
					} else if(opts.max != null && opts.max != undefined && val > opts.max) {
						$(this).val(opts.max.toFixed(opts.precision));
					} else {
						$(this).val(val);
					}
				}
			});
		},
		_addValue : function (currentVal){
			var self = this,
				ele  = self.element,
				opts = self.options;
			//此处不能用\D，否则会把小数点符号也给清除
			if(/\d+/.test(currentVal)) {
				if(opts.parseable){
					var cval = parseFloat(currentVal).toFixed(opts.precision);
					$.data(ele, 'numberbox').hid.val(cval);
				} else {
					$.data(ele, 'numberbox').hid.val(currentVal);
				}
				
				if(opts.min != null && opts.min != undefined && cval < opts.min) {
					ele.val(opts.min.toFixed(opts.precision));
				} else if(opts.max != null && opts.max != undefined && cval > opts.max) {
					ele.val(opts.max.toFixed(opts.precision));
				} else {
					ele.val($.data(ele, 'numberbox').hid.val());
				}
				return;
			}
			// 存在字符串或其他字符,替换保存的值
			var cV = ele.val($.data(ele, 'numberbox').hid.val());
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.numberspinner.js **/
/***********************/
(function($) {
	// var id = 0;	
	$.widget('ui.numberspinner', {
		options : {
			// 设置初始值
			initnumber : null,
			// 增量
			addnumber  : null,
			// 是否需要处理精度
			parseable  : true,
			// 精度
			precision  : 0,
			// 宽度
			width      : null
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			var arrow = this.element.next('span'),
				parent = this.element.parent();
			this.element.numberbox('destroy');
			
			// 取消绑定事件
			$(document).unbind('click.combo');
			$(document).unbind('focus.combo');
			$(document).unbind('blur.combo');
			
			// 删除arrow
			arrow.remove();
			parent.remove();
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			var span = this.element.next('span');
			this.element.numberbox('disable');
			span.attr('disabled', 'true');
			span.children().unbind('click');
		},
		enable : function (){
			var ele = this.element,
				opts = this.options;
			var span = this.element.next('span');
			this.element.numberbox('enable');
			span.removeAttr('disabled');
			span.children().bind('click');
			span.find('.spinner-arrow-up').unbind('.numberspinner').bind('click.numberspinner', function(event) {
				($.data(ele, 'numberspinner').val) += opts.addnumber;
				ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
			});
			span.find('.spinner-arrow-down').unbind('.numberspinner').bind('click.numberspinner', function(event) {
				($.data(ele, 'numberspinner').val)-= opts.addnumber;
				ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
			});
		},
		clear : function (){
			this.element.numberbox('clear');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		numberspinner : function (){
			return $.data(this.element, 'numberspinner').numberspinner;
		},
		_create : function() {
			var self = this, ele = this.element, opts = this.options;

			var numsp = ele.addClass('numsp').numberbox({
				parseable : opts.parseable,
				precision : opts.precision,
				width : opts.width
			});
			
			$.data(ele, 'numberspinner', {
				val : '',
				numberspinner : ''
			});

			// var ID = id++;
			// var div = $('<span class="numberspinner"></span>').attr('id', 'ns-' + ID);
			// numsp.wrap(div);
			// var span = $('<span class="spinner-arrow"><span class="spinner-arrow-up"></span><span class="spinner-arrow-down"></span></span>');
			// span.insertAfter(numsp);
			// var div = $('<span class="numberspinner"></span>');
			var div = ele.wrap($('<span class="numberspinner"></span>'));
			var span = $('<span class="spinner-arrow"><span class="spinner-arrow-up"></span><span class="spinner-arrow-down"></span></span>');
			span.insertAfter(ele);
			// 设置numberspinner的外框宽度
			ele.parent().width(opts.width + ele.parent().find('.spinner-arrow').width());
			// 得到numberspinner对象
			$.data(ele, 'numberspinner').numberspinner = ele.parent();

			this._bindEvents();
		},
		_bindEvents : function() {
			var self = this, ele = this.element, opts = this.options;

			ele.bind('focus.numberspinner', function(event) {
				var val = $(this).val();
				if($(this).val() == '') {
					$.data(ele, 'numberspinner', {
						val : opts.initnumber
					});
				} else {
					$.data(ele, 'numberspinner', {
						val : $(this).val()
					});
				}
				$(this).val($.data(ele, 'numberspinner').val);
			}).bind('blur.numberspinner', function(event) {
				$.data(ele, 'numberspinner', {
					val : parseInt($(this).val())
				});
				// 失去焦点之后才允许微调，可以避免初始值未设置师就可以调节微调器
				ele.parent().find('.spinner-arrow-up').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					($.data(ele, 'numberspinner').val) += opts.addnumber;
					ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
				});
				ele.parent().find('.spinner-arrow-down').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					($.data(ele, 'numberspinner').val)-= opts.addnumber;
					ele.numberbox('setValue',$.data(ele, 'numberspinner').val);
				});
			});
			
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.timespinner.js **/
/***********************/
(function($) {

	$.widget('ui.timespinner', {
		options : {
			// 分隔符
			Separator : ':',
			//
			highlight : null,
			// 宽度
			width : null
		},
		getOptions : function (){
			return this.options;
		},
		destroy : function (){
			this.element.numberspinner('destroy');
		},
		resize : function (param){
			this.element.width(param);
		},
		disable : function (){
			var span = this.element.next('span');
			this.element.numberbox('disable');
			span.attr('disabled', 'true');
			span.children().unbind('click');
		},
		enable : function (){
			this.element.numberbox('enable');
		},
		clear : function (){
			this.element.numberbox('clear');
		},
		getValue : function (){
			var val = this.element.val();
			return val;
		},
		// setValue : function (param){
			// $.data(this.element, 'timespinner', {
				// time : param
			// });
			// this.element.numberbox('setValue', param);
		// },
		timespinner : function() {
			return $.data(this.element, 'timespinner').timespinner;
		},
		_create : function() {
			var self = this, ele = self.element, opts = self.options;
			
			$.data(ele, 'timespinner', {
				time : '',
				timespinner : ''
			});
			
			ele.numberspinner({
				parseable : false,
				precision : 0,
				width : opts.width
			});

			$.data(ele, 'timespinner').timespinner = ele.numberspinner('numberspinner');
			
			this._bindEvents();
		},
		_bindEvents : function() {
			// 判断时间前面是否需要加0
			function checkTime(target) {
				if(target < 10) {
					target = "0" + target;
				}
				return target;
			}
			
			var self = this, ele = self.element, opts = self.options;
			var date = new Date(), h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();

			// set default value
			ele.val(checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s));

			ele.bind('focus.timespinner', function(event) {
				var val = $(this).val();
				if(val == '') {
					$.data(ele, 'timespinner', {
						time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					});
				} else {
					$.data(ele, 'timespinner', {
						time : val
					});
				}
				ele.numberbox('setValue', $.data(ele, 'timespinner').time);

			}).bind('click.timespinner', function(event) {
				var start = 0;
				var numstart = 0, numend = 0;
				// 考虑兼容性的问题，前面是主流浏览器支持，后面是IE支持
				if(this.selectionStart != null) {
					start = this.selectionStart;
				} else if((navigator.appName == "Microsoft Internet Explorer")) {
					var range = this.createTextRange();
					var s = document.selection.createRange();
					s.setEndPoint("StartToStart", range);
					start = s.text.length;
				}
				if(start >= 0 && start <= 2) {
					opts.highlight = 0;
					numstart = 0;
					numend = 2;
				} else if(start >= 3 && start <= 5) {
					opts.highlight = 1;
					numstart = 3;
					numend = 5;
				} else if(start >= 6 && start <= 8) {
					opts.highlight = 2;
					numstart = 6;
					numend = 8;
				}
				// this.setSelectionRange(numstart, numend);
				if (this.selectionStart != null){
					this.setSelectionRange(numstart, numend);
				} else if ((navigator.appName == "Microsoft Internet Explorer")){
					var range = this.createTextRange();
					range.collapse();
					range.moveEnd('character', numend);
					range.moveStart('character', numstart);
					range.select();
				}
				$.data(ele, 'clickPos', {
					start : numstart,
					end : numend
				});
			}).bind('blur.timespinner', function(event) {
				var th = this;
					// val = $(this).val();
				// $.data(ele, 'timespinner', {
					// time : val
				// });
				// if(val){
					// if(h > 23) {
						// h = 0;
					// }
					// if(m > 59) {
						// m = m-60;
						// h++;
					// }
					// if(s > 59) {
						// s = s-60;
						// m++;
					// }
					// $.data(ele, 'timespinner', {
						// time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					// });
					ele.numberbox('setValue', $.data(ele, 'timespinner').time);
				// }
				ele.parent().find('.spinner-arrow-up').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					switch(opts.highlight) {
						case 0 :
							if(h < 23) {
								h += 1;
							} else if(h == 23) {
								h = 0;
							}
							break;
						case 1 :
							if(m < 59) {
								m += 1;
							} else if(m == 59) {
								m = 0;
								if(h < 23) {
									h += 1;
								} else if(h == 23) {
									h = 0;
								}
							}
							break;
						case 2 :
							if(s < 59) {
								s += 1;
							} else if(s == 59) {
								s = 0;
								if(m < 59) {
									m += 1;
								} else if(m == 59) {
									m = 0;
								}
							}
							break;
					};
					$.data(ele, 'timespinner', {
						time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					});
					ele.numberbox('setValue', $.data(ele, 'timespinner').time);

					// 获取焦点
					ele.trigger('focus.timespinner');
					var clickPos = $.data(ele, 'clickPos');
					if(clickPos) {
						if ((navigator.appName == "Microsoft Internet Explorer")) {
						  	var range = th.createTextRange();
							range.collapse();
							range.moveEnd('character', clickPos.end);
							range.moveStart('character', clickPos.start);
							range.select();
						} else {
							th.setSelectionRange(clickPos.start, clickPos.end);
						}
						return;
					}
					
					
					
					//this.setSelectionRange(numstart, numend);

				});
				ele.parent().find('.spinner-arrow-down').unbind('.numberspinner').bind('click.numberspinner', function(event) {
					switch(opts.highlight) {
						case 0 :
							if(h > 0) {
								h -= 1;
							} else if(h == 0) {
								h = 23;
							}
							break;
						case 1 :
							if(m > 0) {
								m -= 1;
							} else if(m == 0) {
								m = 59;
								if(h > 0) {
									h -= 1;
								} else if(h == 0) {
									h = 23;
								}
							}
							break;
						case 2 :
							if(s > 0) {
								s -= 1;
							} else if(s == 0) {
								s = 59;
								if(m > 0) {
									m -= 1;
								} else if(m == 0) {
									m = 59;
								}
							}
							break;
					};
					$.data(ele, 'timespinner', {
						time : checkTime(h) + opts.Separator + checkTime(m) + opts.Separator + checkTime(s)
					});
					ele.numberbox('setValue', $.data(ele, 'timespinner').time);
					// 获取焦点
					ele.trigger('focus.timespinner');
					var clickPos = $.data(ele, 'clickPos');
					if(clickPos) {
						if ((navigator.appName == "Microsoft Internet Explorer")) {
						  	var range = th.createTextRange();
							range.collapse();
							range.moveEnd('character', clickPos.end);
							range.moveStart('character', clickPos.start);
							range.select();
						} else {
							th.setSelectionRange(clickPos.start, clickPos.end);
						}
						return;
					}
				});
			});
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.combo.js **/
/***********************/
(function($) {
	// var id = 0;
	$.widget('ui.combo', {
		options : {
			// 验证是否为空
			required : false,
			// 验证失败提示信息
			missMsg : '不能为空',
			// 宽度
			width : null,
			// panel的宽度
			panelWidth : null,
			// 是否可编辑
			editable : false,
			// 是否带有单选按钮,不可与multiable同时为true,如果同时为true，则默认为radioable : true,multiable : false
			radioable : true,
			// 是否可以多选
			multiable : false,
			// 分隔符
			separator : ',',
			// 设置初始值
			value : '',
			/**
			 * 展示下拉框事件 
			 */
			onShowPanel : function() {},
			/**
			 * 隐藏下拉框事件 
			 */
			onHidePanel : function() {},
			/**
			 * 改变值事件
			 * data.oldVal,data.newVal
			 *  {oldVal : '', newVal : ''}
			 * @param {Object} event
			 * @param {Object} data
			 */
			onChange : function(event, data) {}
		},
		getOptions : function (){
			return this.options;
		},
		panel : function (){
			return this.element.panel('panel');
		},
		destroy : function (){
			var combo = this.element.data('mycombo').combo;

			var input = combo.find('input.combo-input');
			var parent = this.element.data('mycombo').parent;
			// 删除验证框
			input.validatebox('destroy');
			this.element.data('mycombo').combo.remove();
			
			// 取消绑定事件
			$(document).unbind('click.combo');
			$(document).unbind('mouseover.combo');
			
			// 删除panel
			this.element.panel('destroy');
			
			parent.remove();
		},
		/**
		 * {width : 100,height:100} 
		 */
		resize : function (options){
			var combo = this.element.data('mycombo').combo;
			combo.width(options.width - (combo.outerWidth() - combo.width()));
			this.element.panel('resize', {
				width : options.panelWidth
			});
			this._setSize();
		},
		showPanel : function (){
			this._showPanel();
		},
		hidePanel : function (){
			this.element.panel('close');
		},
		disable : function (){
			var combo = this.element.data('mycombo').combo;
			var input = combo.find('.combo-input');
			input.attr('disabled','true').removeClass('validatebox-invalid');
			var arrow = combo.find('.combo-arrow');
			arrow.attr('disabled','true');
			arrow.unbind('.combo');
		},
		enable : function (){
			var combo = this.element.data('mycombo').combo;
			var input = combo.find('.combo-input');
			input.removeAttr('disabled');//.addClass('validatebox-invalid');
			var arrow = combo.find('.combo-arrow');
			arrow.removeAttr('disabled')
			this._bindEvents();
		},
		validate : function (){
			var self = this,
				opts = this.options;
			if(opts.required){
				var combo = this.element.data('mycombo').combo;
				var val = combo.find('.combo-input').val();
				if(!val || val === ''){
					return false;
				}
			}
			return true;
		},
		clear : function (){
			var combo = this.element.data('mycombo').combo;
			combo.find('.combo-input').val('');
		},
		getValue : function (){
			var combo = this.element.data('mycombo').combo;
			return combo.find('.combo-input').val();
		},
		setValue : function (val){
			var combo = this.element.data('mycombo').combo;
	  		return combo.find('.combo-input').val(val);
		},
		/*
		 * 替换下拉框数据
		 * @param data ['C#','Java']
		 */
		setData : function (dataArr){
			var combo = this.element.data('mycombo').combo;
			function getData(data){
				var result = '';
				if(data!=null && data.length>0){
					for(var d in data){
						result += '<div class="sp">' + data[d] +'</div>'; 
					}
				}
				return result;
			}
			this.clear();
			var panel = this.element.data('mycombo').panel;
			
			panel.find('.panel-body').html(
				getData(dataArr)
			);
			
			if(this.options.radioable) {
				this.element.find('.sp').prepend('<input type="radio" name="lang" />');
			}
			
			this._bindEvents();
			combo.find('.combo-input').val(this.element.find('.sp:first-child').text());
		},
		combo : function (){
			return this.element.data('mycombo').parent;
		},
		_create : function() {
			var self = this, 
				ele = this.element, 
				opts = this.options;
			if(opts.panelWidth == null) {
				opts.panelWidth = opts.width;
			}
			ele.addClass('combo-panel').panel({
				doSize : false,
				closed : true,
				style : {
					position : 'absolute',
					backgroundColor : '#fff'
				},
				width : opts.panelWidth,
				onOpen : function() {
					$(this).panel('resize');
				}
			});
			if(opts.radioable) {
				ele.find('.sp').prepend('<input type="radio" name="lang" />');
			}
			// var panel = ele.panel('panel');
			// var ID = id++;
			// panel.wrap($('<div></div>').attr('id', 'cb-' + ID));
			// var combo = $('<div class="combo"></div>').insertBefore(panel);
			// combo.width(opts.width);
			// var text = $('<input type="text" class="combo-input" />').appendTo(combo);
			// text.validatebox({
				// required : opts.required,
				// missMsg  : opts.missMsg
			// });
			// if(!opts.editable) {
				// text.attr('readonly', 'readonly');
				// text.attr('autocomplete', 'off');
			// }
			// var arrow = $('<span class="combo-arrow"></span>').appendTo(combo);
			// combo.width(opts.width - (combo.outerWidth() - opts.width));
			var panel = ele.panel('panel');
			panel.wrap($('<div></div>').addClass('comboBox'));
			$('<div class="combo"></div>').insertBefore(panel);
			
			var combo = ele.parent().parent().find('.combo');
			combo.width(opts.width);
			
			var comboInput = $('<input type="text" class="combo-input" />');
			combo.append(comboInput);
			combo.find('.combo-input').validatebox({
				required : opts.required,
				missMsg  : opts.missMsg
			});
			
			if(!opts.editable) {
				combo.find('.combo-input').attr('readonly', 'readonly');
				combo.find('.combo-input').attr('autocomplete', 'off');
			}
			
			combo.append($('<span class="combo-arrow"></span>'));
			combo.width(opts.width - (combo.outerWidth() - opts.width));
			
			this.element.data('mycombo', {
				val : [],
				panel : panel,
				combo : combo,
				parent : combo.parent()
			});
			this._bindEvents();
			this._setSize();
		},
		_init : function() {
			//some code
		},
		_showPanel : function (){
			var self = this,
				ele  = this.element,
				parent = ele.data('mycombo').parent;
			parent.find('.combo-panel').panel('open');
			self._trigger('onShowPanel', null);
			parent.find('.combo-input').validatebox('txtEvent');
		},
		_bindEvents : function() {
			var self = this, ele = self.element, 
				opts = self.options, 
				combo = ele.data('mycombo').combo, 
				parent = ele.data('mycombo').parent;
			
			//点击空白地方关闭所有panel
			parent.bind('mouseleave.combo', function(event) {
				$(document).unbind('click.combo').bind('click.combo', function(event) {
					$('div.combo-panel').each(function(index) {
						$(this).panel('close');
						self._trigger('onHidePanel', event);
					});
				});
			}).bind('mouseenter.combo', function() {
				$(document).unbind('click.combo');
			});

			//点击arrow，显示出panel及空字符提示
			combo.find('.combo-arrow').unbind('click.combo').bind('click.combo', function(event) {
				self._showPanel();
			});

			//箭头悬停动画
			combo.find('.combo-arrow').bind('mouseover.combo',function() {
				$(this).css({
					'opacity' : '1.0'
				});
			}).bind('mouseout',function() {
				$(this).css({
					'opacity' : '0.6'
				});
			});
			
			// 初始化input内的值
			// parent.find('.combo-input').validatebox('setValue', '');
			// 获取数据传到input
			if(opts.value != ''){
				parent.find('.combo-input').validatebox('setValue', opts.value);
			} else {
				parent.find('.combo-input').validatebox('setValue', '');
			}
			
			if(opts.radioable) {
				parent.find('.panel-body input[type="radio"]').each(function(index) {
					$(this).bind('click.combo', function(event) {
						var val = $(this).parent().text();
						// 调用validatebox的setValue方法
						parent.find('.combo-input').validatebox('setValue', val);
						self._trigger('onChange', event, val);
						parent.find('.combo-panel').panel('close');
						self._trigger('onHidePanel', event);
					}).bind('mouseover.combo', function() {
						$(this).css({
							'cursor' : 'pointer'
						});
					});
				});
			} else {
				if(!opts.multiable){
					parent.find('.sp').bind('click.combo', function(event) {
							// 检测时候含有高亮文本，有则取消其他高亮，为当前选中高亮显示
							var hl = $('.panel-body div');
							if(hl.hasClass('heightlight')) {
								hl.removeClass('heightlight');
							} 
							$(this).addClass('heightlight');
							// 获取div中的文本内容
							var val = $.trim($(this).text());
							// 调用validatebox的setValue方法
							parent.find('.combo-input').validatebox('setValue', val);
							self._trigger('onChange', event, val);
							parent.find('.combo-panel').panel('close');
							self._trigger('onHidePanel', event);
						}).bind('mouseover.combo', function() {
							$(this).css({
								'cursor' : 'pointer'
							});
						});
				} else {
					parent.find('.sp').bind('click.combo', function(event) {
						$(this).toggleClass('heightlight');
						// var val = $(this).html().trim();
						var val = $.trim( $(this).html() );
						// var val = $(this).html();
						// alert(val+',len'+val.length);
						if($(this).hasClass('heightlight')){
							ele.data('mycombo').val.push(val);
						} else {
							var temp = ele.data('mycombo').val;
							var index = $.inArray(val, temp);
							temp.splice(index, 1);
							ele.data('mycombo').val = temp;
						}
						parent.find('.combo-input').validatebox('setValue', ele.data('mycombo').val);
						self._trigger('onChange', event, val);
					}).bind('mouseover.combo', function() {
						$(this).css({
							'cursor' : 'pointer'
						});
					});
				}
			}
		},
		_setSize : function() {
			var self = this, 
				ele = self.element, 
				opts = self.options, 
				combo = ele.data('mycombo').combo, 
				parent = ele.data('mycombo').parent;

			var arrow = parent.find('.combo-arrow');
			combo.find('.combo-input').width(combo.width() - arrow.outerWidth());
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.autocomplete.js **/
/***********************/
(function($) {
	$.widget('ui.autocomplete', {
		options : {
			// 传进来的所有数据
			data : ''
		},
		destroy : function() {
			this.element.combo('destroy');
			this.element.remove();
		},
		resize : function(target) {
			this.element.combo('resize', {
						width : target
					});
		},
		disable : function() {
			this.element.combo('disable');
		},
		enable : function() {
			this.element.combo('enable');
		},
		autocomplete : function() {
			return this.element.combo('combo');
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options;
			// 获取传进来的参数的data内的值
			// alert(opts.data[0]);
			// 获取data的总参数个数
			// alert(opts.data.length);
			// 传进来的参数的个数
			// alert(opts.total);
			
			// 生成div的内容
			var sp_all = ele.wrapInner('<div class="sp_all"></div>');
			for(var i = 0; i < opts.data.total; i++) {
				var sp = $('<div class="sp"></div>').addClass('sp' + i).text(opts.data.data[i]);
				sp_all.find('.sp_all').before(sp);
			}
			// 调用combo控件
			ele.combo({
				width : 150,
				editable : true,
				radioable : false
				// multiable : true,
				// required : true,
				// value : 'Java'
			});
			
			$.data(ele, 'autocomplete', {
				combo : ele.parent().parent()
			});
			
			this._bindEvents();
		},
		_init : function() {
			//some code
		},
		_bindEvents : function() {
			var self = this,
				ele = self.element,
				opts = self.options,
				combo = $.data(ele, 'autocomplete').combo;
			
			var input = combo.find('.combo-input'),
				arrow = combo.find('.combo-arrow');
			
			input.bind('keyup.autocomplete', function(event) {
				
				// alert('aaaaaa');
				
			  	if(input.val() != '') {
					// 如果需要只匹配字母，可以在这里添加如下注释的条件
					// var re = /^[a-z]+$/gi;
					// var rs = re.test(input.val());
					// if(rs) {
					
					var inputVal = input.val();
					// alert(inputVal);
					var validateVal_1 = '/' + inputVal + '+/gi';
					var validateVal_2 = '/' + inputVal + '+/i';
					var evalVal_1 = eval(validateVal_1);
					var evalVal_2 = eval(validateVal_2);
					// alert(evalVal);
					// alert(validateVal);
					// alert(evalVal.test('bbbb'));
					for(var i = 0; i < opts.data.total; i++) {
						var sp = ele.find('.sp'+i).text();
						// alert(evalVal.test(sp));
						if(evalVal_1.test(sp) || evalVal_2.test(sp)) {
							ele.find('.sp'+i).removeClass('heightlight').css({
								display : 'block'
							});
						}else {
							ele.find('.sp'+i).css({
								display : 'none'
							});
							ele.panel('open');
						}
					}
					// }
					
				}else {
					ele.panel('close');
				}
			});
			
			arrow.bind('click.autocomplete', function(event) {
				for(var i = 0; i < opts.data.total; i++) {
			  		ele.find('.sp'+i).css({
						display : 'block'
					});
			  	}
			});
			
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.calendar.js **/
/***********************/
/*!
 * jQuery UI Datepicker @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function($, undefined) {
	$.extend($.ui, {
		datepicker : {
			version : "@VERSION"
		}
	});

	var PROP_NAME = 'datepicker';
	var dpuuid = new Date().getTime();
	var instActive;
	/* Date picker manager.
	 Use the singleton instance of this class, $.datepicker, to interact with the date picker.
	 Settings for (groups of) date pickers are maintained in an instance object,
	 allowing multiple different settings on the same page. */

	function Datepicker() {
		this.debug = false;
		// Change this to true to start debugging
		this._curInst = null;
		// The current instance in use
		this._keyEvent = false;
		// If the last event was a key event
		this._disabledInputs = [];
		// List of date picker inputs that have been disabled
		this._datepickerShowing = false;
		// True if the popup picker is showing , false if not
		this._inDialog = false;
		// True if showing within a "dialog", false if not
		this._mainDivId = 'ui-datepicker-div';
		// The ID of the main datepicker division
		this._inlineClass = 'ui-datepicker-inline';
		// The name of the inline marker class
		this._appendClass = 'ui-datepicker-append';
		// The name of the append marker class
		this._triggerClass = 'ui-datepicker-trigger';
		// The name of the trigger marker class
		this._dialogClass = 'ui-datepicker-dialog';
		// The name of the dialog marker class
		this._disableClass = 'ui-datepicker-disabled';
		// The name of the disabled covering marker class
		this._unselectableClass = 'ui-datepicker-unselectable';
		// The name of the unselectable cell marker class
		this._currentClass = 'ui-datepicker-current-day';
		// The name of the current day marker class
		this._dayOverClass = 'ui-datepicker-days-cell-over';
		// The name of the day hover marker class
		this.regional = [];
		// Available regional settings, indexed by language code
		this.regional[''] = {// Default regional settingss
			closeText : 'Done', // Display text for close link
			prevText : 'Prev', // Display text for previous month link
			nextText : 'Next', // Display text for next month link
			currentText : 'Today', // Display text for current month link
			monthNames : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], // Names of months for drop-down and formatting
			monthNamesShort : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
			dayNames : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // For formatting
			dayNamesShort : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // For formatting
			dayNamesMin : ['日', '一', '二', '三', '四', '五', '六'], // Column headings for days starting at Sunday
			weekHeader : 'Wk', // Column header for week of the year
			dateFormat : 'mm/dd/yy', // See format options on parseDate
			firstDay : 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL : false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear : false, // True if the year select precedes month, false for month then year
			yearSuffix : '' // Additional text to append to the year in the month headers
		};
		this._defaults = {// Global defaults for all the date picker instances
			showOn : 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
			showAnim : 'fadeIn', // Name of jQuery animation for popup
			showOptions : {}, // Options for enhanced animations
			defaultDate : null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
			appendText : '', // Display text following the input box, e.g. showing the format
			buttonText : '...', // Text for trigger button
			buttonImage : '', // URL for trigger button image
			buttonImageOnly : false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext : false, // True to hide next/previous month links
			// if not applicable, false to just disable them
			navigationAsDateFormat : false, // True if date formatting applied to prev/today/next links
			gotoCurrent : false, // True if today link goes back to current selection instead
			changeMonth : false, // True if month can be selected directly, false if only prev/next
			changeYear : false, // True if year can be selected directly, false if only prev/next
			yearRange : 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths : false, // True to show dates in other months, false to leave blank
			selectOtherMonths : false, // True to allow selection of dates in other months, false for unselectable
			showWeek : false, // True to show week of the year, false to not show it
			calculateWeek : this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
			shortYearCutoff : '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
			minDate : null, // The earliest selectable date, or null for no limit
			maxDate : null, // The latest selectable date, or null for no limit
			duration : 'fast', // Duration of display/closure
			beforeShowDay : null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow : null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
			onSelect : null, // Define a callback function when a date is selected
			onChangeMonthYear : null, // Define a callback function when the month or year is changed
			onClose : null, // Define a callback function when the datepicker is closed
			numberOfMonths : 1, // Number of months to show at a time
			showCurrentAtPos : 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths : 1, // Number of months to step back/forward
			stepBigMonths : 12, // Number of months to step back/forward for the big links
			altField : '', // Selector for an alternate field to store selected dates into
			altFormat : '', // The date format to use for the alternate field
			constrainInput : true, // The input is constrained by the current date format
			showButtonPanel : false, // True to show button panel, false to not show it
			autoSize : false, // True to size the input for the date format, false to leave as is
			disabled : false // The initial disabled state
		};
		$.extend(this._defaults, this.regional['']);
		this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
	}


	$.extend(Datepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName : 'hasDatepicker',

		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows : 4,

		/* Debug logging (if enabled). */
		log : function() {
			if(this.debug)
				console.log.apply('', arguments);
		},

		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker : function() {
			return this.dpDiv;
		},

		/* Override the default settings for all instances of the date picker.
		 @param  settings  object - the new settings to use as defaults (anonymous object)
		 @return the manager object */
		setDefaults : function(settings) {
			extendRemove(this._defaults, settings || {});
			return this;
		},

		/* Attach the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span
		 @param  settings  object - the new settings to use for this date picker instance (anonymous) */
		_attachDatepicker : function(target, settings) {
			// check for settings on the control itself - in namespace 'date:'
			var inlineSettings = null;
			for(var attrName in this._defaults) {
				var attrValue = target.getAttribute('date:' + attrName);
				if(attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue);
					} catch (err) {
						inlineSettings[attrName] = attrValue;
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase();
			var inline = (nodeName == 'div' || nodeName == 'span');
			if(!target.id) {
				this.uuid += 1;
				target.id = 'dp' + this.uuid;
			}
			var inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {}, inlineSettings || {});
			if(nodeName == 'input') {
				this._connectDatepicker(target, inst);
			} else if(inline) {
				this._inlineDatepicker(target, inst);
			}
		},

		/* Create a new instance object. */
		_newInst : function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
			// escape jQuery meta chars
			return {
				id : id,
				input : target, // associated target
				selectedDay : 0,
				selectedMonth : 0,
				selectedYear : 0, // current selection
				drawMonth : 0,
				drawYear : 0, // month being drawn
				inline : inline, // is datepicker inline or not
				dpDiv : (!inline ? this.dpDiv : // presentation div
				bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
			};
		},

		/* Attach the date picker to an input field. */
		_connectDatepicker : function(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if(input.hasClass(this.markerClassName))
				return;
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
			this._autoSize(inst);
			$.data(target, PROP_NAME, inst);
			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if(inst.settings.disabled) {
				this._disableDatepicker(target);
			}
		},

		/* Make attachments based on settings. */
		_attachments : function(input, inst) {
			var appendText = this._get(inst, 'appendText');
			var isRTL = this._get(inst, 'isRTL');
			if(inst.append)
				inst.append.remove();
			if(appendText) {
				inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
				input[isRTL ? 'before' : 'after'](inst.append);
			}
			input.unbind('focus', this._showDatepicker);
			if(inst.trigger)
				inst.trigger.remove();
			var showOn = this._get(inst, 'showOn');
			if(showOn == 'focus' || showOn == 'both')// pop-up date picker when in the marked field
				input.focus(this._showDatepicker);
			if(showOn == 'button' || showOn == 'both') {// pop-up date picker when button clicked
				var buttonText = this._get(inst, 'buttonText');
				var buttonImage = this._get(inst, 'buttonImage');
				inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
					src : buttonImage,
					alt : buttonText,
					title : buttonText
				}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == '' ? buttonText : $('<img/>').attr({
					src : buttonImage,
					alt : buttonText,
					title : buttonText
				})));
				input[isRTL ? 'before' : 'after'](inst.trigger);
				inst.trigger.click(function() {
					if($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
						$.datepicker._hideDatepicker();
					else if($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker(input[0]);
					} else
						$.datepicker._showDatepicker(input[0]);
					return false;
				});
			}
		},

		/* Apply the maximum length for the date format. */
		_autoSize : function(inst) {
			if(this._get(inst, 'autoSize') && !inst.inline) {
				var date = new Date(2009, 12 - 1, 20);
				// Ensure double digits
				var dateFormat = this._get(inst, 'dateFormat');
				if(dateFormat.match(/[DM]/)) {
					var findMax = function(names) {
						var max = 0;
						var maxI = 0;
						for(var i = 0; i < names.length; i++) {
							if(names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort'))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
				}
				inst.input.attr('size', this._formatDate(inst, date).length);
			}
		},

		/* Attach an inline date picker to a div. */
		_inlineDatepicker : function(target, inst) {
			var divSpan = $(target);
			if(divSpan.hasClass(this.markerClassName))
				return;
			divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if(inst.settings.disabled) {
				this._disableDatepicker(target);
			}
			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css("display", "block");
		},

		/* Pop-up the date picker in a "dialog" box.
		 @param  input     element - ignored
		 @param  date      string or Date - the initial date to display
		 @param  onSelect  function - the function to call when a date is selected
		 @param  settings  object - update the dialog date picker instance's settings (anonymous object)
		 @param  pos       int[2] - coordinates for the dialog's position within the screen or
		 event - with x/y coordinates or
		 leave empty for default (screen centre)
		 @return the manager object */
		_dialogDatepicker : function(input, date, onSelect, settings, pos) {
			var inst = this._dialogInst;
			// internal instance
			if(!inst) {
				this.uuid += 1;
				var id = 'dp' + this.uuid;
				this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				$('body').append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst);
			}
			extendRemove(inst.settings, settings || {});
			date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);

			this._pos = ( pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if(!this._pos) {
				var browserWidth = document.documentElement.clientWidth;
				var browserHeight = document.documentElement.clientHeight;
				var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
			}

			// move input on screen for focus, but hidden behind dialog
			this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if($.blockUI)
				$.blockUI(this.dpDiv);
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this;
		},

		/* Detach a datepicker from its control.
		 @param  target    element - the target input field or division or span */
		_destroyDatepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if(nodeName == 'input') {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
			} else if(nodeName == 'div' || nodeName == 'span')
				$target.removeClass(this.markerClassName).empty();
		},

		/* Enable the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span */
		_enableDatepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName == 'input') {
				target.disabled = false;
				inst.trigger.filter('button').each(function() {
					this.disabled = false;
				}).end().filter('img').css({
					opacity : '1.0',
					cursor : ''
				});
			} else if(nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().removeClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return (value == target ? null : value);
			});
			// delete entry
		},

		/* Disable the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span */
		_disableDatepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName == 'input') {
				target.disabled = true;
				inst.trigger.filter('button').each(function() {
					this.disabled = true;
				}).end().filter('img').css({
					opacity : '0.5',
					cursor : 'default'
				});
			} else if(nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().addClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return (value == target ? null : value);
			});
			// delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},

		/* Is the first field in a jQuery collection disabled as a datepicker?
		 @param  target    element - the target input field or division or span
		 @return boolean - true if disabled, false if enabled */
		_isDisabledDatepicker : function(target) {
			if(!target) {
				return false;
			}
			for(var i = 0; i < this._disabledInputs.length; i++) {
				if(this._disabledInputs[i] == target)
					return true;
			}
			return false;
		},

		/* Retrieve the instance data for the target control.
		 @param  target  element - the target input field or division or span
		 @return  object - the associated instance data
		 @throws  error if a jQuery problem getting data */
		_getInst : function(target) {
			try {
				return $.data(target, PROP_NAME);
			} catch (err) {
				throw 'Missing instance data for this datepicker';
			}
		},

		/* Update or retrieve the settings for a date picker attached to an input field or division.
		 @param  target  element - the target input field or division or span
		 @param  name    object - the new settings to update or
		 string - the name of the setting to change or retrieve,
		 when retrieving also 'all' for all instance settings or
		 'defaults' for all global defaults
		 @param  value   any - the new value for the setting
		 (omit if above is an object or to retrieve a value) */
		_optionDatepicker : function(target, name, value) {
			var inst = this._getInst(target);
			if(arguments.length == 2 && typeof name == 'string') {
				return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) : ( inst ? (name == 'all' ? $.extend({}, inst.settings) : this._get(inst, name)) : null));
			}
			var settings = name || {};
			if( typeof name == 'string') {
				settings = {};
				settings[name] = value;
			}
			if(inst) {
				if(this._curInst == inst) {
					this._hideDatepicker();
				}
				var date = this._getDateDatepicker(target, true);
				var minDate = this._getMinMaxDate(inst, 'min');
				var maxDate = this._getMinMaxDate(inst, 'max');
				extendRemove(inst.settings, settings);
				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if(minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
					inst.settings.minDate = this._formatDate(inst, minDate);
				if(maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatepicker(inst);
			}
		},

		// change method deprecated
		_changeDatepicker : function(target, name, value) {
			this._optionDatepicker(target, name, value);
		},

		/* Redraw the date picker attached to an input field or division.
		 @param  target  element - the target input field or division or span */
		_refreshDatepicker : function(target) {
			var inst = this._getInst(target);
			if(inst) {
				this._updateDatepicker(inst);
			}
		},

		/* Set the dates for a jQuery selection.
		 @param  target   element - the target input field or division or span
		 @param  date     Date - the new date */
		_setDateDatepicker : function(target, date) {
			var inst = this._getInst(target);
			if(inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst);
			}
		},

		/* Get the date(s) for the first entry in a jQuery selection.
		 @param  target     element - the target input field or division or span
		 @param  noDefault  boolean - true if no default date is to be used
		 @return Date - the current date */
		_getDateDatepicker : function(target, noDefault) {
			var inst = this._getInst(target);
			if(inst && !inst.inline)
				this._setDateFromField(inst, noDefault);
			return ( inst ? this._getDate(inst) : null);
		},

		/* Handle keystrokes. */
		_doKeyDown : function(event) {
			var inst = $.datepicker._getInst(event.target);
			var handled = true;
			var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
			inst._keyEvent = true;
			if($.datepicker._datepickerShowing)
				switch (event.keyCode) {
					case 9:
						$.datepicker._hideDatepicker();
						handled = false;
						break;
					// hide on tab out
					case 13:
						var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', inst.dpDiv);
						if(sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						var onSelect = $.datepicker._get(inst, 'onSelect');
						if(onSelect) {
							var dateStr = $.datepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else
							$.datepicker._hideDatepicker();
						return false;
						// don't submit the form
						break;
					// select the value on enter
					case 27:
						$.datepicker._hideDatepicker();
						break;
					// hide on escape
					case 33:
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
						break;
					// previous month/year on page up/+ ctrl
					case 34:
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
						break;
					// next month/year on page down/+ ctrl
					case 35:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break;
					// clear on ctrl or command +end
					case 36:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break;
					// current on ctrl or command +home
					case 37:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, ( isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if(event.originalEvent.altKey)
							$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
					case 38:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break;
					// -1 week on ctrl or command +up
					case 39:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, ( isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if(event.originalEvent.altKey)
							$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
					case 40:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break;
					// +1 week on ctrl or command +down
					default:
						handled = false;
				}
			else if(event.keyCode == 36 && event.ctrlKey)// display the date picker on ctrl+home
				$.datepicker._showDatepicker(this);
			else {
				handled = false;
			}
			if(handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},

		/* Filter entered characters - based on date format. */
		_doKeyPress : function(event) {
			var inst = $.datepicker._getInst(event.target);
			if($.datepicker._get(inst, 'constrainInput')) {
				var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
				var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
			}
		},

		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp : function(event) {
			var inst = $.datepicker._getInst(event.target);
			if(inst.input.val() != inst.lastVal) {
				try {
					var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
					if(date) {// only if valid
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst);
					}
				} catch (err) {
					$.datepicker.log(err);
				}
			}
			return true;
		},

		/* Pop-up the date picker for a given input field.
		 If false returned from beforeShow event handler do not show.
		 @param  input  element - the input field attached to the date picker or
		 event - if triggered by focus */
		_showDatepicker : function(input) {
			input = input.target || input;
			if(input.nodeName.toLowerCase() != 'input')// find from button/image trigger
				input = $('input', input.parentNode)[0];
			if($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input)// already here
				return;
			var inst = $.datepicker._getInst(input);
			if($.datepicker._curInst && $.datepicker._curInst != inst) {
				$.datepicker._curInst.dpDiv.stop(true, true);
				if(inst && $.datepicker._datepickerShowing) {
					$.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
				}
			}
			var beforeShow = $.datepicker._get(inst, 'beforeShow');
			var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if(beforeShowSettings === false) {
				//false
				return;
			}
			extendRemove(inst.settings, beforeShowSettings);
			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
			if($.datepicker._inDialog)// hide cursor
				input.value = '';
			if(!$.datepicker._pos) {// position below input
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight;
				// add the height
			}
			var isFixed = false;
			$(input).parents().each(function() {
				isFixed |= $(this).css('position') == 'fixed';
				return !isFixed;
			});
			if(isFixed && $.browser.opera) {// correction for Opera when fixed and scrolled
				$.datepicker._pos[0] -= document.documentElement.scrollLeft;
				$.datepicker._pos[1] -= document.documentElement.scrollTop;
			}
			var offset = {
				left : $.datepicker._pos[0],
				top : $.datepicker._pos[1]
			};
			$.datepicker._pos = null;
			//to avoid flashes on Firefox
			inst.dpDiv.empty();
			// determine sizing offscreen
			inst.dpDiv.css({
				position : 'absolute',
				display : 'block',
				top : '-1000px'
			});
			$.datepicker._updateDatepicker(inst);
			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({
				position : ($.datepicker._inDialog && $.blockUI ? 'static' : ( isFixed ? 'fixed' : 'absolute')),
				display : 'none',
				left : offset.left + 'px',
				top : offset.top + 'px'
			});
			if(!inst.inline) {
				var showAnim = $.datepicker._get(inst, 'showAnim');
				var duration = $.datepicker._get(inst, 'duration');
				var postProcess = function() {
					var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
					// IE6- only
					if(!!cover.length) {
						var borders = $.datepicker._getBorders(inst.dpDiv);
						cover.css({
							left : -borders[0],
							top : -borders[1],
							width : inst.dpDiv.outerWidth(),
							height : inst.dpDiv.outerHeight()
						});
					}
				};
				inst.dpDiv.zIndex($(input).zIndex() + 1);
				$.datepicker._datepickerShowing = true;

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim] ))
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[showAnim || 'show'](( showAnim ? duration : null), postProcess);
				if(!showAnim || !duration)
					postProcess();
				if(inst.input.is(':visible') && !inst.input.is(':disabled'))
					inst.input.focus();
				$.datepicker._curInst = inst;
			}
		},

		/* Generate the date picker content. */
		_updateDatepicker : function(inst) {
			this.maxRows = 4;
			//Reset the max number of rows being displayed (see #7043)
			var borders = $.datepicker._getBorders(inst.dpDiv);
			instActive = inst;
			// for delegate hover events

			inst.dpDiv.empty().append(this._generateHTML(inst));

			this._attachHandlers(inst);
			var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
			// IE6- only
			if(!!cover.length) {//avoid call to outerXXXX() when not in IE6
				cover.css({
					left : -borders[0],
					top : -borders[1],
					width : inst.dpDiv.outerWidth(),
					height : inst.dpDiv.outerHeight()
				})
			}
			inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
			var numMonths = this._getNumberOfMonths(inst);
			var cols = numMonths[1];
			var width = 17;
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
			if(cols > 1)
				inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
			inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
			inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
			if(inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				// #6694 - don't focus the input if it's already focused
				// this breaks the change event in IE
				inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
				inst.input.focus();
			// deffered render of the years select (to avoid flashes on Firefox)
			if(inst.yearshtml) {
				var origyearshtml = inst.yearshtml;
				setTimeout(function() {
					//assure that inst.yearshtml didn't change.
					if(origyearshtml === inst.yearshtml && inst.yearshtml) {
						inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},

		/* Retrieve the size of left and top borders for an element.
		 @param  elem  (jQuery object) the element of interest
		 @return  (number[2]) the left and top borders */
		_getBorders : function(elem) {
			var convert = function(value) {
				return {thin: 1, medium: 2, thick: 3}[value] || value;
			};
			return [parseFloat(convert(elem.css('border-left-width'))), parseFloat(convert(elem.css('border-top-width')))];
		},

		/* Check positioning to remain on screen. */
		_checkOffset : function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth();
			var dpHeight = inst.dpDiv.outerHeight();
			var inputWidth = inst.input ? inst.input.outerWidth() : 0;
			var inputHeight = inst.input ? inst.input.outerHeight() : 0;
			var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
			var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

			offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

			// now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);

			return offset;
		},

		/* Find an object's position on the screen. */
		_findPos : function(obj) {
			var inst = this._getInst(obj);
			var isRTL = this._get(inst, 'isRTL');
			while(obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
				obj = obj[ isRTL ? 'previousSibling' : 'nextSibling'];
			}
			var position = $(obj).offset();
			return [position.left, position.top];
		},

		/* Hide the date picker from view.
		 @param  input  element - the input field attached to the date picker */
		_hideDatepicker : function(input) {
			var inst = this._curInst;
			if(!inst || (input && inst != $.data(input, PROP_NAME)))
				return;
			if(this._datepickerShowing) {
				var showAnim = this._get(inst, 'showAnim');
				var duration = this._get(inst, 'duration');
				var postProcess = function() {
					$.datepicker._tidyDialog(inst);
				};

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim] ))
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))](( showAnim ? duration : null), postProcess);
				if(!showAnim)
					postProcess();
				this._datepickerShowing = false;
				var onClose = this._get(inst, 'onClose');
				if(onClose)
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
				this._lastInput = null;
				if(this._inDialog) {
					this._dialogInput.css({
						position : 'absolute',
						left : '0',
						top : '-100px'
					});
					if($.blockUI) {
						$.unblockUI();
						$('body').append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},

		/* Tidy up after a dialog display. */
		_tidyDialog : function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
		},

		/* Close date picker if clicked elsewhere. */
		_checkExternalClick : function(event) {
			if(!$.datepicker._curInst)
				return;

			var $target = $(event.target), inst = $.datepicker._getInst($target[0]);

			if((($target[0].id != $.datepicker._mainDivId && $target.parents('#' + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) || ($target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst ))
				$.datepicker._hideDatepicker();
		},

		/* Adjust one of the date sub-fields. */
		_adjustDate : function(id, offset, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if(this._isDisabledDatepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset + (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
			this._updateDatepicker(inst);
		},

		/* Action for current link. */
		_gotoToday : function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if(this._get(inst, 'gotoCurrent') && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				var date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a new month/year. */
		_selectMonthYear : function(id, select, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst['selected' + (period == 'M' ? 'Month' : 'Year')] = inst['draw' + (period == 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a day. */
		_selectDay : function(id, month, year, td) {
			var target = $(id);
			if($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return;
			}
			var inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $('a', td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
		},

		/* Erase the input field and hide the date picker. */
		_clearDate : function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			this._selectDate(target, '');
		},

		/* Update the input field with the selected date. */
		_selectDate : function(id, dateStr) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));

			if(inst.input)
				inst.input.val(dateStr);
			this._updateAlternate(inst);
			var onSelect = this._get(inst, 'onSelect');
			if(onSelect)
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
			// trigger custom callback
			else if(inst.input)
				inst.input.trigger('change');
			// fire the change event
			if(inst.inline)
				this._updateDatepicker(inst);
			else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if( typeof (inst.input[0]) != 'object')
					inst.input.focus();
				// restore focus
				this._lastInput = null;
			}
		},

		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate : function(inst) {
			var altField = this._get(inst, 'altField');
			if(altField) {// update alternate field too
				var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
				var date = this._getDate(inst);
				var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function() {
					$(this).val(dateStr);
				});
			}
		},

		/* Set as beforeShowDay function to prevent selection of weekends.
		 @param  date  Date - the date to customise
		 @return [boolean, string] - is this date selectable?, what is its CSS class? */
		noWeekends : function(date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ''];
		},

		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
		 @param  date  Date - the date to get the week for
		 @return  number - the number of the week within the year that contains this date */
		iso8601Week : function(date) {
			var checkDate = new Date(date.getTime());
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
			var time = checkDate.getTime();
			checkDate.setMonth(0);
			// Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},

		/* Parse a string value into a date object.
		 See formatDate below for the possible formats.

		 @param  format    string - the expected format of the date
		 @param  value     string - the date in the above format
		 @param  settings  Object - attributes include:
		 shortYearCutoff  number - the cutoff year for determining the century (optional)
		 dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		 dayNames         string[7] - names of the days from Sunday (optional)
		 monthNamesShort  string[12] - abbreviated names of the months (optional)
		 monthNames       string[12] - names of the months (optional)
		 @return  Date - the extracted date value or null if value is blank */
		parseDate : function(format, value, settings) {
			if(format == null || value == null)
				throw 'Invalid arguments';
			value = ( typeof value == 'object' ? value.toString() : value + '');
			if(value == '')
				return null;
			var shortYearCutoff = ( settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			shortYearCutoff = ( typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			var dayNamesShort = ( settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = ( settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = ( settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = ( settings ? settings.monthNames : null) || this._defaults.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			// Extract a number from the string value
			var getNumber = function(match) {
				var isDoubled = lookAhead(match);
				var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
				var digits = new RegExp('^\\d{1,' + size + '}');
				var num = value.substring(iValue).match(digits);
				if(!num)
					throw 'Missing number at position ' + iValue;
				iValue += num[0].length;
				return parseInt(num[0], 10);
			};
			// Extract a name from the string value and convert to an index
			var getName = function(match, shortNames, longNames) {
				var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
					return [[k, v]];
				}).sort(function(a, b) {
					return -(a[1].length - b[1].length);
				});
				var index = -1;
				$.each(names, function(i, pair) {
					var name = pair[1];
					if(value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if(index != -1)
					return index + 1;
				else
					throw 'Unknown name at position ' + iValue;
			};
			// Confirm that a literal character matches the string value
			var checkLiteral = function() {
				if(value.charAt(iValue) != format.charAt(iFormat))
					throw 'Unexpected literal at position ' + iValue;
				iValue++;
			};
			var iValue = 0;
			for(var iFormat = 0; iFormat < format.length; iFormat++) {
				if(literal)
					if(format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						checkLiteral();
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							day = getNumber('d');
							break;
						case 'D':
							getName('D', dayNamesShort, dayNames);
							break;
						case 'o':
							doy = getNumber('o');
							break;
						case 'm':
							month = getNumber('m');
							break;
						case 'M':
							month = getName('M', monthNamesShort, monthNames);
							break;
						case 'y':
							year = getNumber('y');
							break;
						case '@':
							var date = new Date(getNumber('@'));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case '!':
							var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if(lookAhead("'"))
								checkLiteral();
							else
								literal = true;
							break;
						default:
							checkLiteral();
					}
			}
			if(iValue < value.length) {
				var extra = value.substr(iValue);
				if(!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}
			if(year == -1)
				year = new Date().getFullYear();
			else if(year < 100)
				year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
			if(doy > -1) {
				month = 1;
				day = doy;
				do {
					var dim = this._getDaysInMonth(year, month - 1);
					if(day <= dim)
						break;
					month++;
					day -= dim;
				} while (true);
			}
			var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if(date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
				throw 'Invalid date';
			// E.g. 31/02/00
			return date;
		},

		/* Standard date formats. */
		ATOM : 'yy-mm-dd', // RFC 3339 (ISO 8601)
		COOKIE : 'D, dd M yy',
		ISO_8601 : 'yy-mm-dd',
		RFC_822 : 'D, d M y',
		RFC_850 : 'DD, dd-M-y',
		RFC_1036 : 'D, d M y',
		RFC_1123 : 'D, d M yy',
		RFC_2822 : 'D, d M yy',
		RSS : 'D, d M y', // RFC 822
		TICKS : '!',
		TIMESTAMP : '@',
		W3C : 'yy-mm-dd', // ISO 8601

		_ticksTo1970 : (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

		/* Format a date object into a string value.
		 The format can be combinations of the following:
		 d  - day of month (no leading zero)
		 dd - day of month (two digit)
		 o  - day of year (no leading zeros)
		 oo - day of year (three digit)
		 D  - day name short
		 DD - day name long
		 m  - month of year (no leading zero)
		 mm - month of year (two digit)
		 M  - month name short
		 MM - month name long
		 y  - year (two digit)
		 yy - year (four digit)
		 @ - Unix timestamp (ms since 01/01/1970)
		 ! - Windows ticks (100ns since 01/01/0001)
		 '...' - literal text
		 '' - single quote

		 @param  format    string - the desired format of the date
		 @param  date      Date - the date value to format
		 @param  settings  Object - attributes include:
		 dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		 dayNames         string[7] - names of the days from Sunday (optional)
		 monthNamesShort  string[12] - abbreviated names of the months (optional)
		 monthNames       string[12] - names of the months (optional)
		 @return  string - the date in the above format */
		formatDate : function(format, date, settings) {
			if(!date)
				return '';
			var dayNamesShort = ( settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = ( settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = ( settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = ( settings ? settings.monthNames : null) || this._defaults.monthNames;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			// Format a number, with leading zero if necessary
			var formatNumber = function(match, value, len) {
				var num = '' + value;
				if(lookAhead(match))
					while(num.length < len)
					num = '0' + num;
				return num;
			};
			// Format a name, short or long as requested
			var formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			};
			var output = '';
			var literal = false;
			if(date)
				for(var iFormat = 0; iFormat < format.length; iFormat++) {
					if(literal)
						if(format.charAt(iFormat) == "'" && !lookAhead("'"))
							literal = false;
						else
							output += format.charAt(iFormat);
					else
						switch (format.charAt(iFormat)) {
							case 'd':
								output += formatNumber('d', date.getDate(), 2);
								break;
							case 'D':
								output += formatName('D', date.getDay(), dayNamesShort, dayNames);
								break;
							case 'o':
								output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case 'm':
								output += formatNumber('m', date.getMonth() + 1, 2);
								break;
							case 'M':
								output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
								break;
							case 'y':
								output += (lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
								break;
							case '@':
								output += date.getTime();
								break;
							case '!':
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if(lookAhead("'"))
									output += "'";
								else
									literal = true;
								break;
							default:
								output += format.charAt(iFormat);
						}
				}
			return output;
		},

		/* Extract all possible characters from the date format. */
		_possibleChars : function(format) {
			var chars = '';
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			for(var iFormat = 0; iFormat < format.length; iFormat++)
				if(literal)
					if(format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						chars += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
						case 'm':
						case 'y':
						case '@':
							chars += '0123456789';
							break;
						case 'D':
						case 'M':
							return null;
						// Accept anything
						case "'":
							if(lookAhead("'"))
								chars += "'";
							else
								literal = true;
							break;
						default:
							chars += format.charAt(iFormat);
					}
			return chars;
		},

		/* Get a setting value, defaulting if necessary. */
		_get : function(inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
		},

		/* Parse existing date and initialise date picker. */
		_setDateFromField : function(inst, noDefault) {
			if(inst.input.val() == inst.lastVal) {
				return;
			}
			var dateFormat = this._get(inst, 'dateFormat');
			var dates = inst.lastVal = inst.input ? inst.input.val() : null;
			var date, defaultDate;
			date = defaultDate = this._getDefaultDate(inst);
			var settings = this._getFormatConfig(inst);
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				this.log(event);
				dates = ( noDefault ? '' : dates);
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = ( dates ? date.getDate() : 0);
			inst.currentMonth = ( dates ? date.getMonth() : 0);
			inst.currentYear = ( dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst);
		},

		/* Retrieve the default date shown on opening. */
		_getDefaultDate : function(inst) {
			return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
		},

		/* A date may be specified as an exact value or a relative one. */
		_determineDate : function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			};
			var offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), offset, $.datepicker._getFormatConfig(inst));
				} catch (e) {
					// Ignore
				}
				var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
				var matches = pattern.exec(offset);
				while(matches) {
					switch (matches[2] || 'd') {
						case 'd' :
						case 'D' :
							day += parseInt(matches[1], 10);
							break;
						case 'w' :
						case 'W' :
							day += parseInt(matches[1], 10) * 7;
							break;
						case 'm' :
						case 'M' :
							month += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case 'y':
						case 'Y' :
							year += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			};
			var newDate = (date == null || date === '' ? defaultDate : ( typeof date == 'string' ? offsetString(date) : ( typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
			newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
			if(newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},

		/* Handle switch to/from daylight saving.
		 Hours may be non-zero on daylight saving cut-over:
		 > 12 when midnight changeover, but then cannot generate
		 midnight datetime, so jump to 1AM, otherwise reset.
		 @param  date  (Date) the date to check
		 @return  (Date) the corrected date */
		_daylightSavingAdjust : function(date) {
			if(!date)
				return null;
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},

		/* Set the date(s) directly. */
		_setDate : function(inst, date, noChange) {
			var clear = !date;
			var origMonth = inst.selectedMonth;
			var origYear = inst.selectedYear;
			var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
				this._notifyChange(inst);
			this._adjustInstDate(inst);
			if(inst.input) {
				inst.input.val( clear ? '' : this._formatDate(inst));
			}
		},

		/* Retrieve the date(s) directly. */
		_getDate : function(inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
		},

		/* Attach the onxxx handlers.  These are declared statically so
		 * they work with static code transformers like Caja.
		 */
		_attachHandlers : function(inst) {

			var stepMonths = this._get(inst, 'stepMonths');
			var id = '#' + inst.id;
			inst.dpDiv.find('[data-handler]').map(function() {
				var handler = {
					prev : function() {
						window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, -stepMonths, 'M');
					},
					next : function() {
						window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, +stepMonths, 'M');
					},
					hide : function() {
						window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
					},
					today : function() {
						window['DP_jQuery_' + dpuuid].datepicker._gotoToday(id);
					},
					selectDay : function() {
						$.data(inst, 'datetimepicker', {
							id : id,
							target : this,
							dateMonth : +this.getAttribute('data-month'),
							dateYear : +this.getAttribute('data-year')
						});

						inst.dpDiv.find('[data-handler] a').each(function(index) {
							if($(this).hasClass('ui-state-active')) {
								$(this).removeClass('ui-state-active');
							}
						});

						var activeA = $(this).find('a');
						if(activeA.hasClass('ui-state-active')) {
							activeA.removeClass('ui-state-active');
						} else {
							activeA.addClass('ui-state-active');
						}
						//window['DP_jQuery_' + dpuuid].datepicker._selectDay(id, +this.getAttribute('data-month'),+this.getAttribute('data-year') , this);
						return false;
					},
					selectMonth : function() {
						window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'M');
						return false;
					},
					selectYear : function() {
						window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'Y');
						return false;
					}
				};
				$(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
			});
		},

		/* Generate the HTML for the current state of the date picker. */
		_generateHTML : function(inst) {
			var today = new Date();
			today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
			// clear time
			var isRTL = this._get(inst, 'isRTL');
			var showButtonPanel = this._get(inst, 'showButtonPanel');
			var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
			var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
			var numMonths = this._getNumberOfMonths(inst);
			var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
			var stepMonths = this._get(inst, 'stepMonths');
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var drawMonth = inst.drawMonth - showCurrentAtPos;
			var drawYear = inst.drawYear;
			if(drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if(maxDate) {
				var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while(this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if(drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
			var prevText = this._get(inst, 'prevText');
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
			var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' + ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' : ( hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
			var nextText = this._get(inst, 'nextText');
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
			var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' + ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' : ( hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
			var currentText = this._get(inst, 'currentText');
			var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
			var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, 'closeText') + '</button>' : '');
			var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + ( isRTL ? controls : '') + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"' + '>' + currentText + '</button>' : '') + ( isRTL ? '' : controls) + '</div>' : '';
			var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
			var showWeek = this._get(inst, 'showWeek');
			var dayNames = this._get(inst, 'dayNames');
			var dayNamesShort = this._get(inst, 'dayNamesShort');
			var dayNamesMin = this._get(inst, 'dayNamesMin');
			var monthNames = this._get(inst, 'monthNames');
			var monthNamesShort = this._get(inst, 'monthNamesShort');
			var beforeShowDay = this._get(inst, 'beforeShowDay');
			var showOtherMonths = this._get(inst, 'showOtherMonths');
			var selectOtherMonths = this._get(inst, 'selectOtherMonths');
			var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
			var defaultDate = this._getDefaultDate(inst);
			var html = '';
			for(var row = 0; row < numMonths[0]; row++) {
				var group = '';
				this.maxRows = 4;
				for(var col = 0; col < numMonths[1]; col++) {
					var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					var cornerClass = ' ui-corner-all';
					var calender = '';
					if(isMultiMonth) {
						calender += '<div class="ui-datepicker-group';
						if(numMonths[1] > 1)
							switch (col) {
								case 0:
									calender += ' ui-datepicker-group-first';
									cornerClass = ' ui-corner-' + ( isRTL ? 'right' : 'left');
									break;
								case numMonths[1]-1:
									calender += ' ui-datepicker-group-last';
									cornerClass = ' ui-corner-' + ( isRTL ? 'left' : 'right');
									break;
								default:
									calender += ' ui-datepicker-group-middle';
									cornerClass = '';
									break;
							}
						calender += '">';
					}
					calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? ( isRTL ? next : prev) : '') + (/all|right/.test(cornerClass) && row == 0 ? ( isRTL ? prev : next) : '') + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
					var thead = ( showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
					for(var dow = 0; dow < 7; dow++) {// days of the week
						var day = (dow + firstDay) % 7;
						thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
					}
					calender += thead + '</tr></thead><tbody>';
					var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if(drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					var curRows = Math.ceil((leadDays + daysInMonth) / 7);
					// calculate the number of rows to generate
					var numRows = ( isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
					//If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for(var dRow = 0; dRow < numRows; dRow++) {// create date picker rows
						calender += '<tr>';
						var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' + this._get(inst, 'calculateWeek')(printDate) + '</td>');
						for(var dow = 0; dow < 7; dow++) {// create date picker days
							var daySettings = ( beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
							var otherMonth = (printDate.getMonth() != drawMonth);
							var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							( otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							( unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							( unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							( unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') + (printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							( otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>';
							// display selectable date
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + '</tr>';
					}
					drawMonth++;
					if(drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += '</tbody></table>' + ( isMultiMonth ? '</div>' + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
					group += calender;
				}
				html += group;
			}
			html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
			inst._keyEvent = false;
			return html;
		},

		/* Generate the month and year header. */
		_generateMonthYearHeader : function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
			var changeMonth = this._get(inst, 'changeMonth');
			var changeYear = this._get(inst, 'changeYear');
			var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
			var html = '<div class="ui-datepicker-title">';
			var monthHtml = '';
			// month selection
			if(secondary || !changeMonth)
				monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
			else {
				var inMinYear = (minDate && minDate.getFullYear() == drawYear);
				var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
				monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
				for(var month = 0; month < 12; month++) {
					if((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()))
						monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : '') + '>' + monthNamesShort[month] + '</option>';
				}
				monthHtml += '</select>';
			}
			if(!showMonthAfterYear)
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
			// year selection
			if(!inst.yearshtml) {
				inst.yearshtml = '';
				if(secondary || !changeYear)
					html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
				else {
					// determine range of years to display
					var years = this._get(inst, 'yearRange').split(':');
					var thisYear = new Date().getFullYear();
					var determineYear = function(value) {
						var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
						return (isNaN(year) ? thisYear : year);
					};
					var year = determineYear(years[0]);
					var endYear = Math.max(year, determineYear(years[1] || ''));
					year = ( minDate ? Math.max(year, minDate.getFullYear()) : year);
					endYear = ( maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
					inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
					for(; year <= endYear; year++) {
						inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : '') + '>' + year + '</option>';
					}
					inst.yearshtml += '</select>';

					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}
			html += this._get(inst, 'yearSuffix');
			if(showMonthAfterYear)
				html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
			html += '</div>';
			// Close datepicker_header
			return html;
		},

		/* Adjust one of the date sub-fields. */
		_adjustInstDate : function(inst, offset, period) {
			var year = inst.drawYear + (period == 'Y' ? offset : 0);
			var month = inst.drawMonth + (period == 'M' ? offset : 0);
			var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == 'D' ? offset : 0);
			var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if(period == 'M' || period == 'Y')
				this._notifyChange(inst);
		},

		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax : function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var newDate = (minDate && date < minDate ? minDate : date);
			newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
			return newDate;
		},

		/* Notify change of month/year. */
		_notifyChange : function(inst) {
			var onChange = this._get(inst, 'onChangeMonthYear');
			if(onChange)
				onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst]);
		},

		/* Determine the number of months to show. */
		_getNumberOfMonths : function(inst) {
			var numMonths = this._get(inst, 'numberOfMonths');
			return (numMonths == null ? [1, 1] : ( typeof numMonths == 'number' ? [1, numMonths] : numMonths));
		},

		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate : function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
		},

		/* Find the number of days in a given month. */
		_getDaysInMonth : function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},

		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth : function(year, month) {
			return new Date(year, month, 1).getDay();
		},

		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth : function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst);
			var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
			if(offset < 0)
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			return this._isInRange(inst, date);
		},

		/* Is the given date in the accepted range? */
		_isInRange : function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()));
		},

		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig : function(inst) {
			var shortYearCutoff = this._get(inst, 'shortYearCutoff');
			shortYearCutoff = ( typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {
				shortYearCutoff : shortYearCutoff,
				dayNamesShort : this._get(inst, 'dayNamesShort'),
				dayNames : this._get(inst, 'dayNames'),
				monthNamesShort : this._get(inst, 'monthNamesShort'),
				monthNames : this._get(inst, 'monthNames')
			};
		},

		/* Format the given date for display. */
		_formatDate : function(inst, day, month, year) {
			if(!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}

			var date = ( day ? ( typeof day == 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
		}
	});

	/*
	 * Bind hover events for datepicker elements.
	 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
	 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
	 */
	function bindHover(dpDiv) {
		var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
		return dpDiv.delegate(selector, 'mouseout', function() {
			$(this).removeClass('ui-state-hover');
			if(this.className.indexOf('ui-datepicker-prev') != -1)
				$(this).removeClass('ui-datepicker-prev-hover');
			if(this.className.indexOf('ui-datepicker-next') != -1)
				$(this).removeClass('ui-datepicker-next-hover');
		}).delegate(selector, 'mouseover', function() {
			if(!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
				// alert('xxx');
				$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
				$(this).addClass('ui-state-hover');
				if(this.className.indexOf('ui-datepicker-prev') != -1)
					$(this).addClass('ui-datepicker-prev-hover');
				if(this.className.indexOf('ui-datepicker-next') != -1)
					$(this).addClass('ui-datepicker-next-hover');
			}
		});
	}

	/* jQuery extend now ignores nulls! */
	function extendRemove(target, props) {
		$.extend(target, props);
		for(var name in props)
		if(props[name] == null || props[name] == undefined)
			target[name] = props[name];
		return target;
	};

	/* Determine whether an object is an array. */
	function isArray(a) {
		return (a && (($.browser.safari && typeof a == 'object' && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))));
	};

	/* Invoke the datepicker functionality.
	 @param  options  string - a command, optionally followed by additional parameters or
	 Object - settings for attaching new datepicker functionality
	 @return  jQuery object */
	$.fn.datepicker = function(options) {
		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if(!this.length) {
			return this;
		}

		/* Initialise the date picker. */
		if(!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick).find('body').append($.datepicker.dpDiv);
			$.datepicker.initialized = true;
		}
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if( typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
			return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
		if(options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
			return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
		return this.each(function() {
			typeof options == 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
		});
	};

	$.datepicker = new Datepicker();
	// singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "@VERSION";

	// Workaround for #4055
	// Add another global to avoid noConflict issues with inline event handlers
	window['DP_jQuery_' + dpuuid] = $;

})(jQuery);



/***********************/
/** jquery.ui.datepicker.js **/
/***********************/
/*!
 * jQuery UI Datepicker @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function($, undefined) {

	$.extend($.ui, {
		datepicker : {
			version : "@VERSION"
		}
	});

	var PROP_NAME = 'datepicker';
	var dpuuid = new Date().getTime();
	var instActive;

	/* Date picker manager.
	 Use the singleton instance of this class, $.datepicker, to interact with the date picker.
	 Settings for (groups of) date pickers are maintained in an instance object,
	 allowing multiple different settings on the same page. */

	function Datepicker() {
		this.debug = false;
		// Change this to true to start debugging
		this._curInst = null;
		// The current instance in use
		this._keyEvent = false;
		// If the last event was a key event
		this._disabledInputs = [];
		// List of date picker inputs that have been disabled
		this._datepickerShowing = false;
		// True if the popup picker is showing , false if not
		this._inDialog = false;
		// True if showing within a "dialog", false if not
		this._mainDivId = 'ui-datepicker-div';
		// The ID of the main datepicker division
		this._inlineClass = 'ui-datepicker-inline';
		// The name of the inline marker class
		this._appendClass = 'ui-datepicker-append';
		// The name of the append marker class
		this._triggerClass = 'ui-datepicker-trigger';
		// The name of the trigger marker class
		this._dialogClass = 'ui-datepicker-dialog';
		// The name of the dialog marker class
		this._disableClass = 'ui-datepicker-disabled';
		// The name of the disabled covering marker class
		this._unselectableClass = 'ui-datepicker-unselectable';
		// The name of the unselectable cell marker class
		this._currentClass = 'ui-datepicker-current-day';
		// The name of the current day marker class
		this._dayOverClass = 'ui-datepicker-days-cell-over';
		// The name of the day hover marker class
		this.regional = [];
		// Available regional settings, indexed by language code
		this.regional[''] = {// Default regional settings
			closeText : 'Done', // Display text for close link
			prevText : 'Prev', // Display text for previous month link
			nextText : 'Next', // Display text for next month link
			currentText : 'Today', // Display text for current month link
			monthNames : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], // Names of months for drop-down and formatting
			monthNamesShort : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
			dayNames : ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'], // For formatting
			dayNamesShort : ['日', '一', '二', '三', '四', '五', '六'], // For formatting
			dayNamesMin : ['日', '一', '二', '三', '四', '五', '六'], // Column headings for days starting at Sunday
			weekHeader : 'Wk', // Column header for week of the year
			dateFormat : 'yy-mm-dd', // See format options on parseDate
			firstDay : 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL : false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear : false, // True if the year select precedes month, false for month then year
			yearSuffix : '' // Additional text to append to the year in the month headers
		};
		this._defaults = {// Global defaults for all the date picker instances
			showOn : 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
			showAnim : 'fadeIn', // Name of jQuery animation for popup
			showOptions : {}, // Options for enhanced animations
			defaultDate : null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
			appendText : '', // Display text following the input box, e.g. showing the format
			buttonText : '...', // Text for trigger button
			buttonImage : '', // URL for trigger button image
			buttonImageOnly : false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext : false, // True to hide next/previous month links
			// if not applicable, false to just disable them
			navigationAsDateFormat : false, // True if date formatting applied to prev/today/next links
			gotoCurrent : false, // True if today link goes back to current selection instead
			changeMonth : false, // True if month can be selected directly, false if only prev/next
			changeYear : false, // True if year can be selected directly, false if only prev/next
			yearRange : 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths : false, // True to show dates in other months, false to leave blank
			selectOtherMonths : false, // True to allow selection of dates in other months, false for unselectable
			showWeek : false, // True to show week of the year, false to not show it
			calculateWeek : this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
			shortYearCutoff : '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
			minDate : null, // The earliest selectable date, or null for no limit
			maxDate : null, // The latest selectable date, or null for no limit
			duration : 'fast', // Duration of display/closure
			beforeShowDay : null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow : null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
			onSelect : null, // Define a callback function when a date is selected
			onChangeMonthYear : null, // Define a callback function when the month or year is changed
			onClose : null, // Define a callback function when the datepicker is closed
			numberOfMonths : 1, // Number of months to show at a time
			showCurrentAtPos : 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths : 1, // Number of months to step back/forward
			stepBigMonths : 12, // Number of months to step back/forward for the big links
			altField : '', // Selector for an alternate field to store selected dates into
			altFormat : '', // The date format to use for the alternate field
			constrainInput : true, // The input is constrained by the current date format
			showButtonPanel : false, // True to show button panel, false to not show it
			autoSize : false, // True to size the input for the date format, false to leave as is
			disabled : false // The initial disabled state
		};
		$.extend(this._defaults, this.regional['']);
		this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
	}


	$.extend(Datepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName : 'hasDatepicker',

		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows : 4,

		/* Debug logging (if enabled). */
		log : function() {
			if(this.debug)
				console.log.apply('', arguments);
		},

		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker : function() {
			return this.dpDiv;
		},

		/* Override the default settings for all instances of the date picker.
		 @param  settings  object - the new settings to use as defaults (anonymous object)
		 @return the manager object */
		setDefaults : function(settings) {
			extendRemove(this._defaults, settings || {});
			return this;
		},

		/* Attach the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span
		 @param  settings  object - the new settings to use for this date picker instance (anonymous) */
		_attachDatepicker : function(target, settings) {
			// check for settings on the control itself - in namespace 'date:'
			var inlineSettings = null;
			for(var attrName in this._defaults) {
				var attrValue = target.getAttribute('date:' + attrName);
				if(attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue);
					} catch (err) {
						inlineSettings[attrName] = attrValue;
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase();
			var inline = (nodeName == 'div' || nodeName == 'span');
			if(!target.id) {
				this.uuid += 1;
				target.id = 'dp' + this.uuid;
			}
			var inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {}, inlineSettings || {});
			if(nodeName == 'input') {
				this._connectDatepicker(target, inst);
			} else if(inline) {
				this._inlineDatepicker(target, inst);
			}
		},

		/* Create a new instance object. */
		_newInst : function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
			// escape jQuery meta chars
			return {
				id : id,
				input : target, // associated target
				selectedDay : 0,
				selectedMonth : 0,
				selectedYear : 0, // current selection
				drawMonth : 0,
				drawYear : 0, // month being drawn
				inline : inline, // is datepicker inline or not
				dpDiv : (!inline ? this.dpDiv : // presentation div
				bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
			};
		},

		/* Attach the date picker to an input field. */
		_connectDatepicker : function(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if(input.hasClass(this.markerClassName))
				return;
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
			this._autoSize(inst);
			$.data(target, PROP_NAME, inst);
			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if(inst.settings.disabled) {
				this._disableDatepicker(target);
			}
		},

		/* Make attachments based on settings. */
		_attachments : function(input, inst) {
			var appendText = this._get(inst, 'appendText');
			var isRTL = this._get(inst, 'isRTL');
			if(inst.append)
				inst.append.remove();
			if(appendText) {
				inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
				input[isRTL ? 'before' : 'after'](inst.append);
			}
			input.unbind('focus', this._showDatepicker);
			if(inst.trigger)
				inst.trigger.remove();
			var showOn = this._get(inst, 'showOn');
			if(showOn == 'focus' || showOn == 'both')// pop-up date picker when in the marked field
				input.focus(this._showDatepicker);
			if(showOn == 'button' || showOn == 'both') {// pop-up date picker when button clicked
				var buttonText = this._get(inst, 'buttonText');
				var buttonImage = this._get(inst, 'buttonImage');
				inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
					src : buttonImage,
					alt : buttonText,
					title : buttonText
				}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == '' ? buttonText : $('<img/>').attr({
					src : buttonImage,
					alt : buttonText,
					title : buttonText
				})));
				input[isRTL ? 'before' : 'after'](inst.trigger);
				inst.trigger.click(function() {
					if($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
						$.datepicker._hideDatepicker();
					else if($.datepicker._datepickerShowing && $.datepicker._lastInput != input[0]) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker(input[0]);
					} else
						$.datepicker._showDatepicker(input[0]);
					return false;
				});
			}
		},

		/* Apply the maximum length for the date format. */
		_autoSize : function(inst) {
			if(this._get(inst, 'autoSize') && !inst.inline) {
				var date = new Date(2009, 12 - 1, 20);
				// Ensure double digits
				var dateFormat = this._get(inst, 'dateFormat');
				if(dateFormat.match(/[DM]/)) {
					var findMax = function(names) {
						var max = 0;
						var maxI = 0;
						for(var i = 0; i < names.length; i++) {
							if(names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort'))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
				}
				inst.input.attr('size', this._formatDate(inst, date).length);
			}
		},

		/* Attach an inline date picker to a div. */
		_inlineDatepicker : function(target, inst) {
			var divSpan = $(target);
			if(divSpan.hasClass(this.markerClassName))
				return;
			divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datepicker", function(event, key) {
				return this._get(inst, key);
			});
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if(inst.settings.disabled) {
				this._disableDatepicker(target);
			}
			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css("display", "block");
		},

		/* Pop-up the date picker in a "dialog" box.
		 @param  input     element - ignored
		 @param  date      string or Date - the initial date to display
		 @param  onSelect  function - the function to call when a date is selected
		 @param  settings  object - update the dialog date picker instance's settings (anonymous object)
		 @param  pos       int[2] - coordinates for the dialog's position within the screen or
		 event - with x/y coordinates or
		 leave empty for default (screen centre)
		 @return the manager object */
		_dialogDatepicker : function(input, date, onSelect, settings, pos) {
			var inst = this._dialogInst;
			// internal instance
			if(!inst) {
				this.uuid += 1;
				var id = 'dp' + this.uuid;
				this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				$('body').append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst);
			}
			extendRemove(inst.settings, settings || {});
			date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);

			this._pos = ( pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if(!this._pos) {
				var browserWidth = document.documentElement.clientWidth;
				var browserHeight = document.documentElement.clientHeight;
				var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
			}

			// move input on screen for focus, but hidden behind dialog
			this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			if($.blockUI)
				$.blockUI(this.dpDiv);
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this;
		},

		/* Detach a datepicker from its control.
		 @param  target    element - the target input field or division or span */
		_destroyDatepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if(nodeName == 'input') {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
			} else if(nodeName == 'div' || nodeName == 'span')
				$target.removeClass(this.markerClassName).empty();
		},

		/* Enable the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span */
		_enableDatepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName == 'input') {
				target.disabled = false;
				inst.trigger.filter('button').each(function() {
					this.disabled = false;
				}).end().filter('img').css({
					opacity : '1.0',
					cursor : ''
				});
			} else if(nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().removeClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return (value == target ? null : value);
			});
			// delete entry
		},

		/* Disable the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span */
		_disableDatepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName == 'input') {
				target.disabled = true;
				inst.trigger.filter('button').each(function() {
					this.disabled = true;
				}).end().filter('img').css({
					opacity : '0.5',
					cursor : 'default'
				});
			} else if(nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().addClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return (value == target ? null : value);
			});
			// delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},

		/* Is the first field in a jQuery collection disabled as a datepicker?
		 @param  target    element - the target input field or division or span
		 @return boolean - true if disabled, false if enabled */
		_isDisabledDatepicker : function(target) {
			if(!target) {
				return false;
			}
			for(var i = 0; i < this._disabledInputs.length; i++) {
				if(this._disabledInputs[i] == target)
					return true;
			}
			return false;
		},

		/* Retrieve the instance data for the target control.
		 @param  target  element - the target input field or division or span
		 @return  object - the associated instance data
		 @throws  error if a jQuery problem getting data */
		_getInst : function(target) {
			try {
				return $.data(target, PROP_NAME);
			} catch (err) {
				throw 'Missing instance data for this datepicker';
			}
		},

		/* Update or retrieve the settings for a date picker attached to an input field or division.
		 @param  target  element - the target input field or division or span
		 @param  name    object - the new settings to update or
		 string - the name of the setting to change or retrieve,
		 when retrieving also 'all' for all instance settings or
		 'defaults' for all global defaults
		 @param  value   any - the new value for the setting
		 (omit if above is an object or to retrieve a value) */
		_optionDatepicker : function(target, name, value) {
			var inst = this._getInst(target);
			if(arguments.length == 2 && typeof name == 'string') {
				return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) : ( inst ? (name == 'all' ? $.extend({}, inst.settings) : this._get(inst, name)) : null));
			}
			var settings = name || {};
			if( typeof name == 'string') {
				settings = {};
				settings[name] = value;
			}
			if(inst) {
				if(this._curInst == inst) {
					this._hideDatepicker();
				}
				var date = this._getDateDatepicker(target, true);
				var minDate = this._getMinMaxDate(inst, 'min');
				var maxDate = this._getMinMaxDate(inst, 'max');
				extendRemove(inst.settings, settings);
				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if(minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
					inst.settings.minDate = this._formatDate(inst, minDate);
				if(maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatepicker(inst);
			}
		},

		// change method deprecated
		_changeDatepicker : function(target, name, value) {
			this._optionDatepicker(target, name, value);
		},

		/* Redraw the date picker attached to an input field or division.
		 @param  target  element - the target input field or division or span */
		_refreshDatepicker : function(target) {
			var inst = this._getInst(target);
			if(inst) {
				this._updateDatepicker(inst);
			}
		},

		/* Set the dates for a jQuery selection.
		 @param  target   element - the target input field or division or span
		 @param  date     Date - the new date */
		_setDateDatepicker : function(target, date) {
			var inst = this._getInst(target);
			if(inst) {
				this._setDate(inst, date);
				this._updateDatepicker(inst);
				this._updateAlternate(inst);
			}
		},

		/* Get the date(s) for the first entry in a jQuery selection.
		 @param  target     element - the target input field or division or span
		 @param  noDefault  boolean - true if no default date is to be used
		 @return Date - the current date */
		_getDateDatepicker : function(target, noDefault) {
			var inst = this._getInst(target);
			if(inst && !inst.inline)
				this._setDateFromField(inst, noDefault);
			return ( inst ? this._getDate(inst) : null);
		},

		/* Handle keystrokes. */
		_doKeyDown : function(event) {
			var inst = $.datepicker._getInst(event.target);
			var handled = true;
			var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
			inst._keyEvent = true;
			if($.datepicker._datepickerShowing)
				switch (event.keyCode) {
					case 9:
						$.datepicker._hideDatepicker();
						handled = false;
						break;
					// hide on tab out
					case 13:
						var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', inst.dpDiv);
						if(sel[0])
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						var onSelect = $.datepicker._get(inst, 'onSelect');
						if(onSelect) {
							var dateStr = $.datepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else
							$.datepicker._hideDatepicker();
						return false;
						// don't submit the form
						break;
					// select the value on enter
					case 27:
						$.datepicker._hideDatepicker();
						break;
					// hide on escape
					case 33:
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
						break;
					// previous month/year on page up/+ ctrl
					case 34:
						$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
						break;
					// next month/year on page down/+ ctrl
					case 35:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break;
					// clear on ctrl or command +end
					case 36:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break;
					// current on ctrl or command +home
					case 37:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, ( isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if(event.originalEvent.altKey)
							$.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
					case 38:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break;
					// -1 week on ctrl or command +up
					case 39:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, ( isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if(event.originalEvent.altKey)
							$.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
					case 40:
						if(event.ctrlKey || event.metaKey)
							$.datepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break;
					// +1 week on ctrl or command +down
					default:
						handled = false;
				}
			else if(event.keyCode == 36 && event.ctrlKey)// display the date picker on ctrl+home
				$.datepicker._showDatepicker(this);
			else {
				handled = false;
			}
			if(handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},

		/* Filter entered characters - based on date format. */
		_doKeyPress : function(event) {
			var inst = $.datepicker._getInst(event.target);
			if($.datepicker._get(inst, 'constrainInput')) {
				var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
				var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
			}
		},

		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp : function(event) {
			var inst = $.datepicker._getInst(event.target);
			if(inst.input.val() != inst.lastVal) {
				try {
					var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
					if(date) {// only if valid
						$.datepicker._setDateFromField(inst);
						$.datepicker._updateAlternate(inst);
						$.datepicker._updateDatepicker(inst);
					}
				} catch (err) {
					$.datepicker.log(err);
				}
			}
			return true;
		},

		/* Pop-up the date picker for a given input field.
		 If false returned from beforeShow event handler do not show.
		 @param  input  element - the input field attached to the date picker or
		 event - if triggered by focus */
		_showDatepicker : function(input) {
			input = input.target || input;
			if(input.nodeName.toLowerCase() != 'input')// find from button/image trigger
				input = $('input', input.parentNode)[0];
			if($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input)// already here
				return;
			var inst = $.datepicker._getInst(input);
			if($.datepicker._curInst && $.datepicker._curInst != inst) {
				$.datepicker._curInst.dpDiv.stop(true, true);
				if(inst && $.datepicker._datepickerShowing) {
					$.datepicker._hideDatepicker($.datepicker._curInst.input[0]);
				}
			}
			var beforeShow = $.datepicker._get(inst, 'beforeShow');
			var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if(beforeShowSettings === false) {
				//false
				return;
			}
			extendRemove(inst.settings, beforeShowSettings);
			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField(inst);
			if($.datepicker._inDialog)// hide cursor
				input.value = '';
			if(!$.datepicker._pos) {// position below input
				$.datepicker._pos = $.datepicker._findPos(input);
				$.datepicker._pos[1] += input.offsetHeight;
				// add the height
			}
			var isFixed = false;
			$(input).parents().each(function() {
				isFixed |= $(this).css('position') == 'fixed';
				return !isFixed;
			});
			if(isFixed && $.browser.opera) {// correction for Opera when fixed and scrolled
				$.datepicker._pos[0] -= document.documentElement.scrollLeft;
				$.datepicker._pos[1] -= document.documentElement.scrollTop;
			}
			var offset = {
				left : $.datepicker._pos[0],
				top : $.datepicker._pos[1]
			};
			$.datepicker._pos = null;
			//to avoid flashes on Firefox
			inst.dpDiv.empty();
			// determine sizing offscreen
			inst.dpDiv.css({
				position : 'absolute',
				display : 'block',
				top : '-1000px'
			});
			$.datepicker._updateDatepicker(inst);
			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({
				position : ($.datepicker._inDialog && $.blockUI ? 'static' : ( isFixed ? 'fixed' : 'absolute')),
				display : 'none',
				left : offset.left + 'px',
				top : offset.top + 'px'
			});
			if(!inst.inline) {
				var showAnim = $.datepicker._get(inst, 'showAnim');
				var duration = $.datepicker._get(inst, 'duration');
				var postProcess = function() {
					var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
					// IE6- only
					if(!!cover.length) {
						var borders = $.datepicker._getBorders(inst.dpDiv);
						cover.css({
							left : -borders[0],
							top : -borders[1],
							width : inst.dpDiv.outerWidth(),
							height : inst.dpDiv.outerHeight()
						});
					}
				};
				inst.dpDiv.zIndex($(input).zIndex() + 1);
				$.datepicker._datepickerShowing = true;

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim] ))
					inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[showAnim || 'show'](( showAnim ? duration : null), postProcess);
				if(!showAnim || !duration)
					postProcess();
				if(inst.input.is(':visible') && !inst.input.is(':disabled'))
					inst.input.focus();
				$.datepicker._curInst = inst;
			}
		},

		/* Generate the date picker content. */
		_updateDatepicker : function(inst) {
			this.maxRows = 4;
			//Reset the max number of rows being displayed (see #7043)
			var borders = $.datepicker._getBorders(inst.dpDiv);
			instActive = inst;
			// for delegate hover events
			inst.dpDiv.empty().append(this._generateHTML(inst));
			this._attachHandlers(inst);
			var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
			// IE6- only
			if(!!cover.length) {//avoid call to outerXXXX() when not in IE6
				cover.css({
					left : -borders[0],
					top : -borders[1],
					width : inst.dpDiv.outerWidth(),
					height : inst.dpDiv.outerHeight()
				})
			}
			inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
			var numMonths = this._getNumberOfMonths(inst);
			var cols = numMonths[1];
			var width = 17;
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
			if(cols > 1)
				inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
			inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
			inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
			if(inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input &&
				// #6694 - don't focus the input if it's already focused
				// this breaks the change event in IE
				inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
				inst.input.focus();
			// deffered render of the years select (to avoid flashes on Firefox)
			if(inst.yearshtml) {
				var origyearshtml = inst.yearshtml;
				setTimeout(function() {
					//assure that inst.yearshtml didn't change.
					if(origyearshtml === inst.yearshtml && inst.yearshtml) {
						inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},

		/* Retrieve the size of left and top borders for an element.
		 @param  elem  (jQuery object) the element of interest
		 @return  (number[2]) the left and top borders */
		_getBorders : function(elem) {
			var convert = function(value) {
				return {thin: 1, medium: 2, thick: 3}[value] || value;
			};
			return [parseFloat(convert(elem.css('border-left-width'))), parseFloat(convert(elem.css('border-top-width')))];
		},

		/* Check positioning to remain on screen. */
		_checkOffset : function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth();
			var dpHeight = inst.dpDiv.outerHeight();
			var inputWidth = inst.input ? inst.input.outerWidth() : 0;
			var inputHeight = inst.input ? inst.input.outerHeight() : 0;
			var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
			var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

			offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

			// now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);

			return offset;
		},

		/* Find an object's position on the screen. */
		_findPos : function(obj) {
			var inst = this._getInst(obj);
			var isRTL = this._get(inst, 'isRTL');
			while(obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
				obj = obj[ isRTL ? 'previousSibling' : 'nextSibling'];
			}
			var position = $(obj).offset();
			return [position.left, position.top];
		},

		/* Hide the date picker from view.
		 @param  input  element - the input field attached to the date picker */
		_hideDatepicker : function(input) {
			var inst = this._curInst;
			if(!inst || (input && inst != $.data(input, PROP_NAME)))
				return;
			if(this._datepickerShowing) {
				var showAnim = this._get(inst, 'showAnim');
				var duration = this._get(inst, 'duration');
				var postProcess = function() {
					$.datepicker._tidyDialog(inst);
				};

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim] ))
					inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))](( showAnim ? duration : null), postProcess);
				if(!showAnim)
					postProcess();
				this._datepickerShowing = false;
				var onClose = this._get(inst, 'onClose');
				if(onClose)
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
				this._lastInput = null;
				if(this._inDialog) {
					this._dialogInput.css({
						position : 'absolute',
						left : '0',
						top : '-100px'
					});
					if($.blockUI) {
						$.unblockUI();
						$('body').append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},

		/* Tidy up after a dialog display. */
		_tidyDialog : function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
		},

		/* Close date picker if clicked elsewhere. */
		_checkExternalClick : function(event) {
			if(!$.datepicker._curInst)
				return;

			var $target = $(event.target), inst = $.datepicker._getInst($target[0]);

			if((($target[0].id != $.datepicker._mainDivId && $target.parents('#' + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) || ($target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != inst ))
				$.datepicker._hideDatepicker();
		},

		/* Adjust one of the date sub-fields. */
		_adjustDate : function(id, offset, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if(this._isDisabledDatepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset + (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
			this._updateDatepicker(inst);
		},

		/* Action for current link. */
		_gotoToday : function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if(this._get(inst, 'gotoCurrent') && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				var date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a new month/year. */
		_selectMonthYear : function(id, select, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst['selected' + (period == 'M' ? 'Month' : 'Year')] = inst['draw' + (period == 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a day. */
		_selectDay : function(id, month, year, td) {
			var target = $(id);
			if($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
				return;
			}
			var inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $('a', td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
		},

		/* Erase the input field and hide the date picker. */
		_clearDate : function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			this._selectDate(target, '');
		},

		/* Update the input field with the selected date. */
		_selectDate : function(id, dateStr) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			if(inst.input)
				inst.input.val(dateStr);
			this._updateAlternate(inst);
			var onSelect = this._get(inst, 'onSelect');
			if(onSelect)
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
			// trigger custom callback
			else if(inst.input)
				inst.input.trigger('change');
			// fire the change event
			if(inst.inline)
				this._updateDatepicker(inst);
			else {
				this._hideDatepicker();
				this._lastInput = inst.input[0];
				if( typeof (inst.input[0]) != 'object')
					inst.input.focus();
				// restore focus
				this._lastInput = null;
			}
		},

		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate : function(inst) {
			var altField = this._get(inst, 'altField');
			if(altField) {// update alternate field too
				var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
				var date = this._getDate(inst);
				var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function() {
					$(this).val(dateStr);
				});
			}
		},

		/* Set as beforeShowDay function to prevent selection of weekends.
		 @param  date  Date - the date to customise
		 @return [boolean, string] - is this date selectable?, what is its CSS class? */
		noWeekends : function(date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ''];
		},

		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
		 @param  date  Date - the date to get the week for
		 @return  number - the number of the week within the year that contains this date */
		iso8601Week : function(date) {
			var checkDate = new Date(date.getTime());
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
			var time = checkDate.getTime();
			checkDate.setMonth(0);
			// Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},

		/* Parse a string value into a date object.
		 See formatDate below for the possible formats.

		 @param  format    string - the expected format of the date
		 @param  value     string - the date in the above format
		 @param  settings  Object - attributes include:
		 shortYearCutoff  number - the cutoff year for determining the century (optional)
		 dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		 dayNames         string[7] - names of the days from Sunday (optional)
		 monthNamesShort  string[12] - abbreviated names of the months (optional)
		 monthNames       string[12] - names of the months (optional)
		 @return  Date - the extracted date value or null if value is blank */
		parseDate : function(format, value, settings) {
			if(format == null || value == null)
				throw 'Invalid arguments';
			value = ( typeof value == 'object' ? value.toString() : value + '');
			if(value == '')
				return null;
			var shortYearCutoff = ( settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			shortYearCutoff = ( typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			var dayNamesShort = ( settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = ( settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = ( settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = ( settings ? settings.monthNames : null) || this._defaults.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			// Extract a number from the string value
			var getNumber = function(match) {
				var isDoubled = lookAhead(match);
				var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
				var digits = new RegExp('^\\d{1,' + size + '}');
				var num = value.substring(iValue).match(digits);
				if(!num)
					throw 'Missing number at position ' + iValue;
				iValue += num[0].length;
				return parseInt(num[0], 10);
			};
			// Extract a name from the string value and convert to an index
			var getName = function(match, shortNames, longNames) {
				var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
					return [[k, v]];
				}).sort(function(a, b) {
					return -(a[1].length - b[1].length);
				});
				var index = -1;
				$.each(names, function(i, pair) {
					var name = pair[1];
					if(value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if(index != -1)
					return index + 1;
				else
					throw 'Unknown name at position ' + iValue;
			};
			// Confirm that a literal character matches the string value
			var checkLiteral = function() {
				if(value.charAt(iValue) != format.charAt(iFormat))
					throw 'Unexpected literal at position ' + iValue;
				iValue++;
			};
			var iValue = 0;
			for(var iFormat = 0; iFormat < format.length; iFormat++) {
				if(literal)
					if(format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						checkLiteral();
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							day = getNumber('d');
							break;
						case 'D':
							getName('D', dayNamesShort, dayNames);
							break;
						case 'o':
							doy = getNumber('o');
							break;
						case 'm':
							month = getNumber('m');
							break;
						case 'M':
							month = getName('M', monthNamesShort, monthNames);
							break;
						case 'y':
							year = getNumber('y');
							break;
						case '@':
							var date = new Date(getNumber('@'));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case '!':
							var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if(lookAhead("'"))
								checkLiteral();
							else
								literal = true;
							break;
						default:
							checkLiteral();
					}
			}
			if(iValue < value.length) {
				var extra = value.substr(iValue);
				if(!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}
			if(year == -1)
				year = new Date().getFullYear();
			else if(year < 100)
				year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
			if(doy > -1) {
				month = 1;
				day = doy;
				do {
					var dim = this._getDaysInMonth(year, month - 1);
					if(day <= dim)
						break;
					month++;
					day -= dim;
				} while (true);
			}
			var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if(date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
				throw 'Invalid date';
			// E.g. 31/02/00
			return date;
		},

		/* Standard date formats. */
		ATOM : 'yy-mm-dd', // RFC 3339 (ISO 8601)
		COOKIE : 'D, dd M yy',
		ISO_8601 : 'yy-mm-dd',
		RFC_822 : 'D, d M y',
		RFC_850 : 'DD, dd-M-y',
		RFC_1036 : 'D, d M y',
		RFC_1123 : 'D, d M yy',
		RFC_2822 : 'D, d M yy',
		RSS : 'D, d M y', // RFC 822
		TICKS : '!',
		TIMESTAMP : '@',
		W3C : 'yy-mm-dd', // ISO 8601

		_ticksTo1970 : (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

		/* Format a date object into a string value.
		 The format can be combinations of the following:
		 d  - day of month (no leading zero)
		 dd - day of month (two digit)
		 o  - day of year (no leading zeros)
		 oo - day of year (three digit)
		 D  - day name short
		 DD - day name long
		 m  - month of year (no leading zero)
		 mm - month of year (two digit)
		 M  - month name short
		 MM - month name long
		 y  - year (two digit)
		 yy - year (four digit)
		 @ - Unix timestamp (ms since 01/01/1970)
		 ! - Windows ticks (100ns since 01/01/0001)
		 '...' - literal text
		 '' - single quote

		 @param  format    string - the desired format of the date
		 @param  date      Date - the date value to format
		 @param  settings  Object - attributes include:
		 dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		 dayNames         string[7] - names of the days from Sunday (optional)
		 monthNamesShort  string[12] - abbreviated names of the months (optional)
		 monthNames       string[12] - names of the months (optional)
		 @return  string - the date in the above format */
		formatDate : function(format, date, settings) {
			if(!date)
				return '';
			var dayNamesShort = ( settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = ( settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = ( settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = ( settings ? settings.monthNames : null) || this._defaults.monthNames;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			// Format a number, with leading zero if necessary
			var formatNumber = function(match, value, len) {
				var num = '' + value;
				if(lookAhead(match))
					while(num.length < len)
					num = '0' + num;
				return num;
			};
			// Format a name, short or long as requested
			var formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			};
			var output = '';
			var literal = false;
			if(date)
				for(var iFormat = 0; iFormat < format.length; iFormat++) {
					if(literal)
						if(format.charAt(iFormat) == "'" && !lookAhead("'"))
							literal = false;
						else
							output += format.charAt(iFormat);
					else
						switch (format.charAt(iFormat)) {
							case 'd':
								output += formatNumber('d', date.getDate(), 2);
								break;
							case 'D':
								output += formatName('D', date.getDay(), dayNamesShort, dayNames);
								break;
							case 'o':
								output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case 'm':
								output += formatNumber('m', date.getMonth() + 1, 2);
								break;
							case 'M':
								output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
								break;
							case 'y':
								output += (lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
								break;
							case '@':
								output += date.getTime();
								break;
							case '!':
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if(lookAhead("'"))
									output += "'";
								else
									literal = true;
								break;
							default:
								output += format.charAt(iFormat);
						}
				}
			return output;
		},

		/* Extract all possible characters from the date format. */
		_possibleChars : function(format) {
			var chars = '';
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			for(var iFormat = 0; iFormat < format.length; iFormat++)
				if(literal)
					if(format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						chars += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
						case 'm':
						case 'y':
						case '@':
							chars += '0123456789';
							break;
						case 'D':
						case 'M':
							return null;
						// Accept anything
						case "'":
							if(lookAhead("'"))
								chars += "'";
							else
								literal = true;
							break;
						default:
							chars += format.charAt(iFormat);
					}
			return chars;
		},

		/* Get a setting value, defaulting if necessary. */
		_get : function(inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
		},

		/* Parse existing date and initialise date picker. */
		_setDateFromField : function(inst, noDefault) {
			if(inst.input.val() == inst.lastVal) {
				return;
			}
			var dateFormat = this._get(inst, 'dateFormat');
			var dates = inst.lastVal = inst.input ? inst.input.val() : null;
			var date, defaultDate;
			date = defaultDate = this._getDefaultDate(inst);
			var settings = this._getFormatConfig(inst);
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				this.log(event);
				dates = ( noDefault ? '' : dates);
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = ( dates ? date.getDate() : 0);
			inst.currentMonth = ( dates ? date.getMonth() : 0);
			inst.currentYear = ( dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst);
		},

		/* Retrieve the default date shown on opening. */
		_getDefaultDate : function(inst) {
			return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
		},

		/* A date may be specified as an exact value or a relative one. */
		_determineDate : function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			};
			var offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), offset, $.datepicker._getFormatConfig(inst));
				} catch (e) {
					// Ignore
				}
				var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
				var matches = pattern.exec(offset);
				while(matches) {
					switch (matches[2] || 'd') {
						case 'd' :
						case 'D' :
							day += parseInt(matches[1], 10);
							break;
						case 'w' :
						case 'W' :
							day += parseInt(matches[1], 10) * 7;
							break;
						case 'm' :
						case 'M' :
							month += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case 'y':
						case 'Y' :
							year += parseInt(matches[1], 10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			};
			var newDate = (date == null || date === '' ? defaultDate : ( typeof date == 'string' ? offsetString(date) : ( typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
			newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
			if(newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},

		/* Handle switch to/from daylight saving.
		 Hours may be non-zero on daylight saving cut-over:
		 > 12 when midnight changeover, but then cannot generate
		 midnight datetime, so jump to 1AM, otherwise reset.
		 @param  date  (Date) the date to check
		 @return  (Date) the corrected date */
		_daylightSavingAdjust : function(date) {
			if(!date)
				return null;
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},

		/* Set the date(s) directly. */
		_setDate : function(inst, date, noChange) {
			var clear = !date;
			var origMonth = inst.selectedMonth;
			var origYear = inst.selectedYear;
			var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
				this._notifyChange(inst);
			this._adjustInstDate(inst);
			if(inst.input) {
				inst.input.val( clear ? '' : this._formatDate(inst));
			}
		},

		/* Retrieve the date(s) directly. */
		_getDate : function(inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
		},

		/* Attach the onxxx handlers.  These are declared statically so
		 * they work with static code transformers like Caja.
		 */
		_attachHandlers : function(inst) {
			var stepMonths = this._get(inst, 'stepMonths');
			var id = '#' + inst.id;
			inst.dpDiv.find('[data-handler]').map(function() {
				var handler = {
					prev : function() {
						window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, -stepMonths, 'M');
					},
					next : function() {
						window['DP_jQuery_' + dpuuid].datepicker._adjustDate(id, +stepMonths, 'M');
					},
					hide : function() {
						window['DP_jQuery_' + dpuuid].datepicker._hideDatepicker();
					},
					today : function() {
						window['DP_jQuery_' + dpuuid].datepicker._gotoToday(id);
					},
					selectDay : function() {
						window['DP_jQuery_' + dpuuid].datepicker._selectDay(id, +this.getAttribute('data-month'), +this.getAttribute('data-year'), this);
						return false;
					},
					selectMonth : function() {
						window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'M');
						return false;
					},
					selectYear : function() {
						window['DP_jQuery_' + dpuuid].datepicker._selectMonthYear(id, this, 'Y');
						return false;
					}
				};
				$(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
			});
		},

		/* Generate the HTML for the current state of the date picker. */
		_generateHTML : function(inst) {
			var today = new Date();
			today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
			// clear time
			var isRTL = this._get(inst, 'isRTL');
			var showButtonPanel = this._get(inst, 'showButtonPanel');
			var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
			var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
			var numMonths = this._getNumberOfMonths(inst);
			var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
			var stepMonths = this._get(inst, 'stepMonths');
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var drawMonth = inst.drawMonth - showCurrentAtPos;
			var drawYear = inst.drawYear;
			if(drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if(maxDate) {
				var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while(this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if(drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
			var prevText = this._get(inst, 'prevText');
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
			var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' + ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' : ( hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
			var nextText = this._get(inst, 'nextText');
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
			var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' + ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' : ( hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
			var currentText = this._get(inst, 'currentText');
			var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
			var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, 'closeText') + '</button>' : '');
			var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + ( isRTL ? controls : '') + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"' + '>' + currentText + '</button>' : '') + ( isRTL ? '' : controls) + '</div>' : '';
			var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
			var showWeek = this._get(inst, 'showWeek');
			var dayNames = this._get(inst, 'dayNames');
			var dayNamesShort = this._get(inst, 'dayNamesShort');
			var dayNamesMin = this._get(inst, 'dayNamesMin');
			var monthNames = this._get(inst, 'monthNames');
			var monthNamesShort = this._get(inst, 'monthNamesShort');
			var beforeShowDay = this._get(inst, 'beforeShowDay');
			var showOtherMonths = this._get(inst, 'showOtherMonths');
			var selectOtherMonths = this._get(inst, 'selectOtherMonths');
			var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
			var defaultDate = this._getDefaultDate(inst);
			var html = '';
			for(var row = 0; row < numMonths[0]; row++) {
				var group = '';
				this.maxRows = 4;
				for(var col = 0; col < numMonths[1]; col++) {
					var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					var cornerClass = ' ui-corner-all';
					var calender = '';
					if(isMultiMonth) {
						calender += '<div class="ui-datepicker-group';
						if(numMonths[1] > 1)
							switch (col) {
								case 0:
									calender += ' ui-datepicker-group-first';
									cornerClass = ' ui-corner-' + ( isRTL ? 'right' : 'left');
									break;
								case numMonths[1]-1:
									calender += ' ui-datepicker-group-last';
									cornerClass = ' ui-corner-' + ( isRTL ? 'left' : 'right');
									break;
								default:
									calender += ' ui-datepicker-group-middle';
									cornerClass = '';
									break;
							}
						calender += '">';
					}
					calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? ( isRTL ? next : prev) : '') + (/all|right/.test(cornerClass) && row == 0 ? ( isRTL ? prev : next) : '') + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
					var thead = ( showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
					for(var dow = 0; dow < 7; dow++) {// days of the week
						var day = (dow + firstDay) % 7;
						thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
					}
					calender += thead + '</tr></thead><tbody>';
					var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if(drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					var curRows = Math.ceil((leadDays + daysInMonth) / 7);
					// calculate the number of rows to generate
					var numRows = ( isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
					//If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for(var dRow = 0; dRow < numRows; dRow++) {// create date picker rows
						calender += '<tr>';
						var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' + this._get(inst, 'calculateWeek')(printDate) + '</td>');
						for(var dow = 0; dow < 7; dow++) {// create date picker days
							var daySettings = ( beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
							var otherMonth = (printDate.getMonth() != drawMonth);
							var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							( otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							( unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							( unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							( unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') + (printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							( otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>';
							// display selectable date
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + '</tr>';
					}
					drawMonth++;
					if(drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += '</tbody></table>' + ( isMultiMonth ? '</div>' + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
					group += calender;
				}
				html += group;
			}
			html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
			inst._keyEvent = false;
			return html;
		},

		/* Generate the month and year header. */
		_generateMonthYearHeader : function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
			var changeMonth = this._get(inst, 'changeMonth');
			var changeYear = this._get(inst, 'changeYear');
			var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
			var html = '<div class="ui-datepicker-title">';
			var monthHtml = '';
			// month selection
			if(secondary || !changeMonth)
				monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
			else {
				var inMinYear = (minDate && minDate.getFullYear() == drawYear);
				var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
				monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
				for(var month = 0; month < 12; month++) {
					if((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()))
						monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : '') + '>' + monthNamesShort[month] + '</option>';
				}
				monthHtml += '</select>';
			}
			if(!showMonthAfterYear)
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
			// year selection
			if(!inst.yearshtml) {
				inst.yearshtml = '';
				if(secondary || !changeYear)
					html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
				else {
					// determine range of years to display
					var years = this._get(inst, 'yearRange').split(':');
					var thisYear = new Date().getFullYear();
					var determineYear = function(value) {
						var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
						return (isNaN(year) ? thisYear : year);
					};
					var year = determineYear(years[0]);
					var endYear = Math.max(year, determineYear(years[1] || ''));
					year = ( minDate ? Math.max(year, minDate.getFullYear()) : year);
					endYear = ( maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
					inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
					for(; year <= endYear; year++) {
						inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : '') + '>' + year + '</option>';
					}
					inst.yearshtml += '</select>';

					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}
			html += this._get(inst, 'yearSuffix');
			if(showMonthAfterYear)
				html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
			html += '</div>';
			// Close datepicker_header
			return html;
		},

		/* Adjust one of the date sub-fields. */
		_adjustInstDate : function(inst, offset, period) {
			var year = inst.drawYear + (period == 'Y' ? offset : 0);
			var month = inst.drawMonth + (period == 'M' ? offset : 0);
			var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == 'D' ? offset : 0);
			var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if(period == 'M' || period == 'Y')
				this._notifyChange(inst);
		},

		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax : function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var newDate = (minDate && date < minDate ? minDate : date);
			newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
			return newDate;
		},

		/* Notify change of month/year. */
		_notifyChange : function(inst) {
			var onChange = this._get(inst, 'onChangeMonthYear');
			if(onChange)
				onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst]);
		},

		/* Determine the number of months to show. */
		_getNumberOfMonths : function(inst) {
			var numMonths = this._get(inst, 'numberOfMonths');
			return (numMonths == null ? [1, 1] : ( typeof numMonths == 'number' ? [1, numMonths] : numMonths));
		},

		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate : function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
		},

		/* Find the number of days in a given month. */
		_getDaysInMonth : function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},

		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth : function(year, month) {
			return new Date(year, month, 1).getDay();
		},

		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth : function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst);
			var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
			if(offset < 0)
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			return this._isInRange(inst, date);
		},

		/* Is the given date in the accepted range? */
		_isInRange : function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()));
		},

		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig : function(inst) {
			var shortYearCutoff = this._get(inst, 'shortYearCutoff');
			shortYearCutoff = ( typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {
				shortYearCutoff : shortYearCutoff,
				dayNamesShort : this._get(inst, 'dayNamesShort'),
				dayNames : this._get(inst, 'dayNames'),
				monthNamesShort : this._get(inst, 'monthNamesShort'),
				monthNames : this._get(inst, 'monthNames')
			};
		},

		/* Format the given date for display. */
		_formatDate : function(inst, day, month, year) {
			if(!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			var date = ( day ? ( typeof day == 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
		}
	});

	/*
	 * Bind hover events for datepicker elements.
	 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
	 * Global instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
	 */
	function bindHover(dpDiv) {
		var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
		return dpDiv.delegate(selector, 'mouseout', function() {
			$(this).removeClass('ui-state-hover');
			if(this.className.indexOf('ui-datepicker-prev') != -1)
				$(this).removeClass('ui-datepicker-prev-hover');
			if(this.className.indexOf('ui-datepicker-next') != -1)
				$(this).removeClass('ui-datepicker-next-hover');
		}).delegate(selector, 'mouseover', function() {
			if(!$.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
				$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
				$(this).addClass('ui-state-hover');
				if(this.className.indexOf('ui-datepicker-prev') != -1)
					$(this).addClass('ui-datepicker-prev-hover');
				if(this.className.indexOf('ui-datepicker-next') != -1)
					$(this).addClass('ui-datepicker-next-hover');
			}
		});
	}

	/* jQuery extend now ignores nulls! */
	function extendRemove(target, props) {
		$.extend(target, props);
		for(var name in props)
		if(props[name] == null || props[name] == undefined)
			target[name] = props[name];
		return target;
	};

	/* Determine whether an object is an array. */
	function isArray(a) {
		return (a && (($.browser.safari && typeof a == 'object' && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))));
	};

	/* Invoke the datepicker functionality.
	 @param  options  string - a command, optionally followed by additional parameters or
	 Object - settings for attaching new datepicker functionality
	 @return  jQuery object */
	$.fn.datepicker = function(options) {

		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if(!this.length) {
			return this;
		}

		/* Initialise the date picker. */
		if(!$.datepicker.initialized) {
			$(document).mousedown($.datepicker._checkExternalClick).find('body').append($.datepicker.dpDiv);
			$.datepicker.initialized = true;
		}

		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if( typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
			return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
		if(options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
			return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
		return this.each(function() {
			typeof options == 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options);
		});
	};

	$.datepicker = new Datepicker();
	// singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "@VERSION";

	// Workaround for #4055
	// Add another global to avoid noConflict issues with inline event handlers
	window['DP_jQuery_' + dpuuid] = $;

})(jQuery);



/***********************/
/** jquery.ui.datetimepicker.js **/
/***********************/
/*!
 * jQuery UI Datetimepicker @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datetimepicker
 *
 * Depends:
 *	jquery.ui.core.js
 */
(function($, undefined) {
	$.extend($.ui, {
		datepicker : {
			version : "@VERSION"
		}
	});
	
	var PROP_NAME = 'datetimepicker';
	var dpuuid = new Date().getTime();
	var instActive;
	// $('.date-timespinner').timespinner({});
	/* Date picker manager.
	 Use the singleton instance of this class, $.datepicker, to interact with the date picker.
	 Settings for (groups of) date pickers are maintained in an instance object,
	 allowing multiple different settings on the same page. */

	function Datetimepicker() {
		this.debug = false;
		// Change this to true to start debugging
		this._curInst = null;
		// The current instance in use
		this._keyEvent = false;
		// If the last event was a key event
		this._disabledInputs = [];
		// List of date picker inputs that have been disabled
		this._datepickerShowing = false;
		// True if the popup picker is showing , false if not
		this._inDialog = false;
		// True if showing within a "dialog", false if not
		this._mainDivId = 'ui-datepicker-div';
		// The ID of the main datepicker division
		this._inlineClass = 'ui-datepicker-inline';
		// The name of the inline marker class
		this._appendClass = 'ui-datepicker-append';
		// The name of the append marker class
		this._triggerClass = 'ui-datepicker-trigger';
		// The name of the trigger marker class
		this._dialogClass = 'ui-datepicker-dialog';
		// The name of the dialog marker class
		this._disableClass = 'ui-datepicker-disabled';
		// The name of the disabled covering marker class
		this._unselectableClass = 'ui-datepicker-unselectable';
		// The name of the unselectable cell marker class
		this._currentClass = 'ui-datepicker-current-day';
		// The name of the current day marker class
		this._dayOverClass = 'ui-datepicker-days-cell-over';
		// The name of the day hover marker class
		this.regional = [];
		// Available regional settings, indexed by language code
		this.regional[''] = {// Default regional settingss
			closeText : 'Done', // Display text for close link
			prevText : 'Prev', // Display text for previous month link
			nextText : 'Next', // Display text for next month link
			currentText : 'Today', // Display text for current month link
			monthNames : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'], // Names of months for drop-down and formatting
			monthNamesShort : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // For formatting
			dayNames : ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'], // For formatting
			dayNamesShort : ['日', '一', '二', '三', '四', '五', '六'], // For formatting
			dayNamesMin : ['日', '一', '二', '三', '四', '五', '六'], // Column headings for days starting at Sunday
			weekHeader : 'Wk', // Column header for week of the year
			dateFormat : 'yy-mm-dd', // See format options on parseDate
			firstDay : 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL : false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear : false, // True if the year select precedes month, false for month then year
			yearSuffix : '' // Additional text to append to the year in the month headers
		};
		this._defaults = {// Global defaults for all the date picker instances
			showOn : 'focus', // 'focus' for popup on focus,
			// 'button' for trigger button, or 'both' for either
			showAnim : 'fadeIn', // Name of jQuery animation for popup
			showOptions : {}, // Options for enhanced animations
			defaultDate : null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
			appendText : '', // Display text following the input box, e.g. showing the format
			buttonText : '...', // Text for trigger button
			buttonImage : '', // URL for trigger button image
			buttonImageOnly : false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext : false, // True to hide next/previous month links
			// if not applicable, false to just disable them
			navigationAsDateFormat : false, // True if date formatting applied to prev/today/next links
			gotoCurrent : false, // True if today link goes back to current selection instead
			changeMonth : false, // True if month can be selected directly, false if only prev/next
			changeYear : false, // True if year can be selected directly, false if only prev/next
			yearRange : 'c-10:c+10', // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths : false, // True to show dates in other months, false to leave blank
			selectOtherMonths : false, // True to allow selection of dates in other months, false for unselectable
			showWeek : false, // True to show week of the year, false to not show it
			calculateWeek : this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
			shortYearCutoff : '+10', // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with '+' for current year + value
			minDate : null, // The earliest selectable date, or null for no limit
			maxDate : null, // The latest selectable date, or null for no limit
			duration : 'fast', // Duration of display/closure
			beforeShowDay : null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or '',
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow : null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
			onSelect : null, // Define a callback function when a date is selected
			onChangeMonthYear : null, // Define a callback function when the month or year is changed
			onClose : null, // Define a callback function when the datepicker is closed
			numberOfMonths : 1, // Number of months to show at a time
			showCurrentAtPos : 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths : 1, // Number of months to step back/forward
			stepBigMonths : 12, // Number of months to step back/forward for the big links
			altField : '', // Selector for an alternate field to store selected dates into
			altFormat : '', // The date format to use for the alternate field
			constrainInput : true, // The input is constrained by the current date format
			showButtonPanel : false, // True to show button panel, false to not show it
			autoSize : false, // True to size the input for the date format, false to leave as is
			disabled : false // The initial disabled state
		};
		$.extend(this._defaults, this.regional['']);
		this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'));
	}


	$.extend(Datetimepicker.prototype, {
		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName : 'hasDatetimepicker',

		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows : 4,

		/* Debug logging (if enabled). */
		log : function() {
			if(this.debug)
				console.log.apply('', arguments);
		},

		// TODO rename to "widget" when switching to widget factory
		_widgetDatetimepicker : function() {
			return this.dpDiv;
		},

		/* Override the default settings for all instances of the date picker.
		 @param  settings  object - the new settings to use as defaults (anonymous object)
		 @return the manager object */
		setDefaults : function(settings) {
			extendRemove(this._defaults, settings || {});
			return this;
		},

		/* Attach the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span
		 @param  settings  object - the new settings to use for this date picker instance (anonymous) */
		_attachDatetimepicker : function(target, settings) {
			// check for settings on the control itself - in namespace 'date:'
			var inlineSettings = null;
			for(var attrName in this._defaults) {
				var attrValue = target.getAttribute('date:' + attrName);
				if(attrValue) {
					inlineSettings = inlineSettings || {};
					try {
						inlineSettings[attrName] = eval(attrValue);
					} catch (err) {
						inlineSettings[attrName] = attrValue;
					}
				}
			}
			var nodeName = target.nodeName.toLowerCase();
			var inline = (nodeName == 'div' || nodeName == 'span');
			if(!target.id) {
				this.uuid += 1;
				target.id = 'dp' + this.uuid;
			}
			var inst = this._newInst($(target), inline);
			inst.settings = $.extend({}, settings || {}, inlineSettings || {});
			if(nodeName == 'input') {
				this._connectDatetimepicker(target, inst);
			} else if(inline) {
				this._inlineDatetimepicker(target, inst);
			}
		},

		/* Create a new instance object. */
		_newInst : function(target, inline) {
			var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
			// escape jQuery meta chars
			return {
				id : id,
				input : target, // associated target
				selectedDay : 0,
				selectedMonth : 0,
				selectedYear : 0, // current selection
				drawMonth : 0,
				drawYear : 0, // month being drawn
				inline : inline, // is datepicker inline or not
				dpDiv : (!inline ? this.dpDiv : // presentation div
				bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
			};
		},

		/* Attach the date picker to an input field. */
		_connectDatetimepicker : function(target, inst) {
			var input = $(target);
			inst.append = $([]);
			inst.trigger = $([]);
			if(input.hasClass(this.markerClassName))
				return;
			this._attachments(input, inst);
			input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datetimepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datetimepicker", function(event, key) {
				return this._get(inst, key);
			});
			this._autoSize(inst);
			$.data(target, PROP_NAME, inst);
			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if(inst.settings.disabled) {
				this._disableDatetimepicker(target);
			}
		},

		/* Make attachments based on settings. */
		_attachments : function(input, inst) {
			var appendText = this._get(inst, 'appendText');
			var isRTL = this._get(inst, 'isRTL');
			if(inst.append)
				inst.append.remove();
			if(appendText) {
				inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
				input[isRTL ? 'before' : 'after'](inst.append);
			}
			input.unbind('focus', this._showDatetimepicker);
			if(inst.trigger)
				inst.trigger.remove();
			var showOn = this._get(inst, 'showOn');
			if(showOn == 'focus' || showOn == 'both')// pop-up date picker when in the marked field
				input.focus(this._showDatetimepicker);
			if(showOn == 'button' || showOn == 'both') {// pop-up date picker when button clicked
				var buttonText = this._get(inst, 'buttonText');
				var buttonImage = this._get(inst, 'buttonImage');
				inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
					src : buttonImage,
					alt : buttonText,
					title : buttonText
				}) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == '' ? buttonText : $('<img/>').attr({
					src : buttonImage,
					alt : buttonText,
					title : buttonText
				})));
				input[isRTL ? 'before' : 'after'](inst.trigger);
				inst.trigger.click(function() {
					if($.datetimepicker._datepickerShowing && $.datetimepicker._lastInput == input[0])
						$.datetimepicker._hideDatetimepicker();
					else if($.datetimepicker._datepickerShowing && $.datetimepicker._lastInput != input[0]) {
						$.datetimepicker._hideDatetimepicker();
						$.datetimepicker._showDatetimepicker(input[0]);
					} else
						$.datetimepicker._showDatetimepicker(input[0]);
					return false;
				});
			}
		},

		/* Apply the maximum length for the date format. */
		_autoSize : function(inst) {
			if(this._get(inst, 'autoSize') && !inst.inline) {
				var date = new Date(2009, 12 - 1, 20);
				// Ensure double digits
				var dateFormat = this._get(inst, 'dateFormat');
				if(dateFormat.match(/[DM]/)) {
					var findMax = function(names) {
						var max = 0;
						var maxI = 0;
						for(var i = 0; i < names.length; i++) {
							if(names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort'))));
					date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort'))) + 20 - date.getDay());
				}
				inst.input.attr('size', this._formatDate(inst, date).length);
			}
		},

		/* Attach an inline date picker to a div. */
		_inlineDatetimepicker : function(target, inst) {
			var divSpan = $(target);
			if(divSpan.hasClass(this.markerClassName))
				return;
			divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datetimepicker", function(event, key, value) {
				inst.settings[key] = value;
			}).bind("getData.datetimepicker", function(event, key) {
				return this._get(inst, key);
			});
			$.data(target, PROP_NAME, inst);
			this._setDate(inst, this._getDefaultDate(inst), true);
			this._updateDatetimepicker(inst);
			this._updateAlternate(inst);
			//If disabled option is true, disable the datetimepicker before showing it (see ticket #5665)
			if(inst.settings.disabled) {
				this._disableDatetimepicker(target);
			}
			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datetimepicker created on a detached div has zero height
			inst.dpDiv.css("display", "block");
		},

		/* Pop-up the date picker in a "dialog" box.
		 @param  input     element - ignored
		 @param  date      string or Date - the initial date to display
		 @param  onSelect  function - the function to call when a date is selected
		 @param  settings  object - update the dialog date picker instance's settings (anonymous object)
		 @param  pos       int[2] - coordinates for the dialog's position within the screen or
		 event - with x/y coordinates or
		 leave empty for default (screen centre)
		 @return the manager object */
		_dialogDatetimepicker : function(input, date, onSelect, settings, pos) {
			var inst = this._dialogInst;
			// internal instance
			if(!inst) {
				this.uuid += 1;
				var id = 'dp' + this.uuid;
				this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				$('body').append(this._dialogInput);
				inst = this._dialogInst = this._newInst(this._dialogInput, false);
				inst.settings = {};
				$.data(this._dialogInput[0], PROP_NAME, inst);
			}
			extendRemove(inst.settings, settings || {});
			date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
			this._dialogInput.val(date);

			this._pos = ( pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
			if(!this._pos) {
				var browserWidth = document.documentElement.clientWidth;
				var browserHeight = document.documentElement.clientHeight;
				var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
			}

			// move input on screen for focus, but hidden behind dialog
			this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatetimepicker(this._dialogInput[0]);
			if($.blockUI)
				$.blockUI(this.dpDiv);
			$.data(this._dialogInput[0], PROP_NAME, inst);
			return this;
		},

		/* Detach a datetimepicker from its control.
		 @param  target    element - the target input field or division or span */
		_destroyDatetimepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			$.removeData(target, PROP_NAME);
			if(nodeName == 'input') {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass(this.markerClassName).unbind('focus', this._showDatetimepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp);
			} else if(nodeName == 'div' || nodeName == 'span')
				$target.removeClass(this.markerClassName).empty();
		},

		/* Enable the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span */
		_enableDatetimepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName == 'input') {
				target.disabled = false;
				inst.trigger.filter('button').each(function() {
					this.disabled = false;
				}).end().filter('img').css({
					opacity : '1.0',
					cursor : ''
				});
			} else if(nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().removeClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false);
			}
			this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return (value == target ? null : value);
			});
			// delete entry
		},

		/* Disable the date picker to a jQuery selection.
		 @param  target    element - the target input field or division or span */
		_disableDatetimepicker : function(target) {
			var $target = $(target);
			var inst = $.data(target, PROP_NAME);
			if(!$target.hasClass(this.markerClassName)) {
				return;
			}
			var nodeName = target.nodeName.toLowerCase();
			if(nodeName == 'input') {
				target.disabled = true;
				inst.trigger.filter('button').each(function() {
					this.disabled = true;
				}).end().filter('img').css({
					opacity : '0.5',
					cursor : 'default'
				});
			} else if(nodeName == 'div' || nodeName == 'span') {
				var inline = $target.children('.' + this._inlineClass);
				inline.children().addClass('ui-state-disabled');
				inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true);
			}
			this._disabledInputs = $.map(this._disabledInputs, function(value) {
				return (value == target ? null : value);
			});
			// delete entry
			this._disabledInputs[this._disabledInputs.length] = target;
		},

		/* Is the first field in a jQuery collection disabled as a datepicker?
		 @param  target    element - the target input field or division or span
		 @return boolean - true if disabled, false if enabled */
		_isDisabledDatetimepicker : function(target) {
			if(!target) {
				return false;
			}
			for(var i = 0; i < this._disabledInputs.length; i++) {
				if(this._disabledInputs[i] == target)
					return true;
			}
			return false;
		},

		/* Retrieve the instance data for the target control.
		 @param  target  element - the target input field or division or span
		 @return  object - the associated instance data
		 @throws  error if a jQuery problem getting data */
		_getInst : function(target) {
			try {
				return $.data(target, PROP_NAME);
			} catch (err) {
				throw 'Missing instance data for this datetimepicker';
			}
		},

		/* Update or retrieve the settings for a date picker attached to an input field or division.
		 @param  target  element - the target input field or division or span
		 @param  name    object - the new settings to update or
		 string - the name of the setting to change or retrieve,
		 when retrieving also 'all' for all instance settings or
		 'defaults' for all global defaults
		 @param  value   any - the new value for the setting
		 (omit if above is an object or to retrieve a value) */
		_optionDatetimepicker : function(target, name, value) {
			var inst = this._getInst(target);
			if(arguments.length == 2 && typeof name == 'string') {
				return (name == 'defaults' ? $.extend({}, $.datetimepicker._defaults) : ( inst ? (name == 'all' ? $.extend({}, inst.settings) : this._get(inst, name)) : null));
			}
			var settings = name || {};
			if( typeof name == 'string') {
				settings = {};
				settings[name] = value;
			}
			if(inst) {
				if(this._curInst == inst) {
					this._hideDatetimepicker();
				}
				var date = this._getDateDatetimepicker(target, true);
				var minDate = this._getMinMaxDate(inst, 'min');
				var maxDate = this._getMinMaxDate(inst, 'max');
				extendRemove(inst.settings, settings);
				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if(minDate !== null && settings['dateFormat'] !== undefined && settings['minDate'] === undefined)
					inst.settings.minDate = this._formatDate(inst, minDate);
				if(maxDate !== null && settings['dateFormat'] !== undefined && settings['maxDate'] === undefined)
					inst.settings.maxDate = this._formatDate(inst, maxDate);
				this._attachments($(target), inst);
				this._autoSize(inst);
				this._setDate(inst, date);
				this._updateAlternate(inst);
				this._updateDatetimepicker(inst);
			}
		},

		// change method deprecated
		_changeDatetimepicker : function(target, name, value) {
			this._optionDatetimepicker(target, name, value);
		},

		/* Redraw the date picker attached to an input field or division.
		 @param  target  element - the target input field or division or span */
		_refreshDatetimepicker : function(target) {
			var inst = this._getInst(target);
			if(inst) {
				this._updateDatetimepicker(inst);
			}
		},

		/* Set the dates for a jQuery selection.
		 @param  target   element - the target input field or division or span
		 @param  date     Date - the new date */
		_setDateDatetimepicker : function(target, date) {
			var inst = this._getInst(target);
			if(inst) {
				this._setDate(inst, date);
				this._updateDatetimepicker(inst);
				this._updateAlternate(inst);
			}
		},

		/* Get the date(s) for the first entry in a jQuery selection.
		 @param  target     element - the target input field or division or span
		 @param  noDefault  boolean - true if no default date is to be used
		 @return Date - the current date */
		_getDateDatetimepicker : function(target, noDefault) {
			var inst = this._getInst(target);
			if(inst && !inst.inline)
				this._setDateFromField(inst, noDefault);
			return ( inst ? this._getDate(inst) : null);
		},

		/* Handle keystrokes. */
		_doKeyDown : function(event) {
			var inst = $.datetimepicker._getInst(event.target);
			var handled = true;
			var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
			inst._keyEvent = true;
			if($.datetimepicker._datepickerShowing)
				switch (event.keyCode) {
					case 9:
						$.datetimepicker._hideDatetimepicker();
						handled = false;
						break;
					// hide on tab out
					case 13:
						var sel = $('td.' + $.datetimepicker._dayOverClass + ':not(.' + $.datetimepicker._currentClass + ')', inst.dpDiv);
						if(sel[0])
							$.datetimepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						var onSelect = $.datetimepicker._get(inst, 'onSelect');
						if(onSelect) {
							var dateStr = $.datetimepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else
							$.datetimepicker._hideDatetimepicker();
						return false;
						// don't submit the form
						break;
					// select the value on enter
					case 27:
						$.datetimepicker._hideDatetimepicker();
						break;
					// hide on escape
					case 33:
						$.datetimepicker._adjustDate(event.target, (event.ctrlKey ? -$.datetimepicker._get(inst, 'stepBigMonths') : -$.datetimepicker._get(inst, 'stepMonths')), 'M');
						break;
					// previous month/year on page up/+ ctrl
					case 34:
						$.datetimepicker._adjustDate(event.target, (event.ctrlKey ? +$.datetimepicker._get(inst, 'stepBigMonths') : +$.datetimepicker._get(inst, 'stepMonths')), 'M');
						break;
					// next month/year on page down/+ ctrl
					case 35:
						if(event.ctrlKey || event.metaKey)
							$.datetimepicker._clearDate(event.target);
						handled = event.ctrlKey || event.metaKey;
						break;
					// clear on ctrl or command +end
					case 36:
						if(event.ctrlKey || event.metaKey)
							$.datetimepicker._gotoToday(event.target);
						handled = event.ctrlKey || event.metaKey;
						break;
					// current on ctrl or command +home
					case 37:
						if(event.ctrlKey || event.metaKey)
							$.datetimepicker._adjustDate(event.target, ( isRTL ? +1 : -1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if(event.originalEvent.altKey)
							$.datetimepicker._adjustDate(event.target, (event.ctrlKey ? -$.datetimepicker._get(inst, 'stepBigMonths') : -$.datetimepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +left on Mac
						break;
					case 38:
						if(event.ctrlKey || event.metaKey)
							$.datetimepicker._adjustDate(event.target, -7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break;
					// -1 week on ctrl or command +up
					case 39:
						if(event.ctrlKey || event.metaKey)
							$.datetimepicker._adjustDate(event.target, ( isRTL ? -1 : +1), 'D');
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if(event.originalEvent.altKey)
							$.datetimepicker._adjustDate(event.target, (event.ctrlKey ? +$.datetimepicker._get(inst, 'stepBigMonths') : +$.datetimepicker._get(inst, 'stepMonths')), 'M');
						// next month/year on alt +right
						break;
					case 40:
						if(event.ctrlKey || event.metaKey)
							$.datetimepicker._adjustDate(event.target, +7, 'D');
						handled = event.ctrlKey || event.metaKey;
						break;
					// +1 week on ctrl or command +down
					default:
						handled = false;
				}
			else if(event.keyCode == 36 && event.ctrlKey)// display the date picker on ctrl+home
				$.datetimepicker._showDatetimepicker(this);
			else {
				handled = false;
			}
			if(handled) {
				event.preventDefault();
				event.stopPropagation();
			}
		},

		/* Filter entered characters - based on date format. */
		_doKeyPress : function(event) {
			var inst = $.datetimepicker._getInst(event.target);
			if($.datetimepicker._get(inst, 'constrainInput')) {
				var chars = $.datetimepicker._possibleChars($.datetimepicker._get(inst, 'dateFormat'));
				var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
				return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1);
			}
		},

		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp : function(event) {
			var inst = $.datetimepicker._getInst(event.target);
			if(inst.input.val() != inst.lastVal) {
				try {
					var date = $.datetimepicker.parseDate($.datetimepicker._get(inst, 'dateFormat'), (inst.input ? inst.input.val() : null), $.datetimepicker._getFormatConfig(inst));
					if(date) {// only if valid
						$.datetimepicker._setDateFromField(inst);
						$.datetimepicker._updateAlternate(inst);
						$.datetimepicker._updateDatetimepicker(inst);
					}
				} catch (err) {
					$.datetimepicker.log(err);
				}
			}
			return true;
		},

		/* Pop-up the date picker for a given input field.
		 If false returned from beforeShow event handler do not show.
		 @param  input  element - the input field attached to the date picker or
		 event - if triggered by focus */
		_showDatetimepicker : function(input) {
			// var timespinner = $('<input class="date-timespinner" />').insertAfter('.ui-datepicker-div');
			input = input.target || input;
			if(input.nodeName.toLowerCase() != 'input')// find from button/image trigger
				input = $('input', input.parentNode)[0];
			if($.datetimepicker._isDisabledDatetimepicker(input) || $.datetimepicker._lastInput == input)// already here
				return;
			var inst = $.datetimepicker._getInst(input);
			if($.datetimepicker._curInst && $.datetimepicker._curInst != inst) {
				$.datetimepicker._curInst.dpDiv.stop(true, true);
				if(inst && $.datetimepicker._datepickerShowing) {
					$.datetimepicker._hideDatetimepicker($.datetimepicker._curInst.input[0]);
				}
			}
			var beforeShow = $.datetimepicker._get(inst, 'beforeShow');
			var beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
			if(beforeShowSettings === false) {
				//false
				return;
			}
			extendRemove(inst.settings, beforeShowSettings);
			inst.lastVal = null;
			$.datetimepicker._lastInput = input;
			$.datetimepicker._setDateFromField(inst);
			if($.datetimepicker._inDialog)// hide cursor
				input.value = '';
			if(!$.datetimepicker._pos) {// position below input
				$.datetimepicker._pos = $.datetimepicker._findPos(input);
				$.datetimepicker._pos[1] += input.offsetHeight;
				// add the height
			}
			var isFixed = false;
			$(input).parents().each(function() {
				isFixed |= $(this).css('position') == 'fixed';
				return !isFixed;
			});
			if(isFixed && $.browser.opera) {// correction for Opera when fixed and scrolled
				$.datetimepicker._pos[0] -= document.documentElement.scrollLeft;
				$.datetimepicker._pos[1] -= document.documentElement.scrollTop;
			}
			var offset = {
				left : $.datetimepicker._pos[0],
				top : $.datetimepicker._pos[1]
			};
			$.datetimepicker._pos = null;
			//to avoid flashes on Firefox
			inst.dpDiv.empty();
			// determine sizing offscreen
			inst.dpDiv.css({
				position : 'absolute',
				display : 'block',
				top : '-1000px'
			});
			$.datetimepicker._updateDatetimepicker(inst);
			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datetimepicker._checkOffset(inst, offset, isFixed);
			inst.dpDiv.css({
				position : ($.datetimepicker._inDialog && $.blockUI ? 'static' : ( isFixed ? 'fixed' : 'absolute')),
				display : 'none',
				left : offset.left + 'px',
				top : offset.top + 'px'
			});
			if(!inst.inline) {
				var showAnim = $.datetimepicker._get(inst, 'showAnim');
				var duration = $.datetimepicker._get(inst, 'duration');
				var postProcess = function() {
					var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
					// IE6- only
					if(!!cover.length) {
						var borders = $.datetimepicker._getBorders(inst.dpDiv);
						cover.css({
							left : -borders[0],
							top : -borders[1],
							width : inst.dpDiv.outerWidth(),
							height : inst.dpDiv.outerHeight()
						});
					}
				};
				inst.dpDiv.zIndex($(input).zIndex() + 1);
				$.datetimepicker._datepickerShowing = true;

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim] ))
					inst.dpDiv.show(showAnim, $.datetimepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[showAnim || 'show'](( showAnim ? duration : null), postProcess);
				if(!showAnim || !duration)
					postProcess();
				if(inst.input.is(':visible') && !inst.input.is(':disabled'))
					inst.input.focus();
				$.datetimepicker._curInst = inst;
			}
		},

		/* Generate the date picker content. */
		_updateDatetimepicker : function(inst) {
			this.maxRows = 4;
			//Reset the max number of rows being displayed (see #7043)
			var borders = $.datetimepicker._getBorders(inst.dpDiv);
			instActive = inst;
			// for delegate hover events
			
			inst.dpDiv.empty().append(this._generateHTML(inst));
			
			// TODO setp1
			// 添加时间选择器
			inst.dpDiv.find('.date-timespinner').timespinner({
				label : '',
				width : 80
			});
			// 添加确定按钮
			inst.dpDiv.find('.date-ok').button({
				label : '确定'
			}).css({
				marginTop : '-3px',
				float : 'right'
			}).bind('click.datetimepicker',function (event){
				var state = $.data(inst, 'datetimepicker');
				if(state){
					$.datetimepicker._selectDay(state.id, state.dateMonth, state.dateYear, state.target);
				}else{
					var dd = new Date();
					var today = inst.dpDiv.find('.ui-datepicker-today');
					$.datetimepicker._selectDay('#'+inst.id, today.attr('data-month'), today.attr('data-year'), today);
				}
			});
			
			this._attachHandlers(inst);
			var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
			// IE6- only
			if(!!cover.length) {//avoid call to outerXXXX() when not in IE6
				cover.css({
					left : -borders[0],
					top : -borders[1],
					width : inst.dpDiv.outerWidth(),
					height : inst.dpDiv.outerHeight()
				})
			}
			inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
			var numMonths = this._getNumberOfMonths(inst);
			var cols = numMonths[1];
			var width = 17;
			inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
			if(cols > 1)
				inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
			inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') +
			'Class']('ui-datepicker-multi');
			inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') +
			'Class']('ui-datepicker-rtl');
			if(inst == $.datetimepicker._curInst && $.datetimepicker._datepickerShowing && inst.input &&
				// #6694 - don't focus the input if it's already focused
				// this breaks the change event in IE
				inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
				inst.input.focus();
			// deffered render of the years select (to avoid flashes on Firefox)
			if(inst.yearshtml) {
				var origyearshtml = inst.yearshtml;
				setTimeout(function() {
					//assure that inst.yearshtml didn't change.
					if(origyearshtml === inst.yearshtml && inst.yearshtml) {
						inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml);
					}
					origyearshtml = inst.yearshtml = null;
				}, 0);
			}
		},

		/* Retrieve the size of left and top borders for an element.
		 @param  elem  (jQuery object) the element of interest
		 @return  (number[2]) the left and top borders */
		_getBorders : function(elem) {
			var convert = function(value) {
				return {thin: 1, medium: 2, thick: 3}[value] || value;
			};
			return [parseFloat(convert(elem.css('border-left-width'))), parseFloat(convert(elem.css('border-top-width')))];
		},

		/* Check positioning to remain on screen. */
		_checkOffset : function(inst, offset, isFixed) {
			var dpWidth = inst.dpDiv.outerWidth();
			var dpHeight = inst.dpDiv.outerHeight();
			var inputWidth = inst.input ? inst.input.outerWidth() : 0;
			var inputHeight = inst.input ? inst.input.outerHeight() : 0;
			var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
			var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();

			offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
			offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
			offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

			// now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
			offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);

			return offset;
		},

		/* Find an object's position on the screen. */
		_findPos : function(obj) {
			var inst = this._getInst(obj);
			var isRTL = this._get(inst, 'isRTL');
			while(obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
				obj = obj[ isRTL ? 'previousSibling' : 'nextSibling'];
			}
			var position = $(obj).offset();
			return [position.left, position.top];
		},

		/* Hide the date picker from view.
		 @param  input  element - the input field attached to the date picker */
		_hideDatetimepicker : function(input) {
			var inst = this._curInst;
			if(!inst || (input && inst != $.data(input, PROP_NAME)))
				return;
			if(this._datepickerShowing) {
				var showAnim = this._get(inst, 'showAnim');
				var duration = this._get(inst, 'duration');
				var postProcess = function() {
					$.datetimepicker._tidyDialog(inst);
				};

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if($.effects && ($.effects.effect[showAnim] || $.effects[showAnim] ))
					inst.dpDiv.hide(showAnim, $.datetimepicker._get(inst, 'showOptions'), duration, postProcess);
				else
					inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' :
					(showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))](( showAnim ? duration : null), postProcess);
				if(!showAnim)
					postProcess();
				this._datepickerShowing = false;
				var onClose = this._get(inst, 'onClose');
				if(onClose)
					onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst]);
				this._lastInput = null;
				if(this._inDialog) {
					this._dialogInput.css({
						position : 'absolute',
						left : '0',
						top : '-100px'
					});
					if($.blockUI) {
						$.unblockUI();
						$('body').append(this.dpDiv);
					}
				}
				this._inDialog = false;
			}
		},

		/* Tidy up after a dialog display. */
		_tidyDialog : function(inst) {
			inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar');
		},

		/* Close date picker if clicked elsewhere. */
		_checkExternalClick : function(event) {
			if(!$.datetimepicker._curInst)
				return;

			var $target = $(event.target), inst = $.datetimepicker._getInst($target[0]);

			if((($target[0].id != $.datetimepicker._mainDivId && $target.parents('#' + $.datetimepicker._mainDivId).length == 0 && !$target.hasClass($.datetimepicker.markerClassName) && !$target.closest("." + $.datetimepicker._triggerClass).length && $.datetimepicker._datepickerShowing && !($.datetimepicker._inDialog && $.blockUI) ) ) || ($target.hasClass($.datetimepicker.markerClassName) && $.datetimepicker._curInst != inst ))
				$.datetimepicker._hideDatetimepicker();
		},

		/* Adjust one of the date sub-fields. */
		_adjustDate : function(id, offset, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if(this._isDisabledDatetimepicker(target[0])) {
				return;
			}
			this._adjustInstDate(inst, offset + (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), // undo positioning
			period);
			this._updateDatetimepicker(inst);
		},

		/* Action for current link. */
		_gotoToday : function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			if(this._get(inst, 'gotoCurrent') && inst.currentDay) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				var date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a new month/year. */
		_selectMonthYear : function(id, select, period) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			inst['selected' + (period == 'M' ? 'Month' : 'Year')] = inst['draw' + (period == 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
			this._notifyChange(inst);
			this._adjustDate(target);
		},

		/* Action for selecting a day. */
		_selectDay : function(id, month, year, td) {
			var target = $(id);
			if($(td).hasClass(this._unselectableClass) || this._isDisabledDatetimepicker(target[0])) {
				return;
			}
			var inst = this._getInst(target[0]);
			inst.selectedDay = inst.currentDay = $('a', td).html();
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			// TODO setp3
			this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear));
		},

		/* Erase the input field and hide the date picker. */
		_clearDate : function(id) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			this._selectDate(target, '');
		},

		/* Update the input field with the selected date. */
		_selectDate : function(id, dateStr) {
			var target = $(id);
			var inst = this._getInst(target[0]);
			dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
			
			dateStr += ' ' + inst.dpDiv.find('.date-timespinner').val();
			
			
			if(inst.input)
				inst.input.val(dateStr);
			this._updateAlternate(inst);
			var onSelect = this._get(inst, 'onSelect');
			if(onSelect)
				onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
			// trigger custom callback
			else if(inst.input)
				inst.input.trigger('change');
			// fire the change event
			if(inst.inline)
				this._updateDatetimepicker(inst);
			else {
				this._hideDatetimepicker();
				this._lastInput = inst.input[0];
				if( typeof (inst.input[0]) != 'object')
					inst.input.focus();
				// restore focus
				this._lastInput = null;
			}
		},

		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate : function(inst) {
			var altField = this._get(inst, 'altField');
			if(altField) {// update alternate field too
				var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
				var date = this._getDate(inst);
				var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
				$(altField).each(function() {
					$(this).val(dateStr);
				});
			}
		},

		/* Set as beforeShowDay function to prevent selection of weekends.
		 @param  date  Date - the date to customise
		 @return [boolean, string] - is this date selectable?, what is its CSS class? */
		noWeekends : function(date) {
			var day = date.getDay();
			return [(day > 0 && day < 6), ''];
		},

		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
		 @param  date  Date - the date to get the week for
		 @return  number - the number of the week within the year that contains this date */
		iso8601Week : function(date) {
			var checkDate = new Date(date.getTime());
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
			var time = checkDate.getTime();
			checkDate.setMonth(0);
			// Compare with Jan 1
			checkDate.setDate(1);
			return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
		},

		/* Parse a string value into a date object.
		 See formatDate below for the possible formats.

		 @param  format    string - the expected format of the date
		 @param  value     string - the date in the above format
		 @param  settings  Object - attributes include:
		 shortYearCutoff  number - the cutoff year for determining the century (optional)
		 dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		 dayNames         string[7] - names of the days from Sunday (optional)
		 monthNamesShort  string[12] - abbreviated names of the months (optional)
		 monthNames       string[12] - names of the months (optional)
		 @return  Date - the extracted date value or null if value is blank */
		parseDate : function(format, value, settings) {
			if(format == null || value == null)
				throw 'Invalid arguments';
			value = ( typeof value == 'object' ? value.toString() : value + '');
			if(value == '')
				return null;
			var shortYearCutoff = ( settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
			shortYearCutoff = ( typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			var dayNamesShort = ( settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = ( settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = ( settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = ( settings ? settings.monthNames : null) || this._defaults.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			// Extract a number from the string value
			var getNumber = function(match) {
				var isDoubled = lookAhead(match);
				var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
				var digits = new RegExp('^\\d{1,' + size + '}');
				var num = value.substring(iValue).match(digits);
				if(!num)
					throw 'Missing number at position ' + iValue;
				iValue += num[0].length;
				return parseInt(num[0], 10);
			};
			// Extract a name from the string value and convert to an index
			var getName = function(match, shortNames, longNames) {
				var names = $.map(lookAhead(match) ? longNames : shortNames, function(v, k) {
					return [[k, v]];
				}).sort(function(a, b) {
					return -(a[1].length - b[1].length);
				});
				var index = -1;
				$.each(names, function(i, pair) {
					var name = pair[1];
					if(value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if(index != -1)
					return index + 1;
				else
					throw 'Unknown name at position ' + iValue;
			};
			// Confirm that a literal character matches the string value
			var checkLiteral = function() {
				if(value.charAt(iValue) != format.charAt(iFormat))
					throw 'Unexpected literal at position ' + iValue;
				iValue++;
			};
			var iValue = 0;
			for(var iFormat = 0; iFormat < format.length; iFormat++) {
				if(literal)
					if(format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						checkLiteral();
				else
					switch (format.charAt(iFormat)) {
						case 'd':
							day = getNumber('d');
							break;
						case 'D':
							getName('D', dayNamesShort, dayNames);
							break;
						case 'o':
							doy = getNumber('o');
							break;
						case 'm':
							month = getNumber('m');
							break;
						case 'M':
							month = getName('M', monthNamesShort, monthNames);
							break;
						case 'y':
							year = getNumber('y');
							break;
						case '@':
							var date = new Date(getNumber('@'));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case '!':
							var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if(lookAhead("'"))
								checkLiteral();
							else
								literal = true;
							break;
						default:
							checkLiteral();
					}
			}
			if(iValue < value.length) {
				var extra = value.substr(iValue);
				if(!/^\s+/.test(extra)) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}
			if(year == -1)
				year = new Date().getFullYear();
			else if(year < 100)
				year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
			if(doy > -1) {
				month = 1;
				day = doy;
				do {
					var dim = this._getDaysInMonth(year, month - 1);
					if(day <= dim)
						break;
					month++;
					day -= dim;
				} while (true);
			}
			var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
			if(date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
				throw 'Invalid date';
			// E.g. 31/02/00
			return date;
		},

		/* Standard date formats. */
		ATOM : 'yy-mm-dd', // RFC 3339 (ISO 8601)
		COOKIE : 'D, dd M yy',
		ISO_8601 : 'yy-mm-dd',
		RFC_822 : 'D, d M y',
		RFC_850 : 'DD, dd-M-y',
		RFC_1036 : 'D, d M y',
		RFC_1123 : 'D, d M yy',
		RFC_2822 : 'D, d M yy',
		RSS : 'D, d M y', // RFC 822
		TICKS : '!',
		TIMESTAMP : '@',
		W3C : 'yy-mm-dd', // ISO 8601

		_ticksTo1970 : (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

		/* Format a date object into a string value.
		 The format can be combinations of the following:
		 d  - day of month (no leading zero)
		 dd - day of month (two digit)
		 o  - day of year (no leading zeros)
		 oo - day of year (three digit)
		 D  - day name short
		 DD - day name long
		 m  - month of year (no leading zero)
		 mm - month of year (two digit)
		 M  - month name short
		 MM - month name long
		 y  - year (two digit)
		 yy - year (four digit)
		 @ - Unix timestamp (ms since 01/01/1970)
		 ! - Windows ticks (100ns since 01/01/0001)
		 '...' - literal text
		 '' - single quote

		 @param  format    string - the desired format of the date
		 @param  date      Date - the date value to format
		 @param  settings  Object - attributes include:
		 dayNamesShort    string[7] - abbreviated names of the days from Sunday (optional)
		 dayNames         string[7] - names of the days from Sunday (optional)
		 monthNamesShort  string[12] - abbreviated names of the months (optional)
		 monthNames       string[12] - names of the months (optional)
		 @return  string - the date in the above format */
		formatDate : function(format, date, settings) {
			if(!date)
				return '';
			var dayNamesShort = ( settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
			var dayNames = ( settings ? settings.dayNames : null) || this._defaults.dayNames;
			var monthNamesShort = ( settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
			var monthNames = ( settings ? settings.monthNames : null) || this._defaults.monthNames;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			// Format a number, with leading zero if necessary
			var formatNumber = function(match, value, len) {
				var num = '' + value;
				if(lookAhead(match))
					while(num.length < len)
					num = '0' + num;
				return num;
			};
			// Format a name, short or long as requested
			var formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			};
			var output = '';
			var literal = false;
			if(date)
				for(var iFormat = 0; iFormat < format.length; iFormat++) {
					if(literal)
						if(format.charAt(iFormat) == "'" && !lookAhead("'"))
							literal = false;
						else
							output += format.charAt(iFormat);
					else
						switch (format.charAt(iFormat)) {
							case 'd':
								output += formatNumber('d', date.getDate(), 2);
								break;
							case 'D':
								output += formatName('D', date.getDay(), dayNamesShort, dayNames);
								break;
							case 'o':
								output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
								break;
							case 'm':
								output += formatNumber('m', date.getMonth() + 1, 2);
								break;
							case 'M':
								output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
								break;
							case 'y':
								output += (lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
								break;
							case '@':
								output += date.getTime();
								break;
							case '!':
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if(lookAhead("'"))
									output += "'";
								else
									literal = true;
								break;
							default:
								output += format.charAt(iFormat);
						}
				}
			return output;
		},

		/* Extract all possible characters from the date format. */
		_possibleChars : function(format) {
			var chars = '';
			var literal = false;
			// Check whether a format character is doubled
			var lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
				if(matches)
					iFormat++;
				return matches;
			};
			for(var iFormat = 0; iFormat < format.length; iFormat++)
				if(literal)
					if(format.charAt(iFormat) == "'" && !lookAhead("'"))
						literal = false;
					else
						chars += format.charAt(iFormat);
				else
					switch (format.charAt(iFormat)) {
						case 'd':
						case 'm':
						case 'y':
						case '@':
							chars += '0123456789';
							break;
						case 'D':
						case 'M':
							return null;
						// Accept anything
						case "'":
							if(lookAhead("'"))
								chars += "'";
							else
								literal = true;
							break;
						default:
							chars += format.charAt(iFormat);
					}
			return chars;
		},

		/* Get a setting value, defaulting if necessary. */
		_get : function(inst, name) {
			return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name];
		},

		/* Parse existing date and initialise date picker. */
		_setDateFromField : function(inst, noDefault) {
			if(inst.input.val() == inst.lastVal) {
				return;
			}
			var dateFormat = this._get(inst, 'dateFormat');
			var dates = inst.lastVal = inst.input ? inst.input.val() : null;
			var date, defaultDate;
			date = defaultDate = this._getDefaultDate(inst);
			var settings = this._getFormatConfig(inst);
			try {
				date = this.parseDate(dateFormat, dates, settings) || defaultDate;
			} catch (event) {
				this.log(event);
				dates = ( noDefault ? '' : dates);
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = ( dates ? date.getDate() : 0);
			inst.currentMonth = ( dates ? date.getMonth() : 0);
			inst.currentYear = ( dates ? date.getFullYear() : 0);
			this._adjustInstDate(inst);
		},

		/* Retrieve the default date shown on opening. */
		_getDefaultDate : function(inst) {
			return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()));
		},

		/* A date may be specified as an exact value or a relative one. */
		_determineDate : function(inst, date, defaultDate) {
			var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			};
			var offsetString = function(offset) {
				try {
					return $.datetimepicker.parseDate($.datetimepicker._get(inst, 'dateFormat'), offset, $.datetimepicker._getFormatConfig(inst));
				} catch (e) {
					// Ignore
				}
				var date = (offset.toLowerCase().match(/^c/) ? $.datetimepicker._getDate(inst) : null) || new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var day = date.getDate();
				var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
				var matches = pattern.exec(offset);
				while(matches) {
					switch (matches[2] || 'd') {
						case 'd' :
						case 'D' :
							day += parseInt(matches[1], 10);
							break;
						case 'w' :
						case 'W' :
							day += parseInt(matches[1], 10) * 7;
							break;
						case 'm' :
						case 'M' :
							month += parseInt(matches[1], 10);
							day = Math.min(day, $.datetimepicker._getDaysInMonth(year, month));
							break;
						case 'y':
						case 'Y' :
							year += parseInt(matches[1], 10);
							day = Math.min(day, $.datetimepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			};
			var newDate = (date == null || date === '' ? defaultDate : ( typeof date == 'string' ? offsetString(date) : ( typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
			newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
			if(newDate) {
				newDate.setHours(0);
				newDate.setMinutes(0);
				newDate.setSeconds(0);
				newDate.setMilliseconds(0);
			}
			return this._daylightSavingAdjust(newDate);
		},

		/* Handle switch to/from daylight saving.
		 Hours may be non-zero on daylight saving cut-over:
		 > 12 when midnight changeover, but then cannot generate
		 midnight datetime, so jump to 1AM, otherwise reset.
		 @param  date  (Date) the date to check
		 @return  (Date) the corrected date */
		_daylightSavingAdjust : function(date) {
			if(!date)
				return null;
			date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
			return date;
		},

		/* Set the date(s) directly. */
		_setDate : function(inst, date, noChange) {
			var clear = !date;
			var origMonth = inst.selectedMonth;
			var origYear = inst.selectedYear;
			var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
				this._notifyChange(inst);
			this._adjustInstDate(inst);
			if(inst.input) {
				inst.input.val( clear ? '' : this._formatDate(inst));
			}
		},

		/* Retrieve the date(s) directly. */
		_getDate : function(inst) {
			var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
		},

		/* Attach the onxxx handlers.  These are declared statically so
		 * they work with static code transformers like Caja.
		 */
		_attachHandlers : function(inst) {
			
			var stepMonths = this._get(inst, 'stepMonths');
			var id = '#' + inst.id;
			inst.dpDiv.find('[data-handler]').map(function() {
				var handler = {
					prev : function() {
						window['DP_jQuery_' + dpuuid].datetimepicker._adjustDate(id, -stepMonths, 'M');
					},
					next : function() {
						window['DP_jQuery_' + dpuuid].datetimepicker._adjustDate(id, +stepMonths, 'M');
					},
					hide : function() {
						window['DP_jQuery_' + dpuuid].datetimepicker._hideDatetimepicker();
					},
					today : function() {
						window['DP_jQuery_' + dpuuid].datetimepicker._gotoToday(id);
					},
					selectDay : function() {
						//TODO setp2 select datetime
						$.data(inst, 'datetimepicker',{
							id        : id,
							target    : this,
							dateMonth : +this.getAttribute('data-month'),
							dateYear  : +this.getAttribute('data-year')
						});
						
						
						inst.dpDiv.find('[data-handler] a').each(function(index) {
						  	if($(this).hasClass('ui-state-active')){
						  		$(this).removeClass('ui-state-active');
						  	}
						});
						
						//alert(inst.dpDiv.html());
						
						
						
						var activeA = $(this).find('a');
						if(activeA.hasClass('ui-state-active')){
							activeA.removeClass('ui-state-active');
						}else{
							activeA.addClass('ui-state-active');
						}
						
						
						
						//window['DP_jQuery_' + dpuuid].datetimepicker._selectDay(id, +this.getAttribute('data-month'),+this.getAttribute('data-year') , this);
						return false;
					},
					selectMonth : function() {
						window['DP_jQuery_' + dpuuid].datetimepicker._selectMonthYear(id, this, 'M');
						return false;
					},
					selectYear : function() {
						window['DP_jQuery_' + dpuuid].datetimepicker._selectMonthYear(id, this, 'Y');
						return false;
					}
				};
				$(this).bind(this.getAttribute('data-event'), handler[this.getAttribute('data-handler')]);
			});
		},

		/* Generate the HTML for the current state of the date picker. */
		_generateHTML : function(inst) {
			var today = new Date();
			today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
			// clear time
			var isRTL = this._get(inst, 'isRTL');
			var showButtonPanel = this._get(inst, 'showButtonPanel');
			var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
			var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
			var numMonths = this._getNumberOfMonths(inst);
			var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
			var stepMonths = this._get(inst, 'stepMonths');
			var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
			var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var drawMonth = inst.drawMonth - showCurrentAtPos;
			var drawYear = inst.drawYear;
			if(drawMonth < 0) {
				drawMonth += 12;
				drawYear--;
			}
			if(maxDate) {
				var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
				maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
				while(this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
					drawMonth--;
					if(drawMonth < 0) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;
			var prevText = this._get(inst, 'prevText');
			prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
			var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click"' + ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' : ( hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
			var nextText = this._get(inst, 'nextText');
			nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
			var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click"' + ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' : ( hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + ( isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
			var currentText = this._get(inst, 'currentText');
			var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
			currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
			var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(inst, 'closeText') + '</button>' : '');
			var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + ( isRTL ? controls : '') + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click"' + '>' + currentText + '</button>' : '') + ( isRTL ? '' : controls) + '</div>' : '';
			var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
			firstDay = (isNaN(firstDay) ? 0 : firstDay);
			var showWeek = this._get(inst, 'showWeek');
			var dayNames = this._get(inst, 'dayNames');
			var dayNamesShort = this._get(inst, 'dayNamesShort');
			var dayNamesMin = this._get(inst, 'dayNamesMin');
			var monthNames = this._get(inst, 'monthNames');
			var monthNamesShort = this._get(inst, 'monthNamesShort');
			var beforeShowDay = this._get(inst, 'beforeShowDay');
			var showOtherMonths = this._get(inst, 'showOtherMonths');
			var selectOtherMonths = this._get(inst, 'selectOtherMonths');
			var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
			var defaultDate = this._getDefaultDate(inst);
			var html = '';
			for(var row = 0; row < numMonths[0]; row++) {
				var group = '';
				this.maxRows = 4;
				for(var col = 0; col < numMonths[1]; col++) {
					var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
					var cornerClass = ' ui-corner-all';
					var calender = '';
					if(isMultiMonth) {
						calender += '<div class="ui-datepicker-group';
						if(numMonths[1] > 1)
							switch (col) {
								case 0:
									calender += ' ui-datepicker-group-first';
									cornerClass = ' ui-corner-' + ( isRTL ? 'right' : 'left');
									break;
								case numMonths[1]-1:
									calender += ' ui-datepicker-group-last';
									cornerClass = ' ui-corner-' + ( isRTL ? 'left' : 'right');
									break;
								default:
									calender += ' ui-datepicker-group-middle';
									cornerClass = '';
									break;
							}
						calender += '">';
					}
					calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? ( isRTL ? next : prev) : '') + (/all|right/.test(cornerClass) && row == 0 ? ( isRTL ? prev : next) : '') + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					'</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
					var thead = ( showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
					for(var dow = 0; dow < 7; dow++) {// days of the week
						var day = (dow + firstDay) % 7;
						thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>';
					}
					calender += thead + '</tr></thead><tbody>';
					var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
					if(drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
						inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
					var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
					var curRows = Math.ceil((leadDays + daysInMonth) / 7);
					// calculate the number of rows to generate
					var numRows = ( isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
					//If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
					for(var dRow = 0; dRow < numRows; dRow++) {// create date picker rows
						calender += '<tr>';
						var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' + this._get(inst, 'calculateWeek')(printDate) + '</td>');
						for(var dow = 0; dow < 7; dow++) {// create date picker days
							var daySettings = ( beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, '']);
							var otherMonth = (printDate.getMonth() != drawMonth);
							var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
							tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + // highlight weekends
							( otherMonth ? ' ui-datepicker-other-month' : '') + // highlight days from other months
							((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							' ' + this._dayOverClass : '') + // highlight selected day
							 ( unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + // highlight unselectable days
							(otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + // highlight custom dates
							(printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + // highlight selected day
							(printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + // cell title
							( unselectable ? '' : ' data-handler="selectDay" data-event="click" data-month="' + printDate.getMonth() + '" data-year="' + printDate.getFullYear() + '"') + '>' + // actions
							(otherMonth && !showOtherMonths ? '&#xa0;' : // display for other months
							( unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') + (printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + // highlight selected day
							( otherMonth ? ' ui-priority-secondary' : '') + // distinguish dates from other months
							'" href="#">' + printDate.getDate() + '</a>')) + '</td>';
							// display selectable date
							printDate.setDate(printDate.getDate() + 1);
							printDate = this._daylightSavingAdjust(printDate);
						}
						calender += tbody + '</tr>';
					}
					drawMonth++;
					if(drawMonth > 11) {
						drawMonth = 0;
						drawYear++;
					}
					calender += '</tbody></table><input type="text" class="date-timespinner"/><button class="date-ok"></button>' + ( isMultiMonth ? '</div>' + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
					group += calender;
				}
				html += group;
			}
			html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
			inst._keyEvent = false;
			return html;
		},

		/* Generate the month and year header. */
		_generateMonthYearHeader : function(inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
			var changeMonth = this._get(inst, 'changeMonth');
			var changeYear = this._get(inst, 'changeYear');
			var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
			var html = '<div class="ui-datepicker-title">';
			var monthHtml = '';
			// month selection
			if(secondary || !changeMonth)
				monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
			else {
				var inMinYear = (minDate && minDate.getFullYear() == drawYear);
				var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
				monthHtml += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
				for(var month = 0; month < 12; month++) {
					if((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()))
						monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : '') + '>' + monthNamesShort[month] + '</option>';
				}
				monthHtml += '</select>';
			}
			if(!showMonthAfterYear)
				html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
			// year selection
			if(!inst.yearshtml) {
				inst.yearshtml = '';
				if(secondary || !changeYear)
					html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
				else {
					// determine range of years to display
					var years = this._get(inst, 'yearRange').split(':');
					var thisYear = new Date().getFullYear();
					var determineYear = function(value) {
						var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
						return (isNaN(year) ? thisYear : year);
					};
					var year = determineYear(years[0]);
					var endYear = Math.max(year, determineYear(years[1] || ''));
					year = ( minDate ? Math.max(year, minDate.getFullYear()) : year);
					endYear = ( maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
					inst.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
					for(; year <= endYear; year++) {
						inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : '') + '>' + year + '</option>';
					}
					inst.yearshtml += '</select>';

					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}
			html += this._get(inst, 'yearSuffix');
			if(showMonthAfterYear)
				html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
			html += '</div>';
			// Close datepicker_header
			return html;
		},

		/* Adjust one of the date sub-fields. */
		_adjustInstDate : function(inst, offset, period) {
			var year = inst.drawYear + (period == 'Y' ? offset : 0);
			var month = inst.drawMonth + (period == 'M' ? offset : 0);
			var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == 'D' ? offset : 0);
			var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if(period == 'M' || period == 'Y')
				this._notifyChange(inst);
		},

		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax : function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			var newDate = (minDate && date < minDate ? minDate : date);
			newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
			return newDate;
		},

		/* Notify change of month/year. */
		_notifyChange : function(inst) {
			var onChange = this._get(inst, 'onChangeMonthYear');
			if(onChange)
				onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst]);
		},

		/* Determine the number of months to show. */
		_getNumberOfMonths : function(inst) {
			var numMonths = this._get(inst, 'numberOfMonths');
			return (numMonths == null ? [1, 1] : ( typeof numMonths == 'number' ? [1, numMonths] : numMonths));
		},

		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate : function(inst, minMax) {
			return this._determineDate(inst, this._get(inst, minMax + 'Date'), null);
		},

		/* Find the number of days in a given month. */
		_getDaysInMonth : function(year, month) {
			return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
		},

		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth : function(year, month) {
			return new Date(year, month, 1).getDay();
		},

		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth : function(inst, offset, curYear, curMonth) {
			var numMonths = this._getNumberOfMonths(inst);
			var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
			if(offset < 0)
				date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
			return this._isInRange(inst, date);
		},

		/* Is the given date in the accepted range? */
		_isInRange : function(inst, date) {
			var minDate = this._getMinMaxDate(inst, 'min');
			var maxDate = this._getMinMaxDate(inst, 'max');
			return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()));
		},

		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig : function(inst) {
			var shortYearCutoff = this._get(inst, 'shortYearCutoff');
			shortYearCutoff = ( typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			return {
				shortYearCutoff : shortYearCutoff,
				dayNamesShort : this._get(inst, 'dayNamesShort'),
				dayNames : this._get(inst, 'dayNames'),
				monthNamesShort : this._get(inst, 'monthNamesShort'),
				monthNames : this._get(inst, 'monthNames')
			};
		},

		/* Format the given date for display. */
		_formatDate : function(inst, day, month, year) {
			if(!day) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			
			var date = ( day ? ( typeof day == 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
			return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst));
		}
	});

	/*
	 * Bind hover events for datepicker elements.
	 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
	 * Global instActive, set by _updateDatetimepicker allows the handlers to find their way back to the active picker.
	 */
	function bindHover(dpDiv) {
		var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
		return dpDiv.delegate(selector, 'mouseout', function() {
			$(this).removeClass('ui-state-hover');
			if(this.className.indexOf('ui-datepicker-prev') != -1)
				$(this).removeClass('ui-datepicker-prev-hover');
			if(this.className.indexOf('ui-datepicker-next') != -1)
				$(this).removeClass('ui-datepicker-next-hover');
		}).delegate(selector, 'mouseover', function() {
			if(!$.datetimepicker._isDisabledDatetimepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0])) {
				// alert('xxx');
				$(this).parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
				$(this).addClass('ui-state-hover');
				if(this.className.indexOf('ui-datepicker-prev') != -1)
					$(this).addClass('ui-datepicker-prev-hover');
				if(this.className.indexOf('ui-datepicker-next') != -1)
					$(this).addClass('ui-datepicker-next-hover');
			}
		});
	}

	/* jQuery extend now ignores nulls! */
	function extendRemove(target, props) {
		$.extend(target, props);
		for(var name in props)
		if(props[name] == null || props[name] == undefined)
			target[name] = props[name];
		return target;
	};

	/* Determine whether an object is an array. */
	function isArray(a) {
		return (a && (($.browser.safari && typeof a == 'object' && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))));
	};

	/* Invoke the datepicker functionality.
	 @param  options  string - a command, optionally followed by additional parameters or
	 Object - settings for attaching new datepicker functionality
	 @return  jQuery object */
	$.fn.datetimepicker = function(options) {
		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if(!this.length) {
			return this;
		}

		/* Initialise the date picker. */
		if(!$.datetimepicker.initialized) {
			$(document).mousedown($.datetimepicker._checkExternalClick).find('body').append($.datetimepicker.dpDiv);
			$.datetimepicker.initialized = true;
		}
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if( typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
			return $.datetimepicker['_' + options + 'Datetimepicker'].apply($.datetimepicker, [this[0]].concat(otherArgs));
		if(options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
			return $.datetimepicker['_' + options + 'Datetimepicker'].apply($.datetimepicker, [this[0]].concat(otherArgs));
		return this.each(function() {
			typeof options == 'string' ? $.datetimepicker['_' + options + 'Datetimepicker'].apply($.datetimepicker, [this].concat(otherArgs)) : $.datetimepicker._attachDatetimepicker(this, options);
		});
	};

	$.datetimepicker = new Datetimepicker();
	// singleton instance
	$.datetimepicker.initialized = false;
	$.datetimepicker.uuid = new Date().getTime();
	$.datetimepicker.version = "@VERSION";

	// Workaround for #4055
	// Add another global to avoid noConflict issues with inline event handlers
	window['DP_jQuery_' + dpuuid] = $;

})(jQuery);



/***********************/
/** jquery.ui.form.js **/
/***********************/
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
				var data = frameBody.html();
				
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


/***********************/
/** jquery.ui.linkagebox.js **/
/***********************/
(function($) {
	$.widget('ui.linkagebox', {
		options : {
			data : ''
		},
		destroy : function() {
			var self = this,
				ele  = self.element,
				arr  = $.data(this.element, 'linkagebox').comboArr;
			return ele.each(function() {
				this.outerHTML = '';
			});
		},
		resize : function(target) {
			for(var i = 0; i < this.options.data.count; i++) {
				$.data(this.element, 'linkagebox').comboArr[i].combo('resize', {
					width : target
				});
			}
			this.element.find('.fuck').css({
				'width' : target
			});
		},
		disable : function() {
			for(var i = 0; i < this.options.data.count; i++) {
				$.data(this.element, 'linkagebox').comboArr[i].combo('disable');
			};
		},
		enable : function() {
			for(var i = 0; i < this.options.data.count; i++) {
				$.data(this.element, 'linkagebox').comboArr[i].combo('enable');
			};
		},
		linkagebox : function() {
			return this.element;
		},
		_create : function() {
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data;
			
			$.data(ele, 'linkagebox',{
				comboArr : []
			});
			
			// 生成产生combo的div标签
			ele.children().addClass('fuck').each(function(index) {
		  		var div = $('<div></div>').addClass('link' + index);
		  		$(this).append(div);
		  		$.data(ele, 'linkagebox').comboArr.push(div);
			});
			
			// 添加combo
			ele.children().each(function (index){
				$.data(ele, 'linkagebox').comboArr[index].combo({
					width : 150,
					editable : true,
					radioable : true,
					required : true,
					value : '请选择',
					onChange : function (event, data){
						self._changeItem(index, data);
					}
				});
			});
			
			$.data(ele, 'linkagebox').comboArr[0].combo('setData', json.data[0]);
			// this._bindEvents();
		},
		_changeItem : function (selectIndex, itemVal){
			var self = this,
				ele  = self.element,
				opts = self.options,
				json = opts.data,
				comboArr = 	$.data(ele, 'linkagebox').comboArr;
			// 每次onchange之后将后面的combo设置成定值
			for(var i = selectIndex+1; i < comboArr.length; i++){
				comboArr[i].combo('setValue', '请选择');
			}
			// 每次选择之后将所有的panel关闭
			for(var i = 0; i < comboArr.length; i++) {
				comboArr[i].combo('hidePanel');
			}
			if(selectIndex === comboArr.length-1){
				return;
			}
			var nextIndex = selectIndex +1;
			var combo = comboArr[nextIndex];
			
			$.data(ele, 'linkagebox').comboArr[nextIndex].combo('setData', json.data[nextIndex][itemVal]);
		},
		_init : function() {
			//some code
		},
		_bindEvents : function() {
			
		}
	});
})(jQuery);


/***********************/
/** jquery.ui.ratingbox.js **/
/***********************/
(function($) {
	$.widget('ui.ratingbox', {
		options : {
			// 星星个数最大值
			max : 10,
			// 星星个数最小值
			min : 1,
			// 当前值，即默认值
			value : 3,
			// 星星个数
			starnum : 10,
			/**
			 *  值改变时触发
	         * @param {Object} value 
			 */
			onChange : function (value){},
		},
		
		destroy : function (){
			this.element.children().unbind('.ratingbox');
			this.element.children().remove();
			this.element.unbind();
			this.element.remove();
		},
		disable : function (){
			this.element.children().unbind('.ratingbox');
			this.element.removeClass('enable').addClass('disable');
		},
		enable : function (){
			this.element.removeClass('disable').addClass('enable');
			this._bindEvents();
		},
		getValue : function (){
			var ele = this.element;
			var val = $.data(ele, 'ratingbox').initVal;
			return val;
		},
		setValue : function (val){
			var ele = this.element,
				opts = this.options;
			if(val > opts.min && val < opts.max){
				$.data(ele, 'ratingbox').initVal = val;
				this._showStar($.data(ele, 'ratingbox').initVal);
			} else {
				alert('设置的值超出范围，请检查！');
			}
		},
		_create : function() {
			var self = this,
				ele = self.element,
				opts = self.options;
				
			$.data(ele, 'ratingbox', {
				initVal : opts.value,	//存储初始值以便在点击事件以后可以修改值
				changeVal : ''
			});
				
			ele.addClass('rating');
			// alert(ele.parent().html());
			if(opts.starnum >= opts.min && opts.starnum <= opts.max){
				var star = ele.wrapInner('<span class="stars"></span>');
				// ele.wrapInner(star);
				var stars = ele.find('.stars');
				for(var i = 0; i < opts.starnum; i++) {
					$('<span></span>').insertAfter(stars).addClass('star-uncheck star');
				}
			} else {
				alert('请调整星星的个数至合适的值！');
			}
			this._bindEvents();
		},
		_init : function() {
			//some code
		},
		_bindEvents : function() {
			var self = this,
				ele = self.element,
				opts = self.options;
			self._showStar($.data(ele, 'ratingbox').initVal);
			ele.children().each(function(index) {
			  	$(this).unbind('mouseover.ratingbox').bind('mouseover.ratingbox', function(event) {
			  		$.data(ele, 'ratingbox').changeVal = index;
			  		self._showStar($.data(ele, 'ratingbox').changeVal);
				}).unbind('mouseout.ratingbox').bind('mouseout.ratingbox', function(event) {
					self._showStar($.data(ele, 'ratingbox').initVal);
				}).unbind('click.ratingbox').bind('click.ratingbox', function(event) {
					$.data(ele, 'ratingbox').initVal = index;
					self._showStar($.data(ele, 'ratingbox').initVal);
					self._trigger('onChange', event, index);
				});
			});
		},
		_showStar : function(target) {
			var ele = this.element;
			var span = ele.find('.stars').next('span');
			ele.find('.stars').siblings().removeClass('star-checked').addClass('star-uncheck');
			for(var i = 0; i < target; i++) {
				span.removeClass('star-uncheck').addClass('star-checked');
				var span = span.next('span');
			}
		}
	});
})(jQuery);


/***********************/
/** jquery.ui.slider.js **/
/***********************/
/*!
 * jQuery UI Slider @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

// number of pages in a slider
// (how many times can you page up/down to go through the whole range)
var numPages = 5;

$.widget( "ui.slider", $.ui.mouse, {
	version: "@VERSION",
	widgetEventPrefix: "slide",

	options: {
		//动画效果
		animate: false,
		//距离
		distance: 0,
		//最大值
		max: 100,
		//最小值
		min: 0,
		//放置位置
		orientation: "horizontal",
		//是否双向
		range: false,
		//步进
		step: 1,
		//初始值
		value: 0,
		//range为true时的初始值
		values: null
	},

	_create: function() {
		var i,
			o = this.options,
			existingHandles = this.element.find( ".ui-slider-handle" ).addClass( "ui-state-default ui-corner-all" ),
			handle = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
			handleCount = ( o.values && o.values.length ) || 1,
			handles = [];

		this._keySliding = false;
		this._mouseSliding = false;
		this._animateOff = true;
		this._handleIndex = null;
		this._detectOrientation();
		this._mouseInit();

		this.element
			.addClass( "ui-slider" +
				" ui-slider-" + this.orientation +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all" +
				( o.disabled ? " ui-slider-disabled ui-disabled" : "" ) );

		this.range = $([]);

		if ( o.range ) {
			if ( o.range === true ) {
				if ( !o.values ) {
					o.values = [ this._valueMin(), this._valueMin() ];
				}
				if ( o.values.length && o.values.length !== 2 ) {
					o.values = [ o.values[0], o.values[0] ];
				}
			}

			this.range = $( "<div></div>" )
				.appendTo( this.element )
				.addClass( "ui-slider-range" +
				// note: this isn't the most fittingly semantic framework class for this element,
				// but worked best visually with a variety of themes
				" ui-widget-header" +
				( ( o.range === "min" || o.range === "max" ) ? " ui-slider-range-" + o.range : "" ) );
		}

		for ( i = existingHandles.length; i < handleCount; i++ ) {
			handles.push( handle );
		}

		this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );

		this.handle = this.handles.eq( 0 );

		this.handles.add( this.range ).filter( "a" )
			.click(function( event ) {
				event.preventDefault();
			})
			.mouseenter(function() {
				if ( !o.disabled ) {
					$( this ).addClass( "ui-state-hover" );
				}
			})
			.mouseleave(function() {
				$( this ).removeClass( "ui-state-hover" );
			})
			.focus(function() {
				if ( !o.disabled ) {
					$( ".ui-slider .ui-state-focus" ).removeClass( "ui-state-focus" );
					$( this ).addClass( "ui-state-focus" );
				} else {
					$( this ).blur();
				}
			})
			.blur(function() {
				$( this ).removeClass( "ui-state-focus" );
			});

		this.handles.each(function( i ) {
			$( this ).data( "ui-slider-handle-index", i );
		});

		this._bind( this.handles, {
			keydown: function( event ) {
				var allowed, curVal, newVal, step,
					index = $( event.target ).data( "ui-slider-handle-index" );

				switch ( event.keyCode ) {
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_UP:
					case $.ui.keyCode.PAGE_DOWN:
					case $.ui.keyCode.UP:
					case $.ui.keyCode.RIGHT:
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.LEFT:
						event.preventDefault();
						if ( !this._keySliding ) {
							this._keySliding = true;
							$( event.target ).addClass( "ui-state-active" );
							allowed = this._start( event, index );
							if ( allowed === false ) {
								return;
							}
						}
						break;
				}

				step = this.options.step;
				if ( this.options.values && this.options.values.length ) {
					curVal = newVal = this.values( index );
				} else {
					curVal = newVal = this.value();
				}

				switch ( event.keyCode ) {
					case $.ui.keyCode.HOME:
						newVal = this._valueMin();
						break;
					case $.ui.keyCode.END:
						newVal = this._valueMax();
						break;
					case $.ui.keyCode.PAGE_UP:
						newVal = this._trimAlignValue( curVal + ( (this._valueMax() - this._valueMin()) / numPages ) );
						break;
					case $.ui.keyCode.PAGE_DOWN:
						newVal = this._trimAlignValue( curVal - ( (this._valueMax() - this._valueMin()) / numPages ) );
						break;
					case $.ui.keyCode.UP:
					case $.ui.keyCode.RIGHT:
						if ( curVal === this._valueMax() ) {
							return;
						}
						newVal = this._trimAlignValue( curVal + step );
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.LEFT:
						if ( curVal === this._valueMin() ) {
							return;
						}
						newVal = this._trimAlignValue( curVal - step );
						break;
				}

				this._slide( event, index, newVal );
			},
			keyup: function( event ) {
				var index = $( event.target ).data( "ui-slider-handle-index" );

				if ( this._keySliding ) {
					this._keySliding = false;
					this._stop( event, index );
					this._change( event, index );
					$( event.target ).removeClass( "ui-state-active" );
				}
			}
		});

		this._refreshValue();

		this._animateOff = false;
	},

	_destroy: function() {
		this.handles.remove();
		this.range.remove();

		this.element
			.removeClass( "ui-slider" +
				" ui-slider-horizontal" +
				" ui-slider-vertical" +
				" ui-slider-disabled" +
				" ui-widget" +
				" ui-widget-content" +
				" ui-corner-all" );

		this._mouseDestroy();
	},

	_mouseCapture: function( event ) {
		var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
			that = this,
			o = this.options;

		if ( o.disabled ) {
			return false;
		}

		this.elementSize = {
			width: this.element.outerWidth(),
			height: this.element.outerHeight()
		};
		this.elementOffset = this.element.offset();

		position = { x: event.pageX, y: event.pageY };
		normValue = this._normValueFromMouse( position );
		distance = this._valueMax() - this._valueMin() + 1;
		this.handles.each(function( i ) {
			var thisDistance = Math.abs( normValue - that.values(i) );
			if ( distance > thisDistance ) {
				distance = thisDistance;
				closestHandle = $( this );
				index = i;
			}
		});

		// workaround for bug #3736 (if both handles of a range are at 0,
		// the first is always used as the one with least distance,
		// and moving it is obviously prevented by preventing negative ranges)
		if( o.range === true && this.values(1) === o.min ) {
			index += 1;
			closestHandle = $( this.handles[index] );
		}

		allowed = this._start( event, index );
		if ( allowed === false ) {
			return false;
		}
		this._mouseSliding = true;

		this._handleIndex = index;

		closestHandle
			.addClass( "ui-state-active" )
			.focus();

		offset = closestHandle.offset();
		mouseOverHandle = !$( event.target ).parents().andSelf().is( ".ui-slider-handle" );
		this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
			left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
			top: event.pageY - offset.top -
				( closestHandle.height() / 2 ) -
				( parseInt( closestHandle.css("borderTopWidth"), 10 ) || 0 ) -
				( parseInt( closestHandle.css("borderBottomWidth"), 10 ) || 0) +
				( parseInt( closestHandle.css("marginTop"), 10 ) || 0)
		};

		if ( !this.handles.hasClass( "ui-state-hover" ) ) {
			this._slide( event, index, normValue );
		}
		this._animateOff = true;
		return true;
	},

	_mouseStart: function( event ) {
		return true;
	},

	_mouseDrag: function( event ) {
		var position = { x: event.pageX, y: event.pageY },
			normValue = this._normValueFromMouse( position );

		this._slide( event, this._handleIndex, normValue );

		return false;
	},

	_mouseStop: function( event ) {
		this.handles.removeClass( "ui-state-active" );
		this._mouseSliding = false;

		this._stop( event, this._handleIndex );
		this._change( event, this._handleIndex );

		this._handleIndex = null;
		this._clickOffset = null;
		this._animateOff = false;

		return false;
	},

	_detectOrientation: function() {
		this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";
	},

	_normValueFromMouse: function( position ) {
		var pixelTotal,
			pixelMouse,
			percentMouse,
			valueTotal,
			valueMouse;

		if ( this.orientation === "horizontal" ) {
			pixelTotal = this.elementSize.width;
			pixelMouse = position.x - this.elementOffset.left - ( this._clickOffset ? this._clickOffset.left : 0 );
		} else {
			pixelTotal = this.elementSize.height;
			pixelMouse = position.y - this.elementOffset.top - ( this._clickOffset ? this._clickOffset.top : 0 );
		}

		percentMouse = ( pixelMouse / pixelTotal );
		if ( percentMouse > 1 ) {
			percentMouse = 1;
		}
		if ( percentMouse < 0 ) {
			percentMouse = 0;
		}
		if ( this.orientation === "vertical" ) {
			percentMouse = 1 - percentMouse;
		}

		valueTotal = this._valueMax() - this._valueMin();
		valueMouse = this._valueMin() + percentMouse * valueTotal;

		return this._trimAlignValue( valueMouse );
	},

	_start: function( event, index ) {
		var uiHash = {
			handle: this.handles[ index ],
			value: this.value()
		};
		if ( this.options.values && this.options.values.length ) {
			uiHash.value = this.values( index );
			uiHash.values = this.values();
		}
		return this._trigger( "start", event, uiHash );
	},

	_slide: function( event, index, newVal ) {
		var otherVal,
			newValues,
			allowed;

		if ( this.options.values && this.options.values.length ) {
			otherVal = this.values( index ? 0 : 1 );

			if ( ( this.options.values.length === 2 && this.options.range === true ) &&
					( ( index === 0 && newVal > otherVal) || ( index === 1 && newVal < otherVal ) )
				) {
				newVal = otherVal;
			}

			if ( newVal !== this.values( index ) ) {
				newValues = this.values();
				newValues[ index ] = newVal;
				// A slide can be canceled by returning false from the slide callback
				allowed = this._trigger( "slide", event, {
					handle: this.handles[ index ],
					value: newVal,
					values: newValues
				} );
				otherVal = this.values( index ? 0 : 1 );
				if ( allowed !== false ) {
					this.values( index, newVal, true );
				}
			}
		} else {
			if ( newVal !== this.value() ) {
				// A slide can be canceled by returning false from the slide callback
				allowed = this._trigger( "slide", event, {
					handle: this.handles[ index ],
					value: newVal
				} );
				if ( allowed !== false ) {
					this.value( newVal );
				}
			}
		}
	},

	_stop: function( event, index ) {
		var uiHash = {
			handle: this.handles[ index ],
			value: this.value()
		};
		if ( this.options.values && this.options.values.length ) {
			uiHash.value = this.values( index );
			uiHash.values = this.values();
		}

		this._trigger( "stop", event, uiHash );
	},

	_change: function( event, index ) {
		if ( !this._keySliding && !this._mouseSliding ) {
			var uiHash = {
				handle: this.handles[ index ],
				value: this.value()
			};
			if ( this.options.values && this.options.values.length ) {
				uiHash.value = this.values( index );
				uiHash.values = this.values();
			}

			this._trigger( "change", event, uiHash );
		}
	},

	value: function( newValue ) {
		if ( arguments.length ) {
			this.options.value = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, 0 );
			return;
		}

		return this._value();
	},

	values: function( index, newValue ) {
		var vals,
			newValues,
			i;

		if ( arguments.length > 1 ) {
			this.options.values[ index ] = this._trimAlignValue( newValue );
			this._refreshValue();
			this._change( null, index );
			return;
		}

		if ( arguments.length ) {
			if ( $.isArray( arguments[ 0 ] ) ) {
				vals = this.options.values;
				newValues = arguments[ 0 ];
				for ( i = 0; i < vals.length; i += 1 ) {
					vals[ i ] = this._trimAlignValue( newValues[ i ] );
					this._change( null, i );
				}
				this._refreshValue();
			} else {
				if ( this.options.values && this.options.values.length ) {
					return this._values( index );
				} else {
					return this.value();
				}
			}
		} else {
			return this._values();
		}
	},

	_setOption: function( key, value ) {
		var i,
			valsLength = 0;

		if ( $.isArray( this.options.values ) ) {
			valsLength = this.options.values.length;
		}

		$.Widget.prototype._setOption.apply( this, arguments );

		switch ( key ) {
			case "disabled":
				if ( value ) {
					this.handles.filter( ".ui-state-focus" ).blur();
					this.handles.removeClass( "ui-state-hover" );
					this.handles.prop( "disabled", true );
					this.element.addClass( "ui-disabled" );
				} else {
					this.handles.prop( "disabled", false );
					this.element.removeClass( "ui-disabled" );
				}
				break;
			case "orientation":
				this._detectOrientation();
				this.element
					.removeClass( "ui-slider-horizontal ui-slider-vertical" )
					.addClass( "ui-slider-" + this.orientation );
				this._refreshValue();
				break;
			case "value":
				this._animateOff = true;
				this._refreshValue();
				this._change( null, 0 );
				this._animateOff = false;
				break;
			case "values":
				this._animateOff = true;
				this._refreshValue();
				for ( i = 0; i < valsLength; i += 1 ) {
					this._change( null, i );
				}
				this._animateOff = false;
				break;
		}
	},

	//internal value getter
	// _value() returns value trimmed by min and max, aligned by step
	_value: function() {
		var val = this.options.value;
		val = this._trimAlignValue( val );

		return val;
	},

	//internal values getter
	// _values() returns array of values trimmed by min and max, aligned by step
	// _values( index ) returns single value trimmed by min and max, aligned by step
	_values: function( index ) {
		var val,
			vals,
			i;

		if ( arguments.length ) {
			val = this.options.values[ index ];
			val = this._trimAlignValue( val );

			return val;
		} else {
			// .slice() creates a copy of the array
			// this copy gets trimmed by min and max and then returned
			vals = this.options.values.slice();
			for ( i = 0; i < vals.length; i+= 1) {
				vals[ i ] = this._trimAlignValue( vals[ i ] );
			}

			return vals;
		}
	},

	// returns the step-aligned value that val is closest to, between (inclusive) min and max
	_trimAlignValue: function( val ) {
		if ( val <= this._valueMin() ) {
			return this._valueMin();
		}
		if ( val >= this._valueMax() ) {
			return this._valueMax();
		}
		var step = ( this.options.step > 0 ) ? this.options.step : 1,
			valModStep = (val - this._valueMin()) % step,
			alignValue = val - valModStep;

		if ( Math.abs(valModStep) * 2 >= step ) {
			alignValue += ( valModStep > 0 ) ? step : ( -step );
		}

		// Since JavaScript has problems with large floats, round
		// the final value to 5 digits after the decimal point (see #4124)
		return parseFloat( alignValue.toFixed(5) );
	},

	_valueMin: function() {
		return this.options.min;
	},

	_valueMax: function() {
		return this.options.max;
	},

	_refreshValue: function() {
		var lastValPercent, valPercent, value, valueMin, valueMax,
			oRange = this.options.range,
			o = this.options,
			that = this,
			animate = ( !this._animateOff ) ? o.animate : false,
			_set = {};

		if ( this.options.values && this.options.values.length ) {
			this.handles.each(function( i, j ) {
				valPercent = ( that.values(i) - that._valueMin() ) / ( that._valueMax() - that._valueMin() ) * 100;
				_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
				if ( that.options.range === true ) {
					if ( that.orientation === "horizontal" ) {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { left: valPercent + "%" }, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( { width: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
						}
					} else {
						if ( i === 0 ) {
							that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { bottom: ( valPercent ) + "%" }, o.animate );
						}
						if ( i === 1 ) {
							that.range[ animate ? "animate" : "css" ]( { height: ( valPercent - lastValPercent ) + "%" }, { queue: false, duration: o.animate } );
						}
					}
				}
				lastValPercent = valPercent;
			});
		} else {
			value = this.value();
			valueMin = this._valueMin();
			valueMax = this._valueMax();
			valPercent = ( valueMax !== valueMin ) ?
					( value - valueMin ) / ( valueMax - valueMin ) * 100 :
					0;
			_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
			this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

			if ( oRange === "min" && this.orientation === "horizontal" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { width: valPercent + "%" }, o.animate );
			}
			if ( oRange === "max" && this.orientation === "horizontal" ) {
				this.range[ animate ? "animate" : "css" ]( { width: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
			}
			if ( oRange === "min" && this.orientation === "vertical" ) {
				this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( { height: valPercent + "%" }, o.animate );
			}
			if ( oRange === "max" && this.orientation === "vertical" ) {
				this.range[ animate ? "animate" : "css" ]( { height: ( 100 - valPercent ) + "%" }, { queue: false, duration: o.animate } );
			}
		}
	}

});

}(jQuery));



/***********************/
/** jquery.ui.combogrid.js **/
/***********************/
(function($) {
	$.widget('ui.combogrid', $.ui.datagrid, {
		options : {
			idField : ''
		},
		destroy : function (){
			return $.data(this.element, 'combogrid').comboGrid.each(function() {
				this.outerHTML = '';
			});
		},
		resize : function (options){
			this.element.combo('resize', options);
		},
		disable : function (){
			this.element.combo('disable');
		},
		enable : function (){
			this.element.combo('enable');
		},
		getValue : function (){
			return $.data(this.element, 'combogrid').comboGrid.find('.combo-input').val();
		},
		setValue : function (val){
			$.data(this.element, 'combogrid').comboGrid.find('.combo-input').val(val);
		},
		_create : function() {
			var self = this,
				ele  = self.element;
			var combo = new $.ui.combo();
			var opts = $.extend(combo.options, this.options);	
				
			$.data(ele, 'combogrid', {
				comboGrid : ''
			});
			
			ele.append($('<table id="tt"></table>'));
			// 生成combo
			ele.combo(opts);
			
			// 生成datagrid
			ele.children().datagrid(
				$.extend(this.options, {
					width : opts.panelWidth - 2,
					onSelect : function(event, ui) {
						if(opts.idField == '') {
							for(var i in ui.rowData) {
								opts.idField = i;
								break;
							}
						}
						ele.combo('setValue', ui.rowData[opts.idField]);
						ele.panel('close');
					}
				})
			);
			
			$.data(ele, 'combogrid').comboGrid = ele.parent().parent();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			
		}
	})
})(jQuery);



/***********************/
/** jquery.ui.combotree.js **/
/***********************/
(function($) {
	$.widget('ui.combotree', $.ui.tree, {
		options : {
			
		},
		destroy : function (){
			return $.data(this.element, 'combotree').comboTree.each(function() {
				this.outerHTML = '';
			});
		},
		resize : function (options){
			this.element.combo('resize', options);
		},
		disable : function (){
			this.element.combo('disable');
		},
		enable : function (){
			this.element.combo('enable');
		},
		getValue : function (){
			return $.data(this.element, 'combotree').comboTree.find('.combo-input').val();
		},
		setValue : function (val){
			$.data(this.element, 'combotree').comboTree.find('.combo-input').val(val);
		},
		_create : function() {
			var self = this,
				ele  = self.element;
			var combo = new $.ui.combo();
			var opts = $.extend(combo.options, this.options);
			
			$.data(ele, 'combotree', {
				val : [],
				comboTree : ''
			});
			
			// 添加生成tree的对象
			ele.append($('<ul></ul>').attr('id', 'tree-' + new Date().getTime()));
			
			if(opts.checkbox) {
				// 生成combo
				ele.combo(opts);
				// 在combo下面生成tree
				ele.children().tree(
					$.extend(this.options, {
						onCheck : function(event, ui) {
							var val = ui.node.text;
							if(ui.checked) {
								$.data(ele, 'combotree').val.push(val);
							} else {
								var temp = $.data(ele, 'combotree').val;
								var index = $.inArray(val, temp);
								temp.splice(index, 1);
								$.data(ele, 'combotree').val = temp;
							}
							ele.combo('setValue', $.data(ele, 'combotree').val);
						}
					})
				);
			} else {
				// 生成combo
				ele.combo(opts);
				// 在combo下面生成tree
				ele.children().tree(
					$.extend(this.options, {
						onClick : function(event, node) {
							ele.combo('setValue', node.text);
							ele.panel('close');
						}
					})
				);
			}
			$.data(ele, 'combotree').comboTree = ele.parent().parent();
		},
		_init : function() {
			
		},
		_bindEvents : function() {
			
		}
	});
})(jQuery);



/***********************/
/** jquery.ui.validatebox.js **/
/***********************/
/***********************/
/** jquery.ui.validatebox.js **/
/***********************/