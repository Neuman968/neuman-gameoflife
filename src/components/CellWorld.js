import React from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";
import {getCellKey} from "./Simulation";

const CellWorld = (props) => {

    let x = 0;
    let y = 0;

    return <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
    >
        <svg
            width={(props.squareSize + 2) * props.widthKeys.length}
            height={(props.squareSize + 2) * props.lengthKeys.length}>
            {
                props.widthKeys.map((row) => {
                    let cellRow = props.lengthKeys.map((column) => {
                        const cellKey = getCellKey(row, column);
                        let cell = <Cell
                            isSelected={cellKey === props.cellState.selectedIdx}
                            isAlive={!!props.cellState.aliveCells[cellKey]}
                            key={cellKey}
                            aliveHandler={props.updateAlive}
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
