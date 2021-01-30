import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Message from 'components/Chat/Dialog/Message';

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

const user = {
  name: 'Naruto',
  color: 'green',
};

const message = {
  id: 1,
  author: user,
  text: 'Test Message',
  date: new Date(2021, 0, 30),
}

describe('Message component', () => {
  const setUp = (props: any) => <Message {...props} />;

  it('should render incoming Message', () => {
    act(() => {
      render(setUp({ message, direction: 'in' }), container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });

  it('should render outcoming Message', () => {
    act(() => {
      render(setUp({ message, direction: 'out' }), container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });
});
