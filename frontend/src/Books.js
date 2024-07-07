import React, { useState, useEffect } from 'react';
import { fetchBooks, addBook, updateBook, deleteBook } from './api';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBooks();
  }, []);

  const handleAddBook = async () => {
    try {
      if (editingBook) {
        await updateBook(editingBook._id, { title, author });
        setEditingBook(null);
      } else {
        await addBook({ title, author });
      }
      setTitle('');
      setAuthor('');
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (error) {
      console.error("There was an error adding/updating the book:", error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (error) {
      console.error("There was an error deleting the book:", error);
    }
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <div className="form-container">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <button onClick={handleAddBook}>
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td className="actions">
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button className="delete" onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
  