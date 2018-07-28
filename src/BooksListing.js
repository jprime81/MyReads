import React from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import "./App.css";
import BooksShelf from "./BooksShelf"


class BooksListing extends React.Component {

  state = {};

  // Filter books by shelf
  updateShelf = (bookId, event) => {

    let booksOnShelf = this.props.booksOnShelf;

    const book = booksOnShelf.filter(book => book.id === bookId)[0];

    book.shelf = event.target.value;

    BooksAPI.update(book, event.target.value).then(response => {
      this.setState({
        books: booksOnShelf
      });
    });

  };

  render() {
  // Shows the shelves with current books
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>My Book Reading App</h1>
        </div>
        <div className="list-books-content">
          <BooksShelf
            shelfTitle = "Currently Reading"
            key="currently"
            books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
            updateShelf={this.updateShelf}
          />
          <BooksShelf
            shelfTitle = "Want to Read"
            key="wantToRead"
            books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
            updateShelf={this.updateShelf}
          />
          <BooksShelf
            shelfTitle = "Read"
            key="read"
            books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
            updateShelf={this.updateShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksListing