import styled from "styled-components";

const ListIcon = styled.div`
  width: 25px;

  svg {
    display: none;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px; // height에서 min-height로 변경
  flex-shrink: 0; // 추가: 아이템의 크기 유지
  padding: 5px 15px;
  box-sizing: border-box;

  border-radius: 15px;

  color: #dddddd;

  cursor: pointer;

  &:hover {
    background-color: #424242;
  }

  &:hover ${ListIcon} svg {
    display: block; /* hover 시 svg 보이기 */
  }

  /* background-color: yellowgreen; */
`;

const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ListTitle = styled.span`
  font-weight: bold;
`;

const ListOwner = styled.span``;

const PlaylistItem = ({
  title,
  username,
}: {
  title: string;
  username: string;
}) => {
  return (
    <Wrapper>
      <ListInfo>
        <ListTitle>{title}</ListTitle>
        <ListOwner>{username}</ListOwner>
      </ListInfo>
      <ListIcon>
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
          />
        </svg>
      </ListIcon>
    </Wrapper>
  );
};

export default PlaylistItem;