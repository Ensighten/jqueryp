/**
 * Function to easily add new jQuery plugins via a constructor function
 * @param {String} moduleName Name of the module
 * @param {Function} module Constructor function to bind under $()[moduleName]
 */
$.exportModule = function (moduleName, module) {
  // Namespace module name to prevent potential overwriting by jquery.data
  var _moduleName = 'jqueryp_' + moduleName;
  /**
   * $.moduleName (e.g. $.swapper)
   * @param {String|Boolean} [method] If true, the corresponding module will be returned. Otherwise, it is the method that will be called on the module.
   * @param {Mixed} [params...] Parameters to pass through to the method
   */
  $.fn[moduleName] = function (method/*, params... */) {
    var args = [].slice.call(arguments, 1),
        retVal = this;

    // Go through the items
    this.each(function (index) {
      // Grab the item from the data layer
      var $this = $(this),
        item = $this.data(_moduleName);

      // If it does not exist, create it
      if (item === undefined) {
        item = new module($this);
        $this.data(_moduleName, item);
      }

      // If there is a method
      if (method) {
        // If the method is 'true'
        if (method === true) {
          // If this is the first item, return it as the retVal
          if (index === 0) {
            retVal = item;
          }
        } else {
        // Otherwise, call the method
          var methodFn = item[method];

          // If there is no method fn, error out
          if (methodFn === undefined) {
            var console = window.console;
            if (console && console.error) {
              console.error(moduleName + '.' + method + ' not found!');
            }
          } else if (typeof methodFn !== 'function') {
          // Otherwise, if the item is not a function
            if (index === 0) {
              retVal = methodFn;
            }
          } else {
            var val = methodFn.apply(item, args);
            if (index === 0 && val !== undefined) {
              retVal = val;
            }
          }
        }
      }
    });

    // Return this or the retVal of the first item
    return retVal;
  };
};