import React, {useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";

export const getCellKey = (row, column) => row + '-' + column;

export const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));


const _cachedWidthKeys = [...Array(60).keys()]
const _cachedLengthKeys = [...Array(100).keys()]

const squareSize = 5;

const Simulation = () => {
    const [state, setState] = useState({
        selectedIdx: getCellKey(0, 0),
        aliveCells: {}
    });

    const cellAliveHandler = (row, column) => {
        let copy = {...state}
        const cellKey = getCellKey(row, column)
        if (state.aliveCells[cellKey]) {
            delete copy.aliveCells[cellKey]
        } else {
            copy.aliveCells[cellKey] = 1;
        }
        copy.selectedIdx = cellKey;
        setState((_) => copy);
    }

    const updateSelected = (row, column) => {
        let copy = {...state}
        copy.selectedIdx = getCellKey(row, column)
        setState((_) => copy)
    }

    return (<>
        <CellWorld
            updateAlive={cellAliveHandler}
            cellState={state}
            widthKeys={_cachedWidthKeys}
            lengthKeys={_cachedLengthKeys}
            squareSize={squareSize}
        />
        <WorldControls
            updateSelected={updateSelected}
            updateAlive={cellAliveHandler}
            cellState={state}
        />
    </>);
}

export default Simulation;
