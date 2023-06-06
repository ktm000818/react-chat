import useLoginCheck from "@/custom-hooks/useLoginCheck";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";

export default function ChatPage() {
  useLoginCheck();
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "500px" }}>
        <SidePanel />
      </div>
      <div style={{ width: "100%" }}>
        <MainPanel />
      </div>
    </div>
  );
}
