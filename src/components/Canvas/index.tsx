import React from 'react';

export interface Point {
  x: number;
  y: number;
}

interface CanvasProps {
  lineColor: string;
  lineWidth: number;
  width: number;
  height: number;
  scale: number;
  onDraw?: (color: string, lineWidth: number, from: Point, to: Point) => any;
  onDrawStart?: (point: Point) => any;
  onDrawEnd?: (point: Point) => any;
}

class Canvas extends React.PureComponent<CanvasProps> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  ctx: CanvasRenderingContext2D | null = null;
  
  private isDraw: boolean = false;
  
  private lastDrawTime: number = 0;
  private lastPoint: Point = { x: 0, y: 0 };
  
  componentDidMount() {
    if (this.canvasRef.current) {
      this.ctx = this.canvasRef.current.getContext('2d');

      this.canvasRef.current!.width = this.props.width;
      this.canvasRef.current!.height = this.props.height;
      this.canvasRef.current!.style.touchAction = 'none';

      if (this.ctx) {
        this.ctx.lineWidth = this.props.lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
      }
    }

    document.documentElement.addEventListener('pointerup', this.drawEnd);
  }

  componentDidUpdate() {
    this.ctx!.lineWidth = this.props.lineWidth;
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('pointerup', this.drawEnd);
  }

  drawLine = (color: string, lineWidth: number, from: Point, to: Point) => {
    if (this.ctx) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;

      this.ctx.beginPath();
      this.ctx.moveTo(from.x * this.props.scale, from.y * this.props.scale);
      this.ctx.lineTo(to.x * this.props.scale, to.y * this.props.scale);
      this.ctx.stroke();
    }
  };

  private draw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (this.ctx && this.isDraw) {
      if (Date.now() - this.lastDrawTime > 10) {
        
        const newPoint: Point = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
        this.drawLine(this.props.lineColor, this.props.lineWidth, this.lastPoint, newPoint);
        
        this.lastPoint = newPoint;
        this.lastDrawTime = Date.now();

        if (this.props.onDraw) {
          this.props.onDraw(this.props.lineColor, this.props.lineWidth, this.lastPoint, newPoint);
        }
      }
    }
  };

  private drawStart = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY };
    this.lastPoint = point;
    this.isDraw = true;

    if (this.props.onDrawStart) {
      this.props.onDrawStart(point);
    }
  };

  private drawEnd = (event: PointerEvent) => {
    this.isDraw = false;

    if (this.props.onDrawEnd) {
      this.props.onDrawEnd({ x: event.offsetX, y: event.offsetY });
    }
  };
  
  render() {
    return (
      <canvas
        ref={this.canvasRef}
        onPointerMove={this.draw}
        onPointerDown={this.drawStart}
      >
        {this.props.children || `Your browser doesn't support canvas!`}
      </canvas>
    );
  }
}

export default Canvas;
