import { render } from '@testing-library/react';
import SwitchButton from './SwitchButton';

test('renders correctly', () => {
  const component = render(<SwitchButton connected id={0} />);
  expect(component).toMatchSnapshot();
});

const commands = {
  true: 'disconnect',
  false: 'connect',
};

test('datatype attribute should be set correctly for connected sensor', () => {
  const id = 0;
  const connected = false;
  const component = render(<SwitchButton connected={connected} id={id} />);
  const connectedButton = component.getByRole('button');
  expect(connectedButton).toHaveAttribute('datatype');
  expect(connectedButton.getAttribute('datatype')).toBe(`${id}_${commands[connected]}`);
});

test('datatype attribute should be set correctly for disconnected sensor', () => {
  const id = 0;
  const connected = true;
  const component = render(<SwitchButton connected={connected} id={id} />);
  const connectedButton = component.getByRole('button');
  expect(connectedButton).toHaveAttribute('datatype');
  expect(connectedButton.getAttribute('datatype')).toBe(`${id}_${commands[connected]}`);
});
