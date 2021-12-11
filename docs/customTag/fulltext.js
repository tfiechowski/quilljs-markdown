import AbstractTag from '../../src/tags/AbstractTag'
import meta from './meta'

class CustomTag extends AbstractTag {
  constructor (quillJS, options = {}) {
    super()
    console.log("XD");
    this.quillJS = quillJS
    this.name = 'custom-tag'
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /^\s{0,99}(%)\s/g)
    this.getAction.bind(this)
    this._meta = meta()
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags)
  }

  getAction () {
    console.log("XD");
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
          const startOffset = selection.index - 1
          this.quillJS.deleteText(startOffset, 2)
          setTimeout(() => {
            this.quillJS.formatLine(startOffset, originalText.length - 3, 'custom-tag', true)
            resolve(true)
          }, 0)
        }, 0)
      }),
      // delete: () => {
      //   console.log("fulltext delete");
      // }
      // release: () => {
      //   console.log("X rlease");
      //   setTimeout(() => {
      //     const cursorIndex = this.quillJS.getSelection().index
      //     const block = this.quillJS.getLine(cursorIndex)[0]
      //     const blockText = block.domNode.textContent
      //     if (block && blockText && blockText.replace('\n', '').length <= 0) {
      //       this.quillJS.format('custom-tag', false)
      //     }
      //   }, 0)
      // }
    }
  }
}

export default CustomTag
