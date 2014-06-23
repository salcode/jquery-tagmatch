// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global variable in ECMAScript 3 is
	// mutable (ie. it can be changed by someone else). undefined isn't really being
	// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	// can no longer be modified.

	// window and document are passed through as local variable rather than global
	// as this (slightly) quickens the resolution process and can be more efficiently
	// minified (especially when both are regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = "tagMatch",
		defaults = {
			// define a global variable name for the test object
			testObjGlobal: 'tagMatchTestObj'
			//testObjGlobal: false
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		// jQuery has an extend method which merges the contents of two or
		// more objects, storing the result in the first object. The first object
		// is generally empty as we don't want to alter the default options for
		// future instances of the plugin
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		if ( false !== this.settings.testObjGlobal ) {
			console.log( 'Test mode, NOT executing method init()' );
			// use the value of this.settings.testObjGlobal as the name
			// of the global variable for this object, this allows test cases to be written
			window[this.settings.testObjGlobal] = this;
		} else {
			console.log( 'Normal mode, execute method init()' );
			this.init();
		}
	}

	// Avoid Plugin.prototype conflicts
	$.extend(Plugin.prototype, {
		init: function () {
			// Place initialization logic here
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			// you can add more functions like the one below and
			// call them like so: this.yourOtherFunction(this.element, this.settings).
			console.log("xD");
		},
		alwaysSeven: function() {
			return 7;
		},
		yourOtherFunction: function () {
			// some logic
		}
	});

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$[ pluginName ] = function ( options ) {
		new Plugin( this, options );

		// chain jQuery functions
		return this;
	};

})( jQuery, window, document );
