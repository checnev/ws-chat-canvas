import React from 'react';
import cn from 'utils/cn';
import Message, { IMessage } from './Message';
import './index.scss';
import type User from 'lib/user/User';

interface DialogProps {
  messages: IMessage[];
  user: User;
}

class Dialog extends React.Component<DialogProps> {
  messagesRef = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    const messages = this.messagesRef.current;

    messages?.scrollBy({
      top: messages.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const dialog = cn('dialog');

    return (
      <div className={dialog()}>
        <div className={dialog('window')}>
          <div className={dialog('messages')} ref={this.messagesRef}>
            {this.props.messages.map((message) => (
              <Message
                key={message.id}
                direction={message.author.id === this.props.user.id ? 'out' : 'in'}
                message={message}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;
