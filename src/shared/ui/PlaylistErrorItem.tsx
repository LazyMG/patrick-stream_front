import styled from "styled-components";
import { APIPlaylist } from "../models/playlist";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import { useToast } from "../hooks/useToast";

const ListIcon = styled.div`
  width: 25px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px; // height에서 min-height로 변경
  flex-shrink: 0; // 추가: 아이템의 크기 유지
  padding: 5px 15px;
  box-sizing: border-box;

  border-radius: 15px;

  color: #dddddd;

  background-color: red;

  cursor: pointer;
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ListTitle = styled.span`
  font-weight: bold;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ListOwner = styled.span``;

const PlaylistErrorItem = ({ playlist }: { playlist: APIPlaylist }) => {
  const user = useRecoilValue(userState);
  const setCurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);
  const loginUserData = useRecoilValue(loginUserDataState);
  const { setGlobalToast } = useToast();

  const retryCreatePlaylist = async () => {
    if (user.userId !== "" && loginUserData) {
      const timeStamp = Date.now().toString();

      //optimize
      setCurrentUserPlaylist((prev) => {
        if (!prev) return prev;
        return [
          {
            playlist: {
              _id: timeStamp,
              title: playlist.title,
              duration: 0,
              introduction: playlist.introduction,
              user: {
                username: loginUserData.username,
                _id: user.userId,
              },
            },
            isLoading: true,
            isError: false,
          },
          ...prev.slice(1),
        ];
      });
      const result = await fetch(
        `http://localhost:5000/user/${user.userId}/playlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              info: playlist.introduction,
              title: playlist.title,
            },
          }),
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        setCurrentUserPlaylist((prev) => {
          if (!prev) return prev;
          const index = prev.findIndex(
            (item) => item.playlist._id === timeStamp
          );
          console.log("create success | list |index", prev, " | ", index);
          if (index === -1) return prev;
          const before = prev.slice(0, index);
          const after = prev.slice(index + 1);
          console.log([
            ...before,
            {
              playlist: {
                _id: result.id,
                title: playlist.title,
                duration: 0,
                introduction: playlist.introduction,
                user: {
                  username: loginUserData.username,
                  _id: user.userId,
                },
              },
              isLoading: false,
              isError: false,
            },
            ...after,
          ]);
          return [
            ...before,
            {
              playlist: {
                _id: result.id,
                title: playlist.title,
                duration: 0,
                introduction: playlist.introduction,
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
          if (result.type === "NO_ACCESS") {
            console.log("error retry, again error");
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
                _id: timeStamp,
                title: playlist.title,
                duration: 0,
                introduction: playlist.introduction,
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
  return (
    <Wrapper onClick={retryCreatePlaylist}>
      <ListInfo>
        <ListTitle>{playlist.title}</ListTitle>
        <ListOwner>{playlist.user.username}</ListOwner>
      </ListInfo>
      <ListIcon>
        <svg
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </ListIcon>
    </Wrapper>
  );
};

export default PlaylistErrorItem;
