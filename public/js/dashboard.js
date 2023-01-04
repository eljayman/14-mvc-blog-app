const newBlogBtn = (e) => {
  e.preventDefault();
  location.replace('/create');
};
//button on dashboard view that renders the create blog view
document.querySelector('#new-blog-btn').addEventListener('click', newBlogBtn);
