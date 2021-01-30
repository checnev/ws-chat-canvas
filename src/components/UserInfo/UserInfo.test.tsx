import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import UserInfo from 'components/UserInfo';

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

it('should render UserInfo', () => {
  act(() => {
    render(<UserInfo user={{ name: 'Naruto', color: 'green' }} />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
