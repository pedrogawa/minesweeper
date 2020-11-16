import React from 'react';

import { Container } from './styles';

interface INumberDisplayProps {
  value: number;
}

const NumberDisplay: React.FC<INumberDisplayProps> = ({ value }) => {
  return (
    <Container>
      <h1>
        {value < 0
          ? `-${Math.abs(value).toString().padStart(2, '0')}`
          : value.toString().padStart(3, '0')}
      </h1>
    </Container>
  );
};

export default NumberDisplay;
