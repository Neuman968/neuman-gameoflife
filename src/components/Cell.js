import React from 'react';
import classes from './Cell.module.css'

const Cell = (props) => {

    const aliveHandler = () => {
        props.aliveHandler(props.row, props.column)
    }

    const cellClasses = [classes.Cell];

    if (props.isSelected) {
        cellClasses.push(classes.CellSelected)
    }
    cellClasses.push(props.isAlive ? classes.CellAlive : classes.CellDead)

    return <rect
        onClick={() => aliveHandler()}
        className={cellClasses.join(' ')}
        {...props}
    />
};

export default React.memo(Cell);
