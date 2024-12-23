import styled from "styled-components";
import FormContainer from "../../widgets/client/FormContainer";
import SocialButton from "../../shared/ui/SocialButton";
import Divider from "../../shared/ui/Divider";
import SubmitButton from "../../shared/ui/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import InputRow from "../../shared/ui/InputRow";
import { useNavigate } from "react-router-dom";
import { googleLoginUrl } from "../../shared/lib/constant";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 25px;

  /* background-color: green; */
`;

interface LoginFormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

const SignIn = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();

  const onValid: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data);

    //validate

    // fetch
    const result = await fetch(`http://localhost:5000/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    }).then((res) => res.json());

    if (result.ok) {
      navigate("/login");
    } else {
      // 에러 처리
      // 1. 비밀번호 불일치
      // 2. 이미 존재하는 아이디
      // 3. 이미 존재하는 사용자 이름
      // 4. DB 에러
      console.log(result.message);
    }
  };

  const gotoSocialLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <FormContainer formType="signIn">
      <Form onSubmit={handleSubmit(onValid)}>
        <InputRow
          id="email"
          name="이메일"
          placeHolder="Email"
          type="email"
          register={register("email")}
        />
        <InputRow
          id="username"
          name="사용자 이름"
          placeHolder="Username"
          type="text"
          register={register("username")}
        />
        <InputRow
          id="password"
          name="비밀번호"
          placeHolder="Password"
          type="password"
          register={register("password")}
        />
        <InputRow
          id="passwordConfirm"
          name="비밀번호 확인"
          placeHolder="Password Confirm"
          type="password"
          register={register("passwordConfirm")}
        />
        <SubmitButton text="회원가입" />
        <Divider />
        <SocialButton onClickFunc={gotoSocialLogin} />
      </Form>
    </FormContainer>
  );
};

export default SignIn;
