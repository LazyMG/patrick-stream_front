import React, { useEffect, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";

const AdminAlbums: React.FC = () => {
  const [albums, setAlbums] = useState([]);
  const [isError, setIsError] = useState(false);

  const getAllAlbums = async () => {
    const result = await fetch("http://localhost:5000/album").then((res) =>
      res.json()
    );
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
