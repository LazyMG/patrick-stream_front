import styled from "styled-components";
import FormContainer from "../../widgets/client/FormContainer";
import SocialButton from "../../shared/ui/SocialButton";
import Input from "../../shared/ui/Input";
import Divider from "../../shared/ui/Divider";
import SubmitButton from "../../shared/ui/SubmitButton";

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

const Login = () => {
  return (
    <FormContainer formType="login">
      <Form>
        <InputRow>
          <Label htmlFor="email">이메일</Label>
          <Input type="text" placeholder="Email" id="email" />
        </InputRow>
        <InputRow>
          <Label htmlFor="password">비밀번호</Label>
          <Input type="password" placeholder="Password" id="password" />
        </InputRow>
        <SubmitButton text="로그인" />
        <Divider />
        <SocialButton />
      </Form>
    </FormContainer>
  );
};

export default Login;
