import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksSearch from "./BooksSearch"
import BooksListing from "./BooksListing"
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  };


  componentDidMount() {
    this.fetchData()
  }

  // Calls API to fetch book data
  fetchData = () => {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      })
    });
  }

  // Handles shelf update
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.fetchData()
    })
  }

  render() {
  // Routes to the search page when the search button is clicked
    return (

      <div className="app">
        <Route exact path="/" render={() => <BooksListing booksOnShelf={this.state.books} />} />
        <Route path="/search" render={() => <BooksSearch updateShelf={this.updateShelf} booksOnShelf={this.state.books} />} />
      </div>

    );
  }
}

export default BooksApp
