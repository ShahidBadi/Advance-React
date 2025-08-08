"use client";
import React, { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MembersPage() {
  const [message, setMessage] = useState("");
    const [members, setMembers] = useState<any[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Fetch members
  async function fetchMembers() {
    try {
      const res = await fetch("/api/member");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);
  return (
    <div className="container-fluid text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Members Management</h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addMemberModal">
          <i className="bi bi-person-plus me-1"></i> Add New Member
        </button>
      </div>

      <div className="card bg-dark border-secondary">
        <div className="card-header">
          <h5 className="mb-0 text-white">Library Members</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead className="table-secondary text-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>Phone</th> */}
                  <th>Membership</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member,index)=>(
                    <tr>
                  <td>{index+1}</td>
                  <td>{member.userName}</td>
                  <td>{member.userEmail}</td>
                  {/* <td>(555) 123-4567</td> */}
                  <td>{member.userType}</td>
                  <td><span className="badge bg-success">Active</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-info me-2" data-bs-toggle="modal" data-bs-target="#editMemberModal">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                ))}
                
                {/* More rows can be added here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <div className="modal fade" id="addMemberModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add New Member</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Membership Type</label>
                  <select className="form-select">
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Student</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Add Member</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Member Modal */}
      <div className="modal fade" id="editMemberModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Edit Member</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" defaultValue="John Smith" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" defaultValue="john@example.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="tel" className="form-control" defaultValue="(555) 123-4567" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Membership Type</label>
                  <select className="form-select" defaultValue="Premium">
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Student</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" defaultValue="Active">
                    <option>Active</option>
                    <option>Inactive</option>
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
