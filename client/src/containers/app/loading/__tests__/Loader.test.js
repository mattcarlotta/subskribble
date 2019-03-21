import { Loader } from '../Loader.js';

const initialProps = {
  activeitemcount: 0,
  inactiveitemcount: 0,
  itemcount: 0,
  serverError: '',
};

const initialState = {
  requestTimeout: false,
};

describe('Loader', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loader {...initialProps} />, initialState);
  });

  it('initially renders a Spinner', () => {
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });

  it('displays NoDataToDisplay if requestTimeout is true', () => {
    wrapper.setState({ requestTimeout: true });
    expect(wrapper.find('NoDataToDisplay')).toHaveLength(1);
  });
});
