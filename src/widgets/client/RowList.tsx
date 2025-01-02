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

const MoreButton = styled(DefaultButton)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  background-color: black;
  ${(props) =>
    props.$isActive
      ? `border: 1px solid #a988bd;`
      : "border: 1px solid #515151;"}

  ${(props) => (props.$isActive ? `color: #fefefe;` : "color:  #515151;")}

  ${(props) =>
    props.$isActive &&
    `&:hover {
    background-color: #2c2c2c;

    background-color: #a988bd;
  }`}

  ${(props) => (props.$isActive ? `cursor:pointer;` : "cursor:auto;")}
`;

interface IRowList {
  title: string;
  subTitle?: string;
  list?: APIMusic[];
  isMine?: boolean;
}

const RowList = ({ title, subTitle, list, isMine }: IRowList) => {
  return (
    <Wrapper>
      <ListHeader>
        {subTitle && <ListSubTitle>{subTitle}</ListSubTitle>}
        <ListTitle>{title}</ListTitle>
      </ListHeader>
      <ListContainer>
        {list?.map((item, idx) => (
          <RowListMusicItem
            music={item}
            index={idx}
            key={item._id}
            length={list?.length}
            isMine={isMine}
          />
        ))}
        <ListFooter>
          <MoreButton $isActive={list && list.length >= 5 ? true : false}>
            모두 표시
          </MoreButton>
        </ListFooter>
      </ListContainer>
    </Wrapper>
  );
};

export default RowList;
