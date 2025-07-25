// ✅ File: app/admin/page.tsx
"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function AdminDashboard() {
  return (
    <div className="main-content text-white">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand navbar-dark sticky-top mb-4 bg-dark">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button className="btn btn-sm btn-outline-light d-md-none me-2">
              <i className="bi bi-list"></i>
            </button>
            <h5 className="mb-0">Dashboard</h5>
          </div>

          <div className="d-flex ms-auto align-items-center">
            <div className="input-group me-3" style={{ width: 300 }}>
              <input type="text" className="form-control" placeholder="Search..." />
              <button className="btn btn-outline-light" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>

            <div className="dropdown">
              <a href="#" className="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                <img
                  src="https://via.placeholder.com/32"
                  alt="user"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Header */}
      <h2 className="page-title mb-4">Dashboard</h2>

      {/* Statistic Cards */}
      <div className="row mb-4">
        {[
          {
            title: "Total Books",
            count: "8,542",
            icon: "bi-book",
            color: "primary",
            note: "120 new this month",
            trend: "up",
          },
          {
            title: "Active Members",
            count: "1,248",
            icon: "bi-people",
            color: "success",
            note: "42 new this month",
            trend: "up",
          },
          {
            title: "Borrowed Books",
            count: "2,154",
            icon: "bi-arrow-up-right-circle",
            color: "warning",
            note: "12 overdue",
            trend: "down",
          },
          {
            title: "Overdue Books",
            count: "47",
            icon: "bi-exclamation-triangle",
            color: "danger",
            note: "7 days average",
            trend: "clock",
          },
        ].map((stat, idx) => (
          <div className="col-md-3" key={idx}>
            <div className={`card stat-card border-${stat.color}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="text-uppercase text-muted">{stat.title}</h6>
                    <h2 className="mb-0">{stat.count}</h2>
                  </div>
                  <div className={`icon-shape bg-${stat.color}`}>
                    <i className={`bi ${stat.icon} fs-4`}></i>
                  </div>
                </div>
                <p className={`mt-3 mb-0 text-${stat.color}`}>
                  <i className={`bi bi-${stat.trend}`}></i> <span>{stat.note}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="row">
        {/* Recent Transactions */}
        <div className="col-md-8">
          <div className="card mb-4 bg-dark text-white">
            <div className="card-header">
              <h5 className="card-title mb-0">Recent Transactions</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Book</th>
                      <th>Member</th>
                      <th>Date</th>
                      <th>Due Date</th>
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
                      <td><span className="badge bg-info">Borrowed</span></td>
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
                    <tr>
                      <td>TRX-00122</td>
                      <td>Pride and Prejudice</td>
                      <td>Sarah Davis</td>
                      <td>2023-07-17</td>
                      <td>2023-07-31</td>
                      <td><span className="badge bg-info">Borrowed</span></td>
                    </tr>
                    <tr>
                      <td>TRX-00121</td>
                      <td>The Hobbit</td>
                      <td>Robert Wilson</td>
                      <td>2023-07-16</td>
                      <td>2023-07-30</td>
                      <td><span className="badge bg-success">Returned</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Book Categories */}
        <div className="col-md-4">
          <div className="card mb-4 bg-dark text-white">
            <div className="card-header">
              <h5 className="card-title mb-0">Book Categories</h5>
            </div>
            <div className="card-body">
              {[
                { name: 'Fiction', percent: 42, color: 'primary' },
                { name: 'Non-Fiction', percent: 28, color: 'success' },
                { name: 'Science', percent: 15, color: 'warning' },
                { name: 'History', percent: 8, color: 'info' },
                { name: 'Biography', percent: 7, color: 'danger' },
              ].map((cat, idx) => (
                <div className="mb-3" key={idx}>
                  <div className="d-flex justify-content-between mb-1">
                    <span>{cat.name}</span>
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
        </div>
      </div>
    </div>
  );
}
