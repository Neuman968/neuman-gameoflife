import React from 'react';
import classes from './Cell.module.css'

const deadCell = <rect width="10px" height="10px" style={{
    fill: "rgba(75,76,73,0.96)",
    // strokeWidth: 3,
    stroke: "rgba(75,76,73,0.96)"
}}/>

const aliveCell = <rect width="10px" height="10px" style={{
    fill: "#ff1200",
    // strokeWidth: 3,
    stroke: "#ff6700"
}}/>

const Cell = (props) => {
    let cellState = deadCell;
    if (props.aliveCells[props.cellVal] === 1) {
        cellState = aliveCell
    }

    const markAliveHandler = () => {
        props.aliveHandler(props.cellVal)
    }

    return (<div className={classes.Cell} onClick={() => markAliveHandler()}>
        <svg width="10px" height="10px">
            {
                cellState
            }
        </svg>
    </div>)
};

export default Cell;
