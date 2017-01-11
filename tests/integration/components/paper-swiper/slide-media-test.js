import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-swiper/slide-media', 'Integration | Component | paper swiper/slide media', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-swiper/slide-media}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-swiper/slide-media}}
      template block text
    {{/paper-swiper/slide-media}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
