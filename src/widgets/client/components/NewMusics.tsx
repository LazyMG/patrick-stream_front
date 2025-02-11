import { useCallback, useEffect, useState } from "react";
import { APIMusic } from "../../../shared/models/music";
import { useToast } from "../../../shared/hooks/useToast";
import FlexList from "./../FlexList/FlexList";
import FlexListSkeleton from "../FlexList/FlexListSkeleton";
import { useNavigate } from "react-router-dom";

const NewMusics = () => {
  const [newMusicsData, setNewMusicsData] = useState<APIMusic[] | null>(null);
  const [isNewMusicLoading, setIsNewMusicLoading] = useState(true);
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const getNewMusics = useCallback(async () => {
    if (isError) return;
    const result = await fetch(
      `http://localhost:5000/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setNewMusicsData(result.musics);
    } else {
      setGlobalToast("Music Error", "NEW_MUSIC_FETCH_ERROR");
      setIsError(true);
    }
    setIsNewMusicLoading(false);
  }, [setGlobalToast, isError]);

  useEffect(() => {
    getNewMusics();
  }, []);

  return (
    <>
      {isError ? null : isNewMusicLoading || newMusicsData === null ? (
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
