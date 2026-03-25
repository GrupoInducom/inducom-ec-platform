# AGENTS.md

## Project Overview

This project is a Human Resources portal built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

The codebase follows a **lightweight modular hexagonal architecture**.  
The goal is to keep business rules, use cases, technical implementations, and UI concerns clearly separated.

This document defines the rules that any AI coding agent must follow when reading, modifying, or generating code in this repository.

---

## Main Tech Stack

- Next.js with App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- ESLint
- PostCSS

---

## Architectural Principles

This project uses a **lightweight hexagonal + modular** structure.

Each module should separate responsibilities into:

- `domain` → business entities, value objects, contracts
- `application` → use cases and DTOs
- `infrastructure` → repositories, mocks, adapters, external services
- `ui` → module-specific components and views

### Core rule

**Do not mix business logic with UI logic.**

UI components should not contain domain rules, repository logic, or complex data transformation that belongs to the application layer.

---

## Current Project Structure

```txt
project_root/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx
│  │  └─ vacancies/
│  │     ├─ page.tsx
│  │     └─ [id]/
│  │        └─ page.tsx
│  ├─ globals.css
│  └─ layout.tsx
│
├─ components/
│  ├─ ui/
│  ├─ shared/
│  │  ├─ app-header.tsx
│  │  ├─ empty-state.tsx
│  │  └─ section-title.tsx
│  └─ layout/
│     └─ main-shell.tsx
│
├─ lib/
│  └─ utils.ts
│
├─ modules/
│  └─ vacancies/
│     ├─ domain/
│     │  ├─ entities/
│     │  │  └─ vacancy.ts
│     │  ├─ repositories/
│     │  │  └─ vacancy-repository.ts
│     │  └─ value-objects/
│     │     └─ vacancy-status.ts
│     │
│     ├─ application/
│     │  ├─ dto/
│     │  │  └─ vacancy-list-item.dto.ts
│     │  └─ use-cases/
│     │     ├─ get-vacancies.ts
│     │     └─ get-vacancy-by-id.ts
│     │
│     ├─ infrastructure/
│     │  ├─ data/
│     │  │  └─ vacancies.mock.ts
│     │  └─ repositories/
│     │     └─ vacancy-repository.mock.ts
│     │
│     └─ ui/
│        ├─ components/
│        │  ├─ vacancy-card.tsx
│        │  ├─ vacancy-filters.tsx
│        │  └─ vacancy-detail-card.tsx
│        └─ views/
│           ├─ vacancies-list-view.tsx
│           └─ vacancy-detail-view.tsx
│
├─ middleware.ts
├─ next.config.ts
├─ package.json
└─ tsconfig.json