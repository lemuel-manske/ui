import { AtlasGraph } from './AtlasGraph';

function App() {
  return (
    <main className="preview">
      <header className="preview__chrome">
        <h1 className="preview__brand">atlas</h1>

        <p className="preview__hint">Search, select, expand.</p>
      </header>

      <AtlasGraph />
    </main>
  );
}

export { App };
