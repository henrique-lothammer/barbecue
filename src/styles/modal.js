import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: #ffd836;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  z-index: 1;
  padding: 40px 0;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 590px;
`;

export const ReturnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  min-height: 25px;

  img{
    opacity:0;
    transition: .1s;

    &.active{
      opacity:1;
    }
  }
`;

export const Error = styled.span`
  color: red;
  font-weight: 700;
  display: block;
  text-align: center;
`;
