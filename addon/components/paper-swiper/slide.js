import Ember from 'ember';
import layout from '../../templates/components/paper-swiper/slide';
import { ChildMixin } from 'ember-composability-tools';

const { Component, computed, String: { htmlSafe } } = Ember;

export default Component.extend(ChildMixin, {
  layout,
  classNames: ['paper-swiper-slide', 'layout-column'],
  attributeBindings: ['widthStyle:style'],

  widthStyle: computed('containerWidth', function() {
    let containerWidth = this.get('containerWidth');
    return containerWidth ? htmlSafe(`width: ${containerWidth}px`) : null;
  })
});
