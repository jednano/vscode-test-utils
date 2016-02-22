import * as vscode from 'vscode';
/**
 * Opens an empty file in the workspace.
 *
 * @return Promise<vscode.Uri> A promise that resolves with the URI to
 * the empty file that was created.
 */
export declare function openEmptyFile(): Promise<vscode.Uri>;
/**
 * Creates a random file in the operating sytem's temporary directory.
 *
 * @param contents File contents.
 * @return Promise<string> A promise that resolves with the file path
 * to the file that was created.
 */
export declare function createTemporaryFile(contents: string): Promise<string>;
/**
 * Opens a file in the workspace.
 *
 * @return Promise<vscode.Uri> The URI to file that was opened.
 */
export declare function openFile(path: string): Promise<vscode.Uri>;
/**
 * Closes all files in the workspace.
 */
export declare function closeAllFiles(): Promise<void>;
