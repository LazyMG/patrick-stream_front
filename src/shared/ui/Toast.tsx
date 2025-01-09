import styled from "styled-components";

const Wrapper = styled.div`
  justify-self: center;
  width: 300px;
  height: 70px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  background-color: #212121;
`;

const ContentHeader = styled.div`
  position: absolute;
  top: 7px;
  left: 7px;

  div {
    width: 30px;
    height: 30px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:hover {
      background-color: #f5a3a5;
    }

    svg {
      width: 20px;
      color: #fff;
    }
  }
`;

const Content = styled.div`
  padding: 10px 15px;
  font-size: 13px;
`;

const Text = styled.span`
  color: #fff;
`;

const ConfirmButton = styled.button`
  background: none;
  border: none;

  position: absolute;
  bottom: 7px;
  right: 15px;

  color: #fff;

  border-radius: 15px;
  padding: 3px 6px;

  cursor: pointer;

  &:hover {
    background-color: #f5a3a5;
  }
`;

const Toast = ({
  text,
  clickHandler,
  closeToast,
}: {
  text: string;
  clickHandler?: () => void;
  closeToast: () => void;
}) => {
  const onClick = () => {
    if (clickHandler) {
      clickHandler();
    }
  };
  return (
    <Wrapper>
      <ContentHeader>
        <div onClick={closeToast}>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            />
          </svg>
        </div>
      </ContentHeader>
      <Content>
        <Text>{text}</Text>
      </Content>
      {clickHandler && <ConfirmButton onClick={onClick}>삭제</ConfirmButton>}
    </Wrapper>
  );
};

export default Toast;
