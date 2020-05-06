import React from 'react';
import classes from './Cell.module.css'

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

const debugConsole = (cellVal) => {
    console.log("index is " + cellVal)
}

const Cell = (props) => {
    return (<div className={classes.Cell} onClick={() => debugConsole(props.cellVal)}>
        <svg width="10px" height="10px">
            deadCell
            {/*{props.cellVal % 2 !== 0 ? aliveCell : deadCell}*/}
        </svg>
    </div>)
};

export default Cell;
