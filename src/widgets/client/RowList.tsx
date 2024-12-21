import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import { APIMusic } from "../../shared/models/music";
import RowListMusicItem from "./RowListMusicItem";

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

  color: #fefefe;

  border: 1px solid #a988bd;

  &:hover {
    background-color: #2c2c2c;

    background-color: #a988bd;
  }
`;

interface IRowList {
  title: string;
  subTitle?: string;
  list?: APIMusic[];
}

const RowList = ({ title, subTitle, list }: IRowList) => {
  return (
    <Wrapper>
      <ListHeader>
        {subTitle && <ListSubTitle>{subTitle}</ListSubTitle>}
        <ListTitle>{title}</ListTitle>
      </ListHeader>
      <ListContainer>
        {list?.map((item, idx) => (
          <RowListMusicItem music={item} index={idx} />
        ))}
        <ListFooter>
          <MoreButton>모두 표시</MoreButton>
        </ListFooter>
      </ListContainer>
    </Wrapper>
  );
};

export default RowList;
