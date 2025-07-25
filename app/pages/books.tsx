import Layout from "../component/layout";

const dummyBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin" },
  { id: 2, title: "Atomic Habits", author: "James Clear" },
];

export default function Books() {
  return (
    <Layout title="Books">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Available Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyBooks.map(book => (
          <div key={book.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-600">by {book.author}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
