import React from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";
import {getCellKey} from "./Simulation";

const CellWorld = (props) => {

    let x = 0;
    let y = 0;

    const gridHeight = (props.squareSize + 2) * props.lengthKeys.length
    const gridWidth = (props.squareSize + 2) * props.widthKeys.length

    return <Grid
        container
        spacing={0}
        width={gridWidth}
        height={gridHeight}
        alignItems="center"
        justify="center"
    >
        <svg
            height={gridWidth}
            width={gridHeight}>
            {
                props.widthKeys.map((row) => {
                    let cellRow = props.lengthKeys.map((column) => {
                        const cellKey = getCellKey(row, column);
                        let cell = <Cell
                            running={props.running}
                            isselected={cellKey === props.cellstate.selectedIdx}
                            isalive={!!props.cellstate.aliveCells[cellKey]}
                            key={cellKey}
                            alivehandler={props.updatealive}
                            row={row}
                            column={column}
                            x={x}
                            y={y}
                            height={props.squareSize}
                            width={props.squareSize}
                        />
                        x += props.squareSize + 2;
                        return cell;
                    })
                    y += props.squareSize + 2;
                    x = 0;
                    return cellRow
                })
            }
        </svg>
    </Grid>
};

export default React.memo(CellWorld);
