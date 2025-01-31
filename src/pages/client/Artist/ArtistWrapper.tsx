import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import NotFoundComponent from "../../../widgets/NotFoundComponent";
import { userState } from "../../../app/entities/user/atom";
import { Outlet, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { APIArtist } from "../../../shared/models/artist";
import { APIMusic } from "../../../shared/models/music";
import { followingArtistsState } from "../../../app/entities/artist/atom";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";
import { playingPlaylistState } from "../../../app/entities/music/atom";
import { useToast } from "../../../shared/hooks/useToast";
import { debounce } from "lodash";
import { APIAlbum } from "../../../shared/models/album";

const ArtistWrapper = () => {
  const user = useRecoilValue(userState);
  const { artistId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [artistData, setArtistData] = useState<APIArtist | null>(null);
  const [artistMusics, setArtistMusics] = useState<APIMusic[] | null>(null);
  const [artistAlbums, setArtistAlbums] = useState<APIAlbum[] | null>(null);
  const [follow, setFollow] = useState<boolean | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const currentFollowers = artistData?.followers?.length ?? 0;

  const [followingArtists, setFollowingArtists] = useRecoilState(
    followingArtistsState
  );

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const playMusic = usePlayMusic();
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setFollowers((prev) => {
      if (prev === currentFollowers) return prev;
      return currentFollowers;
    });
  }, [currentFollowers]);

  useEffect(() => {
    if (followingArtists) {
      const isFollow = followingArtists.some(
        (artist) => artist._id === artistId
      );
      setFollow(!!isFollow);
    }
  }, [followingArtists, artistId]);

  const getArtist = useCallback(
    async (id: string) => {
      if (isError) return;
      const result = await fetch(
        `http://localhost:5000/artist/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        setArtistData(result.artist);
        console.log(result);
        setArtistMusics(result.artist.musics);
        setArtistAlbums(result.artist.albums);
        await new Promise((resolve) => setTimeout(resolve, 100));

        setIsLoading(false);
      } else {
        setIsError(true);
        if (!result.error) {
          setIsNotFound(true);
        } else {
          setGlobalToast("Artist Error", "ARTIST_DATA_FETCH_ERROR");
          setIsLoading(false);
        }
      }
    },
    [setGlobalToast, isError]
  );

  useEffect(() => {
    setIsNotFound(false);
  }, [artistId]);

  useEffect(() => {
    if (artistId) {
      getArtist(artistId);
    }
  }, [artistId]);

  const patchArtistFollowers = useCallback(
    async (addList: boolean) => {
      await fetch(`http://localhost:5000/artist/${artistId}/followers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList,
        }),
      });
    },
    [artistId, user.userId]
  );

  const debouncedFollowArtist = useMemo(
    () => debounce((addList) => patchArtistFollowers(addList), 200),
    [patchArtistFollowers]
  );

  const followArtist = async () => {
    if (!artistId || user.userId === "") return;

    const addList = !follow;
    setFollow(addList);
    setFollowers((prev) => {
      if (prev === null) return prev;
      return addList ? prev + 1 : Math.max(prev - 1, 0);
    });
    if (artistData) {
      setFollowingArtists((prev) => {
        if (!prev) return prev;
        if (addList) {
          return [artistData, ...prev];
        } else {
          const newList = prev.filter(
            (artist) => artist._id !== artistData._id
          );
          return [...newList];
        }
      });
    }
    debouncedFollowArtist(addList);
  };

  const playArtistMusics = () => {
    if (!artistData?.musics || isLoading) return;
    setPlayingPlaylist(artistData.musics);
    playMusic(artistData.musics[0], true);
  };

  if (isNotFound) {
    return <NotFoundComponent />;
  }

  return (
    <Outlet
      context={{
        isLoading,
        artistData,
        followers,
        follow,
        playArtistMusics,
        followArtist,
        artistMusics,
        artistAlbums,
        isNotFound,
      }}
    />
  );
};

export default ArtistWrapper;
