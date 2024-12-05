import React, { useEffect, useState } from "react";
import AdminPageLayout from ".././AdminPageLayout";

const AdminArtists: React.FC = () => {
  const [artists, setArtists] = useState([]);

  const getArtists = async () => {
    const result = await fetch("http://localhost:5000/artist").then((res) =>
      res.json()
    );
    if (result.ok) {
      console.log(result.allArtists);
      setArtists(result.allArtists);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);

  return <AdminPageLayout dataType={"artist"} dataList={artists} />;
};

export default AdminArtists;
