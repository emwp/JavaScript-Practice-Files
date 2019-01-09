import { http } from './http';
import { ui } from './ui';

// GET posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for Add Post
document.querySelector('.post-submit').addEventListener('click', submitPost);
// Delete button event
document.querySelector('#posts').addEventListener('click', deletePost);
// Edit button event
document.querySelector('#posts').addEventListener('click', enableEdit);
// Listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);

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
  const id = document.querySelector('#id').value;

  const data = {
    title: title,
    body: body,
  };

  // Make sure its not an empty title or body
  if (title === '' && body === '') {
    ui.showAlert('Please add required fields!', 'alert alert-danger');
  } else {
    // Check for ID
    if (id === '') {
      // Create Post
      http
        .post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post Added!', 'alert alert-success');
          ui.clearFields();
          getPosts();
        })
        .catch(err => console.log(err));
    } else {
      // Update Post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post Updated!', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Delete post
function deletePost(e) {
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post Removed', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err));
  }

  e.preventDefault();
}

// Delete post
function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };

    // Fill the post with the current data
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
