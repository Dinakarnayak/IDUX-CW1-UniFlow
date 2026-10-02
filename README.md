# UniFlow — ID&UX CW1 Prototype

UniFlow is a responsive university portal and study-planning prototype. It combines coursework and deadlines, focus and wellbeing tools, student-service navigation, and sample university pages in one workspace.

## Included

- Grouped sidebar navigation for My UniFlow, Plan, Learn, University, and Support.
- Welcome, demo sign-in, guest read-only access, first-use personalisation, local session expiry, and sign-out.
- Dashboard, activity, mail and messages, courses, account, student services, directory, finance, library, attendance, support hub, assessments, grades, calendar, To Do, study planner, focus, wellbeing, group workspace, analytics, what-if simulator, AI Study Coach, AI Agent, AI Board, notifications, accessibility centre, settings, and privacy controls.
- Task creation, editing, deletion, filtering, due dates, task types, priorities, completion, and local persistence.
- Month and week calendar views, sample classes/deadlines, add-event flow, and local event persistence.
- Study-plan generation, focus countdown, local message composition, persistent AI Board notes, preset AI Agent guidance, and settings for text size, reduced motion, dark theme, contrast, and reading font.
- Search can navigate to matching tasks and portal pages. Top-bar Add opens the task form.

## Run it

Open `index.html` in a modern browser. No build tools or dependencies are required.

## Demo access and prototype limits

Student demo login: `dinakar@uniflow.local` (or `dinakar` / `2026001`) with password `demo1234`. Student, Staff, and Administrator roles use the same demo workspace. The University sign-in button is a mock flow. Guest access is read-only for task changes and message composition. Sessions expire after two hours, or seven hours when Remember me is selected.

This is a front-end coursework prototype, not University of Leicester authentication. Accounts and university services are not connected. Grades, attendance, fees, announcements, and directory records are sample or empty states. Messages are saved locally and are not sent. AI-labeled features use preset responses; they do not call an AI service. Data is stored in this browser and is not shared between devices or accounts.

## Files

- `index.html` — page structure and prototype views
- `style.css` — responsive styling and components
- `app.js` — navigation and interactions

