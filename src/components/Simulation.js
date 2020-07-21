import React, {useEffect, useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";

export const getCellKey = (row, column) => row + '-' + column;

export const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));

/**
 * Returns an array of arrays in the structure of
 * [ [row, column], ... ] for each of the cells neighbors.
 * @param key
 * @returns {((number|*)[]|*[]|(*|number)[]|number[])[]}
 */
export const getKeyNeighbors = (row, col) => {
    return [[row - 1, col], [row + 1, col],
        [row, col - 1], [row, col + 1],
        [row - 1, col - 1], [row + 1, col + 1],
        [row + 1, col - 1], [row - 1, col + 1]];
}

export const getAliveNeighbors = (row, col, isAliveFunc) => getKeyNeighbors(row, col).reduce((acc, val) => {
    const [row, column] = val
    return isAliveFunc(getCellKey(row, column)) ? acc + 1 : acc
}, 0)

const squareSize = 10;

const blankCellState = {
    selectedIdx: getCellKey(0, 0),
    aliveCells: {},
}

const Simulation = () => {

    const [cellstate, setcellstate] = useState(blankCellState);

    const [simulationState, setSimulationState] = useState({
        running: false,
    })

    const [gridState, setGridState] = useState({
        colHeight: 100,
        colWidth: 100,
        gridHeight: (squareSize + 2) * 100,
        gridWidth: (squareSize + 2) * 100,
    })

    const updateGridLength = (length) => setGridState((prev) => {
        return {
            ...prev,
            gridHeight: (squareSize + 2) * length,
            colHeight: length
        }
    })

    const updateGridWidth = (width) => setGridState((prev) => {
        return {
            ...prev,
            gridWidth: (squareSize + 2) * width,
            colWidth: width
        }
    })

    useEffect(() => {
        const timer = setTimeout(() => {

            if (simulationState.running) {

                const nextState = {...cellstate.aliveCells}
                for (let x = 0; x < gridState.colWidth; x++) {
                    for (let y = 0; y < gridState.colHeight; y++) {
                        const cellKey = getCellKey(x, y);
                        const aliveNeighbors = getAliveNeighbors(x, y, (key) => cellstate.aliveCells[key])

                        // If cell is either over populated or under populated, then it dies.
                        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                            delete nextState[cellKey]
                        }

                        // if cell has exactly 3 alive neighbors, then it reproduces.
                        if (aliveNeighbors === 3) {
                            nextState[cellKey] = 1
                        }
                    }
                }

                setcellstate((prevstat) => {
                    return {
                        ...prevstat,
                        aliveCells: nextState
                    }
                })
                // Update to next generation...
            }
        }, 1);
        return () => clearTimeout(timer);
    }, [cellstate.aliveCells, simulationState]);

    const cellalivehandler = (row, column) => {
        let copy = {...cellstate}
        const cellKey = getCellKey(row, column)
        if (cellstate.aliveCells[cellKey]) {
            delete copy.aliveCells[cellKey]
        } else {
            copy.aliveCells[cellKey] = 1;
        }
        copy.selectedIdx = cellKey;
        setcellstate((_) => copy);
    }

    const clearWorld = () => {
        let copy = {...cellstate}
        copy.aliveCells = {};
        copy.selectedIdx = getCellKey(0, 0)
        setcellstate((_) => copy)
    }

    const updateselected = (row, column) => {
        let copy = {...cellstate}
        copy.selectedIdx = getCellKey(row, column)
        setcellstate((_) => copy)
    }

    const updaterunning = () => {
        let copyState = {...simulationState}
        copyState.running = !copyState.running
        setSimulationState((_) => copyState)
    }

    return (<>
        <WorldControls
            running={simulationState.running}
            updateselected={updateselected}
            updatealive={cellalivehandler}
            aliveCells={cellstate.aliveCells}
            selectedIdx={cellstate.selectedIdx}
            updaterunning={updaterunning}
            clearWorld={clearWorld}
            updateLength={updateGridLength}
            length={gridState.colHeight}
            width={gridState.colWidth}
            updateWidth={updateGridWidth}
        />
        <CellWorld
            updatealive={cellalivehandler}
            updateselected={updateselected}
            running={simulationState.running}
            aliveCells={cellstate.aliveCells}
            selectedIdx={cellstate.selectedIdx}

            colWidth={gridState.colWidth}
            colHeight={gridState.colHeight}

            gridheight={gridState.gridHeight}
            gridwidth={gridState.gridWidth}
            squareSize={squareSize}
        />
    </>);
}

export default Simulation;
