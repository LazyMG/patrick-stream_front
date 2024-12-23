import styled from "styled-components";
import FormContainer from "../../widgets/client/FormContainer";
import SocialButton from "../../shared/ui/SocialButton";
import Divider from "../../shared/ui/Divider";
import SubmitButton from "../../shared/ui/SubmitButton";
import InputRow from "../../shared/ui/InputRow";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../app/entities/user/atom";
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
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const onValid: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data);

    //validate

    //fetch
    const result = await fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
      credentials: "include",
    }).then((res) => res.json());
    if (result.ok) {
      setUser({
        userId: result.userId,
        loading: false,
      });
      navigate("/");
    } else {
      // 에러 처리
      // 1. 비밀번호 에러
      // 2. 존재하지 않는 이메일
      // 3. DB 에러
      console.log(result.message);
    }
  };

  const gotoSocialLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <FormContainer formType="login">
      <Form onSubmit={handleSubmit(onValid)}>
        <InputRow
          register={register("email")}
          id="email"
          name="이메일"
          placeHolder="Email"
          type="email"
        />
        <InputRow
          register={register("password")}
          id="password"
          name="비밀번호"
          placeHolder="Password"
          type="password"
        />
        <SubmitButton text="로그인" />
        <Divider />
        <SocialButton onClickFunc={gotoSocialLogin} />
      </Form>
    </FormContainer>
  );
};

export default Login;
