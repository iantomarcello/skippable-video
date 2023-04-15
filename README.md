# \<skippable-video>

Clients **_LOVE_** fullscreen autoplay videos, despite my protests as frontend dev that browsers and 99.99% users to do not think that way.

So here's a component that lets users skip this video, because clients do not seem to understand browsers do not autoplay videos when landing into a new website. <small>🤷</small>

<br>
This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

Via the node

```bash
npm i skippable-video
```

## Usage

```html
<script type="module">
  import "skippable-video/skippable-video.js";
</script>

<style>
  skippable-video::part(play-button) {
    font-size: 2rem;
  }

  skippable-video::part(skip-button) {
    background-color: grey;
    color: white;
    text-transform: uppercase;
  }
</style>

<skippable-video src="./link/to/video.mp4" auto-destroy>
  <div slot="play-button">
    You'll this slotted if the video isn't autoplayed.
  </div>
  <div slot="skip-button">Yes, skip the video please</div>
</skippable-video>
```

## Attributes

`src`: string <br>
href to video source, similar to `HTMLVideoElement.src`

`auto-destroy`: boolean <br>
If true, this component is automatically removed when the video has ended.

## Slots

`play-button`: HTMLButtonElement <br>
Slot contents within the play button.

`skip-button`: HTMLButtonElement <br>
Slot contents within the skip button.

## CSS Part

`play-button` <br>
Styles the play button.

`skip-button` <br>
Styles the skip button.

## Events

`remove` <br>
Fires when the element is removed by the skip button or `auto-destroy` attribute.

# Future plans
Plans to make this component a superset of HTMLVideoElement, i.e. primarily allowing native/original attributes like `controls`, `width`, `height` etc are automatically passed from the host component into the video element in the shadow dom.
