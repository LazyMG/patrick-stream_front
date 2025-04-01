import React, { useEffect, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";

const AdminAlbums: React.FC = () => {
  const [albums, setAlbums] = useState([]);
  const [isError, setIsError] = useState(false);

  const getAllAlbums = async () => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/album`
    ).then((res) => res.json());
    if (result.ok) {
      setAlbums(result.albums);
    } else {
      setAlbums([]);
      setIsError(true);
    }
  };
  useEffect(() => {
    getAllAlbums();
  }, []);

  return (
    <AdminPageLayout dataType="album" dataList={albums} isError={isError} />
  );
};

export default AdminAlbums;
