export const setAlbumSeconds = (seconds: number | undefined) => {
  if (typeof seconds === "undefined") return "00:00";
  const minute = Math.floor(seconds / 60);
  const second = (seconds - Number(minute) * 60).toString().padStart(2, "0");

  return `${minute}분 ${second}초`;
};

export const setDates = (dates: string | undefined, length: number = 3) => {
  if (typeof dates === "undefined") return "0000년";
  const [year, month, date] = dates.split("-");

  if (length === 1) return `${year}년`;
  if (length === 2) return `${year}년 ${month}월`;
  if (length === 3) return `${year}년 ${month}월 ${date}일`;
};
