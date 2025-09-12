"use client";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Member {
  id: string;
  userFirstName: string;
  userLastName: string;
  userName: string;
  userEmail: string;
  userType: string;
  // status?: string;
  isBlocked:Boolean;
}

export default function MembersPage() {
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    Email: "",
    Password: "",
    UserType: "Standard",
    // Status: "Active",
  });

  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Fetch members
  async function fetchMembers() {
    try {
      const res = await fetch("/api/memberlibrarian");
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

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit (Add Member)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!form.FirstName || !form.LastName || !form.UserName || !form.Email || !form.Password) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userFirstName: form.FirstName,
          userLastName: form.LastName,
          userName: form.UserName,
          userEmail: form.Email,
          userPassword: form.Password,
          userType: form.UserType,
          // status: form.Status,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to add member");
      } else {
        alert(result.message || "Member added");
        if (closeRef.current) closeRef.current.click();
        setForm({
          FirstName: "",
          LastName: "",
          UserName: "",
          Email: "",
          Password: "",
          UserType: "Admin",
          // Status: "Active",
        });
        await fetchMembers();
      }
    } catch (err) {
      console.error("Add member error:", err);
      alert("Something went wrong");
    }
  };

  // handle Edit
  const handleEdit = (member: Member) => {
    if (!member) return;
    setEditMember(member);
    setForm({
      FirstName: member.userFirstName,
      LastName: member.userLastName,
      UserName: member.userName,
      Email: member.userEmail,
      Password: "",
      UserType: member.userType,
      
    });
  };

  // handle Update
  const handleUpdate = async () => {
    if (!editMember) return;

    const res = await fetch(`/api/member/${editMember.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userFirstName: form.FirstName,
        userLastName: form.LastName,
        userName: form.UserName,
        userEmail: form.Email,
        ...(form.Password && { userPassword: form.Password }), // update only if entered
        userType: form.UserType,
        // status: form.Status,
      }),
    });

    if (res.ok) {
      await fetchMembers();
      if (closeRef.current) closeRef.current.click();
    } else {
      alert("Failed to update member");
    }
  };

  // handle Delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      await fetch(`/api/member/${id}`, { method: "DELETE" });
      fetchMembers();
    }
  };
  const blockuser=async (id:string)=>{
    await fetch("/api/admin/block",{
      method:"POST",
      headers:{"Content-Type": "application/json" },
      body:JSON.stringify({userId:id})
    });
    fetchMembers();
  }

   const unblockUser = async (id: string) => {
    await fetch("/api/admin/block", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    });
    fetchMembers();
  };

  return (
    <div className="container-fluid text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Members Management</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addMemberModal"
        >
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
                  <th>#</th>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, index) => (
                  <tr key={member.id}>
                    <td>{index + 1}</td>
                    <td>{member.userName}</td>
                    <td>{member.userEmail}</td>
                    <td>{member.userType}</td>
                    <td>
                      {/* <span
                        className={`badge ${
                          member.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {member.status || "Active"}
                      </span> */}
                      {member.isBlocked?"Blocked":"Active"}
                    </td>
                    <td>
                    {member.isBlocked?(
                      <button
                      onClick={()=>{unblockUser(member.id)}}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    style={{backgroundColor:"green"}}
                  >
                    Unblock
                  </button>
                  ):(
                  <button
                  onClick={()=>{blockuser(member.id)}}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    style={{backgroundColor:"red"}}
                  >
                    Block
                  </button>

                    )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-info me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editMemberModal"
                        onClick={() => handleEdit(member)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(member.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted">
                      No members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <div
        className="modal fade"
        id="addMemberModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Add New Member</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="FirstName"
                    value={form.FirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="LastName"
                    value={form.LastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="UserName"
                    value={form.UserName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Type</label>
                  <select
                    className="form-select"
                    name="UserType"
                    value={form.UserType}
                    onChange={handleChange}
                  >
                    <option>Admin</option>
                    <option>Student</option>
                  </select>
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="Status"
                    value={form.Status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div> */}
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Member
                  </button>
                </div>
              </form>
              {message && (
                <div className="mt-2 alert alert-info">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Member Modal */}
      <div
        className="modal fade"
        id="editMemberModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title">Edit Member</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRef}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="FirstName"
                    value={form.FirstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="LastName"
                    value={form.LastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="UserName"
                    value={form.UserName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password (leave blank to keep unchanged)</label>
                  <input
                    type="password"
                    className="form-control"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">User Type</label>
                  <select
                    className="form-select"
                    name="UserType"
                    value={form.UserType}
                    onChange={handleChange}
                  >
                    <option>Admin</option>
                    <option>Student</option>
                  </select>
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    name="Status"
                    value={form.Status}
                    onChange={handleChange}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
