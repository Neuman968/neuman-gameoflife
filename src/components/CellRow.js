import React from "react";
import classes from './CellRow.module.css'

const deadCell = <rect width="10px" height="10px" style={{
    fill: "#FF3412",
    // strokeWidth: 3,
    stroke: "#FF3412"
}}/>

const aliveCell = <rect width="10px" height="10px" style={{
    fill: "#91F5FF",
    // strokeWidth: 3,
    stroke: "#91F5FF"
}}/>

const CellRow = (props) => {
    return props.cells.map((cellVal) => {
        return <div className={classes.Cell}>
            <svg width="10px" height="10px">
                { cellVal % 2 !== 0 ? aliveCell : deadCell}
            </svg>
        </div>
    })
};


export default CellRow;
