import { useRecoilState } from "recoil";
import { signOut } from "firebase/auth";
import { auth, database } from "@/firebaseModule";
import { sessionState } from "@/recoil/recoil-store/store";
import { ref, update } from "@firebase/database";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const [session, setSession] = useRecoilState(sessionState);

  const updateLoginStateToFalse = async () => {
    if (!session) {
      return;
    }

    const dbRef = ref(database);
    const updates: any = {};
    updates[`users/${session.uid}/isLogin`] = false;
    await update(dbRef, updates);
  };

  const logout = async () => {
    await signOut(auth)
      .then(async () => {
        navigate("/");
        updateLoginStateToFalse();
        setSession(null);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return logout;
}
