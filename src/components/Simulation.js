import React, {useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";

export const getCellKey = (row, column) => row + '-' + column;

export const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));


const _cachedWidthKeys = [...Array(60).keys()]
const _cachedLengthKeys = [...Array(100).keys()]

const squareSize = 10;

const Simulation = () => {
    const [cellState, setCellState] = useState({
        selectedIdx: getCellKey(0, 0),
        aliveCells: {},
    });

    const [simulationState, setSimulationState] = useState({
        running: false,
        generation: 0,
    })

    const cellAliveHandler = (row, column) => {
        let copy = {...cellState}
        const cellKey = getCellKey(row, column)
        if (cellState.aliveCells[cellKey]) {
            delete copy.aliveCells[cellKey]
        } else {
            copy.aliveCells[cellKey] = 1;
        }
        copy.selectedIdx = cellKey;
        setCellState((_) => copy);
    }

    const updateSelected = (row, column) => {
        let copy = {...cellState}
        copy.selectedIdx = getCellKey(row, column)
        setCellState((_) => copy)
    }

    return (<>
        <CellWorld
            updateAlive={cellAliveHandler}
            running={simulationState.running}
            cellState={cellState}
            widthKeys={_cachedWidthKeys}
            lengthKeys={_cachedLengthKeys}
            squareSize={squareSize}
        />
        <WorldControls
            running={simulationState.running}
            updateSelected={updateSelected}
            updateAlive={cellAliveHandler}
            cellState={cellState}
        />
    </>);
}

export default Simulation;
