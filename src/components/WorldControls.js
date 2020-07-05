import React, {useEffect} from "react";
import {rowColFromCelKey} from "./Simulation";

const WorldControls = (props) => {

    const handleKeyEvent = (e) => {
        let [row, column] = rowColFromCelKey(props.cellState.selectedIdx)
        switch (e.key) {
            case 'ArrowDown':
                props.updateSelected(row + 1, column)
                break;
            case 'ArrowUp':
                props.updateSelected(row - 1, column)
                break;
            case 'ArrowRight':
                props.updateSelected(row, column + 1)
                break;
            case 'ArrowLeft':
                props.updateSelected(row, column - 1)
                break;
            case  " ":
            case 'Enter':
                props.updateAlive(row, column);
                break;
        }
        console.log("Updated selected " + row + " " + column)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, [props.cellState]);

    return (<></>)
}

export default React.memo(WorldControls);
