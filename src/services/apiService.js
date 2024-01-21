const API_BASE_URL = "http://127.0.0.1:8000/api/books/";

export const fetchBooks = async (params = {}) => {
  const { page = 1, search = "", size = 5 } = params;

  const queryParams = new URLSearchParams();
  queryParams.append("page", page);
  queryParams.append("search", search);

  const url = `${API_BASE_URL}?${queryParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch books");
  }

  return response.json();
};

export const createBook = async (bookData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error("Could not create book");
  }

  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "DELETE",
  });

  if (!response.noContent) {
    throw new Error("Could not delete book");
  }

  return response.json();
};

export const updateBook = async (id, bookData) => {
  const response = await fetch(`${API_BASE_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });

  if (!response.ok) {
    throw new Error("Could not update book");
  }

  return response.json();
};
