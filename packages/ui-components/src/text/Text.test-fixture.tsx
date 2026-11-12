import { archiveTheme, type DesignTokens } from '@lemuel-manske/design-tokens';

import { Heading } from '../heading/Heading';

import { Text } from './Text';

import { Fieldset, Legend } from '../fieldset/Fieldset';
import { Input } from '../input/Input';
import { Theme } from '../theme/Theme';

interface TextExampleProps {
  theme?: DesignTokens;
}

function TextExample({ theme = archiveTheme }: TextExampleProps) {
  return (
    <Theme theme={theme}>
      <Heading level={1} size="xlarge" weight="bold" emphasis="italic">
        A collection of preserved documents
      </Heading>

      <Heading level={2} size="medium">
        Recent captures
      </Heading>

      <Text>Browse the preserved collection.</Text>

      <Text size="small" tone="secondary">
        capture-2026-11-11-1234567890
      </Text>

      <Text size="small" tone="accent">
        Preserved collection
      </Text>

      <Text tone="success">Capture complete</Text>
      <Text tone="danger">Capture failed</Text>
      <Text emphasis="italic">Editorial note</Text>

      <Fieldset appearance="divided">
        <Legend size="large">Authentication</Legend>
        <Input aria-label="Account" />
      </Fieldset>
    </Theme>
  );
}

export { TextExample };
