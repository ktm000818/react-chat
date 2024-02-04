import useLoginCheck from "@/custom-hooks/useLoginCheck";
import { userAuthState } from "@/recoil/recoil-store/store";
import styles from "@styles/HomePage.module.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import MainLogo from "./MainLogo";
import MainNavigation from "./MainNavigation";
import ConditionalRender from "@/common/components/ConditionalRender";

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
        <ConditionalRender condition={Boolean(userAuth)}>
          <ConditionalRender.When>test</ConditionalRender.When>
          <ConditionalRender.ElseIf condition={false}>test2</ConditionalRender.ElseIf>
          <ConditionalRender.Otherwise>test3 </ConditionalRender.Otherwise>
        </ConditionalRender>

        {userAuth && (
          <Button variant="primary" onClick={() => navigate("/chat")}>
            Start Chat
          </Button>
        )}
      </div>
    </div>
  );
}
