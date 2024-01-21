const API_BASE_URL = "https://bookmanager-api.onrender.com/api/books/";

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

  if (response.status !== 204) {
    throw new Error("Could not delete book");
  }
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
