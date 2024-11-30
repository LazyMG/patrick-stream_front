import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist } from "../../../shared/models/artist";
import { IArtistFormInput } from "../../../shared/types";
import { SubmitHandler, useForm } from "react-hook-form";
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

const AdminArtistsEdit: React.FC = () => {
  const artist = useOutletContext<Artist | undefined>();
  const [currentArtist, setCurrentArtist] = useState<IArtistFormInput>();
  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IArtistFormInput
  >({
    defaultValues: {
      artistname: artist?.artistname,
      introduction: artist?.introduction,
      debut_at: artist?.debut_at.toDateString(),
      country: artist?.country,
      coverImg: artist?.coverImg,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (artist) {
      setCurrentArtist({
        artistname: artist?.artistname,
        introduction: artist?.introduction,
        debut_at: artist?.debut_at.toDateString(),
        country: artist?.country,
        coverImg: artist?.coverImg,
      });
    }
  }, [artist]);

  const onSubmit: SubmitHandler<IArtistFormInput> = (event) => {
    if (!currentArtist) return;

    (Object.keys(event) as (keyof IArtistFormInput)[]).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, currentArtist[key]);
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
            <label>이름: </label>
            <input type="text" {...register("artistname")} />
          </InputRow>
          <InputRow>
            <label>소개: </label>
            <input type="text" {...register("introduction")} />
          </InputRow>
          <InputRow>
            <label>데뷔 일자: </label>
            <input type="text" {...register("debut_at")} />
          </InputRow>
          <InputRow>
            <label>국가: </label>
            <input type="text" {...register("country")} />
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

export default AdminArtistsEdit;
