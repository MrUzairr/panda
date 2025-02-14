# Panda Cube Frontend

## Project Overview

Panda Retail Company is one of the leading retail chains in the Middle East, with over 182 stores across 39 cities in the Kingdom of Saudi Arabia. This frontend project, **Panda Cube**, is built to enhance the online presence and customer experience of Panda Retail. It provides the user interface for browsing products, managing orders, and interacting with other Panda services.

## Prerequisites

To get started, you need to have the following tools installed:

- [Node.js](https://nodejs.org) (Recommended version: 16+)
- [npm](https://npmjs.com) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/panda-cube.git
   cd panda-cube
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

## Project Structure

This project is structured as follows:

- **`src/`** - Source files for the project
- **`public/`** - Static assets
- **`tsconfig.json`** - TypeScript configuration
- **`tailwind.config.js`** - Tailwind CSS configuration
- **`vite.config.ts`** - Vite project configuration

## Available Commands

This project uses several commands configured in the `package.json` file to facilitate common tasks. Here's a breakdown of the available scripts:

### 1. `dev`

Runs the project in development mode. It starts the Vite dev server and watches for TypeScript file changes.

```bash
npm run dev
```

### 2. `format`

Formats the entire codebase using Prettier to ensure consistent code styling.

```bash
npm run format
```

### 3. `format:check`

Checks if the code is properly formatted according to Prettier's rules.

```bash
npm run format:check
```

### 4. `build`

Builds the project for production. It compiles TypeScript files and creates optimized assets using Vite.

```bash
npm run build
```

### 5. `lint`

Runs ESLint to check for code quality issues, including unused variables, incorrect imports, etc.

```bash
npm run lint
```

### 6. `lint:fix`

Runs ESLint and automatically fixes any issues it finds.

```bash
npm run lint:fix
```

### 7. `preview`

Previews the production build locally using the Vite preview server.

```bash
npm run preview
```

## Dependencies

This project uses a range of dependencies to support modern web development practices. Here's a summary:

### Core Dependencies:

- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for custom designs
- **Vite** - Next-generation front-end build tool
- **TypeScript** - Type-safe JavaScript

### Development Dependencies:

- **ESLint** - JavaScript linter to enforce coding standards
- **Prettier** - Code formatter
- **Concurrently** - Run multiple commands concurrently
- **PostCSS** - Transform CSS with JavaScript plugins

## Configuration

- **Tailwind CSS**: The project uses Tailwind CSS for styling, configured in `tailwind.config.js`.
- **ESLint & Prettier**: Linting and code formatting are handled with ESLint and Prettier to maintain clean, consistent code.

## Troubleshooting

- **Error: "Cannot find module"**: Make sure all dependencies are installed by running `npm install` or `yarn install`.
- **Port already in use**: If you encounter a port conflict when running the app, specify a different port in the `vite.config.ts` file.

## License

This project is open-source and available under the [MIT License](LICENSE).
