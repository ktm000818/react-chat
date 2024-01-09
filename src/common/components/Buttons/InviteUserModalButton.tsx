import React, { useId, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "@/styles/Button/InviteUserModalButton.module.scss";
import { inviteUserToChatRoom } from "@/firebase-actions/chatroom/actions";
import { User, UserList, getUserList } from "@/firebase-actions/user/actions";

interface InviteUserModalButton {
  chatRoomId: string;
  children: React.ReactNode;
}

export default function Component({ chatRoomId, children }: InviteUserModalButton) {
  const [show, setShow] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserList>({});
  const [selectedUserList, setSelectedUserList] = useState<Array<User>>([]);
  const rid = useId();

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setUserList(await getUserList());
    setShow(true);
  };

  const addAndRemoveUser = (user: User) => {
    function getDuplicateUserIndex() {
      return selectedUserList.findIndex((v) => v.uid === user.uid);
    }

    if (getDuplicateUserIndex() > -1) {
      setSelectedUserList([...selectedUserList].splice(getDuplicateUserIndex(), 1));
    } else {
      setSelectedUserList((prev) => [...prev, user]);
    }
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>친구를 초대해보세요!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup className={styles["list-group"]}>
            {Object.values(userList).map((user, i) => (
              <ListGroup.Item action key={`${rid}_${i}`}>
                <label className={styles["list-group-item"]} onClick={() => addAndRemoveUser(user)}>
                  <div className={styles["list-group-item-checkbox-wrapper"]}>
                    <Form.Check inline name="group1" type={"checkbox"} />
                  </div>
                  <div className={styles["list-group-item-image"]}>
                    <img src={user.image} alt=" " width={50} height={50} />
                  </div>
                  <div className={styles["list-group-item-info-wrapper"]}>
                    <div className={styles["list-group-item-name"]}>{user.name}</div>
                    <div className={styles["list-group-item-desc"]}></div>
                  </div>
                </label>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => inviteUserToChatRoom(selectedUserList, chatRoomId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
