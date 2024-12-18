import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIAlbum } from "../../shared/models/album";

const ListItem = styled.div`
  width: 100%;
  //max-width: 180px; /* 최대 너비 제한 */

  /* flex: 1 1 auto;
  flex-shrink: 0; */

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px;

  /* background-color: coral; */
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

  background-color: brown;
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
`;

const Description = styled.div`
  display: flex;
  gap: 2px;
`;

const Category = styled.span``;

const Aritst = styled.span`
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const FlexListAlbumItem = ({ album }: { album: APIAlbum }) => {
  return (
    <ListItem>
      <Image $imgUrl={album.coverImg ? album.coverImg : ""}>
        <ImageMask />
      </Image>
      <Info>
        <Title>{album.title}</Title>
        <Description>
          <Category>앨범</Category>
          <Aritst>
            <Link to={`/artists/${album.artists ? album.artists[0]._id : ""}`}>
              {album.artists ? album.artists[0].artistname : ""}
            </Link>
          </Aritst>
        </Description>
      </Info>
    </ListItem>
  );
};

export default FlexListAlbumItem;
