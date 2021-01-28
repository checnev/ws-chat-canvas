import React from 'react';
import cn from 'utils/cn';
import { Form, FormikProps } from 'formik';
import './index.scss';

export interface ChatFormValues {
  text: string;
}

type ChatFormProps = FormikProps<ChatFormValues>;

class ChatForm extends React.Component<ChatFormProps> {

  render() {
    const chatForm = cn('chatForm');
    return (
      <Form
        className={chatForm()}
      >
        <textarea
          name="text"
          placeholder="What's new ?"
          onChange={this.props.handleChange}
          onBlur={this.props.handleBlur}
          value={this.props.values.text}
        />
        <button
          type="submit"
          className={chatForm('submit')}
        />
      </Form>
    );
  }
}

export default ChatForm;
