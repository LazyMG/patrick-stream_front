import { Link, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { backgroundState } from "../../app/entities/global/atom";
import { useCallback, useEffect, useState } from "react";
import { APIAlbum } from "../../shared/models/album";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import { setAlbumSeconds } from "../../shared/lib/albumDataFormat";
import AlbumList from "../../widgets/client/AlbumList";
import { loginUserDataState, userState } from "../../app/entities/user/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 100px;

  box-sizing: border-box;

  position: relative;

  z-index: 2;

  /* background-color: blue; */
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding-top: 20px;
  min-height: 100vh;
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
  width: 70%;
  margin-left: auto;
  /* min-height: 80vh; */
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Album = () => {
  const user = useRecoilValue(userState);
  const { albumId } = useParams();
  const setBackground = useSetRecoilState(backgroundState);
  const [isLoading, setIsLoading] = useState(true);
  const [albumData, setAlbumData] = useState<APIAlbum | null>(null);

  const [follow, setFollow] = useState(false);
  const [followers, setFollowers] = useState<number | null>(null);
  const loginUserData = useRecoilValue(loginUserDataState);

  const currentFollowers = albumData?.followers?.length ?? 0;

  useEffect(() => {
    setFollowers((prev) => {
      if (prev === currentFollowers) return prev;
      return currentFollowers;
    });
  }, [currentFollowers]);

  useEffect(() => {
    if (loginUserData) {
      const isFollow = loginUserData.followings?.followingAlbums.some(
        (album) => album._id === albumId
      );
      setFollow(!!isFollow);
    }
  }, [loginUserData, albumId]);

  const getAlbum = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/album/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        // console.log("album music", result.album.musics);
        setAlbumData(result.album as APIAlbum);
        setBackground({ src: result.album.coverImg, type: "blur" });
        setIsLoading(false);
      }
    },
    [setBackground]
  );

  useEffect(() => {
    if (albumId) {
      getAlbum(albumId);
    }
  }, [albumId, getAlbum]);

  const followAlbum = async () => {
    if (user.userId === "") return;
    if (follow) {
      setFollow(false);
      setFollowers((prev) => {
        if (prev) {
          return Math.max(prev - 1, 0);
        }
        return prev;
      });
      // 1. 로그인 한 사용자의 팔로잉 목록에서 제거
      // 2. 현재 페이지 아티스트의 팔로워 목록에서 제거
      await fetch(`http://localhost:5000/album/${albumId}/followers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList: false,
        }),
      });
    } else {
      setFollow(true);
      setFollowers((prev) => {
        if (prev !== null) {
          return prev + 1;
        }
        return prev;
      });
      // 1. 로그인 한 사용자의 팔로잉 목록에 추가
      // 2. 현재 페이지 아티스트의 팔로워 목록에 추가
      await fetch(`http://localhost:5000/album/${albumId}/followers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList: true,
        }),
      });
    }
  };

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
              </AlbumDescriptionContainer>
              <AlbumController>
                <AlbumPlayButton>
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
                <AlbumFollowButton $follow={follow} onClick={followAlbum}>
                  {follow ? "언팔로우" : "팔로우"}
                </AlbumFollowButton>
              </AlbumController>
              {/* <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "green",
                }}
              /> */}
            </AlbumInfo>
            <AlbumListContainer>
              {/* {Array.from({ length: 3 }).map((_, idx) => (
                <AlbumListItem key={idx}>
                  <ItemNumber>{idx + 1}</ItemNumber>
                  <ItemInfo>
                    <ItemTitle>우주를 건너</ItemTitle>
                    <ItemViews>100회</ItemViews>
                  </ItemInfo>
                  <ItemDuration>3:02</ItemDuration>
                </AlbumListItem>
              ))} */}
              {albumData.musics?.map((item, idx) => (
                <AlbumList music={item} index={idx} key={idx} />
              ))}
            </AlbumListContainer>
          </>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default Album;
