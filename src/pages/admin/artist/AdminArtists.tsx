import React, { useEffect, useState } from "react";
import AdminPageLayout from ".././AdminPageLayout";

const AdminArtists: React.FC = () => {
  const [artists, setArtists] = useState([]);
  const [isError, setIsError] = useState(false);

  const getArtists = async () => {
    const result = await fetch("http://localhost:5000/artist").then((res) =>
      res.json()
    );
    if (result.ok) {
      setArtists(result.allArtists);
    } else {
      setArtists([]);
      setIsError(true);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return (
    <AdminPageLayout dataType={"artist"} dataList={artists} isError={isError} />
  );
};

export default AdminArtists;
