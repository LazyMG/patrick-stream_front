import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { APIArtist } from "../../../shared/models/artist";
import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  font-size: 48px;
  font-weight: bold;

  width: 100%;
  height: 70vh;
`;

const AdminArtistsDetailContainer: React.FC = () => {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState<APIArtist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getArtist = async (id = "") => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/artist/${id}?filter=all`
    ).then((res) => res.json());
    if (result.ok) {
      setArtistData(result.artist);
      setIsLoading(false);
    } else {
      if (!result.error) {
        if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
        else if (result.type === "NO_DATA")
          alert("존재하지 않는 데이터입니다.");
      } else {
        alert("DB 에러입니다.");
      }
      navigate("/admin/artists");
    }
  };

  useEffect(() => {
    getArtist(artistId);
  }, [artistId]);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Outlet context={{ artist: artistData, setArtist: setArtistData }} />
      )}
    </>
  );
};

export default AdminArtistsDetailContainer;
