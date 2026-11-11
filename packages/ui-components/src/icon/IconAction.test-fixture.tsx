import { useState } from 'react';

import { Icon } from './Icon';
import { GlobeIcon } from './ExampleIcons.test-fixture';

import type { IconActionProps } from './types';

function IconActionExample({ disabled }: Pick<IconActionProps, 'disabled'>) {
  const [activated, setActivated] = useState(false);

  return (
    <div>
      <Icon label="Change language" disabled={disabled} onClick={() => setActivated(true)}>
        <GlobeIcon />
      </Icon>

      <output aria-label="Activated">{String(activated)}</output>
    </div>
  );
}

export { IconActionExample };
