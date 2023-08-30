import { auth, database, firestorage } from "@/firebaseModule";
import { updateProfile } from "firebase/auth";
import { DataSnapshot, child, ref as dbRef, get, update } from "firebase/database";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FOLDER_NAME = "profile-image";

//create docs
export const updateProfileImageToStorageAndDatabase: (file: any) => Promise<string | null> = async (file) => {
  try {
    if (!auth.currentUser) throw new Error("error");
    const storageRef = ref(firestorage, `${FOLDER_NAME}/${file.name}`);
    const uploadedImage = await uploadBytes(storageRef, file);
    if (uploadedImage.metadata) {
      const imgUrl = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, {
        photoURL: imgUrl,
      });
      await update(dbRef(database, "users/" + auth.currentUser.uid), {
        image: imgUrl,
      });
      const snapshot: DataSnapshot = await get(child(dbRef(database), `users/${auth.currentUser?.uid}`));

      if (snapshot.exists()) {
        return snapshot.val().image;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error: any) {
    console.error(error.message);
  }
};
