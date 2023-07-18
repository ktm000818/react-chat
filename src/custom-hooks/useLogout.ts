import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, database } from "@/firebaseModule";
import { sessionState } from "@/recoil/recoil-store/store";
import { ref, update } from "@firebase/database";

export function useLogout() {
  const [session, setSession] = useRecoilState(sessionState);
  const logout = async () => {
    signOut(auth)
      .then(async () => {
        const dbRef = ref(database);
        const updates: any = {};
        updates[`users/${session.uid}/isLogin`] = false;
        await update(dbRef, updates);
        setSession(null);
        window.location.href = "/";
      })
      .catch((error) => {
        alert("로그아웃 할 수 없습니다. 잠시 후 시도해주세요.");
      });
  };

  return logout;
}
