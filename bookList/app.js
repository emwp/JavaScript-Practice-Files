// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to the list
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert Columns
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function(msg, className) {
  // Create div
  const div = document.createElement("div");
  // Add a class
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(msg));
  // get parent
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3s
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners
document.getElementById("book-form").addEventListener("submit", function(e) {
  // Getting the form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // New Book
  const book = new Book(title, author, isbn);

  // New UI Object
  const ui = new UI();

  // Validation
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // ADD book to the list
    ui.addBookToList(book);

    // Clear Fields
    ui.clearFields();

    // Show success alert
    ui.showAlert("Book Added!", "success");
  }
  e.preventDefault();
});
