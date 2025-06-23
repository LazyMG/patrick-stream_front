import styled, { keyframes } from "styled-components";
import RowListSkeleton from "../../../widgets/client/RowList/RowListSkeleton";
import FlexList from "../../../widgets/client/FlexList/FlexList";
import FlexListSkeleton from "../../../widgets/client/FlexList/FlexListSkeleton";
import { DefaultButton } from "../../../shared/ui/DefaultButton";
import { useNavigate, useOutletContext } from "react-router-dom";
import { APIArtist } from "../../../shared/models/artist";
import { APIMusic } from "../../../shared/models/music";
import RowList from "../../../widgets/client/RowList/RowList";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { backgroundState } from "../../../app/entities/global/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;

  position: relative;

  z-index: 2;

  @media (max-width: 614px) {
    gap: 20px;
  }
`;

const InfoHeader = styled.div`
  margin-top: 400px;
  display: flex;
  flex-direction: column;

  gap: 20px;

  color: #fff;

  @media (max-width: 614px) {
    margin-top: 200px;
    gap: 8px;
  }
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

  background-color: ${(props) => props.theme.color.pink};

  svg {
    width: 30px;
    color: #000;
  }

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    background-color: #b97b7c;
    transform: scale(1.1);
  }

  @media (max-width: 614px) {
    width: 50px;
    height: 50px;

    svg {
      width: 20px;
    }
  }
`;

const FollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? "#fff" : "#000")};
  background-color: ${(props) => (props.$follow ? "#000" : "#fff")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1.5px solid #fff;

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 614px) {
    font-size: 14px;
    padding: 5px 20px;
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

const InfoHeaderSkeleton = styled.div`
  margin-top: 400px;
  display: flex;
  flex-direction: column;

  gap: 20px;

  @media (max-width: 614px) {
    margin-top: 200px;
    gap: 8px;
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

const ControlContainerSkeleton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  gap: 20px;
`;

const CircleButtonSkeleton = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;

  @media (max-width: 614px) {
    width: 50px;
    height: 50px;

    svg {
      width: 20px;
    }
  }
`;

const FollowButtonSkeleton = styled.div`
  width: 125px;
  height: 32px;

  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;

  @media (max-width: 614px) {
    font-size: 14px;
    padding: 5px 20px;
  }
`;

interface IArtistOutlet {
  isLoading: boolean;
  artistData: APIArtist | null;
  followers: number | null;
  follow: boolean | null;
  playArtistMusics: () => void;
  followArtist: () => void;
  artistMusics: APIMusic[] | null;
  isNotFound: boolean;
}

const ArtistContent = () => {
  const {
    isLoading,
    artistData,
    followers,
    follow,
    playArtistMusics,
    followArtist,
    artistMusics,
  } = useOutletContext<IArtistOutlet>();
  const navigate = useNavigate();
  const setBackground = useSetRecoilState(backgroundState);

  useEffect(() => {
    setBackground((prev) => {
      if (prev?.src === (artistData ? artistData?.coverImg : "")) {
        return prev;
      }
      return { src: artistData ? artistData?.coverImg : "", type: "simple" };
    });
  }, [setBackground, artistData]);

  const goToAlbumPage = () => {
    navigate(`albums`);
  };

  return (
    <Wrapper>
      {!isLoading ? (
        <>
          <InfoHeader>
            <Title>{artistData?.artistname || ""}</Title>
            <Info>{artistData?.introduction || ""}</Info>
            <Followers>{artistData ? `팔로워: ${followers}명` : ``}</Followers>
          </InfoHeader>
          <ControlContainer>
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
          </ControlContainer>
        </>
      ) : (
        <>
          <InfoHeaderSkeleton>
            <TitleSkeleton />
            <InfoSkeleton />
            <FollowersSkeleton />
          </InfoHeaderSkeleton>
          <ControlContainerSkeleton>
            <CircleButtonSkeleton />
            <FollowButtonSkeleton />
          </ControlContainerSkeleton>
        </>
      )}
      <ContentContainer>
        {!isLoading && artistMusics && artistMusics.length !== 0 && (
          <RowList
            title={"인기 음악"}
            list={artistMusics}
            buttonFunc={() => navigate(`musics`)}
          />
        )}
        {isLoading && <RowListSkeleton />}
        {!isLoading && artistData?.albums && (
          <FlexList
            title="앨범"
            isCustom={false}
            list={artistData?.albums}
            listFlag="album"
            isMore={true}
            buttonFunc={goToAlbumPage}
          />
        )}
        {isLoading && <FlexListSkeleton />}
      </ContentContainer>
    </Wrapper>
  );
};

export default ArtistContent;
