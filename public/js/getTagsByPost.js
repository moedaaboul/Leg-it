const getTags = async () => {
  const response = await fetch(`/api/tag/getTags/2`, {
    method: 'GET',
  });
};

window.onload = getTags();
