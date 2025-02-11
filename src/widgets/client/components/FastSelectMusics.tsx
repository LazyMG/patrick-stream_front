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

  const getNewMusics = async () => {
    if (isError) return;
    const result = await fetch(
      `http://localhost:5000/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setFastSelectMusicData(result.musics);
    } else {
      setGlobalToast("Music Error", "NEW_MUSIC_FETCH_ERROR");
      setIsError(true);
    }
    setIsFastSelectMusicLoading(false);
  };

  useEffect(() => {
    getNewMusics();
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
