import {collection, addDoc, doc, deleteDoc} from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB (data) {
try {
    await addDoc(collection(database, "goals"), data);
} catch (err) {
    console.error(err);
}
}

export async function deleteFromDB (id) {
   try {
       await deleteDoc(doc(database, "goals", id));
   } catch (err) {
       console.error(err);
   }
}