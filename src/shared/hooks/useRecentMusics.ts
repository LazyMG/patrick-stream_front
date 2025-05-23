import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { APIMusic } from "../models/music";
import { recentMusicsState } from "../../app/entities/music/atom";

export const useRecentMusics = () => {
  const user = useRecoilValue(userState);
  const setRecentMusics = useSetRecoilState(recentMusicsState);

  const addUserRecentMusics = async (music: APIMusic) => {
    setRecentMusics((prev) => {
      if (prev) {
        const currentMusic = {
          ...music,
          counts: {
            likes: music.counts.likes,
            views: music.counts.views + 1,
          },
        };
        if (prev.some((item) => item.ytId === music.ytId)) {
          const newList = prev.filter((item) => item.ytId !== music.ytId);
          return [currentMusic, ...newList];
        }
        return [currentMusic, ...prev];
      } else {
        return prev;
      }
    });

    if (user.userId === "") return null;

    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/user/${user.userId}/recentMusics`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ musicId: music._id }),
        credentials: "include",
      }
    ).then((res) => res.json());

    if (result.ok) {
      // console.log(result);
    }
  };
  return { addUserRecentMusics };
};
