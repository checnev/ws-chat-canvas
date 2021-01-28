import React from 'react';
import cn from 'utils/cn';
import Container from 'components/common/Container';
import './index.scss';

class Footer extends React.PureComponent {
  render() {
    const footer = cn('footer');

    return (
      <div className={footer()}>
        <Container
          maxWidth="xl"
          justifyContent="flex-end"
        >
          WS Chat & Canvas {new Date().getFullYear()}.
        </Container>      
      </div>
    );
  }
}

export default Footer;
