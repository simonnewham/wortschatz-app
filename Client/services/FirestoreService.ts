import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { IWord } from '../models/IWord';
import { auth, db } from "../firebase.config";
import { IWordListItem } from "../models/IWordListItem";
import { IPhrase } from "../models/IPhrase";

const DB_WORDS = 'words';
const DB_PHRASES = 'phrases';

export namespace FireStore {
    export async function AddWord(word: IWord) {
        try {
            const userId = auth.currentUser?.uid;

            if (userId) {
                const docRef = await addDoc(collection(db, DB_WORDS), {
                    nativeWord: word.nativeWord,
                    nativeWordGender: word.nativeWordGender,
                    nativeWordCategory: word.nativeWordCategory,
                    translateWord: word.translateWord,
                    translateWordGender: word.translateWordGender,
                    tags: word.tags,
                    usage: word.usage,
                    // todo
                    createdDate: new Date(),
                    userId: userId
                });
                alert("Word added");
            }
        } catch (e) {
            alert("Error adding word");
        }
    }

    export async function GetWords(): Promise<IWordListItem[]> {
        const resp: IWordListItem[] = [];
        try {
            const userId = auth.currentUser?.uid;
        
            if (userId) {
                const wordsRef = collection(db, DB_WORDS);
                const userQuery = query(wordsRef, where("userId", "==", `${userId}`));

                const querySnapshot = await getDocs(userQuery);
                querySnapshot.forEach((doc) => {
                    resp.push({
                        id: doc.id,
                        ...doc.data()
                    } as IWordListItem)
                    console.log(`${doc.id} => ${doc.data()}`);
                });
            }
        } catch (e) {
            alert(`Error getting words ${e}`);
        }
        return resp;
    }

    export async function AddPhrase(word: IPhrase) {
        try {
            const userId = auth.currentUser?.uid;

            if (userId) {
                const docRef = await addDoc(collection(db, DB_PHRASES), {
                    nativePhrase: word.nativePhrase,
                    translatePhrase: word.translatePhrase,
                    tags: word.tags,
                    // todo
                    createdDate: new Date(),
                    userId: userId
                });
                alert("Phrase added");
            }
        } catch (e) {
            alert("Error adding phrase");
        }
    }

    export async function GetPhrases(): Promise<IPhrase[]> {
        const resp: IPhrase[] = [];
        try {
            const userId = auth.currentUser?.uid;
        
            if (userId) {
                const phraseRef = collection(db, DB_PHRASES);
                const userQuery = query(phraseRef, where("userId", "==", `${userId}`));

                const querySnapshot = await getDocs(userQuery);
                querySnapshot.forEach((doc) => {
                    resp.push({
                        id: doc.id,
                        ...doc.data()
                    } as IPhrase)
                    console.log(`${doc.id} => ${doc.data()}`);
                });
            }
        } catch (e) {
            alert("Error getting phrases");
        }
        return resp;
    }
}

