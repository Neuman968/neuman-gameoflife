import React, {useEffect, useState} from "react";
import {rowColFromCelKey} from "./Simulation";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppDrawerContents from "./AppDrawerContents";
import CellSelectorMenu from "./CellSelectorMenu";
import RotateRightIcon from '@material-ui/icons/RotateRight';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    menuItem: {
      marginRight: theme.spacing(8),
    },
    title: {
        flexGrow: 1,
    }
}));


const WorldControls = (props) => {

    const classes = useStyles();

    const [drawerOpenState, setDrawerOpen] = useState(false)

    const handleKeyEvent = (e) => {
        let [row, column] = rowColFromCelKey(props.selectedIdx)
        switch (e.code) {
            case 'ArrowDown':
                e.preventDefault()
                props.updateselected(row + 1, column)
                break;
            case 'ArrowUp':
                e.preventDefault()
                props.updateselected(row - 1, column)
                break;
            case 'ArrowRight':
                e.preventDefault()
                props.updateselected(row, column + 1)
                break;
            case 'ArrowLeft':
                e.preventDefault()
                props.updateselected(row, column - 1)
                break;
            case 'KeyR':
                e.preventDefault()
                props.updaterotation(props.rotation + 1)
                break;
            case 'KeyS':
                e.preventDefault()
                props.updaterunning()
                break;
            case  " ":
            case "Space":
            case 'Enter':
                e.preventDefault()
                props.updatealive(row, column);
                break;
            default:
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, [props]);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(open);
    };

    return (<>
            <SwipeableDrawer
                anchor="left"
                open={drawerOpenState}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <AppDrawerContents {...props} />
            </SwipeableDrawer>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start"
                                    className={classes.menuItem}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Button
                            className={classes.menuItem}
                            onClick={props.updaterunning}
                            variant="contained"
                            color={props.running ? "secondary" : "default"}
                        >
                            {props.running ? <>Stop</> : <>Start</>}
                        </Button>
                        <CellSelectorMenu
                            className={classes.menuItem}
                            value={props.cellselector}
                            onChange={(event) => props.updatecellselector(event.target.value)}
                        />
                        <Button
                            className={classes.menuItem}
                            onClick={() => props.updaterotation(props.rotation + 1)}
                        >
                            Rotate
                            <RotateRightIcon/>
                        </Button>
                        <div className={classes.title}/>
                        <Button
                            className={classes.menuItem}
                            onClick={props.clearWorld}
                        >
                            Clear
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}

export default React.memo(WorldControls);
