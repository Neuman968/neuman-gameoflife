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
export const getKeyNeighbors = (key) => {
    const [row, col] = rowColFromCelKey(key)
    return [[row - 1, col], [row + 1, col],
        [row, col - 1], [row, col + 1],
        [row - 1, col - 1], [row + 1, col + 1],
        [row + 1, col - 1], [row - 1, col + 1]];
}

export const getAliveNeighbors = (key, isAliveFunc) => getKeyNeighbors(key).reduce((acc, val) => {
    const [row, column] = val
    return isAliveFunc(getCellKey(row, column)) ? acc + 1 : acc
}, 0)

const _cachedLengthKeys = [...Array(50).keys()]
const _cachedWidthKeys = [...Array(50).keys()]

const squareSize = 10;

const blankCellState = {
    selectedIdx: getCellKey(0, 0),
    aliveCells: {},
}

const Simulation = () => {

    const [cellstate, setcellstate] = useState(blankCellState);

    const [simulationState, setSimulationState] = useState({
        running: false,
        generation: 1,
    })

    // Increments cell generation
    const nextGeneration = () => {
        setSimulationState((prev) => {
            return {
                ...prev,
                generation: prev.generation++
            }
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {

            if (simulationState.running) {
                // Simulation logic here.
                const deadNeighbors = new Set()
                const aliveCellCop = {...cellstate.aliveCells}

                Object.keys(aliveCellCop).forEach((key) => {
                    const numberOfAliveNeighbors = getAliveNeighbors(key, (cellKey) => {
                        const isAlive = cellstate.aliveCells[cellKey]
                        if (!isAlive) {
                            deadNeighbors.add(cellKey)
                        }
                        return isAlive
                    })

                    // Condition for killing cells..
                    if (numberOfAliveNeighbors < 2 || numberOfAliveNeighbors > 3) {
                        delete aliveCellCop[key]
                    }

                })

                deadNeighbors.forEach((deadCell) => {
                    const numberOfAliveNeighbors = getAliveNeighbors(deadCell, (cellKey) => cellstate.aliveCells[cellKey])

                    // If 3 neighbors exactly, the cell becomes alive!!
                    if (numberOfAliveNeighbors === 3) {
                        aliveCellCop[deadCell] = 1
                    }
                })
                // Update cell state...
                setcellstate((prevstat) => {
                    return {
                        ...prevstat,
                        aliveCells: aliveCellCop
                    }
                })
                // Update to next generation...
                nextGeneration()
            }
        }, 1 / 10000);
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
        />
        <CellWorld
            updatealive={cellalivehandler}
            updateselected={updateselected}
            running={simulationState.running}
            aliveCells={cellstate.aliveCells}
            selectedIdx={cellstate.selectedIdx}
            widthKeys={_cachedWidthKeys}
            lengthKeys={_cachedLengthKeys}
            squareSize={squareSize}
        />
    </>);
}

export default Simulation;
