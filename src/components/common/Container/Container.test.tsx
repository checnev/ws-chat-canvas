import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Container from 'components/common/Container';

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

describe('Container component', () => {
  const setUp = (props?: any) => (<Container {...props}>Container Text</Container>);

  it('should render Container', () => {
    act(() => {
      render(setUp(), container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });

  it('should render customized Container', () => {
    const props = {
      maxWidth: 'lg',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      FlexDirection: 'row',
    };

    act(() => {
      render(setUp(props), container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });
});
