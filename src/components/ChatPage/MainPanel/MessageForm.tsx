import { Props, createMessage } from "@/firebase-actions/chatroom/chat/actions";
import { chatRoomIdState, sessionState } from "@/recoil/recoil-store/store";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRecoilValue } from "recoil";

function MessageForm() {
  const user = useRecoilValue(sessionState);
  const roomId = useRecoilValue(chatRoomIdState);

  const [content, setContent] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const addMessage = () => {
    const data: Props = {
      roomId,
      uid: user.uid,
      content,
      name: user.displayName,
      image: user.photoURL,
    };

    createMessage(data);
  };

  const handleClickButton = () => {
    addMessage();
    setContent("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addMessage();
      setContent("");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <input type="text" value={content} onChange={handleChangeInput} onKeyDown={handleKeyDown} />
        <button onClick={handleClickButton}>전송</button>
      </div>
    </div>
  );
}

export default MessageForm;
