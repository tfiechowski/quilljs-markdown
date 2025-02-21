  import AbstractTag from '../../src/tags/AbstractTag'
  import meta from './meta'

  class CustomTag extends AbstractTag {
    constructor (quillJS, options = {}) {
      super()
      this.quillJS = quillJS
      this.name = 'custom-tag'
      this.pattern = this._getCustomPatternOrDefault(options, this.name, /^(%)\s/g)
      this.getAction.bind(this)
      this._meta = meta()
      this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags)
    }

    getAction () {
      return {
        name: this.name,
        pattern: this.pattern,
        action: (text, selection, pattern) => new Promise((resolve) => {
          const match = pattern.exec(text)
          if (!match || !this.activeTags.length) {
            resolve(false)
            return
          }
          const originalText = match[0] || ''
          setTimeout(() => {
            this.quillJS.formatText(selection.index, match.input.length - 1, 'custom-tag', true)
            this.quillJS.deleteText(
              selection.index - originalText.length,
              originalText.length
            )
            resolve(true)
          }, 0)
        }),
        release: () => {
          setTimeout(() => {
            const contentIndex = this.quillJS.getSelection().index
            
            const [, length] = this.quillJS.getLine(contentIndex)
            if (length === 0) this.quillJS.format('custom-tag', false)
            
            this.quillJS.setSelection(contentIndex - 1);
            this.quillJS.format('custom-tag', false);
          }, 0)
        },
      }
    }
  }

  export default CustomTag
