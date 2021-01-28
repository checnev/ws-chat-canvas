import React from 'react';
import cn from 'utils/cn';
import './index.scss';
import Container from 'components/common/Container';
import HeaderMenu from './Menu';
import { NavLink } from 'react-router-dom';
import { GridRow, GridColumn } from 'components/common/Grid';
import { UserContext } from 'context/user';
import UserInfo from 'components/UserInfo';

class Header extends React.Component {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  render() {
    const header = cn('header');
    return (
      <header className={header()}>
        <Container maxWidth="xl">
          <GridRow alignItems="center">
            <GridColumn xs={6} sm={8}>
              <HeaderMenu />
            </GridColumn>
            <GridColumn xs={6} sm={4}>
              <div className={header('user')}>
                {this.context.user
                  ? <UserInfo user={this.context.user} />
                  : (
                    <NavLink
                      to="/signin"
                      className={header('signinLink')}
                    >
                      Sign In
                    </NavLink>
                  )
                }
              </div>
            </GridColumn>
          </GridRow>
        </Container>
      </header>
    );
  }
}

export default Header;
