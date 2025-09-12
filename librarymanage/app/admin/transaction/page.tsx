// "use client";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useEffect, useState } from 'react';
// interface Book {
//   id: string;
//   title: string;
//   author: string;
// }
// interface Member {
//   id: string;
//   userFirstName: string;
//   userLastName: string;
//   userName:string
// }
// interface Borrow {
//   id: string;
//   trxNumber:string,
//   issuedAt: string;
//   dueAt: string;
//   returnedAt:string
//   renewcount: number;
//   status:string,
//   book: Book;
//   member:Member
// }
// export default function TransactionPage() {
//   const [borrows, setBorrows] = useState<Borrow[]>([]);

//         useEffect(()=>{
//            const fetchBorrows = async () => {
//           try {
//             const res = await fetch("/api/transaction");
//             if (!res) {
//               throw new Error("failed to fetched")
//             }
//             const data = await res.json();
//             console.log("fetched borrows",data)
//             setBorrows(data.borrows || []);
//           } catch (err) {
//             console.error("Error fetching borrows:", err);
//           }
//         };
//         fetchBorrows()
//         },[])
//   return (
//     <div className="container-fluid text-white">
//       <h2 className="page-title mb-4">Transactions</h2>

//       <div className="row mb-4">
//         {/* Borrow a Book */}
//         <div className="col-md-6">
//           <div className="card bg-dark border-secondary">
//             <div className="card-header">
//               <h5 className="mb-0">Borrow a Book</h5>
//             </div>
//             <div className="card-body">
//               <form>
//                 <div className="mb-3">
//                   <label className="form-label">Member</label>
//                   <select className="form-select">
//                     <option>Select a member</option>
//                     <option>John Smith (M-00125)</option>
//                     <option>Emma Johnson (M-00124)</option>
//                     <option>Michael Brown (M-00123)</option>
//                     <option>Sarah Davis (M-00122)</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Book</label>
//                   <select className="form-select">
//                     <option>Select a book</option>
//                     <option>The Great Gatsby</option>
//                     <option>To Kill a Mockingbird</option>
//                     <option>1984</option>
//                     <option>Pride and Prejudice</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Due Date</label>
//                   <input type="date" className="form-control" />
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">Process Borrow</button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Return a Book */}
//         <div className="col-md-6">
//           <div className="card bg-dark border-secondary">
//             <div className="card-header">
//               <h5 className="mb-0">Return a Book</h5>
//             </div>
//             <div className="card-body">
//               <form>
//                 <div className="mb-3">
//                   <label className="form-label">Transaction ID</label>
//                   <input type="text" className="form-control" placeholder="Enter transaction ID" />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Condition</label>
//                   <select className="form-select">
//                     <option>Select condition</option>
//                     <option>Excellent</option>
//                     <option>Good</option>
//                     <option>Fair</option>
//                     <option>Damaged</option>
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Notes</label>
//                   <textarea className="form-control" rows={2} placeholder="Any additional notes"></textarea>
//                 </div>
//                 <button type="submit" className="btn btn-success w-100">Process Return</button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Transaction History Table */}
//       <div className="card bg-dark border-secondary">
//         <div className="card-header d-flex justify-content-between align-items-center">
//           <h5 className="mb-0">Transaction History</h5>
//           <select className="form-select form-select-sm w-auto">
//             <option>All Transactions</option>
//             <option>Borrowed</option>
//             <option>Returned</option>
//             <option>Overdue</option>
//           </select>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-dark table-hover">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Book</th>
//                   <th>Member</th>
//                   <th>Borrow Date</th>
//                   <th>Due Date</th>
//                   <th>Return Date</th>
//                   <th>Renew Count</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                  {borrows.length > 0 ? (
//                   borrows.map((borrow) => (
//                     <tr key={borrow.id}>
//                       <td>{borrow.trxNumber}</td>
//                       <td>{borrow.book?.title}</td>
//                       <td>
//                         {borrow.member?.userFirstName}{" "}
//                         {borrow.member?.userLastName}
//                       </td>
//                       <td>{new Date(borrow.issuedAt).toLocaleDateString()}</td>
//                       <td>{new Date(borrow.dueAt).toLocaleDateString()}</td>
//                       <td>
//                         {borrow.returnedAt
//                           ? new Date(borrow.returnedAt).toLocaleDateString()
//                           : "-"}
//                       </td>
//                        <td>{borrow.renewcount ?? 0}</td>

//                       <td>
//                         <span
//                           className={`status-badge ${
//                             borrow.status === "BORROWED"
//                               ? "borrowed"
//                               : borrow.status === "RETURNED"
//                               ? "available"
//                               : "overdue"
//                           }`}
//                         >
//                           {borrow.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={7} className="text-center">
//                       No transactions found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// new  code if not work then delete down code 


"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

