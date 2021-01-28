import React from 'react';
import cn from 'utils/cn';
import Container from 'components/common/Container';
import AuthForm from 'containers/AuthForm';
import { Redirect } from 'react-router-dom';
import { UserContext } from 'context/user';
import './index.scss';

class SignInPage extends React.Component {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  render() {
    const signinPage = cn('signinPage');

    if (this.context.user) {
      return <Redirect to="/chat" />;
    }

    return (
      <div className={signinPage()}>
        <Container maxWidth="xl" alignItems="center" justifyContent="center">
          <div className={signinPage('form')}>
            <h1>Sign In</h1>
            <AuthForm />
          </div>
        </Container>
      </div>
    );
  }
}

export default SignInPage;
