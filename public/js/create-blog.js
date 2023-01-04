//handles the create blog button
const handleCreate = async (e) => {
  e.preventDefault();
  //get title and contents from inputs
  const title = document.querySelector('#new-blog-title').value.trim();
  const contents = document.querySelector('#new-blog-contents').value.trim();
  //keep from serializing empty fields
  if (title && contents) {
    //calls to new blog api
    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      // relocates to dashboard after new blog is created
      return location.replace('/dashboard');
    });
  } else {
    //lets user know fields can't be empty
    window.alert('Must have title and contents.');
  }
};

document.querySelector('button').addEventListener('click', handleCreate);
