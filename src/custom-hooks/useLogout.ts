import { auth, database } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { DataSnapshot, get, query, ref, update } from "@firebase/database";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useUpdateRecoilRootKey } from "./useUpdateRecoilRootKeyContext";
import { Updates } from "@/types";
import { updateUserLoginState } from "@/modules/auth";

export function useLogout() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAuthState);
  const resetRecoilStates = useUpdateRecoilRootKey();

  const logout: () => void = () => {
    if (!user) return;
    signOut(auth)
      .then(() => {
        window.localStorage.clear();
        resetRecoilStates();
        updateUserLoginState(false);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return logout;
}
