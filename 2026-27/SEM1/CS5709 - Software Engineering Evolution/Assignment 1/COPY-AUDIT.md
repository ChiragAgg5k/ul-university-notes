# Website copy review

Scope: visitor-facing copy added for this assignment. Preserve original article quotations, factual dates and qualifications, team attribution, AI/reuse disclosure, privacy details and incomplete-feature status. No em dashes.

## Changes

| Before | After | Reason |
|---|---|---|
| “Learning, in context” | “Education” | Name the page directly. |
| “From a skill to the work behind it.” | “Projects, tools and technical decisions.” | Say what the visitor will find. |
| “Technical decision and trade-off” | “Design choice” | Shorter label; trade-offs remain in the descriptions. |
| “This summary does not claim sole authorship of the complete authorization system.” | Explicitly retain that a colleague built the authorization server; link to the article describing responsibilities. | Remove a repeated disclaimer without changing attribution. |
| “The principle is to add complexity for an identified requirement…” | Removed closing moral. | The article already explains the concrete choices. |
| “A content blocker or network restriction may be preventing…” | “The chat service may be unavailable.” | Provider HTTP 500 errors were observed; avoid implying the visitor's browser is the cause. |

Contact instructions, project descriptions and the shared footer are shorter. Privacy copy still identifies Tawk.to, message/connection-data processing, possible cookies, tab-scoped background loading and the instruction not to share sensitive information. The original MCP article excerpt is unchanged.

## Checks

- All 23 code/build tests passed after the edits.
- Phrase scan: no hard or soft banned-phrase matches before or after.
- Preservation scan: 132/133 extracted tokens preserved; the single missing “Limerick Connecting” was a false proper noun formed across a heading and paragraph. The university name remains unchanged.
- Reviewed reduced negation counts manually: removed repeated caveats, retained the limitations on attribution, performance claims, no-script access and unfinished work.
- Structure/readability scans of concatenated pages flagged repeated navigation/footer text and short UI labels. These are interface conventions, not reasons to rewrite page copy into an essay. No readability score is claimed for that combined sample.
- Dates, grades, links and the quoted original article remain intact. Source attribution and AI-assisted draft labelling remain visible.

## Chat verification update

In the authenticated Tawk.to dashboard, both the original integration message and the later labelled live-site test were present. Owner inbox receipt is now verified. Joined the labelled test conversation and sent a labelled dashboard reply. A subsequent visitor session failed to initialise with the same intermittent provider issue, so receipt of the reply in the visitor widget remains unverified. Do not mark full two-way verification complete.
