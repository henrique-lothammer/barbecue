import React from 'react';

import logo from '../../assets/trinca-logo.svg';
import { Container } from './style';

const Footer = () => (
  <Container>
    <a href="https://www.trin.ca/" title="Trinca" target="_blank" rel="noopener noreferrer">
      <img src={logo} alt="Trinca" />
    </a>
  </Container>
);

export default Footer;
