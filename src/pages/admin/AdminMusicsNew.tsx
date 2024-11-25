import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 20%;
  gap: 20px;
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

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
`;

const ContentFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AdminMusicsNew: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer>
      <Content>
        <EditForm>
          <InputRow>
            <label>제목: </label>
            <input type="text" />
          </InputRow>
          <InputRow>
            <label>재생시간: </label>
            <input type="number" />
          </InputRow>
          <InputRow>
            <label>유튜브 아이디: </label>
            <input type="text" />
          </InputRow>
          <InputRow>
            <label>발매일자: </label>
            <input type="text" />
          </InputRow>
          <InputRow>
            <label>장르: </label>
            <input type="text" />
          </InputRow>
          <InputRow>
            <label>이미지: </label>
            <input type="text" />
          </InputRow>
        </EditForm>
      </Content>
      <ContentFooter>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        <button>저장하기</button>
      </ContentFooter>
    </ContentContainer>
  );
};

export default AdminMusicsNew;
