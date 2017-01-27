import Ember from 'ember';
import $ from 'jquery';
import layout from '../../templates/components/paper-swiper/container';
/* global Hammer */

const { Component, computed, run, String: { htmlSafe } } = Ember;

export default Component.extend({
  layout,
  classNames: ['paper-swiper-container'],

  dragging: false,
  draggingOffset: 0,
  animationDuration: 300,

  offset: computed('currentSlide', 'containerWidth', 'draggingOffset', function() {
    return ((this.get('currentSlide') - 1)  * this.get('containerWidth') * -1) + this.get('draggingOffset');
  }),

  containerOffset: computed('offset', 'dragging', 'animationDuration', function() {
    let { offset, dragging, animationDuration } = this.getProperties('offset', 'dragging', 'animationDuration');
    // don't animate while dragging
    let duration = dragging ? 0 : animationDuration;
    return htmlSafe(`transition-duration: ${duration}ms; transform: translate3d(${offset}px, 0px, 0px);`);
  }),

  didInsertElement() {
    this._super(...arguments);

    let containerHammer = new Hammer(this.element);
    containerHammer.get('pan').set({ threshold: 1 });
    containerHammer.on('panstart', run.bind(this, this._dragStart))
      .on('panmove', run.bind(this, this._drag))
      .on('panend', run.bind(this, this._dragEnd));

    this._hammer = containerHammer;

    this.updateContainerWidth();
    $(window).on(`resize.${this.elementId}`, run.bind(this, 'updateContainerWidth'));
  },

  willDestroyElement() {
    this._super(...arguments);
    this._hammer.destroy();
    $(window).off(`resize.${this.elementId}`);
  },

  updateContainerWidth() {
    let { width } = window.getComputedStyle(this.element);
    this.set('containerWidth', parseInt(width));
  },

  _dragStart() {
    this.set('dragging', true);
  },

  _drag(ev) {
    let dragOffset = ev.deltaX;

    if ((this.get('swiper.isFirst') && ev.direction === Hammer.DIRECTION_RIGHT) ||
      this.get('swiper.isLast') && ev.direction === Hammer.DIRECTION_LEFT) {
      dragOffset *= .4;
    }

    this.set('draggingOffset', dragOffset);
  },

  _dragEnd(ev) {
    let containerWidth = this.get('containerWidth');
    // more then 50% moved, navigate
    if (Math.abs(ev.deltaX) > containerWidth / 2) {
      if(ev.direction === Hammer.DIRECTION_RIGHT) {
          this.previousSlide();
      } else if (ev.direction === Hammer.DIRECTION_LEFT) {
          this.nextSlide();
      }
    }

    this.set('draggingOffset', 0);
    this.set('dragging', false);
  },

  goToSlide(index) {
    let nextSlide = this.get('currentSlide') + index;
    nextSlide = Math.max(1, Math.min(nextSlide, this.get('swiper.totalSlides')));
    this.set('currentSlide', nextSlide);
  },

  nextSlide() {
    this.goToSlide(1);
  },

  previousSlide() {
    this.goToSlide(-1);
  }
});