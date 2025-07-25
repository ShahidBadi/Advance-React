import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 p-4 text-white">
      <ul className="flex gap-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/books">Books</Link></li>
        <li><Link href="/add-book">Add Book</Link></li>
        <li><Link href="/students">Students</Link></li>
        <li><Link href="/issue-book">Issue Book</Link></li>
        <li><Link href="/return-book">Return Book</Link></li>
      </ul>
    </nav>
  );
}
