import { code } from '../html.mjs';
import { original } from '../profile.mjs';

const tools = [
  ['GitHub', '90', 'same'],
  ['Supabase', '29', 'same'],
  ['Convex', '12', 'same'],
  ['Stripe', '12', 'whole API behind search'],
  ['Sentry', '9', '46 in catalog'],
  ['Appwrite', '4', '981 in catalog'],
];

// Republished in full from the original portfolio. The two diagrams were
// rendered from the original article's Mermaid source; the bar chart is
// replaced by its data table.
export default {
  file: 'blog-mcp.html',
  title: 'How I built the Appwrite MCP server (and decided to hide most of its capabilities)',
  body: `
<p class="eyebrow">By Chirag Aggarwal · August 4, 2026 · <a href="${original}/blog/how-i-built-the-appwrite-mcp-server">originally published on my portfolio</a></p>
<p>When Anthropic introduced the Model Context Protocol on November 25, 2024, it got everyone's eyes on it, including Christy, who was Appwrite's Engineering Lead back then. I had just started my role as an "Engineering Intern" and had no idea what a whole new protocol meant, or why it was such a big deal.</p>
<p>Looking at the surface, I wasn't entirely wrong. MCP is JSON-RPC with a schema and a handshake stapled on. What took us sixteen months was everything stapled around it.</p>
<figure class="diagram">
  <img src="assets/mcp-diagram-1.png" alt="Timeline: November 2024, MCP launches; February 2025, stdio ships; March 2025, Streamable HTTP; April 2026, 981 tools reduced to 4; June 2026, hosted version merges; July 2026, shipped." width="834" height="104">
  <figcaption>Streamable HTTP did not exist when MCP launched. It replaced HTTP+SSE in the 2025-03-26 revision.</figcaption>
</figure>

<h2>The stdio years</h2>
<p>Christy had a working stdio server in the repo by February 26, 2025. We already had API keys, so the wiring was simple:</p>
${code(String.raw`
claude mcp add appwrite \
  --env APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID> \
  --env APPWRITE_API_KEY=<YOUR_API_KEY> \
  --env APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1 \
  -- uvx mcp-server-appwrite
`)}
<p>An API key is scoped to exactly one project by design, so the ceiling was baked into the credential. Switching projects meant editing your editor config. Creating a project was impossible. So was anything at the organization level.</p>
<p>The credential is the whole difference between the two transports, and everything hard about the hosted version follows from swapping it for a token that belongs to the user instead of the project.</p>

<h2>Authorization ate the schedule</h2>
<p>By the spec, authorization is genuinely optional:</p>
<blockquote><p>Authorization is OPTIONAL for MCP implementations. [...] Implementations using an HTTP-based transport SHOULD conform to this specification.</p></blockquote>
<p>For a service where one tool call can drop a database, we weren't comfortable treating it as optional. If you use Auth0 or WorkOS, this is a config screen. Appwrite keeps everything in-house, so Matej built the authorization server itself, and I built the resource server plus whatever Cloud was still missing before real clients would work.</p>
<figure class="diagram diagram-tall">
  <img src="assets/mcp-diagram-2.png" alt="Sequence diagram between MCP client, mcp.appwrite.io and Appwrite Cloud. 1: client posts without a token. 2: server replies 401 with WWW-Authenticate. 3: client gets protected-resource metadata. 4: server returns authorization_servers (RFC 9728). 5: client posts to /register on Appwrite Cloud (RFC 7591). 6: Cloud returns a client_id. 7: client calls /authorize with PKCE and resource (RFC 8707). 8: consent, then code. 9: client calls /token with code_verifier. 10: Cloud returns a token with aud set to mcp.appwrite.io. 11: client posts with a Bearer token. 12: server verifies JWKS, issuer and aud. 13: server returns the tool result." width="800" height="852" loading="lazy">
  <figcaption>Steps 2 through 6 are the part that makes 'just paste this URL' work. Nothing is pre-provisioned.</figcaption>
</figure>
<p>Three RFCs carry that flow. Protected Resource Metadata (RFC 9728) is the only real MUST in the whole authorization spec:</p>
${code(String.raw`
{
  "resource": "https://mcp.appwrite.io/",
  "authorization_servers": ["https://cloud.appwrite.io/v1/oauth2/console"],
  "scopes_supported": ["..."],
  "bearer_methods_supported": ["header"]
}
`)}
<p>Resource Indicators (RFC 8707) put our canonical URI into the token's <code>aud</code>, so a token minted for another service can't be replayed against us. Dynamic Client Registration (RFC 7591) is what lets a client self-register. Add PKCE with <code>S256</code>, RFC 8414 discovery, and you have the shape of it.</p>
<p>The RFCs are documented. What isn't documented is that every client reads them differently, and you find out in production:</p>
<ul>
  <li><strong>Raycast</strong> was on the <code>2025-03-26</code> authorization spec, which looks for <code>/.well-known/oauth-authorization-server</code> instead of the protected-resource route. I only found it by putting a logging proxy in front of the server and watching what it actually asked for.</li>
  <li><strong>Claude Code</strong> re-authenticated every single run. It listens on an ephemeral loopback port, so the redirect URI never matched. OAuth's native-app BCP (RFC 8252 §7.3) says you must allow any port on <code>127.0.0.1</code>. We weren't.</li>
  <li><strong>Our own scope catalog</strong> broke the flow. All ~118 granular scopes produced a <code>scope</code> parameter of ~2,680 characters against a validator capped at 2,048. Nobody ever reached a consent screen.</li>
</ul>
<p>One warning if you're about to build this: RFC 7591 went from SHOULD to MAY in <code>2025-11-25</code> and is deprecated as of <code>2026-07-28</code>, replaced by Client ID Metadata Documents. We shipped that too. This part of the spec is still moving.</p>

<h2>Sessions, and then no sessions</h2>
<p>The <code>2025-06-18</code> spec let a server hand out an <code>Mcp-Session-Id</code> alongside the <code>InitializeResult</code>, with <code>DELETE</code> to terminate and <code>Last-Event-ID</code> for resumability. We skipped all of it:</p>
${code(String.raw`
StreamableHTTPSessionManager(app=server, json_response=False, stateless=True)
`)}
<p>Every request carries a bearer token. Verify it, build a client from it, serve the call. Nothing to store, nothing to lose on restart, nothing to make sticky across replicas.</p>
<p>That turned out to be the right bet for a reason I can take no credit for. The <code>2026-07-28</code> revision removed sessions from the protocol entirely. <code>Mcp-Session-Id</code>, the <code>initialize</code> handshake, the GET SSE stream: all gone. What we do carry is version negotiation, because you don't get to pick your clients' protocol version.</p>

<h2>Off-topic, but why not REST?</h2>
<p>Many intellectuals like myself must have wondered why MCP exists at all. Can't this be 100x simpler with, I don't know, REST?</p>
<p>The model only knows its training data plus whatever you hand it at runtime. If it has never seen Appwrite, it will never guess this:</p>
${code(String.raw`
POST https://<REGION>.cloud.appwrite.io/v1/tablesdb
X-Appwrite-Project: <PROJECT_ID>
X-Appwrite-Key: <API_KEY>
Content-Type: application/json

{ "databaseId": "unique()", "name": "Production" }
`)}
<p>The endpoint, the header names, the fact that <code>unique()</code> is a magic value. With MCP the same operation shows up self-describing:</p>
${code(String.raw`
{
  "name": "tables_db_create",
  "description": "Create a database in an Appwrite project",
  "inputSchema": {
    "type": "object",
    "properties": {
      "databaseId": { "type": "string" },
      "name": { "type": "string" }
    },
    "required": ["databaseId", "name"]
  }
}
`)}
<p>You can be happy knowing AI needs a lot more handholding than you do (for now).</p>

<h2>Tool choice</h2>
<p>Every MCP server I looked at ships a small, curated set. Appwrite generates one tool per SDK method, which lands at 981 methods across 38 services.</p>
<figure>
  <table>
    <caption>Tools the model actually sees in <code>tools/list</code></caption>
    <thead><tr><th scope="col">Server</th><th scope="col">Exposed</th><th scope="col">Behind the surface</th></tr></thead>
    <tbody>
${tools.map(([server, exposed, behind]) => `      <tr><th scope="row">${server}</th><td>${exposed}</td><td>${behind}</td></tr>`).join('\n')}
    </tbody>
  </table>
  <figcaption>Counts as of August 2026. GitHub's 90 are grouped into 22 toolsets with 5 on by default.</figcaption>
</figure>
<p>There's no version of "expose them all" that works, for two unrelated reasons.</p>
<p><strong>The clients won't take them.</strong> In early 2025 Cursor documented that it "will only send the first 40 tools to the Agent" and truncated silently. Windsurf refused outright above 50.</p>
<figure class="diagram">
  <img src="assets/mcp-discord-windsurf.jpeg" alt="Discord report from liviu74: Windsurf error 'adding this instance would exceed max allowed tools' when adding Appwrite MCP" width="1024" height="243" loading="lazy">
  <figcaption>Discord, liviu74, Mar 14 2025. Windsurf refused it; Cursor accepted it and silently dropped tools 41 onward.</figcaption>
</figure>
<p>That was with per-service flags already in place, which is the part that stings. A community user opened <a href="https://github.com/appwrite/mcp/issues/17">issue #17</a>, "Please reduce the number of tools":</p>
<blockquote><p>Cursor has 40 MCP tools limit to use, but Appwrite solely has 195 tools, so it cannot be used with other tools nor even all of Appwrite tools.</p></blockquote>
<p>I pointed out you could narrow it with <code>--databases</code>. The reply:</p>
<blockquote><p>That's quite non-sense. Then do I have to edit MCP parameter settings for each time whenever I do another jobs...? And anyway, <code>--databases</code> solely has 42 tools, which already exceeds Cursor's recommended limit (40).</p></blockquote>
<p><strong>Quality falls off well below the caps.</strong> The numbers converge from unrelated directions. Anthropic puts degradation at "once you exceed 30-50 available tools". OpenAI says "fewer than 20 functions at the start of a turn". Block's Goose recommends 50 or fewer. And the fix measures well: Anthropic's <a href="https://www.anthropic.com/engineering/advanced-tool-use">advanced tool use</a> work takes Opus 4 from 49% to 74% on MCP tool-use evals with a search tool enabled, and Opus 4.5 from 79.5% to 88.1%, with 85% fewer tokens on definitions. <a href="https://arxiv.org/abs/2505.03275">RAG-MCP</a> more than triples selection accuracy (43.13% against 13.62%).</p>
<p>The caveat, because it cuts against me: <a href="https://arxiv.org/abs/2508.16260">MCPVerse</a> found some agentic models handle big action spaces fine. Claude-4-Sonnet scored 62.3 with an oracle tool set and 62.4 with ~220 tools. Big catalogs aren't fatal. They're a tax you're paying for nothing when the agent needs three tools out of 981.</p>

<h2>Four tools over 981</h2>
<ul>
  <li><code>appwrite_get_context</code> answers where you are and which projects you can see</li>
  <li><code>appwrite_search_tools</code> searches the hidden catalog in natural language</li>
  <li><code>appwrite_call_tool</code> calls one of them by name</li>
  <li><code>appwrite_search_docs</code> searches the Appwrite docs semantically</li>
</ul>
<p>Search narrows at request time, which is why the per-service flags could be deleted entirely. Mutations require <code>confirm_write: true</code>, and results too large for the conversation become MCP resources instead.</p>
<p>The scoring behind <code>appwrite_search_tools</code> is deliberately dumb: token and substring matching against the tool name, description, service and resource, a bonus when the query's inferred verb matches the tool's, a penalty when it doesn't. No embeddings, no index to rebuild, no inference call in the hot path.</p>
<p>Here's what a client sees:</p>
<figure class="diagram">
  <img src="assets/mcp-cursor-settings.png" alt="Cursor MCP settings showing the appwrite server connected with 4 tools and 1 resource enabled" width="800" height="223" loading="lazy">
  <figcaption>981 methods behind 4 tools and 1 resource. The 'Logout' link is the OAuth session.</figcaption>
</figure>
<p>What made me stop second-guessing the design is that we weren't alone. Stripe put its whole API behind <code>stripe_api_search</code>. Sentry exposes 9 of 46 through <code>search_sentry_tools</code>. GitHub removed its dynamic toolset tools and looks to be building a search replacement. Three companies with no reason to coordinate landed on search-then-execute in the same window.</p>

<h2>Where it landed</h2>
${code(String.raw`
claude mcp add --transport http appwrite https://mcp.appwrite.io/
`)}
<p>No API key, no project ID, no config editing to switch projects. Projects and organizations are parameters on the call now instead of properties of the credential.</p>
<p>stdio didn't go away. I removed it in the hosted refactor and put it back two days later, because self-hosted users need it. It runs on a project API key and gets 647 of the 981 methods, since a project key can't reach console-level operations anyway.</p>
<p>Behind that URL there's also OpenTelemetry, Sentry, Grafana dashboards, and region routing so a project in another Cloud region doesn't return <code>general_access_forbidden</code>. You end up operating a service, not publishing a package. That's the part I underestimated most.</p>

<h2>What I'd tell anyone building one</h2>
<p>The transport is not where the time goes. The authorization spec and everything it pulls in is where the months disappear.</p>
<p>Test against real clients early and expect them to disagree. A logging proxy in front of your server was worth more to me than another pass through the docs.</p>
<p>Assume the spec moves under you. Between starting and shipping, sessions were removed, RFC 7591 was deprecated, and a stateless revision landed. Anthropic donated MCP to the Agentic AI Foundation in December 2025, so it isn't even one vendor's project anymore.</p>
<p>And don't hand your API surface over as your tool surface. The architecture this server has today came out of a bug report from a user who was annoyed with us, which I think is the correct way for this to have gone.</p>
<p>The server is open source at <a href="https://github.com/appwrite/mcp">github.com/appwrite/mcp</a>, and the hosted one is at <code>https://mcp.appwrite.io/</code>.</p>
<p><a href="blog.html">← All writing</a></p>`,
};
