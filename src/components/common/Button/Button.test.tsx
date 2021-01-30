import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Button from 'components/common/Button';

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

it('should render Button', () => {
  act(() => {
    render(<Button>Button Text</Button>, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
