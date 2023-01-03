const handleLogout = async () => {
  const response = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logoutEl').addEventListener('click', handleLogout);
