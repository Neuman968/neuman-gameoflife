import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SelectInput from "@material-ui/core/Select/SelectInput";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
    root: {
        width: 300,
        paddingTop: 20
    },
    slider: {
        width: 280,
        paddingTop: 20
    }
});

const AppDrawerContents = (props) => {

    const classes = useStyles()

    const updateLength = (event, length) => props.updateLength(length)
    const updateWidth = (event, width) => props.updateWidth(width)

    return (
        <div className={classes.root}>
            <Typography>
                Cell Selector
            </Typography>
            <Select
                value={1}
            >
                <MenuItem value={1}>Single Square</MenuItem>
                <MenuItem value={2}>Bar</MenuItem>
                <MenuItem value={3}>Glider</MenuItem>
            </Select>
            <Typography>
                Grid Length
            </Typography>
            <Slider
                className={classes.slider}
                defaultValue={props.length}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                getAriaValueText={(val) => val}
                step={10}
                marks
                min={10}
                max={100}
                onChange={updateLength}
            />
            <Typography>
                Grid Width
            </Typography>
            <Slider
                className={classes.slider}
                defaultValue={props.width}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                getAriaValueText={(val) => val}
                step={10}
                marks
                min={10}
                max={100}
                onChange={updateWidth}
            />

            <Button
                onClick={props.randomize}
            >
                Randomize
            </Button>
        </div>
    )
}

export default AppDrawerContents
