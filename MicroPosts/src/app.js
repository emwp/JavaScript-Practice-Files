import { http } from './http';
import { ui } from './ui';

// GET posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for Add Post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Gets posts in the json local server
function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// submit new posts
function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title: title,
    body: body,
  };

  // Create Post
  http
    .post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post Added!', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
}
