import { Book } from './Book';

export function BookList({ books, onDelete, onSave }) {
    return (
        <div>
            {books.map(book => (
                <Book
                    key={book.id}
                    book={book}
                    onDelete={onDelete}
                    onSave={onSave}
                />
            ))}
        </div>
    );
}
