import { useRecoilValue, useSetRecoilState } from "recoil";
import { recentMusicsState } from "../../app/entities/music/atom";
import { userState } from "../../app/entities/user/atom";
import { APIMusic } from "../models/music";

export const useRecentMusics = () => {
  const setRecentMusics = useSetRecoilState(recentMusicsState);
  const user = useRecoilValue(userState);

  const addUserRecentMusics = async (music: APIMusic) => {
    setRecentMusics((prev) => {
      if (prev) {
        if (prev.some((item) => item.ytId === music.ytId)) return prev;
        return [music, ...prev];
      } else {
        return prev;
      }
    });

    if (user.userId === "") return null;

    const result = await fetch(
      `http://localhost:5000/user/${user.userId}/recentMusics`,
      {
        method: "POST",
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
