import React, {useEffect, useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";

/**
 * Converts a row, column into a cell key in the format of "{row}-{column}"
 * @param row
 * @param column
 * @returns {string}
 */
export const getCellKey = (row, column) => row + '-' + column;

/**
 * Converts a cell get in the format of "{row}-{column}" into an array of
 *  [ row, column ]
 * @param key
 * @returns {number[]}
 */
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
    aliveCells: {},
}

const Simulation = () => {

    const [cellstate, setcellstate] = useState(blankCellState);

    const [ selectorState, setSelectorState ] = useState({
        selectedIdx: '0-0',
    })

    const [simulationState, setSimulationState] = useState({
        running: false,
    })

    const [gridState, setGridState] = useState({
        colHeight: 50,
        colWidth: 50,
        gridHeight: (squareSize + 2) * 50,
        gridWidth: (squareSize + 2) * 50,
    })

    const updateGridWidth = (length) => setGridState((prev) => {
        return {
            ...prev,
            gridWidth: (squareSize + 2) * length,
            colWidth: length
        }
    })

    const updateGridHeight = (width) => setGridState((prev) => {
        return {
            ...prev,
            gridHeight: (squareSize + 2) * width,
            colHeight: width
        }
    })

    const randomize = () => {
        const numberToGenerate = Math.floor((Math.random() * (gridState.colWidth * gridState.colHeight)) + 1);
        const nextState = {...cellstate.aliveCells}
        for (let i = 0; i < numberToGenerate; i++) {
            const cellKey = getCellKey(Math.floor((Math.random() * gridState.colWidth)),
                Math.floor((Math.random() * gridState.colHeight)))
            nextState[cellKey] = 1
        }
        setcellstate((prevstat) => {
            return {
                ...prevstat,
                aliveCells: nextState
            }
        })
    }

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

                setcellstate({
                    selectedIdx: '0-0',
                    aliveCells: nextState
                })
                // Update to next generation...
            }
        }, 10);
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
        let copy = {...selectorState}
        copy.selectedIdx = getCellKey(row, column)
        setSelectorState((_) => copy)
    }

    const updaterunning = () => {
        let copyState = {...simulationState}
        copyState.running = !copyState.running
        setSimulationState((_) => copyState)
    }

    return (<>
        <WorldControls
            randomize={randomize}
            running={simulationState.running}
            updateselected={updateselected}
            updatealive={cellalivehandler}
            aliveCells={cellstate.aliveCells}
            selectedIdx={selectorState.selectedIdx}
            updaterunning={updaterunning}
            clearWorld={clearWorld}
            updateLength={updateGridWidth}
            length={gridState.colHeight}
            width={gridState.colWidth}
            updateWidth={updateGridHeight}
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
