import React from "react";
import Cell from './Cell'

const CellRow = (props) => {
    return props.cells.map((cellVal) => {
        return <Cell
            key={cellVal}
            aliveCells={props.aliveCells}
            aliveHandler={props.aliveHandler}
            cellVal={cellVal}/>
    })
};


export default CellRow;
