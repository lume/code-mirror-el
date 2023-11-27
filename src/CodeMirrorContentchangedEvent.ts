import type {EditorView} from 'codemirror'

export class CodeMirrorContentchangedEvent extends Event {
	/**
	 * The underlying CodeMirror EditorView instance.
	 */
	view

	/**
	 * A shortcut for getting the document as a string. This can be slow if
	 * there are a lot of lines to concatenate, so that's why this is a getter
	 * and not calculated up-front with every event: use it only when needed
	 * (and debounce it if needed).
	 */
	get content() {
		return this.view.state.doc.toString()
	}

	constructor(view: EditorView) {
		super('contentchanged')
		this.view = view
	}
}
