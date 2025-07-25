import Layout from "../component/layout";

export default function ReturnBook() {
  return (
    <Layout title="Return Book">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Return a Book</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Student Name" className="border p-2 w-full" />
        <input type="text" placeholder="Book Title" className="border p-2 w-full" />
        <input type="date" className="border p-2 w-full" />
        <button className="bg-red-600 text-white px-4 py-2 rounded">Return</button>
      </form>
    </Layout>
  );
}
