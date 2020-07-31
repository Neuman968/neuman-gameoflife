import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {rotate} from "./components/CellSelectors";

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('test rotation function', () => {
  const rotationMatrix = rotate(['1-0', '1-1', '1-2'])
  console.log(rotationMatrix)

})
