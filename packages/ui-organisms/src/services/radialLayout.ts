import type { GraphLayoutResult, Point } from '../domain';
import type { LayoutInput } from '../ports';

function isReserved(point: Point, input: LayoutInput) {
  return input.reservedRects.some((rect) => {
    const isWithinRect =
      point.x >= rect.x - 24 &&
      point.x <= rect.x + rect.width + 24 &&
      point.y >= rect.y - 24 &&
      point.y <= rect.y + rect.height + 24;

    return isWithinRect;
  });
}

function radialLayout(input: LayoutInput): GraphLayoutResult {
  const revealOrigin = input.existingPositions[input.sourceId] ?? { x: 0, y: 0, pinning: 'layout' };
  const positions: GraphLayoutResult['positions'] = {};
  const count = input.newNodes.length;

  input.newNodes.forEach((node, index) => {
    if (input.existingPositions[node.id] != null) {
      return;
    }

    const angle = (Math.PI * 2 * index) / Math.max(count, 1) + input.seed * 0.18;
    let radius = 132 + Math.min(count, input.config.maxExpandedNeighbors) * 8;
    let point = {
      x: revealOrigin.x + Math.cos(angle) * radius,
      y: revealOrigin.y + Math.sin(angle) * radius,
    };
    let attempts = 0;

    while (isReserved(point, input) && attempts < 4) {
      radius += 48;
      point = {
        x: revealOrigin.x + Math.cos(angle) * radius,
        y: revealOrigin.y + Math.sin(angle) * radius,
      };
      attempts += 1;
    }

    positions[node.id] = point;
  });

  return { positions, revealOrigin: { x: revealOrigin.x, y: revealOrigin.y } };
}

export { radialLayout };
