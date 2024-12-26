import { useRecoilValue, useSetRecoilState } from "recoil";
import { recentMusicsState } from "../../app/entities/music/atom";
import { userState } from "../../app/entities/user/atom";
import { APIMusic } from "../models/music";

export const useRecentMusics = () => {
  const setRecentMusics = useSetRecoilState(recentMusicsState);
  const user = useRecoilValue(userState);

  const addUserRecentMusics = async (music: APIMusic) => {
    // 이미 존재한다면 바로 끝내지 말고 맨 앞으로 올리기기
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
