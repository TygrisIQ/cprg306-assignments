import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, query } from "firebase/firestore";

export async function getItems(userId) {
  const items = [];
  const q = query(collection(db, "users", userId, "items"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
}

export async function addItem(userId, item) {
  const docRef = await addDoc(collection(db, "users", userId, "items"), item);
  return docRef.id;
}

export async function deleteItem(userId, itemId) {
  await deleteDoc(doc(db, "users", userId, "items", itemId));
}