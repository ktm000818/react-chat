import useLoginCheck from "@/custom-hooks/useLoginCheck";
import MainLogo from "@components/MainLogo";
import MainNavigation from "@components/MainNavigation";
import styles from "@styles/landing.module.scss";

export default function App() {
  useLoginCheck();
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <MainLogo />
        <MainNavigation />
      </div>
      <div className={styles["title-wrapper"]}>
        <p className={styles["title"]}>nexlacks</p>
        <p>yeah</p>
      </div>
    </div>
  );
}
