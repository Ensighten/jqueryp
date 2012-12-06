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
          var $elt = this.$elt;
          $elt.toggleClass('is-selected');
        }
      };

      // Expose it via jqueryp
      $.exportModule('toggle', Toggle);
    }
  });

  test('exists on jQuery collections', 1, function() {
    ok(this.elems.toggle, 'toggle should exist on jQuery collections');
  });

  test('is chainable', 1, function () {
    strictEqual(this.elems.toggle(), this.elems);
  });

  module('A jQuery collection (empty test)', {
    setup: function() {
      this.elems = $('#qunit-fixture-empty-test').children();
    }
  });

  test('when an empty toggler is called (jqueryp method), the Toggler constructor is run (asserts class or some other attribute)', 1, function() {
    var $elems = this.elems;
    $elems.toggle();
    ok($elems.hasClass('toggle'), 'should have class from constructor');
  });

  module('A jQuery collection (method test)', {
    setup: function() {
      this.elems = $('#qunit-fixture-method-test').children();
    }
  });

  test('when toggled via a jqueryp method runs the Toggler.toggle method (asserts class or some other attribute)', 2, function() {
    var $elems = this.elems;
    $elems.toggle('toggle');
    ok($elems.hasClass('toggle'), 'should have class from constructor');
    ok($elems.hasClass('is-selected'), 'should have class from method');
  });

}(jQuery));
