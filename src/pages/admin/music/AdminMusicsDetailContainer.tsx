import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { APIMusic } from "../../../shared/models/music";
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

const AdminMusicsDetailContainer: React.FC = () => {
  const { musicId } = useParams();
  const [musicData, setMusicData] = useState<APIMusic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getMusic = async (id = "") => {
    const result = await fetch(
      `http://localhost:5000/music/${id}`
    ).then((res) => res.json());

    if (result.ok) {
      setMusicData(result.music);
      setIsLoading(false);
    } else {
      if (!result.error) {
        if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
        else if (result.type === "NO_DATA")
          alert("존재하지 않는 데이터입니다.");
      } else {
        alert("DB 에러입니다.");
      }
      navigate("/admin/musics");
    }
  };

  useEffect(() => {
    getMusic(musicId);
  }, [musicId]);

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Outlet context={{ music: musicData, setMusic: setMusicData }} />
      )}
    </>
  );
};

export default AdminMusicsDetailContainer;
