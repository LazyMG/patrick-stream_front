import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Music } from "../../shared/models/music";
import { SubmitHandler, useForm } from "react-hook-form";

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

const AdminMusicsEdit: React.FC = () => {
  const music = useOutletContext<Music | undefined>();
  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IFormInput
  >();

  const navigate = useNavigate();

  useEffect(() => {
    if (music) {
      setValue("title", music.title);
      setValue("duration", music?.duration),
        setValue("ytId", music?.ytId),
        setValue("released_at", music?.released_at),
        setValue("genre", music?.genre.toString()),
        setValue("coverImg", music?.coverImg);
    }
  }, [setValue, music]);

  const onSubmit: SubmitHandler<IFormInput> = (event) => {
    if (!music) return;

    // 수정 필요
    Object.keys(event).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, music[key]);
      }
    });

    // 수정 필요
    (Object.keys(event) as (keyof IFormInput)[]).forEach((key) => {
      if (event[key] === "") {
        const value = key === "genre" ? music[key].join(", ") : music[key];

        // event[key]를 명확하게 처리
        (event as Record<keyof IFormInput, string | number | string[]>)[
          key
        ] = value;
      }
    });
  };

  const submitForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <ContentContainer>
      <Content>
        <EditForm>
          <InputRow>
            <label>제목: </label>
            <input type="text" {...register("title")} />
          </InputRow>
          <InputRow>
            <label>재생시간: </label>
            <input type="number" {...register("duration")} />
          </InputRow>
          <InputRow>
            <label>유튜브 아이디: </label>
            <input type="text" {...register("ytId")} />
          </InputRow>
          <InputRow>
            <label>발매일자: </label>
            <input type="text" {...register("released_at")} />
          </InputRow>
          <InputRow>
            <label>장르: </label>
            <input type="text" {...register("genre")} />
          </InputRow>
          <InputRow>
            <label>이미지: </label>
            <input type="text" {...register("coverImg")} />
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

export default AdminMusicsEdit;
