# GitHub README Documentation for File Command Processor

## Overview

This Node.js application is designed to manage files based on commands specified in a text file. It utilizes the `fs/promises` module for asynchronous file operations, allowing users to create, delete, rename, and append data to files dynamically by modifying the `command.txt` file.

## Features

- **File Management**: Create, delete, rename, and append data to files.
- **Command Listening**: Automatically listens for changes in the command file and executes the corresponding file operation.
- **Error Handling**: Robust error handling for file operations.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deXcripter/node.js
   cd node.js
   ```

2. Install dependencies if any

```bash
npm install
```

3. Ensure you have Node.js installed (version 12 or higher).

## Usage

    Setup: Create a directory named files in the root of the project if it does not exist. The application will automatically create it if it is missing.
    Command File: Create a command.txt file in the root directory with commands formatted as follows:
      - To create a file: create_file <filename>
      - To delete a file: delete_file <filename>
      - To rename a file: rename_file <old_filename> <new_filename>
      - To add data to a file: add_to_file <filename> <data>
    Run the Application:
    Execute the script using Node.js:

```bash
node index.js
```

## Commands

Commands
Command Description

| Commands    | Commands Description             |
| ----------- | -------------------------------- |
| create_file | Creates a new file               |
| delete_file | Deletes an existing file         |
| rename_file | Renames an existing file         |
| add_to_file | Appends data to an existing file |
