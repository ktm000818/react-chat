import { auth } from "@/firebaseModule";
import { userAuthState } from "@/recoil/recoil-store/store";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function useLoginCheck() {
  const navigate = useNavigate();
  const user = useRecoilValue(userAuthState);
  const ACCESS_PAGES = useMemo(() => ["/chat", "/"], []);
  const ACCESS_PAGES_FOR_UNKNOWN = useMemo(() => ["/login", "/register", "/"], []);
  const currLocation = window.location.pathname;

  useEffect(() => {
    if (user) {
      if (!ACCESS_PAGES.includes(currLocation)) {
        navigate("/");
      }
    } else {
      if (!ACCESS_PAGES_FOR_UNKNOWN.includes(currLocation)) {
        navigate("/");
      }
    }
  }, [ACCESS_PAGES, ACCESS_PAGES_FOR_UNKNOWN, currLocation, navigate, user]);
}
