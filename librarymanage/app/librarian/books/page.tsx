"use client";

import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getuserrole, isLoggedIn } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  type?: string;
  quantity: number;
  available: number;
  createdAt: string;
  updatedAt: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [editBook, setEditBook] = useState<any>(null);
  const [form, setForm] = useState({
    Title: "",
    Author: "",
    ISBN: "",
    Type: "Fiction",
    Quantity: ""
  });
  const [message, setMessage] = useState("");
  const closeRef = useRef<HTMLButtonElement | null>(  null);

  // fetchBooks
  async function fetchBooks() {
    try {
      const res = await fetch("/api/book");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }
const router=useRouter();
  useEffect(() => {
    if(!isLoggedIn()){
      router.push("/login")
      return;
    }
    if(getuserrole()!=="Admin" && getuserrole()!=="Librarian"){
      router.push("/")
      return;
    }
    fetchBooks();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage("");
    if (!form.Title || !form.Author || !form.ISBN || !form.Quantity) {
      setMessage("Please fill all required fields");
      return;
    }

    const body = {
      Title: form.Title,
      Author: form.Author,
      ISBN: form.ISBN,
      Type: form.Type,
      Quantity: Number(form.Quantity)
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to add book");
      } else {
        alert(result.message || "Book added");
        if (closeRef.current) closeRef.current.click();
        setForm({
          Title: "",
          Author: "",
          ISBN: "",
          Type: "Fiction",
          Quantity: ""
        });
        await fetchBooks();
      }
    } catch (err) {
      console.error("Add book error:", err);
      alert("Something went wrong");
    }
  };

  
  async function deleteBook(id: string) {
  if (!confirm("Are you sure you want to delete this book?")) return;

  const res = await fetch(`/api/book/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    alert("Book deleted!");
    // refresh your book list
  } else {
    alert("Failed to delete book");
  }
}

  const handleEdit = (book: Book) => {
    console.log(book)
   if(!book){
    return;
   }
     setEditBook(book);
    setForm({
      Title: book.title,
      Author: book.author,
      ISBN: book.isbn || "",
      Type: book.type || "",
      Quantity: book.quantity?.toString() || ""
    });
  };

  const handleUpdate = async () => {
    if (!editBook) return;
    const res = await fetch(`/api/book/${editBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Title: form.Title,
        Author: form.Author,
        ISBN: form.ISBN,
        Type: form.Type,
        Quantity: parseInt(form.Quantity)
      })
    });

    if (res.ok) {
      await fetchBooks();
       if (closeRef.current) closeRef.current.click();  
    } else {
      alert("Failed to update book");
    }
  };

    const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      await fetch(`/api/book/${id}`, { method: "DELETE" });
      fetchBooks();
    }
  };

  return (
    <div className="container-fluid text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Books Management</h2>
        {/* <button
          className="btn btn-outline-light"
          data-bs-toggle="modal"
          data-bs-target="#addBookModal"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add New Book
        </button> */}
      </div>

      <div className="card bg-dark text-white border-secondary">
        <div className="card-header">
          <h5 className="mb-0">All Books</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover align-middle">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Available</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id ??book.Id?? index}>
                    <td>{index + 1}</td>
                    <td>{book.title ?? book.Title}</td>
                    <td>{book.author ?? book.Author}</td>
                    <td>{book.type ?? book.Type ?? book.Category}</td>
                    <td>{book.quantity ?? book.Quantity}</td>
                    <td>{book.available ?? "-"}</td>
                    <td>
                      {/* <button
                        className="btn btn-sm btn-outline-info me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editBookModal"
                        onClick={() => handleEdit(book)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={()=>{handleDelete(book.id)}}>
                        <i className="bi bi-trash"></i>
                      </button> */}
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted">
                      No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Book Modal */}
      <div className="modal fade" id="addBookModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add New Book</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Title"
                    value={form.Title}
                    onChange={handleChange}
                    placeholder="Enter Book Title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Author"
                    value={form.Author}
                    onChange={handleChange}
                    placeholder="Enter Author Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ISBN"
                    value={form.ISBN}
                    onChange={handleChange}
                    placeholder="Enter ISBN"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="Type"
                    value={form.Type}
                    onChange={handleChange}
                    required
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Biography">Biography</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    name="Quantity"
                    value={form.Quantity}
                    onChange={handleChange}
                    placeholder="Enter Book Quantity"
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={closeRef}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Book
                  </button>
                </div>
              </form>
              {message && <div className="mt-2 alert alert-info">{message}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Book Modal */}
      <div className="modal fade" id="editBookModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Edit Book</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e)=>e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.Title}
                    onChange={(e) => setForm({ ...form, Title: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.Author}
                    onChange={(e) => setForm({ ...form, Author: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.ISBN}
                    onChange={(e) => setForm({ ...form, ISBN: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={form.Type}
                    onChange={(e) => setForm({ ...form, Type: e.target.value })}
                  >
                    <option>Fiction</option>
                    <option>Non-Fiction</option>
                    <option>Science</option>
                    <option>History</option>
                    <option>Biography</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.Quantity}
                    onChange={(e) => setForm({ ...form, Quantity: e.target.value })}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
