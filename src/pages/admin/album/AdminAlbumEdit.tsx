import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Album } from "../../../shared/models/album";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAlbumFormInput } from "../../../shared/types";

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

const AdminAlbumEdit: React.FC = () => {
  const album = useOutletContext<Album | undefined>();
  const [currentAlbum, setCurrentAlbum] = useState<IAlbumFormInput>();

  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IAlbumFormInput
  >({
    defaultValues: {
      title: album?.title,
      introduction: album?.introduction,
      released_at: album?.released_at.toDateString(),
      category: album?.category,
      coverImg: album?.coverImg,
      length: album?.length,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (album) {
      setCurrentAlbum({
        title: album?.title,
        introduction: album?.introduction,
        released_at: album?.released_at.toDateString(),
        category: album.category,
        coverImg: album.coverImg,
        length: album.length,
      });
    }
  }, [album]);

  const onSubmit: SubmitHandler<IAlbumFormInput> = (event) => {
    if (!currentAlbum) return;

    (Object.keys(event) as (keyof IAlbumFormInput)[]).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, currentAlbum[key]);
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
            <label>곡 수: </label>
            <input type="number" {...register("length")} />
          </InputRow>
          <InputRow>
            <label>소개: </label>
            <input type="text" {...register("introduction")} />
          </InputRow>
          <InputRow>
            <label>발매 일자: </label>
            <input type="text" {...register("released_at")} />
          </InputRow>
          <InputRow>
            <label>카테고리: </label>
            <input type="text" {...register("category")} />
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

export default AdminAlbumEdit;
