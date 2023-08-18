import styles from "@styles/Chat/SidePanel/Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles["logo-div"]}>
      <img src="logo/logo.png" width={"100%"} alt="logo" />
    </div>
  );
}
