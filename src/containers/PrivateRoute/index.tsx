import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UserContext } from 'context/user';


class PrivateRoute extends React.Component<RouteProps> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <Route
        {...otherProps}
        render={() =>
          this.context.user ? (
            children
          ) : (
            <Redirect
              to="/signin"
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
