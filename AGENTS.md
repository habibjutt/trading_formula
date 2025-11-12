# 🧠 AGENTS.md

## Purpose
This document defines the coding standards and architectural guidelines for this project. It ensures all auto-generated or AI-assisted code follows a clean, modular, and server-first approach suitable for a Next.js codebase focused on performance, maintainability, and SEO.

## Table of Contents
1. Project overview
2. High-level principles
3. Architecture rules

   3.1 Server Components First  
   3.2 Client Components — When to Use
4. Styling guidelines
5. Folder structure
6. Types & exports
7. Documentation & context
8. Code quality standards
9. Code preservation
10. Examples
11. Final notes

---

## 1. Project overview
- Framework: Next.js  
- Architecture: Server Component–first  
- Goals: performance, maintainability, SEO, clarity, minimalism  
- Scope: applies to all new code and AI-assisted/codegen contributions

---

## 2. High-level principles
- Prefer Server Components by default.
- Minimize client-side code; use Client Components only when necessary.
- Reuse existing styles and CSS classes — do not add or rework styles without a documented reason.
- Preserve existing behavior; do not delete or refactor code without explicit permission.

---

## 3. Architecture rules

### 3.1 Server Components First
- Default all components to Server Components.
- Fetch data on the server whenever possible.
- Keep the component tree Server-first and place Client Components deep and localized.

### 3.2 Client Components — When to Use
Use a Client Component only for:
- Handling user interactions (e.g., `onClick`, `onChange`).
- Managing local state or lifecycle hooks (`useState`, `useEffect`, etc.).
- Using browser-only APIs (`window`, `document`, `localStorage`, `navigator`).
- Browser-only third-party libraries that require the DOM.

Client Component requirements:
- Mark with `'use client'` at the top of the file.
- Live deep in the tree and never wrap Server Components unnecessarily.
- Contain only client logic; keep presentation and server-renderable parts in Server Components when possible.

---

## 4. Styling guidelines
- Reuse existing CSS classes from the project stylesheets.
- Do NOT create new global classes or inline styles unless there is a clear, documented reason.
- Check existing CSS files before adding styles.
- Reference Context7 for current style conventions and available classes.

Good:
```tsx
<div className="card-container primary-text">...</div>
```

Bad:
```tsx
<div className="my-new-card" style={{ padding: '20px' }}>...</div>
```

---

## 5. Folder structure
Use the structure below as a guideline. Keep components, logic, and types organized and discoverable.

- components/
  - ui/        — Reusable, generic UI components (buttons, inputs, cards)
  - features/  — Feature-specific components (user-profile, dashboard)
  - layout/    — Layout components (header, footer, sidebar)
- lib/
  - actions/    — Server actions for form submissions and mutations
  - services/   — API calls and external service integrations
  - utils/      — Helper functions and utilities
  - models/     — Data models and business logic classes
  - constants/  — Application constants and configuration
- types/        — TypeScript interfaces, types, and enums (shared across app)

Use barrel exports (`index.ts`) for cleaner imports where appropriate.

---

## 6. Types & exports
- Centralize shared types under `types/`.
- Prefer explicit exports; use barrels only when they simplify imports without hiding types.
- Keep types small, focused, and domain-specific to avoid coupling unrelated areas.

---

## 7. Documentation & context
- Always reference Context7 for the latest project documentation (APIs, props, architecture).
- Verify API signatures and component props against Context7 before implementing.
- If uncertain, consult Context7 before making implementation decisions.

---

## 8. Code quality standards
- Keep code clean, minimal, and readable.
- Follow DRY (Don't Repeat Yourself).
- Remove commented-out code and console logs before committing.
- Avoid over-engineered solutions; prefer straightforward, tested approaches.
- Add tests where applicable and practical.

---

## 9. Code preservation
- Do NOT remove, delete, or refactor existing code without explicit permission.
- When modifying code, preserve existing functionality unless removal is requested.
- If code appears unused or redundant, flag it for review rather than removing it automatically.

---

## 10. Examples

### Server-first example
```tsx
// app/page.tsx (Server)
import ListingView from '@/components/ListingView';

export default async function Page() {
  const data = await getListings();
  return <ListingView listings={data} />;
}

// components/ListingView.tsx (Server)
export default function ListingView({ listings }) {
  return <ul>{listings.map(l => <li key={l.id}>{l.title}</li>)}</ul>;
}

// components/ui/Carousel.tsx (Client)
'use client';
export default function Carousel() {
  // Client-only logic here
}
```

### Styling example
```tsx
// Good - using existing classes
<div className="card-container primary-text">...</div>
```

---

## 11. Final notes
- Keep this document as the single source of guidance for AI-assisted or auto-generated code.
- Update Context7 references if documentation URL or location changes.
- Consider converting this into a CONTRIBUTING.md checklist for PR reviewers and adding repository-specific Context7 links.
