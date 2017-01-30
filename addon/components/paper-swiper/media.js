import Ember from 'ember';
const { Component, computed, String: { htmlSafe } } = Ember;

export default Component.extend({
  classNames: ['paper-swiper-slide-media'],
  attributeBindings: ['backgroundStyle:style'],

  backgroundStyle: computed('src', function() {
    let src = this.get('src');
    return htmlSafe(`background-image: url("${src}")`);
  })
});
