import React, {useState} from 'react';
import classes from './Cell.module.css'

const DeadCell = (props) => (<rect {...props} style={{
    fill: "rgba(75,76,73,0.96)",
    // strokeWidth: 3,
    stroke: "rgba(75,76,73,0.96)"
}}/>)

const AliveCell = (props) => (<rect {...props} style={{
    fill: "#ff1200",
    // strokeWidth: 3,
    stroke: "#ff6700"
}}/>)

const Cell = (props) => {

    // let cellState = props.isAlive ? AliveCell : deadCell;

    const aliveHandler = () => {
        props.aliveHandler(props.row, props.column)
    }

    let classesList = [classes.Cell];
    if (props.selected) {
        classesList = [classes.CellSelected]
    }


    // todo
    //  many examples of this are not using grids, but are using a single
    // svg image with <rec> as inner components representing each "cell".
    // this is likely much more optimal
    if (props.isAlive) {
        return <AliveCell {...props} onClick={() => aliveHandler()}/>
    } else {
        return <DeadCell {...props} onClick={() => aliveHandler()}/>
    }
};

export default React.memo(Cell);
