'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../login.css';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { json } from 'stream/consumers';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [message, setMessage] = useState('');

  const handlesubmit = async (e: React.FormEvent) => {
    if (!email || !password || !usertype) {
      setMessage("All fields are required");
      return;
    }
    try {
      const res = await fetch("loginapi/api/login", {
        method: 'POST',
        body: JSON.stringify({
          userEmail: email.toLowerCase(),
          userPassword: password,
          userType: usertype,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await res.json();
      console.log(data);
      console.log("badi")
      if (res.ok) {
        setMessage('login successful');
        const type = data.userType.toLowerCase();
          
        if (type === 'admin') {
          router.push('/admin');
          return;
        } else if (type === 'student') {
          router.push('/user');
          return;
        } else {
          setMessage("You don't redirect anywhere");
        }
      
      }
      else {
        setMessage(data.error || 'login failed')
      }
    }
    catch (err) {
      console.error('Login error:', err);
      setMessage('something went wrong')
    }
  };

  return (
    <div className="auth-container">
      <div className="row g-0" style={{ width: "2000px" }}>
        {/* Left Pane */}
        {/* <div className="col-lg-6 d-none d-lg-block">
          <div className="auth-left h-100">
            <i className="bi bi-book floating-book book-1"></i>
            <i className="bi bi-journal-bookmark floating-book book-2"></i>
            <div className="position-relative">
              <h2 className="text-white mb-4">Welcome to LibraTech</h2>
              <p className="text-white mb-5">Your gateway to a world of knowledge. Manage your library experience with our intuitive platform.</p>
              <ul className="auth-features list-unstyled">
                <li><i className="bi bi-check-circle"></i> Access thousands of books</li>
                <li><i className="bi bi-check-circle"></i> Track your reading history</li>
                <li><i className="bi bi-check-circle"></i> Manage borrowings and reservations</li>
                <li><i className="bi bi-check-circle"></i> Personalized recommendations</li>
                <li><i className="bi bi-check-circle"></i> Secure data</li>
              </ul>
            </div>
          </div>
        </div> */}

        {/* Right Pane (Login/Register) */}
        <div className="col-lg-12">
          <div className="auth-right h-100">
            <div className="auth-card h-100">
              <div className="auth-logo">
                <i className="bi bi-book"></i>
                <div className="auth-logo-text">Libra<span>Tech</span></div>
              </div>

              {/* Login Form */}
              <h3 className="auth-title">Sign In</h3>
              <p className="auth-subtitle">Access your LibraTech account</p>
              <form onSubmit={handlesubmit}>
                <div className="mb-4">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                </div>
                <div className="mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </div>
                <div className="mb-3">
                  <label>User Type</label>
                  <select className="form-select" value={usertype} onChange={(e) => setUsertype(e.target.value)}>
                    <option value="">Select type</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                {/* <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" id="remember" />
                  <label className="form-check-label" htmlFor="remember">Remember me</label>
                </div> */}
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
                {message && <div className='alert alert-info mt-3 text-center'>{message}</div>}
                <div className="divider">or continue with</div>
                {/* <div className="social-login">
                  <button type="button" className="btn btn-outline-light w-100 mb-2">
                    <i className="bi bi-google me-2"></i> Google
                  </button>
                  <button type="button" className="btn btn-outline-light w-100 mb-2">
                    <i className="bi bi-microsoft me-2"></i> Microsoft
                  </button>
                  <button type="button" className="btn btn-outline-light w-100">
                    <i className="bi bi-github me-2"></i> GitHub
                  </button>
                </div> */}
                <div className="auth-switch text-center mt-4">
                  Don’t have an account? <a href="/register">Register</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
