import styled from "styled-components";
import FormContainer from "../../widgets/client/FormContainer";
import SocialButton from "../../shared/ui/SocialButton";
import Divider from "../../shared/ui/Divider";
import SubmitButton from "../../shared/ui/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import InputRow from "../../shared/ui/InputRow";
import { useNavigate } from "react-router-dom";
import { googleLoginUrl } from "../../shared/lib/constant";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSetRecoilState } from "recoil";
import { currentPlayerState } from "../../app/entities/player/atom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 25px;
`;

interface LoginFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
    clearErrors,
    getValues,
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const [isEmailChecked, setIsEmailChecked] = useState<{
    email: string;
    state: boolean;
  }>({ email: "", state: false });
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);

  useEffect(() => {
    setCurrentPlayer((prev) => {
      if (!prev) return prev;
      if (prev.isPaused) {
        return {
          ...prev,
          isRedirectPaused: true,
        };
      } else return prev;
    });
  });

  const onValid: SubmitHandler<LoginFormValues> = async (data) => {
    if (isLoading) return;
    //validate
    if (data.password !== data.passwordConfirm) {
      setError("password", { message: "비밀번호가 일치하지 않습니다." });
      setFocus("password");
      return;
    }

    if (!isEmailChecked.state || isEmailChecked.email === "") {
      setError("email", { message: "이메일 중복 확인이 필요합니다." });
      return;
    }

    if (data.email !== isEmailChecked.email) {
      setError("email", { message: "이메일 중복 확인이 필요합니다." });
      setIsEmailChecked({ email: "", state: false });
      return;
    }
    setIsLoading(true);

    // fetch
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/auth/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      }
    ).then((res) => res.json());

    if (result.ok) {
      navigate("/login");
    } else {
      // 에러 처리
      // 1. 비밀번호 불일치
      // 2. 이미 존재하는 아이디
      if (!result.error) {
        if (result.type === "email") {
          setError("email", { message: result.message });
        } else if (result.type === "password") {
          setError("password", { message: result.message });
        }
      } else {
        // 3. DB 에러
        alert("Server Error");
      }
    }
    setIsLoading(false);
  };

  const gotoSocialLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const emailValidate = async () => {
    const value = getValues("email");

    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/auth/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      }
    ).then((res) => res.json());
    // validate
    if (result.ok) {
      if (result.flag) {
        // failed
        setError("email", { message: "이미 사용 중인 이메일입니다." });
      } else {
        // success
        alert("사용 가능한 이메일입니다.");
        setIsEmailChecked({ email: value, state: true });
        clearErrors("email");
      }
    } else {
      alert("DB 에러입니다. 잠시 후에 시도해주세요.");
    }
  };

  const debouncedEmailValidate = debounce(emailValidate, 200);

  return (
    <FormContainer formType="signIn">
      <Form onSubmit={handleSubmit(onValid)} autoComplete="off">
        <InputRow
          id="email"
          name="이메일"
          placeHolder="Email"
          type="email"
          errorMsg={errors.email ? errors.email.message : ""}
          isCustom={true}
          validateFunc={debouncedEmailValidate}
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "유효한 이메일 주소를 입력해주세요.",
            },
          })}
        />
        <InputRow
          id="password"
          name="비밀번호"
          placeHolder="Password"
          type="password"
          errorMsg={errors.password ? errors.password.message : ""}
          register={register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 4,
              message: "비밀번호는 4자 이상이어야 합니다.",
            },
            maxLength: {
              value: 12,
              message: "비밀번호는 12자 이하이어야 합니다.",
            },
          })}
        />
        <InputRow
          id="passwordConfirm"
          name="비밀번호 확인"
          placeHolder="Password Confirm"
          type="password"
          errorMsg={
            errors.passwordConfirm ? errors.passwordConfirm.message : ""
          }
          register={register("passwordConfirm", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 4,
              message: "비밀번호는 4자 이상이어야 합니다.",
            },
            maxLength: {
              value: 12,
              message: "비밀번호는 12자 이하이어야 합니다.",
            },
          })}
        />
        <SubmitButton
          text={isLoading ? "진행 중" : "회원가입"}
          disabled={isLoading}
        />
        <Divider />
        <SocialButton onClickFunc={gotoSocialLogin} />
      </Form>
    </FormContainer>
  );
};

export default SignIn;
