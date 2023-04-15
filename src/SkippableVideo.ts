import { css, html, LitElement, PropertyValueMap } from 'lit';
import { property, query, state } from 'lit/decorators.js';

/**
 * Skippable autoplay a muted video.
 * Users dislike autoplay videos, but clients like it, so here's a component that user can skip client's ignorance.
 *
 * @element skippable-video
 *
 * @fires remove - when the element is removed by the skip button or `auto-destroy` attribute.
 *
 * @attr {string} src - href to video source, similar to `HTMLVideoElement.src`
 * @attr {boolean} auto-destroy - If true, this component is automatically removed when the video has ended.
 *
 * @slot play-button - contents within the play HTMLButtonElement.
 * @slot skip-button - contents within the skip HTMLButtonElement.
 *
 * @cssPart play-button - styles the play HTMLButtonElement.
 * @cssPart skip-button - styles the skip HTMLButtonElement.
 */
export class SkippableVideo extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      display: block;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }

    button {
      padding: 0.7rem 1rem;
      color: #000000;
      border: none;
      cursor: pointer;
    }

    .play-button {
      background-color: black;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .play-button:hover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .skip-button {
      position: absolute;
      right: 2rem;
      bottom: 2rem;
      background: transparent;
      text-decoration: underline;
    }
  `;

  @property({ type: String }) src?: string;
  @property({ type: Boolean, attribute: 'auto-destroy' }) autoDestroy = false;
  @query('video') video!: HTMLVideoElement;
  @query('.play-button') playButton!: HTMLButtonElement;

  /**
   * Skips the video by destroying the component.
   */
  skip() {
    this.remove();
  }

  /**
   * Plays the video manually if autoplay doesn't work.
   */
  play() {
    this.video.play();
  }

  /**
   * Dispatches a remove event. Used when video has ended or skipped.
   */
  private dispatchRemove() {
    this.dispatchEvent(
      new CustomEvent('remove', {
        bubbles: true,
        detail: {
          video: this.video
        }
      })
    )
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.video.addEventListener('ended', () => this.autoDestroy && this.remove());
    const eventsToRequestUpdate = ['pause', 'play', 'canplay'];
    eventsToRequestUpdate.forEach(event => this.video.addEventListener(event, () => this.requestUpdate()));
    this.playButton.addEventListener('click', () => this.video?.play());

  }

  disconnectedCallback(): void {
    this.dispatchRemove();
  }

  render() {
    return html`
      <video src=${this.src} part="video" autoplay muted></video>
      <button type="button" class="play-button" part="play-button" ?hidden=${!this.video?.paused} @click="${this.play}">
        <slot name="play-button">Play</slot>
      </button>
      <button type="button" class="skip-button" part="skip-button" @click=${this.skip}>
        <slot name="skip-button">Skip Video</slot>
      </button>
    `
  }
}
