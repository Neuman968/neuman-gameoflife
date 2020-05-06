import React from "react";
import Cell from './Cell'

const CellRow = (props) => {
    return props.cells.map((cellVal) => {
        return <Cell cellVal={cellVal}/>
    })
};


export default CellRow;
