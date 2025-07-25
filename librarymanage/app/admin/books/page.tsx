"use client";

import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ Required for modals

export default function BooksPage() {
  useEffect(() => {
    // Ensure Bootstrap modal JS is loaded
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div className="container-fluid text-white">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Books Management</h2>
        <button className="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#addBookModal">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Book
        </button>
      </div>

      {/* Books Table */}
      <div className="card bg-dark text-white border-secondary">
        <div className="card-header">
          <h5 className="mb-0">All Books</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover align-middle">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BK-001</td>
                  <td>The Great Gatsby</td>
                  <td>F. Scott Fitzgerald</td>
                  <td>Fiction</td>
                  <td><span className="badge bg-success">Available</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-info me-2" data-bs-toggle="modal" data-bs-target="#editBookModal">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                {/* More rows... */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Add Book Modal */}
      <div className="modal fade" id="addBookModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add New Book</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select">
                    <option>Fiction</option>
                    <option>Non-Fiction</option>
                    <option>Science</option>
                    <option>History</option>
                    <option>Biography</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows={3}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Add Book</button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Edit Book Modal */}
      <div className="modal fade" id="editBookModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Edit Book</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" defaultValue="The Great Gatsby" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Author</label>
                  <input type="text" className="form-control" defaultValue="F. Scott Fitzgerald" />
                </div>
                <div className="mb-3">
                  <label className="form-label">ISBN</label>
                  <input type="text" className="form-control" defaultValue="978-0743273565" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" defaultValue="Fiction">
                    <option>Fiction</option>
                    <option>Non-Fiction</option>
                    <option>Science</option>
                    <option>History</option>
                    <option>Biography</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" defaultValue="Available">
                    <option>Available</option>
                    <option>Borrowed</option>
                    <option>Reserved</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
