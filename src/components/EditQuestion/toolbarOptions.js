

const toolbarOptions = [
  // Extended toolbar buttons
  ['contain'],
  ['td'], // new table (cursor needs to be out of table)
  [{'table': 'append-row'}], // cursor needs to be in the table
  [{'table': 'append-col'}], // cursor needs to be in the table
  // Extended toolbar buttons

  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }, 'formula'],
  [{ 'indent': '-1'}, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],

  [{ 'size': ['small', false, 'large', 'huge'] }],
  // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],

  ['link', 'image'],

  ['clean']
];

export default toolbarOptions
