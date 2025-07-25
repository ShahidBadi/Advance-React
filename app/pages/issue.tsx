// import Layout from "@/components/Layout";
import Layout from "../component/layout";
export default function IssueBook() {
  return (
    <Layout title="Issue Book">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Issue a Book</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Student Name" className="border p-2 w-full" />
        <input type="text" placeholder="Book Title" className="border p-2 w-full" />
        <input type="date" className="border p-2 w-full" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Issue</button>
      </form>
    </Layout>
  );
}
