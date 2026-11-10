import { useState } from 'react';

import { archiveTheme, libraryTheme } from '@lkmliz/design-tokens';

import { Button } from '../button/Button';

import { Theme } from './Theme';

function ThemeSwitcher() {
  const [library, setLibrary] = useState(false);

  return (
    <Theme theme={library ? libraryTheme : archiveTheme}>
      <Button onClick={() => setLibrary(!library)}>Switch theme</Button>
    </Theme>
  );
}

export { ThemeSwitcher };
