# Teen-Turn super session, Sat 28 Nov 2026

Paid mentor role (about €20/hour), selected by J.J. Collins (email of 27 Nov). Meet J.J. at 10:45 in the Atrium, Computer Science Building. 11:00–16:00, about 50 second-level students (mostly junior cycle, no computer science at school) and 6 teachers, split across CS1-044 and CS2-044; mentors swap labs after lunch (13:00–14:00). It is a free-flowing problem-based lab, not a lecture. Payment arranged by the CSIS Systems Admin by email the following week.

## Thunkable cheat sheet

From docs.thunkable.com, checked 27 Nov 2026.

| Thing | What it is |
| --- | --- |
| Start | Projects page: **AI Template Generator** (describe the app, get screens, components and basic logic; free plan included) or **start from scratch** |
| Design tab | drag components onto a screen: Button, Label, Text Input, Image, List, Map, Data Viewer; set properties on the right |
| Blocks tab | the logic, Scratch-style. Every component has event blocks (`when Button1 Click`) and set/get blocks (`set Label1 Text to`) |
| Screens and navigators | multiple screens; a navigator (tabs, stack) controls moving between them |
| Variables | app variables (lost on close), stored variables (kept on the device), cloud variables (shared) |
| Data sources | Google Sheets, Airtable, or a Local Table; show rows with a Data Viewer list or grid |
| Live Test | top-right button: **Web Preview** in the browser, or the **Thunkable Live** phone app (sign in with the same account). Web Preview can't do some phone-only features (push notifications, accelerometer, Bluetooth) |
| Publish | web app, Android, iOS; app-store publishing needs paid plans and developer accounts, not needed for a prototype |

### Common problems to look for first

- **Blank white screen in Live Test:** a screen not dropped inside the navigator; loose, unconnected blocks; something crashing in `when Screen Starts`; phone and browser signed into different accounts.
- **Image not showing on the phone:** height or width set to "Fit contents"; give it a fixed size.
- **Variable names:** letters, numbers and underscore only.
- **Copied blocks** that refer to a component on another screen need fixing by hand.
- Blocks copy and paste only within the same project.

### A 10-minute warm-up app to build before Saturday

1. New project from scratch. Add a Text Input, a Button and a Label.
2. Blocks: `when Button1 Click` → `set Label1 Text to` → `join "Hello, " Text_Input1 Text`.
3. Live Test in the browser, then on the phone with Thunkable Live.
4. Add a second screen and a button that navigates to it.
5. Try the AI Template Generator with "a quiz app about planets" to see what students might get.

## Generative AI: benefits and liabilities (J.J.'s point 6)

Keep it to a 2-minute conversation per group, not a lecture. Show it live with their own project where possible.

**Benefits**
- Gets you unstuck fast: explain an error message, suggest the next step, show an example.
- Good tutor: "explain this code line by line" or "why does this block not run?"
- Starting points: Thunkable's AI generator builds a first version of an app from a sentence.

**Liabilities**
- It can be confidently wrong: code that looks right but doesn't run, or invents functions and blocks that don't exist.
- If you only copy, you don't learn, and you can't fix it when it breaks.
- It doesn't know your project: you must describe it clearly, and check what comes back.
- Don't paste personal information (names, photos, school details) into AI tools.

**Demo idea:** ask an AI tool to write a small React or Python snippet, run it, and find one thing it got wrong or didn't explain. Then ask it to explain its own code. Point: use it like a helpful classmate, and always test what it gives you.

## Quick help for the other topics

- **React:** most likely issues are a missing `import`, a component name not starting with a capital letter, forgetting `useState` to make something change on screen, or JSX needing one parent element.
- **Python data analytics:** `pandas.read_csv`, `df.head()`, `df.describe()`, `df["col"].value_counts()`, and `matplotlib` for a bar chart. Common errors: wrong file path, column name typos, wrong indentation.

## Talking points (point 7: computing isn't the film stereotype)

- Most software work is teamwork: talking to users, designing, testing, not typing alone in the dark.
- Your own example: platform engineer at Appwrite, an open-source company with people around the world.
- You don't need to have coded at school to start; most people learn on the job and from projects like this one.

## Afterwards (optional)

Unpaid support of about 30 minutes a week, arranged only through Teen-Turn staff; child-protection rules mean never contacting students directly. Counts toward a President's Volunteer Award.
