# 2026/27 · Semester 1 — open work

[Lessons from feedback](LESSONS.md): checks to run before every submission.

Snapshot taken on Mon 9 November 2026 (Week 10) from Brightspace dropboxes, announcements and the UL student inbox. Brightspace is the source of truth; recheck it before relying on a date.

## Deadlines

| Due | Module | What | Weight | Status |
| --- | --- | --- | --- | --- |
| Week 10 or 11 | CS6451 | Group talk, 30 min: present one paper on porting a monolith to microservices, picked from the shared "CS6451" OneDrive folder | not stated | Group 1 picked paper 2: Chen, Li & Li (2017), "From Monolith to Microservices: A Dataflow-Driven Approach", APSEC 2017 (`MSA-Dataflow_Chen-2017.pdf`); [paper, notes and talk outline](CS6451%20-%20Advanced%20Software%20Design/Paper%20Talk/README.md); slides to prepare |
| Week 11, likely Mon 16 Nov, 13:10–13:45 | CS6081 | In-class statistics test, 5 questions; [sample paper and preparation guide](CS6081%20-%20Research%20Methods%20and%20Practice/Stats%20Test/README.md) | 10% | to prepare |
| Tue 17 Nov, 23:59 | CS5709 | [Assessment 3: Digital Portfolio, Phase 2](CS5709%20-%20Software%20Engineering%20Evolution/Assignment%203/README.md) | 30% (the brief also says 35% once) | site, pipeline, innovation and evaluation done 10 Nov; submitted 10 Nov; corrected version resubmitted the same evening (ID 1063641) ([what is left](CS5709%20-%20Software%20Engineering%20Evolution/Assignment%203/NOTES.md)) |
| Fri 20 Nov, 23:59 | CS5707 | Presentation slides, uploaded as PDF: 5 minutes max, any module topic, at least 5 references, every point cited; [requirements and checklist](CS5707%20-%20SE%20Development%20Paradigms/README.md) | not stated | not submitted |
| Wed 25 Nov, 23:59 | CS5709 | Assessment 4: 5-minute technical presentation, using the template attached to the dropbox | 20% | not submitted |
| Thu 26 Nov, 23:59 | CS5741 | Assignment 2: Simulating Forest Fire Spread and Recovery | 30 marks | opens 12 Nov; brief not read |
| Fri 4 Dec, 12:00 | CS5709 | Assessment 5: technical report, APA references | 20% | not submitted |
| Fri 4 Dec, 23:59 | CS5707 | Final report: 8 pages max plus references, Harvard style, `report_template.docx` | not stated | not submitted |
| Fri 4 Dec, 12:00 | CS6081 | End-of-term essay; spec and video posted under Week 8 on 28 Oct | 70% | no dropbox yet |
| Thu 10 Dec, 23:59 | CS6451 | [Assignment Part 2](CS6451%20-%20Advanced%20Software%20Design/Assignments/Part%202%20-%20Microservices%20Architecture/README.md): port the gym monolith to microservices with Chen's approach, evaluate with metrics (MicroValid) | 15% | brief read 11 Nov; not started |
| Mon 8 Feb 2027, 15:00 | CSIS Project | Signed Project Details Form | n/a | needs supervisor sign-off |

## Exams

