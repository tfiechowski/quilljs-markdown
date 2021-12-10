import Quill from 'quill'
import QuillMarkdown from '../src/app'

import CustomTag from './customTag';
import CustomBold from './bold';

const Block = Quill.import('formats/blockquote');
const Inline = Quill.import('blots/inline');

class QuillCustomBold extends Inline { }
QuillCustomBold.blotName = 'custom-bold';
QuillCustomBold.tagName = ['CUSTOM-BOLD'];


class QuillCustomTag extends Block {};
QuillCustomTag.tagName = 'custom-tag';
QuillCustomTag.blotName = 'custom-tag';

Quill.register(QuillCustomTag, true);
Quill.register(QuillCustomBold, true);

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
    extraTags: [
      {type: 'inline', Tag: CustomTag},
      {type: 'inline', Tag: CustomBold }
    ],
  });
})
