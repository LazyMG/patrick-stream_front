import React, { useEffect, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";

const AdminAlbums: React.FC = () => {
  const [albums, setAlbums] = useState([]);

  const getAllAlbums = async () => {
    const result = await fetch("http://localhost:5000/album").then((res) =>
      res.json()
    );
    if (result.ok) {
      console.log(result.albums);
      setAlbums(result.albums);
    }
  };
  useEffect(() => {
    getAllAlbums();
  }, []);

  return <AdminPageLayout dataType="album" dataList={albums} />;
};

export default AdminAlbums;
