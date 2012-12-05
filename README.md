# jqueryp

Quickly create new jQuery plugins and chain together jQuery plugin requires.

## Getting Started

### In the browser
Download the [production version][min] ([vanilla][min] or [requirejs][min_require]) or the [development version][max] ([vanilla][max] or [requirejs][max_require]).

[min_require]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.require.min.js
[max_require]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.require.js
[min]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.min.js
[max]: https://raw.github.com/Ensighten/jqueryp/master/dist/jqueryp.js

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
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" or "stage" subdirectories as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## License
Copyright (c) 2012 Ensighten
Licensed under the MIT license.
