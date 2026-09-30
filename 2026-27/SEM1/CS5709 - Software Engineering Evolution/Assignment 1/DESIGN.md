# Design: evidence and progressive enhancement iteration

## Decisions

Actual HTML documents avoid SPA fallback/routing configuration and work without client JavaScript. A single build-time layout avoids duplicated navigation. Content and presentation are separate. Use Node's built-in filesystem utilities; no framework dependencies. Trade-off: editing content requires rebuilding/deploying; no CMS or private messaging yet.

Tokens: paper `#ffffff`, background `#f3f6fa`, ink `#192b40`, blue `#174a79`, muted `#506278`, divider `#d7e0ea`. Georgia headings; system sans-serif text. Desktop navigation rail becomes a wrapping top navigation on narrow screens. Focus is visible; no animations or remote fonts.

## Sitemap

Home → About · Education · Professional knowledge · Pictures · Video · Blog · Contact.
Blog → local article excerpt → original full article; Blog → complete technical development note. Professional knowledge → filter by skill → linked project evidence. Contact is currently email only and **does not satisfy instant messaging**. Video is a clearly marked unfinished page until a real video is selected.

## Block diagram

```mermaid
flowchart LR
  Source[Layout: build.mjs and content.mjs] --> Build[Node build]
  Data[Evidence data: projects.mjs] --> Source
  Data --> Filter[Optional browser filter: filter.mjs]
  Filter --> Browser
  CSS[Shared CSS and local assets] --> Build
  Build --> HTML[Static HTML and assets: dist]
  HTML --> Host[Appwrite Sites: SGP]
  Host --> Browser[Visitor browser]
```

## Component diagram

```mermaid
flowchart TD
  Layout[Shared document layout] --> Nav[Navigation with active-page state]
  Layout --> Main[Page content]
  Layout --> Footer[Footer and provenance link]
  Main --> Profile[Home / About / Education]
  Main --> Knowledge[Professional knowledge: evidence cards]
  Knowledge --> Controls[Skill buttons: aria-pressed]
  Controls --> Matching[Pure skill matching function]
  Matching --> Status[Visible cards and live result count]
  Main --> Media[Pictures / Video]
  Main --> Blog[Blog index and article]
  Main --> Contact[Contact: messaging integration pending]
  Styles[Shared stylesheet] -.-> Layout
```

## Control-flow diagram

```mermaid
flowchart TD
  Start[Visitor opens URL] --> Exists{Static document exists?}
  Exists -->|Yes| Render[Browser renders HTML and CSS]
  Exists -->|No| Missing[404 response]
  Render --> Action{Visitor chooses link}
  Render --> JS{Filter script available?}
  JS -->|No| All[All project evidence stays visible]
  JS -->|Yes| Controls[Reveal skill filter buttons]
  Controls --> Select[Visitor selects a skill]
  Select --> Match[Match exact skill or All]
  Match --> Update[Update hidden cards, pressed state and count]
  Update --> Select
  Action -->|Internal navigation| Start
  Action -->|Original article / GitHub| External[Open external resource]
  Action -->|Email| Mail[Open mail client: not instant messaging]
```

These diagrams document the current foundation, not unimplemented messaging. Update them after integration. Innovation implemented: skills-to-project evidence filtering, with keyboard-operable buttons and an all-content fallback when JavaScript is unavailable. This is an application-specific enhancement, not a novel filtering algorithm.
