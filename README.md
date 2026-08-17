# JAY FARMS Safety System

An independent QA automation practice project inspired by a publicly demonstrated agricultural equipment-management workflow. This fictional application is not affiliated with, endorsed by, or presented as an official Safe Ag Systems product.

## Project Purpose

This deliberately small single-page application demonstrates clean Vue and TypeScript implementation alongside purposeful Playwright test design. The focus is quality engineering—not recreating an entire agricultural SaaS platform.

## Why This Workflow Was Selected

Equipment inventory provides several connected quality risks in a compact workflow:

- case-insensitive, partial, and whitespace-tolerant searching;
- independent and combined filtering;
- individual and bulk selection state;
- integrity of selections when the visible result set changes;
- deterministic overdue, future, and unspecified maintenance states.

## Testing Approach

The 15 Playwright scenarios cover happy paths, negative and edge conditions, reactive state changes, filter combinations, selection integrity, and maintenance business rules. Tests use role, label, and visible-text selectors so they exercise the interface in the same way a user or assistive technology encounters it.

The important bulk-selection scenario first narrows the inventory to three tractor records, selects all visible equipment, then removes the filter and proves that the six previously hidden records remain unselected.

## Automation Decisions

Search, filtering, selection, and maintenance-state calculation are deterministic and repeatable. They are strong E2E automation candidates because regressions can be asserted through stable business outcomes rather than implementation details.

Maintenance calculations use the fixed application reference date `2026-08-17`, avoiding failures caused by the test machine's clock. Subjective visual quality, readability, and broader usability would still benefit from manual exploratory testing across viewports and assistive technologies.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Playwright

## Running Locally

The repository uses pnpm.

```sh
pnpm install
pnpm dev
```

Then open `http://localhost:5173`.

## Running Tests

Install Playwright browsers once after installing dependencies:

```sh
pnpm exec playwright install
```

Run the complete cross-browser suite:

```sh
pnpm test:e2e
```

Useful targeted commands:

```sh
pnpm exec playwright test tests/selection.spec.ts
pnpm exec playwright test --project=chromium
pnpm exec playwright test --ui
```

## Quality Checks

```sh
pnpm type-check
pnpm lint
pnpm format
pnpm build
```

## Deliberate Scope

The inactive navigation and maintenance tab are visual context only. The QR action stops at an accessible confirmation dialog; no QR image or print job is produced. Data is local and resets on refresh, with no authentication, backend, router, or external state library.
