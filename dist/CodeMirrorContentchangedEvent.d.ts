import type { EditorView } from 'codemirror';
export declare class CodeMirrorContentchangedEvent extends Event {
    /**
     * The underlying CodeMirror EditorView instance.
     */
    view: EditorView;
    /**
     * A shortcut for getting the document as a string. This can be slow if
     * there are a lot of lines to concatenate, so that's why this is a getter
     * and not calculated up-front with every event: use it only when needed
     * (and debounce it if needed).
     */
    get content(): string;
    constructor(view: EditorView);
}
//# sourceMappingURL=CodeMirrorContentchangedEvent.d.ts.map