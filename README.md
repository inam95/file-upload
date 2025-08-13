## SiGTECH: File Upload Application

A modern React + TypeScript app showcasing a drag-and-drop multi-file uploader with validation, animated progress steps, cancel support, and a generated reports view. Built with Vite and Tailwind CSS.

### Live Demo

- [Live Demo](https://file-upload-liard.vercel.app/)

### Features

- Drag-and-drop or click-to-upload
- Multi-file selection with a configurable limit (default: 5)
- Client-side validation with Zod and TanStack React Form
- Animated progress steps (upload → process → generate)
- Cancel in-progress runs
- Example “Generated Reports” view
- Pure front-end demo (no files are actually uploaded to a backend)

### Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Motion (animations)
- TanStack React Form + Zod (forms and validation)
- React Dropzone (drag-and-drop)
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18 or newer
- Package manager of your choice (pnpm recommended since a `pnpm-lock.yaml` is present)

### Install

Using pnpm:

```bash
pnpm install
```

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### Run (Development)

```bash
pnpm dev
```

Open http://localhost:5173 in your browser.

### Build (Production)

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Project Structure

Key files and directories:

- `index.html`: App HTML entry
- `src/`
  - `components/file-upload.tsx`: Drag-and-drop file uploader UI
  - `components/file-upload-form.tsx`: Form, validation, and run flow
  - `components/steps.tsx`: Animated progress steps with cancel
  - `components/reports.tsx`: Generated reports view
- `vite.config.ts`: Vite config and `@` alias for `src`
- `tsconfig*.json`: TypeScript configs

## Notes

- This is a front-end demo; files are not transmitted to a server.
- The run steps are simulated with timed delays and can be cancelled.
