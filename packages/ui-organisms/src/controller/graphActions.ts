import type {
  CameraState,
  GraphCameraReason,
  GraphDetailTrigger,
  GraphNodeId,
  GraphSessionSnapshot,
  GraphView,
  Point,
} from '../domain';
import type { GraphResultItem } from '../ports';

/** Bound commands emitted by the view and the imperative handle. */
interface GraphActions {
  /** Update the command query and start a bounded search. */
  setQuery(query: string): void;

  /** Replace the current session with one rooted at the selected result. */
  selectResult(item: GraphResultItem): void;

  /** Move keyboard focus to a visible node. */
  focusNode(nodeId: GraphNodeId): void;

  /** Inspect a node without changing topology. */
  inspectNode(nodeId: GraphNodeId): void;

  /** Close the preview while keeping selection and focus. */
  dismissPreview(): void;

  /** Load the first relationship page for a node. */
  expandNode(nodeId: GraphNodeId): void;

  /** Load the next relationship page for a node. */
  showMore(nodeId: GraphNodeId): void;

  /** Remove nodes introduced exclusively by one expansion. */
  collapseNode(nodeId: GraphNodeId): void;

  /** Commit a camera transform. */
  setCamera(camera: CameraState, reason: GraphCameraReason): void;

  /** Translate the camera center. */
  panBy(delta: Point): void;

  /** Zoom around an optional stable anchor. */
  zoomTo(zoom: number, anchor?: Point): void;

  /** Center a node and its immediate neighborhood. */
  focusOn(nodeId: GraphNodeId): void;

  /** Fit a set of nodes for recovery. */
  fitNodes(nodeIds: GraphNodeId[]): void;

  /** Switch between canvas and list presentations. */
  setView(view: GraphView): void;

  /** Request the richer detail surface. */
  openDetail(nodeId: GraphNodeId, trigger?: GraphDetailTrigger): void;

  /** Close the inline detail surface. */
  closeDetail(): void;

  /** Restore the previous history frame, or reset when history is empty. */
  back(): void;

  /** Return to the empty session. */
  reset(): void;

  /** Restore a validated serialized session. */
  restore(snapshot: GraphSessionSnapshot): void;

  /** Move focus to the command input. */
  focusCommand(): void;
}

export type { GraphActions };
