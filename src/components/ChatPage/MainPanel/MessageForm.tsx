import { Props, createMessage } from "@/firebase-actions/chatroom/chat/actions";
import { chatRoomIdState, sessionState } from "@/recoil/recoil-store/store";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styles from "@styles/Chat/Main/MessageForm.module.scss";
import { Form, InputGroup } from "react-bootstrap";

function MessageForm() {
  const user = useRecoilValue(sessionState);
  const roomId = useRecoilValue(chatRoomIdState);

  const [content, setContent] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const addMessage = () => {
    if (!content) {
      return false;
    }

    const data: Props = {
      roomId,
      uid: user.uid,
      content,
      name: user.displayName,
      image: user.photoURL,
    };

    setContent("");

    createMessage(data);
  };

  const handleClickButton = () => {
    addMessage();
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!["Enter", "Shift"].includes(e.key)) {
      return false;
    }

    if (e.nativeEvent.isComposing) {
      return false;
    }

    if (e.shiftKey && e.key === "Enter") {
      return false;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      addMessage();
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
        <InputGroup>
          <InputGroup.Text>With textarea</InputGroup.Text>
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            className={styles["custom-input"]}
            type="text"
            value={content}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
        <button onClick={handleClickButton}>전송</button>
      </div>
    </div>
  );
}

export default MessageForm;
