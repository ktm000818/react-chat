import useLoginCheck from "@/custom-hooks/useLoginCheck";
import styles from "@styles/Chat/ChatPage.module.scss";
import { useRef, useState } from "react";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";

export default function ChatPage() {
  useLoginCheck();

  return (
    <div className={styles["container"]}>
      <MainPanel />
      <div style={{ position: "absolute", left: 0, top: 0, width: "1px", height: "calc(100% + 1px)" }}></div>
    </div>
  );
}
