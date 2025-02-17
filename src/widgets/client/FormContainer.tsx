import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 30%;

  /* background-color: blue; */
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: #fff;
`;

const Message = styled.span`
  display: flex;
  justify-content: center;

  color: #fff;

  a {
    color: #fff;
    text-decoration: underline;
  }
`;

interface IFormContainer {
  children: ReactNode;
  formType: "signIn" | "login";
}

const FormContainer = ({ children, formType }: IFormContainer) => {
  return (
    <Wrapper>
      <Title>{formType === "signIn" ? "SignIn" : "Login"}</Title>
      {children}
      <Message>
        {formType === "signIn" ? (
          <>
            <span>이미 계정이 있다면?&nbsp;</span>
            <Link to={"/login"}>로그인하기</Link>
          </>
        ) : (
          <>
            <span>계정이 없다면?&nbsp;</span>
            <Link to={"/signIn"}>회원가입하기</Link>
          </>
        )}
      </Message>
    </Wrapper>
  );
};

export default FormContainer;
