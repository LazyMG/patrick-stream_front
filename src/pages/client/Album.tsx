import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { backgroundState } from "../../app/entities/global/atom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { APIAlbum } from "../../shared/models/album";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import { setAlbumSeconds } from "../../shared/lib/albumDataFormat";
import AlbumList from "../../widgets/client/AlbumList";
import { userState } from "../../app/entities/user/atom";
import { playingPlaylistState } from "../../app/entities/music/atom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import NotFound from "./NotFound";
import { followingAlbumsState } from "../../app/entities/album/atom";
import { debounce } from "lodash";
import { useToast } from "../../shared/hooks/useToast";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 100px;

  box-sizing: border-box;

  position: relative;

  z-index: 2;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding-top: 20px;
  /* min-height: 100vh; */
  /* height: 100vh; */
`;

const AlbumInfo = styled.div`
  position: sticky;
  top: 120px;
  width: 30%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: flex-start;
  margin-right: 80px;

  z-index: 1;
`;

const AlbumArtist = styled.span`
  cursor: pointer;

  a {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AlbumImage = styled.div<{ $img?: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
  background-image: ${(props) => (props.$img ? `url(${props.$img})` : "")};
  background-size: cover;
`;

const AlbumTitle = styled.h1`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  word-wrap: break-word;
  text-align: center;
`;

const AlbumDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AlbumDescription = styled.p`
  text-align: center;
`;

const AlbumController = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const AlbumPlayButton = styled.button`
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f5a3a5;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: 20px;
  }

  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const AlbumFollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? "#fff" : "#000")};
  background-color: ${(props) => (props.$follow ? "#000" : "#fff")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1px solid #fff;

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const AlbumListContainer = styled.div`
  width: 60%;
  margin-left: auto;
  min-height: 80vh;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const AlbumInfoSkeleton = styled.div`
  position: sticky;
  top: 120px;
  width: 30%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  align-self: flex-start;
  margin-right: 80px;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const AlbumArtistSkeleton = styled.span`
  width: 100px;
  height: 15px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const AlbumImageSkeleton = styled.div`
  width: 100%;
  min-width: 310px;
  aspect-ratio: 1 / 1;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const AlbumTitleSkeleton = styled.h1`
  width: 100px;
  height: 24px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const AlbumDescriptionContainerSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AlbumDescriptionSkeleton = styled.p`
  width: 200px;
  height: 25px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const AlbumControllerSkeleton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
`;

const AlbumPlayButtonSkeleton = styled.div`
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  background-color: #2e2e2e;
`;

const AlbumFollowButtonSkeleton = styled.div`
  width: 110px;
  height: 32px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const AlbumListContainerSkeleton = styled.div`
  width: 60%;
  margin-left: auto;
  min-height: 80vh;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const AlbumListItemSkeleton = styled.div`
  width: 100%;
  height: 50px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const Album = () => {
  const user = useRecoilValue(userState);
  const { albumId } = useParams();
  const setBackground = useSetRecoilState(backgroundState);
  const [isLoading, setIsLoading] = useState(true);
  const [albumData, setAlbumData] = useState<APIAlbum | null>(null);

  const [follow, setFollow] = useState<boolean | null>(false);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [followingAlbums, setFollowingAlbums] = useRecoilState(
    followingAlbumsState
  );

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const playMusic = usePlayMusic();
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);

  const currentFollowers = albumData?.followers?.length ?? 0;

  useEffect(() => {
    setFollowers((prev) => {
      if (prev === currentFollowers) return prev;
      return currentFollowers;
    });
  }, [currentFollowers]);

  useEffect(() => {
    if (followingAlbums) {
      const isFollow = followingAlbums.some((album) => album._id === albumId);
      setFollow(!!isFollow);
    }
  }, [followingAlbums, albumId]);

  const getAlbum = useCallback(
    async (id: string) => {
      if (isError) return;
      const result = await fetch(
        `http://localhost:5000/album/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        setAlbumData(result.album as APIAlbum);
        setBackground({ src: result.album.coverImg, type: "blur" });
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setIsLoading(false);
      } else {
        setIsError(true);
        if (!result.error) {
          setIsNotFound(true);
        } else {
          setGlobalToast("Album Error", "ALBUM_DATA_FETCH_ERROR");
          setIsLoading(false);
        }
      }
    },
    [setBackground, setGlobalToast, isError]
  );

  useEffect(() => {
    setIsNotFound(false);
  }, [albumId]);

  useEffect(() => {
    if (albumId) {
      getAlbum(albumId);
    }
  }, [albumId]);

  const patchAlbumFollowers = useCallback(
    async (addList: boolean) => {
      await fetch(`http://localhost:5000/album/${albumId}/followers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList,
        }),
      });
    },
    [albumId, user.userId]
  );

  const debouncedFollowAlbum = useMemo(
    () => debounce((addList) => patchAlbumFollowers(addList), 200),
    [patchAlbumFollowers]
  );

  const followAlbum = async () => {
    if (!albumId || user.userId === "" || follow === null) return;

    const addList = !follow;

    setFollow(addList);
    setFollowers((prev) => {
      if (prev === null) return prev;
      return addList ? prev + 1 : Math.max(prev - 1, 0);
    });

    if (albumData) {
      setFollowingAlbums((prev) => {
        if (!prev) return prev;
        if (addList) {
          return [albumData, ...prev];
        } else {
          const newList = prev.filter((album) => album._id !== albumData._id);
          return [...newList];
        }
      });
    }

    debouncedFollowAlbum(addList);
  };

  const playAlbumMusics = () => {
    if (!albumData?.musics) return;
    setPlayingPlaylist(albumData.musics);
    playMusic(albumData.musics[0], true);
  };

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <Wrapper>
      <ContentContainer>
        {!isLoading && albumData && (
          <>
            <AlbumInfo>
              <AlbumArtist>
                <Link
                  to={`/artists/${
                    albumData.artists ? albumData.artists[0]._id : ""
                  }`}
                >
                  {albumData.artists ? albumData.artists[0].artistname : ""}
                </Link>
              </AlbumArtist>
              <AlbumImage $img={albumData.coverImg} />
              <AlbumTitle>{albumData.title}</AlbumTitle>
              <AlbumDescriptionContainer>
                <AlbumDescription>
                  {albumData.category}
                  {" • "}
                  {albumData.released_at}
                </AlbumDescription>
                <AlbumDescription>
                  {albumData.length}곡{" • "}
                  {setAlbumSeconds(albumData.total_duration)}
                </AlbumDescription>
                <AlbumDescription>팔로워: {followers}명</AlbumDescription>
              </AlbumDescriptionContainer>
              <AlbumController>
                <AlbumPlayButton onClick={playAlbumMusics}>
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    />
                  </svg>
                </AlbumPlayButton>
                <AlbumFollowButton $follow={!!follow} onClick={followAlbum}>
                  {follow ? "언팔로우" : "팔로우"}
                </AlbumFollowButton>
              </AlbumController>
            </AlbumInfo>
            <AlbumListContainer>
              {albumData.musics?.map((item, idx) => (
                <AlbumList music={item} index={idx} key={idx} />
              ))}
            </AlbumListContainer>
          </>
        )}
        {isLoading && (
          <>
            <AlbumInfoSkeleton>
              <AlbumArtistSkeleton />
              <AlbumImageSkeleton />
              <AlbumTitleSkeleton />
              <AlbumDescriptionContainerSkeleton>
                <AlbumDescriptionSkeleton />
                <AlbumDescriptionSkeleton />
                <AlbumDescriptionSkeleton />
                <AlbumDescriptionSkeleton />
              </AlbumDescriptionContainerSkeleton>
              <AlbumControllerSkeleton>
                <AlbumPlayButtonSkeleton />
                <AlbumFollowButtonSkeleton />
              </AlbumControllerSkeleton>
            </AlbumInfoSkeleton>
            <AlbumListContainerSkeleton>
              <AlbumListItemSkeleton />
              <AlbumListItemSkeleton />
              <AlbumListItemSkeleton />
            </AlbumListContainerSkeleton>
          </>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default Album;
