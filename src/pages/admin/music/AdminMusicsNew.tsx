import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminUploadForm from "../../../widgets/admin/AdminUploadForm";
import { IMusicFormInput } from "../../../shared/types";

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

const ContentFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AdminMusicsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IMusicFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IMusicFormInput> = (event) => {
    // 데이터 보내기
    console.log(event);
  };

  const submitForm = async () => {
    //validate
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      console.log("error");
    }
  };

  const musicFields = [
    { name: "title", label: "제목", type: "text", tag: "input" },
    { name: "duration", label: "재생시간", type: "number", tag: "input" },
    { name: "ytId", label: "유튜브 아이디", type: "text", tag: "input" },
    { name: "released_at", label: "발매일자", type: "text", tag: "input" },
    { name: "genre", label: "장르", type: "text", tag: "input" },
    { name: "coverImg", label: "이미지", type: "text", tag: "input" },
  ] as const;

  return (
    <ContentContainer>
      <Content>
        <AdminUploadForm<IMusicFormInput>
          register={register}
          fields={musicFields}
        />
      </Content>
      <ContentFooter>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        <button onClick={submitForm}>저장하기</button>
      </ContentFooter>
    </ContentContainer>
  );
};

export default AdminMusicsNew;
