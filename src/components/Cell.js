import React, {useState} from 'react';
import classes from './Cell.module.css'

const DeadCell = (props) => (<rect {...props} style={{
    fill: "rgba(75,76,73,0.96)",
    // strokeWidth: 3,
    stroke: props.selected ? "#3DF5FF" : "rgba(75,76,73,0.96)"
}}/>)

const AliveCell = (props) => (<rect {...props} style={{
    fill: "#ff1200",
    // strokeWidth: 3,
    stroke: props.selected ? "#3DF5FF" : "#ff1200"
}}/>)

const Cell = (props) => {

    const aliveHandler = () => {
        props.aliveHandler(props.row, props.column)
    }

    let classesList = [classes.Cell];
    if (props.selected) {
        classesList = [classes.CellSelected]
    }

    if (props.isAlive) {
        return <AliveCell {...props} onClick={() => aliveHandler()}/>
    } else {
        return <DeadCell {...props} onClick={() => aliveHandler()}/>
    }
};

export default React.memo(Cell);
