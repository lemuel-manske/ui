import type { CameraState, GraphNodeId, Point } from '../domain';
import type { GraphEasing } from '../domain';

/** Options for a single camera transition. */
interface CameraTransitionOptions {
  /** Effective duration in milliseconds. */
  durationMs?: number;

  /** Easing applied to the transition. */
  easing?: GraphEasing;
}

/** 2D camera operations injected into the controller. */
interface CameraController {
  /** Read the current camera transform. */
  getCamera(): CameraState;

  /** Translate the camera center. */
  panBy(delta: Point, options?: CameraTransitionOptions): void;

  /** Zoom around an optional stable anchor. */
  zoomTo(zoom: number, anchor?: Point, options?: CameraTransitionOptions): void;

  /** Center a node and its immediate neighborhood. */
  focusOn(
    nodeId: GraphNodeId,
    options?: { padding?: number; transition?: CameraTransitionOptions },
  ): void;

  /** Fit a set of nodes, used for recovery rather than local expansion. */
  fitNodes(nodeIds: GraphNodeId[], options?: CameraTransitionOptions): void;

  /** Stop an in-flight transition at its current interpolated state. */
  cancel(): void;
}

export type { CameraController, CameraTransitionOptions };
