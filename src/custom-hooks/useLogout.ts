import { useRecoilState, useRecoilValue } from "recoil";
import { signOut } from "firebase/auth";
import { auth, database } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { ref, update } from "@firebase/database";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAuthState);

  const updateLoginStateToFalse = async () => {
    if (!user) {
      return;
    }

    const dbRef = ref(database);
    const updates: any = {};
    updates[`users/${user.uid}/isLogin`] = false;
    await update(dbRef, updates);
  };

  const logout = () => {
    if (!user) return;
    signOut(auth)
      .then(() => {
        updateLoginStateToFalse();
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return logout;
}
