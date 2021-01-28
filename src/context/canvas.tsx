import React from 'react';
import Subscription from 'lib/base/subscription';
import Point, { IPoint } from 'lib/canvas/Point';

interface ICanvasContext {
  lineColor: string;
  lineWidth: number;
  width: number;
  height: number;
  scale: number;
  isDrawing: boolean;

  startDraw: (event: React.PointerEvent<HTMLCanvasElement>) => void;
  endDraw: (event: PointerEvent) => void;
  movePen: (event: React.PointerEvent<HTMLCanvasElement>) => void;
  drawLine: (color: string, lineWidth: number, from: IPoint, to: IPoint) => void;
  setScale: (scale: number) => void;
  setLineWidth: (width: number) => void;
  setColor: (color: string) => void;

  subscription: Subscription;

  contextRef: CanvasRenderingContext2D | null;
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

type CanvasProviderState = Pick<ICanvasContext, 'lineColor' | 'lineWidth' | 'width' | 'height' | 'scale' | 'isDrawing'>;

export const CanvasContext = React.createContext<ICanvasContext>({
  lineColor: 'green',
  lineWidth: 5,
  width: 1280,
  height: 688,
  scale: 1,
  isDrawing: false,
  startDraw: () => {},
  endDraw: () => {},
  movePen: () => {},
  drawLine: () => {},
  setScale: () => {},
  setLineWidth: () => {},
  setColor: () => {},
  subscription: new Subscription(),
  contextRef: null,
});
CanvasContext.displayName = 'Canvas';


class CanvasProvider extends React.Component<{}, CanvasProviderState> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  ctx: CanvasRenderingContext2D | null = null;
  subscription = new Subscription();

  private lastDrawTime: number = 0;
  private lastPoint = new Point(0, 0);

  state = {
    lineColor: 'green',
    lineWidth: 5,
    width: 1280,
    height: 688,
    scale: 1,
    isDrawing: false,
  };

  setIsDrawing = (isDrawing: boolean) => {
    this.setState({ isDrawing });
  };

  setLineWidth = (lineWidth: number) => {
    this.setState({ lineWidth });
  };

  setScale = (scale: number) => {
    this.setState({ scale });
  };

  setColor = (lineColor: string) => {
    this.setState({ lineColor });
  };

  drawLine = (color: string, lineWidth: number, from: IPoint, to: IPoint) => {
    if (this.ctx) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = lineWidth;

      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.stroke();
    }
  };

  componentDidMount() {
    if (this.canvasRef.current) {
      this.ctx = this.canvasRef.current.getContext('2d');

      this.canvasRef.current!.width = this.state.width;
      this.canvasRef.current!.height = this.state.height;
      this.canvasRef.current!.style.touchAction = 'none';

      if (this.ctx) {
        this.ctx.lineWidth = this.state.lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
      }
    }

    document.documentElement.addEventListener('pointerup', this.endDraw);
  }

  componentDidUpdate() {
    if (this.canvasRef.current) {
      this.ctx = this.canvasRef.current.getContext('2d');

      if (this.ctx) {
        this.ctx.lineWidth = this.state.lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
      }
    }
  }

  componentWillUnmount() {
    document.documentElement.removeEventListener('pointerup', this.endDraw);
  }

  movePen = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (this.ctx && this.state.isDrawing) {
      if (Date.now() - this.lastDrawTime > 10) {
        const newPoint = new Point(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        this.draw(newPoint);
      }
    }
  };

  private draw = (newPoint: Point) => {
    // if (this.ctx && this.state.isDrawing) {
    //   if (Date.now() - this.lastDrawTime > 10) {

        const lastPointScale = new Point(
          this.lastPoint.x * this.state.scale,
          this.lastPoint.y * this.state.scale
        );

        const newPointScale = new Point(
          newPoint.x * this.state.scale,
          newPoint.y * this.state.scale,
        );

        this.drawLine(this.state.lineColor, this.state.lineWidth, lastPointScale, newPointScale);

        this.subscription.dispatch('draw', {
          lineColor: this.state.lineColor,
          lineWidth: this.state.lineWidth,
          from: lastPointScale,
          to: newPointScale,
        });

        this.lastPoint = new Point(newPoint.x, newPoint.y);
        this.lastDrawTime = Date.now();
    //   }
    // }
  };

  startDraw = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = new Point(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    this.lastPoint = point;
    this.setIsDrawing(true);

    this.subscription.dispatch('startDraw', {
      x: point.x * this.state.scale,
      y: point.y * this.state.scale,
    });
  };

  endDraw = (event: PointerEvent) => {
    this.setIsDrawing(false);

    const point = new Point(event.offsetX, event.offsetY);

    if (this.lastPoint.isEqual(point)) {
      this.draw(point);
    }

    this.subscription.dispatch('endDraw', {
      x: point.x * this.state.scale,
      y: point.y * this.state.scale,
    });
  };

  render() {
    return (
      <CanvasContext.Provider value={{
        ...this.state,
        subscription: this.subscription,
        drawLine: this.drawLine,
        setScale: this.setScale,
        setLineWidth: this.setLineWidth,
        setColor: this.setColor,
        canvasRef: this.canvasRef,
        contextRef: this.ctx,
        movePen: this.movePen,
        startDraw: this.startDraw,
        endDraw: this.endDraw,
      }}>
        {this.props.children}
      </CanvasContext.Provider>
    );
  }
}

export default CanvasProvider;
