import { Element, type ElementAttributes } from '@lume/element';
import { EditorView } from '@codemirror/view';
import { LanguageSupport } from '@codemirror/language';
import { type Extension } from '@codemirror/state';
export type CodeMirrorAttributes = 'basicSetup' | 'content' | 'stripIndent' | 'trim' | 'language' | 'stylesheet' | 'theme' | 'extensions';
declare const CodeMirror_base: (new (...a: any[]) => {
    "__#1@#effects": Set<import("classy-solid").Effect>;
    createEffect(fn: () => void): void;
    stopEffects(): void;
    "__#1@#createEffect1"(fn: () => void): void;
    "__#1@#stopEffects1"(): void;
    "__#1@#owner": import("solid-js").Owner | null;
    "__#1@#dispose": (() => void) | null;
    "__#1@#createEffect2"(fn: () => void): void;
    "__#1@#stopEffects2"(): void;
}) & typeof Element;
export declare class CodeMirror extends CodeMirror_base {
    #private;
    /** When true (when the attribute exists), CM's basicSetup will be applied. */
    basicSetup: boolean;
    /** A string to set the content of the editor to. */
    content: string;
    /**
     * When true (default) common indentation will be removed. Useful for
     * example if the `content` property is being set with a template string and
     * the content is indented to make the outer code more readable but the
     * indentation is undersired in the result. Set the attribute
     * `strip-indent="false"` to disable.
     */
    stripIndent: boolean;
    /**
     * When true (default) trims leading and trailing whitespace from `content`.
     */
    trim: boolean;
    /**
     * The language to use. It should be a LanguageSupport object, an empty
     * extension (for plain text mode), or the strings "html", "js", or "text"
     * which are shortcuts for `html()`, `javascript()`, and `[]`, respectively.
     * Defaults to "js".
     */
    language: 'html' | 'js' | 'text' | LanguageSupport;
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
    stylesheet: string | HTMLStyleElement | HTMLLinkElement | CSSStyleSheet;
    /** The theme extension to use. Defaults to `noctisLilac`. */
    theme: Extension;
    /** Any additional extensions can be supplied here as an array. */
    extensions: Extension[];
    /** The CodeMirror `EditorView` instance. It will be undefined until the `<code-mirror>` element is connected. */
    get editorView(): EditorView | undefined;
    /** Shortcut for getting the current text content as a string. */
    get currentContent(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    template: () => Node | Node[];
    css: string;
}
declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            'code-mirror': ElementAttributes<CodeMirror, CodeMirrorAttributes>;
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'code-mirror': CodeMirror;
    }
}
export {};
//# sourceMappingURL=CodeMirror.d.ts.map