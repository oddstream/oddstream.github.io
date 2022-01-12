import Constants from './Constants.js';
import Util from './Util.js';

export default class Button {
  /**
   * @param {object} options 
   */

  // <g class="button" id="new" transform="translate(10,25)">
  //   <rect width="100" height="50" rx="10"/>
  //   <svg width="100" height="50">
  //     <text class="buttontext" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">New</text>
  //   </svg>
  // </g>
  constructor(options={}) {
    this.id = options.id || 'button';
    this.width = options.width || Constants.BUTTON_WIDTH;
    this.height = options.height || Constants.BUTTON_HEIGHT;
    this.x = options.x;
    this.y = options.y;
    this.command = options.command;

    this.g = document.createElementNS(Constants.SVG_NAMESPACE, 'g');
    this.g.classList.add('button');
    Util.setAttributesNS(this.g, {
      'id': this.id,
      'transform': `translate(${this.x}, ${this.y})`,
    });

    this.rect = document.createElementNS(Constants.SVG_NAMESPACE, 'rect');
    Util.setAttributesNS(this.rect, {
      'width': this.width,
      'height': this.height,
      'rx': String(this.width/20)
    });
    this.g.appendChild(this.rect);

    this.svg = document.createElementNS(Constants.SVG_NAMESPACE, 'svg');
    Util.setAttributesNS(this.svg, {
      'width': String(Constants.BUTTON_WIDTH),
      'height': String(Constants.BUTTON_HEIGHT)
    });
    this.g.appendChild(this.svg);

    this.text = document.createElementNS(Constants.SVG_NAMESPACE, 'text');
    this.text.classList.add('buttontext');
    Util.setAttributesNS(this.text, {
      'x': '50%',
      'y': '50%',
      'dominant-baseline': 'central',
      'text-anchor': 'middle'
    });
    this.text.innerHTML = options.text;
    this.svg.appendChild(this.text);

    options.parent.appendChild(this.g);

    this.downHandler = this.onpointerdown.bind(this);
    this.upHandler = this.onpointerup.bind(this);
    this.cancelHandler = this.onpointercancel.bind(this);

    this.g.addEventListener('pointerdown', this.downHandler);
    this.g.addEventListener('touchstart', Util.dummyTouchHandler);
    this.g.addEventListener('touchmove', Util.dummyTouchHandler);
    this.g.addEventListener('touchend', Util.dummyTouchHandler);
  }

  /**
   * @param {number} b positive or negative border width
   */
  adjustBorder(b) {
    this.x += b;
    Util.setAttributesNS(this.g, {
      'transform': `translate(${this.x}, ${this.y})`,
    });
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerdown(event) {
    Util.absorbEvent(event);
    window.addEventListener('pointerup', this.upHandler);
    window.addEventListener('pointercancel', this.cancelHandler);
    return false;
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerup(event) {
    Util.absorbEvent(event);
    window.removeEventListener('pointerup', this.upHandler);
    window.removeEventListener('pointercancel', this.cancelHandler);

    const r = this.g.getBoundingClientRect();
    // console.log('rect', r);
    // console.log('event client', event.clientX, event.clientY);
    if ( event.clientX > r.left && event.clientX < r.right ) {
      if ( event.clientY > r.top && event.clientY < r.bottom ) {
        document.dispatchEvent(new Event(this.command));
      }
    }
    return false;
  }

  /**
   * @param {PointerEvent} event 
   */
  onpointercancel(event) {
    console.log('cancel');
  }

}

