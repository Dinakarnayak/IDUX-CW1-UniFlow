# UniFlow — ID&UX CW1 Prototype

UniFlow is a medium-fidelity, responsive interactive prototype for a student study-planning workspace. It brings coursework, deadlines, group work, focus sessions and progress into one calm dashboard.

## Features

- **Dashboard** with today's priorities, weekly progress and upcoming deadlines.
- **Smart Calendar** with a navigable month view and date selection.
- **Tasks & Deadlines** with completion controls and priority labels.
- **AI Study Planner** that turns a module and available study time into a suggested session plan.
- **Focus Mode** with a working countdown timer and session controls.
- **Group Workspace** with project updates and shared next steps.
- **Progress & Analytics** with completion and study-time summaries.
- **What-if Simulator** to explore how a planned study block changes the weekly load.
- **Accessibility controls** for larger text and reduced motion.
- **Privacy & Data controls** with local reset and clear status.

## Run it

No build tools or dependencies are required. Download the files and open `index.html` in a modern browser. Task completion, preferences and focus time are stored in that browser using local storage.

## Prototype notes

This is a coursework interaction concept. The planner produces a deterministic sample plan in the browser; it does not connect to an AI service or sync data between users. Use the navigation, task checkboxes, calendar, planner, focus timer, simulator and settings to explore the prototype.

## Files

- `index.html` — semantic page structure and prototype views
- `style.css` — responsive visual system and components
- `app.js` — navigation and interactions
