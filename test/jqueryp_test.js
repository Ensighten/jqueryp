/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

// Skeleton from github
// - jqueryp exists.
// - A toggle class
//     - added via jqueryp
//         - exists on jQuery collections.

// - A jQuery collection
//     - when an empty toggler is called (jqueryp method)
//         - the Toggler constructor is run (asserts class or some other attribute)

// - A jQuery collection
//     - when toggled via a jqueryp method
//         - runs the Toggler.toggle method (asserts class or some other attribute)

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

  module('jQuery#exportModule', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('exists', 1, function() {
    ok($.exportModule, '$.exportModule does not exist');
  });

  module('A toggle class added via jQuery#exportModule', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();

      // Create the toggle class
      function Toggle(elt) {
        var $elt = $(elt),
            that = this;

        this.$elt = $elt;

        // Save the toggle class to the element
        $elt.addClass('toggle');
      }
      Toggle.prototype = {
        'toggle': function () {
          // Toggle the class
          var $item = this.$item;
          $item.toggleClass('is-selected');
        }
      };

      // Expose it via jqueryp
      $.exportModule('toggle', Toggle);
    }
  });

  test('exists on jQuery collections', 1, function() {
    ok(this.elems.toggle, 'toggle should exist on jQuery collections');
  });

  module('jQuery.awesome');

  test('is awesome', 1, function() {
    strictEqual($.awesome(), 'awesome', 'should be thoroughly awesome');
  });

  module(':awesome selector', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is awesome', 1, function() {
    // Use deepEqual & .get() when comparing jQuery objects.
    deepEqual(this.elems.filter(':awesome').get(), this.elems.last().get(), 'knows awesome when it sees it');
  });

}(jQuery));
