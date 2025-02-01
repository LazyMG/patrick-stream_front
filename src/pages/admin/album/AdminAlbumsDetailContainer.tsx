import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { APIAlbum } from "../../../shared/models/album";
import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 48px;
  font-weight: bold;

  width: 100%;
  height: 70vh;
`;

const AdminAlbumsDetailContainer: React.FC = () => {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState<APIAlbum | null>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getAlbum = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/album/${id}?filter=all`
    ).then((res) => res.json());

    if (result.ok) {
      setAlbumData(result.album);
      setIsLoading(false);
    } else {
      if (!result.error) {
        if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
        else if (result.type === "NO_DATA")
          alert("존재하지 않는 데이터입니다.");
      } else {
        alert("DB 에러입니다.");
      }
      navigate("/admin/albums");
    }
  };

  useEffect(() => {
    getAlbum(albumId);
  }, [albumId]);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Outlet context={{ album: albumData, setAlbum: setAlbumData }} />
      )}
    </>
  );
};

export default AdminAlbumsDetailContainer;
