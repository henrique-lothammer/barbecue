import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const ButtonLink = styled(Link)`
  font-family: 'Raleway', sans-serif;
  border-radius: 18px;
  background: #000;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 14px 20px;
  color: #FFF;
  width: 100%;
  border: none;
  margin: 10px 0 0;
  text-decoration: none;
  display: block;
  text-align: center;
  transition: 0.2s;

  &:hover{
    background: rgba(0,0,0,0.9);
  }
`;

export const Button = styled.button`
  font-family: 'Raleway', sans-serif;
  border-radius: 18px;
  background: #000;
  font-size: 1.8rem;
  font-weight: 700;
  padding: 14px 20px;
  color: #FFF;
  width: 100%;
  border: none;
  margin: 10px 0 0;
  transition: 0.2s;

  &:hover{
    background: rgba(0,0,0,0.9);
  }

  &:disabled{
    background: rgba(0,0,0,0.9);
  }

  ${(props) => props.isLogin && css`
    margin: 50px 0 10px;
  `}
`;

export const Label = styled.label`
  display:block;
  font-weight: 700;
  font-family: 'Raleway', sans-serif;
  font-size: 2.1rem;
  line-height: 3.1rem;
  color: rgba(0,0,0,0.8);
  width: 100%;
  padding: 8px 0 4px;

  ${(props) => props.isLogin && css`
    padding: 16px 0;
  `}
`;

export const Input = styled.input`
  padding: 20px 14px;
  background-color: #FFF;
  border-radius: 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2rem;
  color: rgba(0,0,0,0.8);
  border: none;
  width: 100%;
  margin-bottom: 0px;

  ${(props) => props.isLogin && css`
    margin-bottom: 18px;
  `}

  &::placeholder{
    font-style: italic;
    color: rgba(0,0,0,0.8);
  }
`;

export const TextArea = styled.textarea`
  padding: 20px 14px;
  background-color: #FFF;
  border-radius: 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2rem;
  color: rgba(0,0,0,0.8);
  border: none;
  width: 100%;
  resize: none;
  margin-bottom: 0px;

  ${(props) => props.isLogin && css`
    margin-bottom: 18px;
  `}

  &::placeholder{
    font-style: italic;
    color: rgba(0,0,0,0.8);
  }
`;

export const Select = styled.select`
  padding: 20px 14px;
  background-color: #FFF;
  border-radius: 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 2rem;
  color: rgba(0,0,0,0.8);
  border: none;
  width: 100%;
  margin-bottom: 0px;
`;
