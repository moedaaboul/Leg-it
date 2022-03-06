import { makeRequest, getRequest } from './helpers.js';

const actionsModal = document.querySelector('.actions-modal.actions');
const modalTrigger = document.querySelector('.modal-trigger.actions');
const deletePost = document.querySelector('.delete-post');

// This adds an event listener on h3 headers to fetch repo data

modalTrigger.addEventListener('click', async function () {
  try {
    const userId = modalTrigger.getAttribute('user-id');
    const postId =
      modalTrigger.parentElement.parentElement.parentElement.parentElement.id;
    const getUser = await getRequest(`/api/users/user`);
    if (+userId === +getUser.user) {
      deletePost.classList.remove('is-hidden');
    }
    deletePost.addEventListener('click', async (event) => {
      event.preventDefault();
      try {
        const postData = await makeRequest(`/api/posts/${postId}`, 'DELETE');
        window.location.replace('/');
      } catch (error) {
        console.log('Failed to login', error);
      }
    });

    actionsModal.classList.add('is-active'); // modal status to active to enable the following event listener to exit modal screen on modal-background click

    const modalBg = document.querySelector('.modal-background.actions');
    modalBg.addEventListener('click', function () {
      actionsModal.classList.remove('is-active');
    });
    document
      .querySelector('.cancel.actions')
      .addEventListener('click', function () {
        actionsModal.classList.remove('is-active');
      });
  } catch (error) {
    console.error(error);
  }
});
