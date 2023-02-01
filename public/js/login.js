//handles the login form submit
const loginHandler = async (e) => {
  e.preventDefault();
  //grab input from login
  const name = document.getElementById('name-login').value.trim();
  const password = document.getElementById('password-login').value.trim();
  //make sure fields aren't empty
  if (name && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      return document.location.replace('/dashboard');
    } else {
      return alert(response);
    }
  } else {
    //lets user know the fields can't be empty
    return alert('Must enter name and password');
  }
};

//handles the new user form submit
const signUpHandler = async (e) => {
  e.preventDefault();
  //grab inputs
  const name = document.getElementById('name-sign-up').value.trim();
  const password = document.getElementById('password-sign-up').value.trim();
  const confirmPassword = document
    .getElementById('password-sign-up-confirm')
    .value.trim();
  //make sure passwords match before creating user
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  } else if (name && password) {
    //send post request to create user
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    //lets user know the passwords didn't match
    alert('Must enter name and matching passwords');
  }
};
//target buttons and add listeners
document.getElementById('login-btn').addEventListener('click', loginHandler);
document.getElementById('sign-up-btn').addEventListener('click', signUpHandler);
