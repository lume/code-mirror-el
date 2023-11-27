var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { Element, booleanAttribute, element, stringAttribute } from '@lume/element';
import html from 'solid-js/html';
import { onCleanup } from 'solid-js';
import { signal, Effectful } from 'classy-solid';
import { EditorView } from '@codemirror/view';
import { javascript as jsLang } from '@codemirror/lang-javascript';
import { html as htmlLang } from '@codemirror/lang-html';
import { LanguageSupport } from '@codemirror/language';
import { Compartment } from '@codemirror/state';
import { noctisLilac as theme } from '@uiw/codemirror-theme-noctis-lilac';
import { stripIndent } from './stripIndent.js';
import { CodeMirrorContentchangedEvent } from './CodeMirrorContentchangedEvent.js';
let CodeMirror = (() => {
    let _classDecorators = [element('code-mirror')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Effectful(Element);
    let _instanceExtraInitializers = [];
    let _basicSetup_decorators;
    let _basicSetup_initializers = [];
    let _content_decorators;
    let _content_initializers = [];
    let _stripIndent_decorators;
    let _stripIndent_initializers = [];
    let _trim_decorators;
    let _trim_initializers = [];
    let _language_decorators;
    let _language_initializers = [];
    let _stylesheet_decorators;
    let _stylesheet_initializers = [];
    let _theme_decorators;
    let _theme_initializers = [];
    let _extensions_decorators;
    let _extensions_initializers = [];
    var CodeMirror = class extends _classSuper {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _basicSetup_decorators = [booleanAttribute];
            _content_decorators = [stringAttribute];
            _stripIndent_decorators = [booleanAttribute];
            _trim_decorators = [booleanAttribute];
            _language_decorators = [stringAttribute];
            _stylesheet_decorators = [stringAttribute];
            _theme_decorators = [signal];
            _extensions_decorators = [signal];
            __esDecorate(null, null, _basicSetup_decorators, { kind: "field", name: "basicSetup", static: false, private: false, access: { has: obj => "basicSetup" in obj, get: obj => obj.basicSetup, set: (obj, value) => { obj.basicSetup = value; } }, metadata: _metadata }, _basicSetup_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: obj => "content" in obj, get: obj => obj.content, set: (obj, value) => { obj.content = value; } }, metadata: _metadata }, _content_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _stripIndent_decorators, { kind: "field", name: "stripIndent", static: false, private: false, access: { has: obj => "stripIndent" in obj, get: obj => obj.stripIndent, set: (obj, value) => { obj.stripIndent = value; } }, metadata: _metadata }, _stripIndent_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _trim_decorators, { kind: "field", name: "trim", static: false, private: false, access: { has: obj => "trim" in obj, get: obj => obj.trim, set: (obj, value) => { obj.trim = value; } }, metadata: _metadata }, _trim_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: obj => "language" in obj, get: obj => obj.language, set: (obj, value) => { obj.language = value; } }, metadata: _metadata }, _language_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _stylesheet_decorators, { kind: "field", name: "stylesheet", static: false, private: false, access: { has: obj => "stylesheet" in obj, get: obj => obj.stylesheet, set: (obj, value) => { obj.stylesheet = value; } }, metadata: _metadata }, _stylesheet_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _theme_decorators, { kind: "field", name: "theme", static: false, private: false, access: { has: obj => "theme" in obj, get: obj => obj.theme, set: (obj, value) => { obj.theme = value; } }, metadata: _metadata }, _theme_initializers, _instanceExtraInitializers);
            __esDecorate(null, null, _extensions_decorators, { kind: "field", name: "extensions", static: false, private: false, access: { has: obj => "extensions" in obj, get: obj => obj.extensions, set: (obj, value) => { obj.extensions = value; } }, metadata: _metadata }, _extensions_initializers, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            CodeMirror = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        /** When true (when the attribute exists), CM's basicSetup will be applied. */
        basicSetup = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _basicSetup_initializers, false
        /** A string to set the content of the editor to. */
        ));
        /** A string to set the content of the editor to. */
        content = __runInitializers(this, _content_initializers, ''
        /**
         * When true (default) common indentation will be removed. Useful for
         * example if the `content` property is being set with a template string and
         * the content is indented to make the outer code more readable but the
         * indentation is undersired in the result. Set the attribute
         * `strip-indent="false"` to disable.
         */
        );
        /**
         * When true (default) common indentation will be removed. Useful for
         * example if the `content` property is being set with a template string and
         * the content is indented to make the outer code more readable but the
         * indentation is undersired in the result. Set the attribute
         * `strip-indent="false"` to disable.
         */
        stripIndent = __runInitializers(this, _stripIndent_initializers, true
        /**
         * When true (default) trims leading and trailing whitespace from `content`.
         */
        );
        /**
         * When true (default) trims leading and trailing whitespace from `content`.
         */
        trim = __runInitializers(this, _trim_initializers, true
        /**
         * The language to use. It should be a LanguageSupport object, an empty
         * extension (for plain text mode), or the strings "html", "js", or "text"
         * which are shortcuts for `html()`, `javascript()`, and `[]`, respectively.
         * Defaults to "js".
         */
        );
        /**
         * The language to use. It should be a LanguageSupport object, an empty
         * extension (for plain text mode), or the strings "html", "js", or "text"
         * which are shortcuts for `html()`, `javascript()`, and `[]`, respectively.
         * Defaults to "js".
         */
        language = __runInitializers(this, _language_initializers, 'text'
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
        );
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
        stylesheet = __runInitializers(this, _stylesheet_initializers, ''
        /** The theme extension to use. Defaults to `noctisLilac`. */
        );
        /** The theme extension to use. Defaults to `noctisLilac`. */
        theme = __runInitializers(this, _theme_initializers, theme
        /** Any additional extensions can be supplied here as an array. */
        );
        /** Any additional extensions can be supplied here as an array. */
        extensions = __runInitializers(this, _extensions_initializers, []);
        #editorView;
        /** The CodeMirror `EditorView` instance. It will be undefined until the `<code-mirror>` element is connected. */
        get editorView() {
            return this.#editorView;
        }
        /** Shortcut for getting the current text content as a string. */
        get currentContent() {
            return this.#editorView?.state.doc.toString() ?? '';
        }
        #container;
        connectedCallback() {
            super.connectedCallback();
            const basicConf = new Compartment();
            const languageConf = new Compartment();
            const themeConf = new Compartment();
            const userConf = new Compartment();
            this.#editorView = new EditorView({
                parent: this.#container,
                extensions: [
                    basicConf.of([]),
                    languageConf.of([]),
                    themeConf.of(this.theme),
                    userConf.of([]),
                    EditorView.updateListener.of(v => {
                        if (v.docChanged)
                            this.dispatchEvent(new CodeMirrorContentchangedEvent(this.#editorView));
                    }),
                ],
            });
            this.createEffect(() => {
                let cleaned = false;
                if (this.basicSetup) {
                    import('codemirror').then(({ basicSetup }) => {
                        if (cleaned)
                            return;
                        this.#editorView.dispatch({ effects: basicConf.reconfigure(basicSetup) });
                    });
                    onCleanup(() => (cleaned = true));
                }
                else {
                    this.#editorView.dispatch({ effects: basicConf.reconfigure([]) });
                }
            });
            this.createEffect(() => {
                const lang = this.language === 'html'
                    ? htmlLang()
                    : this.language === 'js'
                        ? jsLang()
                        : this.language === 'text'
                            ? []
                            : this.language;
                if (!((Array.isArray(lang) && !lang.length) || lang instanceof LanguageSupport))
                    throw new TypeError('Unsupported language value: ' + lang);
                this.#editorView.dispatch({ effects: languageConf.reconfigure(lang) });
            });
            this.createEffect(() => {
                // special case for the default theme
                if (this.theme === theme) {
                    const sheet = new CSSStyleSheet();
                    sheet.replaceSync(/*css*/ `
					.cm-activeLine {
						/* The color from noctisLilac with an additional 0.4 opacity value */
						background-color: rgba(225, 222, 243, 0.4) !important;
					}
				`);
                    addStyleSheet(this.shadowRoot, sheet);
                    onCleanup(() => removeStyleSheet(this.shadowRoot, sheet));
                }
                this.#editorView.dispatch({ effects: themeConf.reconfigure(this.theme) });
            });
            this.createEffect(() => this.#editorView.dispatch({ effects: userConf.reconfigure(this.extensions) }));
            this.createEffect(() => this.#applyContent(this.content));
            this.createEffect(() => {
                if (!this.content)
                    this.#loadCodeFromTemplate();
            });
            this.createEffect(() => {
                const style = this.stylesheet;
                if (typeof style === 'string') {
                    const sheet = new CSSStyleSheet();
                    sheet.replaceSync(style);
                    addStyleSheet(this.shadowRoot, sheet);
                    onCleanup(() => removeStyleSheet(this.shadowRoot, sheet));
                }
                else if (style instanceof HTMLElement) {
                    this.shadowRoot.append(style);
                    onCleanup(() => style.remove());
                }
                else {
                    addStyleSheet(this.shadowRoot, style);
                    onCleanup(() => removeStyleSheet(this.shadowRoot, style));
                }
            });
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.stopEffects();
            this.#editorView.destroy();
        }
        #loadCodeFromTemplate() {
            const template = this.children[0]; // only child must be <template>
            if (!(template instanceof HTMLTemplateElement))
                return;
            let content = '';
            if (this.language === 'js')
                content = template.content.firstElementChild?.textContent ?? '';
            else
                content = template.innerHTML;
            this.#applyContent(content);
        }
        #applyContent(content) {
            if (this.stripIndent)
                content = stripIndent(content);
            if (this.trim)
                content = content.trim();
            setContent(this.#editorView, content);
        }
        template = () => html `<div id="container" ref=${(e) => (this.#container = e)}></div>`;
        css = /*css*/ `
		#container {
			height: 100%;
		}

		.cm-editor {
			height: 100%;
		}
	`;
    };
    return CodeMirror = _classThis;
})();
export { CodeMirror };
function setContent(view, content) {
    const transaction = view.state.update({ changes: { from: 0, to: view.state.doc.length, insert: content } });
    view.dispatch(transaction);
}
function addStyleSheet(root, sheet) {
    root.adoptedStyleSheets.push(sheet);
}
function removeStyleSheet(root, sheet) {
    root.adoptedStyleSheets = root.adoptedStyleSheets.filter(s => sheet !== s);
}
//# sourceMappingURL=CodeMirror.js.map