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
        if (prev.some((item) => item.ytId === music.ytId)) {
          const newList = prev.filter((item) => item.ytId !== music.ytId);
          return [music, ...newList];
        }
        return [music, ...prev];
      } else {
        return prev;
      }
    });

    if (user.userId === "") return null;

    const result = await fetch(
      `http://localhost:5000/user/${user.userId}/recentMusics`,
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
      console.log(result);
    }
  };
  return { addUserRecentMusics };
};
