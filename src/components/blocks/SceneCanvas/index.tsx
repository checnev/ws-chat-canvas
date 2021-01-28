import React from 'react';
import cn from 'utils/cn';
import ScalableCanvas from 'components/blocks/ScalableCanvas';
import { CanvasContext } from 'context/canvas';
import './index.scss';


class SceneCanvas extends React.Component {
  static contextType = CanvasContext;
  context!: React.ContextType<typeof CanvasContext>;

  changeLineWidth = (width: number) => {
    this.context.setLineWidth(width);
  };

  render() {
    const sceneCanvas = cn('sceneCanvas');
    return (
      <div
        className={sceneCanvas()}
      >
        <ScalableCanvas />
        <div className={sceneCanvas('lineWidth')}>
          <div className={sceneCanvas('widthSelectors')}>
            {[5, 10, 15].map((width) => (
              <div
                key={width}
                className={sceneCanvas('widthSelector', { width })}
                onClick={() => this.changeLineWidth(width)}
              >
                <span
                  className={sceneCanvas('widthPicker', { active: width === this.context.lineWidth })}
                  style={{
                    backgroundColor: this.context.lineColor,
                    height: width,
                    width,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SceneCanvas;
