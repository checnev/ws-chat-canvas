import React from 'react';
import cn from 'utils/cn';
import clsx from 'clsx';
import UserInfo from 'components/UserInfo';
import './index.scss';
import type { IUser } from 'lib/user/User';

interface UserListProps {
  users: IUser[];
  className?: string;
}

class UserList extends React.Component<UserListProps> {
  render() {
    const userList = cn('userList');

    return (
      <ul className={clsx(this.props.className, userList())}>
        {this.props.users.map((user) => (
          <li key={user.name}>
            <UserInfo user={user} />
          </li>
        ))}
      </ul>
    );
  }
}

export default UserList;
