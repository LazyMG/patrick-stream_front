import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { APIArtist } from "../../../shared/models/artist";
import { APIAlbum } from "../../../shared/models/album";
import { APIUser } from "../../../shared/models/user";
import { APIPlaylist } from "../../../shared/models/playlist";
import styled, { keyframes } from "styled-components";
import { setDates } from "../../../shared/lib/albumDataFormat";
import { useEffect, useState } from "react";

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

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #fff;
`;

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  column-gap: 20px;
  row-gap: 20px;
`;

const TitleSkeleton = styled.h1`
  height: 50px;
  width: 200px;
  border-radius: 10px;

  background-color: #2e2e2e;
  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const CategoryContainerSkeleton = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  width: 300px;
  height: 30px;
  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemImage = styled.div<{ $imgUrl: string; $isCircle: boolean }>`
  width: 100%;
  aspect-ratio: 1 / 1;

  background-image: ${(props) => props.$imgUrl && `url(${props.$imgUrl})`};
  background-size: cover;
  background-position: center;

  position: relative;

  border-radius: ${(props) => (props.$isCircle ? `50%` : "10px")};

  cursor: pointer;
`;

const ItemInfo = styled.div<{ $isTextCenter: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  ${(props) => props.$isTextCenter && `text-align: center;`}
`;

const ItemTitle = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: #fff;

  a {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ItemDescription = styled.span`
  font-size: 13px;
  color: #bdbdbd;

  a {
    color: #bdbdbd;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ItemSkeleton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const ItemImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const ItemInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ItemTitleSkeleton = styled.span`
  height: 18px;
  width: 100%;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const ItemDescriptionSkeleton = styled.span`
  height: 18px;
  width: 100%;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.div<{ $isActive: boolean }>`
  background-color: ${(props) => (props.$isActive ? "#fff" : "#565656")};
  color: ${(props) => (props.$isActive ? "#565656" : "#fff")};

  font-size: 13px;
  padding: 10px 15px;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #878787;
  }
`;

interface IUserOutlet {
  isLoading: boolean;
  userData: APIUser | null;
  isMyPage: boolean;
  userPlaylists: APIPlaylist[] | null;
  followingArtists: APIArtist[] | null;
  followingAlbums: APIAlbum[] | null;
}

const UserFollowings = () => {
  const {
    followingArtists,
    followingAlbums,
    isLoading,
    isMyPage,
  } = useOutletContext<IUserOutlet>();
  const { userId } = useParams();
  const [filter, setFilter] = useState<"album" | "artist" | "all">("all");
  const [checkMyPage, setCheckMyPage] = useState(false);
  const navigate = useNavigate();

  const filteringCategory = (category: "album" | "artist") => {
    if (filter === category) {
      setFilter("all");
      return;
    }
    setFilter(category);
  };

  useEffect(() => {
    if (isMyPage) {
      setCheckMyPage(true);
      return;
    }
    if (!isLoading && !isMyPage) {
      navigate(`/users/${userId}`);
    }
    if (!isLoading && isMyPage) {
      setCheckMyPage(true);
    }
  }, [isMyPage, isLoading]);

  return (
    <Wrapper>
      {checkMyPage ? (
        <>
          <Title>팔로잉 목록</Title>
          <CategoryContainer>
            <CategoryButton
              onClick={() => filteringCategory("album")}
              $isActive={filter === "album"}
            >
              앨범
            </CategoryButton>
            <CategoryButton
              onClick={() => filteringCategory("artist")}
              $isActive={filter === "artist"}
            >
              아티스트
            </CategoryButton>
          </CategoryContainer>
        </>
      ) : (
        <>
          <TitleSkeleton />
          <CategoryContainerSkeleton />
        </>
      )}
      <Container>
        {isLoading &&
          Array.from({ length: 14 }).map((_, idx) => (
            <ItemSkeleton key={idx}>
              <ItemImageSkeleton />
              <ItemInfoSkeleton>
                <ItemTitleSkeleton />
                <ItemDescriptionSkeleton />
              </ItemInfoSkeleton>
            </ItemSkeleton>
          ))}
        {!isLoading &&
          checkMyPage &&
          (filter === "all" || filter === "album") &&
          followingAlbums?.map((item) => (
            <Item key={item._id}>
              <ItemImage
                $imgUrl={item.coverImg ? item.coverImg : ""}
                $isCircle={false}
              />
              <ItemInfo $isTextCenter={false}>
                <ItemTitle>
                  <Link to={`/albums/${item._id}`}>{item.title}</Link>
                </ItemTitle>
                <ItemDescription>
                  {item.category}
                  {" • "}
                  <Link
                    to={`/artists/${item.artists ? item.artists[0]._id : ""}`}
                  >
                    {item.artists ? item.artists[0]?.artistname : ""}
                  </Link>
                  {" • "}
                  {setDates(item.released_at, 1)}
                </ItemDescription>
              </ItemInfo>
            </Item>
          ))}
        {!isLoading &&
          checkMyPage &&
          (filter === "all" || filter === "artist") &&
          followingArtists?.map((item) => (
            <Item key={item._id}>
              <ItemImage $imgUrl={item.coverImg} $isCircle={true} />
              <ItemInfo $isTextCenter={true}>
                <ItemTitle>
                  <Link to={`/artists/${item._id}`}>{item.artistname}</Link>
                </ItemTitle>
                <ItemDescription>
                  팔로워 {item.followers?.length}명
                </ItemDescription>
              </ItemInfo>
            </Item>
          ))}
      </Container>
    </Wrapper>
  );
};

export default UserFollowings;
