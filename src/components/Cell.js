import React from 'react';
import classes from './Cell.module.css'

const Cell = (props) => {

    const alivehandler = () => {
        props.alivehandler()
    }

    const cellClasses = [classes.Cell];

    if (!props.running && props.isselected) {
        cellClasses.push(classes.CellSelected)
    }

    cellClasses.push(props.isalive ? classes.CellAlive : classes.CellDead)

    // console.log('Cell Row: ' + props.row + ' Column: ' + props.column + ' Rendering')
    return <rect
        onMouseEnter={() => props.updateselected(props.row, props.column)}
        onClick={() => alivehandler()}
        className={cellClasses.join(' ')}
        height={props.height}
        width={props.width}
        x={props.x}
        y={props.y}
    />
}

export default React.memo(
    Cell,
    (prevProps, nextProps) => prevProps.isalive === nextProps.isalive
        && (prevProps.isselected === nextProps.isselected)
        && (prevProps.running === nextProps.running)
        && (prevProps.selector === nextProps.selector)
        && (prevProps.rotation === nextProps.rotation)
);
