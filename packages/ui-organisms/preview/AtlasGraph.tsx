import { GraphExplorer } from '../src/index';

import type { GraphExplorerProps } from '../src/index';

import { adapter, messages } from './atlasDemo';

type AtlasGraphProps = Omit<GraphExplorerProps, 'adapter' | 'messages'>;

function AtlasGraph(props: AtlasGraphProps) {
  return <GraphExplorer {...props} adapter={adapter} messages={messages} />;
}

export { AtlasGraph };
