import ItemList from './item-list';

export default function Page() {
  return (
    <main className="bg-slate-950 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Shopping List</h1>
      <ItemList />
    </main>
  );
}
