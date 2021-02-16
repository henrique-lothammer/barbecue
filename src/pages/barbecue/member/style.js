import styled, { css } from 'styled-components';

export const MemberContainer = styled.li`
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

export const MemberName = styled.button`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.5rem;
  color: rgba(0, 0, 0, 0.8);
  border: none;
  background: none;
  transition: 0.2s;
  text-align: left;

  &:hover{
    color: rgba(0,0,0,0.6);
  }
`;

export const MemberBudget = styled.button`
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 2.1rem;
  line-height: 2.5rem;
  color: rgba(0, 0, 0, 0.8);
  border: none;
  background: none;
  transition: 0.2s;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &:hover{
    color: rgba(0,0,0,0.6);
  }
`;

export const PayToggle = styled.button`
  cursor: pointer;
  border: 3px solid #998220;
  width: 25px;
  min-width: 25px;
  height: 25px;
  min-height: 25px;
  border-radius: 50%;
  margin: 0 19px 0 10px;
  transition: 0.2s;

  &:hover{
    border-color: rgba(0,0,0,0.6);
  }

  @media (max-width: 425px) {
    margin: 0 4px 0 0;
  }

  ${(props) => props.paid && css`
    background: #FFD836;
    border: 3px solid #FFD836;
  `}


`;

export const Error = styled.span`
  color: red;
  padding-right: 10px;
`;
