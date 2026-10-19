import type { FormEvent, ChangeEvent } from "react";

export type BookStatus = "Lido" | "Não lido";

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

export type NewBook = Omit<Book, "_id">;

export interface BookFormProps {
  onBookAdded: () => void;
}

export interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

export interface BookListProps {}

export type BookFormEvent = FormEvent<HTMLFormElement>;

export type BookInputEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement
>;