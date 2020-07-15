import React, {useEffect} from "react";
import {rowColFromCelKey} from "./Simulation";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor: 'rgba(136,136,130,0.96)'
    }
});


const WorldControls = (props) => {

    const classes = useStyles();

    const handleKeyEvent = (e) => {
        let [row, column] = rowColFromCelKey(props.cellstate.selectedIdx)
        switch (e.code) {
            case 'ArrowDown':
                props.updateselected(row + 1, column)
                break;
            case 'ArrowUp':
                props.updateselected(row - 1, column)
                break;
            case 'ArrowRight':
                props.updateselected(row, column + 1)
                break;
            case 'ArrowLeft':
                props.updateselected(row, column - 1)
                break;
            case  " ":
            case "Space":
            case 'Enter':
                props.updatealive(row, column);
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, [props]);

    return (<Card className={classes.root}>
        <CardContent>
            <Button
                onClick={props.updaterunning}
                variant="contained"
                color="secondary"
            >
                {props.running ? <>Stop</> : <>Start</>}
            </Button>
        </CardContent>
    </Card>)
}

export default React.memo(WorldControls);
