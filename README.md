# vscode-test-utils
Test utilities for Visual Studio Code.

[![Build Status](https://travis-ci.org/jedmao/vscode-test-utils.svg?branch=master)](https://travis-ci.org/jedmao/vscode-test-utils)

## API

First, reference the following type definition file.

```ts
/// <reference path="./node_modules/vscode-test-utils/.d.ts" />
import * as testUtils from 'vscode-test-utils';
```

### openEmptyFile
Asynchronously opens an empty file in the workspace.

```ts
const uri = await testUtils.openEmptyFile();
```

### createTemporaryFile
Asynchronously creates a random file in the operating system's temporary directory.

```ts
const filepath = await testUtils.createTemporaryFile(/* contents */);
```

### openFile
Asynchronously opens a file in the workspace.

```ts
const uri = await testUtils.openFile(/* filepath */);
```

### closeAllFiles
Asynchronously closes all files in the workspace.

```ts
await testUtils.closeAllFiles();
```
