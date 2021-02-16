import styled, { css } from 'styled-components';

export const BarbecueContainer = styled.article`
  background-color: rgb(255, 255, 255);
  padding: 25px;
  pointer-events: auto;
  opacity: 1;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  border-radius: 2px;

  ${(props) => props.isLoading && css`
    opacity: 0.5;
    pointer-events: none;
  `}

  .details{
    display: flex;
    justify-content: space-between;

    .event{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .date{
        display: block;
        font-weight: 800;
        color: #000;
        font-size: 2.8rem;
        line-height: 3.3rem;
      }
      .title{
        padding-top: 5px;
        display: block;
        font-weight: 700;
        font-size: 3.6rem;
        line-height: 4.2rem;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .stats{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 6px 0;
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
  }
  .text{
    padding: 15px 0 40px;
    p{
      padding: 20px 0 0;
    }
  }

`;

export const MembersContainer = styled.ul`
  pointer-events: auto;
  opacity: 1;
  list-style-type: none;
  padding-bottom: 25px;

  ${(props) => props.isLoading && css`
    opacity: 0.5;
    pointer-events: none;
  `}
`;

export const DrinkTitleContainer = styled.li`
  padding: 10px 0;
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.5rem;
  color: rgba(0, 0, 0, 0.8);

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #E5C231;

  .left{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Error = styled.span`
  padding: 25px;
  background: #FFFFFF;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  border-radius: 2px;
`;
