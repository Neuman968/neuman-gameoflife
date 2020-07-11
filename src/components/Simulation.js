import React, {useEffect, useState} from "react";
import CellWorld from "./CellWorld";
import WorldControls from "./WorldControls";

export const getCellKey = (row, column) => row + '-' + column;

export const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));

const _cachedLengthKeys = [...Array(100).keys()]
const _cachedWidthKeys = [...Array(60).keys()]

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

                nextGeneration()
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [simulationState]);

    const cellAliveHandler = (row, column) => {
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
            updatealive={cellAliveHandler}
            running={simulationState.running}
            cellstate={cellstate}
            widthKeys={_cachedWidthKeys}
            lengthKeys={_cachedLengthKeys}
            squareSize={squareSize}
        />
        <WorldControls
            running={simulationState.running}
            updateselected={updateselected}
            updatealive={cellAliveHandler}
            cellstate={cellstate}
            updaterunning={updaterunning}
        />
    </>);
}

export default Simulation;
