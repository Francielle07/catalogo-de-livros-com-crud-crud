import { useState } from "react";
import { api } from "../services/api";
import type {
  BookFormProps,
  BookInputEvent,
  BookFormEvent,
  BookStatus,
  NewBook,
} from "../types";

export default function BookForm({
  onBookAdded,
}: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<BookStatus>("Não lido");
  const [error, setError] = useState("");

  function handleChange(event: BookInputEvent) {
    const { name, value } = event.target;

    if (name === "title") setTitle(value);
    if (name === "author") setAuthor(value);
    if (name === "status") setStatus(value as BookStatus);
  }

  async function handleSubmit(event: BookFormEvent) {
    event.preventDefault();
    setError("");

    const newBook: NewBook = {
      title: title.trim(),
      author: author.trim(),
      status,
    };

    if (!newBook.title || !newBook.author) {
      setError("Preencha o título e o autor.");
      return;
    }

    try {
      await api.post("", newBook);

      setTitle("");
      setAuthor("");
      setStatus("Não lido");
      onBookAdded();
    } catch {
      setError("Não foi possível cadastrar o livro.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar livro</h2>

      <input
        name="title"
        placeholder="Título do livro"
        value={title}
        onChange={handleChange}
        required
      />

      <input
        name="author"
        placeholder="Nome do autor"
        value={author}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={status}
        onChange={handleChange}
      >
        <option value="Não lido">Não lido</option>
        <option value="Lido">Lido</option>
      </select>

      <button type="submit">Adicionar livro</button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}