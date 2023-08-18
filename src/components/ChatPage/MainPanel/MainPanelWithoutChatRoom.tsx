import useLoginCheck from "@/custom-hooks/useLoginCheck";
import styles from "@styles/Chat/ChatPage.module.scss";
import { useRecoilValue } from "recoil";
import { chatRoomInfoState } from "@/recoil/recoil-store/store";

export default function MainPanelWithoutChatRoom() {
  useLoginCheck();
  return (
    <>
      <div>방을 생성해주세요!!</div>
    </>
  );
}
