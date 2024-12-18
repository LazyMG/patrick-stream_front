import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";

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

const FlexListMusicItem = ({ music }: { music: APIMusic }) => {
  const playMusic = usePlayMusic();

  return (
    <ListItem>
      <Image $imgUrl={music.coverImg} onClick={() => playMusic(music.ytId)}>
        <ImageMask />
      </Image>
      <Info>
        <Title onClick={() => playMusic(music.ytId)}>{music.title}</Title>
        <Description>
          <Category>노래</Category>
          <Aritst>
            <Link to={`/artists/${music.artists[0]._id}`}>
              {music.artists[0].artistname}
            </Link>
          </Aritst>
        </Description>
      </Info>
    </ListItem>
  );
};

export default FlexListMusicItem;
