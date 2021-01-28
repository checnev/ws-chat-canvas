import React from 'react';
import { UserContext } from 'context/user';
import type User from 'lib/user/User';

interface WrappedProps {
  user: User | null;
}

const withUser = <P extends {}>(WrappedComponent: React.ComponentType<P & WrappedProps>) => {
  return class extends React.Component<P> {
    static contextType = UserContext;
    context!: React.ContextType<typeof UserContext>
    render() {
      return <WrappedComponent {...this.props} user={this.context.user}/>;
    }
  }
}

export default withUser;
