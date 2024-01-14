import React, { useEffect, useId, useRef, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "@/styles/Button/InviteUserModalButton.module.scss";
import { inviteUserToChatRoom } from "@/firebase-actions/chatroom/actions";
import { User, UserList, getUserListExceptCurrentUser } from "@/firebase-actions/user/actions";

interface InviteUserModalButton {
  chatRoomId: string;
  children: React.ReactNode;
}

export default function Component({ chatRoomId, children }: InviteUserModalButton) {
  const [show, setShow] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserList>({});
  const [selectedUserList, setSelectedUserList] = useState<Array<User>>([]);
  const memberMapRef = useRef(new Map());
  const rid = useId();

  const handleClose = () => {
    memberMapRef.current.clear();
    setShow(false);
  };
  const handleShow = async () => {
    setUserList(await getUserListExceptCurrentUser());
    setShow(true);
  };

  const addAndRemoveUser = (user: User) => {
    if (memberMapRef.current.get(user.uid)) {
      memberMapRef.current.delete(user.uid);
    } else {
      memberMapRef.current.set(user.uid, user);
    }

    setSelectedUserList(Array.from(memberMapRef.current.values()));
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
              <ListGroup.Item action key={`${rid}_${user.uid}`}>
                <div className={styles["list-group-item"]} onClick={() => addAndRemoveUser(user)}>
                  <div className={styles["list-group-item-checkbox-wrapper"]}>
                    <Form.Check
                      id="list-group-item-checkbox"
                      inline
                      name="group1"
                      type={"checkbox"}
                      readOnly
                      checked={Boolean(selectedUserList.find((v) => v.uid === user.uid))}
                    />
                  </div>
                  <div className={styles["list-group-item-image"]}>
                    <img src={user.image} alt=" " width={50} height={50} />
                  </div>
                  <div className={styles["list-group-item-info-wrapper"]}>
                    <div className={styles["list-group-item-name"]}>{user.name}</div>
                    <div className={styles["list-group-item-desc"]}></div>
                  </div>
                </div>
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
