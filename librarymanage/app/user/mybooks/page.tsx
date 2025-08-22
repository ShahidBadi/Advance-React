'use client';

import { error } from 'console';
import React, { useEffect, useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
}
interface Borrow {
  id: string;
  issuedAt: string;
  dueAt: string;
  book: Book;
}

interface Reservation {
  id: string;
  reservedAt: string;
  expiresAt: string;
  status: string;
  book: Book;
}

export default function MyBooksPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [borrows, setBorrows] = useState<Borrow[]>([]);


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
  const fetchBorrows = async () => {
    try {
      const res = await fetch("/api/borrow");
      if (!res) {
        throw new Error("failed to fetched")
      }
      const data = await res.json();
      setBorrows(data.borrows || []);
    } catch (err) {
      console.error("Error fetching borrows:", err);
      setBorrows([]);
    }
  };
  const handleCheckout = async (reservation: Reservation) => {
    if (!reservation.book?.id) {
      console.error("Missing bookId in reservation:", reservation);
      return;
    }
    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: reservation.book.id,
          dueDate,
        }),
      });

      if (!res.ok) throw new Error("Checkout failed");
      await fetchBorrows(); // refresh borrowed list
      await fetchReservations(); // refresh reservations
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
   const handleReturn = async (borrowId: string) => {
    try {
      const res = await fetch(`/api/borrow/${borrowId}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Return failed");

      await fetchBorrows(); // refresh list
      await fetchReservations();
    } catch (err) {
      console.error("Return error:", err);
    }
  };
   const handleRenew = async (id: string) => {
    try {
      const res = await fetch(`/api/renew/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      if (res.ok) {
        alert("Book renewed successfully!");
        fetchBorrows(); // refresh list
      } else {
        alert(data.error || "Failed to renew book");
      }
    } catch (err) {
      console.error("Renew error:", err);
      alert("Something went wrong!");
    }
  };
  const now = new Date();
  const getStatus = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    return now > due ? "Overdue ❌" : "Active ✅";
  };
  useEffect(() => {
    fetchReservations();
    fetchBorrows();
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
                    {borrows.map((b, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* <img src={book.img} className="me-3" style={{ width: 35 }} alt="cover" /> */}
                            <div>
                              <div>{b.book.title}</div>
                              <small className="text-muted">{b.book.author}</small>
                            </div>
                          </div>
                        </td>
                        <td>{new Date(b.issuedAt).toLocaleDateString()}</td>
                        <td>{new Date(b.dueAt).toLocaleDateString()}</td>
                        <td><span className="status-badge borrowed">{getStatus(b.dueAt)}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-info" onClick={()=>{handleRenew(b.id)}}>
                            <i className="bi bi-arrow-repeat"></i> Renew
                          </button>
                          <button
                          onClick={()=>{handleReturn(b.id)}}
                            className="btn btn-sm btn-outline-danger"
                            style={{marginLeft:5}}
                          >
                            <i className="bi bi-box-arrow-left"></i> Return
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
                              {now <= new Date(r.expiresAt) ? (
                                <button className="btn btn-sm btn-outline-success"
                                  onClick={() => { handleCheckout(r) }}>
                                  <i className="bi bi-check-circle"></i> checkout
                                </button>
                              ) : (
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
