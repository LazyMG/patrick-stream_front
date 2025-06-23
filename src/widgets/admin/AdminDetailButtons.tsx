import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background-color: black;
  color: white;
  border-radius: 15px;
  padding: 4px 8px;

  cursor: pointer;
`;

interface IAdminDetailButton {
  firstButtonConfig: {
    modalOpen: () => void;
    buttonText: string;
  };
  secondButtonConfig: {
    modalOpen: () => void;
    buttonText: string;
  };
  path: string;
  deleteFunc: () => void;
}

const AdminDetailButtons = ({
  firstButtonConfig,
  secondButtonConfig,
  path,
  deleteFunc,
}: IAdminDetailButton) => {
  const navigate = useNavigate();

  const gotoEditPage = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    navigate("/admin" + url + "/settings");
  };

  return (
    <>
      <Button onClick={firstButtonConfig.modalOpen}>
        {firstButtonConfig.buttonText}
      </Button>
      <Button onClick={secondButtonConfig.modalOpen}>
        {secondButtonConfig.buttonText}
      </Button>
      <Button onClick={(event) => gotoEditPage(event, path)}>수정하기</Button>
      <Button onClick={deleteFunc}>삭제하기</Button>
    </>
  );
};

export default AdminDetailButtons;
