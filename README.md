# tgutil

A command-line utility tool for creating and managing Telegram bot projects. This tool helps you quickly scaffold new Telegram bot projects with various modules and features.

## Installation

```bash
npm install -g tgutil
```

Or use it directly with npx:

```bash
npx tgutil <command>
```

## Commands

### Initialize a new project

```bash
tgutil init <directory>
```

Creates a new Telegram bot project in the specified directory with the basic structure and dependencies.

### Add a module

```bash
tgutil module:add <name>
```

Adds a module to your project. Available modules:

- **SessionLocal**: Provides memory and file storage for sessions
- **Log4JS**: Adds logging capabilities using Log4JS
- **PostgreSQL**: Adds PostgreSQL database support
- **Stages**: Adds support for conversation stages

### List available modules

```bash
tgutil module:list
```

Lists all available modules that can be added to your project.

### Add a scene

```bash
tgutil scene:add <name>
```

Creates a new scene in your project with the specified name.

### Add a handler

```bash
tgutil handler:add <name>
```

Adds a new message handler to your project.

### Add a command

```bash
tgutil command:add <name>
```

Adds a new bot command to your project.

## Modules

### SessionLocal

Provides session management with different storage options:
- Memory storage (default)
- File storage (synchronous)
- Async file storage

### Log4JS

Adds logging capabilities with configurable log levels and file output.

### PostgreSQL

Adds PostgreSQL database support to your bot project.

### Stages

Adds support for conversation stages to manage complex user interactions.

## Project Structure

After initialization, your project will have the following structure:

```
your-bot/
├── index.js         # Main entry point
├── package.json     # Dependencies and scripts
├── handlers/        # Message handlers
├── commands/        # Bot commands
└── scenes/          # Conversation scenes
```

## Requirements

- Node.js 14.x or higher
- npm 6.x or higher

## License

ISC
