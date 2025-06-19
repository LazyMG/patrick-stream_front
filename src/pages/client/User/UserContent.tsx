import styled, { keyframes } from "styled-components";
import { useOutletContext } from "react-router-dom";

import FlexList from "../../../widgets/client/FlexList/FlexList";
import RowList from "../../../widgets/client/RowList/RowList";
import RowListSkeleton from "../../../widgets/client/RowList/RowListSkeleton";
import { DefaultButton } from "../../../shared/ui/DefaultButton";

import { APIUser } from "../../../shared/models/user";
import { APIMusic } from "../../../shared/models/music";
import { APIPlaylist } from "../../../shared/models/playlist";
import { APIArtist } from "../../../shared/models/artist";
import { APIAlbum } from "../../../shared/models/album";
import UserEditModal from "../../../widgets/client/UserEditModal";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;

  @media (max-width: 614px) {
    gap: 30px;
  }
`;

const InfoContainer = styled.div`
  width: 100%;

  padding: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
`;

const InfoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoIcon = styled.div`
  svg {
    width: 180px;
  }

  @media (max-width: 614px) {
    svg {
      width: 120px;
    }
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 614px) {
    gap: 10px;
  }
`;

const InfoName = styled.span`
  font-size: 32px;
  color: #fff;
  font-weight: bold;

  @media (max-width: 614px) {
    font-size: 24px;
  }
`;

const InfoContent = styled.p`
  font-size: 14px;
  color: #777777;
`;

const InfoButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Button = styled(DefaultButton)<{ $alter: boolean }>`
  color: ${(props) => (props.$alter ? "#fff" : "#000")};
  background-color: ${(props) => (props.$alter ? "#000" : " #fff")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1.5px solid #fff;

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$alter ? "#282828" : " #c7c7c7")};
    transform: scale(1.1);
  }
`;

const FollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? `${props.theme.color.purple}` : "#fff")};
  background-color: ${(props) =>
    props.$follow ? "transparent" : `${props.theme.color.purple}`};

  font-size: 16px;

  padding: 5px 30px;

  border: 1.5px solid ${(props) => props.theme.color.purple};

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) =>
      props.$follow ? `${props.theme.color.purple}` : "transparent"};
    color: ${(props) =>
      props.$follow ? "#fff" : `${props.theme.color.purple}`};
  }
`;

const pulseKeyframes = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0.4;
  }
  100%{
    opacity: 1;
  }
`;

const InfoTextSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const InfoNameSkeleton = styled.span`
  height: 40px;
  background-color: #2e2e2e;
  border-radius: 10px;

  width: 40%;
`;

const InfoContentSkeleton = styled.p`
  height: 20px;
  background-color: #2e2e2e;
  border-radius: 10px;

  width: 20%;
`;

const InfoButtonsSkeleton = styled.div`
  height: 32px;
  width: 20%;
  min-width: 180px;
  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

interface IUserOutlet {
  isLoading: boolean;
  userData: APIUser | null;
  followers: number | null;
  isMyPage: boolean;
  logOut: () => Promise<void>;
  follow: boolean | null;
  followUser: () => Promise<void>;
  recentMusics: APIMusic[] | null;
  likedMusics: APIMusic[] | null;
  userPlaylists: APIPlaylist[] | null;
  followingArtists: APIArtist[] | null;
  followingAlbums: APIAlbum[] | null;
  moreButton: () => void;
  followingPage: () => void;
  isEditModalOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  isLogoutLoading: boolean;
}

const UserContent = () => {
  const {
    isLoading,
    userData,
    followers,
    isMyPage,
    logOut,
    follow,
    followUser,
    recentMusics,
    likedMusics,
    userPlaylists,
    followingArtists,
    followingAlbums,
    moreButton,
    followingPage,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
    isLogoutLoading,
  } = useOutletContext<IUserOutlet>();
  return (
    <Wrapper>
      <InfoContainer>
        <InfoProfile>
          <InfoIcon>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </InfoIcon>
          {!isLoading && userData ? (
            <InfoText>
              <InfoName>{userData.username}</InfoName>
              <InfoContent>{`팔로워 수: ${followers ?? 0}`}</InfoContent>
            </InfoText>
          ) : (
            <InfoTextSkeleton>
              <InfoNameSkeleton />
              <InfoContentSkeleton />
            </InfoTextSkeleton>
          )}
        </InfoProfile>
        {!isLoading ? (
          <InfoButtons>
            {userData && isMyPage ? (
              <>
                {!userData.isSocial && (
                  <Button $alter={false} onClick={openEditModal}>
                    수정
                  </Button>
                )}
                <Button
                  onClick={logOut}
                  $alter={true}
                  disabled={isLogoutLoading}
                >
                  {isLogoutLoading ? "진행 중" : "로그아웃"}
                </Button>
              </>
            ) : (
              follow !== null && (
                <FollowButton $follow={follow} onClick={followUser}>
                  {follow ? "언팔로우" : "팔로우"}
                </FollowButton>
              )
            )}
          </InfoButtons>
        ) : (
          <InfoButtonsSkeleton />
        )}
      </InfoContainer>
      {isLoading && <RowListSkeleton />}
      {isMyPage && recentMusics && recentMusics?.length !== 0 && (
        <RowList
          title="최근 들은 음악"
          subTitle="공개"
          list={recentMusics}
          buttonFunc={moreButton}
        />
      )}
      {isMyPage && likedMusics && likedMusics.length !== 0 && (
        <RowList title="좋아요 한 음악" subTitle="공개" list={likedMusics} />
      )}
      {userPlaylists && userPlaylists.length !== 0 && (
        <FlexList
          list={userPlaylists}
          isCustom={false}
          listFlag="playlist"
          title="재생목록"
          isMore={true}
        />
      )}
      {isMyPage && followingArtists && followingArtists.length !== 0 && (
        <FlexList
          title="팔로우 한 아티스트"
          isCustom={false}
          listFlag="artist"
          list={followingArtists}
          isMore={true}
          buttonFunc={followingPage}
        />
      )}
      {isMyPage && followingAlbums && followingAlbums.length !== 0 && (
        <FlexList
          title="팔로우 한 앨범"
          isCustom={false}
          listFlag="album"
          list={followingAlbums}
          isMore={true}
          buttonFunc={followingPage}
        />
      )}
      {isEditModalOpen && <UserEditModal closeModal={closeEditModal} />}
    </Wrapper>
  );
};

export default UserContent;
