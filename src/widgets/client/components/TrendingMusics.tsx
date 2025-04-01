import { useEffect, useState } from "react";
import { APIMusic } from "../../../shared/models/music";
import FlexListSkeleton from "../FlexList/FlexListSkeleton";
import FlexList from "../FlexList/FlexList";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/hooks/useToast";

const TrendingMusics = () => {
  const [trendingMusicsData, setTrendingMusicsData] = useState<
    APIMusic[] | null
  >(null);
  const [isTrendingMusicLoading, setIsTrendingMusicLoading] = useState(true);
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const getTrendingMusics = async () => {
    if (isError) return;
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/music/trending`
    ).then((res) => res.json());
    if (result.ok) {
      setTrendingMusicsData(result.musics);
    } else {
      setGlobalToast("Music Error", "TRENDING_MUSIC_FETCH_ERROR");
      setIsError(true);
    }
    setIsTrendingMusicLoading(false);
  };

  useEffect(() => {
    getTrendingMusics();
  }, []);

  return (
    <>
      {isError ? null : isTrendingMusicLoading ||
        trendingMusicsData === null ? (
        <FlexListSkeleton />
      ) : (
        <FlexList
          title="유행하는 음악"
          listFlag="music"
          list={trendingMusicsData}
          isCustom={false}
          info="많이 듣는 음악"
          buttonFunc={() => navigate("/trending")}
          isMore={false}
        />
      )}
    </>
  );
};

export default TrendingMusics;
