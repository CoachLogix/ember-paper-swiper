import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import layout from '../../templates/components/paper-swiper/container';
/* global Hammer */

export default Component.extend({
  layout,
  classNames: ['paper-swiper-container'],

  dragging: false,
  draggingOffset: 0,
  animationDuration: 300,

  offset: computed('currentSlide', 'containerWidth', 'draggingOffset', function() {
    return (this.get('currentSlide')  * this.get('containerWidth') * -1) + this.get('draggingOffset');
  }),

  containerOffset: computed('offset', 'dragging', 'animationDuration', function() {
    let { offset, dragging, animationDuration } = this.getProperties('offset', 'dragging', 'animationDuration');
    // don't animate while dragging
    let duration = dragging ? 0 : animationDuration;
    return htmlSafe(`transition-duration: ${duration}ms; transform: translate3d(${offset}px, 0px, 0px);`);
  }),

  didInsertElement() {
    this._super(...arguments);

    let containerManager = new Hammer.Manager(this.element);
    let pan = new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 });
    let swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 10 });
    swipe.recognizeWith(pan);
    containerManager.add(swipe);
    containerManager.add(pan);

    containerManager.on('panstart', run.bind(this, this.dragStart))
      .on('panmove', run.bind(this, this.drag))
      .on('panend', run.bind(this, this.dragEnd))
      .on('swiperight', run.bind(this, this.swipeRight))
      .on('swipeleft', run.bind(this, this.swipeLeft));

    this._hammer = containerManager;

    this.updateContainerWidth();
    this._onResize = run.bind(this, this.updateContainerWidth);
    window.addEventListener('resize', this._onResize);
  },

  willDestroyElement() {
    this._super(...arguments);
    this._hammer.destroy();
    window.removeEventListener('resize', this._onResize);
    this._onResize = null;
  },

  updateContainerWidth() {
    // 400ms debouncing accounts for the width animation delay.
    // We need to wait for the correct dimensions.
    run.debounce(this, this.updateContainerWidthDebounced, 400);
  },

  updateContainerWidthDebounced() {
    if (this.element) {
        let { width } = window.getComputedStyle(this.element);
        this.set('containerWidth', parseInt(width));
    }
  },

  goToSlide(index) {
    let nextSlide = this.get('currentSlide') + index;
    nextSlide = Math.max(0, Math.min(nextSlide, this.get('swiper.totalSlides') - 1));
    this.set('currentSlide', nextSlide);
  },

  nextSlide() {
    this.goToSlide(1);
  },

  previousSlide() {
    this.goToSlide(-1);
  },

  /* HAMMER HANDLERS */

  dragStart() {
    this.set('dragging', true);
  },

  drag(ev) {
    let dragOffset = ev.deltaX;

    if ((this.get('swiper.isFirst') && ev.direction === Hammer.DIRECTION_RIGHT)
      || this.get('swiper.isLast') && ev.direction === Hammer.DIRECTION_LEFT) {
      dragOffset *= 0.4;
    }

    this.set('draggingOffset', dragOffset);
  },

  dragEnd(ev) {
    let containerWidth = this.get('containerWidth');
    // more then 50% moved, navigate
    if (Math.abs(ev.deltaX) > containerWidth / 2) {
      if (ev.direction === Hammer.DIRECTION_RIGHT) {
        this.previousSlide();
      } else if (ev.direction === Hammer.DIRECTION_LEFT) {
        this.nextSlide();
      }
    }

    this.set('draggingOffset', 0);
    this.set('dragging', false);
  },

  swipeRight() {
    if (!this.get('swiper.isFirst')) {
      this.stopPan();
      this.previousSlide();
    }
  },

  swipeLeft() {
    if (!this.get('swiper.isLast')) {
      this.stopPan();
      this.nextSlide();
    }
  },

  /*
   * When we detect a swipe we need to
   * abort pan detection immediately.
   */
  stopPan() {
    this._hammer.stop(true);
    this.set('draggingOffset', 0);
    this.set('dragging', false);
  }
});