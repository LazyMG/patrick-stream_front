import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 30%;

  /* background-color: blue; */
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 25px;

  background-color: green;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  /* background-color: blue; */

  input {
    height: 30px;
    font-size: 20px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 0;
  width: 100%;
`;

const SocialButton = styled.div`
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: red;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Message = styled.span`
  display: flex;
  justify-content: center;

  a {
    color: black;
    text-decoration: underline;
  }
`;

const Login = () => {
  return (
    <Wrapper>
      <Title>Login</Title>
      <Form>
        <InputRow>
          <label>이메일</label>
          <input type="text" placeholder="Email" />
        </InputRow>
        <InputRow>
          <label>비밀번호</label>
          <input type="password" placeholder="Password" />
        </InputRow>
        <SubmitButton>로그인</SubmitButton>

        <SocialButton>소셜 로그인</SocialButton>
      </Form>
      <Message>
        계정이 없다면? <Link to={"/signIn"}>회원가입하기</Link>
      </Message>
    </Wrapper>
  );
};

export default Login;
