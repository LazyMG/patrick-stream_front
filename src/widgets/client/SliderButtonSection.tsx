import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";

const ButtonSection = styled.div`
  display: flex;
  gap: 26px;
`;

const MoreButton = styled(DefaultButton)`
  display: flex;
  align-items: center;
  background-color: black;
  color: #fff;
  border: 0.5px solid #2c2c2c;

  &:hover {
    background-color: #2c2c2c;
  }
`;

const ControlSection = styled.div`
  display: flex;
  gap: 12px;
`;

const MoveButton = styled.button<{ $isAbled: boolean }>`
  border: 0;
  box-sizing: border-box;
  display: flex;
  border-radius: 50%;

  background-color: black;

  border: 0.5px solid #2c2c2c;

  &:focus {
    outline: none;
  }

  width: 35px;
  height: 35px;

  align-items: center;
  justify-content: center;

  color: #fff;

  cursor: pointer;

  ${(props) =>
    props.$isAbled
      ? `cursor: default; opacity:0.2;`
      : `&:hover {
      background-color: #2c2c2c;
    }`}

  svg {
    color: #fff;
    /* fill: currentColor; */
    fill: #fff;
    width: 18px;
    height: 18px;
    display: block;
  }
`;

interface ISliderButtonSection {
  isBeginning: boolean;
  isEnd: boolean;
  goPrev: () => void;
  goNext: () => void;
}

const SliderButtonSection = ({
  isBeginning,
  isEnd,
  goPrev,
  goNext,
}: ISliderButtonSection) => {
  return (
    <ButtonSection>
      <MoreButton>더보기</MoreButton>
      <ControlSection>
        <MoveButton
          disabled={isBeginning}
          onClick={goPrev}
          $isAbled={isBeginning}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            />
          </svg>
        </MoveButton>
        <MoveButton disabled={isEnd} onClick={goNext} $isAbled={isEnd}>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            />
          </svg>
        </MoveButton>
      </ControlSection>
    </ButtonSection>
  );
};

export default SliderButtonSection;
