const contentArea = document.getElementById('keyInfoArea');
const checkAmount = contentArea.childElementCount;
const voidHolder = document.getElementById('voidHolder');
if (!checkAmount) {
  console.log('NO post');
  let holder = document.createElement('div');
  holder.id = 'voidHolder';
  contentArea.appendChild(holder);
}
