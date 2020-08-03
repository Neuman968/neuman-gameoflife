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
import Select from "@material-ui/core/Select";
import {
    acornSelector,
    barSelector,
    boatSelector,
    dotSelector, fPentominoSelector,
    gliderGunSelector,
    gliderSelector,
    lightWeightSpaceshipSelector,
    toadSelector
} from "./CellSelectors";
import MenuItem from "@material-ui/core/MenuItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import SvgGlider from "../assets/icon/SvgGlider";
import SvgBar from "../assets/icon/SvgBar";
import SvgSinglePoint from "../assets/icon/SvgSinglePoint";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    svgIcon: {
        zoom: 0, // fixes some weird chromium svg zooming issue.
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
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Button
                            onClick={props.updaterunning}
                            variant="contained"
                            color={props.running ? "secondary" : "default"}
                        >
                            {props.running ? <>Stop</> : <>Start</>}
                        </Button>
                        <Button
                            onClick={() => props.updaterotation(props.rotation + 1)}
                        >
                            Rotate
                        </Button>
                        <Select
                            value={props.cellselector}
                            onChange={(event) => props.updatecellselector(event.target.value)}
                        >
                            <MenuItem value={dotSelector}>Single Point<SvgIcon className={classes.svgIcon} component={SvgSinglePoint}/></MenuItem>
                            <MenuItem value={barSelector}>Bar<SvgIcon component={SvgBar}/></MenuItem>
                            <MenuItem value={gliderSelector}>Glider <SvgIcon component={SvgGlider}/></MenuItem>
                            <MenuItem value={gliderGunSelector}>Glider Gun</MenuItem>
                            <MenuItem value={toadSelector}>Toad</MenuItem>
                            <MenuItem value={lightWeightSpaceshipSelector}>Light Weight Spaceship</MenuItem>
                            <MenuItem value={acornSelector}>Acorn</MenuItem>
                            <MenuItem value={fPentominoSelector}>F-Pentomino</MenuItem>
                        </Select>
                        <div
                            className={classes.title}
                        >
                        </div>
                        <Button
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
