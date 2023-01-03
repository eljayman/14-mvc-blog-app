const newBlogBtn = (e) => {
  e.preventDefault();
  location.replace('/create');
};

document.querySelector('#new-blog-btn').addEventListener('click', newBlogBtn);
