import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const AdminAlbumsDetailContainer: React.FC = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState();

  const getAlbum = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/album/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      setAlbum(result.album);
    }
  };

  useEffect(() => {
    getAlbum(albumId);
  }, [albumId]);

  return <Outlet context={album} />;
};

export default AdminAlbumsDetailContainer;
