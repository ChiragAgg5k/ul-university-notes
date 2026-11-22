# Speaker notes

One section per slide, in the order the slides appear. build.py copies each section's text into that slide's notes. This is a draft script for inspiration, about 7 minutes in plain language; slides 5 and 6 are the easiest to shorten if a take runs long.

## 1. Title (about 15 s)

Hi, I'm Chirag Aggarwal, student number 26253925. This is my technical presentation for Software Engineering Evolution. I'll show how my digital portfolio changed over the first three assessments: what I built, how it was reviewed, and what I changed because of those reviews.

## 2. Introduction (about 35 s)

The goal was a portfolio that shows real evidence of my work, not just a list of skills. It has the usual pages, like home, about, education, my projects, photo and video galleries and a blog, plus live chat and a Readme page.

The project went through three steps. In Assessment 1, I built Phase 1 as a simple static site. In Assessment 2, a classmate and I reviewed each other's portfolios. In Assessment 3, I used that feedback to build Phase 2: a React and TypeScript app with a database, an automatic pipeline, and a live site on GitHub Pages.

## 3. What Phase 1 delivered (about 35 s)

Phase 1 was kept simple on purpose. A small Node script built eleven pages from one shared layout. Normal links handle navigation, so the site works even without JavaScript, and it uses no outside libraries.

The chat is real, not just a contact form. I used Tawk.to, and I tested that a reply from my dashboard reaches the visitor. For privacy, the chat only loads after the visitor clicks. Twenty-six automated tests checked things like links, image descriptions and colour contrast. It was hosted on Appwrite Sites, and it's still online so you can compare both versions.

## 4. Phase 1 process (about 45 s)

I followed five steps. Discovery listed the features and split them between Phase 1 and Phase 2. Design produced the block, component and control-flow diagrams you can see below. In the first iteration I built the pages and the chat. In the second I added the styling, phone layouts, a skill filter and the deployment. Evaluation covered the tests, keyboard and contrast checks, and a critique.

I've put my marks on each card, because where I lost marks told me what to fix next. Discovery lost a mark because the requirements came from me, not from personas and scenarios. Each iteration lost a mark because my code comments didn't explain how the code was structured.

## 5. Peer review (about 55 s)

This slide has two sides. The middle column is what I did when I reviewed a classmate's portfolio. For reverse engineering, I built their project, ran a strict type check, read every file and went through their commit history. For architecture recovery, I checked whether they had used methods from the lectures, like concept analysis and comparing the planned design with the real code. Then I did a structured code inspection with a checklist. I confirmed eight defects and gave ten recommendations, in order of priority.

The right column is what I got back on my own work. The most useful moment was when my reviewer tried to understand my code from the live site and got stuck at the first step, because there was no Readme page. They found seven defects and suggested eight actions. The lecturer asked for personas, comments that explain the structure, and a more structured evaluation. By the end of Phase 2, I had done seven of the eight actions.

## 6. Phase 2 improvements (about 55 s)

Each row in this table is a change that came from the feedback. The site is now a React app written in strict TypeScript. It grew from eleven to thirteen pages, including the Readme page my reviewer asked for. That page shows the repository's README file directly, so the two can never disagree.

The content moved out of the code and into JSON data files. The code is split into thirty-eight files in eight folders, each with one job. Comments went from two percent of the code to twelve percent, and every file starts with a comment that explains why it exists.

On the right is the pipeline. Every time I push, it checks the code style, runs nineteen unit tests, checks the types and builds the site. Only if all of that passes does it go live on GitHub Pages, and only from the main branch. This run took about a minute from push to live.

## 7. Innovation (about 45 s)

GitHub Pages can only host static files: there's no server and no database. But I wanted readers to be able to react to an article without signing up.

So the page talks directly to an Appwrite database, and the database permissions handle security. Anyone can add or read a reaction, but nobody can change or delete one. To stop people reacting twice without needing accounts, each reaction's ID is built from a random visitor ID, the article and the reaction type, so the database itself rejects a repeat. A live connection then updates the count for everyone reading, without a page reload. And the database code only loads on article pages, after the text is already on screen.

## 8. Evaluation and reflection (about 45 s)

I checked Phase 2 in three ways. A structured code inspection found twelve defects: I fixed six, accepted three with reasons, and three small ones are still open. A script replayed eight user scenarios on the live site, and all eight passed. All nineteen unit tests pass, and every pipeline run was green.

The biggest lesson was that reading code and testing it find different bugs. When I read the reactions code, I missed a timing bug, and only the test with two browsers caught it.

There are limits too. My personas are assumptions, no real users have tried the site yet, and I inspected my own code. Next, I would test the site with a few real people and make every page load without JavaScript.

## 9. Documentation plan (about 30 s)

Most of the documentation already exists, and the final report in Assessment 5 will bring it together. The requirements are each linked to the file that implements them, and the scenarios test them. The design is covered by the diagrams. The code is documented by the file comments and the README. Testing has the tests, scenarios and the defect log. Deployment and maintenance are covered by the pipeline file, the list of known issues, and the Git history.

## 10. Conclusion (about 20 s)

To sum up: the reviews drove the changes, the pipeline checks quality on every push, and everything I've said can be checked on the live site and in the inspection log. The links are on screen. Thanks for watching.
