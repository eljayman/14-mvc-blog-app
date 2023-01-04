//sends the logout request to the user api
const handleLogout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    //redirects logged out user to home view
    location.replace('/');
  } else {
    alert(response.statusText);
  }
};
//targets the logout link on the nav bar
document.querySelector('#logoutEl').addEventListener('click', handleLogout);
