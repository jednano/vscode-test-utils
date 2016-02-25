# vscode-test-utils
Test utilities for Visual Studio Code.

[![Build Status](https://travis-ci.org/jedmao/vscode-test-utils.svg?branch=master)](https://travis-ci.org/jedmao/vscode-test-utils)

## API

```ts
import * as utils from 'vscode-test-utils`;
```

### `closeAllFiles(): Promise<void>`
Closes all files in the workspace.

### `createFile(contents: string, filename?: string): Promise<string>`
Creates a file. If `filename` is not provided, a random file is written in the operating system's temporary directory.

### `openEmptyFile(): Promise<vscode.Uri>`
Opens an empty file in the workspace.

### `openFile(path: string): Promise<vscode.Uri>`
Opens a file in the workspace.
