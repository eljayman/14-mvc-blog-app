const handleBlogDel = async (e) => {
  e.preventDefault();
  const confirm = window.confirm('Are you sure you want to delete this blog?');
  if (confirm === true) {
    const blog_id = document.querySelector('#blog-head-prompt').dataset.id;
    fetch(`/api/blog/${blog_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      return location.replace('/dashboard');
    });
  } else {
    return;
  }
};

const handleBlogUpdate = async (e) => {
  e.preventDefault();
  const updatedBlogText = document.querySelector('textarea').value.trim();
  const blogId = document.querySelector('#blog-head-prompt').dataset.id;
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
      return location.replace(`/api/blog/${blogId}`);
    });
  } else {
    return window.alert('Cannot leave update blog text empty.');
  }
};

document
  .querySelector('#update-blog-btn')
  .addEventListener('click', handleBlogUpdate);
document
  .querySelector('#del-blog-btn')
  .addEventListener('click', handleBlogDel);
