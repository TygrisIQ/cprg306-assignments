import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="bg-slate-950 p-2 m-2">
      <h1 className="text-3xl font-bold m-2 text-white">Shopping List</h1>
      <ItemList />
    </main>
  );
}