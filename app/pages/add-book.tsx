import Layout from "../component/layout";

export default function AddBook() {
  return (
    <Layout title="Add New Book">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Add a New Book</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Title" className="border p-2 w-full" />
        <input type="text" placeholder="Author" className="border p-2 w-full" />
        <textarea placeholder="Description" className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </Layout>
  );
}
