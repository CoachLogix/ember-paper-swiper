import Ember from 'ember';
import layout from '../templates/components/paper-swiper';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  layout,
  currentBG: '',
  classNames: ['paper-swiper__backdrop'],
  screen: inject.service(),
  desktop: computed('screen.width', function() {
    return this.get('screen.width') > 1199;
  }),
  actions: {
    initSwiper(swiper) {
      this.set('currentBG', $(swiper.slides[swiper.activeIndex]).find('img').attr('src'));
    },

    swiperChangeStart(swiper) {
      this.set('currentBG', $(swiper.slides[swiper.activeIndex]).find('img').attr('src'));
    }
  }
});
