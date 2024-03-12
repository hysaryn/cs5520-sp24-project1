import {collection, addDoc, doc, deleteDoc, getDocs} from "firebase/firestore";
import {database} from "./firebaseSetup";

export async function writeToDB (data, collectionName, id, subCollection) {
try {
    if (id) {
        await addDoc(collection(database, collectionName, id, subCollection), data);
    } else {
        await addDoc(collection(database, collectionName), data);
    }
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

export async function getAllDocs (path) {
    const querySnapshot = await getDocs(collection(database, path));
    let newArray = [];
    querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id: doc.id});
    });
    return newArray;
}