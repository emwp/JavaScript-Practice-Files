document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJson);
document.getElementById('button3').addEventListener('click', getExternal);

// GET DATA FROM TEXT FILE
function getText(){
  fetch('data.txt')
  .then(res => res.text())
  .then(data => {
    console.log(data);
    document.getElementById('output').innerHTML = data;
  })
  .catch(err => console.log(err));
}

// GET DATA FROM JSON FILE
function getJson(){
  fetch('data.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let output = '';
    data.forEach(post => {
      output += `<li>${post.title}</li>`
    });
    document.getElementById('output').innerHTML = output; 
  })
  .catch(err => console.log(err));
}

// GET DATA FROM EXTERNAL API
function getExternal(){
  fetch('https://api.github.com/users')
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let output = '';
    data.forEach(user => {
      output += `<li>${user.login}</li>`
    });
    document.getElementById('output').innerHTML = output; 
  })
  .catch(err => console.log(err));
}