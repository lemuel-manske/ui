import { GraphExplorer } from '../src/index';

import { adapter, initialState, messages } from './castellaniDemo';
import { CastellaniArt } from './CastellaniArt';

function CastellaniPreview() {
  return (
    <section className="castellani">
      <CastellaniArt />

      <header className="castellani__header">
        <nav className="castellani__nav" aria-label="Primary navigation">
          <span className="castellani__brand">Castellani</span>
          <span className="castellani__active">Archive</span>
          <span>Replay</span>
          <span className="castellani__divider" aria-hidden="true" />
          <span className="castellani__protocol">2D / temporal</span>
        </nav>
      </header>

      <GraphExplorer adapter={adapter} initialState={initialState} messages={messages} />
    </section>
  );
}

export { CastellaniPreview };
