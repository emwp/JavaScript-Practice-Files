const http = new easyHTTP;

// GET posts
// http.get('https://jsonplaceholder.typicode.com/posts', function(error, posts) {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log(posts);
//   }
// });

// -----------------------------------------------------------------------

// Create DATA
const data = {
  title: 'Custom Post',
  body: 'This is a custom post'
};

// Create Post
// http.post('https://jsonplaceholder.typicode.com/posts', data, function(error, post){
//   if(error) {
//     console.log(error);
//   } else {
//     console.log(post);
//   }
// });
// -----------------------------------------------------------------------

// UPDATE POST
http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(error, post){
    if(error) {
    console.log(error);
    } else {
    console.log(post);
    }
});

// -----------------------------------------------------------------------

// DELETE post
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(error, response) {
  if(error) {
    console.log(error);
  } else {
    console.log(response);
  }
});

