import React from 'react';
import cn from 'utils/cn';
import Container from 'components/common/Container';
import './index.scss';

class NotFound extends React.Component {
  render() {
    const notFoundPage = cn('notFoundPage');

    return (
      <div className={notFoundPage()}>
        <Container maxWidth="xl" justifyContent="center" alignItems="center">
          <h1>Page Not Found</h1>
        </Container>
      </div>
    );
  }
}

export default NotFound;
