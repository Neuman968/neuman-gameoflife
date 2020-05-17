import React from 'react';

const DeadCell = (props) => (<rect {...props} style={{
    fill: "rgba(75,76,73,0.96)",
    stroke: props.isSelected ? "#3DF5FF" : "rgba(75,76,73,0.96)"
}}/>)

const AliveCell = (props) => (<rect {...props} style={{
    fill: "#ff1200",
    stroke: props.isSelected ? "#3DF5FF" : "#ff1200"
}}/>)

const Cell = (props) => {

    const aliveHandler = () => {
        props.aliveHandler(props.row, props.column)
    }

    if (props.isAlive) {
        return <AliveCell {...props} onClick={() => aliveHandler()}/>
    } else {
        return <DeadCell {...props} onClick={() => aliveHandler()}/>
    }
};

export default React.memo(Cell);
