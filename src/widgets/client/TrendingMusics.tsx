import { useEffect, useState } from "react";
import { APIMusic } from "../../shared/models/music";
import FlexListSkeleton from "./FlexListSkeleton";
import FlexList from "./FlexList";

const TrendingMusics = () => {
  const [trendingMusicsData, setTrendingMusicsData] = useState<
    APIMusic[] | null
  >(null);
  const [isTrendingMusicLoading, setIsTrendingMusicLoading] = useState(true);

  const getTrendingMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/music/trending`
    ).then((res) => res.json());
    if (result.ok) {
      setTrendingMusicsData(result.musics);
      setIsTrendingMusicLoading(false);
    }
  };

  useEffect(() => {
    getTrendingMusics();
  }, []);

  return (
    <>
      {isTrendingMusicLoading || trendingMusicsData === null ? (
        <FlexListSkeleton />
      ) : (
        <FlexList
          title="유행하는 음악"
          listFlag="music"
          list={trendingMusicsData}
          isCustom={false}
          info="많이 듣는 음악"
        />
      )}
    </>
  );
};

export default TrendingMusics;
