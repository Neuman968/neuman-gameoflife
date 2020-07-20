import React from 'react';
import classes from './Cell.module.css'

const Cell = (props) => {

    const alivehandler = () => {
        props.alivehandler(props.row, props.column)
    }

    const cellClasses = [classes.Cell];

    if (!props.running) {
        cellClasses.push(classes.EditableCell)
        if (props.isselected) {
            cellClasses.push(classes.CellSelected)
        }
    }

    cellClasses.push(props.isalive ? classes.CellAlive : classes.CellDead)

    return <rect
        onMouseEnter={() => props.updateselected(props.row, props.column)}
        onClick={() => alivehandler()}
        className={cellClasses.join(' ')}
        height={props.height}
        width={props.width}
        x={props.x}
        y={props.y}
    />
};

export default React.memo(Cell);
