import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../app/entities/user/atom";

interface RequireNoAuthProps {
  children: JSX.Element;
}

const RequireNoAuth = ({ children }: RequireNoAuthProps) => {
  const { loading, userId } = useRecoilValue(userState);

  if (loading) {
    return <div>Loading</div>;
  }

  if (userId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireNoAuth;
