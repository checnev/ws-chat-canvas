type Listener = (data?: any) => any;

class Subscription {
  private listeners: Record<string, Listener[]> = {};

  subscribe(event: string, listener: Listener) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].push(listener);
    } else {
      this.listeners[event] = [listener];
    }
  }

  unsubscribe(event: string, listener: Listener) {
    if (this.listeners[event]) {
      const listenerIndex = this.listeners[event].findIndex((handler) => handler === listener);

      if (listenerIndex !== -1) {
        this.listeners[event].splice(listenerIndex, 1);
      }

      if (this.listeners[event].length === 0) {
        delete this.listeners[event];
      }
    }
  }

  dispatch(event: string, data?: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(data);
      });
    }
  }
}

export default Subscription;
