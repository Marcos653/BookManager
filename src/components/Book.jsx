import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from './Book.module.css';

export function Book({ book, onDelete, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedBook, setEditedBook] = useState({ ...book });

    const handleSave = () => {
        onSave(editedBook);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedBook({ ...book });
        setIsEditing(false);
    };

    const renderEditMode = () => (
        <div className={styles.editFields}>
            <TextField
                label="Title"
                value={editedBook.title}
                onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Author"
                value={editedBook.author}
                onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Image URL"
                value={editedBook.bookImageUrl}
                onChange={(e) => setEditedBook({ ...editedBook, bookImageUrl: e.target.value })}
                margin="normal"
                fullWidth
            />
            <Button onClick={handleSave} color="primary">Save</Button>
            <IconButton onClick={handleCancel} aria-label="cancel">
                <CancelIcon />
            </IconButton>
        </div>
    );

    const renderViewMode = () => (
        <div>
            <Typography variant="h5" component="div">
                {book.title}
            </Typography>
            <Typography color="text.secondary">
                {book.author}
            </Typography>
            <IconButton onClick={() => setIsEditing(true)} aria-label="edit">
                <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(book.id)} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    );

    return (
        <Card variant="outlined" className={styles.card}>
            <div className={styles.bookLayout}>
                {book.bookImageUrl && (
                    <CardMedia
                        component="img"
                        image={book.bookImageUrl}
                        alt={book.title}
                        className={styles.bookImage}
                    />
                )}
                <CardContent className={styles.content}>
                    {isEditing ? renderEditMode() : renderViewMode()}
                </CardContent>
            </div>
        </Card>
    );
}
