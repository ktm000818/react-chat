import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InviteMemberModal from "../Modals/InviteMemberModal";

interface InviteUserModalButton {
  chatRoomId: string;
  children: React.ReactNode;
}

export default function Component({ chatRoomId, children }: InviteUserModalButton) {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    setShow(true);
  };

  return (
    <>
      <InviteMemberModal open={show} handleCloseModal={handleClose} chatRoomId={chatRoomId} />
      <Button variant="primary" size="sm" onClick={handleShow}>
        {children}
      </Button>
    </>
  );
}
