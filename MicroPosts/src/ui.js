class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  // Show alert when adding/editing posts
  showAlert(message, className) {
    this.clearAlert();
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add the text
    div.appendChild(document.createTextNode(message));
    // Insert into DOM - Get the parent
    const container = document.querySelector('.postsContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert the alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert after 3s by reseting the class names
  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear fields after input
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear ID Hidden value
  clearIdInput() {
    this.idInput.value = '';
  }

  // Change the state
  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create button to cancel the edit state
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn block';
      button.appendChild(document.createTextNode('Cancel Edit'));
      // Get the parent
      const cardForm = document.querySelector('.card-form');
      // Get the element to insert before
      const formEnd = document.querySelector('.form-end');
      // Insert cancel btn
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post It!';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // Remove cancel btn if its there
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // Clear the ID from hidden field
      this.clearIdInput();
      // Clear the text fields
      this.clearFields();
    }
  }
}

export const ui = new UI();
