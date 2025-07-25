"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function TransactionPage() {
  return (
    <div className="container-fluid text-white">
      <h2 className="page-title mb-4">Transactions</h2>

      <div className="row mb-4">
        {/* Borrow a Book */}
        <div className="col-md-6">
          <div className="card bg-dark border-secondary">
            <div className="card-header">
              <h5 className="mb-0">Borrow a Book</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Member</label>
                  <select className="form-select">
                    <option>Select a member</option>
                    <option>John Smith (M-00125)</option>
                    <option>Emma Johnson (M-00124)</option>
                    <option>Michael Brown (M-00123)</option>
                    <option>Sarah Davis (M-00122)</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Book</label>
                  <select className="form-select">
                    <option>Select a book</option>
                    <option>The Great Gatsby</option>
                    <option>To Kill a Mockingbird</option>
                    <option>1984</option>
                    <option>Pride and Prejudice</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Process Borrow</button>
              </form>
            </div>
          </div>
        </div>

        {/* Return a Book */}
        <div className="col-md-6">
          <div className="card bg-dark border-secondary">
            <div className="card-header">
              <h5 className="mb-0">Return a Book</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Transaction ID</label>
                  <input type="text" className="form-control" placeholder="Enter transaction ID" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Condition</label>
                  <select className="form-select">
                    <option>Select condition</option>
                    <option>Excellent</option>
                    <option>Good</option>
                    <option>Fair</option>
                    <option>Damaged</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" rows={2} placeholder="Any additional notes"></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">Process Return</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="card bg-dark border-secondary">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Transaction History</h5>
          <select className="form-select form-select-sm w-auto">
            <option>All Transactions</option>
            <option>Borrowed</option>
            <option>Returned</option>
            <option>Overdue</option>
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book</th>
                  <th>Member</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
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
                  <td>-</td>
                  <td><span className="status-badge borrowed">Borrowed</span></td>
                </tr>
                <tr>
                  <td>TRX-00124</td>
                  <td>To Kill a Mockingbird</td>
                  <td>Emma Johnson</td>
                  <td>2023-07-19</td>
                  <td>2023-08-02</td>
                  <td>2023-08-01</td>
                  <td><span className="status-badge available">Returned</span></td>
                </tr>
                <tr>
                  <td>TRX-00123</td>
                  <td>1984</td>
                  <td>Michael Brown</td>
                  <td>2023-07-18</td>
                  <td>2023-07-25</td>
                  <td>2023-08-01</td>
                  <td><span className="status-badge overdue">Overdue</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
