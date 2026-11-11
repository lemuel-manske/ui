import { Variant } from '@lemuel-manske/design-tokens';

import { Icon } from '../icon/Icon';
import { CheckIcon, InfoIcon } from '../icon/ExampleIcons.test-fixture';
import { Input } from '../input/Input';
import { Label } from '../label/Label';
import { Theme } from '../theme/Theme';

import type { ThemeProps } from '../theme/types';
import type { ButtonProps } from './types';

import { Button } from './Button';

import type { PropsWithChildren } from 'react';

type FormExampleProps = PropsWithChildren<{ onSubmit: () => void }>;

function FormExample({ children, onSubmit }: FormExampleProps) {
  return (
    <form
      aria-label="Example form"
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit();
      }}
    >
      {children}
    </form>
  );
}

export { FormExample };

interface StatusButtonsProps {
  theme: ThemeProps['theme'];

  tone: ButtonProps['tone'];
}

function StatusButtons({ theme, tone }: StatusButtonsProps) {
  return (
    <Theme theme={theme}>
      <Label htmlFor="collection" tone={tone}>
        <Icon>
          <InfoIcon />
        </Icon>
        Collection name
      </Label>

      <Input id="collection" />

      <Button tone={tone} variant={Variant.PRIMARY}>
        <Icon>
          <CheckIcon />
        </Icon>

        <Button.Label>Save changes</Button.Label>
      </Button>

      <Button tone={tone} variant={Variant.SECONDARY}>
        <Icon>
          <CheckIcon />
        </Icon>

        <Button.Label>Save changes</Button.Label>
      </Button>

      <Button tone={tone} variant={Variant.TERTIARY}>
        <Icon>
          <CheckIcon />
        </Icon>

        <Button.Label>Save changes</Button.Label>
      </Button>
    </Theme>
  );
}

export { StatusButtons };
