import React from 'react';
import WSApi from 'lib/api/WSApi';
import User, { IUser } from 'lib/user/User';
import type Request from 'lib/api/Request';

interface IUserContext {
  user: User | null;
  api: WSApi | null;
  isFetching: boolean;
  signin: (user: IUser) => any;
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  api: null,
  isFetching: false,
  signin: () => {},
});
UserContext.displayName = 'User';

class UserProvider extends React.Component<{}, Omit<IUserContext, 'signin'>> {

  signin = (user: IUser) => {
    this.setState({ isFetching: true });

    const api = WSApi.getInstance();
    api.ws.addEventListener('open', () => {
      api.once('signin', (req: Request) => {
        const { id, name, color } = req.data;
        const user = new User(id, name, color);

        this.setState({
          user,
          api,
          isFetching: false,
        });
      });

      api.send('signin', user);
    });

    api.ws.addEventListener('close', () => {
      this.setState({
        user: null,
        api: null,
        isFetching: false,
      });
    });
  };


  state = {
    user: null,
    api: null,
    isFetching: false,
  }

  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        signin: this.signin,
      }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
