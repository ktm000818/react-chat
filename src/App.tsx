import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "./firebaseModule";
import LoginPage from "@components/LoginPage/LoginPage";
import RegisterPage from "@components/RegisterPage/RegisterPage";
import HomePage from "@components/HomePage/HomePage";
import ChatPage from "./components/ChatPage/ChatPage";

export default function App() {
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
