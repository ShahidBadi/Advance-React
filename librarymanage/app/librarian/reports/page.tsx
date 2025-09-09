// ✅ File: app/admin/reports/page.tsx
"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ReportsPage() {
  return (
    <div className="container-fluid text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Reports</h2>
        <button className="btn btn-outline-light">
          <i className="bi bi-download me-2"></i>
          Export Reports
        </button>
      </div>

      <div className="row">
        {/* Report: Top Borrowed Books */}
        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary mb-4">
            <div className="card-header">
              <h5 className="mb-0">Top Borrowed Books</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                  <span>The Great Gatsby</span>
                  <span>120 borrows</span>
                </li>
                <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                  <span>To Kill a Mockingbird</span>
                  <span>110 borrows</span>
                </li>
                <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                  <span>1984</span>
                  <span>98 borrows</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Report: Active Members */}
        <div className="col-md-6">
          <div className="card bg-dark text-white border-secondary mb-4">
            <div className="card-header">
              <h5 className="mb-0">Most Active Members</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                  <span>John Smith</span>
                  <span>32 books</span>
                </li>
                <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                  <span>Emma Johnson</span>
                  <span>27 books</span>
                </li>
                <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                  <span>Michael Brown</span>
                  <span>24 books</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Report: Overdue Stats */}
        <div className="col-md-12">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-header">
              <h5 className="mb-0">Overdue Statistics</h5>
            </div>
            <div className="card-body">
              <p>Total Overdue Books: <strong>47</strong></p>
              <p>Average Days Overdue: <strong>7 days</strong></p>
              <p>Most Overdue Book: <strong>1984 by George Orwell (14 days)</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
