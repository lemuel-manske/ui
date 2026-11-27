# Graph Explorer: spatial navigation component proposal

## Summary

Introduce a composable `Graph` component and a companion `Explorer` component for building spatial, progressively disclosed interfaces.

The intended experience starts from a sparse entry point. Users search for or focus an item, reveal its relationships, and navigate through the resulting spatial graph. The graph should feel like an interactive surface, not a conventional chart or dashboard.

This is a design proposal. It does not implement the components or commit to a final API.

## Goals

- Provide a reusable graph visualization and interaction primitive.
- Support progressive expansion of graph neighborhoods.
- Preserve spatial context when nodes are revealed or focused.
- Provide a command/search interface that can navigate the graph.
- Keep graph rendering, navigation UI, and application data responsibilities separate.
- Work with static in-memory data without requiring a server or data-source abstraction.
- Allow applications to compose their own details and surrounding interface.

## Non-goals

The component library should not:

- Make HTTP requests or know about REST, GraphQL, databases, authentication, or caching.
- Own domain data or decide how an application retrieves relationships.
- Define a backend pagination or lazy-loading protocol.
- Become a general-purpose data visualization framework in the first iteration.
- Require a continuously running force simulation.

## Component model

The proposal has three responsibilities:

1. **Graph** renders nodes and edges, manages the spatial viewport, and exposes graph interactions.
2. **Explorer** provides search, result selection, and command-oriented navigation.
3. **Application** owns graph data, search implementation, persistence, and domain-specific behavior.

A small controller coordinates interaction state between Explorer and Graph. It must not own the graph's domain data.

Conceptually:

```text
Application
  ├── graph data (nodes, edges)
  ├── search implementation
  ├── relationship lookup / loading
  └── application-specific details
          │
          ▼
Graph controller (interaction state only)
  ├── focused node
  ├── expanded / visible nodes
  └── navigation actions
       ▲             ▲
       │             │
   Explorer        Graph
   search and      layout, viewport,
   commands        nodes, edges, motion
```

Explorer and Graph should be siblings that share a controller, rather than one being structurally nested inside the other.

## Proposed composition

The following is illustrative API pseudocode, not an implementation contract:

```tsx
const controller = useGraphController();

return (
  <Graph.Provider controller={controller}>
    <Explorer
      onSearch={search}
      onSelect={(item) => controller.reveal(item.id)}
    />

    <Graph
      nodes={nodes}
      edges={edges}
      visibleNodeIds={visibleNodeIds}
      expandedNodeIds={expandedNodeIds}
      focusedNodeId={focusedNodeId}
      onFocus={controller.focus}
      onExpand={handleExpand}
      onCollapse={handleCollapse}
    />

    <NodeDetails node={focusedNode} />
  </Graph.Provider>
);
```

The application remains free to arrange Explorer, Graph, and its own details UI in any layout. The shared provider is a coordination mechanism, not a required visual layout.

## Graph data

The graph should use a flat node/edge model. It must not assume a tree: nodes can have multiple incoming edges, cycles can exist, and multiple paths can lead to the same node.

A starting data shape:

```ts
interface GraphNode {
  id: string;
  label: string;
  description?: string;
  type?: string;
  metadata?: Record<string, unknown>;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  directed?: boolean;
}
```

Position may be supplied by an application when needed, but automatic layout should be the normal path.

## Expansion behavior

Expansion is an interaction request, not a data-fetching operation.

- Focusing a node selects it. It does not implicitly expand it.
- Expanding a node requests that its neighborhood be revealed.
- Collapsing a node hides the neighborhood disclosed through that expansion.
- The application decides what data is available and how to obtain more.
- The graph renders the updated data and animates the spatial change.

The public callback should remain small:

```ts
onExpand?: (nodeId: string) => void;
onCollapse?: (nodeId: string) => void;
```

There is no need to expose an expansion reason or backend-oriented request object.

For a static graph, the application can reveal already-provided neighbors. For a lazy graph, the same callback can trigger application-owned loading. In both cases, the component library only receives updated nodes, edges, and visibility/expansion state.

An edge existing in the supplied data does not necessarily mean its target must be visible. Data availability and visual disclosure are separate concerns.

## Explorer

Explorer is a separate, composable component. It should not implement its own graph navigation or data access.

Its responsibilities are:

- Accept a query.
- Display results supplied by the application.
- Let the user select a result or invoke a command.
- Forward the selected destination to the shared navigation controller through application composition.

A minimal starting contract:

```ts
interface ExplorerProps {
  onSearch: (query: string) =>
    ExplorerItem[] | Promise<ExplorerItem[]>;

  onSelect: (item: ExplorerItem) => void;
}
```

Search results should not be restricted to graph nodes; an explorer may eventually expose commands as well as destinations. The exact result model can be finalized during implementation.

The visual direction is a compact, persistent command input that can open into search results and commands (for example, with a keyboard shortcut). It should remain useful with pointer and keyboard interaction.

## Controller responsibilities

The controller coordinates transient interaction state only. It should not store or fetch nodes and edges.

Potential operations:

```ts
interface GraphController {
  focus(nodeId: string): void;
  reveal(nodeId: string): void;
  expand(nodeId: string): void;
  collapse(nodeId: string): void;
  fit(): void;
  reset(): void;
}
```

The exact public surface should be kept small. Controlled props and callbacks should remain available so applications can synchronize interaction state with their own routing or state management.

## Layout and motion

The first layout should be deterministic radial/incremental positioning:

- Reveal new neighbors around the expanded node.
- Preserve existing node positions where possible.
- Avoid moving unrelated parts of the graph.
- Prevent node overlap.
- Keep the focused node visually prominent.
- Allow the viewport to pan and zoom.

A force-directed layout can be considered later, but should not be the default because continuous movement undermines spatial memory.

Motion should communicate where new content came from. New nodes and edges can emerge from the expanded node and settle into stable positions. Focus transitions should be reversible and respect reduced-motion preferences.

## Rendering direction

A practical initial implementation is SVG for edges and HTML elements for nodes:

- SVG provides control over edge geometry and transitions.
- HTML supports rich node content, normal interaction, and accessibility.
- Both layers can share a viewport transform.

The implementation should keep layout calculation independent from rendering so the layout strategy can evolve without changing the component API.

## Suggested first iteration

1. Define the public TypeScript contracts and component composition.
2. Render a static graph with supplied nodes and edges.
3. Add focus, visibility, expansion, and collapse interactions.
4. Add deterministic radial positioning and stable incremental expansion.
5. Add pan, zoom, and basic transitions.
6. Add Explorer search/result composition.
7. Add Storybook examples and behavioral/accessibility tests.

## Acceptance criteria

- A static in-memory graph works without any backend integration.
- Graph data uses nodes and edges and supports cycles and multiple relationships.
- Focus and expansion are distinct operations.
- Expansion can reveal locally available neighbors.
- Applications can handle expansion themselves and supply updated graph data.
- Existing node positions remain stable when a neighborhood is expanded.
- Explorer can search through an application-provided callback.
- Explorer and Graph can be composed independently while sharing navigation state.
- The component supports keyboard interaction and reduced-motion preferences.
- Applications can render their own contextual details outside the graph.

## Open questions

- Should the first public API expose controlled state only, or also provide convenient uncontrolled behavior?
- What is the minimum node customization contract: a render callback, compound node component, or both?
- Should the first release include only radial layout, or also a basic hierarchical option?
- Which parts of the controller should be public versus internal?

The first implementation should answer these questions through a small Storybook prototype before expanding the API.
