import { makeRequest } from './helpers.js';

const likeBtn = document.querySelector('#like-post');
const handleLikePost = async (event) => {
  event.preventDefault();
  const id = document.querySelector('.card').id;
  if (id) {
    try {
      const data = await makeRequest(`/api/like/${id}`, 'POST');
      const element = document.getElementById('like-post');
      const likes = +document
        .querySelector('.likes-counter')
        .getAttribute('data-value');
      if (data.like) {
        element.innerHTML = '';
        element.innerHTML = `<i class="fas fa-heart"></i><span class='likes-counter'
        data-value=${likes + 1}> ${likes + 1} likes</span>`;
      } else {
        element.innerHTML = '';
        element.innerHTML = `<i class="far fa-heart"></i><span class='likes-counter'
        data-value=${likes - 1}> ${likes - 1} likes</span>`;
      }
    } catch (error) {
      console.log('Failed to login', error);
    }
  } else {
    console.log('Failed to login');
  }
};

likeBtn.addEventListener('click', handleLikePost);
