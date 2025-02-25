import { useState } from "react";

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getAdmin = async () => {
    const result = await fetch(`http://localhost:5000/auth/admin`, {
      credentials: "include",
    }).then((res) => res.json());
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
