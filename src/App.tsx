import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { auth } from "./firebaseModule";
import LoginPage from "@components/LoginPage/LoginPage";
import RegisterPage from "@components/RegisterPage/RegisterPage";
import HomePage from "@components/HomePage/HomePage";

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
  ]);

  return <RouterProvider router={router} />;
}
