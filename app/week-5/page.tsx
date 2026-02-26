import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  return (
    <main className="bg-slate-950 p-2 m-2 min-h-screen">
      <h1 className="text-3xl font-bold m-2 text-white">Shopping List</h1>
      <ItemList items={itemsData} />
    </main>
  );
}