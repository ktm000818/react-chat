import { useLogout } from "@/custom-hooks/useLogout";
import { sessionState } from "@/recoil/recoil-store/store";
import styles from "@styles/MainNavigation.module.scss";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function MainNavigation() {
  const navigate = useNavigate();
  const user = useRecoilValue(sessionState);
  const logout = useLogout();
  return (
    <div className={styles["container"]}>
      {user ? (
        <>
          <span className={styles["nickname"]}>
            <b>{user?.displayName}님, 환영합니다. </b>
          </span>
          <Button variant="primary" onClick={logout}>
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Sign in
          </Button>
        </>
      )}
    </div>
  );
}
