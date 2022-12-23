class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // add book to List
  addBookToList(book) {
    const list = document.querySelector("#book-list");

    // Create tr
    const row = document.createElement("tr");
    //  Insert cols
    row.innerHTML = `
        <td>${book.title}</td> 
        <td>${book.author}</td> 
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
    // Append row to list
    list.append(row);
  }

  //  Clear fields
  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  // Show alert
  showAlert(message, className) {
    // Create a div
    const div = document.createElement("div");
    // Add class to div
    div.className = `alert ${className}`;
    // add text to div
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".container");
    // Get form
    const form = document.querySelector("#book-form");
    //  Insert alert to container
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // Delete book
  deleteBook(target) {
    if (target.classList.contains("delete")) {
      // Get the row (book) via a tag
      const row = target.parentElement.parentElement;
      row.remove();
    }
  }
}

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

    books.forEach(function (book) {
      //  Instantiate UI
      const ui = new UI();

      // Add book to UI
      ui.addBookToList(book);
    });
  }

  static addBooks(book) {
    const books = Store.getBooks();

    // Add book to books array
    books.push(book);

    // Add to LS
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//  Event listeners for adding book
document.querySelector("#book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  //  Instantiate UI
  const ui = new UI();

  //  Validate
  if (title === "" || author === "" || isbn === "") {
    //  Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // add to Ls
    Store.addBooks(book);

    // Show success
    ui.showAlert("Book Added!", "success");

    //  Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

//  Event listener for delete
document.querySelector("#book-list").addEventListener("click", function (e) {
  //  Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteBook(e.target);

  // Remove from LS
  // Send isbn content(unique) to Store.removeBook
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
