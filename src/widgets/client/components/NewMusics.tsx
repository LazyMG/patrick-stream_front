import { useCallback, useEffect, useState } from "react";
import { APIMusic } from "../../../shared/models/music";
import { useToast } from "../../../shared/hooks/useToast";
import FlexList from "./../FlexList/FlexList";
import FlexListSkeleton from "../FlexList/FlexListSkeleton";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isInitialFetchLoadingSelector,
  isInitialFetchLoadingState,
} from "../../../app/entities/global/atom";

const NewMusics = () => {
  const [newMusicsData, setNewMusicsData] = useState<APIMusic[] | null>(null);
  const [isNewMusicLoading, setIsNewMusicLoading] = useState(true);
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const setIsInitialFetchLoading = useSetRecoilState(
    isInitialFetchLoadingState
  );
  const isInitialLoading = useRecoilValue(isInitialFetchLoadingSelector);

  const getNewMusics = useCallback(async () => {
    if (isError) return;
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setNewMusicsData(result.musics);
    } else {
      setGlobalToast("Music Error", "NEW_MUSIC_FETCH_ERROR");
      setIsError(true);
    }
    setIsNewMusicLoading(false);
    setIsInitialFetchLoading((prev) => {
      return { ...prev, isNewMusicsLoading: false };
    });
  }, [setGlobalToast, isError]);

  useEffect(() => {
    getNewMusics();
  }, []);

  return (
    <>
      {isError ? null : isInitialLoading || newMusicsData === null ? (
        <FlexListSkeleton />
      ) : (
        <FlexList
          title="새로운 음악"
          listFlag="music"
          list={newMusicsData}
          isCustom={false}
          info="최근 추가된 음악"
          buttonFunc={() => navigate("/new_releases")}
          isMore={false}
        />
      )}
    </>
  );
};

export default NewMusics;
