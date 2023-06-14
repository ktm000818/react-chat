import { firestorage } from "@/firebaseModule";
import { ref, uploadBytes } from "firebase/storage";

const FOLDER_NAME = "profile-image";

interface File {
  [name: string]: string;
}

//create docs
export const addProfileImageToStorage = async (file: any) => {
  const storageRef = ref(firestorage, `${FOLDER_NAME}/${file.name}`);

  const res = await uploadBytes(storageRef, file);
  if (res.metadata.timeCreated) {
    console.log("Uploaded a blob or file!");
  }
};
