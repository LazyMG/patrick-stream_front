import { ChangeEvent } from "react";
import styled from "styled-components";

interface PlayBarTimelineProps {
  value: number;
  min: number;
  max: number;
  showThumb?: boolean; // 선택적 프로퍼티
}

const Wrapper = styled.input<PlayBarTimelineProps>`
  -webkit-appearance: none;
  position: absolute;
  top: -2px;
  left: -2px;
  width: 100%;
  height: 3px;

  background: ${(props) => {
    const percentage =
      ((props.value - props.min) / (props.max - props.min)) * 100;
    return `
      linear-gradient(to right, 
        #D2DC23 ${percentage}%, 
        gray ${percentage}%)
    `;
  }};
  transition: height 0.2s ease;

  &:hover {
    height: 4px;
    &::-webkit-slider-thumb {
      width: 15px;
      height: 15px;
    }
    &::-moz-range-thumb {
      width: 15px;
      height: 15px;
    }
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${(props) => (props.showThumb ? "12px" : "0")};
    height: ${(props) => (props.showThumb ? "12px" : "0")};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #d2dc23;
    cursor: pointer;
    transition: width 0.2s ease, height 0.2s ease;
  }

  &::-moz-range-thumb {
    width: ${(props) => (props.showThumb ? "12px" : "0")};
    height: ${(props) => (props.showThumb ? "12px" : "0")};
    border-radius: 50%;
    background: #d2dc23;
    width: 12px;
    height: 12px;
    cursor: pointer;
    transition: width 0.2s ease, height 0.2s ease;
  }

  cursor: pointer;
`;
const PlayBarTimeline = ({
  timeline,
  currentDuration,
  timelineChange,
}: {
  timeline: number;
  currentDuration: undefined | number;
  timelineChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Wrapper
      type="range"
      value={timeline}
      min={0}
      max={currentDuration || 0}
      onChange={timelineChange}
    />
  );
};

export default PlayBarTimeline;
