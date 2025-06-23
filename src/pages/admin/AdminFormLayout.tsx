import { ReactNode } from "react";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 20%;
  gap: 30px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  border: none;
  background-color: black;
  color: white;
  border-radius: 15px;
  padding: 4px 8px;

  cursor: pointer;
`;

interface IAdminFormLayout {
  children: ReactNode;
  backFunc: () => void;
  submitForm: () => Promise<void>;
}

const AdminFormLayout = ({
  children,
  backFunc,
  submitForm,
}: IAdminFormLayout) => {
  return (
    <ContentContainer>
      <Content>{children}</Content>
      <ContentFooter>
        <Button onClick={backFunc}>돌아가기</Button>
        <Button onClick={submitForm}>저장하기</Button>
      </ContentFooter>
    </ContentContainer>
  );
};

export default AdminFormLayout;
