import * as assert from 'assert'
import * as os from 'os'
import * as path from 'path'
import { Uri, window, workspace } from 'vscode'

import { closeAllFiles, createFile, openEmptyFile, openFile } from '../..'

suite('VS Code Test Utilities', () => {
	const allLowerCaseMatcher = /^[a-z]+$/

	test('openEmptyFile', async () => {
		const uri = await openEmptyFile()
		assert.strictEqual(
			window.activeTextEditor.document.uri.path.toLowerCase(),
			uri.path.toLowerCase(),
			'active document URI matches returned URI',
		)
		assert.strictEqual(
			window.activeTextEditor.document.getText(),
			'',
			'active document text is empty',
		)
	})

	test('createFile', async () => {
		const contents = 'foo'
		let uri = await createFile(contents)
		assert.strictEqual(
			allLowerCaseMatcher.test(path.basename(uri.fsPath)),
			true,
			'temporary file name is all lowercase',
		)
		assert.strictEqual(
			(await workspace.fs.readFile(uri)).toString(),
			contents,
			'written file contains expected contents',
		)
		uri = await createFile(contents, 'bar')
		assert.strictEqual(
			path.basename(uri.fsPath),
			'bar',
			'file name matches provided file name',
		)
		assert.strictEqual(
			(await workspace.fs.readFile(uri)).toString(),
			contents,
			'written file (bar) contains expected contents',
		)
	})

	test('openFile', async () => {
		const filepath = path.join(
			__dirname,
			'..',
			'..',
			'test',
			'suite',
			'fixtures',
			'foo',
		)
		const uri = await openFile(Uri.file(filepath))
		assert.strictEqual(
			path.normalize(
				os.platform() === 'win32' ? uri.path.substr(1) : uri.path,
			),
			path.normalize(filepath),
			'returned URI matches expected file path',
		)
		assert.strictEqual(
			window.activeTextEditor.document.uri.path,
			uri.path,
			'active document URI matches returned URI',
		)
		assert.strictEqual(
			window.activeTextEditor.document.getText(),
			'bar\n',
			'active document contents match file contents',
		)
	})

	test('closeAllFiles', async () => {
		assert.strictEqual(
			window.visibleTextEditors.length > 0,
			true,
			'text documents are already opened',
		)
		await closeAllFiles()
		assert.strictEqual(
			window.visibleTextEditors.length,
			0,
			'all text documents are not closed',
		)
		assert.strictEqual(
			!window.activeTextEditor,
			true,
			'active text editor still exists',
		)
	})
})
