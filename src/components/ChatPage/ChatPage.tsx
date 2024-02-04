import useLoginCheck from "@/custom-hooks/useLoginCheck";
import styles from "@styles/Chat/ChatPage.module.scss";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ChatPage() {
  useLoginCheck();
  const [hide, setHide] = useState(false);

  return (
    <div className={styles["container"]}>
      <div className={`${styles["side-wrapper"]} ${hide ? styles["hide"] : styles[""]}`}>
        <div className={styles["nav"]}>
          <Button onClick={() => setHide((prev) => !prev)}>{hide ? "open" : "close"}</Button>
        </div>
        {!hide && <SidePanel />}
      </div>
      <div className={styles["main-wrapper"]}>
        <MainPanel />
      </div>
    </div>
  );
}
