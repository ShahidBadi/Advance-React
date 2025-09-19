'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './browsebook.css'; // dark mode styles here
import { isLoggedIn } from '@/app/lib/auth';
import { useRouter } from 'next/navigation';

type Book = {
  title: string;
  author: string;
  status: 'available' | 'borrowed';
  stars: number;
};
export default function BrowseBooksPage() {
  const [Books,setBooks]=useState<any[]>([]);
  async function fetchBooks() {
    try {
      const res = await fetch("/api/book"); // <-- endpoint
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBooks(data);
    
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }
  const router=useRouter();
  useEffect(()=>{
    if(!isLoggedIn()){
      router.push("/login")
      return;
    }
    fetchBooks()
  },[])

 const handlereserve = async (bookId: string) => {
  try {
    const res = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId}), // current logged-in user
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error("Reserve error:", err);
    alert("Something went wrong while reserving");
  }
};


  return (
    <div className="page-section active container py-4 bg-dark text-white min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="page-title mb-0">Browse Books</h2>

        <div className="d-flex align-items-center gap-2">
          <select className="form-select form-select-sm bg-dark text-white border-secondary" style={{ width: '180px' }}>
            <option>All Categories</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
          </select>

          <button className="btn btn-outline-light btn-sm">
            <i className="bi bi-filter me-1" /> Filter
          </button>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr>
              <th style={{ minWidth: '260px' }}>Title</th>
              <th style={{ minWidth: '200px' }}>Author</th>
              <th style={{ width: '130px' }}>Status</th>
              {/* <th style={{ width: '160px' }}>Rating</th> */}
              <th style={{ width: '170px' }} className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Books.map((book, idx) => (
              <tr key={idx}>
                <td className="fw-semibold">{book.title}</td>
                <td className="text-muted">{book.author}</td>
                <td>
                  <span
                    className={`badge status-badge ${
                      book.available >0 ? 'available' : 'borrowed'
                    }`}
                  >
                    {book.available> 0 ? 'Available' : 'Borrowed'}
                  </span>
                </td>
                {/* <td>{renderStars(book.stars)} <span className="ms-2 small text-muted">({book.stars})</span></td> */}
                <td className="text-center">
                  {book.available >0 ? (  
                    <button className="btn btn-sm btn-primary w-75" onClick={()=>{handlereserve(book.id)}} >
                      <i className="bi bi-bookmark-plus me-1" /> Reserve
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-outline-secondary w-75" disabled>
                      <i className="bi bi-clock me-1" /> Check Availability
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {Books.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted py-4">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center mb-0">
          <li className="page-item disabled">
            <button className="page-link bg-dark text-white border-secondary">Previous</button>
          </li>
          <li className="page-item active">
            <button className="page-link bg-primary border-primary">1</button>
          </li>
          <li className="page-item">
            <button className="page-link bg-dark text-white border-secondary">2</button>
          </li>
          <li className="page-item">
            <button className="page-link bg-dark text-white border-secondary">3</button>
          </li>
          <li className="page-item">
            <button className="page-link bg-dark text-white border-secondary">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
