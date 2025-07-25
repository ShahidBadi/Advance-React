import Layout from "../component/layout";

export default function Home() {
  return (
    <Layout title="Library Portal">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">📚 Welcome to the Library Portal</h1>
        <p className="text-lg text-gray-600">Manage books, students, and issues with ease.</p>
      </div>
    </Layout>
  );
}
