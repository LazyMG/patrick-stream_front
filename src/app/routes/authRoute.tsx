import { RouteObject } from "react-router-dom";
import AuthLayout from "../../pages/AuthLayout";
import Login from "../../pages/client/Login";
import SignIn from "../../pages/client/SignIn";
import RequireNoAuth from "../../pages/RequireNoAuth";

export const authRoute: RouteObject[] = [
  {
    path: "login",
    element: (
      <RequireNoAuth>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </RequireNoAuth>
    ),
  },
  {
    path: "signIn",
    element: (
      <RequireNoAuth>
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      </RequireNoAuth>
    ),
  },
];
