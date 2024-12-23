import styled from "styled-components";

const Wrapper = styled.button`
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 15px;
  border: 1px solid #5f5f5f;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  height: 45px;
  font-weight: bold;
  color: #fff;

  cursor: pointer;

  &:hover {
    border: 1px solid #fff;
  }
`;

const SocialButton = ({ onClickFunc }: { onClickFunc: () => void }) => {
  return (
    <Wrapper onClick={onClickFunc} type="button">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.1 12.2272C22.1 11.5182 22.0364 10.8363 21.9182 10.1818H12.5V14.05H17.8818C17.65 15.3 16.9455 16.3591 15.8864 17.0682V19.5772H19.1182C21.0091 17.8363 22.1 15.2727 22.1 12.2272Z"
          fill="#4285F4"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.4998 21.9999C15.1998 21.9999 17.4635 21.1045 19.118 19.5772L15.8862 17.0681C14.9907 17.6681 13.8453 18.0227 12.4998 18.0227C9.89529 18.0227 7.69075 16.2636 6.90439 13.8999H3.56348V16.4908C5.20893 19.759 8.59075 21.9999 12.4998 21.9999Z"
          fill="#34A853"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.90455 13.9C6.70455 13.3 6.59091 12.6591 6.59091 12C6.59091 11.3409 6.70455 10.7 6.90455 10.1V7.50909H3.56364C2.88636 8.85909 2.5 10.3864 2.5 12C2.5 13.6136 2.88636 15.1409 3.56364 16.4909L6.90455 13.9Z"
          fill="#FBBC05"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.4998 5.97727C13.968 5.97727 15.2862 6.48182 16.3226 7.47273L19.1907 4.60455C17.4589 2.99091 15.1953 2 12.4998 2C8.59075 2 5.20893 4.24091 3.56348 7.50909L6.90439 10.1C7.69075 7.73636 9.89529 5.97727 12.4998 5.97727Z"
          fill="#EA4335"
        ></path>
      </svg>
      <span>Google로 시작하기</span>
    </Wrapper>
  );
};

export default SocialButton;
