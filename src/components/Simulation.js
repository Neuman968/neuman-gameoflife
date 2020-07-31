import React, {useEffect, useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";
import {dotSelector} from "./CellSelectors";


const squareSize = 10;

/**
 * Rotation constants.
 * @type {number}
 */
const radian = (Math.PI / 180) * 90;
const cos = Math.cos(radian)
const sin = Math.sin(radian)


/**
 * Converts a row, column into a cell key in the format of "{row}-{column}"
 * @param row
 * @param column
 * @returns {string}
 */
export const getCellKey = (row, column) => row + ':' + column;

/**
 * Converts a cell get in the format of "{row}-{column}" into an array of
 *  [ row, column ]
 * @param key
 * @returns {number[]}
 */
export const rowColFromCelKey = (key) => key.split(':')
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


/**
 * Applies a 90 degree rotation numRotations times.
 * @param numRotations
 * @param selectedIdx
 * @param cellKeyArr
 * @returns {*}
 */
export const rotateTimes = (numRotations, selectedIdx, cellKeyArr) => {
    let arr = cellKeyArr
    for (let i = 0; i < numRotations; i++) {
        arr = rotate(selectedIdx, arr)
    }
    return arr
}

/**
 * Take a cellKeyArray, ie ['0:0', '0:1'..] and applies a 90 degree clockwise
 * rotation returning an array of transformed cell key coordinates.
 * @param cellKeyArr
 */
export const rotate = (selectedIdx, cellKeyArr) => {
    const [selectedRow, selectedColumn] = rowColFromCelKey(selectedIdx)
    return mapToCellKey(cellKeyArr.map((cellKey) => {
        const [row, col] = rowColFromCelKey(cellKey)
        // apply translation to origin
        return pointRotate(selectedRow, selectedColumn, row, col)

    }))
}

/**
 * Utility function for converting [[row, col]...] to ['row:col'] cell key
 * notation.
 * @param cellArrs
 * @returns {*}
 */
export const mapToCellKey = cellArrs => cellArrs.map((arr) => {
    const [cellRow, cellCol] = arr
    return getCellKey(cellRow, cellCol)
})


/**
 * Applies a 90 degree rotation around the selected row / column points. to the given point.
 * @param row
 * @param column
 * @returns {number[]}
 */
export const pointRotate = (selectedRow, selectedCol, row, column) => {
    return [Math.floor(parseFloat((cos * (row - selectedRow)) + (sin * (column - selectedCol)) + selectedRow)),
        (Math.floor(parseFloat(cos * (column - selectedCol)) - (sin * (row - selectedRow)) + selectedCol))]
}

const blankCellState = {
    aliveCells: {},
}

const Simulation = () => {

    const [cellstate, setcellstate] = useState(blankCellState);

    const [selectorState, setSelectorState] = useState({
        selectedIdx: '0:0',
        rotationTimes: 0,
        cellSelector: dotSelector,
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

    const selectedcells = rotateTimes(selectorState.rotationTimes,
        selectorState.selectedIdx,
        selectorState.cellSelector(selectorState.selectedIdx))

    const updateRotation = (rotation) => {
        let copy = {...selectorState}
        copy.rotationTimes = rotation % 4
        setSelectorState(copy)
    }

    const updateCellSelector = (selector) => {
        let copy = {...selectorState}
        copy.cellSelector = selector
        setSelectorState(copy)
    }

    const updateGridWidth = (length) => setGridState((prev) => {
        return {
            ...prev,
            gridWidth: (squareSize + 2) * length,
            colWidth: length
        }
    })

    const updateGridHeight = (height) => setGridState((prev) => {
        return {
            ...prev,
            gridHeight: (squareSize + 2) * height,
            colHeight: height
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

    const cellalivehandler = () => {
        let copy = {...cellstate}
        selectedcells.forEach((cellKey) => {
            if (cellstate.aliveCells[cellKey]) {
                delete copy.aliveCells[cellKey]
            } else {
                copy.aliveCells[cellKey] = 1;
            }
            copy.selectedIdx = cellKey;
        })
        setcellstate((_) => copy);
    }

    const clearWorld = () => {
        let copy = {...cellstate}
        copy.aliveCells = {};
        updateselected(0, 0)
        setcellstate((_) => copy)
    }

    const updateselected = (row, column) => {
        if (!simulationState.running) {
            let copy = {...selectorState}
            copy.selectedIdx = getCellKey(row, column)
            setSelectorState((_) => copy)
        }
    }

    const updaterunning = () => {
        let copyState = {...simulationState}
        copyState.running = !copyState.running
        setSimulationState((_) => copyState)
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
                    aliveCells: nextState
                })
                // Update to next generation...
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [cellstate.aliveCells, simulationState]);

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
            updatecellselector={updateCellSelector}
            updaterotation={updateRotation}
            rotation={selectorState.rotationTimes}
        />
        <CellWorld
            updatealive={cellalivehandler}
            updateselected={updateselected}
            running={simulationState.running}
            aliveCells={cellstate.aliveCells}
            selectedcells={selectedcells}
            colWidth={gridState.colWidth}
            colHeight={gridState.colHeight}
            gridheight={gridState.gridHeight}
            gridwidth={gridState.gridWidth}
            squareSize={squareSize}
            selector={selectorState.cellSelector}
            rotation={selectorState.rotationTimes}
        />
    </>);
}

export default Simulation;
