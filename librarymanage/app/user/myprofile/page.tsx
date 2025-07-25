'use client';

import React from 'react';

export default function MyProfilePage() {
  return (
    <div className="page-section active">
      <h2 className="page-title">My Profile</h2>

      <div className="row">
        {/* Profile card (left column) */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/150"
                className="user-avatar mb-3"
                alt="User Avatar"
              />
              <h4>John Reader</h4>
              <p className="text-muted">Premium Member</p>

              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-pencil me-1"></i> Edit Profile
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-lock me-1"></i> Change Password
                </button>
              </div>

              <hr className="my-4" />

              <h5 className="mb-3">Membership Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent text-light d-flex justify-content-between">
                  <span>Member ID:</span>
                  <span>M-00125</span>
                </li>
                <li className="list-group-item bg-transparent text-light d-flex justify-content-between">
                  <span>Type:</span>
                  <span>Premium</span>
                </li>
                <li className="list-group-item bg-transparent text-light d-flex justify-content-between">
                  <span>Status:</span>
                  <span className="status-badge active-member">Active</span>
                </li>
                <li className="list-group-item bg-transparent text-light d-flex justify-content-between">
                  <span>Expires:</span>
                  <span>Dec 31, 2023</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Profile form + settings (right column) */}
        <div className="col-md-8">
          {/* Personal Info Form */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">Personal Information</h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" defaultValue="John" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" defaultValue="Reader" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" defaultValue="john.reader@example.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="text" className="form-control" defaultValue="(555) 123-4567" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" rows={2} defaultValue="123 Library Street, Bookville, BK 12345" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Reading Preferences</label>
                  <select className="form-select" defaultValue="All Genres">
                    <option>Fiction</option>
                    <option>Non-Fiction</option>
                    <option>Science Fiction</option>
                    <option>Fantasy</option>
                    <option>All Genres</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
          </div>

          {/* Account Settings */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Account Settings</h5>
            </div>
            <div className="card-body">
              {/* Notification Preferences */}
              <div className="mb-3">
                <label className="form-label">Notification Preferences</label>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="notif1" defaultChecked />
                  <label className="form-check-label" htmlFor="notif1">
                    Due date reminders
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="notif2" defaultChecked />
                  <label className="form-check-label" htmlFor="notif2">
                    Reservation availability
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="notif3" />
                  <label className="form-check-label" htmlFor="notif3">
                    New arrivals in my interests
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="notif4" defaultChecked />
                  <label className="form-check-label" htmlFor="notif4">
                    Library events and news
                  </label>
                </div>
              </div>

              {/* Reading Goal Slider */}
              <div className="mb-3">
                <label className="form-label">Reading Goal for 2023</label>
                <input type="range" className="form-range" min={1} max={50} defaultValue={20} />
                <div className="form-text">Target: 20 books</div>
              </div>

              <div className="d-grid">
                <button className="btn btn-outline-danger">
                  <i className="bi bi-box-arrow-right me-1"></i> Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
