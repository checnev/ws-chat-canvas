import React from 'react';
import cn from 'utils/cn';
import ScalableCanvas from 'components/blocks/ScalableCanvas';
import { CanvasContext } from 'context/canvas';
import './index.scss';

class WelcomeCanvas extends React.Component {
  static contextType = CanvasContext;
  context!: React.ContextType<typeof CanvasContext>

  imageRef = React.createRef<HTMLImageElement>();

  onLoadImage = () => {
    const context = this.context.canvasRef?.current?.getContext('2d');

    if (context) {
      context.drawImage(this.imageRef.current!, 0, 0, this.context.width, this.context.height);
    }
  };

  render() {
    const welcomeCanvas = cn('welcomeCanvas');
    return (
      <div
        className={welcomeCanvas()}
      >
        <ScalableCanvas>
          <img
            ref={this.imageRef}
            src={`${process.env.PUBLIC_URL}/images/welcome.png`}
            alt="Hello :)"
            onLoad={this.onLoadImage}
          />
        </ScalableCanvas>
      </div>
    );
  }
}

export default WelcomeCanvas;
