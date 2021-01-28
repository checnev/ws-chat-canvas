import React from 'react';
import cn from 'utils/cn';
import './index.scss';

class MenuItem extends React.Component {

  render() {
    const menu = cn('menu');
    return (
      <li
        {...this.props}
        className={menu('item')}
        role="menuitem"
      />
    );
  }
}

export default MenuItem;
