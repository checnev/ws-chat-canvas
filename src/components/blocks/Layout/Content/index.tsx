import React from 'react';
import cn from 'utils/cn';
import './index.scss';


class Content extends React.Component {
  render() {
    const content = cn('content');
    return <div className={content()}>{this.props.children}</div>;
  }
}

export default Content;
