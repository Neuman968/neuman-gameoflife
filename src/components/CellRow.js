import React, {Fragment} from "react";
import Cell from './Cell'

const CellRow = (props) => {
    return <Fragment>
        {props.cells.map((cellVal) => {
            return <Cell
                selected={cellVal == props.selectedIdx}
                key={cellVal}
                aliveCells={props.aliveCells}
                aliveHandler={props.aliveHandler}
                cellVal={cellVal}/>
        })
        }
    </Fragment>
};


export default CellRow;
