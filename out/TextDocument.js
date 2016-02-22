/**
 * Represents a text document, such as a source file. Text documents have
 * [lines](#TextLine) and knowledge about an underlying resource like a file.
 */
class TextDocument {
    constructor(lines) {
        this.lines = lines;
        if (!lines) {
            this.lines = [new TextLine()];
        }
    }
    /**
     * The associated URI for this document. Most documents have the __file__-scheme, indicating that they
     * represent files on disk. However, some documents may have other schemes indicating that they are not
     * available on disk.
     */
    get uri() {
        throw new Error('Not implemented');
    }
    /**
     * The file system path of the associated resource. Shorthand
     * notation for [TextDocument.uri.fsPath](#TextDocument.uri.fsPath). Independent of the uri scheme.
     */
    get fileName() {
        throw new Error('Not implemented');
    }
    /**
     * Is this document representing an untitled file.
     */
    get isUntitled() {
        throw new Error('Not implemented');
    }
    /**
     * The identifier of the language associated with this document.
     */
    get languageId() {
        throw new Error('Not implemented');
    }
    /**
     * The version number of this document (it will strictly increase after each
     * change, including undo/redo).
     */
    get version() {
        throw new Error('Not implemented');
    }
    /**
     * true if there are unpersisted changes.
     */
    get isDirty() {
        throw new Error('Not implemented');
    }
    /**
     * Save the underlying file.
     *
     * @return A promise that will resolve to true when the file
     * has been saved.
     */
    save() {
        throw new Error('Not implemented');
    }
    /**
     * The number of lines in this document.
     */
    get lineCount() {
        return this.lines.length;
    }
    lineAt(x) {
        return this.lines[(typeof x === 'number') ? x : x.line];
    }
    /**
     * Converts the position to a zero-based offset.
     *
     * The position will be [adjusted](#TextDocument.validatePosition).
     *
     * @param position A position.
     * @return A valid zero-based offset.
     */
    offsetAt(position) {
        throw new Error('Not implemented');
    }
    /**
     * Converts a zero-based offset to a position.
     *
     * @param offset A zero-based offset.
     * @return A valid [position](#Position).
     */
    positionAt(offset) {
        throw new Error('Not implemented');
    }
    /**
     * Get the text of this document. A substring can be retrieved by providing
     * a range. The range will be [adjusted](#TextDocument.validateRange).
     *
     * @param range Include only the text included by the range.
     * @return The text inside the provided range or the entire text.
     */
    getText(range) {
        const lines = this.lines.slice(range.start.line, range.end.line + 1);
        return lines.reduce((prev, cur, i) => {
            const from = (i === 0) ? range.start.character : 0;
            const length = (i === lines.length - 1) && range.end.character;
            return prev + cur.text.substring(from, length);
        }, '');
    }
    /**
     * Get a word-range at the given position. By default words are defined by
     * common separators, like space, -, _, etc. In addition, per languge custom
     * [word definitions](#LanguageConfiguration.wordPattern) can be defined.
     *
     * The position will be [adjusted](#TextDocument.validatePosition).
     *
     * @param position A position.
     * @return A range spanning a word, or `undefined`.
     */
    getWordRangeAtPosition(position) {
        throw new Error('Not implemented');
    }
    /**
     * Ensure a range is completely contained in this document.
     *
     * @param range A range.
     * @return The given range or a new, adjusted range.
     */
    validateRange(range) {
        throw new Error('Not implemented');
    }
    /**
     * Ensure a position is contained in the range of this document.
     *
     * @param position A position.
     * @return The given position or a new, adjusted position.
     */
    validatePosition(position) {
        throw new Error('Not implemented');
    }
}
exports.TextDocument = TextDocument;
//# sourceMappingURL=TextDocument.js.map