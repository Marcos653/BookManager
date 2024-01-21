import React, { useState, useEffect } from 'react';
import { Container, Grid, Pagination } from "@mui/material";
import { Header } from './components/Header';
import { AddBookForm } from './components/AddBookForm';
import { BookList } from './components/BookList';
import { fetchBooks, createBook, deleteBook, updateBook } from './services/apiService';

export function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', bookImageUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reloadBooksFlag, setReloadBooksFlag] = useState(false);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const { results, count } = await fetchBooks({ page: currentPage });
        setBooks(results);
        setTotalPages(Math.ceil(count / 5));
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    loadBooks();
  }, [currentPage, reloadBooksFlag]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const addBook = async () => {
    try {
      await createBook(newBook);
      setReloadBooksFlag(prev => !prev);
      setNewBook({ title: '', author: '', bookImageUrl: '' });
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

const handleDeleteBook = async (id) => {
  try {
    await deleteBook(id);
    setReloadBooksFlag(prev => !prev);
  } catch (error) {
    console.error("Failed to delete book:", error);
  }
};

  const handleUpdateBook = async (updatedBook) => {
    try {
      await updateBook(updatedBook.id, updatedBook)
      setReloadBooksFlag(prev => !prev);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const { results, count } = await fetchBooks({ page: 1, search: searchTerm });
      setBooks(results);
      setTotalPages(Math.ceil(count / 5));
    } catch (error) {
      console.error("Failed to search book:", error);
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <AddBookForm newBook={newBook} setNewBook={setNewBook} addBook={addBook} />
        <BookList books={filteredBooks} onDelete={handleDeleteBook} onSave={handleUpdateBook} />
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Container>
    </div>
  );
}
