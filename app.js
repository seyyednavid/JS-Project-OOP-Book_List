//  Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//  UI constructor
function UI() {}

// add book to List
UI.prototype.addBookToList = function (book) {
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
};

//  Clear fields
UI.prototype.clearFields = function () {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};
// Show alert
UI.prototype.showAlert = function (message, className) {
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
};

// Delete book
UI.prototype.deleteBook = function (target) {
  if (target.classList.contains("delete")) {
    // Get the row (book) via a tag
    const row = target.parentElement.parentElement;
    row.remove();
  }
};

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

  // Show message
  ui.showAlert("Book Removed!", "success");

  e.preventDefault();
});
