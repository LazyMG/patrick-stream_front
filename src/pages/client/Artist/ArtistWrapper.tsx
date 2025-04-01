import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import NotFoundComponent from "../../../widgets/NotFoundComponent";
import { userState } from "../../../app/entities/user/atom";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

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
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/artist/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        setArtistData(result.artist);
        setArtistMusics(result.artist.musics);
        setArtistAlbums(result.artist.albums);
        await new Promise((resolve) => setTimeout(resolve, 100));

        setIsLoading(false);
      } else {
        setIsError(true);
        if (!result.error) {
          if (result.type === "ERROR_ID") {
            setGlobalToast("잘못된 아이디입니다.", "ARTIST_DATA_ID_ERROR");
          } else if (result.type === "NO_DATA") {
            setGlobalToast(
              "데이터를 찾을 수 없습니다.",
              "ARTIST_DATA_NO_DATA_ERROR"
            );
          }
          setIsNotFound(true);
        } else {
          navigate("/not-found");
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
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/artist/${artistId}/followers`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUserId: user.userId,
            addList,
          }),
        }
      ).then((res) => res.json());
      if (!result.ok) {
        if (!result.error) {
          if (result.type === "ERROR_ID") {
            setGlobalToast(
              "잘못된 데이터입니다.",
              "ARTIST_FOLLOW_DATA_ID_ERROR"
            );
          } else if (result.type === "NO_DATA") {
            setGlobalToast(
              "데이터를 찾을 수 없습니다.",
              "ARTIST_FOLLOW_NO_DATA_ERROR"
            );
          }
        } else {
          setGlobalToast("DB 오류가 발생했습니다.", "ARTIST_FOLLOW_DB_ERROR");
        }
        setFollow(!addList);
        setFollowers((prev) => {
          if (prev === null) return prev;
          return addList ? Math.max(prev - 1, 0) : prev + 1;
        });
      }
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
