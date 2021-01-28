import React from 'react';
import WSApi from 'lib/api/WSApi';
import User, { IUser } from 'lib/user/User';
import type Request from 'lib/api/Request';

interface IUserContext {
  user: User | null;
  api: WSApi | null;
  signin: (user: IUser) => any;
}

export const UserContext = React.createContext<IUserContext>({
  user: null,
  api: null,
  signin: () => {},
});
UserContext.displayName = 'User';

class UserProvider extends React.Component<{}, IUserContext> {

  signin = (user: IUser) => {

    const api = WSApi.getInstance();

    api.ws.addEventListener('open', () => {
      api.once('signin', (req: Request) => {
        const { id, name, color } = req.data;
        const user = new User(id, name, color);

        this.setState({
          user,
          api,
        });
      });

      api.send('signin', user);
    });
  };


  state = {
    user: null,
    api: null,
    signin: this.signin,
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
