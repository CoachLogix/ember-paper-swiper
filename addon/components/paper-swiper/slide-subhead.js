import Ember from 'ember';
import layout from '../../templates/components/paper-swiper/slide-subhead';

export default Ember.Component.extend({
  layout,
  tagName: 'span',
  classNames: ['md-subhead', 'paper-swiper__slide-subhead']
});
