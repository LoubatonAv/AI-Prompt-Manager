# AI Prompt Manager (Personal Prompt Library)

A small frontend app to create, organize, and test AI prompts.  
Users can store prompts by category, search/filter them, and generate a final prompt by filling template variables like `{topic}`.

## Features (Core Requirements)

- Prompt dashboard (list view)
  - Title + category shown per prompt
  - Search + category filter
  - Empty states
  - Responsive layout
- Prompt CRUD
  - Create / edit / delete prompts
  - Simulated loading for better UX patterns
  - Persistence via LocalStorage
- Dynamic template engine
  - Detect variables inside `{}` in real time (supports spacing and duplicates)
  - Auto-generate inputs for detected variables
  - Live “Final Prompt Preview”
  - Copy-to-clipboard button for final prompt
- Dark / Light mode toggle (Tailwind v4)

## Tech Stack

- React + TypeScript (Vite)
- State management: React Context API
- Styling: Tailwind CSS v4
- Persistence: LocalStorage

## Architectural Decisions

- I used React with the Context API because multiple components need access to the same prompt data, and Context is a simple solution without over-engineering.
- TypeScript is used mainly for data models and component props to catch basic mistakes and keep the code clearer, without using advanced patterns.
- LocalStorage is used for persistence since no backend was required, and it allows prompts to persist across refreshes with minimal complexity.
- The template logic (detecting variables and building the final prompt) is implemented as small utility functions to keep UI components simple and focused on rendering.
- Tailwind CSS v4 was chosen for fast styling and consistency, and dark mode is implemented using the built-in dark class approach recommended in Tailwind v4.

## One Thing I Would Improve With More Time

- I would improve how the app handles a larger number of prompts, for example by adding pagination.

## Assumptions

- I assumed this is a personal prompt library used by a single user, so storing data in LocalStorage is sufficient.
- I also assumed prompt variables are defined using curly brackets ({topic}) and do not require complex validation.

## Link to GitHUB pages.

- https://loubatonav.github.io/AI-Prompt-Manager/

## How to Run

```bash
npm install
npm run dev
```
