import useLoginCheck from "@/custom-hooks/useLoginCheck";
import { isLoggedInSelector } from "@/recoil/recoil-store/store";
import MainLogo from "./MainLogo";
import MainNavigation from "./MainNavigation";
import styles from "@styles/HomePage.module.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function App() {
  useLoginCheck();
  const isLogin = useRecoilValue(isLoggedInSelector);
  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <MainLogo />
        <MainNavigation />
      </div>
      <div className={styles["title-wrapper"]}>
        <img src="logo/logo_transparent.png" width={300} height={300} alt="title-logo"></img>
        {isLogin && <Button onClick={() => navigate("/chat")}>Start Chat</Button>}
      </div>
    </div>
  );
}
