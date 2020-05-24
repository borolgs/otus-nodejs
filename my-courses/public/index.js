async function addComment(e) {
  const comment = document.getElementById('comment-text');
  const text = comment.value;
  // TODO
}

function hide(id) {
  document.getElementById(id).classList.remove('is-active');
}

function show(id) {
  document.getElementById(id).classList.add('is-active');
}
