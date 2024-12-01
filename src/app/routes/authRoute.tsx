import { RouteObject } from "react-router-dom";
import AuthLayout from "../../pages/AuthLayout";
import Login from "../../pages/client/Login";
import SignIn from "../../pages/client/SignIn";

export const authRoute: RouteObject[] = [
  {
    path: "login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "signIn",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
];
