import styled from "styled-components";
import { APIArtist } from "../../../shared/models/artist";
import { APIAlbum } from "../../../shared/models/album";
import { Link, useOutletContext } from "react-router-dom";
import { backgroundState } from "../../../app/entities/global/atom";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

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

  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
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

interface IArtistOutlet {
  isLoading: boolean;
  artistData: APIArtist;
  followers: number;
  follow: boolean;
  playArtistMusics: () => void;
  followArtist: () => void;
  artistAlbums: APIAlbum[];
  isNotFound: boolean;
}

const ArtistsAlbums = () => {
  const { isLoading, artistAlbums, artistData } = useOutletContext<
    IArtistOutlet
  >();

  const setBackground = useSetRecoilState(backgroundState);

  useEffect(() => {
    setBackground(null);
  }, [setBackground]);

  return (
    <Wrapper>
      <Title>{artistData?.artistname}</Title>
      {!isLoading && (
        <Container>
          {artistAlbums &&
            artistAlbums.map((item, idx) => (
              <Item key={idx}>
                <ItemImage $imgUrl={item.coverImg ? item.coverImg : ""} />
                <ItemInfo>
                  <ItemTitle>
                    <Link to={`/albums/${item._id}`}>{item.title}</Link>
                  </ItemTitle>
                  <ItemDescription>
                    {item.category} {" • "}
                    <Link to={`/artists/${artistData._id}`}>
                      {artistData?.artistname}
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

export default ArtistsAlbums;
