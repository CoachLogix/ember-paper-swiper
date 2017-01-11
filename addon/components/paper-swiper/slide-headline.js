import Ember from 'ember';
import layout from '../../templates/components/paper-swiper/slide-headline';

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['md-headline', 'paper-swiper__slide-headline']
});
