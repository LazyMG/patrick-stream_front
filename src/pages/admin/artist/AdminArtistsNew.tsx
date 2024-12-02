import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AdminUploadForm from "../../../widgets/admin/AdminUploadForm";
import { IArtistFormInput } from "../../../shared/types";

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

const AdminArtistsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IArtistFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IArtistFormInput> = (event) => {
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

  const artistFields = [
    { name: "artistname", label: "이름", type: "text", tag: "input" },
    { name: "introduction", label: "소개", type: "text", tag: "textarea" },
    { name: "debut_at", label: "데뷔 일자", type: "text", tag: "input" },
    { name: "country", label: "국가", type: "text", tag: "input" },
    { name: "coverImg", label: "이미지", type: "text", tag: "input" },
  ] as const;

  return (
    <ContentContainer>
      <Content>
        <AdminUploadForm<IArtistFormInput>
          register={register}
          fields={artistFields}
        />
      </Content>
      <ContentFooter>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        <button onClick={submitForm}>저장하기</button>
      </ContentFooter>
    </ContentContainer>
  );
};

export default AdminArtistsNew;
