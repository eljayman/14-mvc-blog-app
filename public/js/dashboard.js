const newBlogBtn = (e) => {
  e.preventDefault();
  window.location.replace('/create');
};

document.querySelector('#new-blog-btn').addEventListener('click', newBlogBtn);
