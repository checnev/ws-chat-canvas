import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import Field from 'components/common/Field';

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

describe('Field component', () => {
  it('should render Field', () => {
    act(() => {
      render(<Field type="text" label="Field Label" />, container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });

  it('should render Field with helpMessage', () => {
    act(() => {
      render(<Field type="text" label="Field Label" helpMessage="invalid value" invalid />, container);
    });

    expect(
      pretty(container.innerHTML)
    ).toMatchSnapshot();
  });
});
