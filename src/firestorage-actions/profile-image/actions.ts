import { auth, database, firestorage } from "@/firebaseModule";
import { updateProfile } from "firebase/auth";
import { DataSnapshot, child, ref as dbRef, get, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FOLDER_NAME = "profile-image";

interface File {
  [name: string]: string;
}

//create docs
export const addProfileImageToStorage: (file: any) => Promise<any> = async (file) => {
  try {
    const storageRef = ref(firestorage, `${FOLDER_NAME}/${file.name}`);
  
    const res = await uploadBytes(storageRef, file);
    if (res.metadata.timeCreated) {
      console.log("Uploaded a blob or file!");
      const imgUrl = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser as any, {
        photoURL: imgUrl,
      });

      await update(dbRef(database, "users/" + auth.currentUser?.uid), {
        image: imgUrl
      });

      const snapshot = await get(child(dbRef(database), `users/${auth.currentUser?.uid}`));

      if(snapshot.exists()){
        return snapshot.val();
      }else{
        return null;
      }
    }else{
      return null;
    }
    
  } catch (error: any) {
    console.error(error.message)
  }
};
