import HomePage from "@components/HomePage/HomePage";
import LoginPage from "@components/LoginPage/LoginPage";
import RegisterPage from "@components/RegisterPage/RegisterPage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import ChatPage from "./components/ChatPage/ChatPage";
import { useUpdateKey } from "./custom-hooks/useUpdateKey";
import { UpdateRecoilRootKeyContext } from "./custom-hooks/useUpdateRecoilRootKeyContext";
import { auth } from "./firebaseModule";
import { userAuthState } from "./recoil/recoil-store/store";

export default function App() {
  const { key, updateKey } = useUpdateKey();

  return (
    <UpdateRecoilRootKeyContext.Provider value={updateKey}>
      <RecoilRoot key={key}>
        <ChatApp />
      </RecoilRoot>
    </UpdateRecoilRootKeyContext.Provider>
  );
}

const useInitiateUserAuth = () => {
  const setUserAuthState = useSetRecoilState(userAuthState);

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (user) => {
      setUserAuthState(user);
    });

    return () => unscribe();
  }, [setUserAuthState]);
};

const ChatApp = () => {
  useInitiateUserAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/chat",
      element: <ChatPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};
