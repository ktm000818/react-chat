import { firestore } from "@/firebaseModule";
import { addDoc, collection } from "firebase/firestore";

const COLLECTION = "profile-image";

interface Doc {
  [name: string]: string;
}

//create docs
export const addProfileImageToStore = async (value: Doc) => {
  await addDoc(collection(firestore as any, COLLECTION), value);
};
