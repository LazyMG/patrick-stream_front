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
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 25px;
`;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);

  // 디바운스 필요
  const onValid: SubmitHandler<LoginFormValues> = async (data) => {
    //fetch
    setIsLoading(true);
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
      setIsLoading(false);
      navigate("/");
    } else {
      // 에러 처리
      // 1. 비밀번호 에러
      // 2. 존재하지 않는 이메일
      if (!result.error) {
        setError("email", {
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        });
      } else {
        // 3. DB 에러
        alert("Server Error");
      }
    }
  };

  const gotoSocialLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return (
    <FormContainer formType="login">
      <Form onSubmit={handleSubmit(onValid)} autoComplete="off">
        <InputRow
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
          errorMsg={errors.email ? errors.email.message : ""}
          id="email"
          name="이메일"
          placeHolder="Email"
          type="email"
        />
        <InputRow
          register={register("password", {
            minLength: {
              value: 4,
              message: "비밀번호는 4자 이상이어야 합니다.",
            },
            maxLength: {
              value: 12,
              message: "비밀번호는 12자 이하이어야 합니다.",
            },
            required: "비밀번호를 입력해주세요.",
          })}
          errorMsg={errors.password ? errors.password.message : ""}
          id="password"
          name="비밀번호"
          placeHolder="Password"
          type="password"
        />
        <SubmitButton text="로그인" disabled={isLoading} />
        <Divider />
        <SocialButton onClickFunc={gotoSocialLogin} />
      </Form>
    </FormContainer>
  );
};

export default Login;
