import HomePage from "@components/HomePage/HomePage";
import LoginPage from "@components/LoginPage/LoginPage";
import RegisterPage from "@components/RegisterPage/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseModule";
import { useSetRecoilState } from "recoil";
import { userAuthState } from "./recoil/recoil-store/store";

export default function App() {
  const setUserAuthState = useSetRecoilState(userAuthState);

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (user) => {
      setUserAuthState(user);
    });

    return () => unscribe();
  }, [setUserAuthState]);

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
}
