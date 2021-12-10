import AbstractTag from '../../src/tags/AbstractTag'
import meta from './meta'

class CustomBold extends AbstractTag {
  constructor (quillJS, options = {}) {
    super()
    this.quillJS = quillJS
    this.name = 'custom-bold'
    this.pattern = this._getCustomPatternOrDefault(options, this.name, /(#bd)(.*)(#)/g)
    this.getAction.bind(this)
    this._meta = meta()
    this.activeTags = this._getActiveTagsWithoutIgnore(this._meta.applyHtmlTags, options.ignoreTags)
  }

  getAction () {
    return {
      name: this.name,
      pattern: this.pattern,
      action: (text, selection, pattern, lineStart) => new Promise((resolve) => {
        console.log("custom bold action");
        let match = pattern.exec(text)
        const [annotatedText, , matchedText] = match
        const startIndex = lineStart + match.index
        if (text.match(/^([*_ \n]+)$/g) || !this.activeTags.length) {
          resolve(false)
          return
        }

        setTimeout(() => {
          this.quillJS.deleteText(startIndex, annotatedText.length)
          setTimeout(() => {
            this.quillJS.insertText(startIndex, matchedText, { 'custom-bold': true })
            this.quillJS.format('custom-bold', false)
            resolve(true)
          })
        }, 0)
      })
    }
  }
}

export default CustomBold
