import React, { useEffect, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";

const AdminMusics: React.FC = () => {
  const [musics, setMusics] = useState([]);

  const getMusics = async () => {
    const result = await fetch("http://localhost:5000/music").then((res) =>
      res.json()
    );
    if (result.ok) {
      setMusics(result.allMusics);
    }
  };

  useEffect(() => {
    getMusics();
  }, []);

  return <AdminPageLayout dataType="music" dataList={musics} />;
};

export default AdminMusics;
