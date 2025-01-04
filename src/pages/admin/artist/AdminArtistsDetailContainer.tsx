import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { APIArtist } from "../../../shared/models/artist";

const AdminArtistsDetailContainer: React.FC = () => {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState<APIArtist | null>();
  const [isLoading, setIsLoading] = useState(true);

  const getArtist = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/artist/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      setArtistData(result.artist);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getArtist(artistId);
  }, [artistId]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Outlet context={{ artist: artistData, setArtist: setArtistData }} />
      )}
    </>
  );
};

export default AdminArtistsDetailContainer;
