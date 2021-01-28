import React from 'react';
import cn from 'utils/cn';
import clsx from 'clsx';
import './index.scss';
import { IUser } from 'lib/user/User';

interface UserInfoProps {
  user: IUser;
  className?: string;
}

class UserInfo extends React.Component<UserInfoProps> {

  render() {
    const userInfo = cn('userInfo');

    return (
      <div
        className={clsx(this.props.className, userInfo())}
      >
        <div
          className={userInfo('avatar')}
          style={{ backgroundColor: this.props.user.color }}
        >
          {this.props.user.name[0].toUpperCase()}
        </div>
        <span className={userInfo('username')}>{this.props.user.name}</span>
      </div>
    );
  }
}

export default UserInfo;
