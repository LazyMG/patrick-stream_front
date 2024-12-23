import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// const GoogleLogin = () => {
//   const parsedHash = new URLSearchParams(window.location.hash.substring(1));
//   const accessToken = parsedHash.get("access_token");
//   const navigate = useNavigate();

//   const fetchLoginData = useCallback(async () => {
//     const result = await fetch(`http://localhost:5000/auth/google-login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         accessToken,
//       }),
//       credentials: "include",
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         navigate("/login");
//       });
//     if (result.ok) {
//       console.log("구글 로그인 결과", result);

//       window.location.href = "/";
//     }
//   }, [accessToken, navigate]);

//   useEffect(() => {
//     if (accessToken) {
//       fetchLoginData();
//     }
//   }, [accessToken, fetchLoginData]);

//   //로딩 페이지
//   return <div>Loading</div>;
// };

const GoogleLogin = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null); // 상태로 accessToken 관리
  const navigate = useNavigate();

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const token = parsedHash.get("access_token");
    if (token) {
      setAccessToken(token); // 최초 한 번만 상태 업데이트
    }
  }, []);

  const fetchLoginData = useCallback(async () => {
    if (!accessToken) return;

    const result = await fetch(`http://localhost:5000/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken }),
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
      });

    if (result.ok) {
      console.log("구글 로그인 결과", result);
      window.location.href = "/";
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      fetchLoginData();
    }
  }, [accessToken, fetchLoginData]);

  return <div>Loading</div>;
};

export default GoogleLogin;
