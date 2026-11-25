# Workshop: DiSSENT quality evaluation (Wed 25 November 2026)

Replaces the lecture, 09:00–13:00, SG16 (the usual lecture room; the announcement names no room). Attendance taken; paid at UL rates. A report on the inspection follows (due date not given yet).

Posted on Brightspace at 09:06 on 25 Nov as a discussion topic, **Learning Pathway / Week / Topic 12 → "DiSSENT quality evaluation"** (forum "DiSSENT quality test"). No posts yet when checked.

## The system

DiSSENT: Cross-Border Journalism and Collaboration, Salim's own project.

- Code: <https://github.com/saaysalim/DiSSENT>
- Site: <https://saaysalim.github.io/DiSSENT/docs/Pages/home.html>

## Evaluate it against

1. Usability and accessibility
2. Content and services
3. Information architecture
4. User experience
5. Graphic design
6. Technology and security
7. Interactivity
8. Performance and effectiveness
9. Legal aspects
10. Assistance and support
11. Security and privacy
12. Interoperability
13. Technology integration
14. Any other comments and feedback
15. Your recommendation for evolving the application

Reverse-engineering and inspection material from the module: Lec 5 (Reverse Engineering), Lec 6 (Software Inspection). Lec 12 (Software documentation, uploaded 24 Nov) is in [Lectures](../Lectures/).

## What DiSSENT is (checked 25 Nov, commit ad344e3)

A Final Year Project (2026–27) supervised by Salim: a workspace for journalists, including refugee and displaced reporters, to submit stories, message media teams and follow editorial review. Three contributors (Salim, a UL student, Shakeeba Hamdam).

- **Website**: PHP 8.2 on Apache, MySQL 8, plain JS; PHPMailer with Mailpit for email. Run with Docker Compose.
- **Back end**: two Spring Boot 3.5 services (`securecomm`, `securecomm2`) that exchange messages over Apache Kafka, share one MongoDB, and record report fingerprints on Hyperledger Fabric (Go chaincode).
- **Live site**: GitHub Pages serves a static HTML preview only; the PHP pages return 503 there, so login, messaging and reports can't be tried online.

## Starting points per criterion (verify each yourself)

| Criterion | What the code and site show |
| --- | --- |
| Usability, accessibility | `lang="en"` set; aria attributes in the header; responsive with a hamburger menu. Run Lighthouse or WAVE on the preview |
| Content, services | Register, login, reset, dashboard, profile, messaging, reports, media centre, verification, FAQ, admin |
| Information architecture | 10 nav items; check that names match what each page does |
| Graphic design | 14 CSS files, one per page; check consistency between pages |
| Interactivity | Live password rules, FAQ search, polling for new messages (`get_new_messages.php`) |
| Performance | Static preview only; nothing to measure for the dynamic pages online |
| Security, privacy | Good: prepared statements, `password_hash`, CSRF tokens, session ID regenerated at login, image uploads checked by MIME and dimensions, uploads kept outside the web root, local ports bound to 127.0.0.1, API key filter on both Java services. Gaps: Kafka (9092) and ZooKeeper (2181) bound to all interfaces with no auth or TLS; no Spring Security; both services share one Mongo |
| Legal | Journalists' identities and reports are sensitive personal data under GDPR: no privacy policy, consent, retention or data-deletion page beyond "delete account" |
| Assistance, support | FAQ and contact form; README has troubleshooting |
| Interoperability, integration | Kafka between services, Fabric for integrity, REST with API key between PHP and Java |
| Language | Switcher lists 7 languages (including Farsi and Arabic, right-to-left), but no translation code was found |
| Testing | No automated tests (no Java `src/test`, no PHPUnit) |
| Maintainability | 1,600+ line `docs/backend/content.php`; PHP site lives in `docs/` because of GitHub Pages |

## Live app (hands-on, 25 Nov)

The working app is linked from the topic: a Cloudflare quick tunnel to Salim's machine (`https://breeding-generally-cradle-tattoo.trycloudflare.com/Pages/home.php`), so it will change or disappear. Test account: student email, category Researcher / Investigator; password in 1Password, item "DiSSENT (CS5709 workshop)".

| What I tried | What happened |
| --- | --- |
| Register | Worked; strong password generated. Success message shows, but the page stays on an empty form instead of going to login |
| Welcome email | None arrived in the student inbox (email goes to Mailpit, a local test inbox) |
| Dashboard, admin, reports while logged out | Redirected to login |
| Admin page as an ordinary user | 403 "You do not have permission" |
| Login | Lands on the dashboard: platform totals (6 reports, 2 published, 17 members) and own activity |
| Messaging | Any new account sees the full contact list: every member's real name, including classmates. For refugee reporters this is a privacy risk (people can be identified and listed) |
| Reports form | Title, category, optional location with a warning not to identify confidential sources, evidence link, one PDF up to 5 MB, private to the reporter and admins. Thoughtful privacy design |
| Verification | Search by report ID, title or journalist; shows recorded hashes and "Chain Integrity: Check passed"; explains that a hash proves integrity, not accuracy |
| Language (Settings and the globe menu) | Offers en, fa, fr, es, ar, de, nl. Choosing French changed nothing: page text and `html lang` stay English. Language is cosmetic only |
| Page load times | 1.4–2.0 s per page through the tunnel |
