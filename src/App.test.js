import { render } from '@testing-library/react';
import App from './App';

test('renders correctly', () => {
  const appComponent = render(<App />);
  expect(appComponent).toMatchSnapshot();
});
