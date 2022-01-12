//@ts-check
'use strict';
/* jshint esversion:6 */

export const Util = {
  /**
   * @param {SVGPoint} pt1 
   * @param {SVGPoint} pt2 
   * @returns {number}
   */
  getDistance: function(pt1, pt2) {
    return Math.hypot(pt2.x - pt1.x, pt2.y - pt1.y);     // see 30 seconds of code
  },

  /**
   * @param {number} n 
   * @param {string} word 
   * @returns {string}
   */
  plural: function(n, word) {
    if ( 0 === n ) {
      return `no ${word}s`;
    } else if ( 1 === n ) {
      return `${n} ${word}`;
    } else {
      return `${n} ${word}s`;
    }
  },

  /**
   * @param {(number|SVGPoint)} x
   * @param {number=} y
   * @returns {SVGPoint}
  */
  newPoint: function(x, y=undefined) {
    // https://developer.mozilla.org/en-US/docs/Web/API/SVGPoint
    const pt = document.getElementById('baize').createSVGPoint();
    if ( typeof x === 'object' ) {
      pt.x = x.x;
      pt.y = x.y;
    } else if ( typeof x === 'number' && typeof y === 'number' ) {
      pt.x = x;
      pt.y = y;
    } else {
      throw new TypeError();
    }
    return pt;
  },

  /**
   * @param {SVGPoint} ptDst 
   * @param {SVGPoint} ptSrc 
   */
  copyPoint: function(ptDst, ptSrc) {
    ptDst.x = ptSrc.x;
    ptDst.y = ptSrc.y;
  },

  // samePoint: function(pt1, pt2) {
  //   return ( (pt1.x === pt2.x) && (pt1.y === pt2.y) );
  // },

  /**
   * @param {SVGPoint} pt1
   * @param {SVGPoint} pt2
   * @param {number=} slack
   * @returns {boolean}
   */
  nearlySamePoint: function(pt1, pt2, slack=8) {
    const xMin = pt1.x - slack;
    const xMax = pt1.x + slack;
    const yMin = pt1.y - slack;
    const yMax = pt1.y + slack;
    return ( pt2.x > xMin && pt2.x < xMax && pt2.y > yMin && pt2.y < yMax );
  },

  /**
   * @param {number} x 
   * @param {number} y 
   * @returns {SVGPoint}
   */
  DOM2SVG: function(x, y) {
    // https://www.sitepoint.com/how-to-translate-from-dom-to-svg-coordinates-and-back-again/
    const pt = Util.newPoint(x,y);
    // https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement
    pt.matrixTransform(document.getElementById('baize').getScreenCTM().inverse());
    pt.x = Math.round(pt.x);
    pt.y = Math.round(pt.y);
    return pt;
  },

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
   * 
   * @param {Element} ele 
   * @param {Object} attribs 
   */
  setAttributesNS(ele, attribs) {
    for ( let a in attribs ) {
      ele.setAttributeNS(null, a, attribs[a]);
    }
  },

  /**
   * @param {string} id
   */
  play(id) {
    let ele = /** @type {HTMLMediaElement} */(document.querySelector(`audio#${id}`));
    var promise = ele.play();
    if (promise !== undefined) {
      promise.then(_ => {
        // console.log(`Play audio#${id}`);
      }).catch(error => {
        // console.log(`Autoplay prevented audio#${id}`);
      });
    }
  },

  // https://medium.com/@boltmick1/the-simple-math-every-developer-should-know-3f9b25446550

  /**
   * Linear interpolation. The idea is very simple, you have 2 values, and you want to “walk” between those values by a factor.
   * If you pass a factor of 0, you are pointing to the beginning of the walk so the value is equal to start.
   * If you pass a factor of 1, you are pointing to the end of the walk so the value is equal to end.
   * Any factor between 0 and 1 will add a (1-factor) of start argument and a factor of end argument.
   * (e.g with start 0 and end 10 with a factor 0.5 you will have a 5, so the half of the path)
   * 
   * @param {number} start
   * @param {number} end
   * @param {number} factor
   * @return {number}
   */
  lerp : (start, end, factor) => start*(1-factor) + end*factor,

  /**
   * The opposite of lerp. Instead of a range and a factor, we give a range and a value to find out the factor.
   * 
   * @param {number} start
   * @param {number} end
   * @param {number} value
   * @return {number}
   */
  normalize : (start, end, value) => (value - start) / (end - start),

  /**
   * converts a value from the scale [fromMin, fromMax] to a value from the scale[toMin, toMax].
   * It’s just the normalize and lerp functions working together.
   * 
   * @param {number} fromMin
   * @param {number} fromMax
   * @param {number} toMin
   * @param {number} toMax
   * @param {number} value
   * @return {number}
   */
 mapValue : (value, fromMin, fromMax, toMin, toMax) => Util.lerp(toMin, toMax, Util.normalize(fromMin, fromMax, value)),

  /**
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @return {number}
   */
  clamp : (value, min, max) => Math.min(Math.max(value, min), max),
};
