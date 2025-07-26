// ✅ File: app/admin/page.tsx
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminDashboard() {
  return (
    <div className="container-fluid text-light">
      <h2 className="mb-4">Dashboard</h2>

      {/* Stat Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-bg-dark border-primary">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted text-uppercase">Total Books</h6>
                <h2>8,542</h2>
              </div>
              <div className="icon-shape bg-primary p-3 rounded">
                <i className="bi bi-book fs-4"></i>
              </div>
            </div>
            <p className="text-success px-3 pb-2">
              <i className="bi bi-arrow-up"></i> 120 new this month
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-dark border-success">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted text-uppercase">Active Members</h6>
                <h2>1,248</h2>
              </div>
              <div className="icon-shape bg-success p-3 rounded">
                <i className="bi bi-people fs-4"></i>
              </div>
            </div>
            <p className="text-success px-3 pb-2">
              <i className="bi bi-arrow-up"></i> 42 new this month
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-dark border-warning">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted text-uppercase">Borrowed Books</h6>
                <h2>2,154</h2>
              </div>
              <div className="icon-shape bg-warning p-3 rounded">
                <i className="bi bi-arrow-up-right-circle fs-4"></i>
              </div>
            </div>
            <p className="text-danger px-3 pb-2">
              <i className="bi bi-arrow-down"></i> 12 overdue
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-bg-dark border-danger">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-muted text-uppercase">Overdue Books</h6>
                <h2>47</h2>
              </div>
              <div className="icon-shape bg-danger p-3 rounded">
                <i className="bi bi-exclamation-triangle fs-4"></i>
              </div>
            </div>
            <p className="text-warning px-3 pb-2">
              <i className="bi bi-clock"></i> 7 days average
            </p>
          </div>
        </div>
      </div>

      {/* Transactions and Categories */}
      <div className="row">
        {/* Recent Transactions */}
        <div className="col-md-8">
          <div className="card bg-dark border-secondary mb-4">
            <div className="card-header border-bottom">
              <h5 className="mb-0" style={{color:"white"}}>Recent Transactions</h5>
            </div>
            <div className="card-body">
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>Member</th>
                    <th>Date</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TRX-00125</td>
                    <td>The Great Gatsby</td>
                    <td>John Smith</td>
                    <td>2023-07-20</td>
                    <td>2023-08-03</td>
                    <td><span className="badge bg-warning">Borrowed</span></td>
                  </tr>
                  <tr>
                    <td>TRX-00124</td>
                    <td>To Kill a Mockingbird</td>
                    <td>Emma Johnson</td>
                    <td>2023-07-19</td>
                    <td>2023-08-02</td>
                    <td><span className="badge bg-success">Returned</span></td>
                  </tr>
                  <tr>
                    <td>TRX-00123</td>
                    <td>1984</td>
                    <td>Michael Brown</td>
                    <td>2023-07-18</td>
                    <td>2023-07-25</td>
                    <td><span className="badge bg-danger">Overdue</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Book Categories */}
        {/* <div className="col-md-4">
          <div className="card bg-dark border-secondary mb-4">
            <div className="card-header border-bottom">
              <h5 className="mb-0" style={{color:"white"}}>Book Categories</h5>
            </div>
            <div className="card-body">
              {[
                { label: "Fiction", percent: 42, color: "primary" },
                { label: "Non-Fiction", percent: 28, color: "success" },
                { label: "Science", percent: 15, color: "warning" },
                { label: "History", percent: 8, color: "info" },
                { label: "Biography", percent: 7, color: "danger" },
              ].map((cat, i) => (
                <div key={i} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>{cat.label}</span>
                    <span>{cat.percent}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-bar bg-${cat.color}`}
                      role="progressbar"
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
