import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIArtist } from "../../../shared/models/artist";

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
  background-position: center;

  border-radius: 50%;

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
  align-items: center;
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

interface IFlexListAritstItem {
  artist: APIArtist;
}

const FlexListAritstItem = ({ artist }: IFlexListAritstItem) => {
  return (
    <ListItem>
      <Image $imgUrl={artist.coverImg ? artist.coverImg : ""}>
        <Link to={`/artists/${artist._id}`}>
          <ImageMask />
        </Link>
      </Image>
      <Info>
        <Title>
          <Link to={`/artists/${artist._id}`}>{artist.artistname}</Link>
        </Title>
        <Description></Description>
      </Info>
    </ListItem>
  );
};

export default FlexListAritstItem;
