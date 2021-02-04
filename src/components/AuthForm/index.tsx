import React from 'react';
import cn from 'utils/cn';
import { Form, FormikProps } from 'formik';
import Field from 'components/common/Field';
import ColorSelector from 'components/SelectColor';
import Button from 'components/common/Button';
import './index.scss';

export interface AuthFormValues {
  name: string;
  color: string;
}

type AuthFormProps = FormikProps<AuthFormValues> & {
  isFetching: boolean;
};

class AuthForm extends React.Component<AuthFormProps> {
  render() {
    const form = cn('authForm');
    return (
      <Form className={form({ fetching: this.props.isFetching })}>
        <div className={form('fieldGroup')}>
          <Field
            name="name"
            type="text"
            label="Your Name"
            placeholder="Naruto Uzumaki"
            className={form('field')}
            onChange={this.props.handleChange}
            onBlur={this.props.handleBlur}
            value={this.props.values.name}
            invalid={Boolean(this.props.touched.name && this.props.errors.name)}
            helpMessage={this.props.errors.name}
          />
        </div>
        <div className={form('fieldGroup')}>
          <ColorSelector 
            onChange={this.props.handleChange}
            value={this.props.values.color}
            height={62.5}
          />
        </div>
        <div className={form('fieldGroup')}>
          <Button type="submit">Sign In</Button>
        </div>
      </Form>
    );
  }
}

export default AuthForm;
