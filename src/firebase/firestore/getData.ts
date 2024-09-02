import { Workout } from "@/types/types";
import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app)
export async function getDocument(collection : string, id : string) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}


export async function getPaginatedDocuments(collectionName: string, lastDoc: any = null) {
    const colRef = collection(db, collectionName);

    let result : Workout[] = [];
    let error = null;

    try {
        // Base query to order by document ID (timestamp) and limit to 10 documents
        let q = query(colRef, orderBy("createdAt", "desc"), limit(10));

        // If there is a last document (from previous query), start the query after it
        if (lastDoc) {
            q = query(colRef, orderBy("createdAt", "desc"), startAfter(lastDoc), limit(10));
        }

        const querySnapshot = await getDocs(q);

        // Collecting all the documents
        querySnapshot.forEach((doc) => {
            result.push({ 
                id: doc.id,
                title: doc.data().title as string,
                description: doc.data().description as string,
                hours: doc.data().hours as string,
                minutes: doc.data().minutes as string,
                date: doc.data().date as string,
                createdAt: doc.data().createdAt as string
            });
        });

        // Get the last document from this batch (used for the next query)
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { result, lastVisible, error };
    } catch (e) {
        error = e;
    }

    return { result, lastVisible: null, error };
}