interface Book {
  id: string;
  title: string;
  author: string;
}
interface Member {
  id: string;
  userFirstName: string;
  userLastName: string;
  userName: string;
}
interface Borrow {
  id: string;
  trxNumber: string;
  issuedAt: string;
  dueAt: string;
  returnedAt: string;
  renewedCount: number;
  status: string;
  renewRequestStatus?: string;
  book: Book;
  member: Member;
}
interface Transaction {
  id: string;
  dueAt: string;
  renewedCount: number;
  book: Book;
}

interface Notification {
  id: string;
  type: string;
  message: string;
  status: string;
  createdAt: string;
  member: Member;
  transaction: Transaction;
}

export default function TransactionPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [message, setmessage] = useState<Borrow[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [books, setbooks] = useState<Book[]>([])
  const [member, setmember] = useState<Member[]>([])
  const [borrowbookid, setborrowbookid] = useState("");
  const [borrowmemberid, setborrowmemberid] = useState("")
  const [borrowdueDate, setborrowduedate] = useState("")
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch("/api/book");
        if (!res.ok) throw new Error("failed to fetch");
        const data = await res.json();


        console.log("fetched book", data)
        setbooks(data || []);

      } catch (err) {
        console.error("Error fetching borrows:", err);
      }
    };
    fetchBook();
  }, []);
  useEffect(() => {
    const fetchmember = async () => {
      try {
        const res = await fetch("/api/member");
        if (!res.ok) throw new Error("failed to fetch");
        const data = await res.json();


        console.log("fetched member", data)
        setmember(data || []);

      } catch (err) {
        console.error("Error fetching borrows:", err);
      }
    }
    fetchmember();
  }, [])
  // Fetch transactions
  useEffect(() => {
    const fetchBorrows = async () => {
      try {
        const res = await fetch("/api/transaction");
        if (!res.ok) throw new Error("failed to fetch");
        const data = await res.json();
        setBorrows(data.borrows || []);

        // filter pending renewals → notifications
        const pending = (data.borrows || []).filter(
          (b: Borrow) => b.renewRequestStatus === "PENDING"
        );
        setmessage(pending);
      } catch (err) {
        console.error("Error fetching borrows:", err);
      }
    };
    fetchBorrows();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification");
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications || []);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [])
  const handleborrow = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!borrowbookid || !borrowmemberid || !borrowdueDate) {
    alert("please fill all fields");
    return;
  }

  try {
    const res = await fetch("/api/borrow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: borrowbookid,
        memberId: borrowmemberid,
        dueAt: borrowdueDate,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Book borrowed successfully!");
      setborrowbookid("");
      setborrowduedate("");
      setborrowmemberid("");
    } else {
      alert(data.message || "Borrow failed");
    }
  } catch (err) {
    console.error("error borrowed book", err);
  }
};


  // Approve handler
  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/renew/${id}/requestrenew`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "APPROVE" }),
      });
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  // Reject handler
  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`/api/renew/${id}/requestrenew`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "REJECT" }),
      });
      const data = await res.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Reject error:", error);
    }
  };

  return (
    <div className="container-fluid text-white">
      <div className="row">
        {/* Main content */}
        <div className="col-md-9">
          <h2 className="page-title mb-4">Transactions</h2>

          {/* Borrow & Return Section */}
          

          {/* Transaction History */}
          <div className="card bg-dark border-secondary">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0" style={{color:"white"}}>Transaction History</h5>
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
                      <th>Renew Count</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrows.length > 0 ? (
                      borrows.map((borrow) => (
                        <tr key={borrow.id}>
                          <td>{borrow.trxNumber}</td>
                          <td>{borrow.book?.title}</td>
                          <td>
                            {borrow.member?.userFirstName}{" "}
                            {borrow.member?.userLastName}
                          </td>
                          <td>
                            {new Date(borrow.issuedAt).toLocaleDateString()}
                          </td>
                          <td>
                            {new Date(borrow.dueAt).toLocaleDateString()}
                          </td>
                          <td>
                            {borrow.returnedAt
                              ? new Date(borrow.returnedAt).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>{borrow.renewedCount ?? 0}</td>
                          <td>
                            <span
                              className={`badge ${borrow.status === "BORROWED"
                                ? "bg-warning"
                                : borrow.status === "RETURNED"
                                  ? "bg-success"
                                  : "bg-danger"
                                }`}
                            >
                              {borrow.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Sidebar */}
        <div className="col-md-3">
          <div className="card bg-dark border-secondary">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Notifications</h5>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={() => window.location.reload()}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <li
                      key={note.id}
                      className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center"
                    >
                      <span>
                        📖 {note.member.userFirstName} {note.member.userLastName}{" "}
                        requested to renew "{note.transaction.book.title}"
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleApprove(note.id)}
                        >
                          ✅
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleReject(note.id)}
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item bg-dark text-white">
                    No notifications
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
