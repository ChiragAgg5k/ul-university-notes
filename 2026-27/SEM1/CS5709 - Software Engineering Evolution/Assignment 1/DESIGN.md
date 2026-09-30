# Design — initial implementation

## Decisions

Actual HTML documents avoid SPA fallback/routing configuration and work without client JavaScript. A single build-time layout avoids duplicated navigation. Content and presentation are separate. Use Node's built-in filesystem utilities; no framework dependencies. Trade-off: editing content requires rebuilding/deploying; no CMS or private messaging yet.

Tokens: paper `#ffffff`, background `#f3f6fa`, ink `#192b40`, blue `#174a79`, muted `#506278`, divider `#d7e0ea`. Georgia headings; system sans-serif text. Desktop navigation rail becomes a wrapping top navigation on narrow screens. Focus is visible; no animations or remote fonts.

## Sitemap

Home → About · Education · Professional knowledge · Pictures · Video · Blog · Contact.
Blog → local article excerpt → original full article. Contact is currently email only and **does not satisfy instant messaging**. Video is a clearly marked unfinished page until a real video is selected.

## Block diagram

```mermaid
flowchart LR
  Source[Content and layout: build.mjs] --> Build[Node build]
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
  Main --> Profile[Home / About / Education / Knowledge]
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
  Action -->|Internal navigation| Start
  Action -->|Original article / GitHub| External[Open external resource]
  Action -->|Email| Mail[Open mail client: not instant messaging]
```

These diagrams document the current foundation, not unimplemented messaging. Update them after integration. Innovation proposal: skills-to-project evidence filtering; not yet implemented or claimed.
