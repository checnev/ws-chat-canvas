import React from 'react';
import cn from 'utils/cn';
import clsx from 'clsx';
import { colors } from 'constants/colors';
import './index.scss';

interface ColorSelectorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number | string;
  height?: number | string;
}

class ColorSelector extends React.PureComponent<ColorSelectorProps> {
  static defaultProps: ColorSelectorProps = {
    name: 'color',
    width: '25%',
    height: 50,
  }
  render() {
    const colorSelector = cn('colorSelector');
    const { className, value, width, height, ...props } = this.props; 

    return (
      <fieldset className={clsx(className, colorSelector())}>
        {colors.map((color) => (
          <label className={colorSelector('label')} style={{ width }} key={color}>
            <input
              type="radio"
              className={colorSelector('input')}
              value={color}
              checked={color === value}
              {...props}
            />
            <span 
              className={colorSelector('colorSquare')}
              style={{
                backgroundColor: color,
                height,
              }}
            />
          </label>
        ))}
      </fieldset>
    )
  }
}

export default ColorSelector;
