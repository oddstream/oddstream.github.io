// Util.js

// a collection of static functions, hence not using class, export class, export default class

const Util = {
  /**
   * @param {Event} event 
   * @returns {boolean}
   */
  absorbEvent: function(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  },

  /**
   * @param {Element} ele 
   * @param {Object} attribs 
   */
  setAttributesNS: function(ele, attribs) {
    for ( let a in attribs ) {
      ele.setAttributeNS(null, a, attribs[a]);
    }
  },
  
  // https://stackoverflow.com/questions/20368071/touch-through-an-element-in-a-browser-like-pointer-events-none/20387287#20387287
  dummyTouchHandler: function(/** @type {Event} */e) {
    e.preventDefault();
  },

}

export default Util;
