'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../login.css'; // Reuse styles from login if applicable

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="row g-0" style={{width:"2000px"}}>
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
              <p className="auth-subtitle">Sign up to manage your library activity</p>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="john@example.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" placeholder="Create password" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Repeat password" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>

                {/* <div className="divider">or sign up with</div>
                <div className="social-login">
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
