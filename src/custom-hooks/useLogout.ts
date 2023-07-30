import { useRecoilState } from "recoil";
import { signOut } from "firebase/auth";
import { auth, database } from "@/firebaseModule";
import { sessionState } from "@/recoil/recoil-store/store";
import { ref, update } from "@firebase/database";

export function useLogout() {
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
        window.location.href = "/";
        updateLoginStateToFalse();
        setSession(null);
      })
      .catch((error) => {
        alert("로그아웃 할 수 없습니다. 잠시 후 시도해주세요.");
      });
  };

  return logout;
}
