import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import { APIMusic } from "../../shared/models/music";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListSubTitle = styled.span`
  font-size: 15px;
`;

const ListTitle = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 35px 12fr 5fr 5fr 7fr 1.5fr;
  grid-template-rows: 35px;
  column-gap: 15px;
  align-items: center;

  padding: 10px 2px;

  &:not(:nth-child(5)) {
    border-bottom: 0.01px solid #575757; /* 원하는 색상과 두께로 설정 */
  }

  a {
    color: #fff;
  }
`;

const Number = styled.span``;

const Image = styled.div<{ $img: string }>`
  background-image: ${(props) => (props.$img ? `url(${props.$img})` : "")};
  background-size: cover;
  background-position: center;
  height: 100%;
  border-radius: 5px;

  cursor: pointer;
`;

const Title = styled.span`
  cursor: pointer;
`;

const Artist = styled.span``;

const Views = styled.span``;

const Album = styled.span``;

const Duration = styled.span``;

const ListFooter = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const MoreButton = styled(DefaultButton)`
  display: flex;
  align-items: center;
  background-color: black;
  color: #fff;
  border: 0.5px solid #2c2c2c;

  &:hover {
    background-color: #2c2c2c;
  }
`;

interface IRowList {
  title: string;
  subTitle?: string;
  list?: APIMusic[];
}

const RowList = ({ title, subTitle, list }: IRowList) => {
  const playMusic = usePlayMusic();

  return (
    <Wrapper>
      <ListHeader>
        {subTitle && <ListSubTitle>{subTitle}</ListSubTitle>}
        <ListTitle>{title}</ListTitle>
      </ListHeader>
      <ListContainer>
        {list?.map((item, idx) => (
          <ListItem key={item._id}>
            <Number>{idx + 1}</Number>
            <Image $img={item.coverImg} onClick={() => playMusic(item.ytId)} />
            <Title onClick={() => playMusic(item.ytId)}>{item.title}</Title>
            <Artist>
              <Link to={`/artists/${item.artists[0]._id}`}>
                {item.artists[0].artistname}
              </Link>
            </Artist>
            <Views>{item.counts.views}</Views>
            <Album>
              <Link to={`/albums/${item.album._id}`}>{item.album.title}</Link>
            </Album>
            <Duration>{item.duration}</Duration>
          </ListItem>
        ))}
        <ListFooter>
          <MoreButton>모두 표시</MoreButton>
        </ListFooter>
      </ListContainer>
    </Wrapper>
  );
};

export default RowList;
