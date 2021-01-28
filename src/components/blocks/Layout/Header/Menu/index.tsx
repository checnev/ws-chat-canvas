import React from 'react';
import cn from 'utils/cn';
import clsx from 'clsx';
import { Menu, MenuItem } from 'components/common/Menu';
import { NavLink } from 'react-router-dom';
import './index.scss';

const menuItems = [
  { anchor: 'WS Chat & Canvas', to: '/', exact: true },
  { anchor: 'Chat', to: '/chat' },
  { anchor: 'Canvas', to: '/canvas' },
];

interface HeaderMenuProps {
  className?: string;
}

interface HeaderMenuState {
  isOpen: boolean;
}

class HeaderMenu extends React.Component<HeaderMenuProps, HeaderMenuState> {
  menuWrapperRef = React.createRef<HTMLDivElement>();

  state = {
    isOpen: false,
  };

  toggleMenu = () => {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  };

  closeMenu = (event: MouseEvent) => {
    if (!this.menuWrapperRef.current!.contains(event.target as Node)) {
      this.setState({ isOpen: false });
    }
  }

  componentDidMount() {
    document.documentElement.addEventListener('click', this.closeMenu);
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('click', this.closeMenu);
  }

  render() {
    const menu = cn('headerMenu');
    return (
      <div className={menu()} ref={this.menuWrapperRef}>
        <div
          className={menu('burger', { open: this.state.isOpen })}
          onClick={this.toggleMenu}
        >
        </div>
        <Menu
          className={clsx(this.props.className, menu({ open: this.state.isOpen }))}
          orientation="horizontal"
        >
          {menuItems.map((menuItem) => (
            <MenuItem key={menuItem.to}>
              <NavLink
                to={menuItem.to}
                className={menu('link')}
                activeClassName="menu__link_active"
                exact={menuItem.exact}
              >
                {menuItem.anchor}
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default HeaderMenu;
