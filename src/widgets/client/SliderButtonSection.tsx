import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";

const ButtonSection = styled.div`
  display: flex;
  gap: 26px;
`;

const MoreButton = styled(DefaultButton)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  background-color: black;

  border: 1px solid #2c2c2c;

  color: ${(props) => (props.$isActive ? `#fefefe` : "#515151")};

  ${(props) =>
    props.$isActive &&
    `&:hover {
    background-color: #2c2c2c;
  }`}

  cursor:${(props) => (props.$isActive ? `pointer` : `auto`)};
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

  &:focus {
    outline: none;
  }

  width: 35px;
  height: 35px;

  align-items: center;
  justify-content: center;

  border: 1px solid ${(props) => (props.$isAbled ? `#2c2c2c` : "#515151")};

  color: ${(props) => (props.$isAbled ? ` #fefefe` : "#515151")};

  ${(props) =>
    !props.$isAbled &&
    `&:hover {
    background-color: #2c2c2c;
  }`}

  cursor:${(props) => (props.$isAbled ? `default` : "pointer")};

  svg {
    color: #fff;
    fill: ${(props) => (!props.$isAbled ? ` #fefefe` : "#515151")};
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
  isActive: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const SliderButtonSection = ({
  isBeginning,
  isEnd,
  goPrev,
  goNext,
  isActive,
  buttonText,
  onClick,
}: ISliderButtonSection) => {
  return (
    <ButtonSection>
      <MoreButton
        onClick={() => {
          if (!onClick) return;
          onClick();
        }}
        $isActive={isActive}
      >
        {buttonText || "더보기"}
      </MoreButton>
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
