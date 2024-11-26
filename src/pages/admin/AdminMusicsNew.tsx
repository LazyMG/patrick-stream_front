import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

interface IFormInput {
  title: string;
  duration: number;
  ytId: string;
  released_at: string;
  genre: string;
  coverImg: string;
}

const AdminMusicsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = () => {
    // 데이터 보내기
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

  return (
    <ContentContainer>
      <Content>
        <EditForm>
          <InputRow>
            <label>제목: </label>
            <input
              type="text"
              {...register("title", {
                required: true,
              })}
            />
          </InputRow>
          <InputRow>
            <label>재생시간: </label>
            <input
              type="number"
              {...register("duration", {
                required: true,
              })}
            />
          </InputRow>
          <InputRow>
            <label>유튜브 아이디: </label>
            <input
              type="text"
              {...register("ytId", {
                required: true,
              })}
            />
          </InputRow>
          <InputRow>
            <label>발매일자: </label>
            <input
              type="text"
              {...register("released_at", {
                required: true,
              })}
            />
          </InputRow>
          <InputRow>
            <label>장르: </label>
            <input
              type="text"
              {...register("genre", {
                required: true,
              })}
            />
          </InputRow>
          <InputRow>
            <label>이미지: </label>
            <input
              type="text"
              {...register("coverImg", {
                required: true,
              })}
            />
          </InputRow>
        </EditForm>
      </Content>
      <ContentFooter>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        <button onClick={submitForm}>저장하기</button>
      </ContentFooter>
    </ContentContainer>
  );
};

export default AdminMusicsNew;
