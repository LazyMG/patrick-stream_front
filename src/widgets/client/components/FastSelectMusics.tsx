import { useEffect, useState } from "react";
import { APIMusic } from "../../../shared/models/music";
import GridList from "../GridList/GridList";
import GridListSkeleton from "../GridList/GridListSkeleton";
import { useSetRecoilState } from "recoil";
import { playingPlaylistState } from "../../../app/entities/music/atom";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";

const FastSelectMusics = () => {
  const [fastSelectMusicData, setFastSelectMusicData] = useState<
    APIMusic[] | null
  >(null);
  const [isFastSelectMusicLoading, setIsFastSelectMusicLoading] = useState(
    true
  );

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const playMusic = usePlayMusic();

  const getNewMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setFastSelectMusicData(result.musics);
      setIsFastSelectMusicLoading(false);
    }
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
      {isFastSelectMusicLoading || fastSelectMusicData === null ? (
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
