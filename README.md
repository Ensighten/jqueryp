# jqueryp

Quickly create new jQuery plugins and chain together jQuery plugin requires.

## Getting Started

### In the browser
Download the [production version][min] ([vanilla][min] or [requirejs][min_require]) or the [development version][max] ([vanilla][max] or [requirejs][max_require]).

Additionally, the [chaining mechanism](#requirejs-extras) is available sans `$.exportModule` ([production][min_chainer] and [development][max_chainer]).

[min_require]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.require.min.js
[max_require]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.require.js
[min]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.min.js
[max]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.js
[min_chainer]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.chainer.min.js
[max_chainer]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.chainer.js

In your web page:

```html
<script src="dist/jqueryp.min.js"></script>
<script>
$.exportModule('cornify', Cornifier);
$('div').cornify();
</script>
```

## Documentation
`jqueryp` writes itself a method directly on the `jQuery` object. It can be accessed via `$.exportModule` or `jQuery.exportModule`.
```js
/**
 * Function to easily add new jQuery plugins via a constructor function
 * @param {String} moduleName Name of the module
 * @param {Function} module Constructor function to bind under $()[moduleName]
 */
```

### require.js extras
If you are using [require.js][requirejs], you will need to `require(['jqueryp!'], function ($) { /* ... */ });` to access `$.exportModule`. The trailing `!` is an artifact of `jqueryp` being a plugin.

The initial intent of `jqueryp` was to chain together `require`s of multiple jQuery plugin and still wind up with jQuery in the end. As a result, you can load in the jQuery plugins `autocomplete`, `expand`, `modal` via

```js
require(['jqueryp!autocomplete!expand!ui'], function ($) {
  // Do stuff with $.fn.autocomplete
  // Do stuff with $.fn.expand
  // Do stuff with $.fn.modal
});
```

[requirejs]: http://requirejs.org/

## Examples

### Setting up a new jQuery plugin
```js
// Create a Toggle class
function Toggle(elt) {
  var $elt = $(elt),
      that = this;

  this.$elt = $elt;

  // When the element is clicked, toggle it
  $elt.on('click', function () {
    that.toggle();
  });
}
Toggle.prototype = {
  'toggle': function () {
    var $item = this.$item;

    // Toggle the class
    $item.toggleClass('is-selected');

    // Fire an event
    $item.trigger('toggle.toggle');
  }
};

// Export the Toggle class to $.fn
$.exportModule('toggle', Toggle);
```

### Play around with `click` binding by constructor
```js
// Enable toggling of table rows
var $rows = $('tr');
$rows.toggle();

// Click the first row
var $firstRow = $rows.first();
$firstRow.click();

// Assert the first row has the class 'is-selected'
$firstRow.hasClass('is-selected'); // true
$rows.last().hasClass('is-selected'); // false
```

### Manually call prototyped methods
```js
// Calling 'toggle' method of Toggle class
var $pseudoCheckboxes = $('.pseudo-checkbox');
$pseudoCheckboxes.toggle('toggle');

// The checkboxes are now checked
$pseudoCheckboxes.hasClass('is-selected'); // true

// Clicking them will uncheck them (as set up by constructor)
$pseudoCheckboxes.click();
$pseudoCheckboxes.hasClass('is-selected'); // false
```

### require.js flavor allows for slick chaining of plugin dependencies
```js
require(['jqueryp!autocomplete!expand!ui'], function ($) {
  $('input[type="text"]').autocomplete();
  $('.container-tall').expand();
  $('.modal').modal();
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" or "stage" subdirectories as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

### PhantomJS
While grunt can run the included unit tests via [PhantomJS](http://phantomjs.org/), this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

See the [Why does grunt complain that PhantomJS isn't installed?](https://github.com/gruntjs/grunt/blob/master/docs/faq.md#why-does-grunt-complain-that-phantomjs-isnt-installed) guide in the [Grunt FAQ](https://github.com/gruntjs/grunt/blob/master/docs/faq.md) for help with installing or troubleshooting PhantomJS.

## License
Copyright (c) 2012 Ensighten
Licensed under the MIT license.
