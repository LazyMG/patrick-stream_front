import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../app/entities/user/atom";
import styled from "styled-components";
import LoadingSpinner from "../widgets/client/LoadingSpinner";

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

interface RequireNoAuthProps {
  children: JSX.Element;
}

const RequireNoAuth = ({ children }: RequireNoAuthProps) => {
  const { loading, userId } = useRecoilValue(userState);

  if (loading) {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }

  if (userId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireNoAuth;
