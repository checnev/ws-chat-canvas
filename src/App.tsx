import React from 'react';
import UserProvider from 'context/user';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from 'containers/PrivateRoute';
import './App.scss';
import 'fontsource-roboto';

import Layout from 'components/blocks/Layout';
import ChatPage from 'components/pages/Chat';
import CanvasPage from 'components/pages/Canvas';
import MainPage from 'components/pages/Main';
import SignInPage from 'components/pages/SignIn';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <UserProvider>
          <Router>
              <Switch>
                <Route exact path="/">
                  <Layout>
                    <MainPage />
                  </Layout>
                </Route>
                <PrivateRoute exact path="/chat">
                    <Layout fixed>
                      <ChatPage />
                    </Layout>
                </PrivateRoute>
                <PrivateRoute exact path="/canvas">
                    <Layout fixed>
                      <CanvasPage />
                    </Layout>
                </PrivateRoute>
                <Route exact path="/signin">
                  <Layout>
                    <SignInPage />
                  </Layout>
                </Route>
                <Route path="*">
                  404
                </Route>
              </Switch>
          </Router>
        </UserProvider>
      </div>
    );
  }
}

export default App;
