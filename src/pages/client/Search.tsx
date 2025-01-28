import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { APIMusic } from "../../shared/models/music";
import styled from "styled-components";
import { APIAlbum } from "../../shared/models/album";
import { APIArtist } from "../../shared/models/artist";
import { useSetRecoilState } from "recoil";
import { backgroundState } from "../../app/entities/global/atom";
import ResultContainer from "../../widgets/client/ResultContainer";

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

  font-size: 18px;
  padding: 10px 15px;
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: #878787;
  }
`;

const Search = () => {
  const data = new URLSearchParams(useLocation().search);
  const keyword = data.get("q");
  const [searchMusicData, setSearchMusicData] = useState<{
    data: APIMusic[];
    showing: boolean;
  } | null>(null);
  const [searchAlbumData, setSearchAlbumData] = useState<{
    data: APIAlbum[];
    showing: boolean;
  } | null>(null);
  const [searchArtistData, setSearchArtistData] = useState<{
    data: APIArtist[];
    showing: boolean;
  } | null>(null);
  const [isActive, setIsActive] = useState<"music" | "album" | "artist" | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const setBackground = useSetRecoilState(backgroundState);

  const getSearchData = async () => {
    const result = await fetch(
      `http://localhost:5000/search?keyword=${keyword}`
    ).then((res) => res.json());
    if (result.ok) {
      setSearchMusicData({ data: result.musics, showing: true });
      setSearchAlbumData({ data: result.albums, showing: true });
      setSearchArtistData({ data: result.artists, showing: true });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSearchData();
    setBackground(null);
  }, [keyword]);

  const filteringCategory = (filter: string) => {
    if (filter === isActive) {
      setIsActive(null);
      setSearchMusicData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: true };
      });
      setSearchAlbumData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: true };
      });
      setSearchArtistData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: true };
      });
      return;
    }
    if (filter === "music") {
      setIsActive("music");
      setSearchMusicData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: true };
      });
      setSearchAlbumData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: false };
      });
      setSearchArtistData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: false };
      });
    } else if (filter === "album") {
      setIsActive("album");

      setSearchAlbumData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: true };
      });
      setSearchMusicData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: false };
      });
      setSearchArtistData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: false };
      });
    } else {
      setIsActive("artist");

      setSearchMusicData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: false };
      });
      setSearchAlbumData((prev) => {
        if (!prev) return prev;
        return { ...prev, showing: false };
      });
    }
  };

  return (
    <Wrapper>
      <CategoryContainer>
        <CategoryButton
          $isActive={isActive === "music"}
          onClick={() => filteringCategory("music")}
        >
          노래
        </CategoryButton>
        <CategoryButton
          $isActive={isActive === "album"}
          onClick={() => filteringCategory("album")}
        >
          앨범
        </CategoryButton>
      </CategoryContainer>
      {!isLoading && (
        <>
          {searchMusicData &&
            searchMusicData.showing &&
            searchMusicData.data.length !== 0 && (
              <ResultContainer
                dataFlag="music"
                dataList={
                  "music" === isActive
                    ? searchMusicData.data
                    : searchMusicData.data.slice(0, 3)
                }
                isMore={"music" !== isActive}
                filteringCategory={filteringCategory}
              />
            )}
          {searchAlbumData &&
            searchAlbumData.showing &&
            searchAlbumData.data.length !== 0 && (
              <ResultContainer
                dataFlag="album"
                dataList={
                  "album" === isActive
                    ? searchAlbumData.data
                    : searchAlbumData.data.slice(0, 3)
                }
                isMore={"album" !== isActive}
                filteringCategory={filteringCategory}
              />
            )}
          {searchArtistData &&
            searchArtistData.showing &&
            searchArtistData.data.length !== 0 && (
              <ResultContainer
                dataFlag="artist"
                dataList={
                  "artist" === isActive
                    ? searchArtistData.data
                    : searchArtistData.data.slice(0, 3)
                }
                isMore={"artist" !== isActive}
                filteringCategory={filteringCategory}
              />
            )}
        </>
      )}
    </Wrapper>
  );
};

export default Search;
