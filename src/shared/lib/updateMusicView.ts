import { APIMusic } from "../models/music";

export const updateMusicView = async (music: APIMusic) => {
  const result = await fetch(`http://localhost:5000/music/${music._id}/views`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isIncrease: true }),
  }).then((res) => res.json());
  if (result.ok) {
    console.log("view increase!");
  }
};
