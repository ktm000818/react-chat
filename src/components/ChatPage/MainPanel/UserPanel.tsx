import { addProfileImageToStorage } from "@/firestorage-actions/profile-image/actions";
import { userImageSelector, userNameSelector } from "@/recoil/recoil-store/store";
import { ChangeEvent, forwardRef, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilValue } from "recoil";

export default function UserPanel() {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <FileUpload ref={fileUploaderRef} />
      <UserImageWithModal fileUploaderRef={fileUploaderRef} />
      <NicknameWithModal fileUploaderRef={fileUploaderRef} />
    </div>
  );
}

// const FileUpload = forwardRef(({}, ref: any) => {
//   return <input style={{ display: "none" }} type="file" ref={ref} />;
// });
const FileUpload = forwardRef(({}, ref: any) => {
  const handleChangeFile = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files.length > 0) {
      const file: any = target.files[0];
      addProfileImageToStorage(file);
    }
  };

  return <input style={{ display: "none" }} type="file" ref={ref} onChange={handleChangeFile} />;
});

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

function UserImageWithModal({ fileUploaderRef }: any) {
  return (
    <>
      <Dropdown drop="down-centered" style={{ height: "100%", cursor: "pointer" }}>
        <Dropdown.Toggle as={UserImage} id="s"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => fileUploaderRef.current.click()}>프로필 사진 변경</Dropdown.Item>
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
      style={{
        marginLeft: "10px",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {loginUser}
    </span>
  );
});

function NicknameWithModal({ fileUploaderRef }: any) {
  return (
    <>
      <Dropdown align={"end"} style={{ height: "100%", cursor: "pointer" }}>
        <Dropdown.Toggle as={Nickname} id="test"></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => fileUploaderRef.current.click()}>설정</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
