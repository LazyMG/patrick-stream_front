import { useEffect, useState } from "react";
import { APIMusic } from "../../shared/models/music";
import FlexList from "./FlexList";
import FlexListSkeleton from "./FlexListSkeleton";

const PopularMusics = () => {
  const [popularMusicsData, setPopularMusicsData] = useState<APIMusic[] | null>(
    null
  );
  const [isPopularMusicLoading, setIsPopularLoading] = useState(true);

  const getPopularMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/music/popular`
    ).then((res) => res.json());
    if (result.ok) {
      setPopularMusicsData(result.musics);
      setIsPopularLoading(false);
    }
  };

  useEffect(() => {
    getPopularMusics();
  }, []);
  return (
    <>
      {isPopularMusicLoading || popularMusicsData === null ? (
        <FlexListSkeleton />
      ) : (
        <FlexList
          title="인기있는 음악"
          listFlag="music"
          list={popularMusicsData}
          isCustom={false}
          info="좋아요 많이 받은 음악"
        />
      )}
    </>
  );
};

export default PopularMusics;
