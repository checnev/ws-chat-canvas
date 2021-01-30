import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import { colors } from 'constants/colors';
import SelectColor from 'components/SelectColor';

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

it('should render SelectColor', () => {
  act(() => {
    render(<SelectColor onChange={() => {}} value={colors[0]} />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
