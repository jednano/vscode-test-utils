'use strict';
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
var path = require('path');
var vscode_1 = require('vscode');
var src_1 = require('../src');
suite('VS Code Test Utilities', () => {
    const allLowerCaseMatcher = /^[a-z]+$/;
    test('openEmptyFile', () => __awaiter(this, void 0, Promise, function* () {
        const uri = yield src_1.openEmptyFile();
        assert.strictEqual(vscode_1.window.activeTextEditor.document.uri.path, uri.path, 'active document URI matches returned URI');
        assert.strictEqual(vscode_1.window.activeTextEditor.document.getText(), '', 'active document text is empty');
    }));
    test('createTemporaryFile', () => __awaiter(this, void 0, Promise, function* () {
        const contents = 'foo';
        const filename = yield src_1.createTemporaryFile(contents);
        assert.strictEqual(allLowerCaseMatcher.test(path.basename(filename)), true, 'temporary file name is all lowercase');
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            assert.strictEqual(data, contents, 'written file contains expected contents');
        });
    }));
    test('openFile', () => __awaiter(this, void 0, Promise, function* () {
        const filepath = path.join(__dirname, '..', '..', 'test', 'fixtures', 'foo');
        const uri = yield src_1.openFile(filepath);
        assert.strictEqual(path.normalize(uri.path), path.normalize(filepath), 'returned URI matches expected file path');
        assert.strictEqual(vscode_1.window.activeTextEditor.document.uri.path, uri.path, 'active document URI matches returned URI');
        assert.strictEqual(vscode_1.window.activeTextEditor.document.getText(), 'bar\n', 'active document contents match file contents');
    }));
    test('closeAllFiles', () => __awaiter(this, void 0, Promise, function* () {
        assert.strictEqual(vscode_1.workspace.textDocuments.length > 0, true, 'text documents are already opened');
        yield src_1.closeAllFiles();
        assert.strictEqual(vscode_1.workspace.textDocuments.length, 0, 'all text documents are closed');
    }));
});
//# sourceMappingURL=index.test.js.map