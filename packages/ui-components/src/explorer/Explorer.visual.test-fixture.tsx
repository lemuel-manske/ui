import { useState } from 'react';

import { ControlledExplorer } from './ControlledExplorer';

import type { ExplorerItem } from './types';
import type { ReactElement } from 'react';

import styles from './Explorer.visual.test-fixture.module.css';

function ExplorerSurface({ children }: { children: ReactElement }) {
  return <div className={styles.surface}>{children}</div>;
}

function CompletionExplorer() {
  const [selectedItem, setSelectedItem] = useState<ExplorerItem | null>(null);

  const completion = selectedItem == null ? 'No result selected' : `Selected ${selectedItem.label}`;

  return (
    <ExplorerSurface>
      <>
        <ControlledExplorer onSelect={setSelectedItem} />

        <output aria-label="Selected result" className={styles.completion}>
          {completion}
        </output>
      </>
    </ExplorerSurface>
  );
}

export { CompletionExplorer, ExplorerSurface };
