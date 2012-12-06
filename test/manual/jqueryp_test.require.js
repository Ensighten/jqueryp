/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

/*
  ======== A Handy Little QUnit Reference ========
  http://docs.jquery.com/QUnit

  Test methods:
    expect(numAssertions)
    stop(increment)
    start(decrement)
  Test assertions:
    ok(value, [message])
    equal(actual, expected, [message])
    notEqual(actual, expected, [message])
    deepEqual(actual, expected, [message])
    notDeepEqual(actual, expected, [message])
    strictEqual(actual, expected, [message])
    notStrictEqual(actual, expected, [message])
    raises(block, [expected], [message])
*/

module('requirejs#jqueryp');

test('returns jquery when empty (jqueryp!)', 1, function() {
  stop();
  require(['jqueryp!'], function ($) {
    strictEqual($, window._$);
    start();
  });
});

test('returns jquery with one module (jqueryp!world)', 3, function() {
  function world() {}
  define('world', ['jquery'], function ($) {
    $.fn.world = world;
  });
  notStrictEqual(window._$.fn.world, world);
  stop();
  require(['jqueryp!world'], function ($) {
    strictEqual(window._$, $);
    strictEqual(window._$.fn.world, world);
    start();
  });
});

test('returns jquery with multiple module (jqueryp!earth!moon!stars)', 7, function() {
  function earth() {}
  function moon() {}
  function stars() {}
  define('earth', ['jquery'], function ($) {
    $.fn.earth = earth;
  });
  define('moon', ['jquery'], function ($) {
    $.fn.moon = moon;
  });
  define('stars', ['jquery'], function ($) {
    $.fn.stars = stars;
  });
  notStrictEqual(window._$.fn.earth, earth);
  notStrictEqual(window._$.fn.moon, moon);
  notStrictEqual(window._$.fn.stars, stars);
  stop();
  require(['jqueryp!earth!moon!stars'], function ($) {
    strictEqual(window._$, $);
    strictEqual(window._$.fn.earth, earth);
    strictEqual(window._$.fn.moon, moon);
    strictEqual(window._$.fn.stars, stars);
    start();
  });
});