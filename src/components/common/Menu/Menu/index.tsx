import React from 'react';
import clsx from 'clsx';
import cn from 'utils/cn';
import './index.scss';

interface MenuProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

class Menu extends React.Component<MenuProps> {
  static defaultProps: Pick<MenuProps, 'orientation'> = {
    orientation: 'vertical',
  };

  render() {
    const menu = cn('menu');
    return (
      <nav className={clsx(this.props.className, menu())}>
        <ul
          className={menu('items', { orientation: this.props.orientation })}
          role="menu"
        >
          {this.props.children}
        </ul>
      </nav>
    );
  }
}

export default Menu;
