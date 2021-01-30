import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Item from 'components/common/Menu/Item';

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

it('should render MenuItem', () => {
  act(() => {
    render(<Item>Item Text</Item>, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
