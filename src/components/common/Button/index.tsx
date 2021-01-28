import React from 'react';
import cn from 'utils/cn';
import clsx from 'clsx';
import './index.scss';

export type Color = 'primary' | 'second';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  color?: Color;
}

class Button extends React.PureComponent<ButtonProps> {
  static defaultProps: ButtonProps = {
    color: 'primary',
  };

  render() {
    const button = cn('button');
    const { className, color, ...props } = this.props;
    
    return (
      <button
        className={
          clsx(className, button({ color }))
        }
        {...props}
      />
    );
  }
}

export default Button;
