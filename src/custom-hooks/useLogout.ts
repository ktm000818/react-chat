import { useRecoilState } from "recoil";
import { signOut } from "firebase/auth";
import { auth, database } from "@/firebaseModule";
import { sessionState } from "@/recoil/recoil-store/store";
import { ref, update } from "@firebase/database";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const updateLoginStateToFalse = async () => {
    if (!user) {
      return;
    }

    const dbRef = ref(database);
    const updates: any = {};
    updates[`users/${user.uid}/isLogin`] = false;
    await update(dbRef, updates);
  };

  const logout = async () => {
    if (!user) return;
    await signOut(auth)
      .then(async () => {
        navigate("/");
        updateLoginStateToFalse();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return logout;
}
