import {CodeMirror} from './CodeMirror.js'

declare global {
	const expect: any
}

describe('<code-mirror>', () => {
	it('is a custom element', () => {
		const editor = document.createElement('code-mirror')
		expect(editor instanceof CodeMirror).toBe(true)
	})

	// ... TODO ...
})
