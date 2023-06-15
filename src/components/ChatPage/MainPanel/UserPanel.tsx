import { addProfileImageToStorage } from "@/firebase-actions/upload/profile-image/actions";
import { sessionState, userImageSelector, userNameSelector } from "@/recoil/recoil-store/store";
import { ChangeEvent, forwardRef, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useRecoilCallback, useRecoilValue } from "recoil";

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
      <ProfilePictureFileUpload ref={fileUploaderRef} />
      <UserImageWithModal fileUploaderRef={fileUploaderRef} />
      <NicknameWithModal fileUploaderRef={fileUploaderRef} />
    </div>
  );
}

// const FileUpload = forwardRef(({}, ref: any) => {
//   return <input style={{ display: "none" }} type="file" ref={ref} />;
// });
const ProfilePictureFileUpload = forwardRef((props, ref: any) => {
  const sessionValue = useRecoilValue(sessionState);
  const setSessionValue = useRecoilCallback(({ set }) => {
    return (newValue) => {
      set(sessionState, newValue);
    };
  });

  const handleChangeFile = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      if (target.files && target.files.length > 0) {
        const file: any = target.files[0];
        const user = await addProfileImageToStorage(file);
        if (user && user.image) {
          console.log(user);
          setSessionValue({ ...sessionValue, photoURL: user.image });
        }
      }
    } catch (error) {}
  };

  return <input style={{ display: "none" }} type="file" ref={ref} onChange={handleChangeFile} />;
});

const UserImage = forwardRef(({ onClick }: { onClick: any }, ref: any) => {
  const userImageURL = useRecoilValue(userImageSelector);
  return (
    <div
      ref={ref}
      style={{ height: "100%", display: "flex", alignItems: "center" }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      <div style={{ borderRadius: 50, overflow: "hidden" }}>
        <img src={userImageURL} alt="logo" width={40} height={40} />
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
