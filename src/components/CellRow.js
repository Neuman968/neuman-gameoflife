import React from "react";
import TableCell from '@material-ui/core/TableCell';

const deadCell = <rect width="300" height="100" style={{
    fill: "#FF3412",
    strokeWidth: 3,
    stroke: "#FF3412"
}}/>

const aliveCell = <rect width="300" height="100" style={{
    fill: "#91F5FF",
    strokeWidth: 3,
    stroke: "#91F5FF"
}}/>

const CellRow = (props) => {
    return props.cells.map((cellVal) => {
        return <td>
            <svg width="10" height="10">
                { cellVal % 2 !== 0 ? aliveCell : deadCell}
            </svg>
        </td>
    })
};


export default CellRow;
