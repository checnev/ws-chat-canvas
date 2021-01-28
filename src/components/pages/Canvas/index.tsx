import React from 'react';
import cn from 'utils/cn';
import Container from 'components/common/Container';
import { GridRow, GridColumn } from 'components/common/Grid';
import OnlineUserList from 'containers/OnlineUserList';
import CanvasProvider from 'context/canvas';
import PublicCanvas from 'containers/PublicCanvas';
import { CanvasContext } from 'context/canvas';
import { UserContext } from 'context/user';
import './index.scss';

class CanvasPage extends React.Component {
  render() {
    const canvasPage = cn('canvasPage');

    return (
      <div className={canvasPage()}>
        <Container maxWidth="xl">
          <GridRow>
            <GridColumn xs={12} sm={9}>
              <CanvasProvider>
                <UserContext.Consumer>
                  {user => (
                    <CanvasContext.Consumer>
                      {canvas => (
                        <PublicCanvas user={user} canvas={canvas} />
                      )}
                    </CanvasContext.Consumer>
                  )}
                </UserContext.Consumer>
              </CanvasProvider>
            </GridColumn>
            <GridColumn xs={12} sm={3}>
              <div className={canvasPage('online')}>
                <OnlineUserList />
              </div>
            </GridColumn>
          </GridRow>
        </Container>
      </div>
    )
  }
}

export default CanvasPage;
