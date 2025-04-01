export const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${
  import.meta.env.VITE_GOOGLE_ID
}&redirect_uri=${
  import.meta.env.DEV
    ? import.meta.env.VITE_REDIRECT_DEV_URL
    : import.meta.env.VITE_REDIRECT_URL
}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
