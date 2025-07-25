'use client';

import React from 'react';

export default function MyBooksPage() {
  return (
    <div className="page-section active">
      <h2 className="page-title">My Books</h2>

      <div className="row">
        {/* Left column: Borrowed books + Reservations */}
        <div className="col-md-8">
          {/* Currently Borrowed */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Currently Borrowed</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Borrow Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: 'The Great Gatsby',
                        author: 'F. Scott Fitzgerald',
                        borrow: 'Jul 20, 2023',
                        due: 'Aug 15, 2023',
                        img: 'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=Gatsby',
                      },
                      {
                        title: 'To Kill a Mockingbird',
                        author: 'Harper Lee',
                        borrow: 'Jul 22, 2023',
                        due: 'Aug 18, 2023',
                        img: 'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=Mockingbird',
                      },
                      {
                        title: '1984',
                        author: 'George Orwell',
                        borrow: 'Jul 25, 2023',
                        due: 'Aug 10, 2023',
                        img: 'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=1984',
                      },
                    ].map((book, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={book.img} className="me-3" style={{ width: 35 }} alt="cover" />
                            <div>
                              <div>{book.title}</div>
                              <small className="text-muted">{book.author}</small>
                            </div>
                          </div>
                        </td>
                        <td>{book.borrow}</td>
                        <td>{book.due}</td>
                        <td><span className="status-badge borrowed">Borrowed</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-info">
                            <i className="bi bi-arrow-repeat"></i> Renew
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* My Reservations */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">My Reservations</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Reservation Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: 'Harry Potter',
                        author: 'J.K. Rowling',
                        date: 'Jul 28, 2023',
                        status: 'Ready for pickup',
                        badge: 'available',
                        btnStyle: 'success',
                        icon: 'bi-check-circle',
                        label: 'Checkout',
                        img: 'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=Potter',
                      },
                      {
                        title: 'The Alchemist',
                        author: 'Paulo Coelho',
                        date: 'Aug 01, 2023',
                        status: 'Waiting list: #2',
                        badge: 'borrowed',
                        btnStyle: 'danger',
                        icon: 'bi-x-circle',
                        label: 'Cancel',
                        img: 'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=Alchemist',
                      },
                    ].map((res, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src={res.img} className="me-3" style={{ width: 35 }} alt="cover" />
                            <div>
                              <div>{res.title}</div>
                              <small className="text-muted">{res.author}</small>
                            </div>
                          </div>
                        </td>
                        <td>{res.date}</td>
                        <td><span className={`status-badge ${res.badge}`}>{res.status}</span></td>
                        <td>
                          <button className={`btn btn-sm btn-outline-${res.btnStyle}`}>
                            <i className={`bi ${res.icon}`}></i> {res.label}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Summary + Limits */}
        <div className="col-md-4">
          {/* Borrowing Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Borrowing Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Total Books Borrowed:</span>
                <strong>42</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Late Returns:</span>
                <strong className="text-danger">2</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Renewals This Year:</span>
                <strong>8</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Favorite Category:</span>
                <strong>Fiction</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Member Since:</span>
                <strong>Jan 15, 2022</strong>
              </div>
            </div>
          </div>

          {/* Borrowing Limits */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Borrowing Limits</h5>
            </div>
            <div className="card-body">
              {[
                { label: 'Books Borrowed', value: '3/5', percent: 60, color: 'bg-success' },
                { label: 'Reservations', value: '2/3', percent: 66, color: 'bg-warning' },
                { label: 'Renewals Left', value: '1/2', percent: 50, color: 'bg-info' },
                { label: 'Days Until Next Borrow', value: '0', percent: 100, color: 'bg-success' },
              ].map((limit, idx) => (
                <div className="mb-3" key={idx}>
                  <div className="d-flex justify-content-between mb-1">
                    <span>{limit.label}</span>
                    <span>{limit.value}</span>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-bar ${limit.color}`}
                      role="progressbar"
                      style={{ width: `${limit.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
