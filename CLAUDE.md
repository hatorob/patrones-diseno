# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a learning repository of classic design patterns (Creational, Structural, Behavioral) implemented in TypeScript, following DevTalles' design patterns course. Each pattern is a standalone, runnable script — there is no application, build step, or test suite.

## Commands

Run any pattern file directly with Deno (the runtime this repo targets, though Bun/Node with TS support would also work):

```
deno run 01-creacionales/01-builder.ts
```

There are no `deno.json` tasks, lint config, or test files defined — don't assume `deno task`, `deno test`, or `deno lint` scripts exist unless you add them yourself.

## Structure and conventions

Files are organized by pattern category, each numbered in teaching order:

- `01-creacionales/` — creational patterns (Builder, Factory Method, Abstract Factory, Prototype, Immutability, Singleton, Factory Function)
- `02-estructurales/` — structural patterns (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy)
- `03-comportamiento/` — behavioral patterns (Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor)
- `helpers/` — shared utilities re-exported from `helpers/index.ts` (`COLORS` for `console.log('%c...', COLORS.x)` styling, and `sleep`)

**File naming pairs**: each pattern typically has two files, e.g. `01-builder.ts` and `01.2-builder.ts`:
- The base file (`NN-pattern.ts`) is a complete, worked example of the pattern with a `main()` function demonstrating it.
- The `.2` file (`NN.2-pattern.ts`) poses an exercise (`//! Tarea: ...` comment block describing requirements and expected usage/output) followed by a `//! Solución` section with the implemented solution. When editing these, preserve the task-comment/solution structure.
- Occasional `.3` or `.2.1` suffixes exist for extra variants (e.g. `02.3-bridge.ts`, `06.2.1-singleton.ts`).

Some patterns split supporting classes into a subdirectory next to the main file instead of one flat script, e.g. `01-creacionales/singleton/config-manager.ts` and `02-estructurales/adapter-files/` (`local-logger.ts`, `logger-adapter.ts`) — check for one of these alongside a pattern file before assuming everything lives in a single `.ts` file.

Each file's top-of-file comment block explains the pattern (often with a refactoring.guru link) — follow this convention when adding new pattern examples.

Code and comments are written in Spanish, matching the source course; keep new comments/console output in Spanish for consistency with the surrounding file.
