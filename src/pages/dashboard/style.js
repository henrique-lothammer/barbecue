import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const BarbecuesWrapper = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  grid-gap: 25px;
  opacity: 1;
  pointer-events: auto;

  ${(props) => props.isLoading && css`
    opacity: 0.5;
    pointer-events: none;
  `}

  @media (max-width: 425px) {
    grid-template-columns: 1fr;
  }
`;

export const Barbecue = styled.article`
  padding: 25px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  min-height: 192px;
  border: 2px solid #F1F1F1;
  transition: 0.3s;

  &:hover{
    box-shadow: 0px 0px 16px rgb(0 0 0 / 40%);
  }
`;

export const AddBarbecue = styled.article`
  padding: 25px;
  background: #F1F1F1;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
  border: 2px solid #F1F1F1;
  min-height: 192px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover{
    box-shadow: 0px 0px 16px rgb(0 0 0 / 40%);
  }

  h1{
    padding-top: 8px;
    font-size: 2.1rem;
    line-height: 2.5rem;
    font-weight: 700;
  }
`;

export const LinkContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  height: 100%;

  .event{
    padding-bottom: 48px;
    .date{
      display: block;
      font-weight: 800;
      color: #000;
      font-size: 2.8rem;
      line-height: 3.3rem;
    }
    .title{
      display: block;
      font-weight: 700;
      font-size: 2.1rem;
      line-height: 2.5rem;
      color: rgba(0, 0, 0, 0.8);
    }
  }
  .stats{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .members{
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 2.1rem;
      line-height: 2.5rem;
      color: #000;
    }
    .budget{
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 2.1rem;
      line-height: 2.5rem;
      color: #000;
    }
    img{
      padding-right: 10px;
    }
  }
`;

export const Error = styled.span`
  padding: 25px;
  background: #FFFFFF;
  color: red;
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: 700;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
`;
