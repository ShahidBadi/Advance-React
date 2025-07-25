import Navbar from "./navbar";

export default function Layout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4">{children}</main>
    </>
  );
}
