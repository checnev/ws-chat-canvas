import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import UserList from 'components/UserList';

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

it('should render UserList', () => {
  const users = [
    {
      name: 'Naruto',
      color: 'green',
    },
    {
      name: 'Sasuke',
      color: 'orange',
    },
  ];

  act(() => {
    render(<UserList users={users} />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