From the final Autumn 2026/27 timetable on [timetable.ul.ie](https://www.timetable.ul.ie/UA/ExamModuleTimetable.aspx), checked 9 November 2026. CS5709 and CS6081 are not on the exam timetable.

| Date | Time | Module | Venue |
| --- | --- | --- | --- |
| Wed 9 Dec | 16:00 | CS5707 SE Development Paradigms | Schuman, SG15/16/17 |
| Thu 10 Dec | 12:30 | CS5741 Concurrency and Parallelism | Main Building, EGO10 |
| Tue 15 Dec | 09:00 | CS6451 Advanced Software Design | PE building, PG053 |

## Rough preparation plan

Three reports land on Fri 4 Dec, five days before two exams on consecutive days. The plan is to start light revision early so that the last week is not all coursework.

| Week | Coursework | Revision |
| --- | --- | --- |
| Week 10, 9–15 Nov | CS5709 Assessment 3 main build and report. CS6451: read the Chen paper and draft the talk. | CS6081 statistics test: about three hours, ending with the sample paper closed-book on Sun 15. |
| Week 11, 16–22 Nov | CS6081 statistics test (likely Mon 16). Submit CS5709 Assessment 3 (Tue 17). CS5707 slides as PDF (Fri 20). CS6451 talk if not given in Week 10. Start the CS5709 Assessment 4 slides from the template. | CS5741: re-read lectures 1–4, one evening. |
| Week 12, 23–29 Nov | Submit CS5709 Assessment 4 (Wed 25). First full drafts of the CS5707 report and the CS6081 essay. Outline CS5709 Assessment 5 from the existing Assessment 1–3 reports. | CS5707: lecture notes pass. CS5741: lectures 5–9. |
| 30 Nov – 4 Dec | Finish and submit CS5709 Assessment 5 (Fri 12:00), the CS5707 report (Fri 23:59) and the CS6081 essay (Fri). Aim to have two of the three done by Wed 2 Dec. | CS6451: redo the midterm topic checklist. |
| 5–8 Dec | Finish the CS6451 Part 2 report (due Thu 10 Dec, the day of the CS5741 exam). | CS5707 (Sat, Sun, Tue) and CS5741 (Mon, Tue): past papers under time. |
| Wed 9 Dec | **CS5707 exam, 16:00.** | Evening: CS5741 formulas and worked examples. |
| Thu 10 Dec | **CS5741 exam, 12:30.** | Rest of the day off. |
| 11–14 Dec | — | CS6451: patterns, SOLID and metrics, statecharts, architecture (interceptor, microservices), then past papers. |
| Tue 15 Dec | **CS6451 exam, 09:00.** | — |

Open questions that change this plan: the CS6451 talk slot and Assignment 2 due date, and the weight of each exam.

## Notes on the briefs

- **CS5709 Assessment 3** ([full brief](CS5709%20-%20Software%20Engineering%20Evolution/Assignment%203/NOTES.md)) asks for: a live site deployed by GitHub Actions, CI/CD, a README, modular structure, JSON-driven data, an API connection, GSAP, PropTypes or TypeScript, JSDoc headers, lazy loading, search and filter, and state management. Marks: Iteration 3 (10), Iteration 4 CI/CD (2.5), Iteration 5 live site (2.5), Innovation (10), Evaluation (5); the Brightspace rubric adds Reflection (5).
- **CS5707 final report** sections: Abstract, Introduction, Background, Approach, Results, Discussion, Conclusion, References. Every fact and claim needs a citation. Reports written by generative AI are marked zero.
- **CS5741**: Assignment 1 came back on 11 Nov at **23/30 (76.7%)**; the marker's three comments are in the [Assignment 1 notes](CS5741%20-%20Concurrency%20and%20Parallelism%20in%20Software%20Development/Assignment%201/README.md). **Assignment 2, "Simulating Forest Fire Spread and Recovery", is on Brightspace: 30 marks, opens Thu 12 Nov, due Thu 26 Nov, 23:59.** Brief not read yet.

## Other dates

- **Thu 12 Nov**: national public sector strike. Teaching and labs will not run if it goes ahead; the Provost promised an update on Tue 10 Nov.
- **Sat 14 Nov**: planned power outage on the north campus.
- The final Autumn exam timetable is published on the UL Timetable site.
- Module selection on the Student Portal: checked on 10 Nov, correct (the deadline to raise problems was Fri 13 Nov).

## Submitted

| Module | Item | Submission ID |
| --- | --- | --- |
| CS5709 | Assessment 1 | 999286 |
| CS5709 | Assessment 2: peer review | 1024621 |
| CS5741 | Assignment 1 | 1025980 |
| CS6081 | Poster | 1043528 |
| CS6451 | Part 1 report | 1052451 |
| CS6451 | Part 1 code | 1052452 |
