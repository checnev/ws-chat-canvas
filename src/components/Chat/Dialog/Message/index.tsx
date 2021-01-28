import React from 'react';
import cn from 'utils/cn';
import UserInfo from 'components/UserInfo';
import type { IUser } from 'lib/user/User';

import './index.scss';

export interface IMessage {
  id: number;
  author: IUser;
  text: string;
  date: Date;
}

interface MessageProps {
  message: IMessage;
  direction: 'in' | 'out';
}

class Message extends React.Component<MessageProps> {
  render() {
    const message = cn('message');
    const { author, date, text } = this.props.message;
    return (
      <div
        className={
          message({ direction: this.props.direction })
        }
      >
        <div className={message('text')}>
          {text}
        </div>
        <div className={message('author')}>
          <UserInfo user={author} />
          <span className={message('date')}>
            {date.toLocaleString().replace(',', '')}
          </span>
        </div>
      </div>
    );
  }
}

export default Message;
