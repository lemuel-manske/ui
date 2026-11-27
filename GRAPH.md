ATLAS — Spatial Graph Explorer
Status: Proposed specification
Milestone: Evolve the merged Explorer primitive into a spatial, graph-like exploration experience
Working concept: Progressive spatial disclosure

1. Product intent
   Create an interface that feels like navigating a living map of related ideas, entities, or content—not a conventional search page with a graph visualization attached.

The initial screen is deliberately quiet: a mostly empty canvas and one prominent command/search combobox. The user enters a query, selects a result, and progressively reveals a spatial structure around it. Each interaction exposes a manageable amount of context while preserving the user's sense of location and history.

The graph is the interface, not an illustration inside another interface. 2. Core design principles
Quiet entry, rich exploration
The initial viewport contains a calm, near-black canvas and one floating command input. Avoid a dashboard, permanent sidebar, static result list, explanatory cards, or decorative graph clutter.
Progressive spatial disclosure
Reveal information in stages:

1. Empty canvas and command input.
2. Search suggestions/results.
3. Focused root node.
4. Expanded local neighborhood.
5. Focused node preview.
6. Full detail or archived content.
   Do not render the entire graph immediately. A small graph must still look intentional.
   Focus and expansion are distinct

- Focus / inspect: select a node and show its concise preview.
- Expand: reveal related nodes around that node.
  Selecting a node must not automatically expand it. This distinction keeps the experience controlled and legible.
  Spatial continuity
  Existing nodes should retain their positions when the graph grows. New nodes emerge from the node that was expanded. The camera moves only when necessary; avoid disorienting global rearrangements.
  Keyboard-first, pointer-capable
  The command input and graph navigation must work without a pointer. Pointer interaction complements, rather than replaces, keyboard navigation.

3. Visual direction
   Canvas

- Near-black or very dark neutral background.
- Large open working area; no panel boundaries unless they communicate a meaningful layer.
- Subtle depth and contrast, not a high-noise neon aesthetic.
- Panning and zooming feel deliberate and controlled.
- Any grid or ambient texture remains subordinate to nodes and relationships.
  Nodes and edges
- Clear states: focused, expanded, available, and contextual.
- Edges communicate relationships without dominating the canvas.
- Restrained line weights and opacity; avoid a dense “hairball”.
- Labels remain readable at supported zoom levels.
- A focused node may open a compact adjacent preview card without obscuring nearby relationships.
  Typography
  Use editorial typography with a clear hierarchy between primary node/title, supporting metadata, relationship labels, and detail content. Avoid the generic admin-dashboard look.
  Command input
- Floating and prominent in the initial state.
- Keyboard-first, with accessible result navigation.
- Remains available after selection, but may recede visually when the graph becomes primary.
- Does not permanently consume a large part of the canvas.

4. Interaction specification
   Initial state
   Show only the empty canvas and one command/search combobox. Use a concise placeholder that communicates what can be explored. Do not add fake nodes, sample metrics, or a default dashboard unless actual onboarding content is required.
   Query and selection
1. Focus the command input.
1. Enter a query.
1. Show compact accessible suggestions/results.
1. Arrow keys move the active option.
1. Enter selects the active result.
1. Escape dismisses suggestions without unexpectedly clearing the query.
1. Pointer selection performs the same action as keyboard selection.
   Reuse the merged Explorer component for this behavior. Do not duplicate its input, result, loading, empty, keyboard, or dismissal logic.
   Root node
   After selection, place the result as the root/focal node. Keep the command input available. Show its title and essential metadata, with explicit affordances to inspect and expand. Never fabricate relationships when the data source has none.
   Expand
   When a node is expanded:

- Obtain its related items.
- Add them around the source node.
- Preserve positions of all existing nodes.
- Animate new nodes from the source node or nearby origin.
- Add edges only for actual relationships.
- Do not recursively expand descendants automatically.
  Expansion is idempotent: it must not duplicate children. If more results exist, expose an explicit “show more” or continuation action. Bound the initial neighborhood to avoid overwhelming the user.
  Inspect
  Focusing a node reveals a compact preview containing title, short description/excerpt, relevant type/category, and one action to open full detail when available. Inspection does not change graph topology. Dismissing the preview returns focus to the graph.
  Full detail
  A node may open a richer detail surface or page. Preserve a route back to the graph, including active node and neighborhood. Do not turn every node into a large floating panel.
  Recovery and navigation
  Support returning to prior focus, replacing the root query, collapsing a local expansion where meaningful, resetting to the initial state, and reopening a previously focused node without rebuilding the entire exploration flow. Define back-stack behavior explicitly.

