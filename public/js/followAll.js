import { makeRequest } from './helpers.js';

const followTexts = document.querySelectorAll('.username-within');

document.addEventListener('DOMContentLoaded', function () {
  // querySelector - it returns the element within the document that matches the specified selector
  Array.from(followTexts).forEach(function (element) {
    element.addEventListener('click', async (event) => {
      event.preventDefault();
      const id = element.parentElement.getAttribute('user-id');
      try {
        const data = await makeRequest(`/api/follow/${id}`, 'POST');
        window.location.reload();
      } catch (error) {
        console.log('Failed to login', error);
      }
    });
  });
});
