import React, { useEffect, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";

const AdminMusics: React.FC = () => {
  const [musics, setMusics] = useState([]);
  const [isError, setIsError] = useState(false);

  const getMusics = async () => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/music`
    ).then((res) => res.json());
    if (result.ok) {
      setMusics(result.allMusics);
    } else {
      setMusics([]);
      setIsError(true);
    }
  };

  useEffect(() => {
    getMusics();
  }, []);

  return (
    <AdminPageLayout dataType="music" dataList={musics} isError={isError} />
  );
};

export default AdminMusics;
