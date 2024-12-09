import styled from "styled-components";
import FormContainer from "../../widgets/client/FormContainer";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 25px;

  /* background-color: green; */
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  /* background-color: blue; */
`;

const Label = styled.label`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
`;

const Input = styled.input`
  outline: none;
  border: 2px solid #5f5f5f;
  background-color: transparent;
  padding: 5px 0;
  padding-left: 10px;
  border-radius: 8px;

  color: #fff;

  height: 30px;
  font-size: 18px;

  &:focus {
    border: 2px solid #dbdbdb;
  }

  &::placeholder {
    color: #5f5f5f;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 0;
  width: 100%;

  border-radius: 15px;
  font-size: 16px;

  cursor: pointer;
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

const Divider = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid #5f5f5f;
`;

const Login = () => {
  return (
    <FormContainer formType="login">
      <Form>
        <InputRow>
          <Label>이메일</Label>
          <Input type="text" placeholder="Email" />
        </InputRow>
        <InputRow>
          <Label>비밀번호</Label>
          <Input type="password" placeholder="Password" />
        </InputRow>
        <SubmitButton>로그인</SubmitButton>
        <Divider />
        <SocialButton>소셜 로그인</SocialButton>
      </Form>
    </FormContainer>
  );
};

export default Login;
