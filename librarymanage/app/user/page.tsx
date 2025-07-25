'use client';

import React from 'react';

export default function UserDashboardPage() {
  return (
    <div className="page-section active">
      <h2 className="page-title">User Dashboard</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        {[
          {
            title: 'Borrowed Books',
            value: 3,
            icon: 'bi-book',
            border: 'border-primary',
            bg: 'bg-primary',
            text: 'All on time',
            iconColor: 'text-muted',
          },
          {
            title: 'Days Remaining',
            value: 14,
            icon: 'bi-calendar-check',
            border: 'border-success',
            bg: 'bg-success',
            text: 'Nearest due date',
            iconColor: 'text-success',
          },
          {
            title: 'Reservations',
            value: 2,
            icon: 'bi-bookmark-star',
            border: 'border-warning',
            bg: 'bg-warning',
            text: 'Waiting for pickup',
            iconColor: 'text-warning',
          },
          {
            title: 'Reading Goal',
            value: '75%',
            icon: 'bi-award',
            border: 'border-info',
            bg: 'bg-info',
            text: '15 of 20 books',
            iconColor: 'text-info',
          },
        ].map((stat, index) => (
          <div className="col-md-3" key={index}>
            <div className={`card stat-card ${stat.border}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-uppercase text-muted">{stat.title}</h6>
                    <h2 className="mb-0">{stat.value}</h2>
                  </div>
                  <div className={`icon-shape ${stat.bg}`}>
                    <i className={`bi ${stat.icon} fs-4`}></i>
                  </div>
                </div>
                <p className={`mt-3 mb-0 ${stat.iconColor}`}>
                  <i className="bi bi-info-circle"></i> <span>{stat.text}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Borrowed Books Table */}
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Currently Borrowed Books</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        title: 'The Great Gatsby',
                        author: 'F. Scott Fitzgerald',
                        dueDate: 'Aug 15, 2023',
                        cover:
                          'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=Gatsby',
                      },
                      {
                        title: 'To Kill a Mockingbird',
                        author: 'Harper Lee',
                        dueDate: 'Aug 18, 2023',
                        cover:
                          'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=Mockingbird',
                      },
                      {
                        title: '1984',
                        author: 'George Orwell',
                        dueDate: 'Aug 10, 2023',
                        cover:
                          'https://via.placeholder.com/50x70/1a1a1a/cccccc?text=1984',
                      },
                    ].map((book, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={book.cover}
                              className="me-3"
                              alt="cover"
                              style={{ width: 35 }}
                            />
                            <div>
                              <div>{book.title}</div>
                              <small className="text-muted">{book.author}</small>
                            </div>
                          </div>
                        </td>
                        <td>{book.dueDate}</td>
                        <td>
                          <span className="status-badge borrowed">Borrowed</span>
                        </td>
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
        </div>

        {/* Reading Progress */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Reading Progress</h5>
            </div>
            <div className="card-body">
              {[
                {
                  label: 'Reading Goal',
                  value: '15/20',
                  progress: 75,
                  color: 'bg-success',
                },
                {
                  label: 'Current Books',
                  value: '3',
                  progress: 100,
                  color: 'bg-primary',
                },
                {
                  label: 'Pages Read',
                  value: '1,245',
                  progress: 62,
                  color: 'bg-info',
                },
                {
                  label: 'Days Streak',
                  value: '14 days',
                  progress: 47,
                  color: 'bg-warning',
                },
              ].map((item, idx) => (
                <div className="mb-3" key={idx}>
                  <div className="d-flex justify-content-between mb-1">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-bar ${item.color}`}
                      role="progressbar"
                      style={{ width: `${item.progress}%` }}
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
