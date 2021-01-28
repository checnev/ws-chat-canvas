export interface IPoint {
  x: number;
  y: number;
}

class Point implements IPoint {
  constructor(public readonly x: number, public readonly y: number) {}

  isEqual(point: IPoint): boolean {
    return this.x === point.x && this.y === point.y;
  }

  static isEquals(point1: IPoint, point2: IPoint): boolean {
    return point1.x === point2.x && point1.y === point2.y;
  }
}

export default Point;
