import useLoginCheck from "@/custom-hooks/useLoginCheck";
import { isLoggedInSelector } from "@/recoil/recoil-store/store";
import MainLogo from "@components/MainLogo";
import MainNavigation from "@components/MainNavigation";
import styles from "@styles/landing.module.scss";
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
        <p className={styles["title"]}>nexlacks</p>
        <p>yeah</p>
        {isLogin && <Button onClick={() => navigate("/chat")}>Start Chat</Button>}
      </div>
    </div>
  );
}
