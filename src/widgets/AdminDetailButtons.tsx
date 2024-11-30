import { useNavigate } from "react-router-dom";

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
      <button onClick={firstButtonConfig.modalOpen}>
        {firstButtonConfig.buttonText}
      </button>
      <button onClick={secondButtonConfig.modalOpen}>
        {secondButtonConfig.buttonText}
      </button>
      <button onClick={(event) => gotoEditPage(event, path)}>수정하기</button>
      <button onClick={deleteFunc}>삭제하기</button>
    </>
  );
};

export default AdminDetailButtons;
