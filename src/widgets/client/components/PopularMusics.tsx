import { useEffect, useState } from "react";
import { APIMusic } from "../../../shared/models/music";
import FlexList from "./../FlexList/FlexList";
import FlexListSkeleton from "../FlexList/FlexListSkeleton";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/hooks/useToast";

const PopularMusics = () => {
  const [popularMusicsData, setPopularMusicsData] = useState<APIMusic[] | null>(
    null
  );
  const [isPopularMusicLoading, setIsPopularLoading] = useState(true);
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const getPopularMusics = async () => {
    if (isError) return;
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/music/popular`
    ).then((res) => res.json());
    if (result.ok) {
      setPopularMusicsData(result.musics);
    } else {
      setGlobalToast("Music Error", "POPULAR_MUSIC_FETCH_ERROR");
      setIsError(true);
    }
    setIsPopularLoading(false);
  };

  useEffect(() => {
    getPopularMusics();
  }, []);

  return (
    <>
      {isError ? null : isPopularMusicLoading || popularMusicsData === null ? (
        <FlexListSkeleton />
      ) : (
        <FlexList
          title="인기있는 음악"
          listFlag="music"
          list={popularMusicsData}
          isCustom={false}
          info="좋아요 많이 받은 음악"
          buttonFunc={() => navigate("/popular")}
          isMore={false}
        />
      )}
    </>
  );
};

export default PopularMusics;
