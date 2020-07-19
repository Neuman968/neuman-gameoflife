import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

const getGridLabelFormat = (value) => `${value / 2} x ${value / 2}`;

const AppDrawerContents = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography>
                Grid Size
            </Typography>
            <Slider
                className={classes.root}
                defaultValue={30}
                aria-labelledby="discrete-slider"
                getAriaValueText={getGridLabelFormat}
                step={10}
                marks
                min={10}
                max={200}
            />
        </div>
    )
}

export default AppDrawerContents
