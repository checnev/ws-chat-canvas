import React from 'react';
import { Formik, FormikErrors, FormikProps } from 'formik';
import AuthForm, { AuthFormValues } from 'components/AuthForm';
import { UserContext } from 'context/user';
import { colors } from 'constants/colors';
import { randomNumber } from 'utils/random';

class AuthFormContainer extends React.Component {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          color: colors[randomNumber(0, colors.length - 1)],
        }}
        onSubmit={(values: AuthFormValues) => {
          const user = {
            name: values.name,
            color: values.color,
          };

          this.context.signin(user);
        }}
        validate={(values: AuthFormValues) => {
          const errors: FormikErrors<AuthFormValues> = {};

          if (!values.name) {
            errors.name = 'User Name is empty!';
          }

          return errors;
        }}
      >
        {(props: FormikProps<AuthFormValues>) => <AuthForm {...props} />}
      </Formik>
    );
  }
}

export default AuthFormContainer;
