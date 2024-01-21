import { TextField, Button } from "@mui/material";
import styles from './AddBookForm.module.css';

export function AddBookForm({ newBook, setNewBook, addBook }) {
    return (
        <div className={styles.formContainer}>
            <form onSubmit={(e) => { e.preventDefault(); addBook(); }}>
                <TextField
                    label="Title"
                    className={styles.formField}
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Author"
                    className={styles.formField}
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Book image"
                    className={styles.formField}
                    value={newBook.bookImageUrl}
                    onChange={(e) => setNewBook({ ...newBook, bookImageUrl: e.target.value })}
                    margin="normal"
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Book
                </Button>
            </form>
        </div>
    );
}
