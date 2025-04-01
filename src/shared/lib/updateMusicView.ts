import { APIMusic } from "../models/music";

export const updateMusicView = async (music: APIMusic) => {
  const result = await fetch(
    `${
      import.meta.env.DEV
        ? import.meta.env.VITE_DEV_API_URL
        : import.meta.env.VITE_PROD_API_URL
    }/music/${music._id}/views`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isIncrease: true }),
    }
  ).then((res) => res.json());
  if (!result.ok) {
    if (result.error) {
      // DB Error
      return { error: true, text: "DB_ERROR" };
    } else {
      if (result.type === "NO_DATA") {
        // NO_DATA
        return { error: true, text: "NO_DATA" };
      } else {
        // ERROR_ID
        return { error: true, text: "ERROR_ID" };
      }
    }
  } else {
    return { error: false, text: "" };
  }
};
