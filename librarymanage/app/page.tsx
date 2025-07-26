import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Home() {
  return (
    <>
       <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white text-center px-3">
      <div>
        <h1 className="display-4 fw-bold">
          Welcome to <span className="text-primary">Library Management System</span>
        </h1>
        {/* <p className="lead mt-3">
          Efficiently manage books, members, and transactions in one place.
        </p> */}
        <Link href="/login" className="btn btn-outline-light btn-lg mt-4">
          Go to Admin User Dashboard
        </Link><br />
      </div>
    </div>

    </>
  );
}
