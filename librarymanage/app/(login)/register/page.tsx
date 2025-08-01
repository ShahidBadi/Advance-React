'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../login.css'; // Reuse styles from login if applicable
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setform] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    password: '',
    confirmpassword: '',
    userType: ''
  });
  const [message, setMessage] = useState("");
  const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setform({ ...form, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e:
    React.FormEvent
  ) => {
    e.preventDefault();
    if (form.password !== form.confirmpassword) {
      setMessage("password do not match");
      return;
    }
    const res = await fetch("/admin/api/user", {
      method: 'POST',
      body: JSON.stringify({
        userFirstName: form.firstName,
        userLastName: form.lastName,
        userName: form.fullName,
        userEmail: form.email,
        userPassword: form.password,
        userType: form.userType
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await res.json();
    console.log("result is",result)

    if (!res.ok) {
      setMessage(result.error);
    } else {
      setMessage("Registration successful!");
        router.push('/login');
    }
  }

  return (
    <div className="auth-container">
      <div className="row g-0" style={{ width: "2000px" }}>
        {/* <div className="col-lg-6 d-none d-lg-block">
          <div className="auth-left h-100">
            <i className="bi bi-book floating-book book-1"></i>
            <i className="bi bi-journal-bookmark floating-book book-2"></i>
            <div className="position-relative">
              <h2 className="text-white mb-4">Join LibraTech</h2>
              <p className="text-white mb-5">Discover a seamless library experience with your personalized account.</p>
              <ul className="auth-features list-unstyled">
                <li><i className="bi bi-check-circle"></i> Create and manage your profile</li>
                <li><i className="bi bi-check-circle"></i> Track your reading journey</li>
                <li><i className="bi bi-check-circle"></i> Reserve and borrow books</li>
                <li><i className="bi bi-check-circle"></i> Stay up-to-date with alerts</li>
                <li><i className="bi bi-check-circle"></i> And much more!</li>
              </ul>
            </div>
          </div>
        </div> */}

        <div className="col-lg-12">
          <div className="auth-right h-100">
            <div className="auth-card h-100">
              <div className="auth-logo">
                <i className="bi bi-book"></i>
                <div className="auth-logo-text">Libra<span>Tech</span></div>
              </div>

              <h3 className="auth-title">Create Account</h3>
              {/* <p className="auth-subtitle">Sign up to manage your library activity</p> */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" >FistName</label>
                  <input type="text" className="form-control" name='firstName'
                    value={form.firstName}
                    onChange={handlechange} placeholder='Enter First Name' required />
                </div>
                <div className="mb-3">
                  <label className="form-label">LastName</label>
                  <input type="text" className="form-control" name='lastName'
                    value={form.lastName}
                    onChange={handlechange} placeholder='Enter Last Name' required />
                </div>
                <div className="mb-3">
                  <label className="form-label">FullName</label>
                  <input type="text" className="form-control" name='fullName'
                    value={form.fullName}
                    onChange={handlechange} placeholder='Enter Full Name' required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name='email'
                    value={form.email}
                    onChange={handlechange} placeholder='Enter Email' required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name='password'
                    value={form.password}
                    onChange={handlechange} placeholder='Create password' required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name='confirmpassword'
                    value={form.confirmpassword}
                    onChange={handlechange} placeholder='Repeat password' required />
                </div>
                <div className="mb-4">
                  <label>User Type</label>
                  <select className="form-select" name='userType'
                    value={form.userType} onChange={handlechange}>
                    <option value="">Select type</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
                <div className="auth-switch text-center mt-4">
                  Already have an account? <a href="/login">Login</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
