import styled from "styled-components";
import { APIPlaylist } from "../../shared/models/playlist";
import { Link } from "react-router-dom";

const ListItem = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px;
`;

const Image = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Info = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  font-size: 16px;
`;

const Category = styled.span``;

const User = styled.span`
  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
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

interface IFlexListPlaylistItem {
  playlist: APIPlaylist;
}

const FlexlistPlaylistItem = ({ playlist }: IFlexListPlaylistItem) => {
  return (
    <ListItem>
      <Image>
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
        </svg>
      </Image>
      <Info>
        <Title>
          <Link to={`/playlists/${playlist._id}`}>{playlist.title}</Link>
        </Title>
        <Description>
          <Category>재생목록</Category>
          {" • "}
          <User>
            <Link to={`/users/${playlist.user._id}`}>
              {playlist.user.username}
            </Link>
          </User>
        </Description>
      </Info>
    </ListItem>
  );
};

export default FlexlistPlaylistItem;
