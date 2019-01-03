// Initialize Github class
const github = new GitHub();

// Initialize UI class
const ui = new UI();

// Caching the search component
const searchUser = document.querySelector('#search-user');

// Event Listener to Search User
searchUser.addEventListener('keyup', e => {
  // Get Input text
  const userText = e.target.value;

  if (userText !== '') {
    // Make HTTP Request
    github.getUser(userText).then(data => {
      if (data.profile.message === 'Not Found') {
        // Show Alert
      } else {
        // Show the user
        ui.showProfile(data.profile);
      }
    });
  } else {
    // Clear Profile
  }
});
