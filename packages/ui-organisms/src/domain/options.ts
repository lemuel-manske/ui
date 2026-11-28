type GraphPhase = 'empty' | 'searching' | 'root' | 'exploring';

type GraphSearchStatus = 'idle' | 'loading' | 'ready' | 'error';

type GraphExpansionStatus = 'unexpanded' | 'loading' | 'expanded' | 'failed';

type GraphView = 'canvas' | 'list';

type GraphZoomBand = 'far' | 'mid' | 'close';

type GraphNodeAppearance = 'focused' | 'selected' | 'expanded' | 'available' | 'contextual';

type GraphPinning = 'user' | 'layout';

type GraphRelatedEndpoint = 'source' | 'target';

type GraphErrorCode =
  | 'SEARCH_FAILED'
  | 'RELATIONSHIPS_FAILED'
  | 'DETAIL_FAILED'
  | 'LIMIT_REACHED'
  | 'NODE_NOT_FOUND'
  | 'ABORTED';

type GraphDetailTrigger = 'preview-action' | 'keyboard' | 'list-view' | 'programmatic';

type GraphCameraReason = 'focus' | 'pan' | 'zoom' | 'restore';

type GraphCameraSetReason = 'pan' | 'zoom' | 'focus';

type GraphEasing = 'standard' | 'emphasized';

export type {
  GraphCameraReason,
  GraphCameraSetReason,
  GraphDetailTrigger,
  GraphEasing,
  GraphErrorCode,
  GraphExpansionStatus,
  GraphNodeAppearance,
  GraphPhase,
  GraphPinning,
  GraphRelatedEndpoint,
  GraphSearchStatus,
  GraphView,
  GraphZoomBand,
};
