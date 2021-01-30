import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import pretty from 'pretty';
import { Formik, FormikProps } from 'formik';
import AuthForm, { AuthFormValues } from 'components/AuthForm';

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
      name: 'Naruto',
      color: '#fff',
    }}
    onSubmit={(values: AuthFormValues) => {
    }}
  >
    {(props: FormikProps<AuthFormValues>) => <AuthForm {...props} />}
  </Formik>
);

it('should render AuthForm', () => {
  act(() => {
    render(setUp(), container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
