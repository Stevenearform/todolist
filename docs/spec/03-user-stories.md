# User stories and acceptance criteria

## Story 1 — App shell and navigation

**As a** demo viewer, **I want** a clear app frame with title and context, **so that** I understand what I am looking at immediately.

**Design decisions**

- Header: product name **Todo (SDD demo)** and one-line subtitle: *Spec-driven prototype — mock data only*.
- Footer: small muted text with version or “training prototype” wording.
- **Navigation pattern**: React Router layout at `/`; content uses `Outlet`. No extra top nav links for MVP.

**Acceptance criteria**

- **Given** I open `/` **when** the app loads **then** I see header, main, and footer regions with sensible vertical rhythm.
- **Given** the viewport is narrow or wide **when** I view the shell **then** content stays within a centered max width on large screens and uses full width on small screens.

---

## Story 2 — Composer validation and add behavior

**As a** user, **I want** to add todos with the keyboard or button, **so that** entry feels natural on desktop and mobile.

**Design decisions**

- Single-line text input with associated `<label>` (“What needs doing?”).
- Primary button **Add** beside the field on larger screens; stacks on very small screens if needed (`flex-col sm:flex-row`).
- Trim whitespace before validation; empty or whitespace-only submissions do nothing (optional: avoid clearing the field if user typed spaces only—trim for check only).

**Acceptance criteria**

- **Given** focus in the composer **when** I press Enter with non-empty trimmed text **then** a todo is added and the field clears.
- **Given** trimmed text is empty **when** I press Enter or **Add** **then** no todo is created.
- **Given** valid text **when** I click **Add** **then** a todo is created with that title.

---

## Story 3 — List interactions (complete and delete)

**As a** user, **I want** to complete and delete todos, **so that** I can manage my list quickly.

**Design decisions**

- Each row: checkbox (or `role="checkbox"` button) for completion, title text, **Delete** text button.
- Completed titles use `line-through` and slightly muted color.
- **Delete** is immediate (no modal) to keep the training flow short; `aria-label` includes the todo title for context.
- Row minimum height ~44px for touch.

**Acceptance criteria**

- **Given** an incomplete todo **when** I toggle complete **then** it appears completed and toggling again restores incomplete.
- **Given** any todo **when** I activate Delete **then** that todo disappears and others remain.

---

## Story 4 — Empty state

**As a** user, **I want** guidance when there are no todos, **so that** the blank screen still feels intentional.

**Design decisions**

- Shown only when `todos.length === 0` **and** `error == null`.
- Simple icon or emoji plus short headline and one sentence instructing use of the composer.

**Acceptance criteria**

- **Given** zero todos and no error **when** I view the main panel **then** I see the empty state instead of the list.
- **Given** I add a todo from the empty state **when** the add succeeds **then** I see the list with the new item.

---

## Story 5 — Error state and recovery

**As a** reviewer, **I want** to see how errors are presented and recovered, **so that** the prototype covers non-happy paths.

**Design decisions**

- **Simulate error** lives in the header as a secondary `button` (not primary styling).
- Error panel shows concise copy and a **Retry** primary action.
- Simulating error does **not** mutate the todo array; **Retry** clears the error flag only.

**Acceptance criteria**

- **Given** any non-error view **when** I click **Simulate error** **then** I see `ErrorState` and not the list or empty state.
- **Given** the error view **when** I click **Retry** **then** the error clears and I return to list or empty state according to todo count.

---

## Story 6 — Responsive behavior

**As a** user on phone or desktop, **I want** the UI to remain usable, **so that** the same build works in a demo on multiple devices.

**Design decisions**

- Mobile-first Tailwind utilities; `sm:` breakpoint for slightly larger type and horizontal composer layout.
- Centered column `max-w-lg` (or similar) on large screens.

**Acceptance criteria**

- **Given** a ~375px wide viewport **when** I use composer and row controls **then** tap targets are at least about 44px tall and text does not overflow the viewport horizontally.
- **Given** a ~1280px wide viewport **when** I view the app **then** the column is centered with comfortable margins.
