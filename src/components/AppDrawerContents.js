import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

const AppDrawerContents = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography>
                Grid settings
            </Typography>
            <Slider
                className={classes.root}
                defaultValue={30}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={200}
            />
        </div>
    )
}

export default AppDrawerContents
