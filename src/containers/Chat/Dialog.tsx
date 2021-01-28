import React from 'react';
import { UserContext } from 'context/user';
import Dialog from 'components/Chat/Dialog';
import type { IMessage } from 'components/Chat/Dialog/Message';
import type Request from 'lib/api/Request';

interface DialogContainerState {
  messages: IMessage[];
}

class DialogContainer extends React.Component<{}, DialogContainerState> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  state = {
    messages: [],
  };

  recieveMessage = (req: Request) => {
    this.setState((state) => {
      const message = req.data;
      message.date = new Date(message.date);

      return { messages: [...state.messages, req.data] };
    });
  };

  componentDidMount() {
    this.context.api?.subscribe('chat', this.recieveMessage);
  }

  componentWillUnmount() {
    this.context.api?.unsubscribe('chat', this.recieveMessage);
  }

  render() {
    return <Dialog messages={this.state.messages} user={this.context.user!} />;
  }
}

export default DialogContainer;
