import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['paper-swiper-slide-media'],
  attributeBindings: ['backgroundStyle:style'],

  backgroundStyle: computed('src', function() {
    let src = this.get('src');
    return htmlSafe(`background-image: url("${src}")`);
  })
});
