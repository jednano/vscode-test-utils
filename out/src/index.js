var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var assert = require('assert');
var fs = require('fs');
var os = require('os');
var path = require('path');
var vscode = require('vscode');
var vscode_1 = require('vscode');
/**
 * Opens an empty file in the workspace.
 *
 * @return Promise<vscode.Uri> A promise that resolves with the URI to
 * the empty file that was created.
 */
function openEmptyFile() {
    return __awaiter(this, void 0, Promise, function* () {
        const uri = yield createTemporaryFile('');
        return yield openFile(uri);
    });
}
exports.openEmptyFile = openEmptyFile;
/**
 * Creates a random file in the operating sytem's temporary directory.
 *
 * @param contents File contents.
 * @return Promise<string> A promise that resolves with the file path
 * to the file that was created.
 */
function createTemporaryFile(contents) {
    return __awaiter(this, void 0, Promise, function* () {
        const tempFile = path.join(os.tmpdir(), randomName());
        try {
            yield fs.writeFile(tempFile, contents);
        }
        catch (error) {
            throw error;
        }
        return tempFile;
        function randomName() {
            return Math.random().toString(36)
                .replace(/[^a-z]+/g, '')
                .substr(0, 10);
        }
    });
}
exports.createTemporaryFile = createTemporaryFile;
/**
 * Opens a file in the workspace.
 *
 * @return Promise<vscode.Uri> The URI to file that was opened.
 */
function openFile(path) {
    return __awaiter(this, void 0, Promise, function* () {
        const uri = vscode.Uri.file(path);
        yield vscode_1.window.showTextDocument(yield vscode_1.workspace.openTextDocument(uri));
        assert.ok(vscode_1.window.activeTextEditor);
        return uri;
    });
}
exports.openFile = openFile;
/**
 * Closes all files in the workspace.
 */
function closeAllFiles() {
    return __awaiter(this, void 0, Promise, function* () {
        return new Promise((resolve, reject) => {
            if (vscode_1.window.visibleTextEditors.length === 0) {
                return resolve();
            }
            const interval = setInterval(() => {
                if (vscode_1.window.visibleTextEditors.length > 0) {
                    return;
                }
                clearInterval(interval);
                resolve();
            }, 10);
            vscode_1.commands.executeCommand('workbench.action.closeAllEditors')
                .then(() => vscode_1.commands.executeCommand('workbench.files.action.closeAllFiles'))
                .then(null, err => {
                clearInterval(interval);
                reject(err);
            });
        }).then(() => {
            assert.equal(vscode_1.window.visibleTextEditors.length, 0);
            assert(!vscode_1.window.activeTextEditor);
        });
    });
}
exports.closeAllFiles = closeAllFiles;
//# sourceMappingURL=index.js.map