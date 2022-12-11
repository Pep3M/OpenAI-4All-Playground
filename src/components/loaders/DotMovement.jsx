import styled, { keyframes } from "styled-components";

const ellipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;
const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const MainContainer = styled.div`
  width: 80px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .dots-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .dots-ellipsis div {
    position: absolute;
    top: 53px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${(props) => props.color ?? "#fff"};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .dots-ellipsis div:nth-child(1) {
    left: 8px;
    animation: ${ellipsis1} 0.6s infinite;
  }
  .dots-ellipsis div:nth-child(2) {
    left: 8px;
    animation: ${ellipsis2} 0.6s infinite;
  }
  .dots-ellipsis div:nth-child(3) {
    left: 32px;
    animation: ${ellipsis2} 0.6s infinite;
  }
  .dots-ellipsis div:nth-child(4) {
    left: 56px;
    animation: ${ellipsis3} 0.6s infinite;
  }
`;

const DotMovement = ({ color='blue', show=true }) => {
  return (
    <MainContainer color={color} show={show}>
      <div className="dots-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </MainContainer>
  );
};

export default DotMovement;
