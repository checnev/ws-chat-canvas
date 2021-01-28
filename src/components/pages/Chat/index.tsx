import React from 'react';
import cn from 'utils/cn';
import Container from 'components/common/Container';
import { GridRow, GridColumn } from 'components/common/Grid';
import Chat from 'components/Chat'
import OnlineUserList from 'containers/OnlineUserList';
import './index.scss';

class ChatPage extends React.Component {
  
  render() {
    const chatPage = cn('chatPage');
    return (
      <div className={chatPage()}>
        <Container maxWidth="xl">
          <GridRow>
            <GridColumn xs={12} sm={9}>
              <Chat />
            </GridColumn>
            <GridColumn xs={12} sm={3}>
              <div className={chatPage('online')}>
                <OnlineUserList />
              </div>
            </GridColumn>
          </GridRow>
        </Container>
      </div>
    );
  }
}

export default ChatPage;
