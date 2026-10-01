# Design: evidence and progressive enhancement iteration

## Decisions

Actual HTML documents avoid SPA fallback/routing configuration and work without client JavaScript. A single build-time layout avoids duplicated navigation. Content and presentation are separate. Use Node's built-in filesystem utilities; no framework dependencies. Trade-off: editing content requires rebuilding/deploying; no CMS. Messaging depends on Tawk.to rather than a custom backend.

Tokens: paper `#ffffff`, background `#f3f6fa`, ink `#192b40`, blue `#174a79`, muted `#506278`, divider `#d7e0ea`. Georgia headings; system sans-serif text. Desktop navigation rail becomes a wrapping top navigation on narrow screens. Focus is visible; no animations or remote fonts.

## Sitemap

Home → About · Education · Professional knowledge · Pictures · Video · Blog · Contact.
Blog → two complete republished articles (“How we solved logging at Appwrite” and “How I built the Appwrite MCP server”), each linking to its original. Professional knowledge → filter by skill → linked project evidence. Contact offers email and hosted Tawk.to chat. A shared footer button loads the provider after an explicit visitor click and privacy notice. The choice is remembered for the tab; later active pages warm the widget in the background. Video is a clearly marked unfinished page until a real video is selected.

## Block diagram

```mermaid
flowchart TB
  Source[Pages: pages/*.mjs and layout.mjs] --> Build[Node build]
  Data[Evidence data: projects.mjs] --> Source
  Data --> Filter[Optional browser filter: filter.mjs]
  Filter --> Browser
  CSS[Shared CSS and local assets] --> Build
  Build --> HTML[Static HTML and assets: dist]
  HTML --> Host[Appwrite Sites: SGP]
  Host --> Browser[Visitor browser]
  Browser -->|Visitor opens chat| Tawk[Tawk.to hosted messaging]
  Tawk <--> Owner[Owner dashboard or mobile app]
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
  Main --> Blog[Blog index and two republished articles]
  Main --> Contact[Contact: email and chat guidance]
  Footer --> Loader[chat.mjs: click-to-load state machine]
  Loader --> Provider[Tawk.to widget and owner inbox]
  Styles[Shared stylesheet] -.-> Layout
```

## Control-flow diagram

```mermaid
flowchart TD
  Start[Visitor opens URL] --> Exists{Static document exists?}
  Exists -->|Yes| Render[Browser renders HTML and CSS]
  Exists -->|No| Missing[Host serves 404 page; links resolve from site root]
  Missing --> Action
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
  Render --> Remembered{Chat previously enabled in this tab?}
  Remembered -->|Yes and page active| Load
  Remembered -->|No| Open[Visitor chooses Chat with me after privacy notice]
  Open --> Load[Load hosted widget]
  Load --> Ready{Provider ready?}
  Ready -->|Yes| Chat[Open conversation]
  Ready -->|Error or 20-second timeout| Fallback[Show email fallback and reload advice]
  Chat <--> Inbox[Owner inbox: availability determines replies]
```

The widget has been integrated and visitor-side loading/message entry tested. Owner inbox receipt is confirmed, and a labelled reply was sent from the dashboard. On 1 October a dashboard reply appeared in the live visitor widget, so messaging is verified in both directions. Public widget identifiers are not credentials. The provider does not load before the first opt-in or while a document is prerendered. After opt-in, sessionStorage allows background loading on subsequent active pages. The application does not request that background readiness open the conversation. Provider outages can still delay or prevent readiness. Innovation implemented: skills-to-project evidence filtering, with keyboard-operable buttons and an all-content fallback when JavaScript is unavailable. This is an application-specific enhancement, not a novel filtering algorithm.
