import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import BookForm from "./BookForm";
import BookItem from "./BookItem";
import type { Book } from "../types";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBooks = useCallback(async () => {
    try {
      setError("");
      const response = await api.get<Book[]>("");
      setBooks(response.data);
    } catch {
      setError("Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBooks();
  }, [loadBooks]);

  async function handleDelete(id: string) {
    try {
      await api.delete(`/${id}`);
      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== id)
      );
    } catch {
      setError("Não foi possível remover o livro.");
    }
  }

  return (
    <main>
      <h1>Catálogo de Livros</h1>

      <BookForm onBookAdded={() => void loadBooks()} />

      <h2>Meus livros</h2>

      {loading && <p>Carregando livros...</p>}
      {error && <p role="alert">{error}</p>}

      {!loading && !error && books.length === 0 && (
        <p>Nenhum livro cadastrado.</p>
      )}

      <ul>
        {books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}