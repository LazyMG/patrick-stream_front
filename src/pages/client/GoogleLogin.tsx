import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;

  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoogleLogin = () => {
  const navigate = useNavigate();

  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get("access_token");

  const fetchLoginData = useCallback(async () => {
    if (!accessToken) return;

    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/auth/google-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
        navigate("/login");
      });

    if (result.ok) {
      window.location.href = "/";
    } else {
      alert("오류가 발생했습니다.");
      navigate("/login");
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (accessToken) {
      fetchLoginData();
    }
  }, [accessToken, fetchLoginData]);

  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
      >
        <g>
          <g transform="translate(80,50)">
            <g transform="rotate(0)">
              <circle fillOpacity="1" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.875s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.875s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(71.21320343559643,71.21320343559643)">
            <g transform="rotate(45)">
              <circle fillOpacity="0.875" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.75s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.75s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(50,80)">
            <g transform="rotate(90)">
              <circle fillOpacity="0.75" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.625s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.625s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(28.786796564403577,71.21320343559643)">
            <g transform="rotate(135)">
              <circle fillOpacity="0.625" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.5s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.5s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(20,50.00000000000001)">
            <g transform="rotate(180)">
              <circle fillOpacity="0.5" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.375s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.375s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(28.78679656440357,28.786796564403577)">
            <g transform="rotate(225)">
              <circle fillOpacity="0.375" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.25s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.25s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(49.99999999999999,20)">
            <g transform="rotate(270)">
              <circle fillOpacity="0.25" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="-0.125s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="-0.125s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g transform="translate(71.21320343559643,28.78679656440357)">
            <g transform="rotate(315)">
              <circle fillOpacity="0.125" fill="#fff" r="6" cy="0" cx="0">
                <animateTransform
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  values="1.5 1.5;1 1"
                  begin="0s"
                  type="scale"
                  attributeName="transform"
                ></animateTransform>
                <animate
                  begin="0s"
                  values="1;0"
                  repeatCount="indefinite"
                  dur="1s"
                  keyTimes="0;1"
                  attributeName="fill-opacity"
                ></animate>
              </circle>
            </g>
          </g>
          <g></g>
        </g>
      </svg>
    </Wrapper>
  );
};

export default GoogleLogin;
