import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: 300,
        paddingTop: 20
    },
    slider: {
        width: 280
    }
});

const AppDrawerContents = (props) => {

    const classes = useStyles()

    const updateLength = (event, length) => props.updateLength(length)
    const updateWidth = (event, width) => props.updateWidth(width)

    return (
        <div className={classes.root}>
            <Typography>
                Grid Length
            </Typography>
            <Slider
                className={classes.slider}
                defaultValue={50}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                getAriaValueText={(val) => val}
                step={10}
                marks
                min={10}
                max={150}
                onChange={updateLength}
            />
            <Typography>
                Grid Width
            </Typography>
            <Slider
                className={classes.slider}
                defaultValue={50}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                getAriaValueText={(val) => val}
                step={10}
                marks
                min={10}
                max={150}
                onChange={updateWidth}
            />
        </div>
    )
}

export default AppDrawerContents
