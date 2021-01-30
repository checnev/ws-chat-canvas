import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Menu from 'components/common/Menu/Menu';

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

it('should render Menu', () => {
  act(() => {
    render(<Menu></Menu>, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
