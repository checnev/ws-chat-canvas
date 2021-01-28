import React from 'react';
import cn from 'utils/cn';
import type { BreakPoint } from 'components/common/Container';
import './index.scss';

type ColSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type GridColumnProps = {
  [key in BreakPoint]?: ColSize;
};

class GridColumn extends React.Component<GridColumnProps> {

  render() {
    const { children, ...styleProps } = this.props;
    const column = cn('gridRow');

    return (
      <div
        className={
          column('column', styleProps as unknown as Record<string, number>)
        }
      >
        {children}
      </div>
    );
  }
}

export default GridColumn;
