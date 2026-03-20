---
name: react:components
description: Converts Stitch designs into modular Vite and React components.
---

# Stitch to React Components

Transforms designs into clean, modular React code following best practices.

## Guidelines
- **Retrieval**: Use `get_screen` to fetch design JSON and HTML.
- **Architecture**: Move props to interfaces, logic to hooks, and static data to `mockData.ts`.
- **Validation**: Use AST reports and checklists to ensure quality.
- **Style**: Extract Tailwind config and sync with project theme.
