import { userAuthState } from "@/recoil/recoil-store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const ACCESS_PAGES = ["/chat", "/"];
const ACCESS_PAGES_FOR_UNKNOWN = ["/login", "/register", "/"];
const currLocation = window.location.pathname;

export default function useLoginCheck() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAuthState);

  useEffect(() => {
    if (user) {
      if (!ACCESS_PAGES.includes(currLocation)) {
        window.location.replace("/");
        navigate("/");
      }
    } else {
      if (!ACCESS_PAGES_FOR_UNKNOWN.includes(currLocation)) {
        window.location.replace("/");
        navigate("/");
      }
    }
  }, [user, navigate]);
}
