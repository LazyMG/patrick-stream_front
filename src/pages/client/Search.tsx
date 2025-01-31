import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { APIMusic } from "../../shared/models/music";
import styled, { keyframes } from "styled-components";
import { APIAlbum } from "../../shared/models/album";
import { APIArtist } from "../../shared/models/artist";
import { useSetRecoilState } from "recoil";
import { backgroundState } from "../../app/entities/global/atom";
import ResultContainer from "../../widgets/client/ResultContainer";
import ExactMusicResult from "../../widgets/client/ExactResult/ExactMusicResult";
import ExactArtistResult from "../../widgets/client/ExactResult/ExactArtistResult";
import ExactAlbumResult from "../../widgets/client/ExactResult/ExactAlbumResult";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
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

const ResultContainerSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  margin-bottom: 50px;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const ResultContainerTitleSkeleton = styled.span`
  height: 36px;
  width: 150px;

  background-color: #2e2e2e;
`;

const ResultContainerContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const ResultItemSkeleton = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  border-bottom: 1px solid #484848;

  &:last-child {
    border-bottom: none;
  }
`;

const ResultImageSkeleton = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;

  background-color: #2e2e2e;
`;

const ResultInfoSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ResultTitleSkeleton = styled.h4`
  height: 20px;
  width: 200px;

  background-color: #2e2e2e;
`;

const ResultDescriptionSkeleton = styled.div`
  height: 20px;
  width: 200px;

  background-color: #2e2e2e;
`;

const ExactResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  margin-bottom: 50px;
`;

const ExactResultContainerTitle = styled.h2`
  font-weight: bold;
  font-size: 28px;
`;

const CategoryContainerSkeleton = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  width: 250px;
  height: 33px;
  border-radius: 10px;
  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const Search = () => {
  const data = new URLSearchParams(useLocation().search);
  const keyword = data.get("q");
  const [searchMusicData, setSearchMusicData] = useState<APIMusic[] | null>(
    null
  );
  const [searchAlbumData, setSearchAlbumData] = useState<APIAlbum[] | null>(
    null
  );
  const [searchArtistData, setSearchArtistData] = useState<APIArtist[] | null>(
    null
  );
  const [searchExactData, setSearchExactData] = useState<{
    data: {
      type: "music" | "album" | "artist";
      result: APIMusic | APIAlbum | APIArtist;
    };
  } | null>(null);
  const [filter, setFilter] = useState<"music" | "album" | "artist" | "all">(
    "all"
  );

  const [isLoading, setIsLoading] = useState(true);

  const setBackground = useSetRecoilState(backgroundState);

  const getSearchData = async () => {
    const result = await fetch(
      `http://localhost:5000/search?keyword=${keyword}`
    ).then((res) => res.json());
    if (result.ok) {
      setSearchMusicData(result.musics);
      setSearchAlbumData(result.albums);
      setSearchArtistData(result.artists);
      setSearchExactData(
        result.exactResult
          ? {
              data: {
                result: result.exactResult.data,
                type: result.exactResult.type,
              },
            }
          : null
      );
      await new Promise((resolve) => setTimeout(resolve, 100));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
    setBackground(null);
  }, [keyword]);

  const filteringCategory = (category: "music" | "album" | "artist") => {
    if (filter === category) {
      setFilter("all");
      return;
    }
    setFilter(category);
  };

  return (
    <Wrapper>
      {!isLoading ? (
        <CategoryContainer>
          {searchMusicData && searchMusicData.length !== 0 && (
            <CategoryButton
              $isActive={filter === "music"}
              onClick={() => filteringCategory("music")}
            >
              노래
            </CategoryButton>
          )}
          {searchAlbumData && searchAlbumData.length !== 0 && (
            <CategoryButton
              $isActive={filter === "album"}
              onClick={() => filteringCategory("album")}
            >
              앨범
            </CategoryButton>
          )}
          {searchArtistData && searchArtistData.length !== 0 && (
            <CategoryButton
              $isActive={filter === "artist"}
              onClick={() => filteringCategory("artist")}
            >
              아티스트
            </CategoryButton>
          )}
        </CategoryContainer>
      ) : (
        <CategoryContainerSkeleton />
      )}
      {!isLoading ? (
        <>
          {searchExactData && filter === "all" && (
            <ExactResultContainer>
              <ExactResultContainerTitle>
                상위 검색결과
              </ExactResultContainerTitle>
              {searchExactData.data?.type === "music" && (
                <ExactMusicResult
                  data={searchExactData.data.result as APIMusic}
                />
              )}
              {searchExactData.data?.type === "album" && (
                <ExactAlbumResult
                  data={searchExactData.data.result as APIAlbum}
                />
              )}
              {searchExactData.data?.type === "artist" && (
                <ExactArtistResult
                  data={searchExactData.data.result as APIArtist}
                />
              )}
            </ExactResultContainer>
          )}
          {searchMusicData &&
            (filter === "all" || filter === "music") &&
            searchMusicData.length !== 0 && (
              <ResultContainer
                dataFlag="music"
                dataList={
                  "music" === filter
                    ? searchMusicData
                    : searchMusicData.slice(0, 3)
                }
                isMore={"music" !== filter}
                filteringCategory={filteringCategory}
              />
            )}
          {searchAlbumData &&
            (filter === "all" || filter === "album") &&
            searchAlbumData.length !== 0 && (
              <ResultContainer
                dataFlag="album"
                dataList={
                  "album" === filter
                    ? searchAlbumData
                    : searchAlbumData.slice(0, 3)
                }
                isMore={"album" !== filter}
                filteringCategory={filteringCategory}
              />
            )}
          {searchArtistData &&
            (filter === "all" || filter === "artist") &&
            searchArtistData.length !== 0 && (
              <ResultContainer
                dataFlag="artist"
                dataList={
                  "artist" === filter
                    ? searchArtistData
                    : searchArtistData.slice(0, 3)
                }
                isMore={"artist" !== filter}
                filteringCategory={filteringCategory}
              />
            )}
        </>
      ) : (
        <ResultContainerSkeleton>
          <ResultContainerTitleSkeleton />
          <ResultContainerContentSkeleton>
            <ResultItemSkeleton>
              <ResultImageSkeleton />
              <ResultInfoSkeleton>
                <ResultTitleSkeleton />
                <ResultDescriptionSkeleton />
              </ResultInfoSkeleton>
            </ResultItemSkeleton>
            <ResultItemSkeleton>
              <ResultImageSkeleton />
              <ResultInfoSkeleton>
                <ResultTitleSkeleton />
                <ResultDescriptionSkeleton />
              </ResultInfoSkeleton>
            </ResultItemSkeleton>
            <ResultItemSkeleton>
              <ResultImageSkeleton />
              <ResultInfoSkeleton>
                <ResultTitleSkeleton />
                <ResultDescriptionSkeleton />
              </ResultInfoSkeleton>
            </ResultItemSkeleton>
          </ResultContainerContentSkeleton>
        </ResultContainerSkeleton>
      )}
    </Wrapper>
  );
};

export default Search;
