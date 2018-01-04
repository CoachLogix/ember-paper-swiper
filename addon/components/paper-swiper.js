import Ember from 'ember';
import layout from '../templates/components/paper-swiper';
import { ParentMixin } from 'ember-composability-tools';

const { Component, computed } = Ember;

export default Component.extend(ParentMixin, {
  layout,
  tagName: '',
  destinationId: 'paper-wormhole',

  currentSlide: 0,
  totalSlides: computed.reads('childComponents.firstObject.totalSlides'),

  isFirst: computed.equal('currentSlide', 0),
  isLast: computed('currentSlide', 'totalSlides', function() {
    return this.get('currentSlide') === this.get('totalSlides') - 1;
  }),

  actions: {
    previousSlide() {
      this.decrementProperty('currentSlide');
    },

    nextSlide() {
      this.incrementProperty('currentSlide');
    }
  }
});
