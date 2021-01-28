import React from 'react';
import cn from 'utils/cn';
import Container from 'components/common/Container';
import { GridRow, GridColumn } from 'components/common/Grid';
import AuthForm from 'containers/AuthForm';
import CanvasProvider from 'context/canvas';
import WelcomeCanvas from 'components/blocks/WelcomeCanvas';
import './index.scss';
import { UserContext } from 'context/user';

class MainPage extends React.Component {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>
  
  render() {
    const mainPage = cn('mainPage');
    return (
      <div className={mainPage()}>
        <Container maxWidth="xl">
          <GridRow>
            <GridColumn xs={12} sm={4} md={3}>
              <h1 className={mainPage('h1')}>WS Chat & Canvas</h1>
              {!this.context.user ? (
                <div className={mainPage('form')}>
                  <div className={mainPage('formTitle')}>Sign in</div>
                  <AuthForm />
                </div>
              ) : (
                <div className={mainPage('welcomeText')}>
                    Hi {this.context.user.name}
                </div>
              )}
            </GridColumn>
            <GridColumn xs={12} sm={8} md={9}>
              <CanvasProvider>
                <WelcomeCanvas />
              </CanvasProvider>
            </GridColumn>
          </GridRow>
        </Container>
      </div>
    );
  }
}

export default MainPage;
