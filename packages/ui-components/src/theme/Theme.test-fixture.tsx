import { useState } from 'react';

import { archiveTheme, libraryTheme } from '@lkmliz/design-tokens';

import { Button } from '../button/Button';
import { ButtonVariant } from '../button/options';
import { Checkbox } from '../checkbox/Checkbox';
import { Combobox } from '../combobox/Combobox';
import { Field } from '../field/Field';
import { Heading } from '../heading/Heading';
import { HeadingSize } from '../heading/options';
import { Input } from '../input/Input';
import { Link } from '../link/Link';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Spinner } from '../spinner/Spinner';
import { Textarea } from '../textarea/Textarea';

import { Theme } from './Theme';
import type { ThemeProps } from './types';

function ThemeSwitcher() {
  const [library, setLibrary] = useState(false);

  return (
    <Theme theme={library ? libraryTheme : archiveTheme}>
      <Button onClick={() => setLibrary(!library)}>Switch theme</Button>
    </Theme>
  );
}

function ThemedControls({ theme }: Pick<ThemeProps, 'theme'>) {
  return (
    <Theme theme={theme}>
      <Heading level={1} size={HeadingSize.SMALL}>
        Small heading
      </Heading>

      <Heading size={HeadingSize.MEDIUM}>Medium heading</Heading>

      <Heading level={3} size={HeadingSize.LARGE}>
        Large heading
      </Heading>

      <Button>Primary</Button>

      <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>

      <Button variant={ButtonVariant.TERTIARY}>Tertiary</Button>

      <Button disabled>Disabled</Button>

      <Input aria-label="Website address" />

      <Field>
        <Field.Label>Invalid address</Field.Label>

        <Field.Control>
          <Input />
        </Field.Control>

        <Field.Error>Enter a valid address.</Field.Error>
      </Field>

      <Textarea aria-label="Invalid notes" aria-invalid />

      <Combobox aria-label="Invalid collection" aria-invalid>
        <Combobox.Option value="reading">Reading</Combobox.Option>

        <Combobox.Option value="research">Research</Combobox.Option>
      </Combobox>

      <Checkbox defaultChecked>Remember collection</Checkbox>

      <Checkbox aria-invalid>Accept terms</Checkbox>

      <RadioGroup label="Access" defaultValue="private">
        <RadioGroup.Item value="private">Private</RadioGroup.Item>

        <RadioGroup.Item value="public">Public</RadioGroup.Item>
      </RadioGroup>

      <Link href="#details">More information</Link>

      <Spinner />
    </Theme>
  );
}

export { ThemeSwitcher, ThemedControls };
