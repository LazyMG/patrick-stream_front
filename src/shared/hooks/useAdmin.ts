import { useState } from "react";

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getAdmin = async () => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/auth/admin`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
    if (result.ok) {
      if (result.isAdmin) {
        //진행
        setIsLoading(false);
      } else {
        window.location.href = "/";
      }
    } else {
      window.location.href = "/";
    }
  };

  return { isLoading, getAdmin };
};
