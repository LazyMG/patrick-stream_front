import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginUserDataState } from "../../app/entities/user/atom";
import { useToast } from "../../shared/hooks/useToast";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  width: 40%;
  height: 15%;
  background-color: #212121;
  border: 0.1px solid #414141;
  border-radius: 10px;
  padding: 40px 30px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #9c9c9c;
`;

const CloseButton = styled.div`
  svg {
    width: 30px;
    color: #9c9c9c;
    cursor: pointer;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    font-size: 12px;
    font-weight: bold;
    color: red;
  }
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
  font-size: 15px;

  &:focus {
    border: 2px solid #dbdbdb;
  }

  &::placeholder {
    color: #5f5f5f;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  border: none;
  background: none;

  color: ${(props) => props.theme.color.white};
  font-size: 16px;
  border-radius: 15px;

  padding: 7px 15px;

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${(props) => props.theme.border.gray};
  }
`;

const UserEditModal = ({ closeModal }: { closeModal: () => void }) => {
  const [loginUserData, setLoginUserData] = useRecoilState(loginUserDataState);
  const [password, setPassword] = useState("");
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [username, setUsername] = useState(
    loginUserData ? loginUserData.username : ""
  );
  const [isNameLoading, setIsNameLoading] = useState(false);
  const { setGlobalToast } = useToast();

  const handlePopState = () => {
    // 뒤로 가기가 발생하면 모달을 닫음
    closeModal();
  };

  useEffect(() => {
    // 모달이 열릴 때 현재 상태를 push
    window.history.pushState({ modalOpen: true }, "");

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, []);

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    setError("");
  };

  const sumbitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPasswordLoading) return;

    if (!loginUserData) return;

    if (password === "") {
      setError("비밀번호를 입력해주세요.");
      return;
    }
    setIsPasswordLoading(true);
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/auth/password`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    ).then((res) => res.json());

    if (result.ok) {
      setIsValid(true);
      setError("");
    } else {
      if (!result.error) {
        if (result.type === "USER") {
          setError("비밀번호가 일치하지 않습니다.");
        } else if (result.type === "NO_ACCESS") {
          setGlobalToast(
            "접근 권한이 없습니다.",
            "EDIT_PROFILE_PASSWORD_NO_ACCESS_ERROR"
          );
          closeModal();
        } else if (result.type === "NO_DATA") {
          setGlobalToast(
            "존재하지 않는 데이터입니다.",
            "EDIT_PROFILE_PASSWORD_NO_DATA_ERROR"
          );
          closeModal();
        } else if (result.type === "ERROR_ID") {
          setGlobalToast(
            "잘못된 데이터입니다.",
            "EDIT_PROFILE_PASSWORD_ERROR_ID_ERROR"
          );
          closeModal();
        }
      } else {
        setGlobalToast(
          "일시적인 오류입니다.",
          "EDIT_PROFILE_PASSWORD_DB_ERROR"
        );
        closeModal();
      }
      setIsValid(false);
    }
    setIsPasswordLoading(false);
  };

  const changeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
    setError("");
  };

  const submitUsername = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNameLoading) return;

    if (!loginUserData) return;

    if (loginUserData.username === username) {
      setError("변경되지 않았습니다.");
      return;
    }

    setIsNameLoading(true);

    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/user/${loginUserData._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    ).then((res) => res.json());

    if (result.ok) {
      setLoginUserData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          username,
        };
      });
      closeModal();
    } else {
      if (!result.error) {
        if (result.type === "INVALID_ERROR") {
          setError("이미 사용 중인 이름입니다.");
        } else if (result.type === "NO_ACCESS") {
          setGlobalToast(
            "잘못된 데이터입니다.",
            "EDIT_PROFILE_NO_ACCESS_ERROR"
          );
          closeModal();
        } else if (result.type === "NO_DATA") {
          setGlobalToast(
            "존재하지 않는 데이터입니다.",
            "EDIT_PROFILE_NO_DATA_ERROR"
          );
          closeModal();
        }
      } else {
        setGlobalToast("일시적인 오류입니다.", "EDIT_PROFILE_ERROR_ID_ERROR");
        closeModal();
      }
    }
    setIsNameLoading(false);
  };

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <Content>
          {!isValid ? (
            <EditForm onSubmit={sumbitPassword} autoComplete="off">
              <Header>
                <Label>비밀번호를 입력해주세요.</Label>
                <CloseButton onClick={closeModal}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    />
                  </svg>
                </CloseButton>
              </Header>
              <InputDiv>
                <Input
                  value={password}
                  onChange={changePassword}
                  type="password"
                />
                {error && <span>{error}</span>}
              </InputDiv>
              <ButtonDiv>
                <Button disabled={isPasswordLoading}>
                  {isPasswordLoading ? "확인 중" : "확인"}
                </Button>
              </ButtonDiv>
            </EditForm>
          ) : (
            <EditForm onSubmit={submitUsername} autoComplete="off">
              <Header>
                <Label>변경할 이름을 입력해주세요.</Label>
                <CloseButton onClick={closeModal}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    />
                  </svg>
                </CloseButton>
              </Header>

              <InputDiv>
                <Input value={username} onChange={changeUsername} type="text" />
                {error && <span>{error}</span>}
              </InputDiv>
              <ButtonDiv>
                <Button disabled={isNameLoading}>
                  {isNameLoading ? "확인 중" : "확인"}
                </Button>
              </ButtonDiv>
            </EditForm>
          )}
        </Content>
      </ContentModal>
    </ModalOverlay>,
    document.body
  );
};

export default UserEditModal;
