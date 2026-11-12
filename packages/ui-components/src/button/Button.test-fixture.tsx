import { useState } from 'react';

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

      <Button tone={tone} variant="primary">
        <Icon>
          <CheckIcon />
        </Icon>

        <Button.Label>Save changes</Button.Label>
      </Button>

      <Button tone={tone} variant="secondary">
        <Icon>
          <CheckIcon />
        </Icon>

        <Button.Label>Save changes</Button.Label>
      </Button>

      <Button tone={tone} variant="tertiary">
        <Icon>
          <CheckIcon />
        </Icon>

        <Button.Label>Save changes</Button.Label>
      </Button>
    </Theme>
  );
}

export { StatusButtons };

function DisclosureButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button
        aria-expanded={expanded}
        aria-controls="authentication"
        onClick={() => setExpanded(!expanded)}
      >
        Connect
      </Button>
      <section id="authentication" aria-label="Authentication" hidden={!expanded}>
        Account details
      </section>
    </>
  );
}

export { DisclosureButton };
