import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { APIAlbum } from "../../shared/models/album";
import { APIArtist } from "../../shared/models/artist";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { setDates } from "../../shared/lib/albumDataFormat";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { DefaultButton } from "../../shared/ui/DefaultButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  margin-bottom: 50px;
`;

const ResultContainerTitle = styled.h2`
  font-weight: bold;
  font-size: 28px;
`;

const ResultContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const ResultItem = styled.div<{ $isLast: boolean }>`
  width: 100%;
  height: 70px;
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  ${(props) => !props.$isLast && `border-bottom: 1px solid #484848;`}
`;

const ResultImage = styled.div<{ $imgUrl: string; $isCircle: boolean }>`
  height: 100%;
  aspect-ratio: 1 / 1;

  background-image: ${(props) => props.$imgUrl && `url(${props.$imgUrl})`};
  background-size: cover;
  background-position: center;

  ${(props) => props.$isCircle && `border-radius:50%`};

  cursor: pointer;
`;

const ResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ResultTitle = styled.h4`
  font-weight: bold;

  cursor: pointer;
`;

const ResultDescription = styled.div`
  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 614px) {
    font-size: 14px;
  }
`;

const MoreButton = styled(DefaultButton)<{ $isActive: boolean }>`
width: fit-content;
  display: flex;
  align-items: center;
  background-color: black;
  ${(props) =>
    props.$isActive
      ? `border: 1.5px solid ${props.theme.color.purple};;`
      : "border: 1.5px solid #515151;"}

  ${(props) => (props.$isActive ? `color: #fefefe;` : "color:  #515151;")}

  ${(props) =>
    props.$isActive &&
    `&:hover {
    background-color: #2c2c2c;

    background-color: ${props.theme.color.purple};;
  }`}

  ${(props) => (props.$isActive ? `cursor:pointer;` : "cursor:auto;")}
`;

interface IResultContainer {
  dataList: APIMusic[] | APIAlbum[] | APIArtist[];
  dataFlag: "music" | "album" | "artist";
  isMore: boolean;
  filteringCategory: (filter: "music" | "album" | "artist") => void;
}

const ResultContainer = ({
  dataList,
  dataFlag,
  isMore,
  filteringCategory,
}: IResultContainer) => {
  const navigate = useNavigate();
  const playMusic = usePlayMusic();

  const onClick = (item: APIMusic | APIAlbum | APIArtist) => {
    if (dataFlag === "music") {
      playMusic(item as APIMusic);
    } else if (dataFlag === "album") {
      navigate(`/albums/${item._id}`);
    } else {
      navigate(`/artists/${item._id}`);
    }
  };
  return (
    <Wrapper>
      {dataFlag === "music" && (
        <>
          <ResultContainerTitle>노래</ResultContainerTitle>
          <ResultContainerContent>
            {(dataList as APIMusic[])?.map((item, idx) => (
              <ResultItem key={item._id} $isLast={idx + 1 === dataList.length}>
                <ResultImage $imgUrl={item.coverImg} $isCircle={false} />
                <ResultInfo>
                  <ResultTitle onClick={() => onClick(item)}>
                    {item.title}
                  </ResultTitle>
                  <ResultDescription>
                    <Link
                      to={`/artists/${item.artists ? item.artists[0]._id : ""}`}
                    >
                      {item.artists ? item.artists[0].artistname : ""}
                    </Link>
                    {" • "}
                    <Link to={`/albums/${item.album?._id}`}>
                      {item.album?.title}
                    </Link>
                    {" • "}
                    {setMusicSeconds(item.duration)}
                    {" • "}
                    {item.counts.views}회
                  </ResultDescription>
                </ResultInfo>
              </ResultItem>
            ))}
          </ResultContainerContent>
          {isMore && dataList.length >= 3 && (
            <MoreButton
              onClick={() => filteringCategory("music")}
              $isActive={true}
            >
              모두 표시
            </MoreButton>
          )}
        </>
      )}
      {dataFlag === "album" && (
        <>
          <ResultContainerTitle>앨범</ResultContainerTitle>
          <ResultContainerContent>
            {(dataList as APIAlbum[])?.map((item, idx) => (
              <ResultItem key={item._id} $isLast={idx + 1 === dataList.length}>
                <ResultImage
                  $imgUrl={item.coverImg ? item.coverImg : ""}
                  $isCircle={false}
                />
                <ResultInfo>
                  <ResultTitle onClick={() => onClick(item)}>
                    {item.title}
                  </ResultTitle>
                  <ResultDescription>
                    {item.category}
                    {" • "}
                    <Link
                      to={`/artists/${item.artists ? item.artists[0]._id : ""}`}
                    >
                      {item.artists ? item.artists[0].artistname : ""}
                    </Link>
                    {" • "}
                    {setDates(item.released_at, 1)}
                  </ResultDescription>
                </ResultInfo>
              </ResultItem>
            ))}
          </ResultContainerContent>
          {isMore && dataList.length >= 3 && (
            <MoreButton
              onClick={() => filteringCategory("album")}
              $isActive={true}
            >
              모두 표시
            </MoreButton>
          )}
        </>
      )}
      {dataFlag === "artist" && (
        <>
          <ResultContainerTitle>아티스트</ResultContainerTitle>
          <ResultContainerContent>
            {(dataList as APIArtist[])?.map((item, idx) => (
              <ResultItem key={item._id} $isLast={idx + 1 === dataList.length}>
                <ResultImage
                  $imgUrl={item.coverImg ? item.coverImg : ""}
                  $isCircle={true}
                />
                <ResultInfo>
                  <ResultTitle onClick={() => onClick(item)}>
                    {item.artistname}
                  </ResultTitle>
                  <ResultDescription>
                    아티스트
                    {" • "}
                    팔로워 {item.followers?.length} 명
                  </ResultDescription>
                </ResultInfo>
              </ResultItem>
            ))}
          </ResultContainerContent>
          {isMore && dataList.length >= 3 && (
            <MoreButton
              onClick={() => filteringCategory("artist")}
              $isActive={true}
            >
              모두 표시
            </MoreButton>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default ResultContainer;
