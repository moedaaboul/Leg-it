async function deleteFormHandler(event) {
  event.preventDefault();
  console.log('xxxxxxxxxxxxxxxxxxxxxx--DELETE--------xxxxxxxxxxxxxxxxxxxx');

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const currentTarget = $(event.currentTarget);
  const commentId = currentTarget.attr('data-id');

  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace(`/posts/${id}`);
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.delete-post-btn')
  .addEventListener('click', deleteFormHandler);
