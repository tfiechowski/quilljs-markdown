import Quill from 'quill'
import QuillMarkdown from '../src/app'

import CustomTag from './customTag';

console.log("Custom TAG 2");

const Block = Quill.import('formats/blockquote');

class QuillCustomTag extends Block {};
QuillCustomTag.tagName = 'custom-tag';
QuillCustomTag.blotName = 'custom-tag';

Quill.register(QuillCustomTag, true);

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  [ 'link', 'image'],          // add's image support
];

const options = {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const editor = new Quill('#editor', options)
  new QuillMarkdown(editor, {
    extraTags: [ {type: 'inline', Tag: CustomTag}],
  });
})
