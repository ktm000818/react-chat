import HomePage from "@components/HomePage/HomePage";
import LoginPage from "@components/LoginPage/LoginPage";
import RegisterPage from "@components/RegisterPage/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
