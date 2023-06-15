import { Props, createMessage } from "@/firebase-actions/chatroom/chat/actions";
import { chatRoomIdState, sessionState } from "@/recoil/recoil-store/store";
import { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { useRecoilValue } from "recoil";

function MessageForm() {
  const user = useRecoilValue(sessionState);
  const roomId = useRecoilValue(chatRoomIdState);

  const [content, setContent] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleClickButton = () => {
    const data: Props = {
      roomId,
      uid: user.uid,
      content,
      name: user.displayName,
      image: user.photoURL,
    };

    createMessage(data);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "10%",
        border: "1px solid black",
      }}
    >
      <input type="text" value={content} onChange={handleChangeInput} />
      <button onClick={handleClickButton}>전송</button>
    </div>
  );
}

export default MessageForm;
