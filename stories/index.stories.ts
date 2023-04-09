import { html, TemplateResult } from 'lit';
import '../src/skippable-video.js';

export default {
  title: 'SkippableVideo',
  component: 'skippable-video',
  argTypes: {
    src: { control: 'text' },
    autoDestroy: { control: 'boolean' },
    slotPlay: { control: 'text' },
    slotSkip: { control: 'text' },
  }
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  src?: string;
  autoDestroy?: boolean;
  slotPlay?: TemplateResult;
  slotSkip?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
  autoDestroy,
  slotPlay,
  slotSkip,
}: ArgTypes) => html`
  <skippable-video
    src="${src}"
    ?auto-destroy=${autoDestroy}
  >
    ${slotPlay ? html`<p slot="play-button">${slotPlay}</p>` : null}
    ${slotSkip ? html`<p slot="skip-button">${slotSkip}</p>` : null}
  </skippable-video>
`;



export const Regular = Template.bind({});

export const AutoDestroy = Template.bind({});
AutoDestroy.args = {
  autoDestroy: true,
};
