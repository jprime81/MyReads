import React from "react"
import { Link } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import {DebounceInput} from "react-debounce-input"
import "./App.css"

class BooksSearch extends React.Component {

  constructor() {

    super();

    this.state = {
      query: "",
      books: []
    }

  }

  // Calls API to search for books based on entered search terms
  updateQuery = (query) => {
    this.setState({
      query: query
    })
    if (query) {
      BooksAPI.search(query, 20).then((books) => {
        books.length > 0 ? this.updateBooks(books) : this.setState({
          books: []
        })
      }).catch((error) => {
        console.error(`${error}`);
      })
    } else {
      this.setState({
        books: []
      })
    }
  }

  // Updates shelf if a book state is changed
  updateBookState = (book, shelf) => {
    let currentState = this.state.books;
    const bookToUpdate = currentState.filter(booksData => booksData.id === book.id)[0];
    bookToUpdate.shelf = shelf;
    this.setState({
      books: currentState
    })
    this.props.updateShelf(book, shelf);
  }

 // Updates shelf with books data from search
  updateBooks = (books) => {
    const booksData = books.map(book => {
      book.shelf = "none";
      this.props.booksOnShelf.forEach(selectedBook => {if (book.id === selectedBook.id) {
          book.shelf = selectedBook.shelf;
        }
      })
      return book
    })
    this.setState({ books: booksData })
  }

  render() {
  // Shows search page including the books matched with search terms
    return (
      <div>
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={2}
              debounceTimeout={400}
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.filter((book) => (book.imageLinks)).map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={
                      {
                        width: 128,
                        height: 193,
                        borderRadius: 10,
                        backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                      }
                    }
                  />
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={event => { this.updateBookState(book, event.target.value); }}>
                      <option disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors && <div className="book-authors"> {book.authors[0]} </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default BooksSearch