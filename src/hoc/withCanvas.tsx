import React from 'react';
import CanvasProvider from 'context/canvas';

const withCanvas = (WrappedComponent: React.ComponentType) => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return class extends React.Component {
    static displayName = `withCanvas(${displayName})`;
    render() {
      return (
        <CanvasProvider>
          <WrappedComponent />
        </CanvasProvider>
      );
    }
  };
};

export default withCanvas;
