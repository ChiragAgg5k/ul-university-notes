Walkthrough of http://localhost:4173/ on 2026-11-10.

| Scenario | Persona | Goal | Width | Actions | Result | Observed |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | Module assessor | Find the Readme page and the folder structure from the home page | 1440px | 1 | Pass | Readme is in the menu; Architecture, Folders and Pipeline sections shown |
| S2 | Module assessor | Open the live chat, and confirm nothing loads from the chat provider before agreeing | 1440px | 1 | Pass | 0 requests to the provider before the click, 29 after; status "Chat is ready". Message delivery is not checked |
| S3 | Hiring manager | Find evidence of Go work and reach its source code | 1440px | 3 | Pass | "1 of 3 shown."; the remaining card links to the CLI repository |
| S4 | Hiring manager | Search the writing for "logging", read the article, and return to the same results | 1440px | 3 | Pass | Search narrows to 1 of 2; the filter is still applied after returning |
| S5 | Fellow developer | Open an article from a shared link on a phone, react to it, and see the count change for another reader | 390px | 1 | Pass | "Useful" went from 4 to 5 without a reload in the reader's own tab, their second tab and another reader's browser (whose stored reactions were deliberately damaged), and survived a reload |
| S6 | Fellow developer | Using the keyboard only, reach the latest repositories, then skip the menu | 1440px | 13 | Pass | 10 Tab presses and Enter open Repositories, with focus moved to the content and 6 repositories loaded from GitHub; on the next load, Tab then Enter on the skip link jumps past the menu |
| S7 | Hiring manager | On a phone, look at hackathon photos and enlarge one | 390px | 2 | Pass | 2 of 3 shown; the enlarged view opens as a dialog with a Close button |
| S8 | Any visitor | On a phone, open every page in the menu without sideways scrolling | 390px | 10 | Pass | 10 pages opened at 390px; none scrolls sideways; each marks its menu item as current |
