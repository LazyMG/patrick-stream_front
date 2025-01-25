import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIAlbum } from "../../shared/models/album";
import { setDates } from "../../shared/lib/musicDataFormat";

const ListItem = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px;
`;

const ImageMask = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;

  display: none;

  background-color: rgba(0, 0, 0, 0.3);
`;

const Image = styled.div<{ $imgUrl: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;

  background-image: ${(props) => props.$imgUrl && `url(${props.$imgUrl})`};
  background-size: cover;

  border-radius: 10px;

  position: relative;

  cursor: pointer;

  &:hover ${ImageMask} {
    display: block;
  }
`;

const Info = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 16px;
`;

const Title = styled.span`
  width: fit-content;
  font-weight: bold;

  cursor: pointer;

  a {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Description = styled.div`
  display: flex;
  gap: 2px;
`;

const Category = styled.span``;

const Aritst = styled.span`
  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface IFlexListAlbumItem {
  album: APIAlbum;
  dataType: "artist" | "etc";
}

const FlexListAlbumItem = ({ album, dataType }: IFlexListAlbumItem) => {
  return (
    <ListItem>
      <Image $imgUrl={album.coverImg ? album.coverImg : ""}>
        <ImageMask />
      </Image>
      <Info>
        <Title>
          <Link to={`/albums/${album._id}`}>{album.title}</Link>
        </Title>
        <Description>
          <Category>{album.category}</Category>
          {" • "}
          {dataType === "artist" ? (
            <div>{setDates(album.released_at, 1)}</div>
          ) : (
            <Aritst>
              <Link
                to={`/artists/${album.artists ? album.artists[0]._id : ""}`}
              >
                {album.artists ? album.artists[0].artistname : ""}
              </Link>
            </Aritst>
          )}
        </Description>
      </Info>
    </ListItem>
  );
};

export default FlexListAlbumItem;
