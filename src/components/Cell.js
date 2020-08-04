import React from 'react';
import classes from './Cell.module.css'
import {Rect} from "react-konva";

const Cell = (props) => {

    const alivehandler = () => {
        props.alivehandler()
    }

    const cellClasses = [classes.Cell];

    if (!props.running && props.isselected) {
        cellClasses.push(classes.CellSelected)
    }

    cellClasses.push(props.isalive ? classes.CellAlive : classes.CellDead)


    return <Rect
        onMouseEnter={() => props.updateselected(props.row, props.column)}
        onClick={() => alivehandler()}
        className={cellClasses.join(' ')}
        fill={props.isalive ? "rgba(250,3,3,0.96)" : "rgba(75,76,73,0.96)"}
        height={props.height}
        width={props.width}
        x={props.x}
        y={props.y}
        stroke={props.isselected ? '#3DF5FF' : null}
    />
}

/**
 * Handle componentShouldUpdate functional component equivalent using React.Memo
 */
export default React.memo(
    Cell,
    (prevProps, nextProps) => prevProps.isalive === nextProps.isalive
        && (prevProps.isselected === nextProps.isselected)
        && (prevProps.running === nextProps.running)
        && (prevProps.selector === nextProps.selector)
        && (prevProps.rotation === nextProps.rotation)
);
