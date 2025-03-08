import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";

const ButtonSection = styled.div`
  display: flex;
  gap: 26px;
`;

const MoreButton = styled(DefaultButton)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.black};

  border: 1.5px solid ${(props) => props.theme.border.gray};

  color: ${(props) =>
    props.$isActive
      ? props.theme.color.active_white
      : props.theme.color.deactive_white};

  ${(props) =>
    props.$isActive &&
    `&:hover {
    background-color: ${props.theme.border.gray};
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

  background-color: ${(props) => props.theme.color.black};

  &:focus {
    outline: none;
  }

  width: 35px;
  height: 35px;

  align-items: center;
  justify-content: center;

  border: 1.5px solid ${(props) =>
    props.$isAbled
      ? props.theme.border.gray
      : props.theme.color.deactive_white};

  color: ${(props) =>
    props.$isAbled
      ? props.theme.color.active_white
      : props.theme.color.deactive_white};

  ${(props) =>
    !props.$isAbled &&
    `&:hover {
    background-color: ${props.theme.border.gray};
  }`}

  cursor:${(props) => (props.$isAbled ? `default` : "pointer")};

  svg {
    color: ${(props) => props.theme.color.white};
    fill: ${(props) =>
      !props.$isAbled
        ? props.theme.color.active_white
        : props.theme.color.deactive_white};
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
          if (isActive) onClick();
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
