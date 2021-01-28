import React from 'react';
import cn from 'utils/cn';
import './index.scss';

export type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between';
export type AlignItems = 'flex-start' | 'center' | 'flex-end';
export type FlexWrap = 'nowrap' | 'wrap';
export type FlexDirection = 'row' | 'column';
export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface ContainerProps {
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexWrap?: FlexWrap;
  flexDirection?: FlexDirection;
  maxWidth?: BreakPoint;
}

class Container extends React.Component<ContainerProps> {
  render() {
    const container = cn('container');
    const { children, ...styleProps } = this.props;

    return (
      <div
        className={container(styleProps as Record<string, string>)}
      >
        {children}
      </div>
    );
  }
}

export default Container;
