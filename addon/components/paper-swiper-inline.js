import Ember from 'ember';
import layout from '../templates/components/paper-swiper-inline';
import { ParentMixin, ChildMixin } from 'ember-composability-tools';

const { Component, computed, guidFor } = Ember;

export default Component.extend(ParentMixin, ChildMixin, {
  layout,
  tagName: '',

  currentSlide: 0,
  totalSlides: computed.reads('childComponents.length'),

  isFirst: computed.equal('currentSlide', 0),
  isLast: computed('currentSlide', 'totalSlides', function() {
    return this.get('currentSlide') === this.get('totalSlides') - 1;
  }),

  bullets: computed('childComponents.[]', 'currentSlide', function() {
    let currentSlide = this.get('currentSlide');
    return this.get('childComponents')
      .map((_, i) => ({ isActive: i === currentSlide, index: i }));
  }),

  init() {
    this._super(...arguments);
    this.set('calloutId', `${guidFor(this)}-callout`);
  },

  actions: {
    previousSlide() {
      this.decrementProperty('currentSlide');
    },

    nextSlide() {
      this.incrementProperty('currentSlide');
    }
  }
});
