import { useEffect, useState } from "react";
import { APIMusic } from "../../../shared/models/music";
import GridList from "../GridList/GridList";
import GridListSkeleton from "../GridList/GridListSkeleton";
import { useSetRecoilState } from "recoil";
import { playingPlaylistState } from "../../../app/entities/music/atom";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";
import { useToast } from "../../../shared/hooks/useToast";

const FastSelectMusics = () => {
  const [fastSelectMusicData, setFastSelectMusicData] = useState<
    APIMusic[] | null
  >(null);
  const [isFastSelectMusicLoading, setIsFastSelectMusicLoading] = useState(
    true
  );
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const playMusic = usePlayMusic();

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
      setFastSelectMusicData(result.musics);
    } else {
      setGlobalToast("Music Error", "TRENDING_MUSIC_FETCH_ERROR");
      setIsError(true);
    }
    setIsFastSelectMusicLoading(false);
  };

  useEffect(() => {
    getTrendingMusics();
  }, []);

  const fastPlayMusic = () => {
    if (!fastSelectMusicData) return;
    setPlayingPlaylist(fastSelectMusicData);
    playMusic(fastSelectMusicData[0], true);
  };

  return (
    <>
      {isError ? null : isFastSelectMusicLoading ||
        fastSelectMusicData === null ? (
        <GridListSkeleton />
      ) : (
        <GridList
          list={fastSelectMusicData}
          buttonText="모두 재생"
          onClick={fastPlayMusic}
        />
      )}
    </>
  );
};

export default FastSelectMusics;
