import { makeRequest } from './helpers.js';

const followUserBtn = document.querySelector('.userfollow-btn');

followUserBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const id = followUserBtn.getAttribute('user-id');
  const followedBy = document.querySelector('.followers');
  try {
    const data = await makeRequest(`/api/follow/${id}`, 'POST');
    window.location.reload();
  } catch (error) {
    console.log('Failed to login', error);
  }
});
