import React, {useEffect} from "react";
import {rowColFromCelKey} from "./Simulation";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

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

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Button
                    onClick={props.updaterunning}
                    variant="contained"
                    color={props.running ? "secondary" : ""}
                >
                    {props.running ? <>Stop</> : <>Start</>}
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(WorldControls);
