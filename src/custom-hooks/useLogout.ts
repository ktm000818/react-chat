import { auth, database } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { ref, update } from "@firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useUpdateRecoilRootKey } from "./useUpdateRecoilRootKeyContext";

export function useLogout() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAuthState);
  const resetRecoilStates = useUpdateRecoilRootKey();

  const updateLoginStateToFalse: () => void = async () => {
    if (!user) {
      return;
    }

    const dbRef = ref(database);

    const updates = {
      [`users/${user.uid}/isLogin`]: false,
    };

    await update(dbRef, updates);
  };

  const logout: () => void = () => {
    if (!user) return;
    signOut(auth)
      .then(() => {
        window.localStorage.clear();
        resetRecoilStates();
        updateLoginStateToFalse();
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return logout;
}
