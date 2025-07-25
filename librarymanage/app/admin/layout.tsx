// ✅ File: app/admin/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css';
import Link from 'next/link';
import './layout.css';


export const metadata = {
  title: 'Library Admin Panel',
  description: 'Admin dashboard for managing library system',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      {/* Sidebar */}
      <aside className="bg-black p-3" style={{ width: '250px', minHeight: '100vh' }}>
        <h4 className="text-white mb-4">
          <i className="bi bi-journal-bookmark-fill me-2"></i>Library Admin
        </h4>
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link href="/admin" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/books" className="nav-link text-white">
              <i className="bi bi-book-half me-2"></i>Books
            </Link>
          </li>
          <li>
            <Link href="/admin/members" className="nav-link text-white">
              <i className="bi bi-people me-2"></i>Members
            </Link>
          </li>
          <li>
            <Link href="/admin/transaction" className="nav-link text-white">
              <i className="bi bi-arrow-left-right me-2"></i>Transactions
            </Link>
          </li>
          <li>
            <Link href="/admin/reports" className="nav-link text-white">
              <i className="bi bi-bar-chart-line me-2"></i>Reports
            </Link>
          </li>
          <li>
            <Link href="/admin/profile" className="nav-link text-white">
              <i className="bi bi-person-circle me-2"></i>Profile
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">{children}</main>
    </div>
  );
}
