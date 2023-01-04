//functionality for the new comment button
const handleNewComment = async (e) => {
  e.preventDefault();
  //get contents from textarea and blog_id from data-id
  const contents = document.querySelector('textarea').value.trim();
  const blog_id = document.querySelector('#blog-head-prompt').dataset.id;
  //keep empty comments from being serialized
  if (contents) {
    //fetch calls to api with blog id and comment
    await fetch(`/api/comment/${blog_id}`, {
      method: 'POST',
      body: JSON.stringify({
        contents,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      //reload the page with the new comment
      return location.reload();
    });
  } else {
    //user clicked button with no text
    return window.alert('Cannot leave an empty comment');
  }
};

document
  .querySelector('#comment-btn')
  .addEventListener('click', handleNewComment);
