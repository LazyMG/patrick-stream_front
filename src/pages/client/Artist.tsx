import styled, { keyframes } from "styled-components";
import RowList from "../../widgets/client/RowList";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import FlexList from "../../widgets/client/FlexList";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundState } from "../../app/entities/global/atom";
import { APIArtist } from "../../shared/models/artist";
import { userState } from "../../app/entities/user/atom";
import { followingArtistsState } from "../../app/entities/artist/atom";
import { playingPlaylistState } from "../../app/entities/music/atom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { APIMusic } from "../../shared/models/music";
import NotFound from "./NotFound";
import RowListSkeleton from "../../widgets/client/RowListSkeleton";
import FlexListSkeleton from "../../widgets/client/FlexListSkeleton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;

  position: relative;

  z-index: 2;
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

  background-color: #f5a3a5;

  svg {
    width: 30px;
    color: #000;
  }

  &:hover {
    background-color: #b97b7c;
  }
`;

const FollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? "#fff" : "#000")};
  background-color: ${(props) => (props.$follow ? "#000" : "#fff")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1px solid #fff;

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const ContentContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const pulseKeyframes = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0.4;
  }
  100%{
    opacity: 1;
  }
`;

const TitleSkeleton = styled.h1`
  width: 20%;
  min-width: 200px;
  height: 48px;

  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const InfoSkeleton = styled.p`
  width: 40%;
  min-width: 300px;
  height: 35px;

  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const FollowersSkeleton = styled.span`
  width: 20%;
  min-width: 100px;
  height: 25px;

  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const CircleButtonSkeleton = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const FollowButtonSkeleton = styled.div`
  width: 125px;
  height: 32px;

  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const Artist = () => {
  const user = useRecoilValue(userState);
  const { artistId } = useParams();
  const setBackground = useSetRecoilState(backgroundState);
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState<APIArtist | null>(null);
  const [artistMusics, setArtistMusics] = useState<APIMusic[] | null>(null);
  const [follow, setFollow] = useState<boolean | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const currentFollowers = artistData?.followers?.length ?? 0;

  const [followingArtists, setFollowingArtists] = useRecoilState(
    followingArtistsState
  );

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const playMusic = usePlayMusic();

  useEffect(() => {
    setFollowers((prev) => {
      if (prev === currentFollowers) return prev;
      return currentFollowers;
    });
  }, [currentFollowers]);

  useEffect(() => {
    if (followingArtists) {
      const isFollow = followingArtists.some(
        (artist) => artist._id === artistId
      );
      setFollow(!!isFollow);
    }
  }, [followingArtists, artistId]);

  const getArtist = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/artist/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        setArtistData(result.artist);
        setArtistMusics(result.artist.musics);

        setBackground((prev) => {
          if (prev?.src === result.artist.coverImg) {
            return prev;
          }
          return { src: result.artist.coverImg, type: "simple" };
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setIsLoading(false);
      } else {
        if (!result.error) {
          setIsNotFound(true);
        }
      }
    },
    [setBackground]
  );

  useEffect(() => {
    setIsNotFound(false);
    if (artistId) {
      getArtist(artistId);
    }
  }, [artistId, getArtist]);

  const followArtist = async () => {
    if (!artistId || user.userId === "") return;

    const addList = !follow;
    setFollow(addList);
    setFollowers((prev) => {
      if (prev === null) return prev;
      return addList ? prev + 1 : Math.max(prev - 1, 0);
    });
    if (artistData) {
      setFollowingArtists((prev) => {
        if (!prev) return prev;
        if (addList) {
          return [artistData, ...prev];
        } else {
          const newList = prev.filter(
            (artist) => artist._id !== artistData._id
          );
          return [...newList];
        }
      });
    }
    await fetch(`http://localhost:5000/artist/${artistId}/followers`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activeUserId: user.userId,
        addList,
      }),
    });
  };

  const playArtistMusics = () => {
    if (!artistData?.musics || isLoading) return;
    setPlayingPlaylist(artistData.musics);
    playMusic(artistData.musics[0], true);
  };

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <Wrapper>
      <InfoHeader>
        {!isLoading ? (
          <>
            <Title>{artistData?.artistname}</Title>
            <Info>{artistData?.introduction}</Info>
            <Followers>팔로워: {followers}명</Followers>
          </>
        ) : (
          <>
            <TitleSkeleton />
            <InfoSkeleton />
            <FollowersSkeleton />
          </>
        )}
      </InfoHeader>
      <ControlContainer>
        {!isLoading && follow !== null ? (
          <>
            <CircleButton onClick={playArtistMusics}>
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
            <FollowButton $follow={!!follow} onClick={followArtist}>
              {follow ? "언팔로우" : "팔로우"}
            </FollowButton>
          </>
        ) : (
          <>
            <CircleButtonSkeleton />
            <FollowButtonSkeleton />
          </>
        )}
      </ControlContainer>
      <ContentContainer>
        {!isLoading && artistMusics && artistMusics.length !== 0 && (
          <RowList title={"인기 음악"} list={artistMusics} />
        )}
        {isLoading && <RowListSkeleton />}
        {!isLoading && artistData?.albums && (
          <FlexList
            title="앨범"
            isCustom={false}
            list={artistData?.albums}
            listFlag="album"
          />
        )}
        {isLoading && <FlexListSkeleton />}
      </ContentContainer>
    </Wrapper>
  );
};

export default Artist;
