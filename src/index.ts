import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as vscode from 'vscode';
import {
	commands,
	window,
	workspace
} from 'vscode';

/**
 * Opens an empty file in the workspace.
 *
 * @return Promise<vscode.Uri> A promise that resolves with the URI to
 * the empty file that was created.
 */
export async function openEmptyFile() {
	const uri = await createTemporaryFile('');
	return await openFile(uri);
}

/**
 * Creates a random file in the operating sytem's temporary directory.
 *
 * @param contents File contents.
 * @return Promise<string> A promise that resolves with the file path
 * to the file that was created.
 */
export async function createTemporaryFile(contents: string) {
	const tempFile = path.join(os.tmpdir(), randomName());

	try {
		await fs.writeFile(tempFile, contents);
	} catch (error) {
		throw error;
	}

	return tempFile;

	function randomName() {
		return Math.random().toString(36)
			.replace(/[^a-z]+/g, '')
			.substr(0, 10);
	}
}

/**
 * Opens a file in the workspace.
 *
 * @return Promise<vscode.Uri> The URI to file that was opened.
 */
export async function openFile(path: string) {
	const uri = vscode.Uri.file(path);

	await window.showTextDocument(
		await workspace.openTextDocument(uri)
	);

	assert.ok(window.activeTextEditor);

	return uri;
}

/**
 * Closes all files in the workspace.
 */
export async function closeAllFiles() {
	return new Promise((resolve, reject) => {
		if (window.visibleTextEditors.length === 0) {
			return resolve();
		}

		const interval = setInterval(() => {
			if (window.visibleTextEditors.length > 0) {
				return;
			}

			clearInterval(interval);
			resolve();
		}, 10);

		commands.executeCommand('workbench.action.closeAllEditors')
			.then(() => commands.executeCommand('workbench.files.action.closeAllFiles'))
			.then(null, err => {
				clearInterval(interval);
				reject(err);
			});
	}).then(() => {
		assert.equal(window.visibleTextEditors.length, 0);
		assert(!window.activeTextEditor);
	});
}
