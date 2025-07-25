'use client';

import React from 'react';

export default function BrowseBooksPage() {
  const books = [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      status: 'available',
      stars: 4.5,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Gatsby',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      status: 'borrowed',
      stars: 5,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Mockingbird',
    },
    {
      title: '1984',
      author: 'George Orwell',
      status: 'available',
      stars: 4,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=1984',
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      status: 'available',
      stars: 3.5,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Pride',
    },
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      status: 'borrowed',
      stars: 4.5,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Hobbit',
    },
    {
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      status: 'available',
      stars: 3,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Catcher',
    },
    {
      title: 'Harry Potter',
      author: 'J.K. Rowling',
      status: 'borrowed',
      stars: 5,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Potter',
    },
    {
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      status: 'available',
      stars: 4,
      img: 'https://via.placeholder.com/300x450/1a1a1a/cccccc?text=Alchemist',
    },
  ];

  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const half = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (half ? 1 : 0);

    return (
      <div className="text-warning">
        {[...Array(fullStars)].map((_, i) => (
          <i className="bi bi-star-fill" key={`full-${i}`} />
        ))}
        {half && <i className="bi bi-star-half" />}
        {[...Array(emptyStars)].map((_, i) => (
          <i className="bi bi-star" key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="page-section active">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Browse Books</h2>
        <div>
          <select className="form-select d-inline-block me-2" style={{ width: 'auto' }}>
            <option>All Categories</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
          </select>
          <button className="btn btn-outline-primary">
            <i className="bi bi-filter"></i> Filter
          </button>
        </div>
      </div>

      <div className="row">
        {books.map((book, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card book-card h-100">
              <img src={book.img} className="book-cover card-img-top" alt="Book Cover" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted">{book.author}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className={`status-badge ${book.status}`}>
                    {book.status === 'available' ? 'Available' : 'Borrowed'}
                  </span>
                  {renderStars(book.stars)}
                </div>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                {book.status === 'available' ? (
                  <button className="btn btn-sm btn-primary w-100">
                    <i className="bi bi-bookmark-plus"></i> Reserve
                  </button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary w-100" disabled>
                    <i className="bi bi-clock"></i> Check Availability
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabIndex={-1}>
              Previous
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
