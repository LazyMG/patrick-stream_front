import styled from "styled-components";
import FormContainer from "../../widgets/client/FormContainer";
import SocialButton from "../../shared/ui/SocialButton";
import Divider from "../../shared/ui/Divider";
import SubmitButton from "../../shared/ui/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import InputRow from "../../shared/ui/InputRow";
import { useNavigate } from "react-router-dom";
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

  const onValid: SubmitHandler<LoginFormValues> = async (data) => {
    //validate
    if (data.password !== data.passwordConfirm) {
      setError("password", { message: "비밀번호가 일치하지 않습니다." });
      setFocus("password");
    }

    if (!isEmailChecked.state || isEmailChecked.email === "") {
      setError("email", { message: "이메일 중복 확인이 필요합니다." });
    }

    if (data.email !== isEmailChecked.email) {
      setError("email", { message: "이메일 중복 확인이 필요합니다." });
      setIsEmailChecked({ email: "", state: false });
    }

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
      if (!result.error) {
        if (result.type === "email") {
          setError("email", { message: result.message });
        } else if (result.type === "password") {
          setError("password", { message: result.message });
        }
      } else {
        // 4. DB 에러
        alert("Server Error");
      }
    }
  };

  const gotoSocialLogin = () => {
    window.location.href = googleLoginUrl;
  };

  const emailValidate = async () => {
    const value = getValues("email");

    const result = await fetch(`http://localhost:5000/auth/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    }).then((res) => res.json());
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

  return (
    <FormContainer formType="signIn">
      <Form onSubmit={handleSubmit(onValid)}>
        <InputRow
          id="email"
          name="이메일"
          placeHolder="Email"
          type="email"
          errorMsg={errors.email ? errors.email.message : ""}
          isCustom={true}
          validateFunc={emailValidate}
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
        <SubmitButton text="회원가입" />
        <Divider />
        <SocialButton onClickFunc={gotoSocialLogin} />
      </Form>
    </FormContainer>
  );
};

export default SignIn;
