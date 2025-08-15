'use client';

import React, { useEffect, useState } from 'react';

interface Book {
  title: string;
  author: string;
}

interface Reservation {
  id: string;
  reservedAt: string;
  expiresAt:string;
  status: string;
  book: Book;
}

export default function MyBooksPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const now=new Date();

  const fetchReservations = async () => {
    try {
      const res = await fetch("/api/reserve");
      const data = await res.json();
      console.log("data is ", data);

      // Make sure we use the correct key and fallback to []
      setReservations(data.reservation || data.reservations || []);
    } catch (err) {
      console.error("Error fetching reservations:", err);
      setReservations([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
              {loading ? (
                <p>Loading reservations...</p>
              ) : (
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
                      {reservations.length > 0 ? (
                        reservations.map((r) => (
                          <tr key={r.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div>
                                  <div>{r.book?.title}</div>
                                  <small className="text-muted">{r.book?.author}</small>
                                </div>
                              </div>
                            </td>
                            <td>{new Date(r.reservedAt).toLocaleDateString()}</td>
                            <td>
                              <span className={`status-badge ${r.status.toLowerCase()}`}>
                                {r.status}
                              </span>
                            </td>
                            <td>
                              {now >= new Date(r.expiresAt)?(
                              <button className="btn btn-sm btn-outline-success">
                                <i className="bi bi-check-circle"></i> checkout
                              </button>
                              ):(
                              <button className="btn btn-sm btn-outline-danger">
                                <i className="bi bi-x-circle"></i> Cancel
                              </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            No reservations found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
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
