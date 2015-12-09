/*
 *  mailTo v0.0.1   
 * 
 * Avoid exposing your email address to email harvesting
 * bots by simply adding your email address to this plugin.
 *
 * USAGE
 * <a class="mailTo" href="#"></a>
 *
 */

;(function ( $, window, document, undefined ) {

	"use strict";
    
		// Create the defaults once
		var pluginName = "mailTo",
				defaults = {
                    emailWho: 'info',
                    webAddress: 'mcmillandesign',
                    TLD: 'me.uk'
		};


		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
                this.$element = $(element);
                
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
                
                    this.$element.attr('href','mailto:' + 
                            this.settings.emailWho + '@' + 
                            this.settings.webAddress + '.' + 
                            this.settings.TLD);
                    this.$element.html(this.settings.emailWho + '@' + 
                            this.settings.webAddress + '.' + 
                            this.settings.TLD);
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );