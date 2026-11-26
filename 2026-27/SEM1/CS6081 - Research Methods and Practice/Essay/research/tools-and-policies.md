# Practice and pilot feasibility: AI/analytics coaching tools for esports

All pages accessed 26 November 2026 unless noted. "Verified" means the claim was read on the official page named. Where an official page could not be fetched (bot protection, 403), that is said, and the item should be checked by hand in a browser before it goes in the essay.

## 1. Tool catalogue

Phase legend: **Pre** = champion/agent select or loading screen; **Live** = in-match overlay or prompts; **Post** = after the match (reports, VOD, replay); **Train** = separate practice environment.

| # | Tool | Game(s) | Phase(s) | Main features (from official page) | Public feedback sources | Source |
|---|---|---|---|---|---|---|
| 1 | **Mobalytics** (Desktop app on Overwolf) | LoL, TFT, Valorant, Diablo IV, LoR, Lost Ark, Destiny 2 (store page); website lists ~25 games | Pre, Live, Post | Auto-imported builds; pre-game scouting "for every player"; in-game overlay that "provides powerspike notifications, live gold leads, and jungle timers"; "Summoner Spell Timer"; post-game report with "Smart Highlights"; GPI-based analysis ("We'll analyze your games to pinpoint the areas that need the most improvement") | Overwolf store: 3.9/5, **75 ratings**, 5.49M downloads | https://mobalytics.gg/ ; https://www.overwolf.com/app/mobalytics |
| 2 | **Blitz.gg** | LoL, TFT, Valorant, CS2, Fortnite, Apex, Marvel Rivals, Deadlock, EFT (meta description) | Pre, Live, Post | LoL overlays: jungle camp/inhibitor/dragon respawn timers, **teammate** ultimate timers, benchmarking "in real time", recommended skill order, jungle pathing, loading-screen scouting, trinket reminder, Arena/ARAM augment tier overlays | iOS companion app: 2.7/5 from 6 ratings (Canada store, per search snippet, not opened); Overwolf listing not checked | https://blitz.gg/lol/overlays ; https://apps.apple.com/ca/app/blitz/id1591484739 |
| 3 | **Porofessor.gg** | LoL (and TFT tools) | Pre, Live, Post | Ban suggestions, counter-picks, rune/spell import; overlay "with real-time insights and analytics", "jungle & inhibitor timers", real-time gold lead, 10/20-min benchmarks; post-match graphs. States it is "Riot Games Compliant" | Overwolf store: 4/5, **322 ratings**, 17.8M downloads | https://porofessor.gg/download ; https://www.overwolf.com/app/trebonius-porofessor.gg |
| 4 | **U.GG** app | LoL, Valorant, Deadlock, WoW | Pre, Live, Post | Champion-select scouting; "in-game builds"; "in-game dynamic skill order recommendations"; in-game augment tiers; "In-game realized gold difference"; "Post-Game Analytics … from timeline data to carry score" | Not on Overwolf LoL list checked; no store reviews located | https://u.gg/app |
| 5 | **iTero AI Coach** | LoL | Pre, Live, Post | "AI-Powered Drafting Coach"; in-game overlay and lobby scouting; post-game "AI-Powered Macro Coach" over "500 statistics" | Overwolf store: 4.4/5, **118 ratings**, 1.19M downloads | https://www.overwolf.com/app/itero_gaming-itero_drafting_coach |
| 6 | **MetaBot.GG** | 18 titles; overlays for LoL, TFT, Valorant, Marvel Rivals | Live, Post (+ chat) | Draggable live overlays (timers, builds, comps); chat-based "AI coach"; post-game reports that open "automatically when your game ends"; auto-clipped replays | Overwolf store: 5/5, 4 ratings, ~38.9K downloads | https://www.overwolf.com/app/metabot.gg-metabot.gg_desktop |
| 7 | **Omnic.AI** (Omnic Forge) | Logos: Overwatch 2, Fortnite, Madden NFL, Valorant, Rocket League | Post | Computer-vision analysis of gameplay video; "After every match you will automatically receive a post match report"; highlights; aim analysis; AI chat | No store listing found | https://omnic.ai/ |
| 8 | **Insights.gg** / Insights Capture | LoL, Valorant, Fortnite and others | Post (recording runs during play) | Auto recording "from champion select … to the nexus"; auto highlights; team VOD review: "upload entire matches, add timestamps, draw on frames, leave comments". No in-game coaching claimed: clips are generated "After each match" | No store reviews located | https://insights.gg/games/league-of-legends |
| 9 | **Leetify** | CS2 | Post | "detailed match reports, aim and utility ratings, highlights" (site meta description); browser extension for FACEIT match pages | Firefox add-on listing (search result, not opened) | https://leetify.com/ |
| 10 | **Aimlabs** | 500 "FPS game profiles"; Valorant Training Center | Train | "AI Powered coach"; "Aim analysis with tailored tips"; claims "improve 49% faster" (no data shown) | **Steam**: 67,139 English reviews, 90% positive (store page, 26 Nov 2026) | https://aimlabs.com/ ; https://store.steampowered.com/app/714010/ |
| 11 | **KovaaK's** | Game-agnostic aim trainer | Train | Steam description: "over 200,000 scenarios, playlists"; map editor; physics customisation. No AI claim | **Steam**: 23,325 English reviews, 93% positive | https://store.steampowered.com/app/824270/ |
| 12 | **SCOPE.GG** | CS2 | Post (+ pre-match opponent analytics) | Not verified from official site (403 to automated fetch). Third-party profiles describe 2D replays, highlights, grenade lineups, "prematch analytics" | Check by hand | https://scope.gg/ (blocked); https://www.cbinsights.com/company/scopegg (secondary) |
| — | **SenpAI.GG** | LoL, Valorant, TFT (2021) | Live, Post (2021 claim) | YC listing: desktop app with in-game "personalized recommendations" and post-game feedback. **YC shows company as Inactive**; site failed TLS when fetched. Treat as historical example only | — | https://www.ycombinator.com/companies/senpai-gg ; https://techcrunch.com/2021/08/06/senpai-gg-wants-to-be-your-ai-powered-video-game-coach |

Observations useful for the essay:

- Every LoL companion (1–6) mixes all three phases. The "real-time" part is mostly timers, gold/benchmark readouts and static build/skill data; the "AI" label sits mostly on drafting (pre) and macro review (post). This matches where the policies draw their lines (section 2).
- **Policy/feature tension (worth checking by hand):** the Mobalytics Overwolf listing advertises "powerspike notifications" and a "Summoner Spell Timer", while Overwolf's own Riot compliance page says it is "strictly prohibited to provide: Notifications that alert players when a power spike hits" and "Tracking of enemy summoner spells cooldowns, or facilitating players tracking these with timers". The listing may be stale or the timer may cover only the player's own team; the essay should present this as "the store text claims X, the policy forbids Y" rather than as a violation.
- Blitz's ultimate-timer overlay is scoped to **teammates**, which is exactly the side of the line Riot/Overwolf permit (enemy ultimate tracking is banned). A good concrete example of a requirement shaped by policy.
- Overwolf store feedback is **thin**: 4–322 ratings per app despite 1–18M downloads. Steam reviews for the aim trainers are three orders of magnitude larger.

## 2. Publisher, platform and tournament rules on real-time assistance

### Riot Games: general stance (all Riot titles)

"Riot's Stance" on third-party applications, posted 10 February 2025. https://support.riotgames.com/en-us/riot/events/third-party-applications

> "We only take issue with applications that impede the competitive nature of our games or violate any of our terms of service or policies. This includes applications that provide a measurable player advantage, such as:
> - Exposing information that's intentionally obfuscated
> - Taking actions on your behalf (botting or scripting)
> - Drawing conclusions for you during gameplay (ie we want to see you play the game first, then analyze and reflect later!)
> - Altering your field of intelligence (zoomhacks or global ult alerts)"

The third bullet is the cleanest statement of the real-time vs post-match split in any primary source.

### Riot: League of Legends Developer API Policy

Last updated 11 March 2025. https://support-developer.riotgames.com/hc/en-us/articles/22698698001939-League-of-Legends

Approved examples include:
> "Training tools that allow players to view their own match histories and aggregate stats."
> "Game overlays that provide static data that is available prior to the game."

Unapproved:
> "Products may not provide any game-session-specific information that would be previously unknown to the player."
> "Apps that dictate player decisions."
> "Products cannot display win rates for Augments or Arena Mode items. This applies to all websites, applications and overlays."

Game Integrity:
> "Products must not use or incorporate information not present in the game client that would give players a competitive edge (e.g., automatically or manually allowing tracking enemy ultimate cooldowns), especially when such data is not already accessible through regular gameplay."
> "Products should not remove game decisions, but may highlight decisions that are important and give multiple choices to help players make good decisions."

### Riot: VALORANT Developer API Policy

Last updated 7 March 2025. https://support-developer.riotgames.com/hc/en-us/articles/22698769097107-VALORANT

Unapproved:
> "Scouting, which is seeing an opponents stats before a match starts."
> "In-game apps and overlays that include any real-time data that would improve a player's performance immediately by altering player behavior (i.e. 'go here now'), vs altering it upon reflection, learning and coaching the player game over game."
> "Static in-game overlays that block parts of the map."

The second line names the essay's dichotomy almost word for word ("immediately" vs "upon reflection … game over game").

### Riot: game memory access removal (all titles)

"Game Memory Access Removed for Third Party Apps", posted 29 September 2026. https://support.riotgames.com/en-us/riot/performance/game-memory-access-removed-for-third-party-apps

> "Starting October 6, 2026, Riot will begin proactively preventing game memory access by default for all unknown third-party applications, for all titles, including League, TFT, and VALORANT."
> "For known and currently approved tools, we will have an extended grace period until April 2027"
> Riot is "moving all remaining 3rd party applications onto the official API as the only allowed mechanism"; the post lists "trackers, overlays, or mods" as uses memory access previously enabled.

Implication: from April 2027 a real-time tool can only show what the official API exposes, so the publisher's API surface becomes a hard technical requirement, not only a policy one.

### Overwolf: platform compliance

General guidelines. https://dev.overwolf.com/ow-native/guides/game-compliance/overview
> "Your app shouldn't interfere with gameplay, competitiveness, and game developer intentions."
> "Your app should follow game developers EULA and TOS."

Riot titles. https://dev.overwolf.com/ow-native/guides/game-compliance/riot-games (no date on page)
> "It is strictly prohibited to provide: Notifications that alert players when a power spike hits (for example, X champion has hit level 6). Notifications that dictate player action based on the current game state (for example, enemy champion is underleveled, go gank top lane). Tracking of enemy ability cooldowns, or facilitating players tracking these with timers. Tracking of enemy summoner spells cooldowns, or facilitating players tracking these with timers."
> "The use of Ultimate timers is strictly forbidden since this may provide an unfair advantage."
> VALORANT: "Spike timers are not allowed to be shown during a live match, as they give players an unfair advantage and violate Riot's TOS."

Dota 2. https://dev.overwolf.com/ow-native/guides/game-compliance/dota-2
> apps should ensure other players' usernames and Steam IDs in matchmaking lobbies "are never shown before the picking phase ends", because "Valve is dedicated to prevent metagaming and match-history-based target banning."

### Valve: Counter-Strike 2

Steam Support, "CS2 - Trusted Mode". https://help.steampowered.com/en/faqs/view/09A0-4879-4353-EF95
> "Trusted mode in Counter-Strike 2 blocks third-party files from interacting with the game and is enabled by default for all Counter-Strike 2 players."
> "Is there a whitelist of software that can be safely injected into Counter-Strike 2? No. … So in Trusted mode, all foreign software is blocked."
> "If you would like to play Counter-Strike 2 with software that is normally blocked you will need to add the launch option "-allow_third_party_software"."
> Outside Trusted mode, "your Trust Factor may be negatively affected".

Valve's approach is technical (block injection) rather than a feature list. This explains why the CS2 tools in the catalogue (Leetify, SCOPE.GG) are post-match/demo tools. Valve's Game State Integration wiki (https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration) is the sanctioned live-data channel, but the page is behind bot protection and could not be quoted; check by hand.

Dota 2 (secondary source, patch notes quoted by esports.gg, 28 Feb 2023): "Player profiles can no longer be accessed in matchmaking during the pregame phase." https://esports.gg/news/dota-2/dota-2-update-kills-third-party-applications-including-overwolf

### FACEIT (CS2 third-party platform)

"What is deemed to be a cheat?", updated 23 October 2025. https://support.faceit.com/hc/en-us/articles/360015788779-What-is-deemed-to-be-a-cheat
> Not permitted: "any use of game exploits, cheats, hacks and other third party software with the goal of gaining an unfair advantage".

No FACEIT page names Leetify or overlays specifically (searched; not found).

### ESL / IEM (tournament level)

IEM Rio 2022 CS:GO Game Specific Rules (PDF). https://pro.eslgaming.com/tour/wp-content/uploads/2022/08/IEM-Rio-2022-CSGO-Game-Specific-Rules.pdf
> 2.9.4 Overlays: "All kinds of overlays which will show the usage rate of the system in any way in-game (e.g. Discord overlay, Rivatuner Overlay) are forbidden. Overlays which show only the frames per second (FPS) are not forbidden and can be used."
> 2.9.3: "Any modification or changing of the game using external graphics solutions or other 3rd party programs are strictly prohibited and may be punished as cheating."
> 2.7.2 (offline): the coach "will only be allowed to talk to the players during tactical pauses and half times."
> 2.7.1 (online): "It is forbidden for coaches and other staff to be seen, heard, felt or present during official online tournament matches."

