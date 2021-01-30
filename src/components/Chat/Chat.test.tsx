import { render, unmountComponentAtNode } from 'react-dom';
import { act } from "react-dom/test-utils";
import pretty from 'pretty';
import Chat from 'components/Chat';

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

it('should render Chat', () => {
  act(() => {
    render(<Chat />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
