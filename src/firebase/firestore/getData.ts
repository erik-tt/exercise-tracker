import { Workout } from "@/types/types";
import firebase_app from "../config";
import { getFirestore, doc, getDoc, collection, query, orderBy, limit, startAfter, getDocs, where } from "firebase/firestore";
import { useAuthContext } from "@/context/AuthContext";

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


export async function getWorkouts(collectionName: string, uid: string | undefined) {
    const colRef = collection(db, collectionName);

    let workouts : Workout[] = [];
    let error = null;

    try {
        // Base query to order by document ID (timestamp) and limit to 10 documents
        let q = query(colRef, where('uid', '==', uid));


        const querySnapshot = await getDocs(q);

        // Collecting all the documents
        querySnapshot.forEach((doc) => {
            workouts.push({ 
                id: doc.id,
                selectedActivity: doc.data().selectedActivity as string,
                description: doc.data().description as string,
                hours: doc.data().hours as string,
                minutes: doc.data().minutes as string,
                date: doc.data().date as string,
                createdAt: doc.data().createdAt as string,
            });
        });

        // Get the last document from this batch (used for the next query)
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { workouts, lastVisible, error };
    } catch (e) {
        error = e;
    }

    return { workouts, lastVisible: null, error };
}

export async function getWorkoutsFromPeriod(collectionName: string, uid: string | undefined, from: string, to: string) {

}
