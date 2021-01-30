import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import pretty from 'pretty';
import { Formik, FormikProps } from 'formik';
import ChatForm, { ChatFormValues } from 'components/Chat/Form';

let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.append(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const setUp = () => (
  <Formik
    initialValues={{
      text: '',
    }}
    onSubmit={(values: ChatFormValues) => {
    }}
  >
    {(props: FormikProps<ChatFormValues>) => <ChatForm {...props} />}
  </Formik>
);

it('should render ChatForm', () => {
  act(() => {
    render(setUp(), container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
