import styles from "@styles/MainLogo.module.scss";

export default function MainLogo() {
  return <img className={styles["image"]} src={"logo/logo_transparent.png"} width={100} height={100} alt="logo" />;
}
