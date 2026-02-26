import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">CPRG 306: Web Development 2 - Assignments</h1>
      <p className="my-2 text-blue-400 hover:text-blue-300">
        <Link href="/week-2">Go to Week 2 Page</Link>
      </p>
      <p className="my-2 text-blue-400 hover:text-blue-300">
        <Link href="/week-3">Go to Week 3 Page</Link>
      </p>
      <p className="my-2 text-blue-400 hover:text-blue-300">
        <Link href="/week-4">Go to Week 4 Page</Link>
      </p>
      <p className="my-2 text-blue-400 hover:text-blue-300">
        <Link href="/week-5">Go to Week 5 Page</Link>
      </p>
      <p className="my-2 text-blue-400 hover:text-blue-300">
        <Link href="/week-6">Go to Week 6 Page</Link>
      </p>
    </main>
  );
}