// app/user/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './layout.css'; // move your <style> content here
import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'LibraTech - User Portal',
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Sidebar */}
        <div className="sidebar d-flex flex-column p-3" style={{ width: '250px' }}>
          <div className="d-flex align-items-center mb-4">
            <i className="bi bi-book fs-3 text-primary me-2"></i>
            <span className="logo-text fs-4 fw-bold">
              Libra<span className="text-primary">Tech</span>
            </span>
          </div>
          <hr className="text-muted" />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="/user" className="nav-link">
                <i className="bi bi-speedometer2"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/user/browsebooks" className="nav-link">
                <i className="bi bi-book"></i>
                <span>Browse Books</span>
              </a>
            </li>
            <li>
              <a href="/user/mybooks" className="nav-link">
                <i className="bi bi-journal-bookmark"></i>
                <span>My Books</span>
              </a>
            </li>
            <li>
              <a href="/user/history" className="nav-link">
                <i className="bi bi-clock-history"></i>
                <span>Borrowing History</span>
              </a>
            </li>
            <li>
              <a href="/user/myprofile" className="nav-link">
                <i className="bi bi-person-circle"></i>
                <span>My Profile</span>
              </a>
            </li>
          </ul>
          <hr className="text-muted" />
          <div className="mt-auto">
            <a href="/user/myprofile" className="d-flex align-items-center text-white text-decoration-none">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                width="40"
                height="40"
                className="rounded-circle me-2"
              />
              <div>
                <strong>John Reader</strong>
                <small className="d-block text-muted">Premium Member</small>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <nav className="navbar navbar-expand navbar-dark sticky-top mb-4">
            <div className="container-fluid">
              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-outline-light d-md-none me-2">
                  <i className="bi bi-list"></i>
                </button>
                <h5 className="mb-0">LibraTech Portal</h5>
              </div>

              <div className="d-flex ms-auto align-items-center">
                <div className="input-group me-3" style={{ width: '300px' }}>
                  <input type="text" className="form-control" placeholder="Search books..." />
                  <button className="btn btn-outline-light" type="button">
                    <i className="bi bi-search"></i>
                  </button>
                </div>

                <div className="dropdown">
                  <a
                    href="#"
                    className="d-block link-light text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://via.placeholder.com/32"
                      alt="user"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li>
                      <a className="dropdown-item" href="/user/myprofile">
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Settings</a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          {children}
        </div>

        {/* Bootstrap Script */}
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}
