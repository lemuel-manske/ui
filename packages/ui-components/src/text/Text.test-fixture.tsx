import {
  archiveTheme,
  type DesignTokens,
  Size,
  Tone,
  Weight,
  Emphasis,
} from '@lemuel-manske/design-tokens';

import { Heading } from '../heading/Heading';

import { Text } from './Text';

import { Theme } from '../theme/Theme';
import { Fieldset, Legend } from '../fieldset/Fieldset';
import { FieldsetAppearance } from '../fieldset/options';
import { Input } from '../input/Input';

interface TextExampleProps {
  theme?: DesignTokens;
}

function TextExample({ theme = archiveTheme }: TextExampleProps) {
  return (
    <Theme theme={theme}>
      <Heading level={1} size={Size.XLARGE} weight={Weight.BOLD} emphasis={Emphasis.ITALIC}>
        A collection of preserved documents
      </Heading>
      <Heading level={2} size={Size.MEDIUM}>
        Recent captures
      </Heading>
      <Text>Browse the preserved collection.</Text>
      <Text size={Size.SMALL} tone="secondary">
        capture-2026-11-11-1234567890
      </Text>
      <Text size={Size.SMALL} tone="accent">
        Preserved collection
      </Text>
      <Text tone={Tone.SUCCESS}>Capture complete</Text>
      <Text tone={Tone.DANGER}>Capture failed</Text>
      <Text emphasis={Emphasis.ITALIC}>Editorial note</Text>
      <Fieldset appearance={FieldsetAppearance.DIVIDED}>
        <Legend size={Size.LARGE}>Authentication</Legend>
        <Input aria-label="Account" />
      </Fieldset>
    </Theme>
  );
}

export { TextExample };
