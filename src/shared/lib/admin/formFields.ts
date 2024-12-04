export const albumFields = [
  { name: "title", label: "제목", type: "text", tag: "input" },
  { name: "length", label: "곡 수", type: "number", tag: "input" },
  { name: "introduction", label: "소개", type: "text", tag: "textarea" },
  { name: "released_at", label: "발매일자", type: "text", tag: "input" },
  { name: "category", label: "카테고리", type: "text", tag: "input" },
  { name: "coverImg", label: "이미지", type: "text", tag: "input" },
] as const;

export const musicFields = [
  { name: "title", label: "제목", type: "text", tag: "input" },
  { name: "duration", label: "재생시간", type: "number", tag: "input" },
  { name: "ytId", label: "유튜브 아이디", type: "text", tag: "input" },
  { name: "released_at", label: "발매일자", type: "text", tag: "input" },
  { name: "genre", label: "장르", type: "text", tag: "input" },
  { name: "coverImg", label: "이미지", type: "text", tag: "input" },
] as const;

export const artistFields = [
  { name: "artistname", label: "이름", type: "text", tag: "input" },
  { name: "introduction", label: "소개", type: "text", tag: "textarea" },
  { name: "debut_at", label: "데뷔 일자", type: "text", tag: "input" },
  { name: "country", label: "국가", type: "text", tag: "input" },
  { name: "coverImg", label: "이미지", type: "text", tag: "input" },
] as const;
