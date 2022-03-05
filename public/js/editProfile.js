const profileBtn = document.querySelector('.btn-profile');

function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener('load', function (e) {
      document.getElementById('img').src = e.target.result;
    });

    FR.readAsDataURL(this.files[0]);
  }
}

const handleSubmitFile = (e) => {
  e.preventDefault();
  document.querySelector('.btn-profile').classList.add('is-loading');
  if (!document.querySelector('input[type=file]')['files'][0]) return;
  const reader = new FileReader();
  reader.readAsDataURL(document.querySelector('input[type=file]')['files'][0]);
  reader.onloadend = async () => {
    await uploadImage(reader.result);
    document.querySelector('.btn-profile').classList.remove('is-loading');
    window.location.reload();
  };
  reader.onerror = () => {
    console.error('AHHHHHHHH!!');
  };
};

const uploadImage = async (base64EncodedImage) => {
  try {
    await fetch('/api/users/upload', {
      method: 'PUT',
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
  }
};

document.getElementById('inp-profile').addEventListener('change', readFile);
profileBtn.addEventListener('click', handleSubmitFile);
