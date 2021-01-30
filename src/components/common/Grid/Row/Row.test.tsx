import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import GridRow from 'components/common/Grid/Row';

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

const setUp = (props?: any) => (
  <GridRow {...props}>
    Grid Column Text
  </GridRow>
);

describe('GridRow component', () => {
  it('should render GridRow', () => {
    act(() => {
      render(setUp(), container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });

  it('should render GridRow with props', () => {
    const props = {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    };

    act(() => {
      render(setUp(props), container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });
});
