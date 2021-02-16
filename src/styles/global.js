import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 62.5%;
  }

  body {
    background: #fafafa;
    color: #000;
    font-size: 1.6rem;
    font-family: 'Raleway', sans-serif;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  #root{
    height: 100%;
    min-height: 100vh;
    position: relative;
  }

  .container{
    width: 90%;
    max-width: 590px;
    margin: auto;
  }

  main{
    padding-bottom: 200px;
  }

  @media (max-width: 768px) {
        html {
            font-size: 62.5%;
        }
    }

    @media (max-width: 550px) {
        html {
            font-size: 55%;
        }
    }

    @media (max-width: 425px) {
        html {
            font-size: 45%;
        }
    }
`;
