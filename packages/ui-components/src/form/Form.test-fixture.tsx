import { Button } from '../button/Button';

import { Label } from '../label/Label';

import { Input } from '../input/Input';

import { useState } from 'react';

import { Form } from './Form';

function FormExample() {
  const [result, setResult] = useState('');

  return (
    <Form
      aria-label="Capture"
      onSubmit={(event) => {
        event.preventDefault();

        setResult(String(new FormData(event.currentTarget).get('url')));
      }}
    >
      <Label htmlFor="url">Website URL</Label>

      <Input id="url" name="url" type="url" required />

      <Button type="submit">
        <Button.Label>Save</Button.Label>
      </Button>

      <output aria-label="Submitted URL">{result}</output>
    </Form>
  );
}

function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <Input
      aria-label="Title"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}

export { FormExample, ControlledInput };
