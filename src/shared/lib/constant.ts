const REDIRECT_URL = "http://localhost:5173/google-login";

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${
  import.meta.env.VITE_GOOGLE_ID
}&redirect_uri=${REDIRECT_URL}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
