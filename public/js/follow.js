import { makeRequest } from './helpers.js';

const followBtn = document.querySelector('.follow-action');
const followText = document.querySelector('.username-within');
const handleFollowAction = async (event) => {
  event.preventDefault();
  const id = document.querySelector('.username').getAttribute('user-id');
  const modalBg = document.querySelector('.actions-modal.actions');
  if (id) {
    try {
      const data = await makeRequest(`/api/follow/${id}`, 'POST');
      console.log(data);
      if (data.follow) {
        followBtn.innerHTML = '';
        followBtn.innerHTML = 'Unfollow';
        followText.innerHTML = '';
        followText.innerHTML = '• Following';
        followText.removeEventListener('click', handleFollowAction);
      } else {
        followBtn.innerHTML = '';
        followBtn.innerHTML = 'Follow';
        followText.innerHTML = '';
        followText.innerHTML = `•<span
        class='ml-1 has-text-link is-clickable'
        >Follow</span>`;
        followText.addEventListener('click', handleFollowAction);
      }
      modalBg.classList.remove('is-active');
    } catch (error) {
      console.log('Failed to login', error);
    }
  } else {
    console.log('Failed to login');
  }
};

followBtn.addEventListener('click', handleFollowAction);
followText.addEventListener('click', handleFollowAction);