5. Motion and camera
   Motion communicates causality and preserves orientation.

Initial timing targets to validate in a prototype:

- Local node reveal/expansion: 180–280 ms.
- Camera movement: 300–450 ms.
  New nodes emerge from the expanded node; edges appear with their nodes; existing nodes remain stable. Camera movement is short and purposeful. Avoid moving unrelated graph regions. Respect prefers-reduced-motion by removing or substantially reducing spatial transitions.

These timings are starting points, not immutable requirements. 6. Layout and graph behavior
Local stable layout
Prefer a radial or force-directed local neighborhood around the expanded node, with position stability prioritized over globally optimal packing.

The layout should:

- Place new nodes near their source.
- Avoid overlap between nodes and preview cards.
- Minimize edge crossings where practical.
- Preserve existing node positions.
- Allow panning when content exceeds the viewport.
- Avoid moving the entire graph for a local expansion.
  Semantic zoom
  Zoom changes the amount of information shown, not only the scale:
- Close: readable labels, previews, and relationship details.
- Mid: nodes and primary labels.
- Far: simplified node marks and major clusters/structure.
  Start with a small number of tested zoom levels. Do not introduce complex semantic zoom before the basic interaction works.
  Density management
  For nodes with many relationships, show a bounded initial neighborhood, indicate that more relationships exist, and offer explicit continuation/filtering. Never dump hundreds of nodes onto the canvas at once.

7. Accessibility

- All command input and graph interactions are keyboard accessible.
- Graph nodes are reachable and operable by keyboard.
- Visible focus indicators; do not rely on color alone for state.
- Announce result counts and loading/empty states where appropriate.
- Escape dismisses the current transient surface before broader clearing/reset actions.
- Ensure sufficient contrast for labels, edges, and focus indicators.
- Respect reduced-motion preferences.
- Provide an accessible non-spatial alternative, such as a related-items list. This is a functional fallback, not the primary visual experience.

8. Architecture
   Build the graph experience as a layer above Explorer. Keep these responsibilities separate:

- Graph model/state: nodes, edges, root, focused node, expanded nodes, and navigation history.
- Data adapter: search and relationship retrieval from the application/data source.
- Layout engine: computes positions for new nodes while preserving existing positions.
- Canvas renderer: nodes, edges, focus/selection, and preview surfaces.
- Camera controller: pan, zoom, and focus transitions.
- Interaction controller: focus, inspect, expand, collapse, back, and keyboard navigation.
- Detail surface: preview and full-detail transition.
  The experience must not assume a particular backend or graph database. Keep data retrieval outside the rendering layer.
  Suggested data model
- Node: stable ID, title, type, optional description/metadata.
- Edge: stable ID, source ID, target ID, relationship type/label.
- Position: x/y coordinates and whether user-pinned or layout-managed.
- ExpansionState: unexpanded, loading, expanded, or failed.
- GraphState: root ID, focused ID, selected ID, visible nodes/edges, camera state, and navigation history.
  Deduplicate nodes and edges by stable ID.
  Conceptual component boundaries
  Names are provisional:
- GraphExplorer: top-level orchestration.
- GraphCanvas: viewport, pan/zoom, rendering surface.
- GraphNode: node appearance and interaction affordances.
- GraphEdge: relationship rendering.
- NodePreview: compact inspect card.
- GraphCommand: integration with existing Explorer.
- GraphDetail: optional full detail surface.
  Do not prematurely expose every visual subpart as a public design-system component. Validate one coherent composition first; extract stable reusable APIs afterward.

9. Delivery milestones
   Milestone 1 — Interaction prototype
   Deliver:

- Empty canvas and floating Explorer input.
- Selecting a result creates a root node.
- Deterministic fixture relationships can be expanded.
- Inspect and expand are distinct.
- Basic pan/zoom or a constrained viewport sufficient to test spatial navigation.
- Clear route back to the initial state.
  Acceptance:
