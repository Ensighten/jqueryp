return {
  /**
   * Plugin load function (paraphrased from http://requirejs.org/docs/plugins.html#apiload)
   * @param {String} name Resources following ! (e.g 'world!three' in 'hello!world!three')
   * @param {Function} req Require to use to load other modules
   * @param {Function} load Callback to run with the completed item
   * @param {Object} config Configuration object used by requirejs
   */
  'load': function (name, req, load, config) {
    // Fallback name
    name = name || '';

    // Break up the plugins by !
    var plugins = name.split(/!/g);

    // Require each of the plugins
    req(plugins, function () {
      // Callback with jQuery
      load($);
    });
  },
  'jquery': $
};