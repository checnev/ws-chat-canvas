import React from 'react';
import { Formik, FormikErrors, FormikProps } from 'formik';
import ChatForm, { ChatFormValues } from 'components/Chat/Form';
import { UserContext } from 'context/user';

class ChatFormContainer extends React.Component {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>

  sendMessage = (text: string) => {
    this.context.api?.send(
      'chat',
      {
        author: this.context.user,
        date: new Date(),
        text,
      }
    );
  }

  render() {
    return (
      <Formik
        initialValues={{
          text: '',
        }}
        onSubmit={(values: ChatFormValues, { resetForm }) => {
          this.sendMessage(values.text);
          resetForm();
        }}
        validate={(values: ChatFormValues) => {
          const errors: FormikErrors<ChatFormValues> = {};

          if (!values.text) {
            errors.text = 'Text is empty!';
          }

          return errors;
        }}
      >
        {(props: FormikProps<ChatFormValues>) => <ChatForm {...props} />}
      </Formik>
    );
  }
}

export default ChatFormContainer;
