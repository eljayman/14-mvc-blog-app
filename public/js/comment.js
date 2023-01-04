
const handleNewComment = async (e) => {
  e.preventDefault();
  const contents = document.querySelector('textarea').value.trim();
  const blog_id = document.querySelector('#blog-head-prompt').dataset.id;
  if (contents) {
    await fetch(`/api/comment/${blog_id}`, {
      method: 'POST',
      body: JSON.stringify({
        contents,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      return location.reload();
    });
  } else {
    return window.alert('Cannot leave an empty comment');
  }
};

document
  .querySelector('#comment-btn')
  .addEventListener('click', handleNewComment);
