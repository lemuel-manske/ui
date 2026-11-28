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

function horizontalLayout(input: LayoutInput): GraphLayoutResult {
  const revealOrigin = input.existingPositions[input.sourceId] ?? { x: 0, y: 0, pinning: 'layout' };
  const positions: GraphLayoutResult['positions'] = {};
  const count = input.newNodes.length;

  input.newNodes.forEach((node, index) => {
    if (input.existingPositions[node.id] != null) {
      return;
    }

    const centerIndex = (count - 1) / 2;
    const verticalOffset = (index - centerIndex) * 156;
    const horizontalOffset = 220 + (index % 2) * 18;
    let point = {
      x: revealOrigin.x + horizontalOffset,
      y: revealOrigin.y + verticalOffset + (((input.seed + index) % 3) - 1) * 12,
    };
    let attempts = 0;

    while (isReserved(point, input) && attempts < 4) {
      point = {
        x: point.x + 48,
        y: point.y,
      };
      attempts += 1;
    }

    positions[node.id] = point;
  });

  return { positions, revealOrigin: { x: revealOrigin.x, y: revealOrigin.y } };
}

export { horizontalLayout };
