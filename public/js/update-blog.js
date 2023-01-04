//function that handles the delete blog button
const handleBlogDel = async (e) => {
  e.preventDefault();
  const confirm = window.confirm('Are you sure you want to delete this blog?');
  //prompt the user to make sure they are meaning to delete permanently
  if (confirm === true) {
    //if confirmed send the delete request
    const blog_id = document.querySelector('#blog-head-prompt').dataset.id;
    await fetch(`/api/blog/${blog_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      //go back to the dashboard after delete response
      return location.replace('/dashboard');
    });
  } else {
    return;
  }
};

//function that sends the update request to blog api
const handleBlogUpdate = async (e) => {
  e.preventDefault();
  //select the new blog text from textarea and blog id from data-id
  const updatedBlogText = document.querySelector('textarea').value.trim();
  const blogId = document.querySelector('#blog-head-prompt').dataset.id;
  //keep empty field from being serialized
  if (updatedBlogText) {
    await fetch(`/api/blog/${blogId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: blogId,
        contents: updatedBlogText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      //reload the page after the update response
      return location.reload();
    });
  } else {
    //let user know empty fields won't be saved
    return window.alert('Cannot leave update blog text empty.');
  }
};
//targets the buttons on the user's blog view
document
  .querySelector('#update-blog-btn')
  .addEventListener('click', handleBlogUpdate);
document
  .querySelector('#del-blog-btn')
  .addEventListener('click', handleBlogDel);
