const http = new EasyHTTP();

// Get users
// http.get('https://jsonplaceholder.typicode.com/users')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// USER DATA
const data = {
  name: 'Michael Scott',
  username: 'MichaelScarn',
  email: 'mscott@dundermifflin.com',
};

// CREATE USER
// http.post('https://jsonplaceholder.typicode.com/users', data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

// CREATE PUT // UPDATE USER
// http.put('https://jsonplaceholder.typicode.com/users/5', data)
// .then(data => console.log(data))
// .catch(err => console.log(err));

// DELETE USER
http
  .delete('https://jsonplaceholder.typicode.com/users/7')
  .then(data => console.log(data))
  .catch(err => console.log(err));
