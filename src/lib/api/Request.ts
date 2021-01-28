class Request {
  constructor(public type: string, public data?: any) {}

  static isRequest(object: any) {
    return object.type && typeof object.type === 'string';
  }
}

export default Request;
