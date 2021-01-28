import React from 'react';
import cn from 'utils/cn';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './index.scss';

interface LayoutProps {
  fixed?: boolean;
}

class Layout extends React.Component<LayoutProps> {

  render() {
    const layout = cn('layout');
    const { fixed } = this.props;
    return (
      <div className={layout({ fixed })}>
        <Header />
        <Content>{this.props.children}</Content>
        <Footer />
      </div>
    );
  }
}

export default Layout;
