import { useEffect, useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  likedMusicsState,
  recentMusicsState,
} from "../../app/entities/music/atom";
import { APIMusic } from "../../shared/models/music";
import styled, { keyframes } from "styled-components";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { userState } from "../../app/entities/user/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: 940px) {
    width: calc(100% - 28px);
    margin-left: 28px;
  }

  @media (max-width: 614px) {
    width: 100%;
    margin-left: 0px;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #fff;
`;

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  column-gap: 20px;
  row-gap: 20px;

  @media (max-width: 380px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageMask = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  svg {
    width: 40%;
  }
`;

const ItemImage = styled.div<{ $imgUrl: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;

  background-image: ${(props) => props.$imgUrl && `url(${props.$imgUrl})`};
  background-size: cover;
  background-position: center;

  position: relative;

  border-radius: 10px;

  cursor: pointer;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemTitle = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: #fff;
`;

const ItemDescription = styled.span`
  font-size: 13px;
  color: #bdbdbd;

  a {
    color: #bdbdbd;

    &:hover {
      text-decoration: underline;
    }
  }
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

const ContainerSkeleton = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  column-gap: 20px;
  row-gap: 20px;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const ItemSkeleton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const ItemInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemTitleSkeleton = styled.span`
  width: 100%;
  height: 15px;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const ItemDescriptionSkeleton = styled.span`
  width: 100%;
  height: 15px;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const ThemeMusic = () => {
  const newMusicMatch = useMatch("/new_releases");
  const trendingMusicMatch = useMatch("/trending");
  const popularMusicMatch = useMatch("/popular");
  const recentMusicMatch = useMatch("/listen_again");
  const likedMusicMatch = useMatch("/liked");

  const user = useRecoilValue(userState);
  const recentMusics = useRecoilValue(recentMusicsState);
  const likedMusics = useRecoilValue(likedMusicsState);

  const playMusic = usePlayMusic();

  const [listsData, setListsData] = useState<APIMusic[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getMusicData = async () => {
    let url = `${
      import.meta.env.DEV
        ? import.meta.env.VITE_DEV_API_URL
        : import.meta.env.VITE_PROD_API_URL
    }`;

    if (newMusicMatch) {
      url = url + `/music/recently-updated`;
    } else if (trendingMusicMatch) {
      url = `/music/trending`;
    } else if (popularMusicMatch) {
      url = `/music/popular`;
    } else {
      return;
    }

    const result = await fetch(url).then((res) => res.json());
    if (result.ok) {
      setListsData(result.musics);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recentMusicMatch) {
      if (user.loading) return;
      if (recentMusics) {
        setListsData(recentMusics.length !== 0 ? recentMusics : []);
        setIsLoading(false);
      } else if (user.userId === "") {
        navigate("/");
      }
    } else if (likedMusicMatch) {
      if (user.loading) return;
      if (likedMusics) {
        setListsData(likedMusics.length !== 0 ? likedMusics : []);
        setIsLoading(false);
      } else if (user.userId === "") {
        navigate("/");
      }
    } else {
      getMusicData();
    }
  }, [recentMusicMatch, recentMusics, likedMusicMatch, likedMusics, user]);

  return (
    <Wrapper>
      <Title>
        {newMusicMatch
          ? "새로운 음악"
          : popularMusicMatch
          ? "인기있는 음악"
          : trendingMusicMatch
          ? "유행하는 음악"
          : likedMusicMatch
          ? "좋아하는 음악"
          : "다시 듣기"}
      </Title>
      {isLoading ? (
        <ContainerSkeleton>
          {Array.from({ length: 20 }).map((_, idx) => (
            <ItemSkeleton key={idx}>
              <ItemImageSkeleton />
              <ItemInfoSkeleton>
                <ItemTitleSkeleton />
                <ItemDescriptionSkeleton />
              </ItemInfoSkeleton>
            </ItemSkeleton>
          ))}
        </ContainerSkeleton>
      ) : (
        <Container>
          {listsData &&
            listsData.map((item, idx) => (
              <Item key={idx}>
                <ItemImage
                  $imgUrl={item.coverImg}
                  onClick={() => playMusic(item)}
                >
                  <ImageMask>
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
                  </ImageMask>
                </ItemImage>
                <ItemInfo>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>
                    노래 {" • "}
                    <Link
                      to={`/artists/${item.artists ? item.artists[0]._id : ""}`}
                    >
                      {item.artists ? item.artists[0].artistname : ""}
                    </Link>
                  </ItemDescription>
                </ItemInfo>
              </Item>
            ))}
        </Container>
      )}
    </Wrapper>
  );
};

export default ThemeMusic;
