import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseModule";
import { sessionState } from "@/recoil/recoil-store/store";

export function useLogout() {
  const setSessionState = useSetRecoilState(sessionState);
  const logout = async () => {
    setSessionState(null);
    signOut(auth)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        alert("로그아웃 할 수 없습니다. 잠시 후 시도해주세요.");
      });
  };

  return logout;
}
