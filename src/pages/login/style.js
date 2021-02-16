import styled from 'styled-components';

import bg from '../../assets/bg-header.svg';

export const LoginContent = styled.div`
  background-color: rgba(255,216,54,1);
  min-height: 100vh;


  &::before{
    content:'';
    position: absolute;
    width: 100%;
    height: 124px;
    left: 0px;
    top: 208px;
    background: url(${bg}) 0px 247px;
  }
  &::after{
    content:'';
    position: absolute;
    width: 100%;
    height: 124px;
    left: 0px;
    top: 208px;
    background: linear-gradient(0deg, #FFD836 0%, rgba(255, 216, 54, 0) 100%);
  }
`;

export const Form = styled.form`
  padding-top: 60px;
  width: 282px;
  margin: auto;
  z-index: 1;
  position: relative;
`;
