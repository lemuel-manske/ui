import type { GraphSessionSnapshot } from '../domain';

/** Optional route serialization supplied by the host application. */
interface GraphRouteAdapter {
  /** Serialize a session snapshot into a route value. */
  serialize(snapshot: GraphSessionSnapshot): string;

  /** Parse a route value back into a session snapshot. */
  deserialize(value: string): GraphSessionSnapshot | null;
}

export type { GraphRouteAdapter };
