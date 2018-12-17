class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
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
  }

  showAlert(msg, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// ---------------------------------------------------------- //

// DOM Load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener for adding book
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

    // Add to local storage
    Store.addBook(book);

    // Clear Fields
    ui.clearFields();

    // Show success alert
    ui.showAlert("Book Added!", "success");
  }
  e.preventDefault();
});

// Event listener for deleting book
document.getElementById("book-list").addEventListener("click", e => {
  // Instatiate new UI Object
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);

  // Removing book from LocalStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show message
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
