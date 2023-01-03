const handleCreate = async (e) => {
  e.preventDefault();
  const title = document.querySelector('#new-blog-title').value.trim();
  const contents = document.querySelector('#new-blog-contents').value.trim();
  if (title && contents) {
    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({
        title,
        contents,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      return location.replace('/dashboard');
    });
  } else {
    window.alert('Must have title and contents.');
  }
};

document.querySelector('button').addEventListener('click', handleCreate);
