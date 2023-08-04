import styles from "@styles/Chat/SidePanel/Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles["logo-div"]}>
      <span className={styles["logo-text"]}>RELACKS</span>
    </div>
  );
}
