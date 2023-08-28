import useLoginCheck from "@/custom-hooks/useLoginCheck";
import { userAuthState } from "@/recoil/recoil-store/store";
import styles from "@styles/HomePage.module.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLogo from "./MainLogo";
import MainNavigation from "./MainNavigation";

export default function App() {
  const userAuth = useRecoilValue(userAuthState);
  useLoginCheck();
  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <MainLogo />
        <MainNavigation />
      </div>
      <div className={styles["title-wrapper"]}>
        <img src="logo/logo_transparent.png" width={300} height={300} alt="title-logo"></img>
        {userAuth && <Button onClick={() => navigate("/chat")}>Start Chat</Button>}
      </div>
    </div>
  );
}
