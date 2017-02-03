# ember-paper-swiper

This is an ember-paper addon that implements material design's onboarding "Top user benefits" using ember-paper. (More info: https://material.io/guidelines/growth-communications/onboarding.html#onboarding-top-user-benefits)

# Usage

This is how the API looks like:

```hbs
{{#paper-swiper as |swiper|}}

  {{#swiper.callout}}
    {{#paper-button raised=true onClick=(action (mut shouldShowSwiper) false)}}
      Get Started
    {{/paper-button}}
  {{/swiper.callout}}

  {{#swiper.slide class="bear-slide" as |slide|}}
    {{slide.media src="https://d13yacurqjgara.cloudfront.net/users/179241/screenshots/2835402/attachments/582801/chris-fernandez-a-proper-bear-3.png"}}
    {{#slide.headline}}
      Your lab, everywhere
    {{/slide.headline}}
    {{#slide.subhead}}
      Use everyday objects<br>
      in your experiments.
    {{/slide.subhead}}
  {{/swiper.slide}}

  {{#swiper.slide class="elephant-slide" as |slide|}}
    {{slide.media src="https://d13yacurqjgara.cloudfront.net/users/179241/screenshots/2633954/chris-fernandez-elephant-2.jpg"}}
    {{#slide.headline}}
      A better way to schedule
    {{/slide.headline}}
    {{#slide.subhead}}
      Calendar sync lets your clients know when
      you're available.
    {{/slide.subhead}}
  {{/swiper.slide}}

  {{!-- define as many slides as you need --}}

{{/paper-swiper}}
```

You basically define a callout that is fixed across all slides, and define all the slides
you need. Each slide can define an image, a headline and a subhead.

`paper-swiper` works very much like `paper-dialog`, so make sure to check http://miguelcobain.github.io/ember-paper/release-1/#/components/dialog

## Demo

You can see how this addon looks like at https://coachlogix.github.io/ember-paper-swiper/

Try resizing your browser to see how it responds to different breakpoints, particularly landscape vs portrait on smaller devices.

## Installation

Just run

```bash
ember install ember-paper-swiper
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
