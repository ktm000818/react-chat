import { sessionState } from "@/recoil/recoil-store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function useLoginCheck() {
  const user = useRecoilValue(sessionState);
  const navigate = useNavigate();
  const ACCESS_PAGES = ["/chat", "/"];
  const ACCESS_FOR_UNKNOWN_PAGES = ["/login", "/register", "/"];
  const currLocation = window.location.pathname;

  useEffect(() => {
    if (user) {
      //로그인 완료됐을 때
      if (!ACCESS_PAGES.includes(currLocation)) {
        navigate("/");
      }
    } else {
      //로그인 되지않았을 때
      if (!ACCESS_FOR_UNKNOWN_PAGES.includes(currLocation)) {
        navigate("/");
      }
    }
  }, []);
}
