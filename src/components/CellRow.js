import React from "react";
import classes from './CellRow.module.css'
import Grid from "@material-ui/core/Grid";

const deadCell = <rect width="300" height="100" style={{
    fill: "#FF3412",
    strokeWidth: 3,
    stroke: "#FF3412"
}}/>

const aliveCell = <rect width="300" height="100" style={{
    fill: "#91F5FF",
    strokeWidth: 3,
    stroke: "#91F5FF"
}}/>

const CellRow = (props) => {
    return props.cells.map((cellVal) => {
        return <Grid item xs={2}>
            {/*{cellVal}*/}
            <svg width="10" height="10">
                { cellVal % 2 !== 0 ? aliveCell : deadCell}
            </svg>
        </Grid>
    })
};


export default CellRow;
