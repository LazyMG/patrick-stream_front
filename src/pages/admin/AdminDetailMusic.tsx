import React from "react";
import { useParams } from "react-router-dom";

const AdminDetailMusic = () => {
  const { musicId } = useParams();
  console.log(musicId);

  return <div>AdminDetailMusic</div>;
};

export default AdminDetailMusic;
