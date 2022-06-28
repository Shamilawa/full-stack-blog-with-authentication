tinymce.init({
    selector: 'textarea#postContent',
    height: 800,
    menubar: false,
    skin: "CUSTOM",
    content_css: "CUSTOM",
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | h1 h2 h3 h4 h5 | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help'
  });