- Complete query → select → inspect → expand → inspect related node → return flow.
- Existing nodes do not jump when a neighborhood is revealed.
- It feels spatial, not like a search list with connecting lines.
  Milestone 2 — Stable graph layout
  Deliver local neighborhood layout, stable positions, deduplication, overlap/edge-crossing mitigation, bounded expansion, “show more”, and camera focus behavior.

Acceptance:

- Repeated expansions do not duplicate graph elements.
- Expanding one node does not arbitrarily rearrange unrelated nodes.
- Dense neighborhoods remain navigable.
  Milestone 3 — Motion and visual refinement
  Deliver node/edge reveal transitions, camera transitions, focus hierarchy, preview placement, reduced-motion behavior, and semantic zoom refinement.

Acceptance:

- Motion clarifies where information came from.
- The graph remains understandable without animation.
- The canvas is legible at supported zoom levels.
  Milestone 4 — Data integration and detail navigation
  Deliver application-facing search/relationship contracts, loading/empty/error states, full-detail navigation with graph-state restoration, and continuation for large neighborhoods.

Acceptance:

- Works with real application data.
- Missing relationships and failures are represented honestly.
- Returning from detail preserves graph context.
  Milestone 5 — Accessibility, performance, hardening
  Deliver keyboard navigation, accessible related-items alternative, screen-reader announcements, reduced-motion and contrast checks, performance tests, and regression tests.

Acceptance:

- Core flow works without a pointer.
- Graph growth does not cause unacceptable interaction latency.
- Accessibility checks cover the complete flow.

10. Validation
    Usability questions

- Is the empty state understandable without explanatory UI?
- Does the command input feel like the natural entry point?
- Can users distinguish inspect from expand?
- Is the focused node obvious?
- Do users understand where new nodes came from?
- Can users recover when the graph grows too large?
- Does returning from detail preserve orientation?
  Technical tests
- Selecting a result creates exactly one root.
- Expansion deduplicates nodes and edges.
- Existing positions remain stable.
- Focus/selection are independent from expansion.
- Loading, empty, and failure states are represented.
- Back/reset restores expected state.
- Keyboard navigation and Escape are deterministic.
- Reduced-motion mode is respected.

11. External design references
    These are references for particular interaction and layout qualities, not templates to copy wholesale.
    Reference What to study Website
    TheBrain Connected “thoughts”; local-neighborhood exploration around a focused concept https://www.thebrain.com/
    Kumu Progressive disclosure and navigation of relationship networks https://kumu.io/
    Kinopio Spatial cards, flexible canvases, human-scale connected information https://kinopio.com/
    Knogra Focused graph scenes and spatial presentation of connected content https://knogra.com/
    Chris Simari Spatial zoom and navigation in information-rich visual spaces https://chrissimari.com/
    Neural Map Interactive clusters and graph-like exploration https://neuralmap.org/
    yFiles — Deep Zoom Semantic zoom and navigation patterns for large graph visualizations https://www.yworks.com/

Reference priorities
Study TheBrain and Chris Simari first:

- TheBrain is the closest precedent for revealing a local neighborhood around a selected concept.
- Chris Simari is useful for spatial zoom and changing levels of detail.
  Then examine Kumu for progressive disclosure, Kinopio for spatial composition/card interaction, and yFiles Deep Zoom for semantic-zoom implications.

The target aesthetic remains quieter, more editorial, and more intentionally staged than a dense graph-analysis tool. 12. Non-goals
Do not:

- Build a generic dashboard.
- Display the entire graph immediately.
- Make the graph decorative background for a conventional search-results page.
- Automatically expand every selected node.
- Rearrange all nodes on every interaction.
- Add arbitrary graph data merely to populate the canvas.
- Introduce graph analytics, clustering algorithms, or graph-database requirements before validating the core experience.
- Over-generalize the renderer into a public component framework before the prototype proves the abstractions.

13. Immediate next steps
1. Re-read the merged Explorer API and identify integration points; do not change Explorer's responsibilities.
1. Build a Graph Explorer prototype with deterministic fixture data.
1. Implement state for root, focus, inspect, and expansion.
1. Render a stable local neighborhood and validate the complete interaction flow.
1. Review the prototype against TheBrain, Chris Simari, Kumu, and Kinopio.
1. Only then choose the graph rendering/layout technology and public component API.
   Definition of success: the user enters through one command surface, discovers a concept, and unfolds its relationships spatially in a coherent, navigable, calm way.
