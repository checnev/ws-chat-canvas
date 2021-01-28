import React from 'react';
import SceneCanvas from 'components/blocks/SceneCanvas';
import { CanvasContext } from 'context/canvas';
import { UserContext } from 'context/user';
import type { IPoint } from 'lib/canvas/Point';
import type { IUser } from 'lib/user/User';
import type Request from 'lib/api/Request';


interface PublicCanvasProps {
  user: React.ContextType<typeof UserContext>;
  canvas: React.ContextType<typeof CanvasContext>;
}

interface Path {
  lineColor: string;
  lineWidth: number;
  from: IPoint;
  to: IPoint;
}

interface DrawMessage {
  author: IUser;
  paths: Path[];
}

class PublicCanvas extends React.Component<PublicCanvasProps> {
  bufferPath: Path[] = [];
  broadcastTimerID?: NodeJS.Timeout;

  onStartDraw = () => {
    this.broadcastTimerID = setInterval(this.broadcastPath, 10);
  };

  onDraw = (path: Path) => {
    this.bufferPath.push(path);
  };

  onRecieveDraw = (req: Request) => {
    const { data } = req;

    if (data.author.id !== this.props.user.user!.id) {
      data.paths.forEach((path: Path) => {
        this.props.canvas.drawLine(
          path.lineColor,
          path.lineWidth,
          path.from,
          path.to
        );
      });
    }
  };

  broadcastPath = () => {
    if (this.bufferPath.length === 0) return;

    const data: DrawMessage = {
      author: this.props.user.user!,
      paths: this.bufferPath,
    };

    this.props.user.api?.send('draw', data);
    this.bufferPath = [];

    if (!this.props.canvas.isDrawing) {
      clearInterval(this.broadcastTimerID!);
    }
  };

  componentDidMount() {
    this.props.canvas.setColor(this.props.user.user!.color);
    this.props.canvas.subscription.subscribe('startDraw', this.onStartDraw);
    this.props.canvas.subscription.subscribe('draw', this.onDraw);

    this.props.user.api?.subscribe('draw', this.onRecieveDraw);
  }

  componentWillUnmount() {
    this.props.canvas.subscription.unsubscribe('startDraw', this.onStartDraw);
    this.props.canvas.subscription.unsubscribe('draw', this.onDraw);

    this.props.user.api?.unsubscribe('draw', this.onRecieveDraw);
  }

  render() {
    return <SceneCanvas />;
  }
}

export default PublicCanvas;
