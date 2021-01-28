import React from 'react';
import UserList from 'components/UserList';
import { UserContext } from 'context/user';
import UserService from 'services/UserService';
import type { IUser } from 'lib/user/User';
import type Request from 'lib/api/Request';

interface UserOnlineListState {
  users: IUser[];
}

class UserOnlineList extends React.Component<{}, UserOnlineListState> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  state = {
    users: [],
  };

  join = (req: Request) => {
    const user: IUser = req.data;

    this.setState((state) => ({
      users: [...state.users, user]
    }));
  };

  leave = (req: Request) => {
    const leaveUser: IUser = req.data;
    this.setState((state) => {
      const leaveUserIndex = state.users.findIndex((user) => user.id === leaveUser.id);

      if (leaveUserIndex !== -1) {
        state.users.splice(leaveUserIndex, 1);
        return {
          users: [...state.users]
        };
      }
    });
  };

  componentDidMount() {
    UserService.getAll().then((users) => {
      this.setState({ users });
    });

    this.context.api?.subscribe('join', this.join);
    this.context.api?.subscribe('leave', this.leave);
  }

  componentWillUnmount() {
    this.context.api?.unsubscribe('join', this.join);
    this.context.api?.unsubscribe('leave', this.leave);
  }

  render() {
    return <UserList users={this.state.users} />
  }
}

export default UserOnlineList;
