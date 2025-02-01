import { ChangeEvent, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginUserDataState } from "../../app/entities/user/atom";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
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
  /* background-color: red; */
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #9c9c9c;
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

  button {
    border: none;
    background: none;

    border: 1px solid ${(props) => props.theme.color.purple};

    color: ${(props) => props.theme.color.white};
    font-size: 15px;
    border-radius: 15px;

    padding: 5px 15px;

    cursor: pointer;
  }
`;

const UserEditModal = ({ closeModal }: { closeModal: () => void }) => {
  const [loginUserData, setLoginUserData] = useRecoilState(loginUserDataState);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [username, setUsername] = useState(
    loginUserData ? loginUserData.username : ""
  );

  const changePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
    setError("");
  };

  const sumbitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginUserData) return;

    if (password === "") {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    const result = await fetch(`http://localhost:5000/auth/password`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }).then((res) => res.json());

    if (result.ok) {
      setIsValid(true);
      setError("");
    } else {
      if (!result.error) {
        if (result.type === "USER") {
          setError("비밀번호가 일치하지 않습니다.");
        } else if (result.type === "NO_ACCESS") {
          alert("접근 권한이 없습니다.");
          closeModal();
        } else if (result.type === "NO_DATA") {
          alert("데이터를 찾을 수 없습니다.");
          closeModal();
        }
      } else {
        alert("DB 에러입니다. 잠시 후 시도해주세요.");
        closeModal();
      }
      setIsValid(false);
    }
  };

  const changeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
    setError("");
  };

  const submitUsername = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginUserData) return;

    if (loginUserData.username === username) {
      setError("변경되지 않았습니다.");
      return;
    }

    const result = await fetch(
      `http://localhost:5000/user/${loginUserData._id}`,
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
      setError("이미 사용 중인 이름입니다.");
    }
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
            <EditForm onSubmit={sumbitPassword}>
              <Label>비밀번호를 입력해주세요.</Label>
              <InputDiv>
                <Input
                  value={password}
                  onChange={changePassword}
                  type="password"
                />
                {error && <span>{error}</span>}
              </InputDiv>
              <ButtonDiv>
                <button>확인</button>
              </ButtonDiv>
            </EditForm>
          ) : (
            <EditForm onSubmit={submitUsername}>
              <Label>변경할 이름을 입력해주세요.</Label>
              <InputDiv>
                <Input value={username} onChange={changeUsername} type="text" />
                {error && <span>{error}</span>}
              </InputDiv>
              <ButtonDiv>
                <button>확인</button>
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
