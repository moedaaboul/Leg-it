import { makeRequest } from './helpers.js';

const loginForm = document.querySelector('#login-form');
const handleLogin = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const password = document.querySelector('#password').value;
  if (name && password) {
    try {
      const data = await makeRequest('/api/users/login', 'POST', {
        name,
        password,
      });
      if (data.success) {
        window.location.replace('/');
      } else {
        console.log('Failed to login');
        window.location.replace('/login');
      }
    } catch (error) {
      console.log('Failed to login', error);
    }
  } else {
    console.log('Failed to login');
  }
};

loginForm.addEventListener('submit', handleLogin);
