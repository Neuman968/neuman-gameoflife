import React, {useEffect, useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";

export const getCellKey = (row, column) => row + '-' + column;

export const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));
/*
{
  "3-2": 1,

  "3-1": 1,
  "2-1": 1,
  "2-2": 1,
  "2-3": 1,
  "4-3": 1,
  "3-3": 1,
  "4-2": 1,
  "4-1": 1
}
 */
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

const _cachedLengthKeys = [...Array(10).keys()]
const _cachedWidthKeys = [...Array(6).keys()]

const squareSize = 10;

const Simulation = () => {

    const [cellstate, setcellstate] = useState({
        selectedIdx: getCellKey(0, 0),
        aliveCells: {},
    });

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
                    const numberOfAliveNeighbors = getKeyNeighbors(key).reduce((acc, val) => {
                        const [row, column] = val
                        const cellKey = getCellKey(row, column)
                        const isAlive = cellstate.aliveCells[cellKey]
                        if (!isAlive) {
                            deadNeighbors.add(cellKey)
                        }
                        return isAlive ? acc + 1 : acc
                    }, 0)

                    // Condition for killing cells..
                    if (numberOfAliveNeighbors < 2 || numberOfAliveNeighbors > 3) {
                        delete aliveCellCop[key]
                    }

                })

                deadNeighbors.forEach((deadCell) => {
                    const numberOfAliveNeighbors = getKeyNeighbors(deadCell).reduce((acc, val) => {
                        const [row, column] = val
                        const cellKey = getCellKey(row, column)
                        const isAlive = cellstate.aliveCells[cellKey]
                        return isAlive ? acc + 1 : acc
                    }, 0)

                    // If 3 neighbors exactly, the cell becomes alive!!
                    if (numberOfAliveNeighbors === 3) {
                        aliveCellCop[deadCell] = 1
                    }
                })
                setcellstate((prevstat) => {
                    return {
                        ...prevstat,
                        aliveCells: aliveCellCop
                    }
                })
                nextGeneration()
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [simulationState]);

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
        <CellWorld
            updatealive={cellalivehandler}
            running={simulationState.running}
            cellstate={cellstate}
            widthKeys={_cachedWidthKeys}
            lengthKeys={_cachedLengthKeys}
            squareSize={squareSize}
        />
        <WorldControls
            running={simulationState.running}
            updateselected={updateselected}
            updatealive={cellalivehandler}
            cellstate={cellstate}
            updaterunning={updaterunning}
        />
    </>);
}

export default Simulation;
