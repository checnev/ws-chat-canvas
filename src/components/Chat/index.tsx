import React from 'react';
import cn from 'utils/cn';
import { GridRow, GridColumn } from 'components/common/Grid';
import { Dialog, Form } from 'containers/Chat';
import './index.scss';


class Chat extends React.Component {
  render() {
    const chat = cn('chat');
    return (
      <div className={chat()}>
        <GridRow>
          <GridColumn xs={12}>
            <Dialog />
            <Form />
          </GridColumn>
        </GridRow>
      </div>
    );
  }
}

export default Chat;
