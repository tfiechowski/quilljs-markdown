import QuillMarkdown, { AbstractTag } from './src/app'

if (typeof window !== 'undefined') {
  window.QuillMarkdown = QuillMarkdown
}

export default QuillMarkdown

export { AbstractTag }
