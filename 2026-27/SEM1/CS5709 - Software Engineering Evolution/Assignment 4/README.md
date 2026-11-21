# Assessment 4: Technical presentation

CS5709 Software Engineering Evolution · 20% · due **Wed 25 November 2026, 23:59** on Brightspace ("Assignment-4- Technical Presentation"). Learning outcome: assess architectural conformance.

A recorded presentation of **5 to 8 minutes** on the technical side of the portfolio: development process and architecture, technology integration, code review and testing, broken down by the assessments already submitted. It must use the lecturer's template ([brief/Digital_Portfolio_Presentation_Template.pptx](brief/Digital_Portfolio_Presentation_Template.pptx), downloaded from the dropbox on 21 November). Submit an MP4 made in PowerPoint: Record tab, From Beginning, then Export as MP4.

## Rubric (20 marks)

| # | Criterion | What is checked | Marks | Slide |
| --- | --- | --- | --- | --- |
| 1 | Introduction and project overview | Objectives, scope, technologies, context | 2 | 2 |
| 2 | Phase 1 development process | Discovery, Design, Iterations 1 and 2, Evaluation | 4 | 3, 4 |
| 3 | Peer review and software evolution analysis | Reverse engineering, architecture recovery, code inspection, feedback received, recommendations | 3 | 5 |
| 4 | Phase 2 improvements | Feedback incorporated, modularisation, documentation, CI/CD, deployment | 4 | 6 |
| 5 | Innovation and technical achievement | Creativity, modern technology, originality, sophistication | 3 | 7 |
| 6 | Evaluation and reflection | Lessons, challenges, strengths, limitations, future work | 2 | 8 |
| 7 | Technical documentation plan | Requirements, design, code, testing, deployment, maintenance documentation | 1 | 9 |
| 8 | Presentation quality | Organisation, visuals, time management | 1 | all |

## Slides

`slides/build.py` fills the template and writes `slides/dist/ID26253925_CS5709_Assessment4_Technical_Presentation.pptx` (gitignored). Facts come from the [Assessment 1 README](../Assignment%201/README.md), the Assessment 2 review notes and the [Assessment 3 report](../Assignment%203/report/report.md).

```sh
cd slides
uv run --with python-pptx python build.py
```

The template's slide order is kept, except that the documentation plan comes before the conclusion to follow the rubric. Each slide has speaker notes with talking points and a time target (about 7 minutes in total). The notes are prompts, not a script: say it in your own words. The classmate from Assessment 2 is not named anywhere in the deck; don't name them on the recording either.

Rebuilding overwrites `dist/`. Once you start recording, change slides in PowerPoint, not by rebuilding.

## Checklist

- [x] Brief, rubric and template downloaded (21 Nov)
- [x] Draft deck built from the template, 10 slides, with speaker notes
- [ ] Read the deck through; change any wording that doesn't sound like you
- [ ] Rehearse once with a timer: aim for 6 to 7 minutes, never over 8
- [ ] Record in PowerPoint (Record, From Beginning), camera optional
- [ ] Export as MP4 and watch it end to end: audio on every slide, total under 8 minutes
- [ ] Walk the checks in [LESSONS.md](../../LESSONS.md)
- [ ] Upload the MP4 to the dropbox by Wed 25 Nov, 23:59 (aim for Tue 24, because the workshop takes Wed 09:00–13:00)
