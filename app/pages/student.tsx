// import Layout from "@/components/Layout";
import Layout from "../component/layout";
const students = [
  { id: 1, name: "Amit Sharma" },
  { id: 2, name: "Riya Verma" },
];

export default function Students() {
  return (
    <Layout title="Students">
      <h2 className="text-2xl font-semibold mt-8 mb-4">Registered Students</h2>
      <ul className="space-y-2">
        {students.map((s) => (
          <li key={s.id} className="border p-2 rounded">{s.name}</li>
        ))}
      </ul>
    </Layout>
  );
}
