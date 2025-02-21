import styled from "styled-components";
import { createPortal } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { SubmitHandler, useForm } from "react-hook-form";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import { useEffect } from "react";
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
  width: 34%;
  height: 38%;
  background-color: #212121;
  border: 0.1px solid #414141;
  border-radius: 10px;
  padding: 27px 25px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

const ModalForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;

  input {
    background: none;
    border: none;
    outline: none;

    font-size: 18px;
    border-bottom: 0.1px solid #414141;
    padding-bottom: 4px;

    color: #fff;
    font-weight: bold;

    &::placeholder {
      color: #414141;
      font-weight: normal;
    }

    &:focus {
      outline: none;
      color: #fff;
      border-bottom: 0.1px solid #fff;
      transition: border-bottom 0.2s ease-in;
    }
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;

  button {
    background: none;
    border: none;

    color: #fff;
    font-size: 16px;

    cursor: pointer;
  }
`;

const ErrorMessage = styled.span`
  font-size: 13px;
  color: red;
`;

interface ICreatePlaylistModal {
  closeModal: () => void;
}

interface PlaylistFormValues {
  title: string;
  info: string;
}

const CreatePlaylistModal = ({ closeModal }: ICreatePlaylistModal) => {
  const user = useRecoilValue(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PlaylistFormValues>();
  const setCurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);
  const loginUserData = useRecoilValue(loginUserDataState);
  const { setGlobalToast } = useToast();

  const createPlaylist: SubmitHandler<PlaylistFormValues> = async (data) => {
    if (user.userId !== "" && loginUserData) {
      const timeStamp = Date.now().toString();

      //optimize
      setCurrentUserPlaylist((prev) => {
        if (!prev) return prev;
        return [
          {
            playlist: {
              _id: timeStamp,
              title: data.title,
              duration: 0,
              introduction: data.info,
              user: {
                username: loginUserData.username,
                _id: user.userId,
              },
            },
            isLoading: true,
            isError: false,
          },
          ...prev,
        ];
      });
      closeModal();
      const result = await fetch(
        `http://localhost:5000/user/${user.userId}/playlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        setCurrentUserPlaylist((prev) => {
          if (!prev) return prev;
          const index = prev.findIndex(
            (item) => item.playlist._id === timeStamp
          );
          if (index === -1) return prev;
          const before = prev.slice(0, index);
          const after = prev.slice(index + 1);
          return [
            ...before,
            {
              playlist: {
                _id: result.id,
                title: data.title,
                duration: 0,
                introduction: data.info,
                user: {
                  username: loginUserData.username,
                  _id: user.userId,
                },
              },
              isLoading: false,
              isError: false,
            },
            ...after,
          ];
        });
      } else {
        if (!result.error) {
          if (result.type === "NO_INPUT") {
            setError("title", { message: "제목을 입력해주세요." });
          } else if (result.type === "NO_ACCESS") {
            setGlobalToast(
              "잘못된 접근입니다.",
              "CREATE_PLAYLIST_NO_ACCESS_ERROR"
            );
          } else if (result.type === "NO_DATA") {
            setGlobalToast(
              "존재하지 않는 데이터입니다.",
              "CREATE_PLAYLIST_NO_DATA_ERROR"
            );
          } else if (result.type === "ERROR_ID") {
            setGlobalToast(
              "잘못된 데이터입니다.",
              "CREATE_PLAYLIST_ERROR_ID_ERROR"
            );
          }
        } else {
          setGlobalToast("일시적인 오류입니다.", "CREATE_PLAYLIST_DB_ERROR");
        }
        setCurrentUserPlaylist((prev) => {
          if (!prev) return prev;
          const index = prev.findIndex(
            (item) => item.playlist._id === timeStamp
          );
          if (index === -1) return prev;
          const before = prev.slice(0, index);
          const after = prev.slice(index + 1);
          return [
            ...before,
            {
              playlist: {
                _id: result.id,
                title: data.title,
                duration: 0,
                introduction: data.info,
                user: {
                  username: loginUserData.username,
                  _id: user.userId,
                },
              },
              isLoading: false,
              isError: true,
            },
            ...after,
          ];
        });
      }
    }
  };

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
      //window.history.back(); // 모달이 닫힐 때 상태를 되돌림
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, []);

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <Content>
          <Title>새 재생목록</Title>
          <ModalForm onSubmit={handleSubmit(createPlaylist)} autoComplete="off">
            <InputDiv>
              <input
                placeholder="제목"
                type="text"
                {...register("title", {
                  required: "제목을 입력해주세요.",
                  maxLength: {
                    value: 20,
                    message: "최대 20자까지 입력 가능합니다.",
                  },
                })}
              />
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}
            </InputDiv>
            <input placeholder="설명" type="text" {...register("info")} />
            <ButtonRow>
              <button onClick={closeModal} type="button">
                취소
              </button>
              <button type="submit">만들기</button>
            </ButtonRow>
          </ModalForm>
        </Content>
      </ContentModal>
    </ModalOverlay>,
    document.body
  );
};

export default CreatePlaylistModal;
