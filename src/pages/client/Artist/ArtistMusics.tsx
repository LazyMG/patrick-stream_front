import { useOutletContext } from "react-router-dom";
import { APIMusic } from "../../../shared/models/music";
import { APIArtist } from "../../../shared/models/artist";
import styled from "styled-components";
import RowList from "../../../widgets/client/RowList/RowList";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { backgroundState } from "../../../app/entities/global/atom";
import RowListSkeleton from "../../../widgets/client/RowList/RowListSkeleton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

interface IArtistOutlet {
  isLoading: boolean;
  artistData: APIArtist;
  followers: number;
  follow: boolean;
  playArtistMusics: () => void;
  followArtist: () => void;
  artistMusics: APIMusic[];
  isNotFound: boolean;
}

const ArtistMusics = () => {
  const { isLoading, artistMusics } = useOutletContext<IArtistOutlet>();

  const setBackground = useSetRecoilState(backgroundState);

  useEffect(() => {
    setBackground(null);
  }, [setBackground]);

  return (
    <Wrapper>
      {!isLoading && artistMusics && artistMusics.length !== 0 && (
        <RowList title="노래" noLimit={true} list={artistMusics} />
      )}
      {isLoading && <RowListSkeleton />}
    </Wrapper>
  );
};

export default ArtistMusics;
