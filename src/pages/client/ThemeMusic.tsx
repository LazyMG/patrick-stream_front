import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  likedMusicsState,
  recentMusicsState,
} from "../../app/entities/music/atom";
import { APIMusic } from "../../shared/models/music";
import styled from "styled-components";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
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

const ThemeMusic = () => {
  const newMusicMatch = useMatch("/new_releases");
  const trendingMusicMatch = useMatch("/trending");
  const popularMusicMatch = useMatch("/popular");
  const recentMusicMatch = useMatch("/listen_again");
  const likedMusicMatch = useMatch("/liked");

  const recentMusics = useRecoilValue(recentMusicsState);
  const likedMusics = useRecoilValue(likedMusicsState);

  const playMusic = usePlayMusic();

  const [listsData, setListsData] = useState<APIMusic[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMusicData = async () => {
    let url;

    if (newMusicMatch) {
      url = `http://localhost:5000/music/recently-updated`;
    } else if (trendingMusicMatch) {
      url = `http://localhost:5000/music/trending`;
    } else if (popularMusicMatch) {
      url = `http://localhost:5000/music/popular`;
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
    if (recentMusicMatch && recentMusics) {
      setListsData(recentMusics.length !== 0 ? recentMusics : []);
      setIsLoading(false);
    } else if (likedMusicMatch && likedMusics) {
      setListsData(likedMusics.length !== 0 ? likedMusics : []);
      setIsLoading(false);
    } else {
      getMusicData();
    }
  }, [recentMusicMatch, recentMusics, likedMusicMatch, likedMusics]);

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
        <div>Loading...</div>
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
