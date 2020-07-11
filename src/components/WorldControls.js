import React, {useEffect} from "react";
import {rowColFromCelKey} from "./Simulation";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const WorldControls = (props) => {

    const handleKeyEvent = (e) => {
        let [row, column] = rowColFromCelKey(props.cellState.selectedIdx)
        switch (e.code) {
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
            case "Space":
            case 'Enter':
                props.updateAlive(row, column);
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, [props]);

    return (<Card>
        <Button
            onClick={props.updateRunning}
            color="primary">
            {props.running ? <>Stop</> : <>Start</>}
        </Button>
    </Card>)
}

export default React.memo(WorldControls);
