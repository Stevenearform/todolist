# BMAD + Cursor on this prototype

Short notes on how **BMAD** (spec-first passes) and **Cursor** (AI-assisted build) were combined for the todo SDD demo, and what stuck.

## How they fit together

1. **BMAD shaped the contract first**  
   PM / Architect-style passes produced living artifacts under `docs/spec/`:
   - [`01-prd-and-brief.md`](./spec/01-prd-and-brief.md) — problem, scope, success criteria, demo checklist  
   - [`02-component-inventory.md`](./spec/02-component-inventory.md) — UI building blocks and responsibilities  
   - [`03-user-stories.md`](./spec/03-user-stories.md) — flows, acceptance hints, design decisions  

   Those files are the **single source of intent** for what “done” means in a training/demo context (in-memory data, simulated error, no persistence).

2. **Cursor implemented against that contract**  
   Cursor was used to **scaffold** (Vite + React + TS + Tailwind + router), then **iterate feature-by-feature** with the spec open: shell, composer, list, empty/error states, focus timer, accessibility passes, polish.  
   Spec → code → quick manual check → adjust. Commits stayed **small and traceable** to a slice of behavior.

3. **Specs stayed authoritative when the UI evolved**  
   Visual and interaction detail grew (studio styling, modal timer, motion, error boundary). When copy or UX drifted, the **checklist in the PRD** still defined whether the demo was successful; Cursor refactors were easier because acceptance was written down.

## What worked well

- **Thin vertical slice**: PRD + inventory + stories gave enough structure to build without over-specifying pixels up front.  
- **Explicit out-of-scope** (no auth, no DB) prevented scope creep during agent sessions.  
- **Demo-oriented success criteria** doubled as a **QA script** for humans and for “does the build still tell the right story?”  
- **Cursor shines on repetitive UI** (lists, modals, tokens) when the **decision record** lives in markdown the agent can read.

## What we learned

- **BMAD without enforcement drifts**: if the spec is not in the same repo or not linked from the README, agents optimize for the last chat, not the last PRD. Keeping `docs/spec/` **in-tree** mattered.  
- **Cursor moves faster than docs**: it is worth a periodic pass to align **copy, a11y, and edge cases** with the stories file—or to add a line in the PRD: “UI may exceed this doc; behavior must match § success criteria.”  
- **Simulated errors are a feature**: treating `SIMULATE_ERROR` as a first-class story made the error path **testable** instead of hypothetical.  
- **Motion and a11y need explicit tasks**: they rarely fall out of a PRD unless stories call them out; follow-up passes (keyboard, focus trap, reduced motion) were necessary.

## If you repeat this workflow

1. Lock **01 → 03** before heavy codegen.  
2. Keep **one running app** on `main` (or a long-lived branch) and merge vertical slices.  
3. Add a **link** from the root README to `docs/spec/` so every contributor (human or agent) hits the same brief.  
4. End each milestone with **the PRD demo checklist**—not only `npm run build`.

---

*This file describes the workflow used for this repository; it is not a BMAD or Cursor product manual.*
