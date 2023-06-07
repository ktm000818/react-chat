import { userImageSelector, userNameSelector } from "@/recoil/recoil-store/store";
import { useRecoilValue } from "recoil";
import Dropdown from "react-bootstrap/Dropdown";
import { forwardRef, useState } from "react";

export default function UserPanel() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
      <UserImageWithModal />
      <NicknameWithModal />
    </div>
  );
}

const UserImage = forwardRef(({ onClick }: { onClick: any }, ref: any) => {
  const userImage = useRecoilValue(userImageSelector);
  return (
    <div
      ref={ref}
      style={{ height: "100%", display: "flex", alignItems: "center" }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      <div style={{ borderRadius: 50, overflow: "hidden" }}>
        <img src={userImage} alt="logo" width={40} height={40} />
      </div>
    </div>
  );
});

function UserImageWithModal() {
  return (
    <>
      <Dropdown drop="down-centered" style={{ height: "100%" }}>
        <Dropdown.Toggle as={UserImage} id="s"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>프로필 사진 변경</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

const Nickname = forwardRef(({ onClick }: { onClick: any }, ref: any) => {
  const loginUser = useRecoilValue(userNameSelector);
  return (
    <span
      ref={ref}
      style={{ marginLeft: "10px", height: "100%", display: "flex", alignItems: "center" }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {loginUser}
    </span>
  );
});

function NicknameWithModal() {
  return (
    <>
      <Dropdown align={"end"} style={{ height: "100%" }}>
        <Dropdown.Toggle as={Nickname} id="test"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>설정</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
