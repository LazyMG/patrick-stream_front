import styled from "styled-components";
import RowList from "../../widgets/client/RowList";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import FlexList from "../../widgets/client/FlexList";
import { useCallback, useEffect, useState } from "react";
import { Location, useLocation, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundState } from "../../app/entities/global/atom";
import { APIArtist } from "../../shared/models/artist";
import { userState } from "../../app/entities/user/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;

  position: relative;

  z-index: 2;

  /* background-color: blue; */
`;

const InfoHeader = styled.div`
  margin-top: 400px;
  display: flex;
  flex-direction: column;

  gap: 20px;

  color: #fff;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
`;

const Info = styled.p``;

const Followers = styled.span``;

const ControlContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  gap: 20px;
`;

const CircleButton = styled(DefaultButton)`
  width: 70px;
  height: 70px;
  padding: 5px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #d2dc23;

  svg {
    width: 50px;
    color: #fff;
  }

  &:hover {
    background-color: #afb71e;
  }
`;

const FollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? "#a988bd" : "#fff")};
  background-color: ${(props) => (props.$follow ? "transparent" : "#a988bd")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1px solid #a988bd;

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => (props.$follow ? "#a988bd" : "transparent")};
    color: ${(props) => (props.$follow ? "#fff" : "#a988bd")};
  }
`;

const ContentContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

interface ArtistLinkState {
  from?: string;
  artistLinkData?: {
    artistname: string;
    coverImg: string;
    _id: string;
  };
}

const Artist = () => {
  const user = useRecoilValue(userState);
  const { artistId } = useParams();
  const setBackground = useSetRecoilState(backgroundState);
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState<APIArtist | null>(null);
  const location = useLocation() as Location & { state: ArtistLinkState };
  const [follow, setFollow] = useState(false);
  const [followers, setFollowers] = useState<number | null>(null);

  const getArtist = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/artist/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        // console.log(result.artist);
        setArtistData(result.artist);
        setBackground((prev) => {
          if (prev?.src === result.artist.coverImg) {
            return prev;
          }
          return { src: result.artist.coverImg, type: "simple" };
        });
        setIsLoading(false);
      }
    },
    [setBackground]
  );

  useEffect(() => {
    if (artistId) {
      getArtist(artistId);
    }
  }, [artistId, getArtist]);

  useEffect(() => {
    if (location?.state) {
      setBackground({
        src: location.state?.artistLinkData.coverImg,
        type: "simple",
      });
    }
  }, [location?.state, setBackground]);

  const followArtist = async () => {
    if (user.userId === "") return;
    if (follow) {
      setFollow(false);
      setFollowers((prev) => {
        if (prev) {
          return Math.max(prev - 1, 0);
        }
        return prev;
      });
      // 1. 로그인 한 사용자의 팔로잉 목록에서 제거
      // 2. 현재 페이지 아티스트의 팔로워 목록에서 제거
    } else {
      setFollow(true);
      setFollowers((prev) => {
        if (prev !== null) {
          return prev + 1;
        }
        return prev;
      });
      // 1. 로그인 한 사용자의 팔로잉 목록에 추가
      // 2. 현재 페이지 아티스트의 팔로워 목록에 추가
    }
  };

  return (
    <Wrapper>
      <InfoHeader>
        <Title>
          {location?.state
            ? location.state?.artistLinkData.artistname
            : artistData?.artistname}
        </Title>
        <Info>{artistData?.introduction}</Info>
        <Followers>{artistData?.followers?.length}명</Followers>
      </InfoHeader>
      <ControlContainer>
        <CircleButton>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            />
          </svg>
        </CircleButton>
        <FollowButton $follow={follow} onClick={followArtist}>
          {follow ? "언팔로우" : "팔로우"}
        </FollowButton>
      </ControlContainer>
      {!isLoading && (
        <ContentContainer>
          <RowList title={"인기 음악"} list={artistData?.musics} />
          <FlexList
            title="앨범"
            isCustom={false}
            list={artistData?.albums}
            listFlag="album"
          />
        </ContentContainer>
      )}
    </Wrapper>
  );
};

export default Artist;