The coaching rule is a useful analogy: even a **human** coach is restricted to pauses at top level, so a real-time AI coach has no place in sanctioned competition. This is a 2022 rulebook; the current ESL Pro Tour CS rulebook (changelog https://pro.eslgaming.com/tour/?p=108013) was not opened and should be checked for the same clauses.

### Blizzard: Overwatch

Forum post by Tom Powers, 19 September 2018 (role not stated on page). https://us.forums.blizzard.com/en/overwatch/t/unauthorized-third-party-software/213220
> "any third-party application that impedes on the competitive integrity in Overwatch is not allowed", e.g. tools showing "enemy position, enemy health, enemy ability usage, or Ultimate readiness."

"Defense Matrix – Keeping Overwatch 2 Fair and Fun for Every Player" (no date on page). https://overwatch.blizzard.com/en-us/news/24173281/
> "Cheat software, also known as hacks, is third-party software that aims to read and process information from our game"

A current Blizzard support article on third-party software was not located; the 2018 post is the clearest statement but is old and on a forum.

### Synthesis for the essay

Across publishers the same three constraints recur, and they map onto requirements:

1. **Information boundary**: no data the player could not see in the client (enemy cooldowns, ult readiness, obfuscated info). Riot LoL, Overwolf, Blizzard.
2. **Decision boundary**: no tool that decides for the player during play ("dictate player decisions", "go here now", "drawing conclusions for you during gameplay"). Riot, Overwolf.
3. **Timing boundary**: learning should happen "upon reflection … game over game" (Riot VALORANT); tournaments restrict even human coaching to pauses (ESL/IEM).

Real-time tools are therefore limited to static or self/team-visible data; anything inferential ("AI coaching") is pushed to pre-match drafting or post-match review. Riot's 2026 memory-access change adds a technical enforcement layer.

## 3. Pilot designs (one week, two students, no ethics approval)

All three use public documents only and involve no contact with people. Reviews are public, pseudonymous user content: do not record usernames, quote short excerpts only, and confirm with the module lead that this counts as non-human-subjects work under UL's process (not checked here).

### (a) Feature analysis against a requirements taxonomy

- **Data:** official feature pages and store listings for the 12 tools above (about 15–20 pages).
- **Method:** list every advertised feature as one row; code (i) phase (Pre/Live/Post/Train), (ii) requirement type (e.g. information display, recommendation, decision prompt, recording/review, training), (iii) data source (static, own-player, team-visible, opponent-hidden), (iv) "AI" claim yes/no. Both students code all rows independently, then compute Cohen's kappa and resolve disagreements.
- **Collection:** manual, browser + spreadsheet. Save a PDF/screenshot of each page with the date, since listings change.
- **Size in 6–8 h per person:** roughly 12 tools × 8–15 features = 100–180 feature rows; ~2 h collection, ~3 h coding, ~1–2 h reconciliation.
- **ToS:** reading and noting public pages by hand is normal use. Overwolf's ToS forbids automated scraping (see (b)), so no scripts against overwolf.com.

### (b) Mining user reviews, coded by real-time vs post-match

- **Sources and access:**
  - **Steam** (Aimlabs, KovaaK's): official `IUserReviewsService/GetAppReviews` endpoint, which "does not require a key" (https://partner.steamgames.com/doc/webapi/IUserReviewsService). Tested 26 Nov 2026: works without a key, returns review text, vote and playtime. Steam Web API Terms: 100,000 calls/day (https://steamcommunity.com/dev/apiterms). The old `store.steampowered.com/appreviews` endpoint is deprecated and now redirects.
  - **Overwolf store** (LoL apps): ratings and a few written reviews per page. Overwolf Terms of Service (Aug 2019, https://www.overwolf.com/pages/legal) prohibit attempts to "access, scrape, data mine, aggregate any data" and any "automated system, including … 'robots,' 'crawlers,' or 'spiders'". Collection must be manual, and volume is small (75–322 ratings per major app).
  - **Reddit**: since 11 Nov 2025 the Responsible Builder Policy requires approval before any new Data API access (reported in r/redditdev; official policy page could not be fetched). Not realistic in a week; manual reading of a few threads only.
  - **Apple App Store**: Blitz iOS app has 6 ratings; not worth it.
- **Size in 6–8 h per person:** coding at 1–2 min per review gives ~150–250 reviews each. For example 100 recent negative + 100 recent positive Steam reviews per aim trainer, plus every written Overwolf review visible for 5 LoL apps.
- **Weakness:** the big, API-accessible review sets are for **training** tools, not real-time/post-match coaches. The tools central to the question (LoL overlays) have tiny, scrape-prohibited review sets. The split the essay cares about would be poorly represented.

### (c) Publisher policies as requirements sources

- **Data:** the ~10 policy documents in section 2 (Riot stance, LoL and VALORANT API policies, memory-access notice, Overwolf general + Riot + Dota 2 pages, Steam Trusted Mode FAQ, FACEIT cheat page, IEM rulebook, Blizzard posts).
- **Method:** extract each normative statement ("must not", "will not be approved", "strictly prohibited", approved examples) as a candidate requirement; code by type (constraint on data, on decision support, on timing, on technical mechanism), by phase, and by enforcement (API approval, store review, anti-cheat, tournament sanction). Then trace each constraint to the tool features from (a) it permits or forbids.
- **Collection:** manual, plus archiving each page (Wayback Machine or a dated PDF) because these pages change (Riot's memory-access notice is two months old).
- **Size in 6–8 h per person:** ~10 documents, ~60–100 normative statements, coded independently by both students.
- **ToS:** no issue; these are public policy documents meant for developers and players.

### Recommendation

Run **(c) and (a) together as one pilot**: extract requirements from the policies, then trace them to the 12 tools' advertised features. It fits a week (≈4 h policies + 4 h features per person), uses only stable public documents with no ToS risk, and both students coding the same material gives a reportable inter-rater agreement. It also answers the essay question directly: it shows that the real-time/post-match split is largely **imposed by platform owners as requirements**, rather than chosen by tool vendors, and it already surfaces concrete cases (Blitz's teammate-only ult timers; the Mobalytics "powerspike notifications" listing vs Overwolf's ban).

Keep (b) as a short secondary check only if time remains, using the Steam API for the two aim trainers and labelling it clearly as a training-tool sample, not a real-time vs post-match sample.

## Not verified / check by hand

- SCOPE.GG and Senpai.gg official pages (403 / TLS failure to automated fetch).
- Valve Game State Integration wiki (bot protection).
- Current (2026) ESL Pro Tour CS rulebook clauses on overlays and coaching; the quotes above are from IEM Rio 2022.
- A current Blizzard support article on third-party software.
- Reddit's official Responsible Builder Policy text (redditinc.com refused automated fetch).
- Whether Mobalytics' Summoner Spell Timer tracks enemy or own spells.
