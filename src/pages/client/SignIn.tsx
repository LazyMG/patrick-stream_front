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

const SignIn = () => {
  return (
    <FormContainer formType="signIn">
      <Form>
        <InputRow>
          <Label>이메일</Label>
          <Input type="text" placeholder="Email" id="email" />
        </InputRow>
        <InputRow>
          <Label>사용자 이름</Label>
          <Input type="text" placeholder="Username" id="username" />
        </InputRow>
        <InputRow>
          <Label>비밀번호</Label>
          <Input type="password" placeholder="Password" id="password" />
        </InputRow>
        <InputRow>
          <Label>비밀번호 확인</Label>
          <Input type="password" placeholder="Password" id="passwordConfirm" />
        </InputRow>
        <SubmitButton text="회원가입" />
        <Divider />
        <SocialButton />
      </Form>
    </FormContainer>
  );
};

export default SignIn;
