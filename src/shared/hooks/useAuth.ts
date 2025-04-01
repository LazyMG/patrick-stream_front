import { useRecoilState } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { useCallback, useEffect } from "react";

export const useAuth = () => {
  const [{ userId, loading }, setUser] = useRecoilState(userState);

  const getUserId = useCallback(async () => {
    // console.log(process.env.NODE_ENV);
    try {
      const response = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/auth/session`,
        {
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.ok) {
        const refreshResponse = await fetch(
          `${
            import.meta.env.DEV
              ? import.meta.env.VITE_DEV_API_URL
              : import.meta.env.VITE_PROD_API_URL
          }/auth/refreshToken`,
          {
            method: "POST",
            credentials: "include",
          }
        ).then((res) => res.json());
        if (!refreshResponse.error) {
          const userResponse = await fetch(
            `${
              import.meta.env.DEV
                ? import.meta.env.VITE_DEV_API_URL
                : import.meta.env.VITE_PROD_API_URL
            }/auth/session`,
            {
              credentials: "include",
            }
          );
          const userResult = await userResponse.json();
          if (userResponse.ok && userResult.userId) {
            setUser({ userId: userResult.userId, loading: false });
          } else {
            setUser({ userId: "", loading: false });
          }
        } else {
          setUser({ userId: "", loading: false });
        }
      } else {
        if (result.ok && result.userId) {
          setUser({
            userId: result.userId,
            loading: false,
          });
        } else {
          setUser({ userId: "", loading: false });
        }
      }
    } catch (error) {
      console.log("");
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
