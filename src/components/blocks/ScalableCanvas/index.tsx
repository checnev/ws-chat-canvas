import React from 'react';
import { CanvasContext } from 'context/canvas';
import cn from 'utils/cn';
import './index.scss';

export class ScalableCanvas extends React.Component {
  static contextType = CanvasContext;
  context!: React.ContextType<typeof CanvasContext>

  wrapperRef = React.createRef<HTMLDivElement>();
  canvasRef = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const scale = this.context.width / this.wrapperRef.current!.clientWidth;
    this.context.setScale(scale);
  };

  render() {
    const scalableCanvas = cn('scalableCanvas');
    return (
      <div
        className={scalableCanvas()}
        ref={this.wrapperRef}
      >
        <canvas
          ref={this.context.canvasRef}
          width={this.context.width}
          height={this.context.width * 0.53}
          onPointerMove={this.context.movePen}
          onPointerDown={this.context.startDraw}
        >
          {this.props.children || `Your browser doesn't support canvas!`}
        </canvas>
      </div>
    );
  }
}

export default ScalableCanvas;
