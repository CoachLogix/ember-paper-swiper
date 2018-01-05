import { reads, equal } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/paper-swiper';
import { ParentMixin } from 'ember-composability-tools';

export default Component.extend(ParentMixin, {
  layout,
  tagName: '',
  destinationId: 'paper-wormhole',

  currentSlide: 0,
  totalSlides: reads('childComponents.firstObject.totalSlides'),

  isFirst: equal('currentSlide', 0),
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
