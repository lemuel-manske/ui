import type { CameraState, GraphCameraReason, GraphNodeId, NodePosition, Point } from '../domain';
import type { CameraController } from '../ports';

interface CameraControllerOptions {
  /** Read the latest committed camera. */
  getCamera(): CameraState;

  /** Commit a camera transform with its interaction reason. */
  setCamera(camera: CameraState, reason: GraphCameraReason): void;

  /** Read a stored node position. */
  getPosition(nodeId: GraphNodeId): NodePosition | undefined;
}

function clampZoom(zoom: number) {
  return Math.min(2, Math.max(0.25, zoom));
}

function translateToContain(camera: CameraState, points: Point[], padding: number) {
  if (points.length === 0) {
    return camera;
  }

  const minX = Math.min(...points.map((point) => point.x)) - padding;
  const maxX = Math.max(...points.map((point) => point.x)) + padding;
  const minY = Math.min(...points.map((point) => point.y)) - padding;
  const maxY = Math.max(...points.map((point) => point.y)) + padding;

  return {
    center: { x: (minX + maxX) / 2, y: (minY + maxY) / 2 },
    zoom: camera.zoom,
  };
}

function createCameraController(options: CameraControllerOptions): CameraController {
  function commit(camera: CameraState, reason: GraphCameraReason) {
    options.setCamera(camera, reason);
  }

  return {
    getCamera: () => options.getCamera(),

    panBy: (delta) => {
      const camera = options.getCamera();

      commit(
        {
          center: { x: camera.center.x + delta.x, y: camera.center.y + delta.y },
          zoom: camera.zoom,
        },
        'pan',
      );
    },

    zoomTo: (zoom, anchor) => {
      const camera = options.getCamera();
      const nextZoom = clampZoom(zoom);
      const focus = anchor ?? camera.center;

      commit(
        {
          center: {
            x: focus.x - ((focus.x - camera.center.x) * nextZoom) / camera.zoom,
            y: focus.y - ((focus.y - camera.center.y) * nextZoom) / camera.zoom,
          },
          zoom: nextZoom,
        },
        'zoom',
      );
    },

    focusOn: (nodeId, config) => {
      const position = options.getPosition(nodeId);

      if (position == null) {
        return;
      }

      const camera = options.getCamera();
      const points = [position];
      const framed = translateToContain(camera, points, config?.padding ?? 160);
      const nextZoom = camera.zoom < 0.45 ? Math.max(camera.zoom, 1.2) : camera.zoom;

      commit({ ...framed, zoom: nextZoom }, 'focus');
    },

    fitNodes: (nodeIds) => {
      const points = nodeIds.flatMap((nodeId) => {
        const position = options.getPosition(nodeId);

        return position == null ? [] : [position];
      });

      commit(translateToContain(options.getCamera(), points, 160), 'restore');
    },

    cancel: () => undefined,
  };
}

export { clampZoom, createCameraController };
