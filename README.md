# `<code-mirror>` element

A customizeable `<code-mirror>` element that makes a code editor powered by CodeMirror.

<img width="624" alt="Screenshot 2024-05-01 at 4 21 26 PM" src="https://github.com/lume/code-mirror-el/assets/297678/b5176d8a-7029-4683-b741-2eab641677f9">

Use it declaratively in plain HTML, or with web frameworks and libraries like Lit, Vue, Svelte, Solid.js, Angular, Ember, jQuery, React, and all others.

<h4><code><strong>npm install @lume/element</strong></code></h4>

## Live demos

- [Example on CodePen](https://codepen.io/trusktr/pen/poGZYOy?editors=1000)
- [Examples in Lume's Docs](https://docs.lume.io)

## Usage Example

Use `<code-mirror>` to create a text editor:

```html
<code-mirror
	id="editor"
	basic-setup
	language="html"
	stylesheet="
		/* Override the active line background color. */
		.cm-activeLine {
			background-color: #ff660044 !important
		}
	"
>
	<template>
		<h1>This is HTML content that will appear in the text editor.</h1>
		<p>This is a paragraph that you'll be able to edit.</p>
	</template>
</code-mirror>
```

For more usage examples, see [./examples/index.html](./examples/index.html). To
run the examples, clone the repo, then run `npm install && npm run examples`.

<details><summary><h2>Install and Setup</h2></summary>

> **STUB:** This section needs expansion, but should be enough for anyone
> familiar with common build tooling in the webdev/JS ecosystem. Contributions
> very welcome!

<details><summary><h3>CDN method (no compiler or command line knowledge needed)</h3></summary>

Follow the guide on [installing `lume` from
CDN](https://docs.lume.io/guide/install/?id=cdn-easiest), but simply replace
`lume` with `code-mirror-el`. The process is otherwise the same.

Here's a [live example on
CodePen](https://codepen.io/trusktr/pen/poGZYOy?editors=1000) based on those
instructions.

</details>

<details><summary><h3>Local install</h3></summary>

This assumes some familiarity with command lines and JavScript build tools.

First make sure you've installed Node.js so that we have the `npm` package manager avaiable.

Install the `code-mirror-el` package using the following in a terminal:

```sh
npm install code-mirror-el
```

Now, `import` into your project and start using the element in HTML, JSX, `html` template tags, etc.

```js
import 'code-mirror-el'

// Ready to use
```

Optionally import the classes (especially useful for type annotations in TypeScript).

```js
import {CodeMirror, CodeMirrorContentchangedEvent} from 'code-mirror-el'

const editor = document.querySelector('#editor') as CodeMirror

editor.addEventListener('contentchanged', (event: CodeMirrorContentchangedEvent) => {
  // ...
})
```

</details>

</details>

## Basic Usage

See the [example on CodePen](https://codepen.io/trusktr/pen/poGZYOy?editors=1000).

## TypeScript

### With Solid.js JSX

If you've configured [Solid.js](https://solidjs.com) for use with TypeScript,
then simply importing `code-mirror-el` will register the JSX types for use
in Solid.js JSX templates.

```tsx
import {createSignal} from 'solid-js'
import 'code-mirror-el' // This is all that is needed.

function SomeComponent() {
	const [content, setContent] = createSignal('...')
	// ...
	return <code-mirror basic-setup language="js" content={content()} theme={someTheme}></code-mirror>
}
```

### With React/Preact JSX

To get type checking in React JSX templates (or Preact JSX with React compat
enabled in your tsconfig), import the React JSX types directly, as they will not
be defined automatically like JSX types for Solid.js.

> [!Note]
> React still does not yet have syntax for sending non-string data via JS
> properties to custom elements, so you _must_ use a ref for that in React.

```tsx
import {useState, useRef, useEffect} from 'react'
import 'code-mirror-el'
// Import JSX types specifically for React (or Preact with React compat enabled in
// your tsconfig).
import type {} from 'code-mirror-el/dist/CodeMirror.react-jsx'

function SomeComponent() {
	const [content, setContent] = useState('...')
	// ...
	return <code-mirror basic-setup language="js" content={content}></code-mirror>
}
```

Note that in React 18 and below, all types are simply strings, and for
multi-word properties use the dash-case attribute name. In React 19 and higher
with improved Custom Elements support for setting element JS properties, use the
camelCase prop names with full non-string type support.

React <= 18:

```jsx
const styleString = '...CSS code here...'
return <code-mirror basic-setup language="js" content={content} stylesheet={styleString}></code-mirror>
```

React >= 19:

```jsx
// This will not work in React 18 and below!
const styleSheet = new CSSStyleSheet()
stylesheet.replaceSync('...CSS code here...')
return <code-mirror basicSetup language="js" content={content} stylesheet={styleSheet}></code-mirror>
```

## `<code-mirror>` API

### Attributes/Properties

> [!Note]
> Attributes in dash-case have an equivalent camelCase JS property. F.e. the
> `strip-indent` attribute maps its value to a `stripIndent` property.

> [!Note]
> Any non-string or non-boolean values described below are passed to the JS property directly,
> not to the attribute.

#### `basic-setup`

When true (when the attribute exists), CM's `basicSetup` will be applied.

Note, use `basicSetup` in React 19+.

#### `content`

A string to set the content of the editor to.

#### `strip-indent`

When true (default) common indentation will be removed. Useful for
example if the `content` property is being set with a template string and
the content is indented to make the outer code more readable but the
indentation is undersired in the result inside the editor. Set the attribute
`strip-indent="false"` to disable.

Note, use `stripIndent` in React 19+.

#### `trim`

When true (default) trims leading and trailing whitespace from `content`.

#### `language`

The language to use. It should be a LanguageSupport object, an empty
extension (for plain text mode), or the strings "html", "js", or "text"
which are shortcuts for `html()`, `javascript()`, and `[]`, respectively.
Defaults to "js".

#### `stylesheet`

CSS styles to apply in `<code-mirror>`'s ShadowRoot. Useful for overriding
CM styles. Defaults to a style that hard codes the activeLine style to
overcome issues with selections not being visible on the active line
(https://github.com/vadimdemedes/thememirror/issues/8).

The value can be

- a string containing CSS code
- a `<style>` element containing CSS code
- a `<link>` element linking to a CSS file
- a `CSSStyleSheet` instance

#### `theme`

**JS Property only.** The theme extension to use. Defaults to `noctisLilac`.

#### `extensions`

**JS Property only.** Any additional CodeMirror Extensions can be supplied here as an array.

#### `editorView`

**JS Property only.** Readonly. The CodeMirror `EditorView` instance. It will be undefined until the `<code-mirror>` element is connected.

#### `currentContent`

**JS Property only.** Readonly. Shortcut for getting the current text content as a string.

### Children

The element takes no children except for a `<template>` element to specify
content for the editor. The `content` attribute/property takes precendence over
this, and `<template>` content will only be used if `content` is not set (i.e.
when `content` is an empty string, which is the default).

When `language` is set to `"js"`, content is taken from a `<script>` child of
the `<template>`, otherwise content is taken from the template content. See
`examples/index.html` for examples of both.

### Events

#### `contentchanged`

The `<code-mirror>` element emits a `contentchanged` event (a
`CodeMirrorContentchangedEvent` object) whenever content of the editor changes.
The event has the following propeties beyond those from its base `Event` class:

- `view` - The CodeMirror `EditorView`
- `content` - Readonly getter that returns a string of the document content. Use sparingly if there are lots of lines (f.e. debounced).

## Resources

See [`CodeMirror`](https://codemirror.net) for the JavaScript API powering the
underlying editor.

`<code-mirror>` is written with
[`@lume/element`](https://github.com/lume/element), a custom element library
with templating and reactivity powered by Solid.js. Also see
https://solid.js.com, https://primitives.solidjs.community, and
https://github.com/lume/classy-solid for APIs that are useful with
`@lume/element`.
