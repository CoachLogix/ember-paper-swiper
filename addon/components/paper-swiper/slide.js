import Ember from 'ember';
import layout from '../../templates/components/paper-swiper/slide';
import { ChildMixin } from 'ember-composability-tools';

const { Component, computed, String: { htmlSafe } } = Ember;

export default Component.extend(ChildMixin, {
  layout,
  classNames: ['paper-swiper-slide'],
  attributeBindings: ['widthStyle:style'],

  widthStyle: computed('containerWidth', function() {
    let containerWidth = this.get('containerWidth');
    return containerWidth ? htmlSafe(`width: ${containerWidth}px`) : null;
  }),

  headlineId: computed('elementId', function() {
    return `${this.elementId}-headline`;
  }),

  subheadId: computed('elementId', function() {
    return `${this.elementId}-subhead`;
  })
});
