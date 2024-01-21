import React, { useState, useEffect } from 'react';
import { Container, Grid } from "@mui/material";
import { Header } from './components/Header';
import { AddBookForm } from './components/AddBookForm';
import { BookList } from './components/BookList';
import { fetchBooks, createBook, deleteBook, updateBook } from './services/apiService';

export function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', bookImageUrl: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    loadBooks();
  }, []);

  const addBook = async () => {
    try {
      const createdBook = await createBook(newBook);
      setBooks([...books, createdBook]);
      setNewBook({ title: '', author: '', bookImageUrl: '' });
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
      await deleteBook(id)
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      const newBook = await updateBook(updatedBook.id, updatedBook)
      setBooks(books.map(book => book.id === newBook.id ? newBook : book));
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <div>
      <Header onSearch={setSearchTerm} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <AddBookForm newBook={newBook} setNewBook={setNewBook} addBook={addBook} />
        <BookList books={filteredBooks} onDelete={handleDeleteBook} onSave={handleUpdateBook} />
      </Container>
    </div>
  );
}
