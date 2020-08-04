import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {barSelector2, getSelectedGrid, rotate} from "./components/CellSelectors";
import {mapToCellKey} from "./components/Simulation";

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('get selected grid', () => {
  const selected = getSelectedGrid('1:3', barSelector2)
  expect(selected).toContain('1:3')
  expect(selected).toContain('2:3')
  expect(selected).toContain('3:3')
})

test('test rotation function', () => {
  const rotationMatrix = rotate(['1-0', '1-1', '1-2'])
  console.log(rotationMatrix)

})
