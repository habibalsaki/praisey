// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "praisey",
				defaults = {
					slideDuration:2000,
          prevButtonText: "<",
					nextButtonText: ">",
					slideElements: ">*",
          bgColor: ['#226789','#458AC6','#3F5DA8','#DC6868','#00C4BC','#D9499A','#5BBD72']
				};

        function adding_class($elem){
          var $divs = null;
          $divs = $elem.children('.current').find("div");
          console.log($divs);

          $divs.eq(0).addClass('name');
          $divs.eq(1).addClass('job_title');
          $divs.eq(2).addClass('comment');
        }

        function initializeButtons($this,settings){
					// var $buttonContainer = $("<div class='navigation'></div>");
					var $nextButton = $("<span class='nav_next'></span>")
                              .html(settings.nextButtonText);

					var $prevButton = $("<span class='nav_prev'></span>")
                              .html(settings.prevButtonText);;

          $(".title").prepend($prevButton).append($nextButton);

					//$buttonContainer.append($prevButton).append($nextButton);
					// $this.after($buttonContainer);


        	$('.nav_next').on('click',function(){

            Plugin.prototype.next($this,settings);

					});


					$('.nav_prev').on('click',function(){
						Plugin.prototype.prev($this,settings);
					})
				}

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
				this.init();
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

            // console.log("hello");
          	var $element = $(this.element);
						$element.addClass('praisey-container');
						$element.find(this.settings.slideElements).addClass('praisey-item');
            $element.find(this.settings.slideElements)
								.first().show()
								.addClass('current');
            adding_class($element);

						initializeButtons($element,this.settings);

            $(".nav_next, .nav_prev").css(
              'font-family', "'Lato', sans-serif"
            );
            //  this.prev($element,this.settings);
				},
				next: function($element,settings){

            // console.log("next");

						var $current = $element.find(".current");
						var $next = $current.next();

						if($next.length == 0){
							$next = $element.find(settings.slideElements).first();
						}
            //console.log($next);
						$current.fadeOut(settings.slideDuration,function(){

              var $color = settings.bgColor[Math.floor(Math.random()*settings.bgColor.length)];
              $next.fadeIn(settings.slideDuration).addClass("current");
              adding_class($element);
              $next.children().css('color',$color);
              $next.children('.comment').css({
                'background': $color,
                'color'     : '#fff'
              });
              $(".nav_next, .nav_prev").css({
                'background': $color,
                'color'     : '#fff',
                'font-family': "'Lato', sans-serif"
              });
            }).removeClass('current');

				},
				prev: function($element,settings){

						var $current = $element.find(".current");
						var $prev = $current.prev();

						if($prev.length == 0){
							$prev = $element.find(settings.slideElements).last();
						}

						$current.fadeOut(settings.slideDuration,function(){
              var $color = settings.bgColor[Math.floor(Math.random()*settings.bgColor.length)];
              $prev.fadeIn(settings.slideDuration).addClass("current");
              adding_class($element);
              $prev.children().css('color',$color);
              $prev.children('.comment').css({
                'background': $color,
                'color'     : '#fff'
              });

              $(".nav_next, .nav_prev").css({
                'background': $color,
                'color'     : '#fff',
                'font-family': "'Lato', sans-serif"
              });
            }).removeClass('current');

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
