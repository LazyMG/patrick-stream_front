import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import RowList from "../../widgets/client/RowList";
import { useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { APIPlaylist } from "../../shared/models/playlist";
import { useRecoilValue } from "recoil";
import { userState } from "../../app/entities/user/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;

  /* background-color: blue; */
`;

const InfoContainer = styled.div`
  width: 100%;

  padding: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;

  /* background-color: green; */
`;

const InfoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoIcon = styled.div`
  svg {
    width: 180px;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoTitle = styled.span`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
`;

const InfoContent = styled.p`
  font-size: 14px;
  color: #777777;
`;

const InfoDescription = styled.p`
  max-width: 80%; /* 부모 요소의 최대 너비를 따르도록 설정 */
  word-break: break-word; /* 긴 단어가 있을 때 강제로 줄바꿈 */
  overflow-wrap: break-word; /* 컨테이너를 벗어나지 않도록 줄바꿈 */
  white-space: normal; /* 기본 줄바꿈 규칙을 따르도록 설정 */
  overflow: hidden; /* 넘치는 내용은 숨김 */
`;

const InfoButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const FollowButton = styled(DefaultButton)`
  color: #fff;

  font-size: 16px;

  background-color: blue;
  padding: 5px 30px;
`;

const Playlist = () => {
  const { playlistId } = useParams();
  const { state } = useLocation();
  const [playlistData, setPlaylistData] = useState<APIPlaylist | null>(null);
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [isMine, setIsMine] = useState(false);

  const getPlaylistData = useCallback(async (id: string) => {
    const result = await fetch(
      `http://localhost:5000/playlist/${id}`
    ).then((res) => res.json());
    if (result.ok) {
      setPlaylistData(result.playlist as APIPlaylist);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (playlistId) getPlaylistData(playlistId);

    if (user.userId !== "" && playlistData?.user._id) {
      if (user.userId === playlistData.user._id) {
        setIsMine(true);
      }
    }
  }, [getPlaylistData, playlistData?.user._id, playlistId, user.userId]);

  const displayContent = state || playlistData;

  return (
    <Wrapper>
      <InfoContainer>
        <InfoProfile>
          <InfoIcon>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
            </svg>
          </InfoIcon>
          <InfoText>
            {isLoading && !state ? (
              // state가 없고 playlistData가 로딩 중일 때 전체 로딩 UI
              <>
                <div>Loading</div>
              </>
            ) : (
              <>
                <InfoTitle>{displayContent?.title || "제목"}</InfoTitle>
                <InfoDescription>
                  {displayContent?.info || "정보"}
                </InfoDescription>
                <InfoContent>
                  생성자: {displayContent?.username || "알 수 없음"}
                </InfoContent>
                <InfoContent>
                  팔로워 수: {displayContent?.followersCount || 0}
                </InfoContent>
              </>
            )}
          </InfoText>
        </InfoProfile>
        {!isLoading && (
          <InfoButtons>
            {isMine ? (
              <FollowButton>팔로우X</FollowButton>
            ) : (
              <FollowButton>팔로우</FollowButton>
            )}
          </InfoButtons>
        )}
      </InfoContainer>
      <RowList title="재생목록 음악" subTitle="공개" />
    </Wrapper>
  );
};

export default Playlist;
