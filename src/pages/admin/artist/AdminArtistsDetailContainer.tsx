import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const AdminArtistsDetailContainer: React.FC = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState();

  const getArtist = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/artist/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      console.log(result.artist);
      setArtist(result.artist);
    }
  };

  useEffect(() => {
    getArtist(artistId);
  }, [artistId]);

  return <Outlet context={artist} />;
};

export default AdminArtistsDetailContainer;
