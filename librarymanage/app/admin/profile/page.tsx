// "use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useEffect, useState } from 'react';
import { cookies } from 'next/headers';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@/app/generated/prisma';

export default async function ProfilePage() {
  const prisma =new PrismaClient();
  const cookiestore=cookies();
    const userid=cookiestore.get('userid')?.value;
    if(!userid){
      return <p>user not login</p>
    }
    const user=await prisma.user.findUnique({where:{id:userid}})

    if(!user){
      return <p className="text-danger">User not found</p>;
    }

     if (user.userType !== "Admin") {
    return <p className="text-warning">Access denied. Only Admins can view this page.</p>;
  }
  return (
    <div className="container-fluid text-white">
      <h2 className="page-title">User Profile</h2>

      <div className="row">
        {/* Profile Summary */}
        <div className="col-md-4">
          <div className="card bg-dark text-light mb-4">
            <div className="card-body text-center">
              {/* <img
                src="https://via.placeholder.com/150"
                className="user-avatar mb-3"
                alt="User Avatar"
              /> */}
              <h4>Admin User</h4>
              <p className="text-muted">Library Administrator</p>

              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-pencil me-1"></i> Edit Profile
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-lock me-1"></i> Change Password
                </button>
              </div>

              <hr className="my-4" />

              <h5 className="mb-3">Contact Information</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent text-light d-flex">
                  <i className="bi bi-envelope me-2"></i>
                  {user?.userEmail}
                </li>
                <li className="list-group-item bg-transparent text-light d-flex">
                  <i className="bi bi-telephone me-2"></i>
                  (555) 123-4567
                </li>
                <li className="list-group-item bg-transparent text-light d-flex">
                  <i className="bi bi-geo-alt me-2"></i>
                  123 Library St, Bookville
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="col-md-8">
          <div className="card bg-dark text-light mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">Edit Profile</h5>
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" defaultValue={user?.userFirstName??""} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" defaultValue={user?.userLastName??""} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" defaultValue={user?.userName??""} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" defaultValue={user?.userEmail??""} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <input type="text" className="form-control" defaultValue={user?.userType??""} disabled />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
          </div>

          {/* Activity Log */}
          <div className="card bg-dark text-light">
            <div className="card-header">
              <h5 className="card-title mb-0">Activity Log</h5>
            </div>
            <div className="card-body">
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action bg-transparent text-light">
                  <div className="d-flex w-100 justify-content-between">
                    <h6 className="mb-1">Added new book</h6>
                    <small>2 hours ago</small>
                  </div>
                  <p className="mb-1">The Great Gatsby</p>
                </a>
                {/* Add more logs if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
