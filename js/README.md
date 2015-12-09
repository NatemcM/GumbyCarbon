# Using Gumby Javascript Modules 
This README file has been taken from the [Gumby Docs](http://gumbyframework.com/docs/javascript/#!/installation). 

## Installation

In order to get up and running with Gumby you'll need Modernizr included in the `<head>` of your doc and jQuery and Gumby included right before the closing `</body>` tag. Our `index.html` file shows our recommended set up.

### Modernizr

A customized build of Modernizr 2.6.2 is included with Gumby and should be included in the `<head>` of your document to ensure the HTML5 shiv does its thing for IE8\. Gumby relies on Modernizr's loader as well as touch support and pointer events detection, we highly recommend you build your own customized build of Modernizr for production, ensuring these features are included.

If you are using the Responsive Images module then you may wish to include more of Modernizrs feature detections for use with `gumby-support`. The version of Modernizr packaged with the framework also includes webp and svg detection for exactly this reason.

    <script src="js/libs/modernizr-2.6.2.min.js"></script>

### jQuery

Gumby relies on >= jQuery 1.9 and this script should be included right before the closing `</body>` tag, this is to prevent render blocking and provide a faster perceived page load.

Our example HTML files uses conditional logic to load jQuery 2 on modern browsers and 1.10 on <= IE8, it will attempt to fetch from Google CDN first before falling back to the local files, we recommend you use this set up too.

    <!-- Grab Google CDN's jQuery, fall back to local if offline -->
    <!-- 2.0 for modern browsers, 1.10 for .oldie -->
    <script>
    var oldieCheck = Boolean(document.getElementsByTagName('html')[0].className.match(/\soldie\s/g));
    if(!oldieCheck) {
      document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>');
    } else {
      document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>');
    }
    </script>
    <script>
    if(!window.jQuery) {
      if(!oldieCheck) {
        document.write('<script src="js/libs/jquery-2.0.2.min.js"></script>');
      } else {
        document.write('<script src="js/libs/jquery-1.10.1.min.js"></script>');
      }
    }
    </script>

### Gumby

The Gumby JS files can be split into three, `gumby.js` which contains the core Gumby object, `gumby.init.js` which handles initialisation and UI modules (gumby.modulename.js) which contain all the logic required for that a specific module.

Our HTML templates include the JavaScript files individually in our recommended development set up. You'll see `gumby.js` included first, followed by each UI module in the core framework and finally `gumby.init.js`.

A gumby.min.js file is also included with the framework, this includes all the inividual files concatenated and minified into a single build. This is our recommended production set up. Make this task part of your current build process or utilise our build/install tool [Claymate](http://gumby.digitalsurgeonsdev.com/docs/claymate).

You'll notice a `gumby-touch` attribute on the `gumby.js` script tag, this is informing Gumby of where to find the jQuery mobile build, more on this in the [Touch Support section below](/docs/javascript/#!/touch-support).

#### Development

    <script gumby-touch="js/libs" src="js/libs/gumby.js"></script>
    <script src="js/libs/ui/gumby.retina.js"></script>
    <script src="js/libs/ui/gumby.fixed.js"></script>
    <script src="js/libs/ui/gumby.skiplink.js"></script>
    <script src="js/libs/ui/gumby.toggleswitch.js"></script>
    <script src="js/libs/ui/gumby.checkbox.js"></script>
    <script src="js/libs/ui/gumby.radiobtn.js"></script>
    <script src="js/libs/ui/gumby.tabs.js"></script>
    <script src="js/libs/ui/gumby.navbar.js"></script>
    <script src="js/libs/ui/gumby.fittext.js"></script>
    <script src="js/libs/ui/jquery.validation.js"></script>
    <script src="js/libs/gumby.init.js"></script>

#### Production

    <script gumby-touch="js/libs" src="js/libs/gumby.min.js"></script>

## Manual Initialization

Gumby will automatically initialize by default, taking care of each UI module. However this is not always ideal and in some cases a more flexible solution is desired. Adding `gumby-init="false"` to your `gumby.js` or `gumby.min.js` script tags will halt the automatic initialization. You can then initialize Gumby manually in your own JavaScript code using the `init()` method, this will initialize Gumby and all included UI modules unless you specify an array of UI modules to initialize instead.

    <script gumby-init="false" src="js/libs/gumby.js"></script>

    // initialize Gumby and all included UI modules
    Gumby.init();

    // initialize Gumby with only the specified UI modules
    Gumby.init({
      uiModules: ['skiplink', 'checkbox', 'radiobtn']
    });

    // initialize Gumby in debug mode with only the specified UI modules
    Gumby.init({
      uiModules: ['skiplink', 'checkbox', 'radiobtn'],
      debugMode: true
    });

Gumby also has a method for initializing UI modules that have been dynamically added to the page. If you fetch a form with checkboxes and radio buttons using AJAX and insert it into the DOM, your checkboxes and radio buttons won't work as expected because they were not present when Gumby was initialized. Calling `initialize()` and specifying checkbox and radiobtn will hook them up, ready to go. You can also pass `true` as the second argument for Gumby to re-initialize module instances, this is useful when dynamically updating attributes.

    // initialize newly inserted skiplinks 
    Gumby.initialize('skiplink');

    // initialize newly inserted skiplinks and re-initialize current skiplinks
    Gumby.initialize('skiplink', true);

    // pass an array of newly inserted modules to initialize
    Gumby.initialize(['skiplink', 'checkbox', 'radiobtn']);

    // pass an array of newly inserted modules to initialize and re-initialize current versions
    Gumby.initialize(['skiplink', 'checkbox', 'radiobtn'], true);

## Touch Support

Using tap instead of click to power your UI on touch enabled devices can provide you with a unexpectedly huge performance gain, around 300ms per click is wasted on waiting to see if a double click event should be fired. On touch enabled devices we asynchronously load a custom build of [jQuery mobile](http://jquerymobile.com/), including only their touch events, and update all UI modules to use tap over click. This is default behaviour and Gumby will assume jQuery mobile is inside `js/libs` unless you specify a different path using the `gumby-touch` attribute. This is particularly useful on CMS driven sites and applications using front end frameworks that dictate directory structure.

    if(Gumby.touchEvents) {
      // test for touch event support
      Modernizr.load({
        test: Modernizr.touch,
        // if present load custom jQuery mobile build and update Gumby.click
        yep: Gumby.touchEvents+'/jquery.mobile.custom.min.js',
        callback: function(url, result, key) {
          // check jQuery mobile has successfully loaded before updating Gumby.click
          if($.mobile) {
              window.Gumby.click += ' tap';
          }
        }
      });
    }

You can use this solution in your own custom JavaScript code by binding events to the `Gumby.click` property within a `Gumby.ready` helper. This property will be set to `'click'` by default and will be updated to `'click tap'` if touch events are supported and jQuery mobile is successfully loaded. This means you will be binding to both events so be sure to use `preventDefault()` in your event handler (see below). The reason we bind to both events is to support multi input devices with touchscreens and pointer devices.

    $('#btn').on(Gumby.click, function(e) {
      // stop both click and tap from triggering event handler
      e.preventDefault();

      // do something awesome
    });

## Events & Initialization

Every UI module in Gumby Framework, including extensions and components, bind/emit custom events for you to make use of in your code. Using jQuery's [on()](http://api.jquery.com/on/) and [trigger()](http://api.jquery.com/trigger/) functions, binding/triggering these events is simple.

Gumby also uses custom events for re-initializing instances of UI modules which can be used when module attributes have been dynamically updated.

### Checkboxes

    // bind to checkbox events
    $('#checkbox').on('gumby.onCheck', function(e) {
      Gumby.debug('Checkbox checked');

    }).on('gumby.onUncheck', function(e) {
      Gumby.debug('Checkbox unchecked');

    }).on('gumby.onChange', function(e) {
      Gumby.debug('Checkbox updated');

    // dynamically check the checkbox
    }).trigger('gumby.check');

### Radio Buttons

    // bind to radio button check event
    $('#radiobtn').on('gumby.onCheck', function(e) {
      Gumby.debug('Radio button checked');

    // dynamically check the radio button
    }).trigger('gumby.check');

### Tabs

    // bind to tabs change event
    $('#tabs').on('gumby.onChange', function(e, index) {
      // index variable references active tab (zero indexed)
      Gumby.debug('Tab '+index+' set');

    // dynamically set tab 1 (zero indexed)
    }).trigger('gumby.set', 1);

### Toggles & Switches

    // bind to toggles & switches trigger event
    $('#toggle,#switch').on('gumby.onTrigger', function(e) {
      Gumby.debug('Toggle or Switch triggered');

      // dynamically trigger toggle/switch
    }).trigger('gumby.trigger')

    // re-initialize toggle/switch instance
    .trigger('gumby.initialize');

### Skip Links

    // bind to skiplink complete event
    $('#skiplink').on('gumby.onComplete', function(e) {
      Gumby.debug('Skiplink has completed');

      // manually trigger skip link, simulating user clicking
    }).trigger('gumby.skip')

    // re-initialize skiplink instance
    .trigger('gumby.initialize');

### Fixed Positions

    // bind to fixed modules events
    $('#fixed').on('gumby.onFixed', function(e) {
      Gumby.debug('Element has fixed');

    // scrolled back up past fix position now in original state
    }).on('gumby.onUnfixed', function(e) {
      Gumby.debug('Element has unfixed');

    }).on('gumby.onPinned', function(e) {
      Gumby.debug('Element has pinned');

    // re-initialize fixed module instance
    }).trigger('gumby.initialize');

### Retina Images

    // bind to retina module change event
    $('#image').on('gumby.onRetina', function(e) {
      Gumby.debug('Image updated to retina version');
    });

### Responsive Images

    // bind to responsive images module change event
    $('#image').on('gumby.onChange', function(e) {
      Gumby.debug('Image src has changed');

      // trigger responsive image tests
    }).trigger('gumby.trigger')

      // re-initialize responsive images instance
    .trigger('gumby.initialize');

### Shuffle

    // bind to shuffle module event 
    $('#shuffle').on('gumby.onShuffle', function(e) {
      Gumby.debug('Children have been shuffled');

      // trigger shuffle module tests
    }).trigger('gumby.shuffle')

      // re-initialize shuffle instance
    .trigger('gumby.initialize');

### Parallax

    // re-initialize parallax module instance
    $('#parallax').trigger('gumby.initialize');

### FitText

    // re-initialize fittext module instance
    $('#fittext').trigger('gumby.initialize');

## Validation

Gumby's validation comes in the form of a jQuery plugin. Initialize the plugin on a `<form>` element and pass an array of required field objects. The required field object should contain a name property that matches the input field name and a validation function returning a boolean indicating success/failure. The validation plugin will be passed a reference to the field input as a jQuery object.

You can provide optional submit and fail functions, if no submit function is provided the form will submit as usual otherwise your submit function will be called with the serialized form data as an argument.

    // initialize plugin
    $('form').validation({
      // pass an array of required field objects
      required: [
        {
          // name should reference a form inputs name attribute
          // just passing the name property will default to a check for a present value
          name: 'name',
        },
        {
          name: 'email',
          // pass a function to the validate property for complex custom validations
          // the function will receive the jQuery element itself, return true or false depending on validation
          validate: function($el) {
            return $el.val().match('@') !== null;
          }
        }
      ],
      // callback for failed validaiton on form submit
      fail: function() {
        Gumby.error('Form validation failed');
      },
      // callback for successful validation on form submit
      // if omited, form will submit normally
      submit: function(data) {
        $.ajax({
          url: 'do/something/with/data',
          data: data,
          success: function() {alert("Submitted");}
        });
      } 
    });

## Debug Mode

Gumby has a debug mode which serves two purposes. Firstly, it makes tracking down bugs in your application far easier and secondly, it provides an interface for logging errors and useful information in development with a simple switch for production.

There are four debug methods (see below), each passes the arguments on to the corresponding console function, however, they will only log the data when Gumby is in debug mode. Each UI module utilises these debugging methods to display useful information regarding an instance of a module. Initialization, event binding/triggering, syntax errors and alike are all logged to the console when in debug mode. If you are manually initializing then you can pass a debugMode property to the `init()` method/

There are two ways to set up debug mode. If you are using Gumby's default auto initialization then simply add `gumby-debug` to your `gumby.js` or `gumby.min.js` script tag.

### Auto Initialization

    <script gumby-debug src="js/libs/gumby.js"></script>

### Manual Initialization

    Gumby.init({
      debugMode: true
    });

### Usage

    // debug methods can be used throughout your applications codebase and will only output to the console when in debug mode
    Gumby.log('A simple string to log');
    Gumby.debug('Any number of arguments', ['any', 'data', 'type']);
    Gumby.warn({ key: value });
    Gumby.error('There was an error so tell me about it');

## Helpers

Gumby provides several public helper methods and properties to make life easier.

### Dom Loaded Callbacks

    // optional initialization of Gumby (see manual initialization section above)
    Gumby.init({
      debugMode: true
      uiModules: ['parallax', 'fittext', 'shuffle']

    // Gumby is ready to
    }).ready(function() {
      Gumby.debug('Gumby is ready to go');

    // Gumby is ready to go and this is a touch enabled device
    }).touch(function() {
      Gumby.debug('Touch enabled device');

    // Gumby is ready to go and this is <= IE8
    }).oldie(function() {
      Gumby.warn('Warning, warning, IE8 or worse!');
    });

### Helpful Properties

Be sure to use these properties within a `Gumby.ready` callback.

    // Boolean indicating touch device
    // uses Modernizr.touch and a Windows Phone user agent check
    Gumby.touchDevice

    // Boolean indicating touch device at < 768px viewport width
    // useful for supporting multi input devices with touchscreens and pointer devices
    Gumby.gumbyTouch

    // Boolean indicating <= IE8
    Gumby.oldie

    // 'click' unless touch events supported then 'click tap'
    // more info in Touch Support section
    Gumby.click
