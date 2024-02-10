import { CreateMessageProps, createMessage } from "@/firebase-actions/chatroom/chat/actions";
import { chatRoomIdState, userAuthState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/MessageForm.module.scss";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useRecoilValue } from "recoil";

function MessageForm() {
  const user = useRecoilValue(userAuthState);
  const roomId = useRecoilValue(chatRoomIdState);
  const [content, setContent] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const addMessage = () => {
    try {
      if (user?.uid && user.displayName && user.photoURL) {
        const data: CreateMessageProps = {
          roomId,
          uid: user.uid,
          content,
          name: user.displayName,
          image: user.photoURL,
        };
        setContent("");
        createMessage(data);
      }
    } catch (error) {
      console.error(error);
    }
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
    <div className={styles["container"]}>
      <div className={styles["custom-input-wrapper"]}>
        <InputGroup>
          <Form.Control
            className={styles["custom-input"]}
            as="input"
            aria-label="With textarea"
            type="text"
            value={content}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleClickButton}>전송</Button>
        </InputGroup>
      </div>
    </div>
  );
}

export default MessageForm;
