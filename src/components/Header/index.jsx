import React from 'react';
import PropTypes from 'prop-types';

import { Container, Title } from './style';

const Header = ({ title }) => (
  <Container>
    <div className="container">
      <Title>{title}</Title>
    </div>
  </Container>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
