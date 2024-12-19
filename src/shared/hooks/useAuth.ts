import { useRecoilState } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { useCallback, useEffect } from "react";

export const useAuth = () => {
  const [{ userId, loading }, setUser] = useRecoilState(userState);

  const getUserId = useCallback(async () => {
    const result = await fetch("http://localhost:5000/auth/session", {
      credentials: "include",
    }).then((res) => res.json());

    if (result.ok && result.userId) {
      setUser({
        userId: result.userId,
        loading: false,
      });
    } else {
      setUser({ userId: "", loading: false });
    }
  }, [setUser]);

  useEffect(() => {
    if (userId === "") {
      getUserId();
    } else {
      setUser((prev) => ({ ...prev, loading: false }));
    }
  }, [userId, getUserId, setUser]);

  return { userId, loading };
};
