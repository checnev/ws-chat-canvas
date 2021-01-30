import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import GridColumn from 'components/common/Grid/Column';

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

const setUp = () => (
  <GridColumn
    xs={12}
    sm={10}
    md={8}
    lg={6}
    xl={4}
    xxl={2}
  >
    Grid Column Text
  </GridColumn>
);

it('should render GridColumn with size props', () => {
  act(() => {
    render(setUp(), container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
