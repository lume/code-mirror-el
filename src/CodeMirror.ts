import {Element, booleanAttribute, element, stringAttribute, type ElementAttributes} from '@lume/element'
import html from 'solid-js/html'
import {onCleanup} from 'solid-js'
import {signal, Effectful} from 'classy-solid'
import {EditorView} from '@codemirror/view'
import {javascript as jsLang} from '@codemirror/lang-javascript'
import {html as htmlLang} from '@codemirror/lang-html'
import {LanguageSupport} from '@codemirror/language'
import {type Extension, Compartment} from '@codemirror/state'
import {noctisLilac as theme} from '@uiw/codemirror-theme-noctis-lilac'
import {stripIndent} from './stripIndent.js'
import {CodeMirrorContentchangedEvent} from './CodeMirrorContentchangedEvent.js'

export type CodeMirrorAttributes =
	| 'basicSetup'
	| 'content'
	| 'stripIndent'
	| 'trim'
	| 'language'
	| 'stylesheet'
	| 'theme'
	| 'extensions'

export
@element('code-mirror')
class CodeMirror extends Effectful(Element) {
	/** When true (when the attribute exists), CM's basicSetup will be applied. */
	@booleanAttribute basicSetup = false

	/** A string to set the content of the editor to. */
	@stringAttribute content = ''

	/**
	 * When true (default) common indentation will be removed. Useful for
	 * example if the `content` property is being set with a template string and
	 * the content is indented to make the outer code more readable but the
	 * indentation is undersired in the result. Set the attribute
	 * `strip-indent="false"` to disable.
	 */
	@booleanAttribute stripIndent = true

	/**
	 * When true (default) trims leading and trailing whitespace from `content`.
	 */
	@booleanAttribute trim = true

	/**
	 * The language to use. It should be a LanguageSupport object, an empty
	 * extension (for plain text mode), or the strings "html", "js", or "text"
	 * which are shortcuts for `html()`, `javascript()`, and `[]`, respectively.
	 * Defaults to "js".
	 */
	@stringAttribute language: 'html' | 'js' | 'text' | LanguageSupport = 'text'

	/**
	 * CSS styles to apply in <code-mirror>'s ShadowRoot. Useful for overriding
	 * CM styles. Defaults to a style that hard codes the activeLine style to
	 * overcome issues with selections not being visible on the active line
	 * (https://github.com/vadimdemedes/thememirror/issues/8).
	 *
	 * The value can be
	 *
	 * - a string containing CSS code
	 * - a `<style>` element containing CSS code
	 * - a `<link>` element linking to a CSS file
	 * - a `CSSStyleSheet` instance
	 */
	@stringAttribute stylesheet: string | HTMLStyleElement | HTMLLinkElement | CSSStyleSheet = ''

	/** The theme extension to use. Defaults to `noctisLilac`. */
	@signal theme: Extension = theme

	/** Any additional extensions can be supplied here as an array. */
	@signal extensions: Extension[] = []

	#editorView?: EditorView

	/** The CodeMirror `EditorView` instance. It will be undefined until the `<code-mirror>` element is connected. */
	get editorView() {
		return this.#editorView
	}

	/** Shortcut for getting the current text content as a string. */
	get currentContent() {
		return this.#editorView?.state.doc.toString() ?? ''
	}

	#container!: HTMLDivElement

