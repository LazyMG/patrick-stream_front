import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Music } from "../../../shared/models/music";
import { SubmitHandler, useForm } from "react-hook-form";
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

const AdminMusicEdit: React.FC = () => {
  const music = useOutletContext<Music | undefined>();
  const [currentMusic, setCurrentMusic] = useState<IMusicFormInput>();
  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IMusicFormInput
  >({
    defaultValues: {
      title: music?.title,
      duration: music?.duration,
      ytId: music?.ytId,
      released_at: music?.released_at,
      genre: music?.genre.toString(),
      coverImg: music?.coverImg,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (music) {
      setCurrentMusic({
        title: music.title,
        duration: music.duration,
        ytId: music.ytId,
        released_at: music.released_at,
        genre: music.genre.toString(),
        coverImg: music.coverImg,
      });
    }
  }, [music]);

  const onSubmit: SubmitHandler<IMusicFormInput> = (event) => {
    if (!currentMusic) return;

    (Object.keys(event) as (keyof IMusicFormInput)[]).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, currentMusic[key]);
      }
    });

    // // 데이터 보내기
    // const data = getValues();
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

export default AdminMusicEdit;
