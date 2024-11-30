import { RouteObject } from "react-router-dom";
import AuthLayout from "../../pages/AuthLayout";

export const authRoute: RouteObject[] = [
  {
    path: "login",
    element: <AuthLayout>Login</AuthLayout>,
  },
  {
    path: "signIn",
    element: <AuthLayout>SignIn</AuthLayout>,
  },
];
