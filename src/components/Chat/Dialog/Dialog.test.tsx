import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import User from 'lib/user/User';
import Dialog from 'components/Chat/Dialog';

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

const naruto = new User('1', 'Naruto', 'green');
const sasuke = new User('2', 'Sasuke', 'orange');

const messages = [
  {
    id: 1,
    author: naruto,
    text: 'Come back to the village!',
    date: new Date(2021, 0, 30, 14),
  },
  {
    id: 2,
    author: sasuke,
    text: 'No!',
    date: new Date(2021, 0, 30, 15),
  }
];

it('should render Dialog', () => {
  act(() => {
    render(<Dialog messages={messages} user={naruto} />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
