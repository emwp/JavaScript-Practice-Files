// const sayHello = () => {
//   console.log('Say Hello');
// }

// One line function doesnt need braces
// const sayHello2 = () => console.log('Hello');


// sayHello();
// sayHello2();
 
// -----------------------------

// When returning an object, wrapped in braces, otherwise it'll be undefined.
// const sayHello3 = () => ({ msg: 'Hello World' });

// console.log(sayHello3());

// -----------------------------

// const sayHello4 = (firstName, lastName) => console.log(`Hello ${firstName} ${lastName}`);

// sayHello4('Everton', 'Pereira');

const users = ['Jim', 'Dwight', 'Michael', 'Stanley', 'Andy'];

// const nameLenghts = users.map(function(name){
//   return name.length;
// });

// ARROW FUNCTION
// const nameLenghts = users.map((name) => {
//   return name.length;
// });

// SHORTER ARROW FUNCTION RETURN
const nameLenghts = users.map(name => name.length);



console.log(nameLenghts);