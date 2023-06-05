import { useLogout } from "@/custom-hooks/useLogout";
import { loginState } from "@/recoil/recoil-store/store";
import styles from "@styles/MainNavigation.module.scss";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function MainNavigation() {
  const navigate = useNavigate();
  const userData = useRecoilValue(loginState);
  const logout = useLogout();
  return (
    <div className={styles["container"]}>
      {userData ? (
        <>
          <span className={styles["nickname"]}>{userData?.displayName}님, 환영합니다. </span>
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
