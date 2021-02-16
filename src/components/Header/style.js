import styled from 'styled-components';

import bg from '../../assets/bg-header.svg';

export const Container = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 208px;
  background: url(${bg}) 0px 0px #ffd836;
  margin-bottom: -60px;
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: 3.2rem;
  text-align: center;
  margin-bottom: 50px;
`;