	override connectedCallback() {
		super.connectedCallback()

		const basicConf = new Compartment()
		const languageConf = new Compartment()
		const themeConf = new Compartment()
		const userConf = new Compartment()

		this.#editorView = new EditorView({
			parent: this.#container,
			extensions: [
				basicConf.of([]),
				languageConf.of([]),
				themeConf.of(this.theme),
				userConf.of([]),
				EditorView.updateListener.of(v => {
					if (v.docChanged) this.dispatchEvent(new CodeMirrorContentchangedEvent(this.#editorView!))
				}),
			],
		})

		this.createEffect(() => {
			let cleaned = false
			if (this.basicSetup) {
				import('codemirror').then(({basicSetup}) => {
					if (cleaned) return
					this.#editorView!.dispatch({effects: basicConf.reconfigure(basicSetup)})
				})
				onCleanup(() => (cleaned = true))
			} else {
				this.#editorView!.dispatch({effects: basicConf.reconfigure([])})
			}
		})

		this.createEffect(() => {
			const lang =
				this.language === 'html'
					? htmlLang()
					: this.language === 'js'
					? jsLang()
					: this.language === 'text'
					? []
					: this.language

			if (!((Array.isArray(lang) && !lang.length) || lang instanceof LanguageSupport))
				throw new TypeError('Unsupported language value: ' + lang)

			this.#editorView!.dispatch({effects: languageConf.reconfigure(lang)})
		})

		this.createEffect(() => {
			// special case for the default theme
			if (this.theme === theme) {
				const sheet = new CSSStyleSheet()
				sheet.replaceSync(/*css*/ `
					.cm-activeLine {
						/* The color from noctisLilac with an additional 0.4 opacity value */
						background-color: rgba(225, 222, 243, 0.4) !important;
					}
				`)
				addStyleSheet(this.shadowRoot!, sheet)
				onCleanup(() => removeStyleSheet(this.shadowRoot!, sheet))
			}

			this.#editorView!.dispatch({effects: themeConf.reconfigure(this.theme)})
		})

		this.createEffect(() => this.#editorView!.dispatch({effects: userConf.reconfigure(this.extensions)}))

		this.createEffect(() => this.#applyContent(this.content))

		this.createEffect(() => {
			if (!this.content) this.#loadCodeFromTemplate()
		})

		this.createEffect(() => {
			const style = this.stylesheet

			if (typeof style === 'string') {
				const sheet = new CSSStyleSheet()
				sheet.replaceSync(style)
				addStyleSheet(this.shadowRoot!, sheet)
				onCleanup(() => removeStyleSheet(this.shadowRoot!, sheet))
			} else if (style instanceof HTMLElement) {
				this.shadowRoot!.append(style)
				onCleanup(() => style.remove())
			} else {
				addStyleSheet(this.shadowRoot!, style)
				onCleanup(() => removeStyleSheet(this.shadowRoot!, style))
			}
		})
	}

	override disconnectedCallback() {
		super.disconnectedCallback()
		this.stopEffects()
		this.#editorView!.destroy()
	}

	#loadCodeFromTemplate() {
		const template = this.children[0] // only child must be <template>
		if (!(template instanceof HTMLTemplateElement)) return
		let content = ''
		if (this.language === 'js') content = template.content.firstElementChild?.textContent ?? ''
		else content = template.innerHTML
		this.#applyContent(content)
	}

	#applyContent(content: string) {
		if (this.stripIndent) content = stripIndent(content)
		if (this.trim) content = content.trim()
		setContent(this.#editorView!, content)
	}

	override template = () => html`<div id="container" ref=${(e: HTMLDivElement) => (this.#container = e)}></div>`

	override css = /*css*/ `
		#container {
			height: 100%;
		}

		.cm-editor {
			height: 100%;
		}
	`
}

declare module 'solid-js' {
	namespace JSX {
		interface IntrinsicElements {
			'code-mirror': ElementAttributes<CodeMirror, CodeMirrorAttributes>
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'code-mirror': CodeMirror
	}
}

function setContent(view: EditorView, content: string) {
	const transaction = view.state.update({changes: {from: 0, to: view.state.doc.length, insert: content}})
	view.dispatch(transaction)
}

function addStyleSheet(root: ShadowRoot, sheet: CSSStyleSheet) {
	root.adoptedStyleSheets.push(sheet)
}

function removeStyleSheet(root: ShadowRoot, sheet: CSSStyleSheet) {
	root.adoptedStyleSheets = root.adoptedStyleSheets.filter(s => sheet !== s)
}
