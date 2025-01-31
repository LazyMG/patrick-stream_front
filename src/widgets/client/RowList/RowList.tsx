import styled from "styled-components";
import { DefaultButton } from "../../../shared/ui/DefaultButton";
import { APIMusic } from "../../../shared/models/music";
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
  z-index: 10;
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
      ? `border: 1px solid ${props.theme.color.purple};;`
      : "border: 1px solid #515151;"}

  ${(props) => (props.$isActive ? `color: #fefefe;` : "color:  #515151;")}

  ${(props) =>
    props.$isActive &&
    `&:hover {
    background-color: #2c2c2c;

    background-color: ${props.theme.color.purple};;
  }`}

  ${(props) => (props.$isActive ? `cursor:pointer;` : "cursor:auto;")}
`;

interface IRowList {
  title: string;
  subTitle?: string;
  list?: APIMusic[];
  isMine?: boolean;
  noLimit?: boolean;
  buttonFunc?: () => void;
}

const RowList = ({
  title,
  subTitle,
  list,
  isMine,
  buttonFunc,
  noLimit = false,
}: IRowList) => {
  const isActive = list && list.length >= 5 ? true : false;
  return (
    <Wrapper>
      <ListHeader>
        {subTitle && <ListSubTitle>{subTitle}</ListSubTitle>}
        <ListTitle>{title}</ListTitle>
      </ListHeader>
      <ListContainer>
        {!noLimit
          ? list
              ?.slice(0, 5)
              .map((item, idx) => (
                <RowListMusicItem
                  music={item}
                  index={idx}
                  key={item._id}
                  length={list?.length && list?.length >= 5 ? 5 : list?.length}
                  isMine={isMine}
                />
              ))
          : list?.map((item, idx) => (
              <RowListMusicItem
                music={item}
                index={idx}
                key={item._id}
                length={list?.length}
                isMine={isMine}
              />
            ))}
        {!noLimit && (
          <ListFooter>
            <MoreButton
              $isActive={isActive}
              onClick={() => {
                if (buttonFunc && isActive) buttonFunc();
              }}
            >
              모두 표시
            </MoreButton>
          </ListFooter>
        )}
      </ListContainer>
    </Wrapper>
  );
};

export default RowList;
