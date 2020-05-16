import React, {useState} from 'react';
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

    let cellState = props.isAlive ? aliveCell : deadCell;

    const aliveHandler = () => {
        props.aliveHandler(props.row, props.column)
    }

    let classesList = [classes.Cell];
    if (props.selected) {
        classesList = [classes.CellSelected]
    }

    return (<div className={classesList.join(' ')} onClick={() => aliveHandler()}>
        <svg width="10px" height="10px">
            {
                cellState
            }
        </svg>
    </div>)
};

export default React.memo(Cell);
