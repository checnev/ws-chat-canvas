import React from 'react';
import clsx from 'clsx';
import cn from 'utils/cn';
import './index.scss';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  helpMessage?: string;
}

class Field extends React.Component<FieldProps> {
  render() {
    const { 
      type = 'text',
      className,
      invalid,
      label,
      helpMessage,
      ...props
    } = this.props;
    const input = cn('input');
    return (
      <label className={input('label', { hasLabel: Boolean(label) })}>
        <div className={input('fieldWrapper')}>
          {label && <span className={input('labelText')}>{label}</span>}
          <input
            type={type}
            className={
              clsx(className, input({ type, invalid }))
            }
            {...props}
          />
        </div>
        {invalid && helpMessage && <small className={input('helpMessage')}>{helpMessage}</small>}
      </label>
    );
  }
}

export default Field;
