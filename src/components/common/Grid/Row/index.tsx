import React from 'react';
import cn from 'utils/cn';
import './index.scss';
import type { JustifyContent, AlignItems, FlexDirection } from 'components/common/Container';

interface GridRowProps {
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexDirection?: FlexDirection;
}

class GridRow extends React.Component<GridRowProps> {

  render() {
    const row = cn('gridRow');
    const { children, ...styleProps } = this.props;
    return (
      <div 
        className={
          row(styleProps as Record<string, string>)
        }
      >
        {this.props.children}
      </div>
    );
  }
}

export default GridRow;
