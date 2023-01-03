const handleBlogUpdate = async (e) => {
  e.preventDefault();
  const updatedBlogText = document.querySelector('textarea').value.trim();
  const blogId = document.querySelector('#blog-head-prompt').dataset.id;
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
};

document.querySelector('button').addEventListener('click', handleBlogUpdate);
